import React from 'react';
import { Button, Hr, Text } from 'react-email';
import Layout from './components/Layout';

export default function LeadNotification({
  nama = "-",
  email = "-",
  telepon = "-",
  jenisForm = "-",
  listingSlug = "-",
  pesan = "-",
  preferensi = {},
  tanggalSurvei = "-",
}) {
  const waktuMasuk = new Date().toLocaleString("id-ID");
  const waUrl = telepon !== "-"
    ? `https://wa.me/${telepon.replace(/\D/g, "")}`
    : "#";

  const resolvedPesan = pesan !== "-" ? pesan : (preferensi?.kawasan || "-");

  return (
    <Layout title="Lead Baru Masuk">
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Halo,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">
        Anda menerima lead baru dari website. Berikut informasi yang telah dikirimkan oleh calon klien.
      </Text>
      
      <Hr className="border-t border-[#eee] my-5" />
      
      <h2 className="text-[#00458C] text-[18px] mb-2.5 mt-0 font-bold">Informasi Lead</h2>
      <table className="w-full border-collapse">
        <tbody>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Nama</strong></td><td className="py-2 border-b border-[#eee]">{nama}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Email</strong></td><td className="py-2 border-b border-[#eee]">{email}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Nomor Telepon</strong></td><td className="py-2 border-b border-[#eee]">{telepon}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Jenis Form</strong></td><td className="py-2 border-b border-[#eee]">{jenisForm}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Listing</strong></td><td className="py-2 border-b border-[#eee]">{listingSlug}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Kawasan / Pesan</strong></td><td className="py-2 border-b border-[#eee]">{resolvedPesan}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Tanggal Janji</strong></td><td className="py-2 border-b border-[#eee]">{tanggalSurvei}</td></tr>
          <tr><td className="py-2 w-[40%]"><strong>Waktu Masuk</strong></td><td className="py-2">{waktuMasuk}</td></tr>
        </tbody>
      </table>
      
      <Hr className="border-t border-[#eee] my-5" />
      
      <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
        Chat WhatsApp Sekarang
      </Button>
      
      <Hr className="border-t border-[#eee] my-5" />
      <Text className="italic text-[#666] m-0 text-sm">
        Semakin cepat Anda menghubungi calon klien, semakin besar peluang terjadinya transaksi.
      </Text>
    </Layout>
  );
}
