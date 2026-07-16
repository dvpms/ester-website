"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

export function GalleryLightbox({ images, nama }) {
  // index untuk gambar yang sedang aktif/besar di UI grid
  const [activeIndex, setActiveIndex] = useState(0);
  // index untuk lightbox fullscreen (-1 jika tertutup)
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid gap-4">
        {/* Gambar Aktif Utama */}
        <div 
          className="relative w-full overflow-hidden rounded-card cursor-pointer group aspect-video md:aspect-[16/9]"
          onClick={() => setLightboxIndex(activeIndex)}
        >
          <Image
            src={images[activeIndex]}
            alt={`Foto ${nama} — gambar utama`}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          {/* Overlay icon saat di-hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white bg-black/60 px-3 py-1.5 rounded-full text-sm font-sans flex items-center gap-2 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8M3 16.2V21m0 0h4.8M3 21l6-6M21 7.8V3m0 0h-4.8M21 3l-6 6M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
              Perbesar Layar Penuh
            </span>
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {images.map((src, index) => (
            <div 
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden cursor-pointer rounded-btn aspect-square transition-all duration-200 ${
                activeIndex === index 
                  ? 'ring-2 ring-remax-blue ring-offset-2' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${nama} — ${index + 1}`}
                fill
                sizes="(max-width: 768px) 20vw, 15vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom, Fullscreen]}
      />
    </>
  );
}
