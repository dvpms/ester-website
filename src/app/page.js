// src/app/page.js — Homepage
// Merakit semua section: Hero → Kawasan → Listing → TrustStrip → Testimoni → CTA
// generateMetadata: keyword "agent properti terpercaya"

import { HeroHome } from '@/components/sections/HeroHome';
import { KawasanGrid } from '@/components/sections/KawasanGrid';
import { ListingGrid } from '@/components/sections/ListingGrid';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { TestimoniGrid } from '@/components/sections/TestimoniGrid';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd, generateJsonLd } from '@/lib/seo';
import { kawasanList } from '@/data/kawasan';
import { listings } from '@/data/listings';
import { artikelList } from '@/data/artikel';
import { ArtikelGrid } from '@/components/sections/ArtikelGrid';
import { testimonials as testimoniMock } from '@/data/testimonials';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

export const metadata = {
  title: 'Esther REMAX — Agent Properti Terpercaya Tangerang Selatan',
  description:
    'Cari properti di BSD City, Gading Serpong, Alam Sutera & Bintaro bersama Esther — agen properti terpercaya. Primary & secondary, dijual & disewakan.',
  alternates: {
    canonical: SITE_URL,
    languages: { id: '/', en: '/en' },
  },
  openGraph: {
    title: 'Esther REMAX — Agent Properti Terpercaya',
    description:
      'Temukan properti impian Anda di Tangerang Selatan bersama Esther. BSD City, Gading Serpong, Alam Sutera, Bintaro.',
    images: [{ url: '/images/og/homepage.jpg', width: 1200, height: 630 }],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function HomePage() {
  // Ambil hanya listing yang featured untuk homepage
  const featuredListings = listings.filter((l) => l.featured);

  // JSON-LD: RealEstateAgent + LocalBusiness
  const realEstateAgentSchema = generateJsonLd('RealEstateAgent', {
    description:
      'Esther adalah agen properti terpercaya di Tangerang Selatan, spesialis BSD City, Gading Serpong, Alam Sutera, dan Bintaro.',
    image: `${SITE_URL}/images/og/homepage.jpg`,
  });
  const localBusinessSchema = generateJsonLd('LocalBusiness', {
    kawasanDeskripsi: 'Layanan jual beli properti di BSD City, Gading Serpong, Alam Sutera, dan Bintaro.',
  });

  return (
    <>
      {/* ── Structured Data ─────────────────────────────────── */}
      <JsonLd data={realEstateAgentSchema} />
      <JsonLd data={localBusinessSchema} />

      {/* ── Hero ────────────────────────────────────────────── */}
      <HeroHome lang="id" />

      {/* ── Kawasan Populer ─────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-h1 text-remax-blue font-bold">Kawasan Pilihan</h2>
            <p className="font-sans text-body text-neutral-600 mt-3 max-w-xl mx-auto">
              Pilih kawasan yang paling sesuai dengan gaya hidup dan kebutuhan investasi Anda.
            </p>
          </div>
          <KawasanGrid kawasanList={kawasanList} lang="id" />
        </div>
      </section>

      {/* ── Listing Unggulan ─────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-h1 text-remax-blue">Properti Unggulan</h2>
            </div>
            <Link
              href="/properti"
              className="font-sans text-sm font-semibold text-remax-red hover:underline shrink-0"
            >
              Lihat Semua Properti →
            </Link>
          </div>
          <ListingGrid listings={featuredListings} lang="id" />
        </div>
      </section>

      {/* ── Testimoni ────────────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-h1 text-remax-blue">Apa Kata Mereka</h2>
          </div>
          <TestimoniGrid testimonials={testimoniMock} lang="id" />
        </div>
      </section>

      {/* ── Artikel & Edukasi ────────────────────────────────── */}
      <section className="py-section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-h1 text-remax-blue">Artikel & Panduan</h2>
            </div>
            <Link
              href="/blog"
              className="font-sans text-sm font-semibold text-remax-red hover:underline shrink-0"
            >
              Lihat Semua Artikel →
            </Link>
          </div>
          <ArtikelGrid artikelList={artikelList.slice(0, 3)} lang="id" />
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────────────────── */}
      <CTABand variant="whatsapp" lang="id" />
    </>
  );
}
