// src/components/sections/TrustStrip.jsx
// Strip kepercayaan: statistik Esther + logo bank KPR partner.
// Server Component.

import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

/** Bank KPR partner — nama dan inisial untuk placeholder visual */
const KPR_PARTNERS = [
  { nama: 'BCA', warna: 'bg-blue-600' },
  { nama: 'BNI', warna: 'bg-orange-500' },
  { nama: 'Mandiri', warna: 'bg-yellow-500' },
  { nama: 'BTN', warna: 'bg-green-600' },
  { nama: 'BRI', warna: 'bg-blue-700' },
];

/**
 * @param {{ lang?: 'id'|'en' }} props
 */
export function TrustStrip({ lang = 'id' }) {
  const text = lang === 'en' ? textEn : textId;

  const stats = [
    { value: '10+', label: text.common.yearsExperience },
    { value: '200+', label: text.common.propertiesSold },
    { value: '500+', label: text.common.happyClients },
    { value: '4', label: text.common.kawasanCovered },
  ];

  return (
    <section className="bg-remax-blue py-16" aria-label="Statistik kepercayaan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Stats ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <span className="font-serif text-display font-bold text-white">{value}</span>
              <span className="font-sans text-sm text-neutral-600 leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* ── Divider ──────────────────────────────────────── */}
        <div className="border-t border-blue-tint mb-10" />

        {/* ── Bank Partner ─────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6">
          <p className="font-sans text-xs text-neutral-600 uppercase tracking-widest">
            {lang === 'en' ? 'KPR Partner Banks' : 'Bank KPR Partner'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {KPR_PARTNERS.map(({ nama, warna }) => (
              <div
                key={nama}
                className={`${warna} text-white font-bold font-sans text-sm px-5 py-2.5 rounded-btn opacity-80 hover:opacity-100 transition-opacity`}
                aria-label={`Partner bank KPR: ${nama}`}
              >
                {nama}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
