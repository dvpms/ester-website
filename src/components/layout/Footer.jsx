// src/components/layout/Footer.jsx
// Footer 3-kolom: brand | quick links | kontak.
// Server Component.

import Link from 'next/link';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { id as text } from '@/i18n/id';

const QUICK_LINKS = [
  { label: text.nav.home,       href: '/' },
  { label: text.nav.properties, href: '/properti' },
  { label: text.nav.area,       href: '/kawasan/bsd-city' },
  { label: text.nav.blog,       href: '/blog' },
  { label: text.nav.about,      href: '/tentang' },
  { label: text.nav.contact,    href: '/kontak' },
];

const KAWASAN_LINKS = [
  { label: 'BSD City',        href: '/kawasan/bsd-city' },
  { label: 'Gading Serpong',  href: '/kawasan/gading-serpong' },
  { label: 'Alam Sutera',     href: '/kawasan/alam-sutera' },
  { label: 'Bintaro',         href: '/kawasan/bintaro' },
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-neutral-300 font-sans">
      {/* ── Main Footer ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Kolom 1: Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-serif text-h3 text-brand-gold font-bold block">Esther</span>
              <span className="font-sans text-xs tracking-widest uppercase text-neutral-500">Property</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              {text.footer.tagline}
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Esther Property"
                className="p-2 rounded-btn bg-brand-navy-light text-neutral-400 hover:text-brand-gold hover:bg-brand-navy transition-all duration-150"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Esther Property"
                className="p-2 rounded-btn bg-brand-navy-light text-neutral-400 hover:text-brand-gold hover:bg-brand-navy transition-all duration-150"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="font-sans text-sm font-bold text-neutral-50 uppercase tracking-wider mb-4">
              {text.footer.quickLinks}
            </h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-400 hover:text-brand-gold transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kawasan */}
          <div>
            <h3 className="font-sans text-sm font-bold text-neutral-50 uppercase tracking-wider mb-4">
              Kawasan
            </h3>
            <ul className="flex flex-col gap-2">
              {KAWASAN_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-400 hover:text-brand-gold transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h3 className="font-sans text-sm font-bold text-neutral-50 uppercase tracking-wider mb-4">
              {text.footer.contact}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <MapPin size={16} className="shrink-0 text-brand-gold mt-0.5" />
                <span>Tangerang Selatan, Banten, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="shrink-0 text-brand-gold" />
                <a
                  href="https://wa.me/628XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-brand-gold transition-colors"
                >
                  +62 8XX-XXXX-XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────── */}
      <div className="border-t border-brand-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            {text.footer.copyright}
          </p>
          <p className="text-xs text-neutral-600 text-center sm:text-right max-w-sm">
            {text.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
