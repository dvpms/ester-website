// src/app/api/admin/upload/route.js
// API Endpoint terproteksi untuk upload media ke Cloudinary dengan folder hirarki

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadListingImage } from '@/lib/cloudinary';
import { applyRateLimit, RateLimits } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // 0. Rate Limiting Protection (Maks 20 upload / menit per IP)
    const rateCheck = applyRateLimit(request, RateLimits.UPLOAD);
    if (!rateCheck.allowed) {
      return rateCheck.response;
    }

    // 1. Verifikasi Autentikasi Admin
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized: Harap login sebagai administrator' }, { status: 401 });
    }

    // 2. Baca FormData
    const formData = await request.formData();
    const file = formData.get('file');
    const slug = formData.get('slug') || 'temp-listing';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Berkas foto tidak ditemukan' }, { status: 400 });
    }

    // 3. Validasi tipe file & ukuran (maks 8MB per foto)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Format file tidak didukung. Gunakan JPG, PNG, atau WebP.' }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'Ukuran foto melebihi batas maksimal 8MB' }, { status: 400 });
    }

    // 4. Konversi File ke Buffer & Upload ke folder `esther-website/listings/${slug}/`
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadListingImage({
      buffer,
      slug,
      fileName: file.name,
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error) {
    console.error('Error in /api/admin/upload:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mengunggah gambar ke server' },
      { status: 500 }
    );
  }
}
