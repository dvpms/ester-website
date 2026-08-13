import { BrochureHeroBackground, BrochureHeaderInfo } from './BrochureHero';
import { BrochureSpecs } from './BrochureSpecs';
import { BrochureGallery } from './BrochureGallery';
import { BrochureFeatures } from './BrochureFeatures';
import { BrochureFooter } from './BrochureFooter';

export function BrochureTemplate({ listing }) {
  if (!listing) return null;

  return (
    <div
      id="brochure-container"
      className="w-[794px] h-[1123px] bg-white text-slate-900 shadow-2xl overflow-hidden flex flex-col justify-between font-sans relative border border-slate-300 print:shadow-none print:m-0"
      style={{ width: '794px', height: '1123px', boxSizing: 'border-box' }}
    >
      {/* BACKGROUND HERO PHOTO & TOP RIGHT BADGE */}
      <BrochureHeroBackground listing={listing} />

      {/* MAIN PADDED BODY CONTENT */}
      <div className="p-7 pb-4 flex-1 flex flex-col justify-between relative z-10">
        {/* Section 1: Logo, Title, Address & Price Badge */}
        <BrochureHeaderInfo listing={listing} />

        {/* Section 2: Specifications Strip */}
        <BrochureSpecs spesifikasi={listing.spesifikasi} />

        {/* Section 3: 5 Interior Gallery Photos */}
        <BrochureGallery galeri={listing.galeri} />

        {/* Section 4: 3-Column Features & Technical Details */}
        <BrochureFeatures listing={listing} />

        {/* Section 5: Footer Contact Banner */}
        <BrochureFooter />
      </div>
    </div>
  );
}
