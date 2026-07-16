"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BiFullscreen } from "react-icons/bi";

// Mencegah bundle membesar karena Lightbox jarang dibuka di awal
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

const handleA11yAction = (e, action) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    action();
  }
};

function MainImage({ src, alt, onOpenLightbox }) {
  return (
    <div 
      className="relative w-full overflow-hidden rounded-card cursor-pointer group aspect-video md:aspect-[16/9]"
      onClick={onOpenLightbox}
      onKeyDown={(e) => handleA11yAction(e, onOpenLightbox)}
      role="button"
      tabIndex={0}
      aria-label="Perbesar gambar layar penuh"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 66vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <span className="text-white bg-black/60 px-3 py-1.5 rounded-full text-sm font-sans flex items-center gap-2 backdrop-blur-sm">
          <BiFullscreen className="text-base" />
          Perbesar Layar Penuh
        </span>
      </div>
    </div>
  );
}

function ThumbnailGrid({ images, altPrefix, activeIndex, onSelect }) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-4">
      {images.map((src, index) => {
        const isActive = activeIndex === index;
        return (
          <div 
            key={index}
            onClick={() => onSelect(index)}
            onKeyDown={(e) => handleA11yAction(e, () => onSelect(index))}
            role="button"
            tabIndex={0}
            aria-label={`Lihat gambar ke-${index + 1}`}
            className={`relative overflow-hidden cursor-pointer rounded-btn aspect-square transition-all duration-200 ${
              isActive ? 'ring-2 ring-remax-blue ring-offset-2' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={src}
              alt={`${altPrefix} — ${index + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, 15vw"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

export function GalleryLightbox({ images, nama }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (!images?.length) return null;

  return (
    <>
      <div className="grid gap-4">
        <MainImage 
          src={images[activeIndex]} 
          alt={`Foto ${nama} — gambar utama`} 
          onOpenLightbox={() => setLightboxIndex(activeIndex)} 
        />
        <ThumbnailGrid 
          images={images} 
          altPrefix={`Thumbnail ${nama}`} 
          activeIndex={activeIndex} 
          onSelect={setActiveIndex} 
        />
      </div>

      {lightboxIndex >= 0 && (
        <Lightbox
          index={lightboxIndex}
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          slides={images.map((src) => ({ src }))}
          plugins={[Zoom, Fullscreen]}
        />
      )}
    </>
  );
}
