// src/components/sections/KawasanGrid.jsx
// Responsive grid wrapper untuk CardKawasan.
// Server Component.

import { CardKawasan } from '@/components/cards/CardKawasan';

/**
 * @param {{
 *   kawasanList: import('@/lib/types').Kawasan[],
 *   lang?: 'id'|'en',
 *   title?: string,
 * }} props
 */
export function KawasanGrid({ kawasanList, lang = 'id', title }) {
  if (!kawasanList || kawasanList.length === 0) return null;

  return (
    <section className="w-full">
      {title && (
        <h2 className="font-serif text-h2 text-brand-navy mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kawasanList.map((kawasan) => (
          <CardKawasan key={kawasan.id} kawasan={kawasan} lang={lang} />
        ))}
      </div>
    </section>
  );
}
