// src/lib/db/listingQueries.js
// Query data layer untuk modul Listing Properti Esther Property CMS
// Menggunakan PostgreSQL Raw Query ($queryRaw) untuk efisiensi 1 round-trip (Window Function COUNT(*) OVER())
// dan server-side pagination (LIMIT / OFFSET)

import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma/client';

/**
 * Mengambil daftar listing properti dengan pagination di level database (SQL LIMIT & OFFSET)
 * serta menghitung total baris yang cocok via Window Function COUNT(*) OVER().
 * 
 * @param {Object} params
 * @param {number} [params.page=1] - Nomor halaman (1-indexed)
 * @param {number} [params.pageSize=10] - Jumlah item per halaman (10, 20, 50)
 * @param {string} [params.search=''] - Kata kunci pencarian (nama, slug, lokasi)
 * @param {string} [params.status=''] - Filter status: 'tersedia' | 'proses' | 'terjual'
 * @param {string} [params.kawasanId=''] - Filter ID kawasan
 * @param {string} [params.segmen=''] - Filter segmen: 'primary' | 'secondary'
 * @returns {Promise<{ listings: Array, pagination: { currentPage: number, pageSize: number, totalItems: number, totalPages: number } }>}
 */
export async function getPaginatedListings({
  page = 1,
  pageSize = 10,
  search = '',
  status = '',
  kawasanId = '',
  segmen = '',
} = {}) {
  const safePage = Math.max(1, parseInt(page, 10) || 1);
  const safePageSize = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 10));
  const offset = (safePage - 1) * safePageSize;

  // 1. Susun klausul WHERE secara dinamis & aman menggunakan Prisma.sql
  const conditions = [];

  const trimmedSearch = (search || '').trim();
  if (trimmedSearch) {
    const searchPattern = `%${trimmedSearch}%`;
    conditions.push(
      Prisma.sql`(l.nama ILIKE ${searchPattern} OR l.slug ILIKE ${searchPattern} OR l.lokasi_detail ILIKE ${searchPattern})`
    );
  }

  const trimmedStatus = (status || '').trim();
  if (trimmedStatus) {
    conditions.push(Prisma.sql`l.status = ${trimmedStatus}`);
  }

  const trimmedKawasanId = (kawasanId || '').trim();
  if (trimmedKawasanId) {
    conditions.push(Prisma.sql`l.kawasan_id = ${trimmedKawasanId}`);
  }

  const trimmedSegmen = (segmen || '').trim();
  if (trimmedSegmen) {
    conditions.push(Prisma.sql`l.segmen = ${trimmedSegmen}`);
  }

  const whereClause =
    conditions.length > 0
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;

  // 2. Eksekusi 1 query tunggal: Data + Total Count dalam 1 database round-trip
  let rows = [];
  try {
    rows = await prisma.$queryRaw`
      SELECT 
        l.id,
        l.slug,
        l.nama,
        l.gambar_utama AS "gambarUtama",
        l.lokasi_detail AS "lokasiDetail",
        l.kawasan_slug AS "kawasanSlug",
        l.kawasan_id AS "kawasanId",
        l.jenis_properti AS "jenisProperti",
        l.segmen,
        l.harga,
        l.status,
        l.featured,
        l.brosur_url AS "brosurUrl",
        l.galeri,
        l.foto_brosur AS "fotoBrosur",
        k.nama AS "kawasanNama",
        COUNT(*) OVER()::int AS "totalCount"
      FROM listings l
      LEFT JOIN kawasan k ON l.kawasan_id = k.id
      ${whereClause}
      ORDER BY l.created_at DESC
      LIMIT ${safePageSize} OFFSET ${offset};
    `;
  } catch (error) {
    console.error('Error in getPaginatedListings raw query:', error);
    // Fallback jika terjadi error
    return {
      listings: [],
      pagination: {
        currentPage: safePage,
        pageSize: safePageSize,
        totalItems: 0,
        totalPages: 1,
      },
    };
  }

  // 3. Tentukan totalItems
  let totalItems = 0;
  if (rows.length > 0) {
    totalItems = rows[0].totalCount || 0;
  } else if (offset > 0) {
    // Jika halaman melebihi data (misal page=99), hitung total item aktual
    const countResult = await prisma.$queryRaw`
      SELECT COUNT(*)::int AS "totalCount"
      FROM listings l
      ${whereClause};
    `.catch(() => [{ totalCount: 0 }]);
    totalItems = countResult?.[0]?.totalCount || 0;
  }

  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  // 4. Format dan serialisasi objek (BigInt -> Number, susun relasi kawasan)
  const listings = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    nama: r.nama,
    gambarUtama: r.gambarUtama,
    lokasiDetail: r.lokasiDetail,
    kawasanSlug: r.kawasanSlug,
    kawasanId: r.kawasanId,
    jenisProperti: r.jenisProperti,
    segmen: r.segmen,
    harga: Number(r.harga),
    status: r.status,
    featured: Boolean(r.featured),
    brosurUrl: r.brosurUrl,
    galeri: Array.isArray(r.galeri) ? r.galeri : [],
    fotoBrosur: Array.isArray(r.fotoBrosur) ? r.fotoBrosur : [],
    kawasan: r.kawasanNama ? { id: r.kawasanId, nama: r.kawasanNama, slug: r.kawasanSlug } : null,
  }));

  return {
    listings,
    pagination: {
      currentPage: safePage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
    },
  };
}
