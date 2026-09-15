'use client';

// src/components/admin/AdminSidebar.jsx
// Navigasi sidebar admin panel Esther Property — Selaras dengan tema globals.css

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions/authActions';
import {
  HiHome,
  HiBuildingOffice2,
  HiMapPin,
  HiDocumentText,
  HiChatBubbleBottomCenterText,
  HiCog6Tooth,
  HiArrowTopRightOnSquare,
  HiArrowRightOnRectangle,
  HiXMark,
} from 'react-icons/hi2';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: HiHome, exact: true },
  { label: 'Listing Properti', href: '/admin/properti', icon: HiBuildingOffice2 },
  { label: 'Kawasan Hub', href: '/admin/kawasan', icon: HiMapPin },
  { label: 'Artikel Blog', href: '/admin/artikel', icon: HiDocumentText },
  { label: 'Testimoni Klien', href: '/admin/testimoni', icon: HiChatBubbleBottomCenterText },
  { label: 'Pengaturan Profil', href: '/admin/pengaturan', icon: HiCog6Tooth },
];

export function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const isLinkActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-border-c flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Close button */}
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-border-c bg-white">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image
                src="/logo/landscape2.png"
                alt="Esther REMAX"
                width={110}
                height={32}
                className="h-7 w-auto object-contain"
                priority
              />
              <span className="px-1.5 py-0.5 rounded text-[10px] font-sans font-bold bg-blue-tint text-remax-blue border border-blue-200 uppercase tracking-wider">
                CMS
              </span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden text-neutral-600 hover:text-neutral-900 p-1.5 rounded-btn hover:bg-neutral-100"
              aria-label="Tutup Menu"
            >
              <HiXMark className="text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 font-sans">
            <p className="px-3 text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-2">
              Menu Utama
            </p>
            {navItems.map((item) => {
              const active = isLinkActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-btn text-xs font-semibold transition-all ${
                    active
                      ? 'bg-remax-blue text-white shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <Icon className={`text-lg ${active ? 'text-white' : 'text-neutral-600'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border-c bg-neutral-100/40 space-y-1.5 font-sans">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 rounded-btn text-xs font-medium text-neutral-600 hover:bg-white hover:text-remax-blue border border-transparent hover:border-border-c transition-all"
          >
            <span className="flex items-center gap-2">
              <HiArrowTopRightOnSquare className="text-sm text-neutral-600" />
              Lihat Website Publik
            </span>
            <span className="text-[10px] bg-blue-tint text-remax-blue px-1.5 py-0.5 rounded font-semibold">
              Live
            </span>
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 rounded-btn text-xs font-medium text-remax-red hover:bg-red-tint transition-colors cursor-pointer"
            >
              <HiArrowRightOnRectangle className="text-base" />
              <span>Keluar (Logout)</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
