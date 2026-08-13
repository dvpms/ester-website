import { HiCheckCircle } from 'react-icons/hi2';
import { CgNotes } from 'react-icons/cg';
import { FaBoltLightning, FaWater } from 'react-icons/fa6';

const DEFAULT_FITUR = [
  'Lokasi sangat strategis dekat fasilitas utama',
  'Sirkulasi udara & pencahayaan optimal',
  'Keamanan cluster 24 jam dengan one-gate system',
  'Row jalan lingkungan lebar',
  'Kualitas bangunan prima & siap huni',
];

const DEFAULT_BONUS = [
  'Kitchen set modern',
  'AC di kamar tidur utama',
  'Water heater',
];

export function BrochureFeatures({ listing }) {
  const fiturList = listing?.fiturUnggulan?.length ? listing.fiturUnggulan : DEFAULT_FITUR;
  const bonusList = listing?.bonusInterior?.length ? listing.bonusInterior : DEFAULT_BONUS;

  const sertifikat = listing?.spesifikasi?.sertifikat || 'SHM (Hak Milik)';
  const listrik = listing?.spesifikasi?.listrik || '2200 Watt';
  const air = listing?.spesifikasi?.air || 'PAM';

  return (
    <div className="grid grid-cols-12 gap-3 my-2 text-slate-800">
      {/* Fitur Unggulan (Col 5) */}
      <div className="col-span-5 pr-1">
        <h3 className="text-xs font-black text-[#003DA5] uppercase tracking-wider mb-2">
          FITUR UNGGULAN
        </h3>
        <ul className="space-y-1.5 text-[11px] font-medium text-slate-700">
          {fiturList.slice(0, 5).map((item, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <HiCheckCircle className="text-[#003DA5] text-sm shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bonus Interior (Col 4) */}
      <div className="col-span-4 bg-red-50/60 rounded-xl p-3 border border-red-100/80">
        <h3 className="text-xs font-black text-[#E11B22] uppercase tracking-wider mb-2">
          BONUS INTERIOR
        </h3>
        <ul className="space-y-1.5 text-[11px] font-semibold text-slate-700">
          {bonusList.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11B22] mt-1.5 shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Informasi Teknis (Col 3) */}
      <div className="col-span-3 bg-blue-50/60 rounded-xl p-3 border border-blue-100/80 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-blue-100 text-[#003DA5] flex items-center justify-center shrink-0">
              <CgNotes />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">
                SERTIFIKAT
              </span>
              <span className="text-[11px] font-extrabold text-slate-900">
                {sertifikat}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-blue-100 text-[#003DA5] flex items-center justify-center shrink-0">
              <FaBoltLightning />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">
                LISTRIK
              </span>
              <span className="text-[11px] font-extrabold text-slate-900">
                {listrik}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-100 text-[#003DA5] flex items-center justify-center shrink-0">
              <FaWater />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">
                AIR
              </span>
              <span className="text-[11px] font-extrabold text-slate-900">
                {air}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
