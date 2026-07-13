import Image from "next/image";
import { TestimoniGrid } from "@/components/sections/TestimoniGrid";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd, generateJsonLd } from "@/lib/seo";
import { HiCheckBadge } from "react-icons/hi2";
import { testimonials as mockTestimonials } from "@/data/testimonials";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://estherproperty.com";

export const metadata = {
  title: "Tentang Esther — Agen Properti RE/MAX Terpercaya",
  description:
    "Mengenal lebih dekat Esther, agen properti profesional RE/MAX yang siap membantu Anda jual, beli, dan sewa properti di kawasan Tangerang Selatan dan sekitarnya.",
  alternates: {
    canonical: `${SITE_URL}/tentang`,
  },
};

export default function TentangPage() {
  const jsonLd = generateJsonLd("RealEstateAgent", {
    name: "Esther - RE/MAX Agent",
    description: metadata.description,
    image: `${SITE_URL}/images/og/homepage.jpg`,
    url: `${SITE_URL}/tentang`,
    telephone: "+628XXXXXXXXXX",
    areaServed:
      "Tangerang Selatan, BSD City, Gading Serpong, Alam Sutera, Bintaro",
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ── Hero / Profile ──────────────────────────────── */}
      <section className="py-section bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image Box */}
            <div className="w-full lg:w-5/12 relative aspect-[4/5] max-w-md shrink-0">
              <div className="absolute inset-0 bg-remax-blue rounded-tr-[4rem] rounded-bl-[4rem] translate-x-4 translate-y-4" />
              <div className="relative w-full h-full rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/esther-profile.jpeg"
                  alt="Esther - Agen Properti Profesional"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-tr-[4rem] rounded-bl-[4rem] border-2 border-remax-red pointer-events-none" />
            </div>

            {/* Bio Content */}
            <div className="w-full lg:w-7/12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-tint text-remax-red font-semibold text-sm mb-6 font-sans">
                <HiCheckBadge className="text-lg" />
                <span>Verified RE/MAX Future</span>
              </div>
              <h1 className="font-bold text-5xl text-remax-blue font-serif leading-tight">
                Halo, saya Esther. <br />
              </h1>
              <p className="font-sans text-body text-neutral-600 mb-6">
                &quot;Membantu Anda menemukan properti impian&quot;.
              </p>
              <div className="font-sans text-body text-neutral-900 space-y-4 leading-relaxed">
                <p>
                  Memilih properti bukanlah sekadar transaksi, melainkan
                  keputusan penting dalam hidup Anda. Dengan pengalaman
                  bertahun-tahun di industri real estat, saya hadir untuk
                  memastikan perjalanan Anda mencari rumah atau instrumen
                  investasi berjalan aman, transparan, dan menguntungkan.
                </p>
                <p>
                  Berbasis di Tangerang Selatan, saya berspesialisasi di
                  kawasan-kawasan premium seperti BSD City, Gading Serpong, Alam
                  Sutera, dan Bintaro. Saya meyakini bahwa setiap properti
                  memiliki cerita, dan tugas saya adalah menghubungkannya dengan
                  pemilik yang tepat.
                </p>
                <p>
                  Didukung oleh jaringan global RE/MAX, saya siap memberikan
                  layanan berstandar internasional yang disesuaikan dengan
                  kearifan lokal. Mari kita wujudkan visi properti Anda
                  bersama-sama!
                </p>
              </div>

              {/* <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border-c">
                <div>
                  <h4 className="font-sans font-bold text-remax-blue text-3xl mb-1">5+</h4>
                  <p className="font-sans text-sm text-neutral-600">Tahun Pengalaman</p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-remax-blue text-3xl mb-1">100+</h4>
                  <p className="font-sans text-sm text-neutral-600">Keluarga Bahagia</p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-remax-blue text-3xl mb-1">Top</h4>
                  <p className="font-sans text-sm text-neutral-600">Agent Performance</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────── */}
      <section className="py-section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-h1 text-remax-blue mb-4">
              Kata Klien Saya
            </h2>
            <p className="font-sans text-body text-neutral-600">
              Kepuasan klien adalah prioritas utama saya. Berikut adalah
              pengalaman mereka yang telah memercayakan urusan propertinya
              kepada saya.
            </p>
          </div>
          <TestimoniGrid testimonials={mockTestimonials} lang="id" />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <CTABand
        variant="whatsapp"
        lang="id"
        customHeadline="Siap Memulai Perjalanan Properti Anda?"
        customSub="Jangan ragu untuk menghubungi saya. Konsultasi bebas biaya, saya siap mendengarkan kebutuhan Anda."
      />
    </>
  );
}
