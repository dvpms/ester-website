import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { uploadToCloudinary } from '@/lib/cloudinary';

// In-memory cache with TTL & in-flight promise deduplication
const imageCache = new Map();
const inFlightPromises = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Resolves the base URL dynamically for Puppeteer page navigation.
 * 
 * @returns {string}
 */
function getBaseUrl() {
  // On Vercel (Preview or Production), always prioritize VERCEL_URL so Puppeteer accesses
  // the current deployment's own routes (rather than external production which may not have new routes)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}

/**
 * Launches Puppeteer browser instance:
 * - On Vercel / AWS Lambda: Uses @sparticuz/chromium + puppeteer-core
 * - On Local Development: Uses local Puppeteer or installed Chrome/Edge
 * 
 * @returns {Promise<import('puppeteer-core').Browser>}
 */
async function launchBrowser() {
  const isServerlessLinux =
    (Boolean(process.env.VERCEL) ||
      Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
      Boolean(process.env.AWS_EXECUTION_ENV)) &&
    process.platform === 'linux';

  if (isServerlessLinux) {
    const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
    const remoteTarballUrl = `https://github.com/Sparticuz/chromium/releases/download/v153.0.0/chromium-v153.0.0-pack.${arch}.tar`;

    let executablePath;
    try {
      executablePath = await chromium.executablePath();
    } catch (err) {
      console.warn('Local chromium binary not found in bundle, using remote release pack:', err?.message);
      executablePath = await chromium.executablePath(remoteTarballUrl);
    }

    return await puppeteerCore.launch({
      args: [
        ...chromium.args,
        '--hide-scrollbars',
        '--disable-web-security',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--no-zygote',
        '--single-process',
        '--font-render-hinting=none',
      ],
      defaultViewport: {
        width: 794,
        height: 1123,
        deviceScaleFactor: 2,
      },
      executablePath,
      headless: chromium.headless,
    });
  }

  // Local Development (Windows / macOS)
  try {
    const puppeteer = (await import('puppeteer')).default;
    return await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--font-render-hinting=none',
      ],
    });
  } catch {
    const baseLaunchOptions = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--font-render-hinting=none',
      ],
    };
    try {
      return await puppeteerCore.launch({ ...baseLaunchOptions, channel: 'chrome' });
    } catch {
      return await puppeteerCore.launch({ ...baseLaunchOptions, channel: 'msedge' });
    }
  }
}

/**
 * Core high-definition brochure image screenshot routine (1588 x 2246 px).
 * 
 * @param {import('@/lib/types').Listing} listing
 * @param {Object} options
 * @returns {Promise<{ imageBytes: Uint8Array, cloudinaryUrl?: string }>}
 */
async function executeImageGeneration(listing, options) {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    // Set viewport to exact A4 pixel aspect ratio (794 x 1123 px with 2x scale for 1588x2246 px Ultra HD image)
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    let targetUrl = `${getBaseUrl()}/preview-brosur/print?slug=${listing.slug}`;
    if (options.coverImage || options.interiorImages) {
      const coverParam = options.coverImage ? `&cover=${encodeURIComponent(options.coverImage)}` : '';
      const interiorParam = options.interiorImages ? `&interior=${encodeURIComponent(JSON.stringify(options.interiorImages))}` : '';
      targetUrl = `${targetUrl}${coverParam}${interiorParam}`;
    }

    // 1. Optimasi request interception untuk memblokir tracking/analitik yang memperlambat render
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      const resourceType = req.resourceType();
      if (
        url.includes('google-analytics') ||
        url.includes('googletagmanager') ||
        url.includes('/_vercel/insights') ||
        url.includes('/_vercel/speed-insights') ||
        resourceType === 'media'
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // 2. Navigasi cepat dengan 'domcontentloaded'
    console.log(`[Puppeteer] Navigating to: ${targetUrl}`);
    const response = await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 25000,
    });
    const status = response ? response.status() : null;
    console.log(`[Puppeteer] Page response status: ${status} for ${targetUrl}`);
    if (status && status >= 400) {
      throw new Error(`Puppeteer gagal memuat brosur: HTTP ${status} di ${targetUrl}`);
    }

    // 3. Pastikan elemen brosur dan seluruh font web telah selesai termuat
    await Promise.all([
      page.waitForSelector('#brochure-container', { timeout: 15000 }),
      page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve())).catch(() => null),
    ]);

    // 4. Tunggu foto-foto di dalam #brochure-container selesai termuat
    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll('#brochure-container img'));
      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
            setTimeout(resolve, 2500); // Batas aman 2.5s per gambar
          });
        })
      );
    }).catch(() => null);

    // Explicitly hide only global website layout elements
    await page.addStyleTag({
      content: `
        body > header, body > footer, nav, aside, [aria-label*="WhatsApp"], [aria-label*="Chat"] {
          display: none !important;
        }
        main {
          padding-top: 0px !important;
          margin: 0px !important;
        }
        body {
          background-color: #ffffff !important;
          margin: 0px !important;
          padding: 0px !important;
        }
        #brochure-container {
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important;
        }
      `,
    });

    // Jeda singkat 300ms agar styling CSS selesai di-paint
    await new Promise((r) => setTimeout(r, 300));

    // Capture pixel-perfect high-res screenshot
    const container = await page.$('#brochure-container');
    const screenshotBuffer = container
      ? await container.screenshot({ type: 'jpeg', quality: 95 })
      : await page.screenshot({
          type: 'jpeg',
          quality: 95,
          clip: { x: 0, y: 0, width: 794, height: 1123 },
        });

    const imageBytes = new Uint8Array(screenshotBuffer);

    let cloudinaryUrl;
    if (options.upload) {
      const uploadResult = await uploadToCloudinary(Buffer.from(imageBytes), {
        folder: `esther-website/listings/${listing.slug}/brochure`,
        public_id: `brosur-${listing.slug}`,
        resource_type: 'image',
        format: 'jpg',
        overwrite: true,
      });
      cloudinaryUrl = uploadResult.secure_url;
    }

    return {
      imageBytes,
      pdfBytes: imageBytes, // backward compatibility
      cloudinaryUrl,
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Generates an HD JPEG brochure image for a listing with in-memory caching and request deduplication.
 * 
 * @param {import('@/lib/types').Listing} listing - Property listing data
 * @param {Object} [options]
 * @param {boolean} [options.upload=true] - Whether to upload to Cloudinary
 * @param {boolean} [options.forceFresh=false] - Bypass cache
 * @returns {Promise<{ imageBytes: Uint8Array, pdfBytes: Uint8Array, cloudinaryUrl?: string }>}
 */
export async function generateBrochureImage(listing, options = { upload: true, forceFresh: false }) {
  if (!listing) {
    throw new Error('generateBrochureImage: Listing data is required');
  }

  const cacheKey = `${listing.slug}-${options.upload ? 'uploaded' : 'buffer'}`;

  // 1. Return cached result if valid and not forcing fresh
  if (!options.forceFresh) {
    const cached = imageCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return {
        imageBytes: cached.imageBytes,
        pdfBytes: cached.imageBytes,
        cloudinaryUrl: cached.cloudinaryUrl,
      };
    }
  }

  // 2. Deduplicate concurrent in-flight requests
  if (inFlightPromises.has(cacheKey)) {
    return await inFlightPromises.get(cacheKey);
  }

  // 3. Launch generation and share promise
  const generationPromise = executeImageGeneration(listing, options);
  inFlightPromises.set(cacheKey, generationPromise);

  try {
    const result = await generationPromise;
    imageCache.set(cacheKey, {
      ...result,
      timestamp: Date.now(),
    });
    return result;
  } finally {
    inFlightPromises.delete(cacheKey);
  }
}

// Alias for backward compatibility
export const generateBrochurePdf = generateBrochureImage;
