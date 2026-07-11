import { FormKonsultasi } from '@/components/forms/FormKonsultasi';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd, generateJsonLd } from '@/lib/seo';
import { HiMapPin, HiPhone, HiEnvelope, HiClock } from 'react-icons/hi2';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890'; // Use fallback if env is missing

export const metadata = {
  title: 'Hubungi Esther — Konsultasi Properti Gratis',
  description: 'Punya pertanyaan seputar jual, beli, atau sewa properti di Tangerang Selatan? Hubungi Esther sekarang untuk mendapatkan solusi terbaik.',
  alternates: {
    canonical: `${SITE_URL}/kontak`,
  },
};

// Mock Server Action (karena instruksi spesifik "mockup untuk datanya, jangan buat api")
async function mockSubmitLead(data) {
  'use server';
  // Simulate network delay to show loading state on client
  await new Promise(r => setTimeout(r, 1500));
  console.log('[MOCKUP] Lead form submitted to server:', data);
  // Return success implicitly without doing actual DB/Email logic
}

export default function KontakPage() {
  const jsonLd = generateJsonLd('LocalBusiness', {
    name: 'Esther - RE/MAX Agent',
    description: metadata.description,
    image: `${SITE_URL}/images/og/homepage.jpg`,
    url: `${SITE_URL}/kontak`,
    telephone: `+${WA_NUMBER}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tangerang Selatan',
      addressRegion: 'Banten',
      addressCountry: 'ID'
    }
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      
      <section className="py-section bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-serif text-h1 text-remax-blue mb-4">Hubungi Saya</h1>
            <p className="font-sans text-body text-neutral-600">
              Apakah Anda berencana membeli rumah pertama, mencari lahan komersial, atau sekadar ingin berkonsultasi mengenai harga pasar? Saya siap membantu Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info & Map */}
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 p-card rounded-card border border-border-c bg-neutral-50">
                  <div className="w-10 h-10 rounded-full bg-red-tint flex items-center justify-center mb-2">
                    <HiPhone className="text-remax-red text-lg" />
                  </div>
                  <h3 className="font-sans font-bold text-remax-blue text-sm">Telepon / WhatsApp</h3>
                  <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-sans text-body text-neutral-600 hover:text-remax-red transition-colors">
                    +{WA_NUMBER}
                  </a>
                </div>
                
                <div className="flex flex-col gap-2 p-card rounded-card border border-border-c bg-neutral-50">
                  <div className="w-10 h-10 rounded-full bg-red-tint flex items-center justify-center mb-2">
                    <HiEnvelope className="text-remax-red text-lg" />
                  </div>
                  <h3 className="font-sans font-bold text-remax-blue text-sm">Email</h3>
                  <a href="mailto:hello@estherproperty.com" className="font-sans text-body text-neutral-600 hover:text-remax-red transition-colors">
                    hello@estherproperty.com
                  </a>
                </div>

                <div className="flex flex-col gap-2 p-card rounded-card border border-border-c bg-neutral-50">
                  <div className="w-10 h-10 rounded-full bg-red-tint flex items-center justify-center mb-2">
                    <HiMapPin className="text-remax-red text-lg" />
                  </div>
                  <h3 className="font-sans font-bold text-remax-blue text-sm">Area Layanan</h3>
                  <p className="font-sans text-body text-neutral-600">
                    Tangerang Selatan (BSD, Gading Serpong, Alam Sutera, Bintaro)
                  </p>
                </div>

                <div className="flex flex-col gap-2 p-card rounded-card border border-border-c bg-neutral-50">
                  <div className="w-10 h-10 rounded-full bg-red-tint flex items-center justify-center mb-2">
                    <HiClock className="text-remax-red text-lg" />
                  </div>
                  <h3 className="font-sans font-bold text-remax-blue text-sm">Jam Operasional</h3>
                  <p className="font-sans text-body text-neutral-600">
                    Senin - Sabtu: 09:00 - 18:00<br/>Minggu: Dengan Janji Temu
                  </p>
                </div>
              </div>

              {/* Maps Iframe */}
              <div className="w-full h-[300px] rounded-card overflow-hidden shadow-card border border-border-c relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.9427670966!2d106.6343513!3d-6.2891963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb275bb0c367%3A0xc36ec17b9b18361!2sTangerang%20Selatan%2C%20Kota%20Tangerang%20Selatan%2C%20Banten!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Area Layanan Tangerang Selatan"
                ></iframe>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-card shadow-card p-card lg:p-8 border border-border-c h-fit">
              <h2 className="font-serif text-h2 text-remax-blue mb-2">Kirim Pesan</h2>
              <p className="font-sans text-sm text-neutral-600 mb-6">
                Isi formulir di bawah ini dan saya akan menghubungi Anda secepatnya.
              </p>
              <FormKonsultasi onSubmit={mockSubmitLead} lang="id" />
            </div>

          </div>
        </div>
      </section>

      {/* ── CTABand ────────────────────────────────────────── */}
      <CTABand
        variant="whatsapp"
        lang="id"
        customHeadline="Butuh Respon Lebih Cepat?"
        customSub="Untuk keperluan mendesak, silakan hubungi saya langsung via WhatsApp."
      />
    </>
  );
}
