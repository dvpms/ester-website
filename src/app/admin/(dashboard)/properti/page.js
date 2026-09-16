// src/app/admin/(dashboard)/properti/page.js
// Halaman utama kelola listing properti admin Esther Property CMS

import { prisma } from '@/lib/prisma';
import { ListingManager } from '@/components/admin/listings/ListingManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Kelola Listing Properti | Esther Property CMS',
};

export default async function AdminPropertiPage() {
  // Ambil data listings dan kawasan dari database Neon Postgres
  const [listingsRaw, kawasanList] = await Promise.all([
    prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        nama: true,
        gambarUtama: true,
        lokasiDetail: true,
        kawasanSlug: true,
        kawasanId: true,
        kawasan: {
          select: { id: true, nama: true, slug: true },
        },
        jenisProperti: true,
        segmen: true,
        harga: true,
        status: true,
        featured: true,
        brosurUrl: true,
        galeri: true,
        fotoBrosur: true,
      },
    }).catch(() => []),
    prisma.kawasan.findMany({
      orderBy: { nama: 'asc' },
      select: { id: true, nama: true, slug: true },
    }).catch(() => []),
  ]);

  // Serialisasi BigInt harga ke Number agar aman dikirim ke Client Component
  const listings = listingsRaw.map((item) => ({
    ...item,
    harga: Number(item.harga),
  }));

  return <ListingManager initialListings={listings} kawasanList={kawasanList} />;
}
