// prisma/seed.js
// Script migrasi data statis awal ke Neon PostgreSQL via Prisma ORM

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma.js';
import { listings } from '../src/data/listings.js';
import { kawasanList } from '../src/data/kawasan.js';
import { artikelList } from '../src/data/artikel.js';
import { testimonials } from '../src/data/testimonials.js';
import { profile } from '../src/data/profile.js';

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Superadmin User
  const defaultAdminEmail = 'admin@estherproperti.com';
  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'AdminEsther2026!';
  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: defaultAdminEmail },
    update: {},
    create: {
      email: defaultAdminEmail,
      name: 'Esther',
      passwordHash,
      role: 'superadmin',
    },
  });
  console.log(`✅ Default admin created/verified: ${admin.email}`);

  // 2. Seed Kawasan
  console.log(`⏳ Seeding ${kawasanList.length} Kawasan...`);
  for (const k of kawasanList) {
    await prisma.kawasan.upsert({
      where: { id: k.id },
      update: {
        slug: k.slug,
        nama: k.nama,
        namaEn: k.namaEn || k.nama,
        deskripsi: k.deskripsi,
        deskripsiEn: k.deskripsiEn || k.deskripsi,
        fotoHero: k.fotoHero,
        fasilitasUnggulan: k.fasilitasUnggulan,
        fasilitasUnggulanEn: k.fasilitasUnggulanEn || k.fasilitasUnggulan,
        lat: k.koordinat?.lat ?? null,
        lng: k.koordinat?.lng ?? null,
      },
      create: {
        id: k.id,
        slug: k.slug,
        nama: k.nama,
        namaEn: k.namaEn || k.nama,
        deskripsi: k.deskripsi,
        deskripsiEn: k.deskripsiEn || k.deskripsi,
        fotoHero: k.fotoHero,
        fasilitasUnggulan: k.fasilitasUnggulan,
        fasilitasUnggulanEn: k.fasilitasUnggulanEn || k.fasilitasUnggulan,
        lat: k.koordinat?.lat ?? null,
        lng: k.koordinat?.lng ?? null,
      },
    });
  }
  console.log('✅ Kawasan seeding completed.');

  // 3. Seed Listings
  console.log(`⏳ Seeding ${listings.length} Listings...`);
  for (const l of listings) {
    const defaultCover = l.galeri?.[0] || '';
    await prisma.listing.upsert({
      where: { slug: l.slug },
      update: {
        nama: l.nama,
        namaEn: l.namaEn || l.nama,
        judulBrosur: l.judulBrosur || null,
        segmen: l.segmen,
        jenisProperti: l.jenisProperti,
        transaksi: l.transaksi,
        kawasanId: l.kawasanId,
        kawasanSlug: l.kawasanSlug,
        harga: BigInt(l.harga),
        lokasiDetail: l.lokasiDetail,
        spesifikasi: l.spesifikasi || {},
        fiturUnggulan: l.fiturUnggulan || [],
        bonusInterior: l.bonusInterior || [],
        lat: l.koordinat?.lat ?? null,
        lng: l.koordinat?.lng ?? null,
        tautanMaps: l.tautanMaps || null,
        gambarUtama: defaultCover,
        galeri: l.galeri || [],
        fotoBrosur: l.galeri ? l.galeri.slice(0, 6) : [],
        brosurUrl: l.brosurUrl || null,
        status: l.status || 'tersedia',
        developerNama: l.developerNama || null,
        pemilikNama: l.pemilikNama || null,
        deskripsi: l.deskripsi,
        deskripsiEn: l.deskripsiEn || l.deskripsi,
        featured: Boolean(l.featured),
      },
      create: {
        id: l.id || undefined,
        slug: l.slug,
        nama: l.nama,
        namaEn: l.namaEn || l.nama,
        judulBrosur: l.judulBrosur || null,
        segmen: l.segmen,
        jenisProperti: l.jenisProperti,
        transaksi: l.transaksi,
        kawasanId: l.kawasanId,
        kawasanSlug: l.kawasanSlug,
        harga: BigInt(l.harga),
        lokasiDetail: l.lokasiDetail,
        spesifikasi: l.spesifikasi || {},
        fiturUnggulan: l.fiturUnggulan || [],
        bonusInterior: l.bonusInterior || [],
        lat: l.koordinat?.lat ?? null,
        lng: l.koordinat?.lng ?? null,
        tautanMaps: l.tautanMaps || null,
        gambarUtama: defaultCover,
        galeri: l.galeri || [],
        fotoBrosur: l.galeri ? l.galeri.slice(0, 6) : [],
        brosurUrl: l.brosurUrl || null,
        status: l.status || 'tersedia',
        developerNama: l.developerNama || null,
        pemilikNama: l.pemilikNama || null,
        deskripsi: l.deskripsi,
        deskripsiEn: l.deskripsiEn || l.deskripsi,
        featured: Boolean(l.featured),
      },
    });
  }
  console.log('✅ Listings seeding completed.');

  // 4. Seed Artikel
  console.log(`⏳ Seeding ${artikelList.length} Artikel...`);
  for (const a of artikelList) {
    await prisma.artikel.upsert({
      where: { slug: a.slug },
      update: {
        judul: a.judul,
        judulEn: a.judulEn || a.judul,
        ringkasan: a.ringkasan,
        ringkasanEn: a.ringkasanEn || a.ringkasan,
        konten: a.konten,
        kontenEn: a.kontenEn || a.konten,
        thumbnail: a.thumbnail || '',
        tagKawasan: a.tagKawasan || [],
        tags: a.tags || [],
        isPublished: true,
      },
      create: {
        id: a.id || undefined,
        slug: a.slug,
        judul: a.judul,
        judulEn: a.judulEn || a.judul,
        ringkasan: a.ringkasan,
        ringkasanEn: a.ringkasanEn || a.ringkasan,
        konten: a.konten,
        kontenEn: a.kontenEn || a.konten,
        thumbnail: a.thumbnail || '',
        tagKawasan: a.tagKawasan || [],
        tags: a.tags || [],
        isPublished: true,
      },
    });
  }
  console.log('✅ Artikel seeding completed.');

  // 5. Seed Testimonials
  console.log(`⏳ Seeding ${testimonials.length} Testimonials...`);
  for (const t of testimonials) {
    await prisma.testimoni.upsert({
      where: { id: t.id },
      update: {
        namaKlien: t.namaKlien,
        fotoKlien: t.fotoKlien || null,
        kawasanSlug: t.kawasanSlug || 'bsd-city',
        komentar: t.komentar,
        komentarEn: t.komentarEn || t.komentar,
        rating: t.rating || 5,
        tanggal: t.tanggal ? new Date(t.tanggal) : new Date(),
        isPublished: true,
      },
      create: {
        id: t.id,
        namaKlien: t.namaKlien,
        fotoKlien: t.fotoKlien || null,
        kawasanSlug: t.kawasanSlug || 'bsd-city',
        komentar: t.komentar,
        komentarEn: t.komentarEn || t.komentar,
        rating: t.rating || 5,
        tanggal: t.tanggal ? new Date(t.tanggal) : new Date(),
        isPublished: true,
      },
    });
  }
  console.log('✅ Testimonials seeding completed.');

  // 6. Seed Site Settings
  console.log('⏳ Seeding Profile / Site Settings...');
  await prisma.siteSetting.upsert({
    where: { key: 'profile' },
    update: { value: profile },
    create: {
      key: 'profile',
      value: profile,
    },
  });
  console.log('✅ Site Settings seeding completed.');

  console.log('🎉 Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
