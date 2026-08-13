import { BiBed, BiBath, BiCompass, BiArea } from 'react-icons/bi';
import { MdOutlineSquareFoot } from 'react-icons/md';
import { BsLayers } from 'react-icons/bs';

export function BrochureSpecs({ spesifikasi }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-md py-4 px-3 grid grid-cols-6 divide-x divide-slate-200 text-center items-center my-3">
      {/* LT */}
      <div className="px-2 flex flex-col items-center">
        <BiArea className="text-3xl text-[#003DA5] mb-1" />
        <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-tight">
          LUAS TANAH
        </span>
        <span className="text-lg font-black text-slate-900 mt-0.5">
          {spesifikasi?.lt || '-'} m²
        </span>
      </div>

      {/* LB */}
      <div className="px-2 flex flex-col items-center">
        <MdOutlineSquareFoot className="text-3xl text-[#003DA5] mb-1" />
        <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-tight">
          LUAS BANGUNAN
        </span>
        <span className="text-lg font-black text-slate-900 mt-0.5">
          {spesifikasi?.lb || '-'} m²
        </span>
      </div>

      {/* KT */}
      <div className="px-2 flex flex-col items-center">
        <BiBed className="text-3xl text-[#003DA5] mb-1" />
        <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-tight">
          KAMAR TIDUR
        </span>
        <span className="text-lg font-black text-slate-900 mt-0.5">
          {spesifikasi?.kamarTidur || '-'}
        </span>
      </div>

      {/* KM */}
      <div className="px-2 flex flex-col items-center">
        <BiBath className="text-3xl text-[#003DA5] mb-1" />
        <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-tight">
          KAMAR MANDI
        </span>
        <span className="text-lg font-black text-slate-900 mt-0.5">
          {spesifikasi?.kamarMandi || '-'}
        </span>
      </div>

      {/* LANTAI */}
      <div className="px-2 flex flex-col items-center">
        <BsLayers className="text-3xl text-[#003DA5] mb-1" />
        <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-tight">
          LANTAI
        </span>
        <span className="text-sm font-black text-slate-900 mt-0.5 uppercase">
          {spesifikasi?.lantai ? `${spesifikasi.lantai} LANTAI` : '2 LANTAI'}
        </span>
      </div>

      {/* HADAP */}
      <div className="px-2 flex flex-col items-center">
        <BiCompass className="text-3xl text-[#003DA5] mb-1" />
        <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-tight">
          HADAP
        </span>
        <span className="text-sm font-black text-slate-900 mt-0.5 uppercase">
          {spesifikasi?.hadap || 'SELATAN'}
        </span>
      </div>
    </div>
  );
}
