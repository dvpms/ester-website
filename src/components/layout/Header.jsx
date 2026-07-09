'use client';

// src/components/layout/Header.jsx
// Sticky header dengan language toggle (ID/EN) dan mobile hamburger menu.
// Language preference disimpan di localStorage.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

/** Daftar nav links — path harus konsisten dengan sitemap di Project Spec */
const NAV_LINKS = [
  { key: 'home',       href: '/' },
  { key: 'properties', href: '/properti' },
  { key: 'area',       href: '/kawasan/bsd-city' },
  { key: 'blog',       href: '/blog' },
  { key: 'about',      href: '/tentang' },
  { key: 'contact',    href: '/kontak' },
];

/**
 * @param {{ lang?: 'id'|'en', onLangChange?: (lang: 'id'|'en') => void }} props
 */
export function Header({ lang: langProp, onLangChange }) {
  const [lang, setLang] = useState(langProp || 'id');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const text = lang === 'en' ? textEn : textId;

  // Ambil preferensi bahasa dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem('ester-lang');
    if (saved === 'id' || saved === 'en') {
      setLang(saved);
      onLangChange?.(saved);
    }
  }, [onLangChange]);

  // Shrink header saat scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu saat resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function toggleLang() {
    const next = lang === 'id' ? 'en' : 'id';
    setLang(next);
    localStorage.setItem('ester-lang', next);
    onLangChange?.(next);
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        isScrolled
          ? 'bg-brand-navy/95 backdrop-blur-sm shadow-filter py-3'
          : 'bg-brand-navy py-5',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex flex-col leading-none focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2 rounded-sm"
            aria-label="Esther Property — Beranda"
          >
            <span className="font-serif text-h3 text-brand-gold font-bold tracking-wide">
              Esther
            </span>
            <span className="font-sans text-xs text-neutral-300 tracking-widest uppercase">
              Property
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi utama">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="font-sans text-sm text-neutral-300 hover:text-brand-gold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2 rounded-sm"
              >
                {text.nav[key]}
              </Link>
            ))}
          </nav>

          {/* ── Desktop: CTA + Lang Toggle ────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label={`Ganti bahasa ke ${lang === 'id' ? 'English' : 'Bahasa Indonesia'}`}
              className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-brand-gold transition-colors px-2 py-1 rounded-sm focus-visible:outline-2 focus-visible:outline-brand-gold"
            >
              <Globe size={14} />
              <span className="font-semibold">{lang.toUpperCase()}</span>
            </button>

            <Link
              href="https://wa.me/628XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-brand-navy text-sm font-semibold px-5 py-2 rounded-btn hover:brightness-110 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
            >
              {text.cta.consult}
            </Link>
          </div>

          {/* ── Mobile: Lang + Hamburger ──────────────────────── */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label="Toggle bahasa"
              className="text-neutral-300 hover:text-brand-gold transition-colors p-1"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMenuOpen}
              className="text-neutral-300 hover:text-brand-gold transition-colors p-1 focus-visible:outline-2 focus-visible:outline-brand-gold rounded-sm"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown Menu ──────────────────────────────── */}
        {isMenuOpen && (
          <nav
            className="md:hidden mt-4 pb-4 border-t border-brand-navy-light"
            aria-label="Navigasi mobile"
          >
            <ul className="flex flex-col gap-1 pt-4">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 font-sans text-sm text-neutral-300 hover:text-brand-gold hover:bg-brand-navy-light rounded-btn transition-all duration-150"
                  >
                    {text.nav[key]}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="https://wa.me/628XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-brand-gold text-brand-navy text-sm font-semibold px-5 py-3 rounded-btn hover:brightness-110 transition-all"
                >
                  {text.cta.consult}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
