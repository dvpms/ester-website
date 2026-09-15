// src/app/admin/(dashboard)/page.js
// Halaman utama Dashboard Admin Esther Property CMS
// Selaras dengan tema dan design tokens globals.css

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatHarga } from '@/lib/utils';
import {
  HiBuildingOffice2,
  HiMapPin,
  HiDocumentText,
  HiChatBubbleBottomCenterText,
  HiPlus,
  HiArrowTopRightOnSquare,
} from 'react-icons/hi2';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Ambil metrik ringkasan dari database Neon
  const [
    totalListings,
    availableListings,
    soldListings,
    totalKawasan,
    totalArticles,
    totalTestimonials,
    recentListings,
  ] = await Promise.all([
    prisma.listing.count().catch(() => 0),
    prisma.listing.count({ where: { status: 'tersedia' } }).catch(() => 0),
    prisma.listing.count({ where: { status: 'terjual' } }).catch(() => 0),
    prisma.kawasan.count().catch(() => 0),
    prisma.artikel.count().catch(() => 0),
    prisma.testimoni.count().catch(() => 0),
    prisma.listing.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { kawasan: { select: { nama: true } } },
    }).catch(() => []),
  ]);

  const stats = [
    {
      title: 'Total Properti',
      value: totalListings,
      subtitle: `${availableListings} Tersedia, ${soldListings} Terjual`,
      icon: HiBuildingOffice2,
      iconBg: 'bg-blue-tint text-remax-blue border border-blue-200',
      href: '/admin/properti',
    },
    {
      title: 'Kawasan Hub',
      value: totalKawasan,
      subtitle: 'Area strategis aktif',
      icon: HiMapPin,
      iconBg: 'bg-emerald-50 text-success border border-emerald-200',
      href: '/admin/kawasan',
    },
    {
      title: 'Artikel Blog',
      value: totalArticles,
      subtitle: 'Konten edukasi & SEO',
      icon: HiDocumentText,
      iconBg: 'bg-red-tint text-remax-red border border-red-200',
      href: '/admin/artikel',
    },
    {
      title: 'Testimoni Klien',
      value: totalTestimonials,
      subtitle: 'Ulasan pembeli & penjual',
      icon: HiChatBubbleBottomCenterText,
      iconBg: 'bg-amber-50 text-amber-700 border border-amber-200',
      href: '/admin/testimoni',
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* ── Header & Quick Actions ───────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-c">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900">
            Ringkasan Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Selamat datang di portal pengelolaan konten Esther Property.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/properti"
            className="inline-flex items-center gap-2 px-4 py-2 bg-remax-blue hover:bg-blue-800 text-white rounded-btn text-xs font-semibold shadow-sm transition-all"
          >
            <HiPlus className="text-base" />
            <span>Kelola Properti</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-neutral-100 text-neutral-900 rounded-btn text-xs font-medium border border-border-c transition-colors shadow-sm"
          >
            <HiArrowTopRightOnSquare className="text-sm text-neutral-600" />
            <span>Lihat Website</span>
          </Link>
        </div>
      </div>

      {/* ── Stats Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white border border-border-c hover:border-remax-blue/40 p-5 rounded-card shadow-card hover:shadow-card-hover transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-btn ${stat.iconBg} flex items-center justify-center text-lg shadow-xs`}>
                  <Icon />
                </div>
                <span className="text-xs font-medium text-neutral-600 group-hover:text-remax-blue transition-colors">
                  Buka &rarr;
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-serif">
                {stat.value}
              </h2>
              <p className="text-xs font-semibold text-neutral-900 mt-1">
                {stat.title}
              </p>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                {stat.subtitle}
              </p>
            </Link>
          );
        })}
      </div>

      {/* ── Recent Listings Table ────────────────────────── */}
      <div className="bg-white border border-border-c rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold font-serif text-neutral-900">
              Listing Properti Terbaru
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5">
              5 properti terakhir yang terdaftar di database Neon
            </p>
          </div>
          <Link
            href="/admin/properti"
            className="text-xs text-remax-blue hover:text-blue-800 font-semibold"
          >
            Lihat Semua Properti &rarr;
          </Link>
        </div>

        {recentListings.length === 0 ? (
          <div className="text-center py-10 text-neutral-600 text-xs">
            Belum ada data properti di database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-900">
              <thead className="text-[11px] uppercase bg-neutral-100 text-neutral-600 border-b border-border-c font-semibold">
                <tr>
                  <th className="py-3 px-4">Nama Properti</th>
                  <th className="py-3 px-4">Kawasan</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-c">
                {recentListings.map((item) => {
                  const statusBadges = {
                    tersedia: 'bg-emerald-50 text-success border-emerald-200',
                    terjual: 'bg-red-tint text-remax-red border-red-200',
                    proses: 'bg-amber-50 text-amber-800 border-amber-200',
                  };

                  return (
                    <tr key={item.id} className="hover:bg-neutral-100/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-neutral-900">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-xs">{item.nama}</span>
                          {item.featured && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-tint text-remax-blue border border-blue-200 font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-600">
                        {item.kawasan?.nama || item.kawasanSlug}
                      </td>
                      <td className="py-3 px-4 font-medium text-neutral-900">
                        {formatHarga(Number(item.harga))}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${statusBadges[item.status] || 'bg-neutral-100 text-neutral-600 border-border-c'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/properti/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-remax-blue hover:text-blue-800 inline-flex items-center gap-1 text-[11px] font-medium"
                        >
                          <span>Lihat</span>
                          <HiArrowTopRightOnSquare className="text-xs" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
