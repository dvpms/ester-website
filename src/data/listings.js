// @ts-check
// src/data/listings.js
//
// Mock data 6 listing properti dengan variasi segmen, jenis, dan kawasan.
// Relasi ke kawasan via kawasanId (→ Kawasan.id) dan kawasanSlug (→ Kawasan.slug).
// 2 listing bertanda featured: true → ditampilkan di section Featured Homepage.

/** @type {import('../lib/types').Listing[]} */
export const listings = [
  // ── Primary: Rumah baru developer ─────────────────────────────────────────
  {
    id: "listing-001",
    slug: "cluster-anaya-bsd-city",
    nama: "Cluster Anaya BSD City",
    namaEn: "Cluster Anaya BSD City",
    segmen: "primary",
    jenisProperti: "rumah",
    transaksi: "dijual",
    kawasanId: "bsd-city",
    kawasanSlug: "bsd-city",
    harga: 1800000000,
    lokasiDetail: "Greenwich Park, BSD City, Tangerang Selatan",
    spesifikasi: {
      lt: 120,
      lb: 90,
      kamarTidur: 3,
      kamarMandi: 2,
    },
    galeri: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
    status: "tersedia",
    developerNama: "Sinar Mas Land",
    deskripsi:
      "Hunian modern dua lantai di kawasan prestigious Greenwich Park, BSD City. Desain arsitektur kontemporer dengan taman privat dan carport 2 mobil. Dilengkapi dengan cluster security 24 jam, kolam renang komunal, dan taman bermain anak. Lokasi strategis, 5 menit dari Stasiun KRL BSD dan AEON Mall.",
    deskripsiEn:
      "Modern two-story home in the prestigious Greenwich Park area, BSD City. Contemporary architectural design with a private garden and 2-car carport. Equipped with 24-hour cluster security, communal swimming pool, and children's playground. Strategic location, 5 minutes from BSD KRL Station and AEON Mall.",
    featured: true,
  },

  // ── Secondary: Rumah second pemilik langsung ───────────────────────────────
  {
    id: "listing-002",
    slug: "rumah-2-lantai-gading-serpong",
    nama: "Rumah 2 Lantai Gading Serpong",
    namaEn: "2-Story House Gading Serpong",
    segmen: "secondary",
    jenisProperti: "rumah",
    transaksi: "dijual",
    kawasanId: "gading-serpong",
    kawasanSlug: "gading-serpong",
    harga: 2500000000,
    lokasiDetail: "Cluster Cempaka, Gading Serpong, Tangerang",
    spesifikasi: {
      lt: 150,
      lb: 200,
      kamarTidur: 4,
      kamarMandi: 3,
    },
    galeri: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    ],
    status: "tersedia",
    pemilikNama: null,
    deskripsi:
      "Rumah 2 lantai kondisi terawat dengan renovasi dapur dan kamar mandi terbaru. Posisi hook di ujung klaster dengan halaman samping lebih luas. Dekat Summarecon Mall Serpong dan RS Siloam. Sertifikat SHM, IMB lengkap.",
    deskripsiEn:
      "Well-maintained 2-story house with recently renovated kitchen and bathrooms. Hook position at the end of the cluster with wider side yard. Close to Summarecon Mall Serpong and Siloam Hospital. Full SHM certificate and building permit.",
    featured: true,
  },

  // ── Primary: Apartemen baru developer ─────────────────────────────────────
  {
    id: "listing-003",
    slug: "apartemen-the-groove-alam-sutera",
    nama: "Apartemen The Groove Alam Sutera",
    namaEn: "The Groove Apartment Alam Sutera",
    segmen: "primary",
    jenisProperti: "apartemen",
    transaksi: "dijual",
    kawasanId: "alam-sutera",
    kawasanSlug: "alam-sutera",
    harga: 850000000,
    lokasiDetail: "Alam Sutera, Tangerang Selatan",
    spesifikasi: {
      lb: 36,
      kamarTidur: 2,
      kamarMandi: 1,
    },
    galeri: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    status: "tersedia",
    developerNama: "Alam Sutera Realty",
    deskripsi:
      "Unit apartemen 2 kamar tidur dengan city view di lantai tengah. Fasilitas lengkap: rooftop garden, coworking space, gym, dan kolam renang infinity. Walking distance ke AEON Mall dan area komersial. Cocok untuk investasi sewaan dengan yield tinggi.",
    deskripsiEn:
      "2-bedroom apartment unit with city view on a mid-floor. Full facilities: rooftop garden, coworking space, gym, and infinity pool. Walking distance to AEON Mall and commercial area. Ideal for rental investment with high yield.",
    featured: false,
  },

  // ── Secondary: Kavling di BSD ──────────────────────────────────────────────
  {
    id: "listing-004",
    slug: "kavling-premium-bsd-city-selatan",
    nama: "Kavling Premium BSD City Selatan",
    namaEn: "Premium Land Plot BSD City South",
    segmen: "secondary",
    jenisProperti: "kavling",
    transaksi: "dijual",
    kawasanId: "bsd-city",
    kawasanSlug: "bsd-city",
    harga: 3200000000,
    lokasiDetail: "Sektor BSD City Selatan, Tangerang Selatan",
    spesifikasi: {
      lt: 400,
    },
    galeri: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    ],
    status: "tersedia",
    pemilikNama: null,
    deskripsi:
      "Kavling 400 m² di lokasi strategis BSD City Selatan, akses jalan lebar 12 meter. Sertifikat SHM, posisi sudut dengan dua muka jalan. Lingkungan eksklusif, cocok untuk bangun hunian mewah atau properti komersial. Nilai tanah terus naik konsisten setiap tahun.",
    deskripsiEn:
      "400 m² land plot in a strategic location in South BSD City, with 12-meter wide road access. SHM certificate, corner position with two road frontages. Exclusive environment, suitable for building a luxury home or commercial property. Land value consistently appreciates each year.",
    featured: false,
  },

  // ── Primary: Ruko baru di Bintaro ─────────────────────────────────────────
  {
    id: "listing-005",
    slug: "ruko-bintaro-commercial-hub",
    nama: "Ruko Bintaro Commercial Hub",
    namaEn: "Ruko Bintaro Commercial Hub",
    segmen: "primary",
    jenisProperti: "ruko",
    transaksi: "dijual",
    kawasanId: "bintaro",
    kawasanSlug: "bintaro",
    harga: 4500000000,
    lokasiDetail: "Bintaro Commercial Hub, Bintaro Jaya, Tangerang Selatan",
    spesifikasi: {
      lt: 60,
      lb: 180,
      kamarMandi: 3,
    },
    galeri: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    ],
    status: "tersedia",
    developerNama: "Jaya Real Property",
    deskripsi:
      "Ruko 3 lantai di kawasan komersial baru Bintaro Commercial Hub. Lebar muka 6 meter, ceiling tinggi 4,5 meter untuk fleksibilitas bisnis. Fasilitas parkir basement, genset, dan CCTV terpusat. Posisi di main boulevard, traffic tinggi. Cocok untuk showroom, klinik, restoran, atau kantor.",
    deskripsiEn:
      "3-story shophouse in the new Bintaro Commercial Hub commercial area. 6-meter wide frontage, 4.5-meter high ceiling for business flexibility. Basement parking, generator, and centralized CCTV facilities. Main boulevard position with high traffic. Suitable for showroom, clinic, restaurant, or office.",
    featured: false,
  },

  // ── Secondary: Rumah disewakan di Gading Serpong ──────────────────────────
  {
    id: "listing-006",
    slug: "sewa-rumah-furnished-gading-serpong",
    nama: "Sewa Rumah Furnished Gading Serpong",
    namaEn: "Furnished House for Rent Gading Serpong",
    segmen: "secondary",
    jenisProperti: "rumah",
    transaksi: "disewakan",
    kawasanId: "gading-serpong",
    kawasanSlug: "gading-serpong",
    harga: 60000000, // per tahun
    lokasiDetail: "Cluster Melati, Gading Serpong, Tangerang",
    spesifikasi: {
      lt: 100,
      lb: 120,
      kamarTidur: 3,
      kamarMandi: 2,
    },
    galeri: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    status: "tersedia",
    pemilikNama: null,
    deskripsi:
      "Rumah furnished siap huni di klaster tenang Gading Serpong. Furnitur premium lengkap: sofa, tempat tidur, AC, water heater, mesin cuci. Dapur dengan kitchen set modern. Carport 2 mobil. Cocok untuk keluarga ekspat atau profesional. Minimal sewa 1 tahun.",
    deskripsiEn:
      "Fully furnished ready-to-move-in house in a quiet Gading Serpong cluster. Premium complete furniture: sofa, beds, AC, water heater, washing machine. Kitchen with modern kitchen set. 2-car carport. Suitable for expat families or professionals. Minimum 1-year lease.",
    featured: false,
  },
];
