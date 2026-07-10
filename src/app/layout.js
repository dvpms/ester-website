// src/app/layout.js
// Root layout — font Inter + Playfair Display, Header, Footer, WhatsAppButton global.

import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

export const metadata = {
  title: {
    template: '%s | Esther Property',
    default: 'Esther Property — Spesialis Properti Kawasan Tangerang Selatan',
  },
  description:
    'Agent properti terpercaya untuk BSD City, Gading Serpong, Alam Sutera, dan Bintaro. Properti primary & secondary, dijual dan disewakan.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com'),
  openGraph: {
    siteName: 'Esther Property',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

/**
 * Root layout — membungkus semua halaman dengan Header, Footer, dan WhatsAppButton.
 * Header dan WhatsAppButton adalah Client Components; Footer adalah Server Component.
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="bg-white text-neutral-900 font-sans antialiased">
        {/* Header sticky — pt pada main mengkompensasi tinggi header */}
        <Header />

        <main className="pt-[72px]">
          {children}
        </main>

        <Footer />

        {/* Floating WhatsApp CTA — selalu visible di semua halaman */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
