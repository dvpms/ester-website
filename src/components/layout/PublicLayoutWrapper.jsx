'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { PageTransitionWrapper } from '@/components/animations/PageTransitionWrapper';

/**
 * PublicLayoutWrapper
 * 
 * Membungkus konten halaman publik dengan elemen navigasi utama (Header, Footer,
 * tombol WhatsApp melayang, dan PageTransitionWrapper).
 * 
 * Secara dinamis memeriksa rute aktif: jika rute diawali dengan '/admin'
 * atau rute print brosur, elemen chrome publik tidak akan di-render agar
 * layout dashboard/auth admin beroperasi secara independen tanpa benturan styling.
 * 
 * @param {{ children: React.ReactNode }} props
 */
export function PublicLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isPrintPage = pathname?.startsWith('/preview-brosur/print');

  // Jika berada di area admin atau halaman cetak khusus, render children tanpa chrome publik
  if (isAdmin || isPrintPage) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Header sticky — pt pada main mengkompensasi tinggi header */}
      <Header />

      <main className="pt-[72px]">
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </main>

      <Footer />

      {/* Floating WhatsApp CTA — selalu visible di halaman publik */}
      <WhatsAppButton />
    </>
  );
}
