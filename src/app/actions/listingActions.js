'use server';

// src/app/actions/listingActions.js
// Server Actions terpusat untuk modul manajemen properti (CRUD) Esther Property

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

/**
 * Helper untuk memverifikasi apakah sesi pengguna memiliki akses admin.
 * Melemparkan error jika belum terotentikasi.
 */
async function requireAdminSession() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('Akses ditolak: Anda harus login sebagai administrator');
  }
  return session.user;
}

/**
 * Menghasilkan slug URL yang ramah SEO dan unik.
 * 
 * @param {string} text - Teks judul properti
 * @param {string} [id] - ID listing saat ini untuk pengecualian saat update
 * @returns {Promise<string>}
 */
async function generateUniqueSlug(text, id = null) {
  let baseSlug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!baseSlug) baseSlug = 'properti';

  let currentSlug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.listing.findUnique({
      where: { slug: currentSlug },
      select: { id: true },
    });

    if (!existing || (id && existing.id === id)) {
      return currentSlug;
    }

    currentSlug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * Membuat listing properti baru di database Neon Postgres.
 * 
 * @param {Object} data - Data lengkap listing
 * @returns {Promise<{ success?: boolean, listing?: any, error?: string }>}
 */
export async function createListing(data) {
  try {
    await requireAdminSession();

    if (!data.nama) {
      return { error: 'Nama properti wajib diisi' };
    }
    if (!data.kawasanId) {
      return { error: 'Kawasan hub wajib dipilih' };
    }
    if (!data.gambarUtama) {
      return { error: 'Gambar utama wajib dipilih untuk sampul listing' };
    }

    // Ambil data kawasan untuk memastikan relasi dan mendapatkan kawasanSlug
    const kawasan = await prisma.kawasan.findUnique({
      where: { id: data.kawasanId },
      select: { id: true, slug: true },
    });

    if (!kawasan) {
      return { error: 'Kawasan yang dipilih tidak ditemukan di database' };
    }

    const slug = await generateUniqueSlug(data.slug || data.nama);
    const hargaParsed = BigInt(Math.round(Number(data.harga || 0)));

    const newListing = await prisma.listing.create({
      data: {
        slug,
        nama: data.nama,
        namaEn: data.namaEn || data.nama,
        judulBrosur: data.judulBrosur || data.nama,
        segmen: data.segmen || 'secondary',
        jenisProperti: data.jenisProperti || 'rumah',
        transaksi: data.transaksi || 'dijual',
        kawasanId: kawasan.id,
        kawasanSlug: kawasan.slug,
        harga: hargaParsed,
        lokasiDetail: data.lokasiDetail || '',
        spesifikasi: data.spesifikasi || {},
        fiturUnggulan: Array.isArray(data.fiturUnggulan) ? data.fiturUnggulan : [],
        bonusInterior: Array.isArray(data.bonusInterior) ? data.bonusInterior : [],
        lat: data.lat ? parseFloat(data.lat) : null,
        lng: data.lng ? parseFloat(data.lng) : null,
        tautanMaps: data.tautanMaps || null,
        gambarUtama: data.gambarUtama,
        galeri: Array.isArray(data.galeri) ? data.galeri : [data.gambarUtama],
        fotoBrosur: Array.isArray(data.fotoBrosur) ? data.fotoBrosur : [],
        brosurUrl: data.brosurUrl || null,
        status: data.status || 'tersedia',
        developerNama: data.developerNama || null,
        pemilikNama: data.pemilikNama || null,
        deskripsi: data.deskripsi || '',
        deskripsiEn: data.deskripsiEn || data.deskripsi || '',
        featured: Boolean(data.featured),
      },
    });

    // On-demand revalidation
    revalidatePath('/admin');
    revalidatePath('/admin/properti');
    revalidatePath('/properti');
    revalidatePath(`/kawasan/${kawasan.slug}`);
    revalidatePath('/');

    return {
      success: true,
      listing: {
        ...newListing,
        harga: Number(newListing.harga),
      },
    };
  } catch (error) {
    console.error('Error in createListing action:', error);
    return { error: error.message || 'Gagal menambahkan listing properti' };
  }
}

/**
 * Memperbarui listing properti yang sudah ada.
 * 
 * @param {string} id - ID unik listing
 * @param {Object} data - Data pembaruan
 * @returns {Promise<{ success?: boolean, listing?: any, error?: string }>}
 */
export async function updateListing(id, data) {
  try {
    await requireAdminSession();

    if (!id) return { error: 'ID listing diperlukan' };

    const current = await prisma.listing.findUnique({
      where: { id },
      select: { id: true, slug: true, kawasanSlug: true },
    });

    if (!current) {
      return { error: 'Listing tidak ditemukan' };
    }

    let slug = current.slug;
    if (data.slug && data.slug !== current.slug) {
      slug = await generateUniqueSlug(data.slug, id);
    }

    let kawasanSlug = current.kawasanSlug;
    if (data.kawasanId) {
      const k = await prisma.kawasan.findUnique({
        where: { id: data.kawasanId },
        select: { slug: true },
      });
      if (k) kawasanSlug = k.slug;
    }

    const updatePayload = {
      slug,
      ...(data.nama && { nama: data.nama }),
      ...(data.namaEn && { namaEn: data.namaEn }),
      ...(data.judulBrosur !== undefined && { judulBrosur: data.judulBrosur }),
      ...(data.segmen && { segmen: data.segmen }),
      ...(data.jenisProperti && { jenisProperti: data.jenisProperti }),
      ...(data.transaksi && { transaksi: data.transaksi }),
      ...(data.kawasanId && { kawasanId: data.kawasanId, kawasanSlug }),
      ...(data.harga !== undefined && { harga: BigInt(Math.round(Number(data.harga))) }),
      ...(data.lokasiDetail !== undefined && { lokasiDetail: data.lokasiDetail }),
      ...(data.spesifikasi !== undefined && { spesifikasi: data.spesifikasi }),
      ...(data.fiturUnggulan !== undefined && { fiturUnggulan: data.fiturUnggulan }),
      ...(data.bonusInterior !== undefined && { bonusInterior: data.bonusInterior }),
      ...(data.lat !== undefined && { lat: data.lat ? parseFloat(data.lat) : null }),
      ...(data.lng !== undefined && { lng: data.lng ? parseFloat(data.lng) : null }),
      ...(data.tautanMaps !== undefined && { tautanMaps: data.tautanMaps }),
      ...(data.gambarUtama && { gambarUtama: data.gambarUtama }),
      ...(data.galeri && { galeri: data.galeri }),
      ...(data.fotoBrosur !== undefined && { fotoBrosur: data.fotoBrosur }),
      ...(data.brosurUrl !== undefined && { brosurUrl: data.brosurUrl }),
      ...(data.status && { status: data.status }),
      ...(data.developerNama !== undefined && { developerNama: data.developerNama }),
      ...(data.pemilikNama !== undefined && { pemilikNama: data.pemilikNama }),
      ...(data.deskripsi !== undefined && { deskripsi: data.deskripsi }),
      ...(data.deskripsiEn !== undefined && { deskripsiEn: data.deskripsiEn }),
      ...(data.featured !== undefined && { featured: Boolean(data.featured) }),
    };

    const updated = await prisma.listing.update({
      where: { id },
      data: updatePayload,
    });

    revalidatePath('/admin');
    revalidatePath('/admin/properti');
    revalidatePath(`/admin/properti/${id}/edit`);
    revalidatePath('/properti');
    revalidatePath(`/properti/${current.slug}`);
    revalidatePath(`/properti/${slug}`);
    revalidatePath(`/kawasan/${kawasanSlug}`);
    revalidatePath('/');

    return {
      success: true,
      listing: {
        ...updated,
        harga: Number(updated.harga),
      },
    };
  } catch (error) {
    console.error('Error in updateListing action:', error);
    return { error: error.message || 'Gagal memperbarui listing properti' };
  }
}

/**
 * Menghapus listing properti dari database.
 * 
 * @param {string} id - ID listing
 * @returns {Promise<{ success?: boolean, error?: string }>}
 */
export async function deleteListing(id) {
  try {
    await requireAdminSession();

    const existing = await prisma.listing.findUnique({
      where: { id },
      select: { slug: true, kawasanSlug: true },
    });

    if (!existing) {
      return { error: 'Listing tidak ditemukan' };
    }

    await prisma.listing.delete({
      where: { id },
    });

    revalidatePath('/admin');
    revalidatePath('/admin/properti');
    revalidatePath('/properti');
    revalidatePath(`/kawasan/${existing.kawasanSlug}`);
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error in deleteListing action:', error);
    return { error: error.message || 'Gagal menghapus listing properti' };
  }
}

/**
 * Toggle status featured listing (rekomendasi halaman utama).
 * 
 * @param {string} id - ID listing
 * @returns {Promise<{ success?: boolean, featured?: boolean, error?: string }>}
 */
export async function toggleFeaturedListing(id) {
  try {
    await requireAdminSession();

    const listing = await prisma.listing.findUnique({
      where: { id },
      select: { featured: true, slug: true },
    });

    if (!listing) return { error: 'Listing tidak ditemukan' };

    const updated = await prisma.listing.update({
      where: { id },
      data: { featured: !listing.featured },
    });

    revalidatePath('/admin');
    revalidatePath('/admin/properti');
    revalidatePath('/');
    revalidatePath('/properti');

    return { success: true, featured: updated.featured };
  } catch (error) {
    console.error('Error in toggleFeaturedListing action:', error);
    return { error: error.message || 'Gagal mengubah status featured' };
  }
}

/**
 * Memperbarui status ketersediaan properti (tersedia | terjual | proses).
 * 
 * @param {string} id - ID listing
 * @param {'tersedia'|'terjual'|'proses'} status - Status baru
 * @returns {Promise<{ success?: boolean, status?: string, error?: string }>}
 */
export async function updateListingStatus(id, status) {
  try {
    await requireAdminSession();

    const allowed = ['tersedia', 'terjual', 'proses'];
    if (!allowed.includes(status)) {
      return { error: 'Status tidak valid' };
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: { status },
      select: { status: true, slug: true },
    });

    revalidatePath('/admin');
    revalidatePath('/admin/properti');
    revalidatePath('/properti');
    revalidatePath(`/properti/${updated.slug}`);

    return { success: true, status: updated.status };
  } catch (error) {
    console.error('Error in updateListingStatus action:', error);
    return { error: error.message || 'Gagal memperbarui status ketersediaan' };
  }
}
