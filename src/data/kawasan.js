// @ts-check
// src/data/kawasan.js
//
// Mock data untuk 4 kawasan utama yang dilayani Esther REMAX.
// Setiap kawasan memiliki deskripsi bilingual, fasilitas unggulan, dan koordinat.
// Relasi: Listing.kawasanId → Kawasan.id

/** @type {import('../lib/types').Kawasan[]} */
export const kawasanList = [
  {
    id: "bsd-city",
    slug: "bsd-city",
    nama: "BSD City",
    namaEn: "BSD City",
    deskripsi:
      "BSD City (Bumi Serpong Damai) adalah kota mandiri terbesar di Tangerang Selatan yang dikembangkan oleh Sinar Mas Land. Kawasan seluas lebih dari 6.000 hektar ini menawarkan ekosistem hunian, komersial, dan pendidikan yang lengkap. Dengan infrastruktur modern seperti Stasiun KRL Commuter Line, kawasan ini sangat terhubung ke Jakarta Pusat dan Selatan. BSD City dikenal dengan lingkungan hijau, keamanan 24 jam, dan kualitas hidup yang tinggi. Developer utama seperti Sinar Mas Land, Paramount, dan Summarecon terus membangun klaster-klaster baru dengan desain kontemporer. Harga properti di BSD City terus mengalami kenaikan signifikan setiap tahunnya, menjadikannya salah satu pilihan investasi properti terbaik di Tangerang Selatan.",
    deskripsiEn:
      "BSD City (Bumi Serpong Damai) is the largest self-contained city in South Tangerang, developed by Sinar Mas Land. Spanning over 6,000 hectares, it offers a complete ecosystem of residential, commercial, and educational facilities. With modern infrastructure including a KRL Commuter Line Station, the area is well-connected to Central and South Jakarta. BSD City is known for its green environment, 24-hour security, and high quality of life. Major developers like Sinar Mas Land, Paramount, and Summarecon continue to build new clusters with contemporary designs. Property prices in BSD City have seen significant annual increases, making it one of the best property investment choices in South Tangerang.",
    fotoHero: "https://res.cloudinary.com/dnmhna2fc/image/upload/f_auto/q_auto/bsd-city_ykhqro.png",
    fasilitasUnggulan: [
      "Stasiun KRL Commuter Line BSD",
      "ICE BSD Convention Center",
      "Sekolah Internasional (SIS, Binus School)",
      "RS Mandaya & RS Eka Hospital",
      "AEON Mall & The Breeze BSD",
    ],
    fasilitasUnggulanEn: [
      "BSD KRL Commuter Line Station",
      "ICE BSD Convention Center",
      "International Schools (SIS, Binus School)",
      "Mandaya & Eka Hospital",
      "AEON Mall & The Breeze BSD",
    ],
    koordinat: { lat: -6.3018, lng: 106.6522 },
  },

  {
    id: "gading-serpong",
    slug: "gading-serpong",
    nama: "Gading Serpong",
    namaEn: "Gading Serpong",
    deskripsi:
      "Gading Serpong adalah kawasan hunian premium yang dikembangkan oleh Summarecon Agung di Tangerang. Kawasan ini dikenal dengan tata kota yang terencana matang, jalan-jalan lebar, dan berbagai fasilitas komersial kelas atas. Aksesibilitas tinggi melalui Tol Karang Tengah dan JORR menjadikan Gading Serpong pilihan utama bagi profesional yang bekerja di Jakarta namun menginginkan hunian yang nyaman dan prestisius. Summarecon Mall Serpong menjadi pusat komersial dan hiburan utama kawasan ini. Dengan beragam pilihan mulai dari klaster perumahan, ruko komersial, hingga apartemen modern, Gading Serpong memenuhi berbagai kebutuhan hunian dan investasi.",
    deskripsiEn:
      "Gading Serpong is a premium residential area developed by Summarecon Agung in Tangerang. The area is known for its well-planned urban layout, wide streets, and various upscale commercial facilities. High accessibility via the Karang Tengah Toll and JORR makes Gading Serpong a top choice for professionals working in Jakarta who desire comfortable and prestigious housing. Summarecon Mall Serpong serves as the main commercial and entertainment center of the area. With diverse options ranging from residential clusters, commercial shophouses, to modern apartments, Gading Serpong meets various residential and investment needs.",
    fotoHero: "https://res.cloudinary.com/dnmhna2fc/image/upload/f_auto/q_auto/gading-serpong_ch8weo.png",
    fasilitasUnggulan: [
      "Summarecon Mall Serpong",
      "Akses Tol Karang Tengah & JORR",
      "RS Siloam Hospitals Serpong",
      "Sekolah Citra Kasih & Sekolah Citra Berkat",
      "Pasar Modern & Pusat Kuliner Gading Serpong",
    ],
    fasilitasUnggulanEn: [
      "Summarecon Mall Serpong",
      "Karang Tengah & JORR Toll Access",
      "Siloam Hospitals Serpong",
      "Citra Kasih & Citra Berkat Schools",
      "Modern Market & Culinary Center",
    ],
    koordinat: { lat: -6.2437, lng: 106.6268 },
  },

  {
    id: "alam-sutera",
    slug: "alam-sutera",
    nama: "Alam Sutera",
    namaEn: "Alam Sutera",
    deskripsi:
      "Alam Sutera adalah kawasan kota mandiri terintegrasi yang dikembangkan oleh PT Alam Sutera Realty Tbk di Tangerang. Mengusung konsep smart living dengan fasilitas lengkap dan lingkungan hijau, kawasan ini menjadi salah satu yang paling dicari di Tangerang Selatan. Kehadiran AEON Mall sebagai pusat perbelanjaan premium dan Universitas Bina Nusantara menambah daya tarik kawasan ini. Akses strategis melalui Tol Serpong-Balaraja menjamin konektivitas yang optimal ke berbagai penjuru Jabodetabek. Alam Sutera juga menawarkan kawasan komersial dan perkantoran yang berkembang pesat, menjadikannya destinasi investasi yang prospektif.",
    deskripsiEn:
      "Alam Sutera is an integrated self-contained city developed by PT Alam Sutera Realty Tbk in Tangerang. Embracing a smart living concept with complete facilities and a green environment, it has become one of the most sought-after areas in South Tangerang. The presence of AEON Mall as a premium shopping center and Bina Nusantara University adds to the area's appeal. Strategic access via the Serpong-Balaraja Toll ensures optimal connectivity throughout the Greater Jakarta area. Alam Sutera also offers rapidly growing commercial and office areas, making it a prospective investment destination.",
    fotoHero: "https://res.cloudinary.com/dnmhna2fc/image/upload/f_auto/q_auto/alam-sutera_lsk2fl.png",
    fasilitasUnggulan: [
      "AEON Mall Alam Sutera",
      "Universitas Bina Nusantara (Binus)",
      "Akses Tol Serpong-Balaraja",
      "RS Omni Alam Sutera",
      "Sekolah Al-Azhar BSD & SMA Kolese Gonzaga Alam",
    ],
    fasilitasUnggulanEn: [
      "AEON Mall Alam Sutera",
      "Bina Nusantara University (Binus)",
      "Serpong-Balaraja Toll Access",
      "Omni Hospital Alam Sutera",
      "Al-Azhar BSD School & Kolese Gonzaga Alam",
    ],
    koordinat: { lat: -6.2259, lng: 106.6515 },
  },

  {
    id: "bintaro",
    slug: "bintaro",
    nama: "Bintaro",
    namaEn: "Bintaro",
    deskripsi:
      "Bintaro adalah kawasan hunian mapan yang telah berkembang selama puluhan tahun di Tangerang Selatan. Dengan jaringan transportasi yang lengkap meliputi Commuter Line dan akses tol, Bintaro menjadi pilihan ideal bagi keluarga yang menginginkan hunian strategis dekat Jakarta. Bintaro Xchange Mall hadir sebagai pusat perbelanjaan dan hiburan modern di kawasan ini. Berbagai fasilitas kesehatan premium seperti RS Pondok Indah Bintaro Jaya dan RS Permata Dalima tersedia untuk mendukung kualitas hidup warganya. Kawasan Bintaro terus berkembang dengan berbagai proyek hunian baru yang menghadirkan konsep modern dan terjangkau.",
    deskripsiEn:
      "Bintaro is an established residential area that has been developing for decades in South Tangerang. With a complete transportation network including Commuter Line and toll access, Bintaro is an ideal choice for families seeking strategic housing close to Jakarta. Bintaro Xchange Mall serves as a modern shopping and entertainment center in the area. Various premium healthcare facilities such as Pondok Indah Hospital Bintaro Jaya and Permata Dalima Hospital support residents' quality of life. The Bintaro area continues to grow with new residential projects offering modern and affordable concepts.",
    fotoHero: "https://res.cloudinary.com/dnmhna2fc/image/upload/f_auto/q_auto/bintaro_hei6gt.png",
    fasilitasUnggulan: [
      "Bintaro Xchange Mall & XChange 2",
      "Stasiun Commuterline Bintaro & Jurang Mangu",
      "RS Pondok Indah Bintaro Jaya",
      "Akses Tol Jakarta-Serpong & JORR",
      "Prasetiya Mulya University",
    ],
    fasilitasUnggulanEn: [
      "Bintaro Xchange Mall & XChange 2",
      "Bintaro & Jurang Mangu Commuterline Stations",
      "Pondok Indah Hospital Bintaro Jaya",
      "Jakarta-Serpong & JORR Toll Access",
      "Prasetiya Mulya University",
    ],
    koordinat: { lat: -6.2895, lng: 106.7204 },
  },
];
