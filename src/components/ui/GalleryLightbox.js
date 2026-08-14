"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BiFullscreen } from "react-icons/bi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

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

function MainImage({ src, alt, onOpenLightbox, onPrev, onNext, hasMultiple }) {
  return (
    <div className="relative w-full overflow-hidden rounded-card group aspect-video md:aspect-[16/9] bg-neutral-100">
      <div 
        className="w-full h-full cursor-pointer"
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
          <span className="text-white bg-black/60 px-3 py-1.5 rounded-full text-sm font-sans flex items-center gap-2 backdrop-blur-sm shadow-md">
            <BiFullscreen className="text-base" />
            Perbesar Layar Penuh
          </span>
        </div>
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Gambar sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 cursor-pointer"
          >
            <HiChevronLeft className="text-lg sm:text-xl" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Gambar selanjutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 cursor-pointer"
          >
            <HiChevronRight className="text-lg sm:text-xl" />
          </button>
        </>
      )}
    </div>
  );
}

function ThumbnailSlider({ images, altPrefix, activeIndex, onSelect }) {
  const sliderRef = useRef(null);
  const thumbnailRefs = useRef([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Periksa apakah slider dapat digeser ke kiri/kanan
  const checkScrollability = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollability();
    const el = sliderRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollability, { passive: true });
      window.addEventListener("resize", checkScrollability);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [images.length, checkScrollability]);

  // Otomatis geser thumbnail aktif ke tengah tampilan slider HANYA di container lokal (tanpa scroll halaman/window)
  useEffect(() => {
    const container = sliderRef.current;
    const activeThumb = thumbnailRefs.current[activeIndex];
    
    if (container && activeThumb) {
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const containerWidth = container.clientWidth;
      const targetScrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "smooth",
      });
    }

    checkScrollability();
  }, [activeIndex, checkScrollability]);

  const scroll = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollDistance = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/slider w-full">
      {/* Tombol Geser Kiri */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Geser thumbnail ke kiri"
          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-neutral-800 shadow-md hover:shadow-lg rounded-full p-1.5 border border-border-c transition-all focus:outline-none focus:ring-2 focus:ring-remax-blue cursor-pointer"
        >
          <HiChevronLeft className="text-base sm:text-lg" />
        </button>
      )}

      {/* Container Thumbnail Slider Horizontal */}
      <div
        ref={sliderRef}
        className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto py-1.5 px-0.5 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((src, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              ref={(el) => {
                thumbnailRefs.current[index] = el;
              }}
              onClick={() => onSelect(index)}
              onKeyDown={(e) => handleA11yAction(e, () => onSelect(index))}
              role="button"
              tabIndex={0}
              aria-label={`Lihat gambar ke-${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden cursor-pointer rounded-btn snap-start transition-all duration-200 ${
                isActive
                  ? "ring-2 ring-remax-blue ring-offset-2 opacity-100 scale-100 shadow-sm"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              <Image
                src={src}
                alt={`${altPrefix} — ${index + 1}`}
                fill
                sizes="(max-width: 768px) 64px, 80px"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Tombol Geser Kanan */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Geser thumbnail ke kanan"
          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-neutral-800 shadow-md hover:shadow-lg rounded-full p-1.5 border border-border-c transition-all focus:outline-none focus:ring-2 focus:ring-remax-blue cursor-pointer"
        >
          <HiChevronRight className="text-base sm:text-lg" />
        </button>
      )}
    </div>
  );
}

export function GalleryLightbox({ images, nama }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Reset activeIndex dan lightbox saat navigasi ke listing/properti lain
  const prevFirstImage = useRef(images?.[0]);
  useEffect(() => {
    if (images?.[0] !== prevFirstImage.current) {
      prevFirstImage.current = images?.[0];
      setActiveIndex(0);
      setLightboxIndex(-1);
    }
  }, [images]);

  if (!images?.length) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <MainImage
          src={images[activeIndex]}
          alt={`Foto ${nama} — gambar utama`}
          onOpenLightbox={() => setLightboxIndex(activeIndex)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasMultiple={images.length > 1}
        />
        <ThumbnailSlider
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
          on={{
            view: ({ index }) => setActiveIndex(index),
          }}
        />
      )}
    </>
  );
}
