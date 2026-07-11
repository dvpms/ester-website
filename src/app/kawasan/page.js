import { kawasanList } from '@/data/kawasan';
import { KawasanGrid } from '@/components/sections/KawasanGrid';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd, generateJsonLd } from '@/lib/seo';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

export const metadata = {
  title: 'Kawasan Properti Premium Tangerang Selatan | Esther Property',
  description: 'Jelajahi kawasan properti terbaik di Tangerang Selatan: BSD City, Gading Serpong, Alam Sutera, dan Bintaro. Temukan rumah impian Anda di lokasi strategis.',
  alternates: {
    canonical: `${SITE_URL}/kawasan`,
  },
};

export default function KawasanHubPage() {
  const jsonLd = generateJsonLd('BreadcrumbList', {
    items: [
      { label: 'Beranda', href: '/' },
      { label: 'Kawasan', href: '/kawasan' },
    ],
  });

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Kawasan', href: '/kawasan' },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      
      <main className="min-h-screen bg-neutral-50 pb-section">
        {/* Header Section */}
        <header className="bg-white border-b border-border-c pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="font-serif text-h1 text-remax-blue mb-4">Pilih Kawasan Hunian Anda</h1>
              <p className="font-sans text-body text-neutral-600">
                Temukan berbagai pilihan properti premium di empat kawasan strategis Tangerang Selatan dengan fasilitas terlengkap dan potensi investasi terbaik.
              </p>
            </div>
          </div>
        </header>

        {/* Grid Section */}
        <section className="py-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <KawasanGrid kawasanList={kawasanList} lang="id" />
          </div>
        </section>
      </main>

      <CTABand
        variant="whatsapp"
        lang="id"
        customHeadline="Bingung Memilih Kawasan yang Tepat?"
        customSub="Konsultasikan kebutuhan Anda bersama saya untuk menemukan lokasi properti yang paling ideal."
      />
    </>
  );
}
