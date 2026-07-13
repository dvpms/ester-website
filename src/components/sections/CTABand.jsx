// src/components/sections/CTABand.jsx

import Link from 'next/link';
import { RiWhatsappLine } from 'react-icons/ri';
import { HiPhone } from 'react-icons/hi2';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';
import { profile } from '@/data/profile';


export function CTABand({ variant = 'whatsapp', lang = 'id', customHeadline, customSub }) {
  const text = lang === 'en' ? textEn : textId;

  const headline = customHeadline ?? (lang === 'en' ? 'Ready to Find Your Dream Property?' : 'Siap Menemukan Properti Impian Anda?');
  const sub = customSub ?? (lang === 'en' ? 'Consult for free with Esther — no obligations.' : 'Konsultasi  bersama Esther — tanpa syarat apapun.');

  const whatsappUrl = `${profile.socials.whatsapp}?text=${encodeURIComponent(
    lang === 'en' ? 'Hello Esther, I want a free property consultation.' : 'Halo Esther, saya ingin konsultasi properti .'
  )}`;

  return (
    <section className="relative bg-remax-blue overflow-hidden py-16" aria-label="Call to action">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-white/5 rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-h1 font-bold text-white mb-4">{headline}</h2>
        <p className="font-sans text-body text-white/80 mb-10 max-w-xl mx-auto">{sub}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {variant === 'whatsapp' ? (
            <>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-remax-red text-white font-semibold font-sans px-8 py-4 rounded-btn hover:brightness-110 hover:scale-105 transition-all duration-200 shadow-card-hover"
              >
                <RiWhatsappLine className="text-xl" />
                {text.cta.whatsapp}
              </a>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2.5 bg-transparent text-white font-semibold font-sans px-8 py-4 rounded-btn border-2 border-white/50 hover:bg-white hover:text-remax-blue transition-all duration-200"
              >
                <HiPhone className="text-lg" />
                {text.cta.consult}
              </Link>
            </>
          ) : (
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2.5 bg-remax-red text-white font-semibold font-sans px-8 py-4 rounded-btn hover:brightness-110 hover:scale-105 transition-all duration-200 shadow-card-hover"
            >
              {text.cta.consult}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
