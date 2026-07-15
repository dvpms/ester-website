import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Row,
  Column,
  Tailwind,
} from 'react-email';
import { profile } from '@/data/profile';

const AGENT_PROFILE = {
  nama: profile.name,
  telepon: profile.phone,
  email: profile.email,
  websiteUrl: profile.websiteUrl,
  fotoUrl: profile.image,
};

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        brand: "#003DA5",
        accent: "#E11B22",
      },
    },
  },
};

export default function Layout({ title, children }) {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head />
        <Body className="bg-[#F5F5F5] font-sans px-5 py-10">
          <Container className="bg-white mx-auto max-w-[600px] rounded-xl overflow-hidden shadow-lg text-[#333333]">
            {/* HEADER */}
            <Section className="bg-brand px-8 py-5">
              <Row>
                <Column className="w-[52px]">
                  <Img
                    src="https://res.cloudinary.com/dnmhna2fc/image/upload/v1784086093/potrait_u2zsce.png"
                    alt="REMAX"
                    width="42"
                    className="block border-0"
                  />
                </Column>
                <Column>
                  <Text className="text-white text-2xl font-bold leading-tight m-0">Esther REMAX</Text>
                  <Text className="text-[#D7E4FF] text-sm mt-1 m-0">Property Consultant</Text>
                </Column>
              </Row>
            </Section>

            {/* CONTENT */}
            <Section className="px-9 py-10">
              <Text className="m-0 mb-5 text-[#1A1A1A] text-2xl leading-tight font-bold">{title}</Text>
              <div className="text-[15px] text-[#555555] leading-relaxed">
                {children}
              </div>
            </Section>

            {/* FOOTER */}
            <Section className="bg-[#F1EFE8] px-8 py-7 border-t border-[#E6E2D8]">
              <div className="mt-10 pt-5 border-t border-gray-300">
                <Row className="w-full">
                  <Column className="w-[80px] pr-4 align-top">
                    <Img
                      src={AGENT_PROFILE.fotoUrl}
                      alt={AGENT_PROFILE.nama}
                      width="80"
                      height="80"
                      className="w-20 h-20 rounded-full object-cover block"
                    />
                  </Column>
                  <Column className="align-top">
                    <Text className="text-brand text-sm font-bold m-0 mb-1">{AGENT_PROFILE.nama}</Text>
                    <Text className="text-xs text-gray-500 leading-snug m-0">
                      Konsultan Properti REMAX Future<br />
                      📞 {AGENT_PROFILE.telepon}<br />
                      ✉ {AGENT_PROFILE.email}<br />
                      🌐 <a href={AGENT_PROFILE.websiteUrl} className="text-brand no-underline">{AGENT_PROFILE.websiteUrl}</a>
                    </Text>
                  </Column>
                </Row>
                <Text className="mt-4 text-[11px] text-gray-400 leading-normal">
                  Email ini dikirim secara otomatis oleh sistem.<br />
                  Apabila Anda menerima email ini karena pernah menghubungi kami melalui website, Anda dapat mengabaikannya jika sudah tidak memerlukan informasi lebih lanjut.
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
