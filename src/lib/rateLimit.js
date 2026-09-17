// src/lib/rateLimit.js
// In-memory sliding-window token bucket rate limiter untuk Next.js App Router
// Melindungi backend dan database Neon dari excessive requests & spamming

/**
 * Penyimpanan in-memory per identifier (IP / Session ID / Token)
 * Struktur: Map<string, { tokens: number, lastRefill: number }>
 */
class SlidingWindowRateLimiter {
  constructor() {
    this.storage = new Map();
    // Bersihkan entri lama setiap 5 menit untuk mencegah memory leak
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanup(), 5 * 60 * 1000).unref?.();
    }
  }

  /**
   * Periksa apakah request diizinkan
   * @param {string} identifier - Kunci unik (contoh: IP address, userId)
   * @param {Object} options
   * @param {number} options.limit - Jumlah maksimal request yang diizinkan dalam window
   * @param {number} options.windowMs - Rentang waktu dalam milidetik (contoh: 60000 = 1 menit)
   * @returns {{ success: boolean, limit: number, remaining: number, resetTime: number }}
   */
  check(identifier, { limit = 60, windowMs = 60000 } = {}) {
    const now = Date.now();
    const key = `${identifier}`;

    let record = this.storage.get(key);

    if (!record || now - record.startTime >= windowMs) {
      // Buat window baru
      record = {
        count: 1,
        startTime: now,
      };
      this.storage.set(key, record);
      return {
        success: true,
        limit,
        remaining: limit - 1,
        resetTime: now + windowMs,
      };
    }

    // Masih dalam window yang sama
    if (record.count < limit) {
      record.count += 1;
      return {
        success: true,
        limit,
        remaining: limit - record.count,
        resetTime: record.startTime + windowMs,
      };
    }

    // Limit terlampaui
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: record.startTime + windowMs,
    };
  }

  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.storage.entries()) {
      if (now - record.startTime > 10 * 60 * 1000) {
        this.storage.delete(key);
      }
    }
  }
}

// Global singleton instance
const globalLimiter = globalThis.__rateLimiter || new SlidingWindowRateLimiter();
if (process.env.NODE_ENV !== 'production') {
  globalThis.__rateLimiter = globalLimiter;
}

/**
 * Ambil client IP dari header request Next.js
 * @param {Request|Headers} request
 * @returns {string}
 */
export function getClientIp(request) {
  if (!request) return '127.0.0.1';
  
  const headers = request.headers instanceof Headers ? request.headers : new Headers(request.headers || {});
  
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip') || headers.get('cf-connecting-ip');
  if (realIp) {
    return realIp.trim();
  }

  return '127.0.0.1';
}

/**
 * Middleware helper untuk memeriksa rate limit pada API Route Handler
 * @param {Request} request
 * @param {Object} options
 * @param {string} options.prefix - Kategori limiter (misal: 'upload', 'search', 'brochure')
 * @param {number} options.limit - Jumlah maksimal request
 * @param {number} options.windowMs - Rentang waktu ms
 * @returns {{ allowed: boolean, response?: Response }}
 */
export function applyRateLimit(request, { prefix = 'api', limit = 60, windowMs = 60000 } = {}) {
  const ip = getClientIp(request);
  const identifier = `${prefix}:${ip}`;
  const result = globalLimiter.check(identifier, { limit, windowMs });

  if (!result.success) {
    const retryAfterSec = Math.ceil((result.resetTime - Date.now()) / 1000);
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          success: false,
          error: 'Terlalu banyak permintaan (Rate Limit Exceeded). Silakan coba lagi beberapa saat.',
          retryAfter: retryAfterSec,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfterSec),
            'X-RateLimit-Limit': String(result.limit),
            'X-RateLimit-Remaining': String(result.remaining),
            'X-RateLimit-Reset': String(result.resetTime),
          },
        }
      ),
    };
  }

  return { allowed: true, result };
}

// Preset konfigurasi siap pakai
export const RateLimits = {
  SEARCH: { prefix: 'search', limit: 40, windowMs: 60 * 1000 },     // 40 req / menit
  UPLOAD: { prefix: 'upload', limit: 20, windowMs: 60 * 1000 },     // 20 req / menit
  BROCHURE: { prefix: 'brochure', limit: 6, windowMs: 60 * 1000 },  // 6 generate / menit
  AUTH: { prefix: 'auth', limit: 5, windowMs: 15 * 60 * 1000 },     // 5 coba / 15 menit
};
