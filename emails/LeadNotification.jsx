import React from 'react';
import { Button, Hr, Link, Text } from 'react-email';
import Layout from './components/Layout';

export default function LeadNotification({
  nama = "-",
  email = "-",
  telepon = "-",
  jenisForm = "-",
  listingSlug = "-",
  pesan = "-",
  preferensi = {},
}) {
  const waktuMasuk = new Date().toLocaleString("id-ID");
  const cleanPhone = telepon && telepon !== "-" ? telepon.replace(/\D/g, "") : "";
  const formattedPhone = cleanPhone.startsWith("0")
    ? "62" + cleanPhone.slice(1)
    : cleanPhone.startsWith("62")
      ? cleanPhone
      : cleanPhone
        ? "62" + cleanPhone
        : "";

  const displayTelepon = formattedPhone ? `+${formattedPhone}` : "-";
  
  // Menggunakan api.whatsapp.com/send untuk kompatibilitas penuh di iOS (iPhone/Apple Mail) & Android
  const greetingText = encodeURIComponent(`Halo ${nama !== '-' ? nama : ''}, saya Esther dari REMAX Future terkait pesan Anda di website.`);
  const waUrl = formattedPhone ? `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${greetingText}` : null;

  const isValidSlug = listingSlug && listingSlug !== "-" && listingSlug !== "$undefined";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://estherproperti.com";
  const listingUrl = isValidSlug ? `${baseUrl}/properti/${listingSlug}` : null;

  const kawasan = preferensi?.kawasan || "-";
  const pesanTeks = pesan && pesan !== "-" ? pesan : "-";

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
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Nomor Telepon</strong></td><td className="py-2 border-b border-[#eee]">{displayTelepon}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Jenis Form</strong></td><td className="py-2 border-b border-[#eee]">{jenisForm}</td></tr>
          <tr>
            <td className="py-2 border-b border-[#eee] w-[40%]"><strong>Listing</strong></td>
            <td className="py-2 border-b border-[#eee]">
              {listingUrl ? (
                <Link href={listingUrl} className="text-[#00458C] underline">
                  {listingUrl}
                </Link>
              ) : (
                "-"
              )}
            </td>
          </tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Kawasan</strong></td><td className="py-2 border-b border-[#eee]">{kawasan}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Pesan</strong></td><td className="py-2 border-b border-[#eee]">{pesanTeks}</td></tr>
          <tr><td className="py-2 w-[40%]"><strong>Waktu Masuk</strong></td><td className="py-2">{waktuMasuk}</td></tr>
        </tbody>
      </table>

      {waUrl && (
        <>
          <Hr className="border-t border-[#eee] my-5" />
          <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
            Chat WhatsApp Sekarang
          </Button>
        </>
      )}

      <Hr className="border-t border-[#eee] my-5" />
      <Text className="italic text-[#666] m-0 text-sm">
        Semakin cepat Anda menghubungi calon klien, semakin besar peluang terjadinya transaksi.
      </Text>
    </Layout>
  );
}
