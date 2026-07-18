"use client";

// src/components/layout/Header.jsx

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiBars3, HiXMark, HiGlobeAlt } from "react-icons/hi2";
import { id as textId } from "@/i18n/id";
import { en as textEn } from "@/i18n/en";
import Image from "next/image";
import { profile } from "@/data/profile";

const NAV_LINKS = [
  { key: "properties", href: "/properti" },
  { key: "area", href: "/kawasan" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/tentang" },
  { key: "contact", href: "/kontak" },
];

export function Header({ lang: langProp, onLangChange }) {
  const [lang, setLang] = useState(langProp || "id");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const text = lang === "en" ? textEn : textId;

  useEffect(() => {
    const saved = localStorage.getItem("ester-lang");
    if (saved === "id" || saved === "en") {
      setLang(saved);
      onLangChange?.(saved);
    }
  }, [onLangChange]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleLang() {
    const next = lang === "id" ? "en" : "id";
    setLang(next);
    localStorage.setItem("ester-lang", next);
    onLangChange?.(next);
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 rounded-b-4xl shadow-md ${
        isScrolled ? "bg-white/80 backdrop-blur-md py-4" : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex w-fit justify-center items-center leading-none focus-visible:outline-2 focus-visible:outline-remax-red focus-visible:outline-offset-2 rounded-sm"
            aria-label="Esther REMAX — Beranda"
          >
            <Image
              src="/logo/potrait.png"
              alt="Logo Esther REMAX"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />

            <span className="font-serif text-h3 text-remax-blue font-bold tracking-wide">
              Esther REMAX
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Navigasi utama"
          >
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="font-sans text-sm text-neutral-600 hover:text-remax-red transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-remax-red focus-visible:outline-offset-2 rounded-sm"
              >
                {text.nav[key]}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label={`Ganti bahasa ke ${lang === "id" ? "English" : "Bahasa Indonesia"}`}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-remax-red transition-colors px-2 py-1 rounded-sm focus-visible:outline-2 focus-visible:outline-remax-red"
            >
              <HiGlobeAlt className="text-base" />
              <span className="font-semibold">{lang.toUpperCase()}</span>
            </button>

            <Link
              href={profile.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-remax-red text-white text-sm font-semibold px-5 py-2 rounded-btn hover:brightness-110 transition-all duration-200 shadow-card hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-remax-red focus-visible:outline-offset-2"
            >
              {text.cta.consult}
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label="Toggle bahasa"
              className="text-neutral-600 hover:text-remax-red transition-colors p-1"
            >
              <HiGlobeAlt className="text-lg" />
            </button>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMenuOpen}
              className="text-neutral-600 hover:text-remax-red transition-colors p-1 focus-visible:outline-2 focus-visible:outline-remax-red rounded-sm"
            >
              {isMenuOpen ? (
                <HiXMark className="text-xl" />
              ) : (
                <HiBars3 className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav
            className="md:hidden mt-4 pb-4 border-t border-blue-tint"
            aria-label="Navigasi mobile"
          >
            <ul className="flex flex-col gap-1 pt-4">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 font-sans text-sm text-neutral-600 hover:text-remax-red hover:bg-blue-tint rounded-btn transition-all duration-150"
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
                  className="block w-full text-center bg-remax-red text-white shadow-card hover:shadow-card-hover text-sm font-semibold px-5 py-3 rounded-btn hover:brightness-110 transition-all"
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
