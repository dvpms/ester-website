// src/components/sections/CTABand.jsx
// Banner pendorong konversi sebelum footer.
// Variant 'whatsapp': langsung ke WA | Variant 'form': ke halaman kontak.
// Server Component.

import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628XXXXXXXXXX';

/**
 * @param {{
 *   variant?: 'whatsapp'|'form',
 *   lang?: 'id'|'en',
 *   customHeadline?: string,
 *   customSub?: string,
 * }} props
 */
export function CTABand({
  variant = 'whatsapp',
  lang = 'id',
  customHeadline,
  customSub,
}) {
  const text = lang === 'en' ? textEn : textId;

  const headline = customHeadline ?? (
    lang === 'en'
      ? 'Ready to Find Your Dream Property?'
      : 'Siap Menemukan Properti Impian Anda?'
  );

  const sub = customSub ?? (
    lang === 'en'
      ? 'Consult for free with Esther — no obligations.'
      : 'Konsultasi gratis bersama Esther — tanpa syarat apapun.'
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'en'
      ? 'Hello Esther, I want a free property consultation.'
      : 'Halo Esther, saya ingin konsultasi properti gratis.'
  )}`;

  return (
    <section
      className="relative bg-brand-gold overflow-hidden py-16"
      aria-label="Call to action"
    >
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-navy/10 rounded-full" />
        <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-brand-navy/8 rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="font-serif text-h1 font-bold text-brand-navy mb-4">
          {headline}
        </h2>

        {/* Sub */}
        <p className="font-sans text-body text-brand-navy/70 mb-10 max-w-xl mx-auto">
          {sub}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {variant === 'whatsapp' ? (
            <>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-brand-navy text-neutral-50 font-semibold font-sans px-8 py-4 rounded-btn hover:bg-brand-navy-light hover:scale-105 transition-all duration-200 shadow-card-hover"
              >
                <MessageCircle size={20} />
                {text.cta.whatsapp}
              </a>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2.5 bg-transparent text-brand-navy font-semibold font-sans px-8 py-4 rounded-btn border-2 border-brand-navy hover:bg-brand-navy hover:text-neutral-50 transition-all duration-200"
              >
                <Phone size={20} />
                {text.cta.consult}
              </Link>
            </>
          ) : (
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2.5 bg-brand-navy text-neutral-50 font-semibold font-sans px-8 py-4 rounded-btn hover:bg-brand-navy-light hover:scale-105 transition-all duration-200 shadow-card-hover"
            >
              {text.cta.consult}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
