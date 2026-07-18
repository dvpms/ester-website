// src/components/sections/TestimoniGrid.jsx

import { HiStar } from 'react-icons/hi2';
import { formatTanggal } from '@/lib/utils';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <HiStar
          key={i}
          className={i < rating ? 'text-remax-red' : 'text-neutral-600'}
        />
      ))}
    </div>
  );
}

import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';

export function TestimoniGrid({ testimonials, lang = 'id', title }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="w-full">
      {title && <h2 className="font-serif text-h2 text-remax-blue mb-8">{title}</h2>}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimoni) => {
          const komentar = lang === 'en' ? testimoni.komentarEn : testimoni.komentar;
          const tanggal = formatTanggal(testimoni.tanggal, lang);

          return (
            <StaggerItem key={testimoni.id}>
              <article className="bg-white rounded-card shadow-card p-card flex flex-col gap-4 border border-border-c h-full">
                <StarRating rating={testimoni.rating} />
                <blockquote className="font-sans text-sm text-neutral-900 leading-relaxed flex-1 italic">
                  &ldquo;{komentar}&rdquo;
                </blockquote>
                <footer className="flex items-center gap-3 pt-3 border-t border-border-c">
                  {testimoni.fotoKlien ? (
                    <img src={testimoni.fotoKlien} alt={`Foto ${testimoni.namaKlien}`} className="w-10 h-10 rounded-full object-cover shrink-0" width={40} height={40} loading="lazy" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-tint flex items-center justify-center shrink-0">
                      <span className="text-remax-red font-bold text-sm font-sans">{testimoni.namaKlien.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-sans text-sm font-bold text-remax-blue">{testimoni.namaKlien}</p>
                    <p className="font-sans text-xs text-neutral-600">{tanggal}</p>
                  </div>
                </footer>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
