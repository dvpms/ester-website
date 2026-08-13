// @ts-check
// src/lib/types.js
//
// File ini murni untuk dokumentasi tipe via JSDoc.
// Import di komponen menggunakan: /** @type {import('../lib/types').Listing} */
// Tidak ada runtime logic di sini.

/**
 * @typedef {Object} Kawasan
 * Merepresentasikan satu area/kawasan properti yang dilayani Esther.
 *
 * @property {string} id                          - Identifier unik (sama dengan slug)
 * @property {string} slug                        - URL-friendly identifier (mis. "bsd-city")
 * @property {string} nama                        - Nama kawasan dalam Bahasa Indonesia
 * @property {string} namaEn                      - Nama kawasan dalam Bahasa Inggris
 * @property {string} deskripsi                   - Deskripsi kawasan 150–250 kata (ID)
 * @property {string} deskripsiEn                 - Deskripsi kawasan 150–250 kata (EN)
 * @property {string} fotoHero                    - URL gambar hero rasio 16:9 (WebP)
 * @property {string[]} fasilitasUnggulan         - Min. 3 poin fasilitas unggulan (ID)
 * @property {string[]} fasilitasUnggulanEn       - Min. 3 poin fasilitas unggulan (EN)
 * @property {{ lat: number, lng: number }} koordinat - Koordinat GPS kawasan
 */

/**
 * @typedef {Object} SpesifikasiProperti
 * @property {number} [lt]                        - Luas tanah dalam m²
 * @property {number} [lb]                        - Luas bangunan dalam m²
 * @property {number|string} [kamarTidur]         - Jumlah kamar tidur (mis. 4 atau "4+1")
 * @property {number|string} [kamarMandi]         - Jumlah kamar mandi (mis. 3 atau "3+1")
 * @property {number} [lantai]                    - Jumlah lantai (mis. 1, 2, 3)
 * @property {string} [hadap]                     - Arah hadap (mis. "Selatan", "Utara", "Timur", "Barat")
 * @property {string} [listrik]                   - Daya listrik (mis. "4400 Watt", "2200 Watt")
 * @property {string} [air]                       - Sumber air (mis. "PAM", "Air Tanah")
 * @property {string} [sertifikat]                - Legalitas (mis. "SHM (Hak Milik)", "HGB", "PPJB")
 */

/**
 * @typedef {Object} Listing
 * Merepresentasikan satu properti yang dijual/disewakan oleh Esther.
 *
 * @property {string} id                          - Identifier unik listing
 * @property {string} slug                        - URL-friendly identifier listing
 * @property {string} nama                        - Nama listing/proyek (ID)
 * @property {string} namaEn                      - Nama listing/proyek (EN)
 * @property {string} [judulBrosur]               - Judul ringkas khusus brosur (opsional, fallback ke nama)
 * @property {'primary'|'secondary'} segmen       - primary = developer baru, secondary = pemilik langsung
 * @property {'rumah'|'ruko'|'kavling'|'apartemen'} jenisProperti - Jenis properti
 * @property {'dijual'|'disewakan'} transaksi     - Jenis transaksi
 * @property {string} kawasanId                   - Relasi ke Kawasan.id
 * @property {string} kawasanSlug                 - Relasi ke Kawasan.slug (untuk URL)
 * @property {number} harga                       - Harga dalam Rupiah (integer)
 * @property {string} lokasiDetail                - Deskripsi lokasi spesifik (mis. "Cluster X, BSD City")
 * @property {SpesifikasiProperti} [spesifikasi]  - Spesifikasi fisik properti
 * @property {string[]} [fiturUnggulan]           - Daftar poin keunggulan properti
 * @property {string[]} [bonusInterior]           - Daftar bonus interior / perabotan
 * @property {{ lat: number, lng: number }} [koordinat] - Koordinat GPS spesifik properti
 * @property {string} [tautanMaps]                - Tautan/URL Google Maps
 * @property {string[]} galeri                    - Array URL gambar
 * @property {'tersedia'|'terjual'|'proses'} status - Status ketersediaan
 * @property {string} [developerNama]             - Nama developer (hanya segmen primary)
 * @property {string} [pemilikNama]               - Nama pemilik (hanya segmen secondary)
 * @property {string} deskripsi                   - Deskripsi properti (ID)
 * @property {string} deskripsiEn                 - Deskripsi properti (EN)
 * @property {string} [brosurUrl]                 - URL Cloudinary PDF Brosur
 * @property {boolean} [featured]                 - Tampil di section featured homepage
 */

/**
 * @typedef {Object} Artikel
 * @property {string} id
 * @property {string} slug
 * @property {string} judul
 * @property {string} judulEn
 * @property {string} ringkasan
 * @property {string} ringkasanEn
 * @property {string} konten
 * @property {string} kontenEn
 * @property {string} thumbnail
 * @property {string} tanggalPublish
 * @property {string[]} [tagKawasan]
 * @property {string[]} [tags]
 */

/**
 * @typedef {Object} Testimoni
 * @property {string} id
 * @property {string} namaKlien
 * @property {string} [fotoKlien]
 * @property {string} kawasanSlug
 * @property {string} komentar
 * @property {string} komentarEn
 * @property {number} rating
 * @property {string} tanggal
 */

/**
 * @typedef {Object} PreferensiLead
 * @property {string} [kawasan]
 * @property {'rumah'|'ruko'|'kavling'|'apartemen'} [jenis]
 * @property {'primary'|'secondary'} [segmen]
 * @property {number} [budgetMax]
 */

/**
 * @typedef {Object} LeadSubmission
 * @property {string} nama
 * @property {string} email
 * @property {string} telepon
 * @property {string} [listingSlug]
 * @property {'brosur'|'konsultasi'|'booking-survey'|'kontak-umum'} jenisForm
 * @property {PreferensiLead} [preferensi]
 */

module.exports = {};
