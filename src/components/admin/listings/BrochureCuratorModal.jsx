'use client';

// src/components/admin/listings/BrochureCuratorModal.jsx
// Modal pemilihan foto dan pembuatan lembar brosur cetak A4

import { useState } from 'react';
import Image from 'next/image';
import { generateCuratedBrochureAction } from '@/app/actions/brochureActions';
import { showWarningAlert, showSuccessAlert, showErrorAlert } from '@/lib/swal';
import {
  HiXMark,
  HiStar,
  HiCheckCircle,
  HiArrowTopRightOnSquare,
  HiSparkles,
  HiExclamationCircle,
} from 'react-icons/hi2';

export function BrochureCuratorModal({ listing, isOpen, onClose, onBrochureGenerated }) {
  const images = Array.isArray(listing?.galeri) ? listing.galeri : [];
  const defaultCover = listing?.gambarUtama || images[0] || '';
  const defaultInterior = Array.isArray(listing?.fotoBrosur) && listing.fotoBrosur.length > 0
    ? listing.fotoBrosur
    : images.filter((img) => img !== defaultCover).slice(0, 5);

  const [selectedCover, setSelectedCover] = useState(defaultCover);
  const [selectedInterior, setSelectedInterior] = useState(defaultInterior);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(listing?.brosurUrl || null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen || !listing) return null;

  const handleToggleInterior = (imgUrl) => {
    if (selectedInterior.includes(imgUrl)) {
      setSelectedInterior(selectedInterior.filter((url) => url !== imgUrl));
    } else {
      if (selectedInterior.length >= 5) {
        showWarningAlert('Batas Foto Tercapai', 'Maksimal 5 foto pendukung yang dapat dimasukkan ke dalam brosur.');
        return;
      }
      setSelectedInterior([...selectedInterior, imgUrl]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedCover) {
      showWarningAlert('Foto Sampul Belum Dipilih', 'Pilih 1 foto sampul terlebih dahulu.');
      return;
    }

    try {
      setIsGenerating(true);
      setErrorMessage(null);

      const res = await generateCuratedBrochureAction({
        listingId: listing.id,
        coverImage: selectedCover,
        interiorImages: selectedInterior,
      });

      if (res.success && res.brosurUrl) {
        setGeneratedUrl(res.brosurUrl);
        showSuccessAlert(
          'Brosur Berhasil Dibuat!',
          'Brosur siap cetak telah tersimpan dan siap diunduh atau dibagikan.'
        );
        if (onBrochureGenerated) {
          onBrochureGenerated(res.brosurUrl, selectedInterior);
        }
      } else {
        showErrorAlert('Gagal Membuat Brosur', res.error || 'Terjadi kendala saat memproses brosur.');
        setErrorMessage(res.error || 'Gagal membuat brosur');
      }
    } catch (err) {
      console.error(err);
      showErrorAlert('Kendala Sistem', err.message || 'Terjadi kesalahan sistem saat generasi brosur.');
      setErrorMessage(err.message || 'Terjadi kendala saat memproses brosur');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-2xs flex items-center justify-center p-4 font-sans animate-fadeIn">
      <div className="bg-white rounded-card border border-border-c shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-c bg-neutral-100/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-full bg-blue-tint text-remax-blue">
                <HiSparkles className="text-base" />
              </span>
              <h2 className="text-base sm:text-lg font-bold font-serif text-neutral-900">
                Pengaturan Brosur Cetak
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Properti: <strong className="text-neutral-900">{listing.nama}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-btn text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
          >
            <HiXMark className="text-xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {errorMessage && (
            <div className="flex items-center gap-2.5 p-3.5 bg-red-tint border border-red-200 rounded-btn text-xs text-error">
              <HiExclamationCircle className="text-base shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {generatedUrl && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-success font-medium">
                <HiCheckCircle className="text-xl shrink-0" />
                <span>Brosur berhasil dibuat dan siap diunduh atau dibagikan kepada klien.</span>
              </div>
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-success text-white rounded-btn text-xs font-semibold shadow-2xs hover:bg-emerald-800 transition-colors whitespace-nowrap"
              >
                <span>Lihat Lembar Brosur</span>
                <HiArrowTopRightOnSquare className="text-xs" />
              </a>
            </div>
          )}

          {/* Bagian 1: Pilih Foto Sampul */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                1. Foto Sampul Brosur (Pilih 1 Foto)
              </h3>
              <span className="text-[11px] text-neutral-500">
                Akan menjadi foto utama di bagian atas lembar brosur
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {images.map((imgUrl, i) => {
                const isSelected = selectedCover === imgUrl;
                return (
                  <div
                    key={`cover-${i}`}
                    onClick={() => setSelectedCover(imgUrl)}
                    className={`group relative aspect-square rounded-btn overflow-hidden border-2 cursor-pointer transition-all bg-neutral-100 ${
                      isSelected
                        ? 'border-remax-blue ring-2 ring-remax-blue/30 shadow-md scale-[1.02]'
                        : 'border-border-c hover:border-neutral-400'
                    }`}
                  >
                    <Image src={imgUrl} alt={`Pilihan sampul ${i + 1}`} fill className="object-cover" sizes="120px" />
                    {isSelected && (
                      <div className="absolute top-1 left-1 bg-remax-blue text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <HiStar className="text-amber-300 text-[10px]" />
                        <span>Sampul</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bagian 2: Pilih Foto Pendukung */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                2. Foto Pendukung / Ruangan ({selectedInterior.length}/5 Terpilih)
              </h3>
              <span className="text-[11px] text-neutral-500">
                Pilih hingga 5 foto ruangan atau fasilitas untuk baris galeri brosur
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {images.map((imgUrl, i) => {
                const isSelected = selectedInterior.includes(imgUrl);
                const orderIndex = selectedInterior.indexOf(imgUrl);

                return (
                  <div
                    key={`interior-${i}`}
                    onClick={() => handleToggleInterior(imgUrl)}
                    className={`group relative aspect-square rounded-btn overflow-hidden border-2 cursor-pointer transition-all bg-neutral-100 ${
                      isSelected
                        ? 'border-remax-blue ring-2 ring-remax-blue/30 shadow-md'
                        : 'border-border-c hover:border-neutral-400'
                    }`}
                  >
                    <Image src={imgUrl} alt={`Foto pendukung ${i + 1}`} fill className="object-cover" sizes="120px" />
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-remax-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-2xs">
                        {orderIndex + 1}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info note */}
          <div className="p-3 bg-neutral-100/70 border border-border-c rounded-btn text-[11px] text-neutral-600">
            💡 <strong>Petunjuk:</strong> Sistem akan otomatis menyusun foto-foto pilihan Anda ke dalam template brosur standar cetak A4. Brosur langsung siap dibagikan kepada calon pembeli.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border-c bg-neutral-100/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-2 bg-white hover:bg-neutral-100 border border-border-c text-neutral-900 text-xs font-semibold rounded-btn transition-colors cursor-pointer"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !selectedCover}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-remax-blue hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-semibold rounded-btn shadow-sm transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sedang Membuat Brosur...</span>
              </>
            ) : (
              <>
                <HiSparkles className="text-sm" />
                <span>Buat Brosur Siap Cetak</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
