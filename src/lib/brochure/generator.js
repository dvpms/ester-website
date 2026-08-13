import puppeteer from 'puppeteer';
import { uploadToCloudinary } from '@/lib/cloudinary';

// In-memory cache with TTL & in-flight promise deduplication
const pdfCache = new Map();
const inFlightPromises = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Resolves the base URL dynamically for Puppeteer page navigation.
 * 
 * @returns {string}
 */
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}

/**
 * Launches Puppeteer browser instance with multi-channel fallback (Chromium -> Chrome -> Edge).
 * 
 * @returns {Promise<import('puppeteer').Browser>}
 */
async function launchBrowser() {
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
    return await puppeteer.launch(baseLaunchOptions);
  } catch {
    try {
      return await puppeteer.launch({ ...baseLaunchOptions, channel: 'chrome' });
    } catch {
      return await puppeteer.launch({ ...baseLaunchOptions, channel: 'msedge' });
    }
  }
}

/**
 * Core PDF generation routine.
 * 
 * @param {import('@/lib/types').Listing} listing
 * @param {Object} options
 * @returns {Promise<{ pdfBytes: Uint8Array, cloudinaryUrl?: string }>}
 */
async function executePdfGeneration(listing, options) {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    // Set viewport to exact A4 pixel aspect ratio (794 x 1123 px with 2x device scale for 300 DPI)
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    const targetUrl = `${getBaseUrl()}/preview-brosur/print?slug=${listing.slug}`;
    await page.goto(targetUrl, {
      waitUntil: ['load', 'networkidle0'],
      timeout: 30000,
    });

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

    // Wait a brief moment for all images and fonts to settle
    await new Promise((r) => setTimeout(r, 600));

    // Generate standard A4 PDF with full backgrounds and zero margins
    const pdfBuffer = await page.pdf({
      width: '794px',
      height: '1123px',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      preferCSSPageSize: true,
    });

    const pdfBytes = new Uint8Array(pdfBuffer);

    let cloudinaryUrl;
    if (options.upload) {
      const uploadResult = await uploadToCloudinary(Buffer.from(pdfBytes), {
        public_id: `brosur-${listing.slug}`,
        resource_type: 'raw',
        format: 'pdf',
        overwrite: true,
      });
      cloudinaryUrl = uploadResult.secure_url;
    }

    return {
      pdfBytes,
      cloudinaryUrl,
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Generates an A4 PDF brochure for a listing with in-memory caching and request deduplication.
 * 
 * @param {import('@/lib/types').Listing} listing - Property listing data
 * @param {Object} [options]
 * @param {boolean} [options.upload=true] - Whether to upload to Cloudinary
 * @param {boolean} [options.forceFresh=false] - Bypass cache
 * @returns {Promise<{ pdfBytes: Uint8Array, cloudinaryUrl?: string }>}
 */
export async function generateBrochurePdf(listing, options = { upload: true, forceFresh: false }) {
  if (!listing) {
    throw new Error('generateBrochurePdf: Listing data is required');
  }

  const cacheKey = `${listing.slug}-${options.upload ? 'uploaded' : 'buffer'}`;

  // 1. Return cached result if valid and not forcing fresh
  if (!options.forceFresh) {
    const cached = pdfCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return {
        pdfBytes: cached.pdfBytes,
        cloudinaryUrl: cached.cloudinaryUrl,
      };
    }
  }

  // 2. Deduplicate concurrent in-flight requests (prevents double browser launch)
  if (inFlightPromises.has(cacheKey)) {
    return await inFlightPromises.get(cacheKey);
  }

  // 3. Launch generation and share promise
  const generationPromise = executePdfGeneration(listing, options);
  inFlightPromises.set(cacheKey, generationPromise);

  try {
    const result = await generationPromise;
    pdfCache.set(cacheKey, {
      ...result,
      timestamp: Date.now(),
    });
    return result;
  } finally {
    inFlightPromises.delete(cacheKey);
  }
}
