// src/app/properti/[slug]/page.js — Halaman Detail Listing
// generateStaticParams dari data/listings.js → SSG.
// Layout: galeri foto | info + form sidebar

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import {
//   HiBed, HiMapPin, HiTag, HiArrowLeft, HiCheckCircle,
// } from 'react-icons/hi2';
import {
  BiBed,
  BiMapPin,
  BiTag,
  BiArrowBack,
  BiCheckCircle,
  BiDownload,
} from "react-icons/bi";
import { RiWhatsappLine } from "react-icons/ri";
import {
  MdOutlineBathtub,
  MdOutlineSquareFoot,
  MdOutlineApartment,
} from "react-icons/md";
import { listings } from "@/data/listings";
import { kawasanList } from "@/data/kawasan";
import { artikelList } from "@/data/artikel";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { FormKonsultasi } from "@/components/forms/FormKonsultasi";
import { FormBrosur } from "@/components/forms/FormBrosur";
import { CTABand } from "@/components/sections/CTABand";
import { ListingGrid } from "@/components/sections/ListingGrid";
import { ArtikelGrid } from "@/components/sections/ArtikelGrid";
import { JsonLd, generateJsonLd } from "@/lib/seo";
import { formatHarga, formatTanggal } from "@/lib/utils";
import { id as text } from "@/i18n/id";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://estherproperty.com";

/** SSG: pre-render semua slug listing */
export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

/** SEO metadata unik per listing */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const listing = listings.find((l) => l.slug === resolvedParams.slug);

  if (!listing) return { title: "Properti Tidak Ditemukan | Esther REMAX" };

  return {
    title: `${listing.nama} — ${formatHarga(listing.harga)} | Esther REMAX`,
    description: `${listing.nama}: ${listing.jenisProperti} ${listing.transaksi} di ${listing.lokasiDetail}. ${listing.deskripsi.slice(0, 120)}`,
    alternates: { canonical: `${SITE_URL}/properti/${listing.slug}` },
    openGraph: {
      title: `${listing.nama} | Esther REMAX`,
      description: listing.deskripsi.slice(0, 160),
      images: [{ url: listing.galeri[0], width: 1200, height: 630 }],
      locale: "id_ID",
      type: "website",
    },
  };
}

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 */
export default async function DetailListingPage({ params }) {
  const resolvedParams = await params;
  const listing = listings.find((l) => l.slug === resolvedParams.slug);

  if (!listing) notFound();

  const kawasan = kawasanList.find((k) => k.id === listing.kawasanId);

  // Listing lain di kawasan yang sama, kecuali listing ini
  const relatedListings = listings
    .filter((l) => l.kawasanId === listing.kawasanId && l.id !== listing.id)
    .slice(0, 3);

  // Artikel terkait kawasan ini
  const relatedArticles = kawasan
    ? artikelList.filter((a) => a.tagKawasan.includes(kawasan.slug)).slice(0, 3)
    : [];

  // JSON-LD schemas
  const listingSchema = generateJsonLd("RealEstateListing", {
    nama: listing.nama,
    deskripsi: listing.deskripsi,
    harga: listing.harga,
    lokasiDetail: listing.lokasiDetail,
    gambar: listing.galeri[0],
    url: `${SITE_URL}/properti/${listing.slug}`,
  });
  
  const productSchema = generateJsonLd("Product", {
    name: listing.nama,
    description: listing.deskripsi,
    image: listing.galeri[0],
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/properti/${listing.slug}`,
      priceCurrency: "IDR",
      price: listing.harga,
      availability: "https://schema.org/InStock",
      itemCondition: listing.segmen === 'primary' ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
    }
  });
  const breadcrumbSchema = generateJsonLd("BreadcrumbList", {
    items: [
      { label: "Beranda", href: "/" },
      { label: "Properti", href: "/properti" },
      {
        label: text.filter.type[listing.jenisProperti] ?? listing.jenisProperti,
        href: `/properti?jenis=${listing.jenisProperti}`,
      },
      { label: listing.nama, href: `/properti/${listing.slug}` },
    ],
  });

  const breadcrumbItems = [
    { label: "Beranda", href: "/" },
    { label: "Properti", href: "/properti" },
    {
      label: text.filter.type[listing.jenisProperti] ?? listing.jenisProperti,
      href: `/properti?jenis=${listing.jenisProperti}`,
    },
    { label: listing.nama, href: `/properti/${listing.slug}` },
  ];

  return (
    <>
      <JsonLd data={listingSchema} />
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ── Breadcrumb + Back ──────────────────────────── */}
          <div className="flex items-center justify-between mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <Link
              href="/properti"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-remax-red font-sans transition-colors"
            >
              <BiArrowBack className="text-sm" />
              Kembali
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* ── Kolom Kiri: Galeri + Info ────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Galeri foto */}
              <GalleryLightbox images={listing.galeri} nama={listing.nama} />

              {/* Badges + Nama */}
              <div className="bg-white rounded-card shadow-card p-card">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant={listing.segmen}>
                    {listing.segmen === "primary" ? "Primary" : "Secondary"}
                  </Badge>
                  <Badge variant={listing.status}>
                    {text.filter.status[listing.status]}
                  </Badge>
                  <Badge variant="primary">
                    {text.filter.transaction[listing.transaksi]}
                  </Badge>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl md:text-h1 text-remax-blue mb-2 leading-tight">
                  {listing.nama}
                </h1>

                {/* Lokasi */}
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-sans mb-4">
                  <BiMapPin className="text-remax-red shrink-0 text-sm" />
                  {listing.lokasiDetail}
                  {kawasan && (
                    <Link
                      href={`/kawasan/${kawasan.slug}`}
                      className="text-remax-red hover:underline ml-1 bg-red-tint/80 px-1 rounded-md font-sans"
                    >
                      {kawasan.nama}
                    </Link>
                  )}
                </div>

                {/* Harga */}
                <div className="pb-4 border-b border-border-c mb-4">
                  <p className="text-3xl xl:text-mid-display text-remax-red font-bold">
                    {formatHarga(listing.harga)}
                    {listing.transaksi === "disewakan" && (
                      <span className="font-sans text-sm text-neutral-600 font-normal ml-1">
                        /tahun
                      </span>
                    )}
                  </p>
                </div>

                {/* Spesifikasi */}
                {listing.spesifikasi && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-border-c mb-4">
                    {listing.spesifikasi.lt && (
                      <div className="flex flex-col items-center gap-1 text-center">
                        <MdOutlineSquareFoot className="text-remax-red text-lg" />
                        <span className="font-bold text-remax-blue font-sans text-sm">
                          {listing.spesifikasi.lt} m²
                        </span>
                        <span className="text-xs text-neutral-600 font-sans">
                          {text.common.landArea}
                        </span>
                      </div>
                    )}
                    {listing.spesifikasi.lb && (
                      <div className="flex flex-col items-center gap-1 text-center">
                        <MdOutlineApartment className="text-remax-red text-lg" />
                        <span className="font-bold text-remax-blue font-sans text-sm">
                          {listing.spesifikasi.lb} m²
                        </span>
                        <span className="text-xs text-neutral-600 font-sans">
                          {text.common.buildingArea}
                        </span>
                      </div>
                    )}
                    {listing.spesifikasi.kamarTidur && (
                      <div className="flex flex-col items-center gap-1 text-center">
                        <BiBed className="text-remax-red text-lg" />
                        <span className="font-bold text-remax-blue font-sans text-sm">
                          {listing.spesifikasi.kamarTidur}
                        </span>
                        <span className="text-xs text-neutral-600 font-sans">
                          {text.common.bedrooms}
                        </span>
                      </div>
                    )}
                    {listing.spesifikasi.kamarMandi && (
                      <div className="flex flex-col items-center gap-1 text-center">
                        <MdOutlineBathtub className="text-remax-red text-lg" />
                        <span className="font-bold text-remax-blue font-sans text-sm">
                          {listing.spesifikasi.kamarMandi}
                        </span>
                        <span className="text-xs text-neutral-600 font-sans">
                          {text.common.bathrooms}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Developer / Pemilik */}
                {(listing.developerNama || listing.pemilikNama) && (
                  <div className="flex items-center gap-2 text-sm text-neutral-600 font-sans pb-4 border-b border-border-c mb-4">
                    <BiTag className="text-remax-red text-sm" />
                    <span className="font-semibold">
                      {listing.developerNama
                        ? text.common.developer
                        : text.common.owner}
                      :
                    </span>
                    <span>{listing.developerNama ?? listing.pemilikNama}</span>
                  </div>
                )}

                {/* ── Quick Action CTA Buttons (Mobile & Desktop) ──────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-6 border-b border-border-c mb-6">
                  <a
                    href={`https://wa.me/6285177560191?text=${encodeURIComponent(
                      `Halo Bu Esther, saya tertarik dengan ${listing.nama} di website. Boleh minta info promo & jadwal survey lokasi?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-sans font-bold text-sm rounded-btn shadow-card transition-all duration-200 hover:scale-[1.02] text-center"
                  >
                    <RiWhatsappLine className="text-xl shrink-0" />
                    <span>Chat WhatsApp Bu Esther</span>
                  </a>

                  <a
                    href="#form-brosur"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-blue-tint hover:bg-remax-blue hover:text-white text-remax-blue font-sans font-bold text-sm rounded-btn border border-remax-blue/30 transition-all duration-200 hover:scale-[1.02] text-center"
                  >
                    <BiDownload className="text-lg shrink-0" />
                    <span>Minta Brosur & Denah (PDF)</span>
                  </a>
                </div>

                {/* Deskripsi */}
                <div>
                  <h2 className="font-sans text-base font-bold text-remax-blue mb-3">
                    Deskripsi Properti
                  </h2>
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{ __html: listing.deskripsi }}
                  />
                </div>
              </div>

              {/* Peta lokasi statik (iframe embed placeholder) */}
              <div className="bg-white rounded-card shadow-card p-card">
                <h2 className="font-sans text-base font-bold text-remax-blue mb-4 flex items-center gap-2">
                  <BiMapPin className="text-remax-red text-base" />
                  Lokasi
                </h2>
                <div className="rounded-btn overflow-hidden aspect-video bg-neutral-100 flex items-center justify-center mb-4">
                  {(listing.koordinat || kawasan) ? (
                    <iframe
                      title={`Peta lokasi ${listing.nama}`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://maps.google.com/maps?q=${listing.koordinat?.lat || kawasan?.koordinat?.lat},${listing.koordinat?.lng || kawasan?.koordinat?.lng}&z=15&output=embed`}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <p className="text-neutral-600 text-sm font-sans">
                      Peta tidak tersedia
                    </p>
                  )}
                </div>
                {listing.tautanMaps && (
                  <a 
                    href={listing?.tautanMaps} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-neutral-100 hover:bg-neutral-200 transition-colors text-remax-blue font-sans font-semibold text-sm rounded-btn"
                  >
                    Buka di Google Maps
                  </a>
                )}
              </div>
            </div>

            {/* ── Kolom Kanan: Form Sidebar ─────────────────── */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              {/* Form Konsultasi */}
              <div id="form-tanya" className="bg-white rounded-card shadow-card p-card scroll-mt-24">
                <h2 className="font-sans text-base font-bold text-remax-blue mb-4">
                  Tanyakan Properti Ini
                </h2>
                <FormKonsultasi listingSlug={listing.slug} lang="id" />
              </div>

              {/* Form Brosur */}
              <div id="form-brosur" className="bg-red-tint rounded-card p-card border border-remax-red/30 scroll-mt-24">
                <FormBrosur listingSlug={listing.slug} lang="id" />
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-card shadow-card p-card">
                <ul className="flex flex-col gap-2">
                  {[
                    "Konsultasi properti gratis",
                    "Data Anda terjaga kerahasiaannya",
                    "Respons dalam 24 jam",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-neutral-900 font-sans"
                    >
                      <BiCheckCircle className="text-remax-red shrink-0 text-sm" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* ── Properti Terkait ──────────────────────────── */}
          {relatedListings.length > 0 && (
            <section className="mt-16 border-t border-border-c pt-12">
              <h2 className="font-serif text-h2 text-remax-blue mb-8">
                {text.common.relatedProperties}
                {kawasan && (
                  <Link
                    href={`/kawasan/${kawasan.slug}`}
                    className=" hover:underline ml-1"
                  >
                    {kawasan.nama}
                  </Link>
                )}
              </h2>
              <ListingGrid listings={relatedListings} lang="id" />
            </section>
          )}

          {/* ── Artikel Terkait ──────────────────────────── */}
          {relatedArticles.length > 0 && (
            <section className="mt-16 border-t border-border-c pt-12">
              <ArtikelGrid
                artikelList={relatedArticles}
                title="Bacaan Terkait"
                lang="id"
              />
            </section>
          )}
        </div>
      </div>

      <CTABand variant="whatsapp" lang="id" />
    </>
  );
}
