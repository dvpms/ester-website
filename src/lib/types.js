// @ts-check
// src/lib/types.js
//
// File ini murni untuk dokumentasi tipe via JSDoc.
// Import di komponen menggunakan: /** @type {import('../lib/types').Kawasan} */
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
 * @typedef {Object} Listing
 * Merepresentasikan satu properti yang dijual/disewakan oleh Esther.
 *
 * @property {string} id                          - Identifier unik listing
 * @property {string} slug                        - URL-friendly identifier listing
 * @property {string} nama                        - Nama listing/proyek (ID)
 * @property {string} namaEn                      - Nama listing/proyek (EN)
 * @property {'primary'|'secondary'} segmen       - primary = developer baru, secondary = pemilik langsung
 * @property {'rumah'|'ruko'|'kavling'|'apartemen'} jenisProperti - Jenis properti
 * @property {'dijual'|'disewakan'} transaksi     - Jenis transaksi
 * @property {string} kawasanId                   - Relasi ke Kawasan.id
 * @property {string} kawasanSlug                 - Relasi ke Kawasan.slug (untuk URL)
 * @property {number} harga                       - Harga dalam Rupiah (integer)
 * @property {string} lokasiDetail                - Deskripsi lokasi spesifik (mis. "Cluster X, BSD City")
 * @property {Object} spesifikasi                 - Spesifikasi fisik properti
 * @property {number} [spesifikasi.lt]            - Luas tanah dalam m²
 * @property {number} [spesifikasi.lb]            - Luas bangunan dalam m²
 * @property {number} [spesifikasi.kamarTidur]    - Jumlah kamar tidur
 * @property {number} [spesifikasi.kamarMandi]    - Jumlah kamar mandi
 * @property {string[]} galeri                    - Array URL gambar WebP (rasio 4:3)
 * @property {'tersedia'|'terjual'|'proses'} status - Status ketersediaan
 * @property {string} [developerNama]             - Nama developer (hanya segmen primary)
 * @property {string} [pemilikNama]               - Nama pemilik (hanya segmen secondary)
 * @property {string} deskripsi                   - Deskripsi properti (ID)
 * @property {string} deskripsiEn                 - Deskripsi properti (EN)
 * @property {boolean} [featured]                 - Jika true, tampil di section featured homepage
 */

/**
 * @typedef {Object} Artikel
 * Merepresentasikan satu konten artikel blog untuk SEO organik.
 *
 * @property {string} id                          - Identifier unik artikel
 * @property {string} slug                        - URL-friendly identifier artikel
 * @property {string} judul                       - Judul artikel (ID)
 * @property {string} judulEn                     - Judul artikel (EN)
 * @property {string} ringkasan                   - Ringkasan max 200 karakter (ID) — untuk meta description & card
 * @property {string} ringkasanEn                 - Ringkasan max 200 karakter (EN)
 * @property {string} konten                      - Konten artikel full dalam Markdown (ID)
 * @property {string} kontenEn                    - Konten artikel full dalam Markdown (EN)
 * @property {string} thumbnail                   - URL gambar thumbnail WebP (rasio 16:9)
 * @property {string} tanggalPublish              - Tanggal publish dalam ISO date string (mis. "2026-07-01")
 * @property {string[]} [tagKawasan]              - Slug kawasan terkait untuk internal linking SEO
 * @property {string[]} [tags]                    - Tag topik umum artikel
 */

/**
 * @typedef {Object} Testimoni
 * Merepresentasikan satu ulasan/testimoni dari klien Esther.
 *
 * @property {string} id                          - Identifier unik testimoni
 * @property {string} namaKlien                   - Nama lengkap klien
 * @property {string} [fotoKlien]                 - URL foto avatar klien (rasio 1:1, WebP)
 * @property {string} kawasanSlug                 - Kawasan properti yang dibeli/disewa
 * @property {string} komentar                    - Isi testimoni max 300 karakter (ID)
 * @property {string} komentarEn                  - Isi testimoni max 300 karakter (EN)
 * @property {number} rating                      - Rating 1–5 bintang
 * @property {string} tanggal                     - Tanggal testimoni dalam ISO date string
 */

/**
 * @typedef {Object} PreferensiLead
 * Sub-objek preferensi properti dari form lead submission.
 *
 * @property {string} [kawasan]                   - Kawasan yang diminati
 * @property {'rumah'|'ruko'|'kavling'|'apartemen'} [jenis] - Jenis properti yang diminati
 * @property {'primary'|'secondary'} [segmen]     - Segmen yang diminati
 * @property {number} [budgetMax]                 - Budget maksimum dalam Rupiah
 */

/**
 * @typedef {Object} LeadSubmission
 * Data yang dikirim saat user mengisi form kontak/konsultasi.
 *
 * @property {string} nama                        - Nama lengkap calon klien
 * @property {string} email                       - Alamat email
 * @property {string} telepon                     - Nomor telepon (format bebas)
 * @property {string} [listingSlug]               - Slug listing yang ditanyakan (opsional)
 * @property {'brosur'|'konsultasi'|'booking-survey'|'kontak-umum'} jenisForm - Sumber form
 * @property {PreferensiLead} [preferensi]        - Preferensi properti (opsional)
 */

// File ini tidak mengekspor nilai runtime — hanya digunakan untuk type checking via JSDoc.
module.exports = {};
