// src/app/properti/page.js — Halaman Daftar Properti (Server Component)
// generateMetadata untuk SEO, render PropertiClient untuk interaktivitas filter.

import { PropertiClient } from './PropertiClient';
import { JsonLd, generateJsonLd } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

export const metadata = {
  title: 'Daftar Properti | Esther Property',
  description:
    'Temukan properti primary & secondary di Tangerang Selatan — rumah, ruko, kavling, apartemen di BSD City, Gading Serpong, Alam Sutera & Bintaro.',
  alternates: { canonical: `${SITE_URL}/properti` },
  openGraph: {
    title: 'Daftar Properti Primary & Secondary Tangerang | Esther Property',
    description:
      'Listing properti dijual & disewakan di BSD City, Gading Serpong, Alam Sutera, dan Bintaro.',
    images: [{ url: '/images/og/properti.jpg', width: 1200, height: 630 }],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function PropertiPage() {
  const breadcrumbSchema = generateJsonLd('BreadcrumbList', {
    items: [
      { label: 'Beranda', href: '/' },
      { label: 'Properti', href: '/properti' },
    ],
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PropertiClient />
    </>
  );
}
