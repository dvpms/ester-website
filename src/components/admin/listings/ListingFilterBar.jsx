'use client';

// src/components/admin/listings/ListingFilterBar.jsx
// Bar pencarian dan filter untuk halaman daftar properti admin

import { useState, useEffect } from 'react';
import { HiMagnifyingGlass, HiFunnel, HiXMark } from 'react-icons/hi2';

export function ListingFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  kawasanFilter,
  onKawasanChange,
  segmenFilter,
  onSegmenChange,
  jenisFilter,
  onJenisChange,
  kawasanList = [],
  onResetFilters,
}) {
  // Local state untuk input search agar typing tetap instant & mulus
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  // Sinkronisasi jika parent mengubah searchQuery (misal saat reset filter)
  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  // Debounce 350ms sebelum memanggil onSearchChange (menghemat request server & DB)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== (searchQuery || '')) {
        onSearchChange(localSearch);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [localSearch, searchQuery, onSearchChange]);

  const hasActiveFilters = Boolean(searchQuery || statusFilter || kawasanFilter || segmenFilter || jenisFilter);

  return (
    <div className="bg-white border border-border-c rounded-card p-4 shadow-card space-y-3 font-sans">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input dengan Debounce */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600">
            <HiMagnifyingGlass className="text-base" />
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Cari nama properti, lokasi, atau slug..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-100/60 border border-border-c rounded-btn text-xs text-neutral-900 placeholder-neutral-600/60 focus:outline-none focus:border-remax-blue focus:ring-1 focus:ring-remax-blue/20 transition-all"
          />
          {localSearch && (
            <button
              onClick={() => {
                setLocalSearch('');
                onSearchChange('');
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-600 hover:text-neutral-900"
              title="Hapus pencarian"
            >
              <HiXMark className="text-sm" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="py-2 px-3 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
          >
            <option value="">Semua Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="proses">Dalam Proses</option>
            <option value="terjual">Terjual</option>
          </select>

          {/* Jenis Properti Filter */}
          <select
            value={jenisFilter}
            onChange={(e) => onJenisChange(e.target.value)}
            className="py-2 px-3 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
          >
            <option value="">Semua Jenis</option>
            <option value="rumah">Rumah</option>
            <option value="ruko">Ruko / Rukan</option>
            <option value="kavling">Tanah Kavling</option>
            <option value="apartemen">Apartemen</option>
          </select>

          {/* Kawasan Filter */}
          <select
            value={kawasanFilter}
            onChange={(e) => onKawasanChange(e.target.value)}
            className="py-2 px-3 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
          >
            <option value="">Semua Kawasan</option>
            {kawasanList.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </select>

          {/* Segmen Filter */}
          <select
            value={segmenFilter}
            onChange={(e) => onSegmenChange(e.target.value)}
            className="py-2 px-3 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
          >
            <option value="">Semua Segmen</option>
            <option value="primary">Primary (Baru)</option>
            <option value="secondary">Secondary (Bekas)</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 py-2 px-3 text-xs text-remax-red hover:bg-red-tint rounded-btn font-medium transition-colors"
            >
              <HiXMark className="text-sm" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
