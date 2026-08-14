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

*Tertarik investasi di Alam Sutera? Konsultasikan pilihan properti Anda dengan Esther .*`,
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

  {
    id: "artikel-004",
    slug: "rekomendasi-cluster-dekat-sekolah-favorit-bsd-gading-serpong",
    judul: "Bebas Macet Antar-Jemput: Rekomendasi Cluster Dekat Sekolah Favorit di BSD & Gading Serpong",
    judulEn: "Stress-Free School Commutes: Best Housing Clusters Near Top Schools in BSD & Gading Serpong",
    ringkasan:
      "Panduan lengkap rekomendasi cluster perumahan ramah anak dengan jarak tempuh 5–10 menit ke sekolah favorit di BSD City dan Gading Serpong beserta estimasi harganya.",
    ringkasanEn:
      "Comprehensive guide to family-friendly housing clusters within a 5-10 minute commute to top schools in BSD City and Gading Serpong, including 2026 price estimates.",
    konten: `# Bebas Macet Antar-Jemput: Rekomendasi Cluster Dekat Sekolah Favorit di BSD & Gading Serpong

Bagi keluarga dengan anak usia sekolah, waktu perjalanan harian adalah faktor paling krusial dalam memilih hunian. **Memilih rumah dalam radius 5–10 menit dari sekolah unggulan di BSD City dan Gading Serpong terbukti menghemat 2 hingga 3 jam waktu orang tua setiap hari, sekaligus memastikan anak tiba di sekolah dalam kondisi bugar tanpa stres kemacetan pagi.**

Berikut panduan rekomendasi cluster perumahan primary maupun secondary terbaik yang berlokasi strategis di sekitar yayasan pendidikan ternama.

---

## 1. Mengapa Lokasi Rumah Dekat Sekolah Jadi Prioritas Utama?

Kemacetan di sekitar gerbang sekolah pada jam masuk (06.30–07.30) dan jam pulang (13.00–15.30) sering menjadi sumber frustrasi harian. Memilih hunian di dalam *township* mandiri seperti [BSD City](/kawasan/bsd-city) dan [Gading Serpong](/kawasan/gading-serpong) memberikan keuntungan langsung:

1. **Efisiensi Waktu & Energi:** Waktu tempuh singkat memungkinkan anak tidur cukup, sarapan tenang di rumah, dan memiliki waktu luang lebih banyak untuk istirahat serta hobi.
2. **Jalur Transportasi Terintegrasi:** Banyak cluster modern yang terhubung langsung dengan rute shuttle bus gratis (*BSD Link*), jalur sepeda aman, dan trotoar pedestrian yang ramah anak.
3. **Nilai Investasi & Likuiditas Tinggi:** Properti yang berada di zona edukasi memiliki tingkat permintaan sewa (*rental demand*) dan nilai jual kembali (*resale value*) yang selalu stabil dari tahun ke tahun.

---

## 2. Rekomendasi Cluster Dekat Sekolah Favorit di Gading Serpong

Gading Serpong dikenal memiliki reputasi sekolah berbasis trilingual dan institusi nasional plus terkemuka.

### A. Sekitar Sekolah Terpadu Pahoa & BPK Penabur Gading Serpong
* **Karakteristik Sekolah:** Berbasis kurikulum trilingual (Indonesia, Mandarin, Inggris) dan karakter disiplin unggul.
* **Cluster Rekomendasi:**
  * **Symphonia (Cluster Verdi, Rossini, Mozart, Mindora):** Hunian modern di tepi danau dengan jarak hanya 5–8 menit berkendara ke Pahoa dan Penabur.
  * **Scientia Garden (Cluster Dalton, Faraday, Newton):** Berada tepat di seberang area komersial dan sangat dekat dengan jalur drop-off sekolah.
* **Kisaran Harga:** Rp 1,8 Miliar – Rp 4,5 Miliar (Primary & Secondary).

### B. Sekitar Stella Maris & Tarakanita Gading Serpong
* **Karakteristik Sekolah:** Pendidikan berwawasan global dengan pendekatan sains, kepemimpinan, dan nilai moral yang kuat.
* **Cluster Rekomendasi:**
  * **Pasadena Grand Residences & Matera Residences:** Untuk segmen premium dengan fasilitas *clubhouse* lengkap dan keamanan 24 jam.
  * **Cluster Pondok Hijau Golf (PHG):** Pilihan secondary favorit dengan luas tanah lega dan lingkungan asri.
* **Kisaran Harga:** Mulai Rp 2,5 Miliar hingga di atas Rp 7 Miliar.

---

## 3. Rekomendasi Cluster Dekat Sekolah Favorit di BSD City

BSD City merupakan pusat institusi pendidikan internasional dan nasional unggulan dengan infrastruktur jalan lebar bebas hambatan.

### A. Sekitar IPEKA BSD & Sinarmas World Academy (SWA)
* **Karakteristik Sekolah:** Kurikulum internasional (IB & Cambridge) serta kurikulum nasional berkarakter kristiani modern.
* **Cluster Rekomendasi:**
  * **Greenwich Park (Cluster Mayfield, Sheffield, Luxmore):** Kawasan bergaya resor dengan 3 thematic clubhouses terpisah dan *connectivity path* tanpa bersinggungan langsung dengan jalan raya utama.
  * **The Mozia (Cluster Amarine, Avezza):** Cluster praktis dengan akses 5 menit ke IPEKA BSD dan ICE BSD.
* **Kisaran Harga:** Rp 2,2 Miliar – Rp 6 Miliar.

### B. Sekitar Jakarta Nanyang School & Santa Ursula BSD
* **Karakteristik Sekolah:** Nanyang School berfokus pada trilingual berstandar Singapura, sementara Santa Ursula memiliki reputasi puluhan tahun dalam disiplin akademik.
* **Cluster Rekomendasi:**
  * **NavaPark (Cluster Lancewood, Lakewood, Layar):** Super luxury township dengan botanical park 10 hektar, berjarak 3 menit ke Nanyang School.
  * **Tanakayu & Tabebuya:** Pilihan compact home fully furnished, sangat cocok untuk keluarga muda baru dengan budget efisien (± 10 menit ke sekolah).
* **Kisaran Harga:** Mulai Rp 1,7 Miliar (Tanakayu) hingga Rp 12+ Miliar (NavaPark).

---

## 4. Tabel Komparasi Jarak Tempuh & Estimasi Anggaran

| Sekolah Target | Kawasan | Rekomendasi Cluster | Estimasi Waktu Tempuh | Estimasi Budget (2026) |
| :--- | :--- | :--- | :--- | :--- |
| **Pahoa & Penabur** | Gading Serpong | Symphonia & Scientia Garden | 5 – 8 Menit | Rp 1,8 M – Rp 4,2 M |
| **Stella Maris & Tarakanita** | Gading Serpong | Pasadena & Sektor 6/7 | 5 – 10 Menit | Rp 2,3 M – Rp 5,5 M |
| **IPEKA BSD** | BSD City | Greenwich Park & Mozia | 4 – 7 Menit | Rp 2,2 M – Rp 5,8 M |
| **Sinarmas World Academy (SWA)** | BSD City | Eminent & Greenwich Park | 5 – 9 Menit | Rp 2,8 M – Rp 7,0 M |
| **Jakarta Nanyang School** | BSD City | NavaPark & The Breeze Area | 3 – 6 Menit | Rp 4,5 M – Rp 15+ M |
| **Santa Ursula & Al-Azhar BSD** | BSD City Timur | Griya Loka & Kencana Loka (Secondary) | 5 – 10 Menit | Rp 1,3 M – Rp 3,0 M |

> 💡 **Tips dari Esther:** Sebelum memutuskan membeli unit, luangkan waktu untuk melakukan uji coba perjalanan (*test drive*) pada pukul 06.45 pagi dari gerbang cluster menuju gerbang drop-off sekolah incaran Anda guna memastikan rute yang paling lancar.

---

## 5. Simulasi Perhitungan Cicilan KPR

Bagi Anda yang berencana membeli rumah dengan fasilitas kredit perbankan, Anda dapat memanfaatkan kalkulator interaktif kami untuk menghitung estimasi uang muka (DP) dan plafon cicilan bulanan yang ideal:

👉 [[Buka Kalkulator Simulasi KPR Esther Property](/kalkulator-kpr)]

---

## 6. Pertanyaan yang Sering Diajukan (FAQ)

### Apakah ada fasilitas antar-jemput internal di dalam kawasan BSD dan Gading Serpong?
Ya. BSD City memiliki armada shuttle bus ramah lingkungan (*BSD Link*) dengan rute yang melewati beberapa sekolah dan titik komersial. Sementara di Gading Serpong, banyak cluster menyediakan titik jemput bus sekolah mandiri di depan *gate* cluster.

### Apakah lebih baik membeli rumah baru (primary) atau rumah seken (secondary) dekat sekolah?
Jika Anda ingin rumah siap huni yang bisa langsung ditempati sebelum tahun ajaran baru dimulai, rumah secondary di cluster mapan adalah pilihan tepat. Namun, jika Anda mempersiapkan anak untuk 1–2 tahun ke depan, rumah primary menawarkan skema pembayaran DP ringan dan promo developer.

---

## Temukan Rumah Idaman Dekat Sekolah Anak Bersama Esther

Mencari unit terbaik dengan spesifikasi kamar cukup, layout sirkulasi udara optimal, dan lokasi terdekat ke sekolah favorit anak Anda?

Hubungi **Esther (RE/MAX)** untuk pendampingan survey lokasi, negosiasi harga terbaik dengan pemilik, atau informasi unit promosi developer terbaru:

* 💬 **WhatsApp Langsung:** [Hubungi Esther Sekarang](/kontak)
* 🏡 **Jelajahi Pilihan Rumah:** [Lihat Listing Properti Terkini](/properti)`,
    kontenEn: `# Stress-Free School Commutes: Best Housing Clusters Near Top Schools in BSD & Gading Serpong

For families with school-age children, daily commute time is one of the most critical factors when choosing a home. **Living within a 5 to 10-minute radius of top-tier schools in BSD City and Gading Serpong saves parents 2 to 3 hours every day, ensuring children arrive at school energized and free from morning traffic stress.**

Here is an expert guide to the best primary and secondary housing clusters strategically located near leading educational institutions.

---

## 1. Why Proximity to Schools is a Top Priority for Families

Morning rush-hour traffic around school gates (06:30–07:30 AM) and afternoon pickup times (01:00–03:30 PM) can easily become a daily headache. Living inside master-planned townships like [BSD City](/kawasan/bsd-city) and [Gading Serpong](/kawasan/gading-serpong) offers clear advantages:

1. **Time & Energy Efficiency:** Shorter travel times allow children to get sufficient rest, enjoy breakfast at home, and have more balanced schedules for hobbies and recreation.
2. **Integrated Mobility:** Many modern clusters connect directly to complimentary shuttle routes (*BSD Link*), safe cycling paths, and pedestrian-friendly walkways.
3. **High Capital Growth & Rental Demand:** Properties located within education hubs consistently maintain strong resale liquidity and high rental demand year after year.

---

## 2. Top Housing Clusters Near Prestigious Schools in Gading Serpong

Gading Serpong is renowned for trilingual academies and leading national-plus institutions.

### A. Near Pahoa Integrated School & BPK Penabur Gading Serpong
* **School Highlights:** Trilingual curriculum (Indonesian, Mandarin, English) with a strong emphasis on character building.
* **Recommended Clusters:**
  * **Symphonia (Verdi, Rossini, Mozart, Mindora):** Modern lakeside residences only 5–8 minutes from Pahoa and Penabur.
  * **Scientia Garden (Dalton, Faraday, Newton):** Located directly opposite commercial hubs with effortless access to school zones.
* **Price Range:** IDR 1.8 Billion – IDR 4.5 Billion.

### B. Near Stella Maris & Tarakanita Gading Serpong
* **School Highlights:** Internationally minded education with robust science, leadership, and moral foundations.
* **Recommended Clusters:**
  * **Pasadena Grand Residences & Matera Residences:** Luxury tier with state-of-the-art clubhouses and 24/7 security.
  * **Pondok Hijau Golf (PHG):** An established secondary favorite offering spacious land areas and lush surroundings.
* **Price Range:** IDR 2.5 Billion to upwards of IDR 7+ Billion.

---

## 3. Top Housing Clusters Near Top Schools in BSD City

BSD City boasts an impressive lineup of international and leading national schools connected by wide, well-maintained arterial roads.

### A. Near IPEKA BSD & Sinarmas World Academy (SWA)
* **School Highlights:** World-class Cambridge and International Baccalaureate (IB) programs alongside Christian-values education.
* **Recommended Clusters:**
  * **Greenwich Park (Mayfield, Sheffield, Luxmore):** Resort-style living with 3 exclusive thematic clubhouses and segregated pedestrian paths.
  * **The Mozia (Amarine, Avezza):** Practical, modern clusters situated only 5 minutes from IPEKA BSD and ICE BSD.
* **Price Range:** IDR 2.2 Billion – IDR 6 Billion.

### B. Near Jakarta Nanyang School & Santa Ursula BSD
* **School Highlights:** Singapore-standard trilingual curriculum at Nanyang School and decades-long academic discipline at Santa Ursula.
* **Recommended Clusters:**
  * **NavaPark (Lancewood, Lakewood, Layar):** Ultra-luxury township featuring a 10-hectare botanical park, just 3 minutes from Nanyang School.
  * **Tanakayu & Tabebuya:** Compact, fully furnished modern houses ideal for young families (± 10 minutes to major school campuses).
* **Price Range:** IDR 1.7 Billion (Tanakayu) to IDR 12+ Billion (NavaPark).

---

## 4. Distance & Budget Comparison Table

| Target School | Township | Recommended Clusters | Est. Commute Time | Price Estimate (2026) |
| :--- | :--- | :--- | :--- | :--- |
| **Pahoa & Penabur** | Gading Serpong | Symphonia & Scientia Garden | 5 – 8 Mins | IDR 1.8B – IDR 4.2B |
| **Stella Maris & Tarakanita** | Gading Serpong | Pasadena & Sector 6/7 | 5 – 10 Mins | IDR 2.3B – IDR 5.5B |
| **IPEKA BSD** | BSD City | Greenwich Park & Mozia | 4 – 7 Mins | IDR 2.2B – IDR 5.8B |
| **Sinarmas World Academy (SWA)** | BSD City | Eminent & Greenwich Park | 5 – 9 Mins | IDR 2.8B – IDR 7.0B |
| **Jakarta Nanyang School** | BSD City | NavaPark & The Breeze Area | 3 – 6 Mins | IDR 4.5B – IDR 15B+ |
| **Santa Ursula & Al-Azhar BSD** | BSD East | Griya Loka & Kencana Loka (Secondary) | 5 – 10 Mins | IDR 1.3B – IDR 3.0B |

---

## 5. Calculate Your Monthly Mortgage Estimate

Planning your purchase with a bank mortgage? Use our interactive mortgage calculator to assess your down payment and monthly installment plans:

👉 [[Open Esther Property Mortgage Calculator](/kalkulator-kpr)]

---

## 6. Frequently Asked Questions (FAQ)

### Are there internal shuttle options in BSD and Gading Serpong?
Yes. BSD City operates the eco-friendly *BSD Link* shuttle network passing key educational and lifestyle destinations. In Gading Serpong, numerous clusters feature dedicated bus stop shelters for private school pickups.

### Should I choose a new developer unit (primary) or an existing home (secondary)?
If you need immediate occupancy before the upcoming academic year starts, a ready-to-move secondary home in a mature cluster is ideal. If your enrollment timeline is 1–2 years ahead, primary developer units offer attractive DP promotions and installment flexibility.

---

## Find Your Family's Next Home with Esther

Looking for the perfect home close to your child's dream school with optimal layout, security, and amenities?

Contact **Esther (RE/MAX)** for private property viewings, transparent price negotiations, and the latest developer offers:

* 💬 **Direct WhatsApp:** [Contact Esther Today](/kontak)
* 🏡 **Explore Listings:** [Browse Available Properties](/properti)`,
    thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    tanggalPublish: "2026-08-14",
    tagKawasan: ["bsd-city", "gading-serpong"],
    tags: ["panduan-membeli", "cluster-ramah-anak", "fasilitas-pendidikan", "bsd-city", "gading-serpong"],
  },
];

