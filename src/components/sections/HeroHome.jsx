// src/components/sections/HeroHome.jsx
// Hero section homepage: headline Playfair Display, 2 CTA, background gradient.
// Server Component (animasi via CSS, bukan framer-motion agar tidak perlu 'use client').

import Link from 'next/link';
import { MessageCircle, Search } from 'lucide-react';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628XXXXXXXXXX';
const WHATSAPP_MESSAGE = 'Halo Esther, saya ingin konsultasi properti gratis.';

/**
 * @param {{ lang?: 'id'|'en' }} props
 */
export function HeroHome({ lang = 'id' }) {
  const text = lang === 'en' ? textEn : textId;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-navy"
      aria-label="Hero section"
    >
      {/* ── Decorative Background ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient blob kiri atas */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        {/* Gradient blob kanan bawah */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-gold/8 rounded-full blur-3xl" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #c9a84c 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Konten Utama ────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Badge atas */}
        <div className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-semibold px-4 py-2 rounded-full font-sans mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
          {text.hero.badge}
        </div>

        {/* Headline — Playfair Display */}
        <h1 className="font-serif text-display font-bold text-neutral-50 leading-tight mb-6">
          {text.hero.headline}
          <span className="block text-brand-gold mt-1">Tangerang Selatan</span>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-body text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
          {text.hero.subheadline}
        </p>

        {/* ── CTA Buttons ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* CTA 1: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-brand-gold text-brand-navy font-semibold font-sans px-8 py-4 rounded-btn shadow-card-hover hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200 text-base"
          >
            <MessageCircle size={20} />
            {text.cta.consult}
          </a>

          {/* CTA 2: Jelajah Properti */}
          <Link
            href="/properti"
            className="inline-flex items-center gap-2.5 bg-transparent text-neutral-50 font-semibold font-sans px-8 py-4 rounded-btn border-2 border-neutral-50/30 hover:border-brand-gold hover:text-brand-gold transition-all duration-200 text-base"
          >
            <Search size={20} />
            {lang === 'en' ? 'Browse Properties' : 'Jelajah Properti'}
          </Link>
        </div>

        {/* ── Stats cepat ──────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-10 border-t border-neutral-700">
          {[
            { value: '10+', label: text.common.yearsExperience },
            { value: '200+', label: text.common.propertiesSold },
            { value: '500+', label: text.common.happyClients },
            { value: '4', label: text.common.kawasanCovered },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-serif text-h2 font-bold text-brand-gold">{value}</span>
              <span className="font-sans text-xs text-neutral-400 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-neutral-600 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-brand-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
