import { artikelList } from '@/data/artikel';
import { ArtikelGrid } from '@/components/sections/ArtikelGrid';
import { JsonLd, generateJsonLd } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

export const metadata = {
  title: 'Blog Edukasi Properti — Tips & Panduan Seputar Real Estat',
  description: 'Kumpulan artikel edukasi, tips investasi, dan panduan membeli properti di kawasan premium Tangerang Selatan.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  const jsonLd = generateJsonLd('BreadcrumbList', {
    items: [
      { label: 'Beranda', href: '/' },
      { label: 'Blog', href: '/blog' },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="min-h-screen bg-neutral-50 py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-h1 text-remax-blue mb-4">Artikel & Edukasi Properti</h1>
            <p className="font-sans text-body text-neutral-600">
              Temukan berbagai panduan, tips investasi, dan informasi terbaru seputar dunia real estat di wilayah Tangerang Selatan.
            </p>
          </header>
          
          <ArtikelGrid artikelList={artikelList} lang="id" />
        </div>
      </main>
    </>
  );
}
