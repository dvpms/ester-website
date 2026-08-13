import React from 'react';
import { Button, Text } from 'react-email';
import Layout from './components/Layout';
import { profile } from '@/data/profile';
import { formatWhatsAppUrl, getCloudinaryAttachmentUrl } from '@/lib/utils';

export default function BrochureEmail({ nama = "Klien", listingSlug = "-", listingDetails = {} }) {
  const l = listingDetails || {};
  const propertiName = l.nama || listingSlug;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://estherproperti.com";
  const isValidSlug = listingSlug && listingSlug !== "-" && listingSlug !== "$undefined";
  const listingUrl = isValidSlug ? `${baseUrl}/properti/${listingSlug}` : "";

  // Dynamic WhatsApp Greeting dari Klien ke Agen Esther
  const clientName = nama && nama !== "Klien" && nama !== "-" ? nama : "";
  const nameFragment = clientName ? `, saya *${clientName}*` : "";

  const messageLines = [
    `Halo Bu Esther${nameFragment}.`,
    "",
    `Saya telah menerima brosur properti dari website terkait:`,
    `🏡 *${propertiName}*`,
    listingUrl ? `🔗 Detail: ${listingUrl}` : "",
    "",
    `Saya tertarik dan ingin berkonsultasi lebih lanjut mengenai properti ini.`,
  ].filter(Boolean);

  const waUrl = formatWhatsAppUrl(profile.phone, messageLines.join("\n"));
  const downloadUrl = getCloudinaryAttachmentUrl(l.brosurUrl);

  return (
    <Layout title="Brosur Properti Siap Diunduh">
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Halo <strong>{nama}</strong>,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Terima kasih atas ketertarikan Anda terhadap properti berikut.</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5"><strong>{propertiName}</strong></Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Kami telah menyiapkan brosur informasi properti yang dapat langsung Anda unduh.</Text>
      
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
            Unduh Brosur
          </Button>
        ) : (
          <Text className="text-sm text-neutral-600 mb-4">
            Brosur: Silakan hubungi konsultan kami melalui WhatsApp untuk menerima salinan langsung.
          </Text>
        )}
        <Text className="m-0 text-[#666] text-sm">
          Jika Anda memiliki pertanyaan mengenai properti ini atau ingin melakukan survei lokasi, silakan menghubungi kami.
        </Text>
      </div>
      
      {waUrl && (
        <div className="my-[30px]">
          <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
            Chat Konsultan via WhatsApp
          </Button>
        </div>
      )}
      
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Salam,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">
        <strong>{profile.name}</strong><br/>
        Konsultan Properti REMAX
      </Text>
    </Layout>
  );
}
