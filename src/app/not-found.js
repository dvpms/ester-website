// src/app/not-found.js — Halaman 404 Global
// Ditampilkan saat route tidak ditemukan.

import Link from 'next/link';
import { HiHome, HiMagnifyingGlass } from 'react-icons/hi2';

export const metadata = {
  title: '404 — Halaman Tidak Ditemukan | Esther REMAX',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        {/* 404 number */}
        <p className="font-serif text-[8rem] font-bold text-remax-red/20 leading-none select-none">
          404
        </p>

        <h1 className="font-serif text-h2 text-remax-blue mt-4 mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="font-sans text-body text-neutral-600 mb-8">
          Properti atau halaman yang Anda cari tidak tersedia. Mungkin sudah terjual atau URL-nya berubah.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-remax-red text-white font-semibold font-sans px-6 py-3 rounded-btn hover:brightness-110 transition-all"
          >
            <HiHome className="text-base" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/properti"
            className="inline-flex items-center gap-2 bg-white text-remax-blue font-semibold font-sans px-6 py-3 rounded-btn border border-neutral-600 hover:border-remax-red transition-all"
          >
            <HiMagnifyingGlass className="text-base" />
            Cari Properti
          </Link>
        </div>
      </div>
    </div>
  );
}
