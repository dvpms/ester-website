'use client';

// src/components/admin/AdminHeader.jsx
// Header bar admin panel dengan profile info dan mobile toggle — Selaras dengan tema globals.css

import { HiBars3, HiUserCircle } from 'react-icons/hi2';

export function AdminHeader({ onOpenSidebar, user }) {
  return (
    <header className="h-16 bg-white border-b border-border-c px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-sans shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-btn text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          aria-label="Buka Menu Navigasi"
        >
          <HiBars3 className="text-2xl" />
        </button>

        <div className="flex flex-col">
          <span className="text-[11px] text-neutral-600 hidden sm:block font-medium">Panel Administrasi</span>
          <h2 className="text-sm sm:text-base font-bold font-serif text-neutral-900 leading-tight">
            Esther Property CMS
          </h2>
        </div>
      </div>

      {/* Right: User Profile Pill */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-border-c">
          <HiUserCircle className="text-xl text-remax-blue" />
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-neutral-900 leading-none">
              {user?.name || 'Administrator'}
            </span>
            <span className="text-[10px] text-remax-blue font-semibold capitalize mt-0.5">
              {user?.role || 'Superadmin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
