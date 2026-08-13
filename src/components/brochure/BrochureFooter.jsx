import { HiPhone } from 'react-icons/hi2';
import { BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { CiGlobe } from 'react-icons/ci';
import { profile } from '@/data/profile';

export function BrochureFooter() {
  return (
    <footer className="mt-2 bg-[#003DA5] text-white rounded-2xl p-4 shadow-md flex items-center justify-between gap-3 relative overflow-hidden">
      {/* Left Contact Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white text-[#E11B22] flex items-center justify-center shrink-0 shadow-md">
          <HiPhone className="text-2xl" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
            HUBUNGI SEKARANG
          </span>
          <h4 className="text-lg font-black tracking-tight leading-none text-white mt-0.5">
            ESTHER REMAX
          </h4>
          <p className="text-[10px] text-blue-200 mt-1 font-medium">
            Untuk jadwalkan kunjungan ke lokasi!
          </p>
        </div>
      </div>

      {/* Center Socials */}
      <div className="border-l border-white/20 pl-4 space-y-1 text-xs font-semibold text-blue-100">
        <div className="flex items-center gap-2">
          <BsWhatsapp className="text-sm" />
          <span>{profile.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <BsInstagram className="text-sm" />
          <span>@esther.remaxfuture</span>
        </div>
        <div className="flex items-center gap-2">
          <CiGlobe className="text-lg" />
          <span>{profile.websiteUrl}</span>
        </div>
      </div>

      {/* Right Accent Red Corner */}
      <div className="absolute right-0 bottom-0 w-0 h-0 border-r-[24px] border-r-[#E11B22] border-t-[24px] border-t-transparent"></div>
    </footer>
  );
}
