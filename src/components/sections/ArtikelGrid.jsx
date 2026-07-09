// src/components/sections/ArtikelGrid.jsx
// Responsive grid wrapper untuk CardArtikel.
// Server Component.

import { CardArtikel } from '@/components/cards/CardArtikel';

/**
 * @param {{
 *   artikelList: import('@/lib/types').Artikel[],
 *   lang?: 'id'|'en',
 *   title?: string,
 * }} props
 */
export function ArtikelGrid({ artikelList, lang = 'id', title }) {
  if (!artikelList || artikelList.length === 0) return null;

  return (
    <section className="w-full">
      {title && (
        <h2 className="font-serif text-h2 text-brand-navy mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artikelList.map((artikel) => (
          <CardArtikel key={artikel.id} artikel={artikel} lang={lang} />
        ))}
      </div>
    </section>
  );
}
