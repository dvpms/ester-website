import { BiBed, BiBath, BiCompass, BiArea } from 'react-icons/bi';
import { MdOutlineSquareFoot } from 'react-icons/md';
import { BsLayers } from 'react-icons/bs';

/**
 * 6-column specification cards strip for brochure layout.
 * 
 * @param {{ spesifikasi: import('@/lib/types').SpesifikasiProperti }} props
 */
export function BrochureSpecs({ spesifikasi }) {
  const specItems = [
    {
      icon: BiArea,
      label: 'LUAS TANAH',
      value: spesifikasi?.lt ? `${spesifikasi.lt} m²` : '-',
      isLarge: true,
    },
    {
      icon: MdOutlineSquareFoot,
      label: 'LUAS BANGUNAN',
      value: spesifikasi?.lb ? `${spesifikasi.lb} m²` : '-',
      isLarge: true,
    },
    {
      icon: BiBed,
      label: 'KAMAR TIDUR',
      value: spesifikasi?.kamarTidur || '-',
      isLarge: true,
    },
    {
      icon: BiBath,
      label: 'KAMAR MANDI',
      value: spesifikasi?.kamarMandi || '-',
      isLarge: true,
    },
    {
      icon: BsLayers,
      label: 'LANTAI',
      value: spesifikasi?.lantai ? `${spesifikasi.lantai} LANTAI` : '2 LANTAI',
      isLarge: false,
    },
    {
      icon: BiCompass,
      label: 'HADAP',
      value: (spesifikasi?.hadap || 'SELATAN').toUpperCase(),
      isLarge: false,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-md py-4 px-3 grid grid-cols-6 divide-x divide-slate-200 text-center items-center my-3">
      {specItems.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div key={idx} className="px-2 flex flex-col items-center">
            <IconComponent className="text-3xl text-[#003DA5] mb-1" />
            <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-tight">
              {item.label}
            </span>
            <span
              className={`font-black text-slate-900 mt-0.5 ${
                item.isLarge ? 'text-lg' : 'text-sm uppercase'
              }`}
            >
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
