// src/app/kawasan/[slug]/page.js — Halaman Hub Kawasan
// generateStaticParams dari data/kawasan.js → SSG untuk semua slug kawasan.
// Konten: hero kawasan, fasilitas, listing terkait.

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HiMapPin, HiCheckCircle } from 'react-icons/hi2';
import { kawasanList } from '@/data/kawasan';
import { listings } from '@/data/listings';
import { ListingGrid } from '@/components/sections/ListingGrid';
import { CTABand } from '@/components/sections/CTABand';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { JsonLd, generateJsonLd } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

/** SSG: pre-render semua slug kawasan dari data mock */
export function generateStaticParams() {
  return kawasanList.map((k) => ({ slug: k.slug }));
}

/** SEO metadata unik per kawasan */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const kawasan = kawasanList.find((k) => k.slug === resolvedParams.slug);

  if (!kawasan) {
    return { title: 'Kawasan Tidak Ditemukan | Esther Property' };
  }

  return {
    title: `Properti ${kawasan.nama} — Dijual & Disewakan | Esther Property`,
    description: `Cari rumah dijual di ${kawasan.nama} 2026. Harga properti ${kawasan.nama} terbaru, fasilitas lengkap & kawasan terpercaya bersama Esther Property.`,
    alternates: {
      canonical: `${SITE_URL}/kawasan/${kawasan.slug}`,
      languages: { id: `/kawasan/${kawasan.slug}`, en: `/en/kawasan/${kawasan.slug}` },
    },
    openGraph: {
      title: `Properti di ${kawasan.nama} | Esther Property`,
      description: kawasan.deskripsi.slice(0, 160),
      images: [{ url: kawasan.fotoHero, width: 1200, height: 630 }],
      locale: 'id_ID',
      type: 'website',
    },
  };
}

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 */
export default async function KawasanPage({ params }) {
  const resolvedParams = await params;
  const kawasan = kawasanList.find((k) => k.slug === resolvedParams.slug);

  if (!kawasan) notFound();

  // Filter listing yang berada di kawasan ini
  const kawasanListings = listings.filter((l) => l.kawasanId === kawasan.id);

  // JSON-LD schemas
  const localBusinessSchema = generateJsonLd('LocalBusiness', {
    kawasanNama: kawasan.nama,
    kawasanDeskripsi: kawasan.deskripsi,
    kawasanUrl: `${SITE_URL}/kawasan/${kawasan.slug}`,
  });
  const itemListSchema = generateJsonLd('ItemList', {
    items: kawasanListings.map((l) => ({
      nama: l.nama,
      url: `/properti/${l.slug}`,
    })),
  });
  const breadcrumbSchema = generateJsonLd('BreadcrumbList', {
    items: [
      { label: 'Beranda', href: '/' },
      { label: 'Kawasan', href: '/kawasan' },
      { label: kawasan.nama, href: `/kawasan/${kawasan.slug}` },
    ],
  });

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Kawasan', href: '/kawasan' },
    { label: kawasan.nama, href: `/kawasan/${kawasan.slug}` },
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── Hero Kawasan ──────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={kawasan.fotoHero}
          alt={`Foto kawasan ${kawasan.nama}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/90 via-remax-blue/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Breadcrumb items={breadcrumbItems} className="mb-4 [&_a]:text-white/90 [&_span]:text-white" />
          <div className="flex items-center gap-2 text-remax-red text-sm font-sans font-semibold mb-2">
            <HiMapPin className="text-remax-red text-sm" />
            <span>Tangerang Selatan</span>
          </div>
          <h1 className="font-serif text-display text-white font-bold">{kawasan.nama}</h1>
        </div>
      </section>

      {/* ── Deskripsi & Fasilitas ─────────────────────────── */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Deskripsi */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-h2 text-remax-blue mb-5">
                Tentang {kawasan.nama}
              </h2>
              <p className="font-sans text-body text-neutral-900 leading-relaxed">
                {kawasan.deskripsi}
              </p>
            </div>

            {/* Fasilitas Unggulan */}
            <aside className="bg-white rounded-card p-card h-fit">
              <h3 className="font-sans text-base font-bold text-remax-blue mb-4">
                Fasilitas Unggulan
              </h3>
              <ul className="flex flex-col gap-3">
                {kawasan.fasilitasUnggulan.map((fasilitas) => (
                  <li key={fasilitas} className="flex items-start gap-2.5 text-sm text-neutral-900 font-sans">
                    <HiCheckCircle className="text-remax-red shrink-0 mt-0.5 text-base" />
                    {fasilitas}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Listing di Kawasan Ini ────────────────────────── */}
      {kawasanListings.length > 0 && (
        <section className="py-section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="font-sans text-sm text-remax-red font-semibold uppercase tracking-widest mb-2">Tersedia</p>
              <h2 className="font-serif text-h1 text-remax-blue">
                Properti di {kawasan.nama}
              </h2>
            </div>
            <ListingGrid listings={kawasanListings} lang="id" />
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABand
        variant="whatsapp"
        lang="id"
        customHeadline={`Tertarik Properti di ${kawasan.nama}?`}
        customSub="Konsultasi bersama Esther — temukan properti yang tepat sesuai kebutuhan Anda."
      />
    </>
  );
}
