// src/app/admin/(dashboard)/properti/baru/page.js
// Halaman formulir tambah properti baru

import { prisma } from '@/lib/prisma';
import { ListingForm } from '@/components/admin/listings/ListingForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tambah Listing Properti Baru | Esther Property CMS',
};

export default async function AdminTambahPropertiPage() {
  // Ambil daftar kawasan aktif untuk dropdown
  const kawasanList = await prisma.kawasan.findMany({
    orderBy: { nama: 'asc' },
    select: { id: true, nama: true, slug: true },
  }).catch(() => []);

  return <ListingForm kawasanList={kawasanList} isEdit={false} />;
}
