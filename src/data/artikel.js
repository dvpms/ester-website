// @ts-check
// src/data/artikel.js
//
// Mock data 3 artikel blog untuk konten SEO organik.
// Setiap artikel memiliki tagKawasan untuk internal linking ke halaman kawasan.
// konten menggunakan format Markdown (akan dirender dengan remark/MDX di fase berikutnya).

/** @type {import('../lib/types').Artikel[]} */
export const artikelList = [
  {
    id: "artikel-001",
    slug: "bsd-vs-gading-serpong-investasi-2026",
    judul: "BSD City vs Gading Serpong: Mana yang Lebih Cocok untuk Investasi 2026?",
    judulEn: "BSD City vs Gading Serpong: Which is Better for Investment in 2026?",
    ringkasan:
      "Perbandingan mendalam dua kawasan terpopuler di Tangerang Selatan dari sisi harga, fasilitas, potensi kenaikan nilai, dan kemudahan akses.",
    ringkasanEn:
      "An in-depth comparison of South Tangerang's two most popular areas in terms of price, facilities, value appreciation potential, and accessibility.",
    konten: `# BSD City vs Gading Serpong: Mana yang Lebih Cocok untuk Investasi 2026?

## Pendahuluan

Memilih kawasan untuk investasi properti bukan keputusan yang mudah. BSD City dan Gading Serpong adalah dua kawasan premium di Tangerang Selatan yang sama-sama menarik, namun memiliki karakteristik yang berbeda.

## Infrastruktur & Aksesibilitas

**BSD City** unggul dalam konektivitas transportasi publik dengan Stasiun KRL Commuter Line yang langsung terhubung ke Jakarta. Sementara **Gading Serpong** lebih mengandalkan akses tol, terutama Tol Karang Tengah dan JORR.

## Harga Properti

Harga rata-rata rumah tapak di BSD City berkisar antara **Rp 1,5 M – Rp 5 M** tergantung cluster dan developer. Gading Serpong cenderung sedikit lebih mahal di segmen yang sama, dengan kisaran **Rp 2 M – Rp 7 M**.

## Potensi Investasi

Keduanya menunjukkan tren kenaikan harga 8–12% per tahun secara historis. BSD City memiliki keunggulan dalam proyek-proyek baru developer besar, sementara Gading Serpong lebih stabil dengan pasar secondary yang aktif.

## Kesimpulan

Untuk **investasi jangka panjang dan penghuni langsung**: pilih BSD City jika butuh akses transportasi publik. Pilih Gading Serpong jika mengutamakan ekosistem komersial yang lebih matang. Konsultasikan dengan Esther untuk rekomendasi spesifik sesuai budget Anda.`,
    kontenEn: `# BSD City vs Gading Serpong: Which is Better for Investment in 2026?

## Introduction

Choosing an area for property investment is not an easy decision. BSD City and Gading Serpong are two premium areas in South Tangerang that are equally attractive, yet have different characteristics.

## Infrastructure & Accessibility

**BSD City** excels in public transportation connectivity with KRL Commuter Line Station directly connected to Jakarta. Meanwhile, **Gading Serpong** relies more on toll access, particularly the Karang Tengah Toll and JORR.

## Property Prices

The average price of landed houses in BSD City ranges from **IDR 1.5B – 5B** depending on cluster and developer. Gading Serpong tends to be slightly more expensive in the same segment, ranging from **IDR 2B – 7B**.

## Investment Potential

Both show historical price increase trends of 8–12% per year. BSD City has an advantage in new projects from major developers, while Gading Serpong is more stable with an active secondary market.

## Conclusion

For **long-term investment and immediate occupancy**: choose BSD City if you need public transportation access. Choose Gading Serpong if you prioritize a more mature commercial ecosystem. Consult with Esther for specific recommendations based on your budget.`,
    thumbnail: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80",
    tanggalPublish: "2026-07-01",
    tagKawasan: ["bsd-city", "gading-serpong"],
    tags: ["investasi", "perbandingan-kawasan", "tips-properti"],
  },

  {
    id: "artikel-002",
    slug: "panduan-kpr-rumah-pertama-2026",
    judul: "Panduan Lengkap KPR Rumah Pertama untuk Generasi Milenial 2026",
    judulEn: "Complete Guide to First Home Mortgage for Millennials in 2026",
    ringkasan:
      "Semua yang perlu Anda ketahui tentang KPR: syarat pengajuan, cara menghitung cicilan, tips lolos BI Checking, dan bank dengan suku bunga terbaik.",
    ringkasanEn:
      "Everything you need to know about mortgages: application requirements, how to calculate installments, tips for passing BI Checking, and banks with the best interest rates.",
    konten: `# Panduan Lengkap KPR Rumah Pertama untuk Generasi Milenial 2026

## Apa itu KPR?

KPR (Kredit Pemilikan Rumah) adalah fasilitas kredit dari bank untuk membantu Anda membeli rumah dengan cicilan bulanan. Tenor bervariasi dari 5 hingga 30 tahun.

## Syarat Umum Pengajuan KPR

- Usia minimal 21 tahun, maksimal 55 tahun saat kredit berakhir
- WNI dengan penghasilan tetap (karyawan) atau usaha sendiri (wiraswasta)
- Rasio cicilan tidak melebihi 30–40% penghasilan bulanan
- Skor BI Checking / SLIK OJK bersih

## Dokumen yang Dibutuhkan

1. KTP, KK, NPWP
2. Slip gaji 3 bulan terakhir / Surat Keterangan Penghasilan
3. Rekening koran 3 bulan terakhir
4. Sertifikat properti yang akan dibeli

## Tips Lolos KPR

**Bersihkan catatan kredit:** Lunasi cicilan yang telat sebelum mengajukan. Skor kredit bersih meningkatkan peluang approval secara signifikan.

**Siapkan uang muka:** Minimal 10–20% dari harga properti. Semakin besar DP, cicilan makin ringan.

**Konsultasikan bersama agen:** Esther dapat membantu Anda menghitung kemampuan bayar dan merekomendasikan properti yang sesuai budget KPR Anda.`,
    kontenEn: `# Complete Guide to First Home Mortgage for Millennials in 2026

## What is a Mortgage (KPR)?

A KPR (Kredit Pemilikan Rumah / Home Ownership Credit) is a credit facility from a bank to help you buy a home with monthly installments. Tenors vary from 5 to 30 years.

## General KPR Application Requirements

- Minimum age 21 years, maximum 55 years when credit ends
- Indonesian citizen with fixed income (employee) or self-employed (entrepreneur)
- Installment ratio does not exceed 30–40% of monthly income
- Clean BI Checking / SLIK OJK score

## Required Documents

1. ID card, Family Card, NPWP
2. Last 3 months salary slips / Income Certificate
3. Last 3 months bank statements
4. Certificate of the property to be purchased

## Tips for KPR Approval

**Clean up credit records:** Pay off late installments before applying. A clean credit score significantly increases approval chances.

**Prepare a down payment:** Minimum 10–20% of property price. The larger the down payment, the lighter the installments.

**Consult with an agent:** Esther can help you calculate your payment capacity and recommend properties that match your KPR budget.`,
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    tanggalPublish: "2026-07-05",
    tagKawasan: ["bsd-city", "bintaro", "alam-sutera"],
    tags: ["kpr", "tips-properti", "panduan", "rumah-pertama"],
  },

  {
    id: "artikel-003",
    slug: "kenapa-alam-sutera-pilihan-investasi-terbaik",
    judul: "5 Alasan Kenapa Alam Sutera Tetap Menjadi Pilihan Investasi Properti Terbaik",
    judulEn: "5 Reasons Why Alam Sutera Remains the Best Property Investment Choice",
    ringkasan:
      "Dari kehadiran universitas, mall premium, hingga ekosistem perkantoran yang berkembang — Alam Sutera punya fondasi investasi yang solid untuk jangka panjang.",
    ringkasanEn:
      "From the presence of universities, premium malls, to a growing office ecosystem — Alam Sutera has a solid investment foundation for the long term.",
    konten: `# 5 Alasan Kenapa Alam Sutera Tetap Menjadi Pilihan Investasi Properti Terbaik

## 1. Ekosistem Pendidikan Tinggi

Kehadiran Universitas Bina Nusantara (Binus) di Alam Sutera menghasilkan ekosistem ekonomi yang berkelanjutan. Ribuan mahasiswa dan dosen membutuhkan hunian, menjadikan properti di kawasan ini selalu memiliki demand tinggi untuk disewakan.

## 2. AEON Mall sebagai Pusat Komersial Premium

AEON Mall Alam Sutera menghadirkan lebih dari 300 tenant termasuk brand internasional. Keberadaan mall kelas ini meningkatkan value properti di sekitarnya secara signifikan.

## 3. Pertumbuhan Kawasan Perkantoran

Alam Sutera kini memiliki kawasan komersial dan perkantoran yang aktif. Banyak perusahaan teknologi dan startup yang memilih Alam Sutera sebagai lokasi kantor, meningkatkan demand hunian dari para profesional.

## 4. Infrastruktur Tol Strategis

Akses langsung ke Tol Serpong-Balaraja menjamin konektivitas ke seluruh Jabodetabek. Rencana pembangunan MRT atau LRT yang melewati kawasan ini akan semakin meningkatkan nilai properti ke depannya.

## 5. Developer Terpercaya

PT Alam Sutera Realty Tbk (ASRI) adalah perusahaan publik dengan track record yang solid. Kualitas infrastruktur dan tata kelola kawasan terjaga dengan baik, memberikan rasa aman bagi investor jangka panjang.

---

*Tertarik investasi di Alam Sutera? Konsultasikan pilihan properti Anda dengan Esther secara gratis.*`,
    kontenEn: `# 5 Reasons Why Alam Sutera Remains the Best Property Investment Choice

## 1. Higher Education Ecosystem

The presence of Bina Nusantara University (Binus) in Alam Sutera creates a sustainable economic ecosystem. Thousands of students and lecturers need housing, making properties in this area always in high demand for rental.

## 2. AEON Mall as a Premium Commercial Center

AEON Mall Alam Sutera houses over 300 tenants including international brands. The presence of this class of mall significantly increases the value of surrounding properties.

## 3. Growing Office Area

Alam Sutera now has an active commercial and office area. Many technology companies and startups choose Alam Sutera as their office location, increasing residential demand from professionals.

## 4. Strategic Toll Infrastructure

Direct access to the Serpong-Balaraja Toll ensures connectivity throughout the Greater Jakarta area. Plans for MRT or LRT construction passing through the area will further increase property values in the future.

## 5. Trusted Developer

PT Alam Sutera Realty Tbk (ASRI) is a public company with a solid track record. Infrastructure quality and area governance are well maintained, providing peace of mind for long-term investors.

---

*Interested in investing in Alam Sutera? Consult your property choices with Esther for free.*`,
    thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    tanggalPublish: "2026-07-08",
    tagKawasan: ["alam-sutera"],
    tags: ["investasi", "alam-sutera", "analisis-kawasan", "tips-properti"],
  },
];
