'use client';

// src/app/admin/(auth)/login/page.js
// Halaman login khusus admin Esther Property — Selaras dengan tema globals.css

import { useActionState, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { authenticate } from '@/app/actions/authActions';
import { HiLockClosed, HiEye, HiEyeSlash, HiArrowLeft, HiExclamationCircle } from 'react-icons/hi2';
import { MdEmail } from 'react-icons/md';

export default function AdminLoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-remax-blue transition-colors mb-6 font-medium"
        >
          <HiArrowLeft className="text-sm" />
          Kembali ke Website
        </Link>
        
        {/* Brand Logo Container */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white border border-border-c rounded-card shadow-card inline-flex items-center justify-center">
            <Image
              src="/logo/landscape2.png"
              alt="Esther REMAX"
              width={140}
              height={44}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Esther Property CMS
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans">
          Portal Administrasi & Manajemen Konten
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white border border-border-c py-8 px-6 sm:px-10 rounded-card shadow-card-hover">
        <form action={formAction} className="space-y-5">
          {/* Error Alert */}
          {errorMessage?.error && (
            <div className="flex items-center gap-3 p-3.5 bg-red-tint border border-red-200 rounded-btn text-error text-xs sm:text-sm font-sans animate-fadeIn">
              <HiExclamationCircle className="text-lg text-remax-red shrink-0" />
              <span>{errorMessage.error}</span>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-neutral-900 mb-1.5 font-sans">
              Email Administrator
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600">
                <MdEmail className="text-lg" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@estherproperti.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-c rounded-btn text-neutral-900 text-sm placeholder-neutral-600/50 focus:outline-none focus:border-remax-blue focus:ring-2 focus:ring-blue-tint transition-all font-sans"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-neutral-900 mb-1.5 font-sans">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600">
                <HiLockClosed className="text-lg" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-2.5 bg-white border border-border-c rounded-btn text-neutral-900 text-sm placeholder-neutral-600/50 focus:outline-none focus:border-remax-blue focus:ring-2 focus:ring-blue-tint transition-all font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              >
                {showPassword ? <HiEyeSlash className="text-lg" /> : <HiEye className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3 px-4 bg-remax-blue hover:bg-blue-800 disabled:opacity-50 text-white font-sans font-semibold text-sm rounded-btn shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memeriksa Akses...</span>
              </>
            ) : (
              <span>Masuk ke Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border-c text-center">
          <p className="text-[11px] text-neutral-600 font-sans">
            Area terbatas & terlindungi. Semua aktivitas login tercatat secara aman.
          </p>
        </div>
      </div>
    </div>
  );
}
