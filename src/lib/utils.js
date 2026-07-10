// @ts-check
// src/lib/utils.js
//
// Utility helpers murni (tanpa side effect).
// Setiap fungsi: satu tanggung jawab (SRP), error handling untuk input tidak valid.

/**
 * Format angka harga ke string Rupiah singkat yang mudah dibaca.
 *
 * Contoh output:
 *   - 1_800_000_000 → "Rp 1.8 M"
 *   - 500_000_000   → "Rp 500 Jt"
 *   - 750_000       → "Rp 750.000"
 *
 * @param {number} angka - Harga dalam Rupiah (integer positif)
 * @returns {string} String harga yang sudah diformat
 * @throws {TypeError} Jika angka bukan number atau bernilai negatif
 */
export function formatHarga(angka) {
  if (typeof angka !== "number" || isNaN(angka)) {
    throw new TypeError(`formatHarga: argumen harus berupa number, diterima: ${typeof angka}`);
  }

  if (angka < 0) {
    throw new TypeError("formatHarga: harga tidak boleh negatif");
  }

  const MILIAR = 1_000_000_000;
  const JUTA = 1_000_000;

  if (angka >= MILIAR) {
    // Bulatkan ke 1 desimal, hilangkan trailing ".0" jika bulat
    const nilaiMiliar = angka / MILIAR;
    const formatted = nilaiMiliar % 1 === 0
      ? nilaiMiliar.toFixed(0)
      : nilaiMiliar.toFixed(1);
    return `Rp ${formatted} M`;
  }

  if (angka >= JUTA) {
    return `Rp ${(angka / JUTA).toFixed(0)} Jt`;
  }

  // Di bawah 1 juta: tampilkan angka penuh dengan separator ribuan
  return `Rp ${angka.toLocaleString("id-ID")}`;
}

/**
 * Konversi string teks bebas ke format URL slug.
 * Mendukung karakter Latin, angka, dan tanda hubung.
 *
 * Contoh output:
 *   - "BSD City 2026!"  → "bsd-city-2026"
 *   - "Alam Sutera"     → "alam-sutera"
 *   - "rumah 3KT/2KM"   → "rumah-3kt2km"
 *
 * @param {string} str - String input yang akan di-slugify
 * @returns {string} URL slug yang sudah dinormalisasi
 * @throws {TypeError} Jika input bukan string
 */
export function slugify(str) {
  if (typeof str !== "string") {
    throw new TypeError(`slugify: argumen harus berupa string, diterima: ${typeof str}`);
  }

  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")                    // Pisahkan karakter + aksen (mis. é → e + ́)
    .replace(/[\u0300-\u036f]/g, "")     // Hapus diakritik/aksen
    .replace(/\s+/g, "-")               // Ganti spasi (termasuk multiple) dengan dash
    .replace(/[^a-z0-9-]/g, "")         // Hapus semua karakter selain huruf, angka, dash
    .replace(/-{2,}/g, "-")             // Ganti multiple dash berurutan menjadi satu
    .replace(/^-|-$/g, "");             // Hapus dash di awal/akhir
}

/**
 * Format ISO date string ke format tanggal lokal yang mudah dibaca.
 * Menggunakan `Intl.DateTimeFormat` bawaan browser/Node.
 *
 * Contoh output:
 *   - ("2026-07-01", "id") → "1 Juli 2026"
 *   - ("2026-07-01", "en") → "July 1, 2026"
 *
 * @param {string} isoDate - Tanggal dalam format ISO 8601 (mis. "2026-07-01")
 * @param {'id'|'en'} [lang="id"] - Kode bahasa output
 * @returns {string} Tanggal yang sudah diformat sesuai bahasa
 * @throws {TypeError} Jika isoDate bukan string valid atau tanggal tidak valid
 */
export function formatTanggal(isoDate, lang = "id") {
  if (typeof isoDate !== "string" || isoDate.trim() === "") {
    throw new TypeError(`formatTanggal: isoDate harus berupa string non-kosong, diterima: ${JSON.stringify(isoDate)}`);
  }

  const tanggal = new Date(isoDate);

  if (isNaN(tanggal.getTime())) {
    throw new TypeError(`formatTanggal: "${isoDate}" bukan tanggal yang valid`);
  }

  /** @type {'id'|'en'} */
  const validLang = lang === "en" ? "en" : "id";
  const locale = validLang === "id" ? "id-ID" : "en-US";

  return tanggal.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
