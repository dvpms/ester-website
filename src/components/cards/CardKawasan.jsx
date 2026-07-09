// src/components/cards/CardKawasan.jsx
// Card kawasan dengan hero image background, overlay gradient, hover scale.
// Server Component.

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

/**
 * @param {{
 *   kawasan: import('@/lib/types').Kawasan,
 *   lang?: 'id'|'en',
 * }} props
 */
export function CardKawasan({ kawasan, lang = 'id' }) {
  const text = lang === 'en' ? textEn : textId;
  const { slug, nama, namaEn, fotoHero, fasilitasUnggulan, fasilitasUnggulanEn } = kawasan;

  const displayName = lang === 'en' ? namaEn : nama;
  const fasilitasList = lang === 'en' ? fasilitasUnggulanEn : fasilitasUnggulan;

  return (
    <article className="group relative rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      <Link
        href={`/kawasan/${slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
        aria-label={`Jelajahi kawasan ${displayName}`}
      >
        {/* ── Hero Image ──────────────────────────────────── */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={fotoHero}
            alt={`Foto kawasan ${displayName}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay gradient dari bawah */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />

          {/* ── Konten di atas image ─────────────────────── */}
          <div className="absolute inset-0 flex flex-col justify-end p-spacing-card">
            {/* Nama kawasan */}
            <h3 className="font-serif text-h3 font-bold text-neutral-50 mb-2 group-hover:text-brand-gold transition-colors duration-200">
              {displayName}
            </h3>

            {/* Fasilitas unggulan (max 3) */}
            <ul className="flex flex-col gap-1 mb-3">
              {fasilitasList.slice(0, 3).map((fasilitas) => (
                <li key={fasilitas} className="flex items-center gap-1.5 text-xs text-neutral-200 font-sans">
                  <span className="w-1 h-1 rounded-full bg-brand-gold shrink-0" />
                  {fasilitas}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold font-sans group-hover:gap-2.5 transition-all duration-200">
              {text.cta.more}
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
