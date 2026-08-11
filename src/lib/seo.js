// @ts-check
// src/lib/seo.js
//
// Helper untuk generasi Schema.org JSON-LD dan metadata SEO.
// Digunakan di setiap page.js untuk structured data.

/**
 * Konfigurasi bisnis Esther REMAX — digunakan di banyak schema.
 * Nilai ini diambil dari env vars saat runtime; fallback ke placeholder untuk dev.
 */
const BUSINESS_CONFIG = {
  name: "Esther REMAX",
  agentName: "Esther",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://estherproperty.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
  areaServed: ["Tangerang Selatan", "BSD City", "Gading Serpong", "Alam Sutera", "Bintaro", "Serpong"],
};

/**
 * Generate Schema.org JSON-LD object sesuai tipe halaman.
 *
 * @param {'RealEstateAgent'|'LocalBusiness'|'RealEstateListing'|'Article'|'BreadcrumbList'|'ItemList'|'Product'} type
 * @param {Object} data - Data spesifik untuk schema tersebut
 * @returns {Object} JSON-LD object siap di-stringify
 */
export function generateJsonLd(type, data) {
  switch (type) {
    case "RealEstateAgent":
      return buildRealEstateAgentSchema(data);
    case "LocalBusiness":
      return buildLocalBusinessSchema(data);
    case "RealEstateListing":
      return buildRealEstateListingSchema(data);
    case "Article":
      return buildArticleSchema(data);
    case "BreadcrumbList":
      return buildBreadcrumbListSchema(data);
    case "ItemList":
      return buildItemListSchema(data);
    case "Product":
      return buildProductSchema(data);
    default:
      throw new Error(`generateJsonLd: tipe schema "${type}" tidak dikenali`);
  }
}

/**
 * Schema RealEstateAgent — untuk Homepage dan halaman Tentang.
 *
 * @param {{ description?: string, image?: string }} data
 * @returns {Object}
 */
function buildRealEstateAgentSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: BUSINESS_CONFIG.name,
    agent: BUSINESS_CONFIG.agentName,
    url: BUSINESS_CONFIG.siteUrl,
    telephone: `+${BUSINESS_CONFIG.whatsappNumber}`,
    description: data.description || "Agen properti terpercaya di kawasan Tangerang Selatan.",
    image: data.image || `${BUSINESS_CONFIG.siteUrl}/images/og/homepage.jpg`,
    areaServed: BUSINESS_CONFIG.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };
}

/**
 * Schema LocalBusiness — untuk Kawasan Hub dan footer global.
 *
 * @param {{ kawasanNama?: string, kawasanDeskripsi?: string, kawasanUrl?: string }} data
 * @returns {Object}
 */
function buildLocalBusinessSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.kawasanNama
      ? `${BUSINESS_CONFIG.name} — ${data.kawasanNama}`
      : BUSINESS_CONFIG.name,
    url: data.kawasanUrl || BUSINESS_CONFIG.siteUrl,
    telephone: `+${BUSINESS_CONFIG.whatsappNumber}`,
    description: data.kawasanDeskripsi || "Layanan jual beli properti di Tangerang Selatan.",
    areaServed: BUSINESS_CONFIG.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };
}

/**
 * Schema RealEstateListing — untuk halaman Detail Listing.
 *
 * @param {{ nama: string, deskripsi: string, harga: number, lokasiDetail: string, gambar?: string, url: string }} data
 * @returns {Object}
 */
function buildRealEstateListingSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: data.nama,
    description: data.deskripsi,
    url: data.url,
    image: data.gambar,
    offers: {
      "@type": "Offer",
      price: data.harga,
      priceCurrency: "IDR",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: data.lokasiDetail,
      addressCountry: "ID",
    },
  };
}

/**
 * Schema Article — untuk halaman Detail Artikel Blog.
 *
 * @param {{ judul: string, ringkasan: string, tanggalPublish: string, thumbnail: string, url: string }} data
 * @returns {Object}
 */
function buildArticleSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.judul,
    description: data.ringkasan,
    image: data.thumbnail,
    datePublished: data.tanggalPublish,
    url: data.url,
    author: {
      "@type": "Person",
      name: BUSINESS_CONFIG.agentName,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_CONFIG.name,
      url: BUSINESS_CONFIG.siteUrl,
    },
  };
}

/**
 * Schema BreadcrumbList — wajib di semua halaman kecuali Homepage.
 *
 * @param {{ items: Array<{ label: string, href: string }> }} data
 * @returns {Object}
 */
function buildBreadcrumbListSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${BUSINESS_CONFIG.siteUrl}${item.href}`,
    })),
  };
}

/**
 * Schema ItemList — untuk listing daftar properti/kawasan.
 *
 * @param {{ items: Array<{ nama: string, url: string }> }} data
 * @returns {Object}
 */
function buildItemListSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nama,
      url: `${BUSINESS_CONFIG.siteUrl}${item.url}`,
    })),
  };
}

/**
 * Schema Product — untuk halaman Detail Listing tambahan.
 *
 * @param {{ name: string, description: string, image: string, offers: any }} data
 * @returns {Object}
 */
function buildProductSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    image: data.image,
    offers: data.offers,
  };
}

/**
 * React component untuk meng-inject JSON-LD ke `<head>` halaman.
 * Digunakan di dalam `page.js` sebagai Server Component.
 *
 * Contoh penggunaan:
 * ```jsx
 * import { JsonLd, generateJsonLd } from '@/lib/seo';
 * const schema = generateJsonLd('RealEstateAgent', { description: '...' });
 * return <JsonLd data={schema} />;
 * ```
 *
 * @param {{ data: Object }} props
 * @returns {JSX.Element}
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
