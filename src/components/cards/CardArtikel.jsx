// src/components/cards/CardArtikel.jsx

import Image from 'next/image';
import Link from 'next/link';
import { HiCalendar, HiArrowRight } from 'react-icons/hi2';
import { formatTanggal } from '@/lib/utils';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

/**
 * @param {{
 *   artikel: import('@/lib/types').Artikel,
 *   lang?: 'id'|'en',
 * }} props
 */
export function CardArtikel({ artikel, lang = 'id' }) {
  const text = lang === 'en' ? textEn : textId;
  const { slug, judul, judulEn, ringkasan, ringkasanEn, thumbnail, tanggalPublish, tags } = artikel;

  const displayJudul = lang === 'en' ? judulEn : judul;
  const displayRingkasan = lang === 'en' ? ringkasanEn : ringkasan;
  const tanggalFormatted = formatTanggal(tanggalPublish, lang);

  return (
    <article className="group bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col">
      <Link
        href={`/blog/${slug}`}
        className="relative block aspect-video overflow-hidden shrink-0 focus-visible:outline-2 focus-visible:outline-remax-red"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={thumbnail}
          alt={`Thumbnail artikel: ${displayJudul}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1 p-card gap-3">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold text-remax-blue bg-blue-tint px-2.5 py-0.5 rounded-sm font-sans capitalize"
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${slug}`}
          className="block font-sans text-base font-bold text-remax-blue hover:text-remax-red transition-colors duration-150 leading-snug line-clamp-2 focus-visible:outline-none focus-visible:underline"
        >
          {displayJudul}
        </Link>

        <p className="text-sm text-neutral-600 font-sans leading-relaxed line-clamp-2 flex-1">
          {displayRingkasan}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-border-c">
          <span className="flex items-center gap-1.5 text-xs text-neutral-600 font-sans">
            <HiCalendar className="text-neutral-600 text-sm" />
            {tanggalFormatted}
          </span>
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-remax-red hover:gap-2 transition-all duration-150 font-sans"
          >
            {text.common.readMore}
            <HiArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </article>
  );
}
