'use server';

// src/app/actions/brochureActions.js
// Server Action untuk meng-generate brosur HD dengan foto-foto terkurasi & simpan ke Cloudinary

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { generateBrochureImage } from '@/lib/brochure/generator';

export async function generateCuratedBrochureAction({ listingId, coverImage, interiorImages = [] }) {
  try {
    // 1. Verifikasi Autentikasi Admin
    const session = await auth();
    if (!session || !session.user) {
      return { error: 'Akses ditolak: Harap login sebagai administrator' };
    }

    if (!listingId) {
      return { error: 'ID listing diperlukan' };
    }

    // 2. Ambil data listing dari Neon Postgres
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { kawasan: { select: { nama: true } } },
    });

    if (!listing) {
      return { error: 'Data listing tidak ditemukan di database' };
    }

    const effectiveCover = coverImage || listing.gambarUtama || listing.galeri?.[0];
    const effectiveInterior = Array.isArray(interiorImages) && interiorImages.length > 0
      ? interiorImages.slice(0, 5)
      : (Array.isArray(listing.galeri) ? listing.galeri.slice(1, 6) : []);

    // 3. Jalankan Puppeteer Generator dengan opsi kurasi foto
    const result = await generateBrochureImage(
      {
        ...listing,
        harga: Number(listing.harga),
      },
      {
        upload: true,
        forceFresh: true,
        coverImage: effectiveCover,
        interiorImages: effectiveInterior,
      }
    );

    if (!result?.cloudinaryUrl) {
      return { error: 'Gagal mengunggah brosur ke Cloudinary' };
    }

    // 4. Perbarui data brosur di database Neon Postgres
    await prisma.listing.update({
      where: { id: listingId },
      data: {
        brosurUrl: result.cloudinaryUrl,
        fotoBrosur: effectiveInterior,
      },
    });

    // 5. On-Demand Revalidation
    revalidatePath('/admin/properti');
    revalidatePath(`/admin/properti/${listingId}/edit`);
    revalidatePath(`/properti/${listing.slug}`);
    revalidatePath('/');

    return {
      success: true,
      brosurUrl: result.cloudinaryUrl,
    };
  } catch (error) {
    console.error('Error in generateCuratedBrochureAction:', error);
    return {
      error: error.message || 'Terjadi kesalahan saat memproses generasi brosur',
    };
  }
}
