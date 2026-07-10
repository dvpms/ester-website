// src/components/cards/CardListing.jsx

import Image from 'next/image';
import Link from 'next/link';
import { BiBed, BiMapPin } from 'react-icons/bi';
import { MdOutlineBathtub, MdOutlineSquareFoot } from 'react-icons/md';
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
    slug, nama, namaEn, segmen, jenisProperti,
    harga, lokasiDetail, spesifikasi, galeri, status, transaksi,
  } = listing;

  const displayName = lang === 'en' ? namaEn : nama;
  const coverImage = galeri?.[0] ?? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
  const jenisLabel = text.filter.type[jenisProperti] ?? jenisProperti;
  const transaksiLabel = text.filter.transaction[transaksi] ?? transaksi;

  return (
    <article className="group relative bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col">
      <Link
        href={`/properti/${slug}`}
        className="relative block overflow-hidden aspect-video shrink-0 focus-visible:outline-2 focus-visible:outline-remax-red"
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
        <div className="absolute top-3 left-3">
          <Badge variant={status}>{text.filter.status[status]}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-remax-blue/80 text-white text-xs font-semibold px-2.5 py-1 rounded-sm font-sans">
            {transaksiLabel}
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-card gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={segmen}>{segmen === 'primary' ? 'Primary' : 'Secondary'}</Badge>
          <span className="text-xs text-neutral-600 font-sans capitalize">{jenisLabel}</span>
        </div>

        <Link
          href={`/properti/${slug}`}
          className="block font-sans text-h3 font-bold text-remax-blue hover:text-remax-red transition-colors duration-150 leading-tight focus-visible:outline-none focus-visible:underline"
        >
          {displayName}
        </Link>

        <div className="flex items-start gap-1.5 text-sm text-neutral-600">
          <BiMapPin className="shrink-0 mt-0.5 text-remax-red text-sm" />
          <span className="line-clamp-1">{lokasiDetail}</span>
        </div>

        {spesifikasi && (
          <div className="flex items-center gap-4 text-xs text-neutral-600 font-sans pt-1 border-t border-border-c">
            {spesifikasi.lt && (
              <span className="flex items-center gap-1">
                <MdOutlineSquareFoot className="text-neutral-600 text-sm" />
                {spesifikasi.lt} m²
              </span>
            )}
            {spesifikasi.kamarTidur && (
              <span className="flex items-center gap-1">
                <BiBed className="text-neutral-600 text-sm" />
                {spesifikasi.kamarTidur} KT
              </span>
            )}
            {spesifikasi.kamarMandi && (
              <span className="flex items-center gap-1">
                <MdOutlineBathtub className="text-neutral-600 text-sm" />
                {spesifikasi.kamarMandi} KM
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border-c">
          <p className="font-sans font-bold text-remax-red text-h3">
            {formatHarga(harga)}
            {transaksi === 'disewakan' && (
              <span className="text-xs text-neutral-600 font-normal ml-1">/thn</span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
