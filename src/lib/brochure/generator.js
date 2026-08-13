import puppeteer from 'puppeteer';
import { uploadToCloudinary } from '@/lib/cloudinary';

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
 * Generates a 100% pixel-perfect A4 PDF brochure using Puppeteer (Headless Chrome)
 * and uploads it to Cloudinary.
 * 
 * @param {import('@/lib/types').Listing} listing - Property listing data
 * @param {Object} [options]
 * @param {boolean} [options.upload=true] - Whether to upload to Cloudinary
 * @returns {Promise<{ pdfBytes: Uint8Array, cloudinaryUrl?: string }>}
 */
export async function generateBrochurePdf(listing, options = { upload: true }) {
  if (!listing) {
    throw new Error('generateBrochurePdf: Listing data is required');
  }

  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    // Set viewport to exact A4 pixel aspect ratio (794 x 1123 px with 2x device scale for 300 DPI high-definition)
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
