'use client';

// src/components/admin/listings/ListingTable.jsx
// Komponen tabel daftar properti admin dengan quick actions & brochure curator trigger

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatHarga } from '@/lib/utils';
import { toggleFeaturedListing, updateListingStatus, deleteListing } from '@/app/actions/listingActions';
import { toast, showConfirmDialog, showErrorAlert } from '@/lib/swal';
import {
  HiPencilSquare,
  HiTrash,
  HiStar,
  HiArrowTopRightOnSquare,
  HiDocumentText,
  HiPhoto,
} from 'react-icons/hi2';

export function ListingTable({ listings = [] }) {
  const router = useRouter();
  const [items, setItems] = useState(listings);
  const [loadingId, setLoadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Sinkronkan jika data listings dari server berubah
  useEffect(() => {
    setItems(listings);
  }, [listings]);

  const handleToggleFeatured = async (id) => {
    try {
      setLoadingId(id);
      const res = await toggleFeaturedListing(id);
      if (res.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, featured: res.featured } : item))
        );
        toast.fire({
          icon: 'success',
          title: res.featured ? 'Ditambahkan ke Rekomendasi' : 'Dihapus dari Rekomendasi',
        });
      } else {
        showErrorAlert('Gagal Mengubah Rekomendasi', res.error);
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoadingId(id);
      const res = await updateListingStatus(id, newStatus);
      if (res.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: res.status } : item))
        );
        toast.fire({
          icon: 'success',
          title: `Status diubah menjadi: ${res.status}`,
        });
      } else {
        showErrorAlert('Gagal Mengubah Status', res.error);
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id, nama) => {
    const isConfirmed = await showConfirmDialog({
      title: 'Hapus Properti?',
      text: `Apakah Anda yakin ingin menghapus "${nama}"? Data akan terhapus secara permanen.`,
      confirmText: 'Ya, Hapus',
      cancelText: 'Batal',
      isDanger: true,
    });

    if (!isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await deleteListing(id);
      if (res.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.fire({
          icon: 'success',
          title: 'Properti berhasil dihapus',
        });
        router.refresh();
      } else {
        showErrorAlert('Gagal Menghapus Properti', res.error);
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white border border-border-c rounded-card p-12 text-center shadow-card font-sans">
        <div className="w-12 h-12 rounded-full bg-blue-tint text-remax-blue mx-auto flex items-center justify-center text-xl mb-3">
          <HiPhoto />
        </div>
        <h3 className="text-sm font-bold text-neutral-900 font-serif">Tidak Ada Properti Ditemukan</h3>
        <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto">
          Coba sesuaikan kata kunci pencarian atau tambahkan listing properti baru melalui tombol di atas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-c rounded-card shadow-card overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-900">
          <thead className="text-[11px] uppercase bg-neutral-100 text-neutral-600 border-b border-border-c font-semibold">
            <tr>
              <th className="py-3.5 px-4 w-12 text-center">⭐</th>
              <th className="py-3.5 px-4">Properti</th>
              <th className="py-3.5 px-4">Kawasan & Tipe</th>
              <th className="py-3.5 px-4">Harga</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Brosur</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-c">
            {items.map((item) => {
              const isLoading = loadingId === item.id || deletingId === item.id;

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-neutral-100/40 transition-colors ${
                    isLoading ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  {/* Star / Featured Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      title={item.featured ? 'Hapus dari Featured' : 'Jadikan Featured'}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        item.featured
                          ? 'text-amber-500 hover:text-amber-600 bg-amber-50'
                          : 'text-neutral-600/40 hover:text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <HiStar className="text-base" />
                    </button>
                  </td>

                  {/* Property Info + Cover Image */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-btn overflow-hidden bg-neutral-100 shrink-0 border border-border-c relative">
                        {item.gambarUtama ? (
                          <Image
                            src={item.gambarUtama}
                            alt={item.nama}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-600">
                            <HiPhoto className="text-xl" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <Link
                          href={`/admin/properti/${item.id}/edit`}
                          className="font-bold text-neutral-900 hover:text-remax-blue transition-colors truncate max-w-xs sm:max-w-sm block"
                        >
                          {item.nama}
                        </Link>
                        <span className="text-[11px] text-neutral-600 truncate max-w-xs mt-0.5">
                          {item.lokasiDetail || item.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Area & Type */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-neutral-900">
                        {item.kawasan?.nama || item.kawasanSlug}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-tint text-remax-blue capitalize font-medium">
                          {item.jenisProperti}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 capitalize font-medium border border-border-c">
                          {item.segmen}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-bold text-neutral-900 whitespace-nowrap">
                    {formatHarga(Number(item.harga))}
                  </td>

                  {/* Status Dropdown Quick-Select */}
                  <td className="py-3.5 px-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`text-[11px] font-semibold py-1 px-2.5 rounded-full border cursor-pointer capitalize focus:outline-none transition-colors ${
                        item.status === 'tersedia'
                          ? 'bg-emerald-50 text-success border-emerald-200'
                          : item.status === 'terjual'
                          ? 'bg-red-tint text-remax-red border-red-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="tersedia">Tersedia</option>
                      <option value="proses">Proses</option>
                      <option value="terjual">Terjual</option>
                    </select>
                  </td>

                  {/* Brochure Status Indicator */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {item.brosurUrl ? (
                      <a
                        href={item.brosurUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        title="Buka brosur siap cetak di tab baru"
                      >
                        <HiDocumentText className="text-sm" />
                        <span>Siap Cetak</span>
                        <HiArrowTopRightOnSquare className="text-[10px]" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] text-neutral-400 bg-neutral-100/60 border border-border-c">
                        Belum Dibuat
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        href={`/properti/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-btn hover:bg-neutral-100 transition-colors"
                        title="Lihat di Web Publik"
                      >
                        <HiArrowTopRightOnSquare className="text-sm" />
                      </Link>
                      <Link
                        href={`/admin/properti/${item.id}/edit`}
                        className="p-1.5 text-remax-blue hover:text-blue-800 rounded-btn hover:bg-blue-tint transition-colors"
                        title="Edit Properti"
                      >
                        <HiPencilSquare className="text-sm" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.nama)}
                        className="p-1.5 text-remax-red hover:text-red-700 rounded-btn hover:bg-red-tint transition-colors"
                        title="Hapus Properti"
                      >
                        <HiTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
