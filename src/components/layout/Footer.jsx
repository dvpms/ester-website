// src/components/layout/Footer.jsx

import Link from "next/link";
import { HiMapPin, HiPhone } from "react-icons/hi2";
import { RiInstagramLine, RiFacebookLine } from "react-icons/ri";
import { id as text } from "@/i18n/id";
import Image from "next/image";
import { BsTiktok } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const QUICK_LINKS = [
  { label: text.nav.home, href: "/" },
  { label: text.nav.properties, href: "/properti" },
  { label: text.nav.area, href: "/kawasan/bsd-city" },
  { label: text.nav.blog, href: "/blog" },
  { label: text.nav.about, href: "/tentang" },
  { label: text.nav.contact, href: "/kontak" },
];

const KAWASAN_LINKS = [
  
  { label: "BSD City", href: "/kawasan/bsd-city" },
  { label: "Gading Serpong", href: "/kawasan/gading-serpong" },
  { label: "Alam Sutera", href: "/kawasan/alam-sutera" },
  { label: "Bintaro", href: "/kawasan/bintaro" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Kolom 1: Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/logo/landscape2.png"
                className="w-32 h-auto border-2 border-white/20 rounded-md"
                alt="Esther REMAX"
                width={120}
                height={40}
              />
              <span className="font-serif text-h3 text-white font-bold block">
                Esther REMAX
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              {text.footer.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Esther REMAX"
                className="p-2 rounded-btn bg-remax-blue text-white hover:bg-remax-red transition-all duration-150"
              >
                <RiInstagramLine className="text-lg" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Esther REMAX"
                className="p-2 rounded-btn bg-remax-blue text-white hover:bg-remax-red transition-all duration-150"
              >
                <BsTiktok className="text-lg" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-4">
              {text.footer.quickLinks}
            </h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kawasan */}
          <div>
            <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-4">
              Kawasan
            </h3>
            <ul className="flex flex-col gap-2">
              {KAWASAN_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-4">
              {text.footer.contact}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <HiMapPin className="shrink-0 text-white text-base mt-0.5" />
                <span>Tangerang Selatan, Banten, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MdEmail className="shrink-0 text-white text-base mt-0.5" />
                <a
                  href="mailto:esther@future.remax.co.id"
                  className="text-white/80 hover:text-white transition-colors ml-1"
                >
                  esther@future.remax.co.id
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <HiPhone className="shrink-0 text-white text-base" />
                <a
                  href="https://wa.me/628XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  +62 8XX-XXXX-XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60 text-center sm:text-left">
            {text.footer.copyright}
          </p>
          <p className="text-xs text-white/60 text-center sm:text-right max-w-sm">
            {text.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
