import { NextResponse } from 'next/server';
import { listings } from '@/data/listings';
import { generateBrochurePdf } from '@/lib/brochure/generator';

export const dynamic = 'force-dynamic';

/**
 * Helper to find a listing by slug or ID with fallback to first listing.
 * 
 * @param {string|null} slug
 * @param {string|null} id
 * @returns {import('@/lib/types').Listing|undefined}
 */
function findListing(slug, id) {
  if (slug) return listings.find((l) => l.slug === slug);
  if (id) return listings.find((l) => l.id === id);
  return listings[0];
}

/**
 * GET /api/brochure/generate?slug=...&download=true|false
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const isDownload = searchParams.get('download') === 'true';

    const listing = findListing(slug, id);

    if (!listing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Listing properti tidak ditemukan',
          availableSlugs: listings.map((l) => l.slug),
        },
        { status: 404 }
      );
    }

    // Jika download=true, generate PDF dan kirim langsung sebagai response stream
    if (isDownload) {
      const { pdfBytes } = await generateBrochurePdf(listing, { upload: false });
      return new NextResponse(pdfBytes, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="brosur-${listing.slug}.pdf"`,
        },
      });
    }

    // Generate dan upload ke Cloudinary
    const { cloudinaryUrl } = await generateBrochurePdf(listing, { upload: true });

    return NextResponse.json({
      success: true,
      id: listing.id,
      slug: listing.slug,
      nama: listing.nama,
      cloudinaryUrl,
      message: 'Brosur berhasil dibuat dan diunggah ke Cloudinary',
    });
  } catch (error) {
    console.error('Error generating brochure:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gagal membuat brosur PDF',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/brochure/generate (menerima payload listing custom)
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const slug = body?.slug;
    const customListing = body?.listing;

    const listing = customListing || findListing(slug, body?.id);

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing data tidak ditemukan' },
        { status: 404 }
      );
    }

    const { cloudinaryUrl } = await generateBrochurePdf(listing, { upload: true });

    return NextResponse.json({
      success: true,
      slug: listing.slug,
      cloudinaryUrl,
      message: 'Brosur berhasil dibuat dan diunggah ke Cloudinary',
    });
  } catch (error) {
    console.error('Error in POST /api/brochure/generate:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gagal memproses brosur',
      },
      { status: 500 }
    );
  }
}
