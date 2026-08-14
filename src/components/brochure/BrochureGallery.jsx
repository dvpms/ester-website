import Image from 'next/image';

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400',
];

/**
 * 5-photo interior/facility gallery row for brochure layout.
 * Skips the first image (index 0) because it is already used in BrochureHero.
 * 
 * @param {{ galeri?: string[] }} props
 */
export function BrochureGallery({ galeri = [] }) {
  // Ambil 5 foto interior mulai dari index 1 (karena index 0 dipakai sebagai hero cover)
  const interiorImages = galeri.length > 1 ? galeri.slice(1, 6) : galeri.slice(0, 5);
  const images = Array.from({ length: 5 }, (_, idx) => interiorImages[idx] || DEFAULT_GALLERY[idx]);

  return (
    <div className="my-1.5">
      <div className="grid grid-cols-5 gap-1.5">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className="relative h-[175px] rounded-lg overflow-hidden border border-slate-200 shadow-2xs bg-slate-100"
          >
            <Image
              src={imgUrl}
              alt={`Galeri Properti ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
