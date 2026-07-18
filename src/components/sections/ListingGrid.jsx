// src/components/sections/ListingGrid.jsx
// Responsive CSS grid wrapper untuk CardListing.
// Server Component.

import { CardListing } from '@/components/cards/CardListing';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';

/**
 * @param {{
 *   listings: import('@/lib/types').Listing[],
 *   lang?: 'id'|'en',
 *   title?: string,
 * }} props
 */
export function ListingGrid({ listings, lang = 'id', title }) {
  const text = lang === 'en' ? textEn : textId;

  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-600 font-sans">
        {text.common.noResult}
      </div>
    );
  }

  return (
    <section className="w-full">
      {title && (
        <h2 className="font-serif text-h2 text-remax-blue mb-8">{title}</h2>
      )}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <StaggerItem key={listing.id}>
            <CardListing listing={listing} lang={lang} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
