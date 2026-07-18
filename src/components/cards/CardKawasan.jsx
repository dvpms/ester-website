// src/components/cards/CardKawasan.jsx

import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

import { InteractiveCard } from '@/components/animations/InteractiveCard';

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
    <InteractiveCard elementType="article" className="group relative bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
      <Link
        href={`/kawasan/${slug}`}
        className="relative block aspect-video overflow-hidden shrink-0 focus-visible:outline-2 focus-visible:outline-remax-red"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={fotoHero}
          alt={`Foto kawasan ${displayName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-col flex-1 p-card gap-3">
        <Link
          href={`/kawasan/${slug}`}
          className="block font-sans text-h3 font-bold text-remax-blue hover:text-remax-red transition-colors duration-150 leading-tight focus-visible:outline-none focus-visible:underline"
        >
          {displayName}
        </Link>
        
        <ul className="flex flex-col gap-1.5 flex-1 mt-1">
          {fasilitasList.slice(0, 3).map((fasilitas) => (
            <li key={fasilitas} className="flex items-center gap-2 text-sm text-neutral-600 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-remax-red shrink-0" />
              {fasilitas}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-3 border-t border-border-c">
          <Link
            href={`/kawasan/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-remax-blue hover:text-remax-red font-sans group-hover:gap-2.5 transition-all duration-200"
          >
            {text.cta.more}
            <HiArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </InteractiveCard>
  );
}
