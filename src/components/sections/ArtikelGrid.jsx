// src/components/sections/ArtikelGrid.jsx
// Responsive grid wrapper untuk CardArtikel.
// Server Component.

import { CardArtikel } from '@/components/cards/CardArtikel';

import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';

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
        <h2 className="font-serif text-h2 text-remax-blue mb-8">{title}</h2>
      )}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artikelList.map((artikel) => (
          <StaggerItem key={artikel.id}>
            <CardArtikel artikel={artikel} lang={lang} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
