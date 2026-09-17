// src/app/admin/(dashboard)/properti/page.js
// Halaman utama kelola listing properti admin Esther Property CMS
// Menggunakan Server-Side & Database-Level Pagination (SQL LIMIT & OFFSET via getPaginatedListings)

import { prisma } from '@/lib/prisma';
import { getPaginatedListings } from '@/lib/db/listingQueries';
import { ListingManager } from '@/components/admin/listings/ListingManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Kelola Listing Properti | Esther Property CMS',
};

export default async function AdminPropertiPage(props) {
  const searchParams = await props.searchParams;

  const page = parseInt(searchParams?.page || '1', 10) || 1;
  const pageSize = parseInt(searchParams?.pageSize || '10', 10) || 10;
  const search = searchParams?.search || '';
  const status = searchParams?.status || '';
  const kawasanId = searchParams?.kawasan || '';
  const segmen = searchParams?.segmen || '';
  const jenis = searchParams?.jenis || '';

  // Ambil data listing terpaginasi (database LIMIT & OFFSET) dan master kawasan
  const [paginatedData, kawasanList] = await Promise.all([
    getPaginatedListings({
      page,
      pageSize,
      search,
      status,
      kawasanId,
      segmen,
      jenis,
    }),
    prisma.kawasan.findMany({
      orderBy: { nama: 'asc' },
      select: { id: true, nama: true, slug: true },
    }).catch(() => []),
  ]);

  return (
    <ListingManager
      initialListings={paginatedData.listings}
      pagination={paginatedData.pagination}
      kawasanList={kawasanList}
      currentFilters={{
        search,
        status,
        kawasan: kawasanId,
        segmen,
        jenis,
        page,
        pageSize,
      }}
    />
  );
}
