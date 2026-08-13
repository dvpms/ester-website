import Image from 'next/image';
import { HiMapPin } from 'react-icons/hi2';
import { BiBuildingHouse } from 'react-icons/bi';

function formatHargaBrosur(harga) {
  if (!harga) return 'Rp -';
  if (harga >= 1000000000) {
    const val = (harga / 1000000000).toLocaleString('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return `Rp ${val} M`;
  }
  if (harga >= 1000000) {
    const val = (harga / 1000000).toLocaleString('id-ID', {
      maximumFractionDigits: 0,
    });
    return `Rp ${val} Jt`;
  }
  return `Rp ${harga}`;
}

export function BrochureHeroBackground({ listing }) {
  const coverImage =
    listing?.galeri?.[0] ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';

  return (
    <>
      {/* TOP-RIGHT FULL BLEED HERO PHOTO */}
      <div
        className="absolute top-0 right-0 w-[58%] h-[440px] z-0 overflow-hidden"
        style={{
          clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      >
        <Image
          src={coverImage}
          alt={listing?.nama || 'Foto Properti'}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* TOP RIGHT BANNER: DIJUAL TERSEDIA */}
      <div className="absolute top-0 right-8 z-30">
        <div className="bg-[#E11B22] text-white px-5 py-3 rounded-b-xl shadow-xl flex flex-col items-center justify-center min-w-[100px]">
          <BiBuildingHouse className="text-2xl mb-0.5" />
          <span className="text-sm font-extrabold uppercase tracking-wider leading-none">
            {listing?.transaksi || 'DIJUAL'}
          </span>
          <span className="text-[10px] font-semibold tracking-widest uppercase mt-0.5 text-white/90">
            {listing?.status || 'TERSEDIA'}
          </span>
        </div>
      </div>
    </>
  );
}

export function BrochureHeaderInfo({ listing }) {
  if (!listing) return null;

  const displayTitle = listing.judulBrosur || listing.nama;

  return (
    <div className="relative h-[420px]">
      {/* Top Logo & Branding */}
      <div className="flex items-center gap-3 mb-4 max-w-[42%]">
        <div className="relative w-16 h-16 shrink-0">
          <Image
            src="/logo/potrait.png"
            alt="REMAX Logo"
            width={48}
            height={48}
            className="object-contain w-16 h-16"
          />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight leading-none text-[#003DA5]">
            Esther <span className="text-[#E11B22]"><br /> REMAX</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-1">
            YOUR TRUSTED PROPERTY PARTNER
          </p>
        </div>
      </div>

      {/* Left Content Area: Title, Address, Description */}
      <div className="max-w-[44%]">
        {/* Property Main Title */}
        <h2 className="text-3xl font-black text-[#001D4A] leading-[1.12] tracking-tight line-clamp-2">
          {displayTitle}
        </h2>

        {/* Subtitle / Floor Tag */}
        <div className="flex items-center gap-2 my-2">
          <span className="h-[2px] w-6 bg-[#E11B22]"></span>
          <span className="text-sm font-black text-[#E11B22] uppercase tracking-wide">
            {listing.spesifikasi?.lantai ? `${listing.spesifikasi.lantai} LANTAI` : '2 LANTAI'}
          </span>
          <span className="h-[2px] w-6 bg-[#E11B22]"></span>
        </div>

        <p className="text-sm font-bold text-[#003DA5] uppercase tracking-wider mb-1.5">
          DI {listing.kawasanId?.replace('-', ' ')?.toUpperCase() || 'BSD CITY'}
        </p>

        {/* Address */}
        <div className="flex items-start gap-1.5 text-sm text-slate-700 font-semibold mb-1.5">
          <HiMapPin className="text-[#003DA5] text-base shrink-0 mt-0.5" />
          <span className="line-clamp-1">{listing.lokasiDetail}</span>
        </div>

        {/* Short Summary Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
          Hunian mewah siap huni dengan desain modern dan lingkungan nyaman di {listing.kawasanId?.replace('-', ' ') || 'BSD City'}.
        </p>
      </div>

      {/* ANCHORED / FIXED POSITION PRICE BADGE (NEVER SHIFTS) */}
      <div className="absolute bottom-0 left-0 w-full max-w-[330px] z-20">
        {/* Red Accent Slice */}
        <div
          className="absolute inset-0 bg-[#E11B22] rounded-tr-xl"
          style={{
            clipPath: 'polygon(0 0, 92% 0, 100% 100%, 0 100%)',
            transform: 'translateX(12px)',
          }}
        />

        {/* Blue Main Badge Body */}
        <div
          className="relative bg-[#003DA5] text-white px-6 py-4 shadow-xl"
          style={{
            clipPath: 'polygon(0 0, 92% 0, 100% 100%, 0 100%)',
          }}
        >
          <span className="text-xs font-black uppercase tracking-widest text-blue-200 block mb-0.5">
            HARGA
          </span>
          <span className="text-4xl font-black tracking-tight leading-none text-white block">
            {formatHargaBrosur(listing.harga)}
          </span>
        </div>
      </div>
    </div>
  );
}
