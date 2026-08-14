import React from 'react';
import { Button, Text } from 'react-email';
import Layout from './components/Layout';
import { profile } from '@/data/profile';

export default function SurveyConfirmation({ 
  nama = "Klien", 
  tanggalSurvei = "-", 
  preferensi = {}, 
  catatan = "" 
}) {
  const cleanPhone = profile.phone.replace(/\D/g, "").replace(/^0/, "62");
  const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}`;
  const topik = preferensi?.kawasan || "Survei Properti";

  return (
    <Layout title="Janji Temu Berhasil Dijadwalkan">
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Halo <strong>{nama}</strong>,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Terima kasih. Janji temu Anda telah berhasil kami jadwalkan.</Text>
      
      <h2 className="text-[#00458C] text-[18px] mt-[30px] mb-2.5 font-bold">Detail Janji</h2>
      <table className="w-full border-collapse mb-5">
        <tbody>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[30%]"><strong>Tanggal</strong></td>
            <td className="py-2 border-b border-[#eee]">{tanggalSurvei}</td>
          </tr>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[30%]"><strong>Topik/Kawasan</strong></td>
            <td className="py-2 border-b border-[#eee]">{topik}</td>
          </tr>
          {catatan && (
            <tr>
              <td className="py-2 w-[30%]"><strong>Catatan</strong></td>
              <td className="py-2">{catatan}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Kami akan mengirimkan pengingat satu hari sebelum jadwal berlangsung.</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Apabila ingin mengubah jadwal, silakan hubungi kami melalui WhatsApp.</Text>
      
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
