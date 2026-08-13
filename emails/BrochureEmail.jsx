import React from 'react';
import { Button, Text } from 'react-email';
import Layout from './components/Layout';
import { profile } from '@/data/profile';

export default function BrochureEmail({ nama = "Klien", listingSlug = "-", listingDetails = {} }) {
  const waUrl = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;
  const l = listingDetails || {};
  const propertiName = l.nama || listingSlug;

  // Cloudinary flag fl_attachment memaksa header Content-Disposition: attachment 
  // sehingga browser mobile (Safari/Chrome) langsung men-download file PDF ke storage
  const downloadUrl = l.brosurUrl
    ? (l.brosurUrl.includes('cloudinary.com') && l.brosurUrl.includes('/upload/') && !l.brosurUrl.includes('fl_attachment')
        ? l.brosurUrl.replace('/upload/', '/upload/fl_attachment/')
        : l.brosurUrl)
    : null;

  return (
    <Layout title="Brosur & Pricelist Siap Diunduh">
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Halo <strong>{nama}</strong>,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Terima kasih atas ketertarikan Anda terhadap properti berikut.</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5"><strong>{propertiName}</strong></Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Kami telah menyiapkan brosur dan informasi detail properti yang dapat langsung Anda unduh.</Text>
      
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
        {downloadUrl ? (
          <Button href={downloadUrl} className="bg-accent text-white px-6 py-3 no-underline rounded inline-block font-bold mb-4">
            Unduh Brosur PDF
          </Button>
        ) : (
          <Text className="text-sm text-neutral-600 mb-4">
            Tautan brosur PDF: Silakan hubungi konsultan kami melalui WhatsApp untuk menerima salinan langsung.
          </Text>
        )}
        <Text className="m-0 text-[#666] text-sm">
          Jika Anda memiliki pertanyaan mengenai properti ini atau ingin melakukan survei lokasi, silakan menghubungi kami.
        </Text>
      </div>
      
      <div className="my-[30px]">
        <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
          Chat Konsultan via WhatsApp
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
