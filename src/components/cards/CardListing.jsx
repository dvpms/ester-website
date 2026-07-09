// src/components/cards/CardListing.jsx
// Card properti dengan gambar, badge segmen+status, harga terformat, spesifikasi.
// Server Component — tidak ada state/interaktivitas di sini.

import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatHarga } from '@/lib/utils';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

/**
 * @param {{
 *   listing: import('@/lib/types').Listing,
 *   lang?: 'id'|'en',
 * }} props
 */
export function CardListing({ listing, lang = 'id' }) {
  const text = lang === 'en' ? textEn : textId;

  const {
    slug,
    nama,
    namaEn,
    segmen,
    jenisProperti,
    harga,
    lokasiDetail,
    spesifikasi,
    galeri,
    status,
    transaksi,
  } = listing;

  const displayName = lang === 'en' ? namaEn : nama;
  const coverImage = galeri?.[0] ?? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';

  const jenisLabel = text.filter.type[jenisProperti] ?? jenisProperti;
  const transaksiLabel = text.filter.transaction[transaksi] ?? transaksi;

  return (
    <article className="group relative bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col">
      {/* ── Gambar ─────────────────────────────────────────── */}
      <Link
        href={`/properti/${slug}`}
        className="relative block overflow-hidden aspect-[4/3] shrink-0 focus-visible:outline-2 focus-visible:outline-brand-gold"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={coverImage}
          alt={`Foto ${displayName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge status di atas gambar */}
        <div className="absolute top-3 left-3">
          <Badge variant={status}>
            {text.filter.status[status]}
          </Badge>
        </div>

        {/* Badge transaksi */}
        <div className="absolute top-3 right-3">
          <span className="bg-brand-navy/80 text-neutral-50 text-xs font-semibold px-2.5 py-1 rounded-sm font-sans">
            {transaksiLabel}
          </span>
        </div>
      </Link>

      {/* ── Konten ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-spacing-card gap-3">
        {/* Badge segmen + jenis */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={segmen}>{segmen === 'primary' ? 'Primary' : 'Secondary'}</Badge>
          <span className="text-xs text-neutral-500 font-sans capitalize">{jenisLabel}</span>
        </div>

        {/* Nama properti */}
        <Link
          href={`/properti/${slug}`}
          className="block font-sans text-h3 font-bold text-brand-navy hover:text-brand-gold transition-colors duration-150 leading-tight focus-visible:outline-none focus-visible:underline"
        >
          {displayName}
        </Link>

        {/* Lokasi */}
        <div className="flex items-start gap-1.5 text-sm text-neutral-500">
          <MapPin size={14} className="shrink-0 mt-0.5 text-brand-gold" />
          <span className="line-clamp-1">{lokasiDetail}</span>
        </div>

        {/* Spesifikasi */}
        {spesifikasi && (
          <div className="flex items-center gap-4 text-xs text-neutral-500 font-sans pt-1 border-t border-neutral-100">
            {spesifikasi.lt && (
              <span className="flex items-center gap-1">
                <Maximize2 size={12} className="text-neutral-400" />
                {spesifikasi.lt} m²
              </span>
            )}
            {spesifikasi.kamarTidur && (
              <span className="flex items-center gap-1">
                <BedDouble size={12} className="text-neutral-400" />
                {spesifikasi.kamarTidur} KT
              </span>
            )}
            {spesifikasi.kamarMandi && (
              <span className="flex items-center gap-1">
                <Bath size={12} className="text-neutral-400" />
                {spesifikasi.kamarMandi} KM
              </span>
            )}
          </div>
        )}

        {/* Harga + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
          <div>
            <p className="text-xs text-neutral-500 font-sans mb-0.5">{text.common.price}</p>
            <p className="font-sans font-bold text-brand-gold text-h3">
              {formatHarga(harga)}
              {transaksi === 'disewakan' && (
                <span className="text-xs text-neutral-500 font-normal">/thn</span>
              )}
            </p>
          </div>
          <Link
            href={`/properti/${slug}`}
            className="text-xs font-semibold text-brand-gold hover:text-brand-navy border border-brand-gold hover:bg-brand-gold-light px-3 py-1.5 rounded-btn transition-all duration-150 font-sans"
          >
            {text.common.readMore}
          </Link>
        </div>
      </div>
    </article>
  );
}
