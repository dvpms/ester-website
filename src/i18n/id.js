// src/i18n/id.js
//
// Semua teks UI dalam Bahasa Indonesia.
// Diimpor oleh komponen — JANGAN hardcode teks langsung di JSX.
// Struktur key HARUS identik dengan en.js.

/** @type {typeof import('./en').en} */
export const id = {
  nav: {
    properties: "Properti",
    area: "Kawasan",
    blog: "Blog",
    about: "Tentang",
    contact: "Kontak",
  },

  cta: {
    whatsapp: "Hubungi via WhatsApp",
    consult: "Konsultasi",
    brochure: "Minta Brosur",
    more: "Lihat Selengkapnya",
    bookSurvey: "Booking Survei",
    submit: "Kirim",
    calculate: "Hitung Simulasi",
  },

  hero: {
    headline: "Temukan Properti Impian Anda",
    subheadline: "Spesialis properti di kawasan Tangerang Selatan — BSD City, Gading Serpong, Alam Sutera, dan Bintaro.",
    searchPlaceholder: "Cari kawasan atau nama properti...",
    badge: "Terpercaya sejak 2015",
  },

  filter: {
    allArea: "Semua Kawasan",
    allType: "Semua Tipe",
    allSegment: "Semua Segmen",
    allTransaction: "Semua Transaksi",
    priceRange: "Rentang Harga",
    apply: "Terapkan Filter",
    reset: "Reset",
    segment: {
      primary: "Primary (Developer)",
      secondary: "Secondary (Pemilik)",
    },
    type: {
      rumah: "Rumah",
      ruko: "Ruko",
      kavling: "Kavling",
      apartemen: "Apartemen",
    },
    transaction: {
      dijual: "Dijual",
      disewakan: "Disewakan",
    },
    status: {
      tersedia: "Tersedia",
      terjual: "Terjual",
      proses: "Dalam Proses",
    },
  },

  form: {
    nama: "Nama Lengkap",
    email: "Alamat Email",
    telepon: "Nomor Telepon",
    pesan: "Pesan / Pertanyaan",
    kawasan: "Kawasan yang Diminati",
    budget: "Budget Maksimum",
    jenisProperti: "Jenis Properti",
    segmen: "Segmen",
    required: "Wajib diisi",
    emailInvalid: "Format email tidak valid",
    phonePlaceholder: "Contoh: 08123456789",
    messagePlaceholder: "Ceritakan kebutuhan properti Anda...",
    successMessage: "Pesan berhasil dikirim! Esther akan menghubungi Anda segera.",
    errorMessage: "Terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.",
    privacy: "",
  },

  common: {
    loading: "Memuat...",
    noResult: "Tidak ada properti yang sesuai filter.",
    back: "Kembali",
    share: "Bagikan",
    copy: "Salin Link",
    copied: "Link berhasil disalin!",
    price: "Harga",
    location: "Lokasi",
    type: "Tipe",
    area: "Luas",
    bedrooms: "Kamar Tidur",
    bathrooms: "Kamar Mandi",
    landArea: "Luas Tanah",
    buildingArea: "Luas Bangunan",
    developer: "Developer",
    owner: "Pemilik",
    publishedOn: "Dipublikasikan",
    readMore: "Baca Selengkapnya",
    relatedArticles: "Artikel Terkait",
    relatedProperties: "Properti di",
    trustBadge: "Transaksi Aman & Terpercaya",
    yearsExperience: "Tahun Pengalaman",
    propertiesSold: "Properti Terjual",
    happyClients: "Klien Puas",
    kawasanCovered: "Kawasan Dilayani",
  },

  footer: {
    tagline: "Spesialis properti kawasan Tangerang Selatan.",
    quickLinks: "Navigasi",
    contact: "Hubungi Kami",
    followUs: "Ikuti Kami",
    copyright: `© ${new Date().getFullYear()} Esther Property. Hak cipta dilindungi.`,
  },

  kpr: {
    title: "Kalkulator KPR",
    subtitle: "Simulasikan cicilan KPR Anda dengan mudah.",
    hargaRumah: "Harga Rumah (Rp)",
    uangMuka: "Uang Muka (%)",
    tenorTahun: "Tenor (Tahun)",
    bungaTahunan: "Bunga Per Tahun (%)",
    hasilSimulasi: "Hasil Simulasi",
    pokokPinjaman: "Pokok Pinjaman",
    cicilanPerBulan: "Cicilan per Bulan",
    totalBayar: "Total Pembayaran",
    totalBunga: "Total Bunga",
    disclaimer: "Simulasi ini bersifat indikatif. Konsultasikan ke bank untuk informasi akurat.",
  },
};
