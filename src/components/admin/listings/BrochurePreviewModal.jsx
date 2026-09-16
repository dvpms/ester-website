'use client';

// src/components/admin/listings/BrochurePreviewModal.jsx
// Modal pratinjau lembar brosur A4 (794px x 1123px) interaktif secara instan sebelum generate ke Cloudinary

import { useEffect, useRef } from 'react';
import { BrochureTemplate } from '@/components/brochure/BrochureTemplate';
import {
  HiXMark,
  HiEye,
  HiSparkles,
  HiArrowPath,
  HiPrinter,
} from 'react-icons/hi2';

export function BrochurePreviewModal({
  isOpen,
  onClose,
  listing,
  onGenerateBrochure,
  isGeneratingBrochure = false,
}) {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isGeneratingBrochure) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isGeneratingBrochure]);

  if (!isOpen || !listing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs transition-all animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isGeneratingBrochure) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-neutral-900 border border-neutral-700 w-full max-w-5xl h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100 font-sans"
      >
        {/* ── Top Header Bar ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950/90 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-remax-blue/20 text-remax-blue border border-remax-blue/40 flex items-center justify-center">
              <HiEye className="text-lg text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white font-serif tracking-tight">
                  Pratinjau Brosur Cetak A4
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full">
                  Live Preview Interaktif
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                {listing.judulBrosur || listing.nama || 'Brosur Properti'} • Sesuai format cetak 1:1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isGeneratingBrochure}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Tutup (Esc)"
            >
              <HiXMark className="text-xl" />
            </button>
          </div>
        </div>

        {/* ── Scrollable Preview Canvas ─────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-8 flex justify-center items-start bg-neutral-950/50">
          <div className="relative my-auto transition-transform origin-top flex flex-col items-center">
            {/* Visual Paper Sheet Wrapper */}
            <div className="bg-white rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-black/10 overflow-hidden">
              <BrochureTemplate listing={listing} />
            </div>
          </div>
        </div>

        {/* ── Bottom Action Footer ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 bg-neutral-950 border-t border-neutral-800 shrink-0 text-xs">
          <div className="text-neutral-400 text-center sm:text-left flex items-center gap-2">
            <HiPrinter className="text-base text-neutral-500 hidden sm:inline" />
            <span>
              Tampilan di atas adalah tata letak aktual yang akan dicetak pada berkas PDF / gambar Ultra-HD.
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isGeneratingBrochure}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-btn font-semibold transition-colors cursor-pointer"
            >
              Tutup Pratinjau
            </button>

            {onGenerateBrochure && (
              <button
                type="button"
                onClick={() => {
                  onGenerateBrochure();
                }}
                disabled={isGeneratingBrochure}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-remax-blue hover:bg-blue-800 disabled:opacity-50 text-white rounded-btn font-semibold shadow-sm transition-all cursor-pointer"
              >
                {isGeneratingBrochure ? (
                  <>
                    <HiArrowPath className="animate-spin text-base" />
                    <span>Memproses Brosur HD...</span>
                  </>
                ) : (
                  <>
                    <HiSparkles className="text-base text-amber-300" />
                    <span>Buat Brosur Siap Cetak Sekarang</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
