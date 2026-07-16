import React from 'react';
import { Button, Text } from 'react-email';
import Layout from './components/Layout';
import { profile } from '@/data/profile';

export default function BrochureEmail({ nama = "Klien", listingSlug = "-", listingDetails = {} }) {
  const waUrl = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;
  const l = listingDetails || {};
  const propertiName = l.nama || listingSlug;

  return (
    <Layout title="Brosur & Pricelist Siap Diunduh">
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Halo <strong>{nama}</strong>,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Terima kasih atas ketertarikan Anda terhadap properti berikut.</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5"><strong>{propertiName}</strong></Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Kami telah menyiapkan brosur dan pricelist terbaru yang dapat langsung Anda unduh.</Text>
      
      <h2 className="text-[#00458C] text-[18px] mt-[30px] mb-2.5 font-bold">Informasi Properti</h2>
      <table className="w-full border-collapse mb-5">
        <tbody>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[30%]"><strong>Nama Properti</strong></td>
            <td className="py-2 border-b border-[#eee]">{l.nama || "-"}</td>
          </tr>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[30%]"><strong>Lokasi</strong></td>
            <td className="py-2 border-b border-[#eee]">{l.lokasi || "-"}</td>
          </tr>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[30%]"><strong>Jenis Properti</strong></td>
            <td className="py-2 border-b border-[#eee]">{l.jenis || "-"}</td>
          </tr>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[30%]"><strong>Harga Mulai</strong></td>
            <td className="py-2 border-b border-[#eee]">{l.harga || "-"}</td>
          </tr>
        </tbody>
      </table>
      
      <div className="my-[30px]">
        <Button href={l.brosurUrl || "#"} className="bg-accent text-white px-6 py-3 no-underline rounded inline-block font-bold mb-4">
          Unduh Brosur PDF
        </Button>
        <Text className="m-0 text-[#666] text-sm">
          Jika Anda memiliki pertanyaan mengenai properti ini atau ingin melakukan survei lokasi, silakan menghubungi kami.
        </Text>
      </div>
      
      <div className="my-[30px]">
        <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
          Chat Konsultan
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
