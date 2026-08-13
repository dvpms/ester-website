import React from 'react';
import { Button, Hr, Link, Text } from 'react-email';
import Layout from './components/Layout';
import { listings } from '@/data/listings';

export default function LeadNotification({
  nama = "-",
  email = "-",
  telepon = "-",
  jenisForm = "-",
  listingSlug = "-",
  pesan = "-",
  preferensi = {},
  brosurUrl,
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

  const isValidSlug = listingSlug && listingSlug !== "-" && listingSlug !== "$undefined";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://estherproperti.com";
  const listingUrl = isValidSlug ? `${baseUrl}/properti/${listingSlug}` : "";

  // Cari data listing dan brosurUrl jika belum diteruskan
  const matchedListing = isValidSlug ? listings.find((l) => l.slug === listingSlug) : null;
  const currentBrosurUrl = brosurUrl || matchedListing?.brosurUrl || "";

  // Download URL dengan fl_attachment untuk kemudahan agen mengunduh file gambar brosur langsung
  const downloadBrosurUrl = currentBrosurUrl
    ? (currentBrosurUrl.includes('cloudinary.com') && currentBrosurUrl.includes('/upload/') && !currentBrosurUrl.includes('fl_attachment')
        ? currentBrosurUrl.replace('/upload/', '/upload/fl_attachment/')
        : currentBrosurUrl)
    : null;

  // Dynamic Greeting Text TANPA link brosur (karena agen mengirim gambar brosur langsung)
  const clientName = nama && nama !== '-' ? nama : '';
  const clientGreeting = clientName ? `Halo Bapak/Ibu *${clientName}*` : 'Halo Bapak/Ibu';
  const propertiTitle = matchedListing?.nama ? `*${matchedListing.nama}*` : '';

  let messageLines = [];

  if (jenisForm === 'konsultasi') {
    messageLines = [
      `${clientGreeting},`,
      '',
      `Perkenalkan saya *Esther* dari *REMAX Future*. Terima kasih telah menghubungi saya melalui website terkait:`,
      propertiTitle ? `🏡 ${propertiTitle}` : '',
      listingUrl ? `🔗 Detail: ${listingUrl}` : '',
      '',
      `Ada yang bisa saya bantu informasikan lebih lanjut mengenai properti ini?`,
    ].filter(Boolean);
  } else if (jenisForm === 'brosur') {
    messageLines = [
      `${clientGreeting},`,
      '',
      `Perkenalkan saya *Esther* dari *REMAX Future*. Terima kasih atas permintaan brosur yang Anda kirimkan melalui website untuk:`,
      propertiTitle ? `🏡 ${propertiTitle}` : '',
      listingUrl ? `🔗 Detail: ${listingUrl}` : '',
      '',
      `Berikut saya lampirkan gambar brosur propertinya. Jika ada yang ingin ditanyakan atau ingin survei lokasi, saya siap membantu! 😊`,
    ].filter(Boolean);
  } else {
    messageLines = [
      `${clientGreeting},`,
      '',
      `Perkenalkan saya *Esther* dari *REMAX Future*. Terima kasih telah menghubungi kami melalui website.`,
      '',
      `Ada yang bisa saya bantu terkait kebutuhan properti Anda?`,
    ].filter(Boolean);
  }

  const messageRaw = messageLines.join('\n');
  const greetingText = encodeURIComponent(messageRaw);
  const waUrl = formattedPhone ? `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${greetingText}` : null;

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
          {downloadBrosurUrl && (
            <tr>
              <td className="py-2 border-b border-[#eee] w-[40%]"><strong>Gambar Brosur</strong></td>
              <td className="py-2 border-b border-[#eee]">
                <Link href={downloadBrosurUrl} className="text-[#E11B22] font-bold underline">
                  Unduh Brosur
                </Link>
              </td>
            </tr>
          )}
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Kawasan</strong></td><td className="py-2 border-b border-[#eee]">{kawasan}</td></tr>
          <tr><td className="py-2 border-b border-[#eee] w-[40%]"><strong>Pesan</strong></td><td className="py-2 border-b border-[#eee]">{pesanTeks}</td></tr>
          <tr><td className="py-2 w-[40%]"><strong>Waktu Masuk</strong></td><td className="py-2">{waktuMasuk}</td></tr>
        </tbody>
      </table>

      {/* Action Buttons for Agent */}
      <div className="my-6">
        {downloadBrosurUrl && (
          <div className="mb-3">
            <Button href={downloadBrosurUrl} className="bg-[#003DA5] text-white px-6 py-3 no-underline rounded inline-block font-bold">
              Unduh Brosur
            </Button>
            <Text className="text-xs text-neutral-500 m-0 mt-1.5">
              Klik untuk mengunduh brosur dan kirimkan langsung sebagai foto/gambar ke WhatsApp klien.
            </Text>
          </div>
        )}

        {waUrl && (
          <div className="mt-3">
            <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
              Chat WhatsApp Klien
            </Button>
          </div>
        )}
      </div>

      <Hr className="border-t border-[#eee] my-5" />
      <Text className="italic text-[#666] m-0 text-sm">
        Semakin cepat Anda menghubungi calon klien, semakin besar peluang terjadinya transaksi.
      </Text>
    </Layout>
  );
}
