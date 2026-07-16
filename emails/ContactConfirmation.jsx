import React from 'react';
import { Button, Text } from 'react-email';
import Layout from './components/Layout';
import { profile } from '@/data/profile';

export default function ContactConfirmation({ nama = "Klien" }) {
  const waUrl = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;

  return (
    <Layout title="Terima Kasih Telah Menghubungi Kami">
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Halo <strong>{nama}</strong>,</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">Terima kasih telah menghubungi kami melalui website.</Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">
        Pesan Anda telah kami terima dengan baik dan akan kami respons maksimal dalam <strong>1x24 jam kerja</strong>.
      </Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">
        Jika kebutuhan Anda bersifat mendesak, silakan menghubungi kami secara langsung melalui WhatsApp.
      </Text>
      
      <div className="my-[30px]">
        <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
          Chat WhatsApp Sekarang
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
