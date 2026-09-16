'use client';

// src/components/admin/listings/ListingManager.jsx
// Client interactive manager untuk daftar properti, filter, pencarian, pagination, dan modal kurasi brosur

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ListingFilterBar } from './ListingFilterBar';
import { ListingTable } from './ListingTable';
import { BrochureCuratorModal } from './BrochureCuratorModal';
import {
  HiPlus,
  HiBuildingOffice2,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';

export function ListingManager({ initialListings = [], kawasanList = [] }) {
  const [listings, setListings] = useState(initialListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [kawasanFilter, setKawasanFilter] = useState('');
  const [segmenFilter, setSegmenFilter] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal State
  const [selectedListingForBrochure, setSelectedListingForBrochure] = useState(null);
  const [isCuratorOpen, setIsCuratorOpen] = useState(false);

  // Reset page to 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, kawasanFilter, segmenFilter, pageSize]);

  // Filter & Search Logic
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = item.nama?.toLowerCase().includes(q);
        const matchSlug = item.slug?.toLowerCase().includes(q);
        const matchLocation = item.lokasiDetail?.toLowerCase().includes(q);
        if (!matchName && !matchSlug && !matchLocation) return false;
      }

      // Status filter
      if (statusFilter && item.status !== statusFilter) {
        return false;
      }

      // Kawasan filter
      if (kawasanFilter && item.kawasanId !== kawasanFilter) {
        return false;
      }

      // Segmen filter
      if (segmenFilter && item.segmen !== segmenFilter) {
        return false;
      }

      return true;
    });
  }, [listings, searchQuery, statusFilter, kawasanFilter, segmenFilter]);

  // Pagination Calculations
  const totalItems = filteredListings.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedListings = useMemo(() => {
    return filteredListings.slice(startIndex, endIndex);
  }, [filteredListings, startIndex, endIndex]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setKawasanFilter('');
    setSegmenFilter('');
    setCurrentPage(1);
  };

  const handleOpenBrochureCurator = (listing) => {
    setSelectedListingForBrochure(listing);
    setIsCuratorOpen(true);
  };

  const handleBrochureGenerated = (brosurUrl, fotoBrosur) => {
    if (!selectedListingForBrochure) return;
    setListings((prev) =>
      prev.map((item) =>
        item.id === selectedListingForBrochure.id
          ? { ...item, brosurUrl, fotoBrosur }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-c">
        <div>
          <div className="flex items-center gap-2">
            <HiBuildingOffice2 className="text-xl text-remax-blue" />
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900">
              Listing Properti
            </h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Total {listings.length} properti terdaftar.
          </p>
        </div>

        <Link
          href="/admin/properti/baru"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-remax-blue hover:bg-blue-800 text-white rounded-btn text-xs font-semibold shadow-sm transition-all"
        >
          <HiPlus className="text-base" />
          <span>Tambah Properti Baru</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <ListingFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        kawasanFilter={kawasanFilter}
        onKawasanChange={setKawasanFilter}
        segmenFilter={segmenFilter}
        onSegmenChange={setSegmenFilter}
        kawasanList={kawasanList}
        onResetFilters={handleResetFilters}
      />

      {/* Listings Table with Paginated Data */}
      <ListingTable
        listings={paginatedListings}
        onOpenBrochureCurator={handleOpenBrochureCurator}
      />

      {/* Pagination Controls */}
      {totalItems > 0 && (
        <div className="bg-white border border-border-c rounded-card p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          {/* Item Count Info */}
          <div className="text-neutral-600">
            Menampilkan <span className="font-semibold text-neutral-900">{totalItems > 0 ? startIndex + 1 : 0}</span> - <span className="font-semibold text-neutral-900">{endIndex}</span> dari <span className="font-semibold text-neutral-900">{totalItems}</span> properti
          </div>

          {/* Page Buttons & Size Selector */}
          <div className="flex items-center gap-4">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 hidden sm:inline">Tampilkan:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="py-1.5 px-2.5 bg-neutral-100 border border-border-c rounded-btn text-xs text-neutral-900 font-medium focus:outline-none focus:border-remax-blue"
              >
                <option value={10}>10 / halaman</option>
                <option value={20}>20 / halaman</option>
                <option value={50}>50 / halaman</option>
              </select>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={safePage <= 1}
                className="p-1.5 rounded-btn border border-border-c text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                title="Halaman Sebelumnya"
              >
                <HiChevronLeft className="text-base" />
              </button>

              {/* Numbered page indicators */}
              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Only show current page, 1, last page, and adjacent pages if many pages
                  if (
                    totalPages > 7 &&
                    pageNum !== 1 &&
                    pageNum !== totalPages &&
                    Math.abs(pageNum - safePage) > 1
                  ) {
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return <span key={pageNum} className="px-1 text-neutral-400">...</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-[30px] h-[30px] rounded-btn text-xs font-semibold transition-colors cursor-pointer ${
                        pageNum === safePage
                          ? 'bg-remax-blue text-white shadow-2xs'
                          : 'text-neutral-700 hover:bg-neutral-100 border border-transparent hover:border-border-c'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={safePage >= totalPages}
                className="p-1.5 rounded-btn border border-border-c text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                title="Halaman Berikutnya"
              >
                <HiChevronRight className="text-base" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Brochure Curator Modal */}
      {selectedListingForBrochure && (
        <BrochureCuratorModal
          listing={selectedListingForBrochure}
          isOpen={isCuratorOpen}
          onClose={() => {
            setIsCuratorOpen(false);
            setSelectedListingForBrochure(null);
          }}
          onBrochureGenerated={handleBrochureGenerated}
        />
      )}
    </div>
  );
}
