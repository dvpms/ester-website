// src/app/admin/(dashboard)/properti/[id]/edit/page.js
// Halaman edit data properti, foto galeri, dan kurasi brosur

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ListingForm } from '@/components/admin/listings/ListingForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    select: { nama: true },
  });

  return {
    title: listing ? `Edit ${listing.nama} | Esther Property CMS` : 'Edit Properti | Esther Property CMS',
  };
}

export default async function AdminEditPropertiPage({ params }) {
  const { id } = await params;

  const [listingRaw, kawasanList] = await Promise.all([
    prisma.listing.findUnique({
      where: { id },
    }),
    prisma.kawasan.findMany({
      orderBy: { nama: 'asc' },
      select: { id: true, nama: true, slug: true },
    }).catch(() => []),
  ]);

  if (!listingRaw) {
    notFound();
  }

  // Serialisasi BigInt harga ke Number
  const initialData = {
    ...listingRaw,
    harga: Number(listingRaw.harga),
  };

  return <ListingForm initialData={initialData} kawasanList={kawasanList} isEdit={true} />;
}
