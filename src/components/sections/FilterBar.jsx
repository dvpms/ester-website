'use client';

// src/components/sections/FilterBar.jsx

import { useState } from 'react';
import { HiAdjustmentsHorizontal, HiArrowPath, HiChevronDown } from 'react-icons/hi2';
import { id as textId } from '@/i18n/id';
import { en as textEn } from '@/i18n/en';

/** @typedef {{ kawasan: string, jenis: string, segmen: string, transaksi: string }} Filters */

export function FilterBar({ filters, onFilterChange, onReset, kawasanList, lang = 'id' }) {
  const [isOpen, setIsOpen] = useState(false);
  const text = lang === 'en' ? textEn : textId;

  const selectBaseClass = [
    'w-full px-3 py-2.5 text-sm font-sans bg-white',
    'border border-neutral-600 rounded-btn text-neutral-900',
    'hover:border-remax-red focus:outline-none focus:ring-2 focus:ring-remax-red focus:border-remax-red',
    'transition-all duration-150 cursor-pointer appearance-none',
    'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23737373\' stroke-width=\'2\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.75rem_center] bg-[length:14px]',
    'pr-10',
  ].join(' ');

  const hasActiveFilter = Object.values(filters).some(Boolean);

  return (
    <div className="bg-white/95 border-b border-border-c shadow-filter sticky top-[72px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between gap-2 text-sm font-semibold text-remax-blue font-sans cursor-pointer focus:outline-none"
          aria-expanded={isOpen}
          aria-controls="filter-content"
        >
          <div className="flex items-center gap-2">
            <HiAdjustmentsHorizontal className="text-remax-red text-base" />
            <span>Filter Properti</span>
          </div>
          <HiChevronDown className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <div 
          id="filter-content"
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
              <div>
                <label htmlFor="filter-kawasan" className="sr-only">{text.filter.allArea}</label>
                <select id="filter-kawasan" value={filters.kawasan} onChange={(e) => onFilterChange('kawasan', e.target.value)} className={selectBaseClass}>
                  <option value="">{text.filter.allArea}</option>
                  {kawasanList.map((k) => <option key={k.id} value={k.id}>{k.nama}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="filter-jenis" className="sr-only">{text.filter.allType}</label>
                <select id="filter-jenis" value={filters.jenis} onChange={(e) => onFilterChange('jenis', e.target.value)} className={selectBaseClass}>
                  <option value="">{text.filter.allType}</option>
                  {Object.entries(text.filter.type).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="filter-segmen" className="sr-only">{text.filter.allSegment}</label>
                <select id="filter-segmen" value={filters.segmen} onChange={(e) => onFilterChange('segmen', e.target.value)} className={selectBaseClass}>
                  <option value="">{text.filter.allSegment}</option>
                  {Object.entries(text.filter.segment).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="filter-transaksi" className="sr-only">{text.filter.allTransaction}</label>
                <select id="filter-transaksi" value={filters.transaksi} onChange={(e) => onFilterChange('transaksi', e.target.value)} className={selectBaseClass}>
                  <option value="">{text.filter.allTransaction}</option>
                  {Object.entries(text.filter.transaction).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>
            </div>

            {hasActiveFilter && (
              <button
                onClick={onReset}
                className="flex items-center justify-center lg:justify-start gap-1.5 text-sm text-neutral-600 hover:text-remax-red font-sans transition-colors shrink-0 px-2 py-2.5 mt-2 lg:mt-0"
                aria-label="Reset semua filter"
              >
                <HiArrowPath className="text-sm" />
                {text.filter.reset}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
