import React from 'react';
import { Button, Text, Img } from 'react-email';
import Layout from './components/Layout';
import { profile } from '@/data/profile';

export default function BroadcastEmail({ properties = [], articles = [] }) {
  const waUrl = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;

  return (
    <Layout title="Properti Pilihan Minggu Ini">
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">
        Temukan properti terbaik di lokasi strategis dengan harga kompetitif.
      </Text>
      
      <h2 className="text-accent text-[20px] mt-[30px] mb-[15px] font-bold">Properti Unggulan</h2>
      {properties.map((p, idx) => (
        <div key={idx} className="mb-6 border border-[#E6E2D8] rounded-lg overflow-hidden bg-white shadow-sm">
          {p.gambar ? (
            <Img src={p.gambar} alt={p.nama} width="100%" height="200" className="object-cover block" />
          ) : (
            <div className="w-full h-3 bg-brand"></div>
          )}
          <div className="p-5">
            <h3 className="text-brand m-0 mb-2 text-[18px] leading-tight font-bold">{p.nama}</h3>
            <Text className="m-0 mb-3 text-[14px] text-[#666]">📍 {p.lokasi}</Text>
            <Text className="m-0 mb-4 text-accent font-bold text-[18px]">{p.harga}</Text>
            <Text className="m-0 mb-6 text-[14px] text-[#555] leading-relaxed">{p.ringkasan}</Text>
            <Button href={p.url} className="inline-block bg-brand text-white px-6 py-3 no-underline rounded-md font-bold text-[14px] text-center">
              Lihat Detail Properti
            </Button>
          </div>
        </div>
      ))}
      
      <h2 className="text-accent text-[20px] mt-[30px] mb-[15px] font-bold">Update & Tips Properti</h2>
      <ul className="pl-5 m-0">
        {articles.map((a, idx) => (
          <li key={idx} className="mb-2.5">
            <a href={a.url} className="text-[#333] no-underline">{a.judul}</a>
          </li>
        ))}
      </ul>
      
      <h2 className="text-brand text-[20px] mt-[40px] mb-[15px] font-bold">Butuh Konsultasi?</h2>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-2.5">
        Saya siap membantu Anda memilih properti sesuai kebutuhan maupun tujuan investasi. Silakan hubungi saya kapan saja melalui WhatsApp.
      </Text>
      
      <div className="my-[30px]">
        <Button href={waUrl} className="bg-[#25D366] text-white px-6 py-3 no-underline rounded inline-block font-bold">
          Chat via WhatsApp
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
