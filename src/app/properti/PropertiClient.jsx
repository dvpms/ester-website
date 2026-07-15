'use client';

// src/app/properti/PropertiClient.jsx
// Client component untuk halaman /properti — menangani filter state interaktif.

import { useState, useMemo } from 'react';
import { FilterBar } from '@/components/sections/FilterBar';
import { ListingGrid } from '@/components/sections/ListingGrid';
import { CTABand } from '@/components/sections/CTABand';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { listings } from '@/data/listings';
import { kawasanList } from '@/data/kawasan';

const INITIAL_FILTERS = { kawasan: '', jenis: '', segmen: '', transaksi: '', harga: '', urutkan: '' };

const BREADCRUMB_ITEMS = [
  { label: 'Beranda', href: '/' },
  { label: 'Properti', href: '/properti' },
];

function matchPriceFilter(hargaProperti, filterHarga) {
  if (!filterHarga) return true;
  if (filterHarga === 'under1m') return hargaProperti < 1000000000;
  if (filterHarga === '1m-3m') return hargaProperti >= 1000000000 && hargaProperti < 3000000000;
  if (filterHarga === '3m-5m') return hargaProperti >= 3000000000 && hargaProperti < 5000000000;
  if (filterHarga === 'over5m') return hargaProperti >= 5000000000;
  return true;
}

export function PropertiClient() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setFilters(INITIAL_FILTERS);
  }

  // Filter listing berdasarkan state aktif — hanya re-compute saat filter berubah
  const filteredListings = useMemo(() => {
    let result = listings.filter((listing) => {
      if (filters.kawasan && listing.kawasanId !== filters.kawasan) return false;
      if (filters.jenis && listing.jenisProperti !== filters.jenis) return false;
      if (filters.segmen && listing.segmen !== filters.segmen) return false;
      if (filters.transaksi && listing.transaksi !== filters.transaksi) return false;
      
      if (!matchPriceFilter(listing.harga, filters.harga)) return false;
      return true;
    });

    // Urutkan (Secara bawaan data.listings dianggap 'terbaru' di atas)
    if (filters.urutkan === 'termurah') {
      result.sort((a, b) => a.harga - b.harga);
    } else if (filters.urutkan === 'termahal') {
      result.sort((a, b) => b.harga - a.harga);
    } else if (filters.urutkan === 'terlama') {
      result.reverse();
    }
    
    return result;
  }, [filters]);

  return (
    <>
      {/* FilterBar sticky di bawah header */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        kawasanList={kawasanList}
        lang="id"
      />

      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={BREADCRUMB_ITEMS} className="mb-6" />

          {/* Header hasil */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="font-serif text-h1 text-remax-blue">Semua Properti</h1>
              <p className="font-sans text-sm text-neutral-600 mt-1">
                {filteredListings.length} properti ditemukan
              </p>
            </div>
          </div>

          <ListingGrid listings={filteredListings} lang="id" />
        </div>
      </section>

      <CTABand variant="whatsapp" lang="id" />
    </>
  );
}
