// src/app/preview-brosur/print/page.js
// Halaman cetak resolusi tinggi untuk Puppeteer generator dan pratinjau brosur A4

import { prisma } from '@/lib/prisma';
import { listings as fallbackListings } from '@/data/listings';
import { BrochureTemplate } from '@/components/brochure/BrochureTemplate';

export const dynamic = 'force-dynamic';

export default async function BrochurePrintPage({ searchParams }) {
  const params = await searchParams;
  const slug = params?.slug;

  // 1. Coba ambil listing dari database Neon Postgres
  let listing = null;
  if (slug) {
    try {
      const dbListing = await prisma.listing.findUnique({
        where: { slug },
        include: { kawasan: { select: { nama: true } } },
      });

      if (dbListing) {
        listing = {
          ...dbListing,
          harga: Number(dbListing.harga),
        };
      }
    } catch (e) {
      console.warn('Gagal memuat listing dari database untuk print brosur, mencoba fallback:', e.message);
    }
  }

  // 2. Jika tidak ada di DB, fallback ke data statis
  if (!listing) {
    listing = fallbackListings.find((l) => l.slug === slug) || fallbackListings[0];
  }

  // 3. Jika ada parameter kurasi foto kustom (via searchParams atau dari database)
  let coverImage = params?.cover || listing.gambarUtama || listing.galeri?.[0];
  let interiorImages = [];

  if (params?.interior) {
    try {
      interiorImages = JSON.parse(params.interior);
    } catch {
      interiorImages = params.interior.split(',');
    }
  } else if (Array.isArray(listing.fotoBrosur) && listing.fotoBrosur.length > 0) {
    interiorImages = listing.fotoBrosur;
  } else if (Array.isArray(listing.galeri)) {
    interiorImages = listing.galeri.slice(1, 6);
  }

  // Susun urutan galeri: index 0 = cover facade, index 1..5 = interior
  const customizedListing = {
    ...listing,
    galeri: [coverImage, ...interiorImages],
  };

  return (
    <>
      <style>{`
        body > header, body > footer, nav, aside, [aria-label*="WhatsApp"], [aria-label*="Chat"] {
          display: none !important;
        }
        main {
          padding-top: 0 !important;
          margin: 0 !important;
        }
        body {
          background: #ffffff !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        #brochure-container {
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div className="w-[794px] h-[1123px] overflow-hidden p-0 m-0 bg-white">
        <BrochureTemplate listing={customizedListing} />
      </div>
    </>
  );
}
