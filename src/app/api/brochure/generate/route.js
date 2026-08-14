import { NextResponse } from 'next/server';
import { listings } from '@/data/listings';
import { generateBrochureImage } from '@/lib/brochure/generator';

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
 * GET /api/brochure/generate?slug=...&download=true|false&fresh=true|false
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const isDownload = searchParams.get('download') === 'true';
    const isFresh = searchParams.get('fresh') === 'true';

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

    // Jika download=true, kirim langsung sebagai attachment file download stream
    if (isDownload) {
      const { imageBytes } = await generateBrochureImage(listing, {
        upload: false,
        forceFresh: isFresh,
      });
      return new NextResponse(imageBytes, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition': `attachment; filename="brosur-${listing.slug}.jpg"`,
        },
      });
    }

    // Generate dan upload ke Cloudinary sebagai image (JPG)
    const { cloudinaryUrl } = await generateBrochureImage(listing, {
      upload: true,
      forceFresh: isFresh,
    });

    return NextResponse.json({
      success: true,
      id: listing.id,
      slug: listing.slug,
      nama: listing.nama,
      cloudinaryUrl,
      message: 'Gambar brosur berhasil dibuat dan diunggah ke Cloudinary',
    });
  } catch (error) {
    console.error('Error generating brochure image:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gagal membuat gambar brosur',
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
    const isFresh = body?.fresh === true;

    const listing = customListing || findListing(slug, body?.id);

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing data tidak ditemukan' },
        { status: 404 }
      );
    }

    const { cloudinaryUrl } = await generateBrochureImage(listing, {
      upload: true,
      forceFresh: isFresh,
    });

    return NextResponse.json({
      success: true,
      slug: listing.slug,
      cloudinaryUrl,
      message: 'Gambar brosur berhasil dibuat dan diunggah ke Cloudinary',
    });
  } catch (error) {
    console.error('Error in POST /api/brochure/generate:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gagal memproses gambar brosur',
      },
      { status: 500 }
    );
  }
}
