'use client';

// src/components/admin/listings/MainImageSelector.jsx
// Pemilih foto sampul utama listing dan pengelola galeri foto

import Image from 'next/image';
import { HiStar, HiTrash } from 'react-icons/hi2';
import { showConfirmDialog } from '@/lib/swal';

export function MainImageSelector({
  images = [],
  selectedMainImage,
  onSelectMainImage,
  onRemoveImage,
}) {
  if (!images || images.length === 0) {
    return (
      <div className="p-8 text-center bg-neutral-100/50 border border-dashed border-border-c rounded-card text-neutral-500 text-xs font-sans">
        Belum ada foto yang diunggah. Silakan pilih foto di atas terlebih dahulu.
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span className="text-xs font-semibold text-neutral-900">
          Daftar Foto ({images.length})
        </span>
        <span className="text-[11px] text-neutral-500">
          Klik salah satu foto untuk menjadikannya foto sampul utama
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {images.map((imgUrl, index) => {
          const isMain = imgUrl === selectedMainImage;

          return (
            <div
              key={`${imgUrl}-${index}`}
              onClick={() => onSelectMainImage(imgUrl)}
              className={`group relative rounded-card overflow-hidden border-2 cursor-pointer transition-all bg-neutral-100 ${
                isMain
                  ? 'border-remax-blue ring-2 ring-remax-blue/30 shadow-md scale-[1.02]'
                  : 'border-border-c hover:border-neutral-400 hover:shadow-2xs'
              }`}
            >
              {/* Thumbnail Container (1:1 aspect ratio) */}
              <div className="aspect-square relative w-full">
                <Image
                  src={imgUrl}
                  alt={`Foto ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Main Badge Overlay */}
              {isMain && (
                <div className="absolute top-2 left-2 bg-remax-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                  <HiStar className="text-amber-300 text-xs" />
                  <span>Sampul Utama</span>
                </div>
              )}

              {/* Hover / Actions Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent flex flex-col justify-between p-2 transition-opacity ${
                  isMain ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {/* Delete Button at top right */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const confirmed = await showConfirmDialog({
                        title: 'Hapus Foto?',
                        text: 'Foto ini akan dihapus dari daftar galeri properti.',
                        confirmText: 'Ya, Hapus',
                        isDanger: true,
                      });
                      if (confirmed) {
                        onRemoveImage(imgUrl);
                      }
                    }}
                    className="p-1.5 rounded-full bg-white/90 text-remax-red hover:bg-white hover:text-red-700 shadow-xs transition-colors cursor-pointer"
                    title="Hapus foto ini"
                  >
                    <HiTrash className="text-xs" />
                  </button>
                </div>

                {/* Selection Label at bottom */}
                <div className="text-center">
                  {!isMain ? (
                    <span className="text-[10px] font-semibold text-white bg-neutral-900/70 px-2 py-0.5 rounded-full backdrop-blur-2xs">
                      Pilih Sebagai Sampul
                    </span>
                  ) : (
                    <span className="text-[10px] text-white/90 font-medium">
                      Sampul Terpilih
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
