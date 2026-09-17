'use client';

// src/components/admin/listings/ListingManager.jsx
// Client interactive manager untuk daftar properti dengan Server-Side & Database-Level Pagination

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ListingFilterBar } from './ListingFilterBar';
import { ListingTable } from './ListingTable';
import {
  HiPlus,
  HiBuildingOffice2,
  HiChevronLeft,
  HiChevronRight,
  HiArrowPath,
} from 'react-icons/hi2';

export function ListingManager({
  initialListings = [],
  pagination = { currentPage: 1, pageSize: 10, totalItems: 0, totalPages: 1 },
  kawasanList = [],
  currentFilters = { search: '', status: '', kawasan: '', segmen: '', jenis: '', page: 1, pageSize: 10 },
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Helper untuk navigasi URL dengan query string baru
  const updateQueryParams = (updates) => {
    const params = new URLSearchParams();

    const merged = {
      search: currentFilters.search,
      status: currentFilters.status,
      kawasan: currentFilters.kawasan,
      segmen: currentFilters.segmen,
      jenis: currentFilters.jenis,
      page: currentFilters.page,
      pageSize: currentFilters.pageSize,
      ...updates,
    };

    if (merged.search) params.set('search', merged.search);
    if (merged.status) params.set('status', merged.status);
    if (merged.kawasan) params.set('kawasan', merged.kawasan);
    if (merged.segmen) params.set('segmen', merged.segmen);
    if (merged.jenis) params.set('jenis', merged.jenis);
    if (merged.pageSize && merged.pageSize !== 10) params.set('pageSize', String(merged.pageSize));
    if (merged.page && merged.page > 1) params.set('page', String(merged.page));

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(targetUrl, { scroll: false });
    });
  };

  const handleSearchChange = (newSearch) => {
    updateQueryParams({ search: newSearch, page: 1 });
  };

  const handleStatusChange = (newStatus) => {
    updateQueryParams({ status: newStatus, page: 1 });
  };

  const handleKawasanChange = (newKawasan) => {
    updateQueryParams({ kawasan: newKawasan, page: 1 });
  };

  const handleSegmenChange = (newSegmen) => {
    updateQueryParams({ segmen: newSegmen, page: 1 });
  };

  const handleJenisChange = (newJenis) => {
    updateQueryParams({ jenis: newJenis, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateQueryParams({ page: newPage });
  };

  const handlePageSizeChange = (newSize) => {
    updateQueryParams({ pageSize: newSize, page: 1 });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const { currentPage, pageSize, totalItems, totalPages } = pagination;
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

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
            {isPending && (
              <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full animate-pulse">
                <HiArrowPath className="animate-spin text-remax-blue" /> Memuat data...
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Total {totalItems} properti terdaftar di database.
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

      {/* Filter Bar (dengan Debounce dan Navigasi Server) */}
      <ListingFilterBar
        searchQuery={currentFilters.search}
        onSearchChange={handleSearchChange}
        statusFilter={currentFilters.status}
        onStatusChange={handleStatusChange}
        kawasanFilter={currentFilters.kawasan}
        onKawasanChange={handleKawasanChange}
        segmenFilter={currentFilters.segmen}
        onSegmenChange={handleSegmenChange}
        jenisFilter={currentFilters.jenis}
        onJenisChange={handleJenisChange}
        kawasanList={kawasanList}
        onResetFilters={handleResetFilters}
      />

      {/* Listings Table */}
      <div className={`transition-opacity duration-200 ${isPending ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
        <ListingTable
          listings={initialListings}
        />
      </div>

      {/* Database-Level Pagination Controls */}
      {totalItems > 0 && (
        <div className="bg-white border border-border-c rounded-card p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          {/* Item Count Info */}
          <div className="text-neutral-600">
            Menampilkan <span className="font-semibold text-neutral-900">{startItem}</span> - <span className="font-semibold text-neutral-900">{endItem}</span> dari <span className="font-semibold text-neutral-900">{totalItems}</span> properti
          </div>

          {/* Page Buttons & Size Selector */}
          <div className="flex items-center gap-4">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 hidden sm:inline">Tampilkan:</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="py-1.5 px-2.5 bg-neutral-100 border border-border-c rounded-btn text-xs text-neutral-900 font-medium focus:outline-none focus:border-remax-blue cursor-pointer"
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
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isPending}
                className="p-1.5 rounded-btn border border-border-c text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                title="Halaman Sebelumnya"
              >
                <HiChevronLeft className="text-base" />
              </button>

              {/* Numbered page indicators */}
              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  if (
                    totalPages > 7 &&
                    pageNum !== 1 &&
                    pageNum !== totalPages &&
                    Math.abs(pageNum - currentPage) > 1
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
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isPending}
                      className={`min-w-[30px] h-[30px] rounded-btn text-xs font-semibold transition-colors cursor-pointer ${
                        pageNum === currentPage
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isPending}
                className="p-1.5 rounded-btn border border-border-c text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                title="Halaman Berikutnya"
              >
                <HiChevronRight className="text-base" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
