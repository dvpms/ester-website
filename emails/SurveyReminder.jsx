import React from 'react';
import { Button, Text } from 'react-email';
import Layout from './components/Layout';
import { profile } from '@/data/profile';

export default function SurveyReminder({ nama = "Klien", tanggalSurvei = "-", preferensi = {} }) {
  const waUrl = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;
  const topik = preferensi?.kawasan || "Survei Properti";

  return (
    <Layout title="Pengingat Janji Temu">
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Halo <strong>{nama}</strong>,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Kami ingin mengingatkan bahwa besok Anda memiliki jadwal konsultasi/survei bersama kami.</Text>
      
      <h2 className="text-[#00458C] text-[18px] mt-[30px] mb-2.5 font-bold">Jadwal</h2>
      <table className="w-full border-collapse mb-5">
        <tbody>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[30%]"><strong>Tanggal</strong></td>
            <td className="py-2 border-b border-[#eee]">{tanggalSurvei}</td>
          </tr>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[30%]"><strong>Topik</strong></td>
            <td className="py-2 border-b border-[#eee]">{topik}</td>
          </tr>
        </tbody>
      </table>
      
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Kami menantikan pertemuan dengan Anda.</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Jika ingin melakukan penjadwalan ulang, silakan hubungi kami.</Text>
      
      <div className="my-[30px]">
        <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
          Hubungi via WhatsApp
        </Button>
      </div>
      
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Salam,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">
        <strong>{profile.name}</strong><br/>
        Konsultan Properti REMAX
      </Text>
    </Layout>
  );
}
