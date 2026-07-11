// src/components/sections/HeroHome.jsx

import Link from "next/link";
import Image from "next/image";
import { RiWhatsappLine } from "react-icons/ri";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { id as textId } from "@/i18n/id";
import { en as textEn } from "@/i18n/en";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "628XXXXXXXXXX";
const WHATSAPP_MESSAGE = "Halo Esther, saya ingin konsultasi properti gratis.";

export function HeroHome({ lang = "id" }) {
  const text = lang === "en" ? textEn : textId;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-remax-blue"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1728721529009-bfaab6fcc8e6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Properti mewah di Tangerang Selatan"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-[2rem] md:text-[2.5rem] lg:text-display font-bold text-white leading-tight mb-6">
          {text.hero.headline}
          <span className="block mt-1">Tangerang Selatan</span>
        </h1>

        <p className="font-sans text-xs md:text-body text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
          {text.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-remax-red text-white font-semibold font-sans px-8 py-4 rounded-btn shadow-card-hover hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200 text-base"
          >
            <RiWhatsappLine className="text-xl" />
            {text.cta.consult}
          </a>

          <Link
            href="/properti"
            className="inline-flex items-center gap-2.5 bg-transparent text-white font-semibold font-sans px-8 py-4 rounded-btn border-2 border-white/30 hover:border-remax-red hover:text-remax-red transition-all duration-200 text-base"
          >
            <HiMagnifyingGlass className="text-xl" />
            {lang === "en" ? "Browse Properties" : "Jelajah Properti"}
          </Link>
        </div>
      </div>
    </section>
  );
}
