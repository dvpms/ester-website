// src/components/sections/TestimoniGrid.jsx
// Grid testimoni klien dengan rating bintang.
// Server Component — data di-pass sebagai props.

import { Star } from 'lucide-react';
import { formatTanggal } from '@/lib/utils';

/**
 * Render bintang rating 1–5.
 * @param {{ rating: number }} props
 */
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-brand-gold fill-brand-gold' : 'text-neutral-300'}
        />
      ))}
    </div>
  );
}

/**
 * @param {{
 *   testimonials: import('@/lib/types').Testimoni[],
 *   lang?: 'id'|'en',
 *   title?: string,
 * }} props
 */
export function TestimoniGrid({ testimonials, lang = 'id', title }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="w-full">
      {title && (
        <h2 className="font-serif text-h2 text-brand-navy mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimoni) => {
          const komentar = lang === 'en' ? testimoni.komentarEn : testimoni.komentar;
          const tanggal = formatTanggal(testimoni.tanggal, lang);

          return (
            <article
              key={testimoni.id}
              className="bg-white rounded-card shadow-card p-spacing-card flex flex-col gap-4 border border-neutral-100"
            >
              {/* Rating */}
              <StarRating rating={testimoni.rating} />

              {/* Komentar */}
              <blockquote className="font-sans text-sm text-neutral-700 leading-relaxed flex-1 italic">
                &ldquo;{komentar}&rdquo;
              </blockquote>

              {/* Profil klien */}
              <footer className="flex items-center gap-3 pt-3 border-t border-neutral-100">
                {testimoni.fotoKlien ? (
                  <img
                    src={testimoni.fotoKlien}
                    alt={`Foto ${testimoni.namaKlien}`}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-gold-light flex items-center justify-center shrink-0">
                    <span className="text-brand-gold font-bold text-sm font-sans">
                      {testimoni.namaKlien.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-sans text-sm font-bold text-brand-navy">{testimoni.namaKlien}</p>
                  <p className="font-sans text-xs text-neutral-400">{tanggal}</p>
                </div>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}
