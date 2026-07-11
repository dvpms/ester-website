import { notFound } from 'next/navigation';
import { artikelList } from '@/data/artikel';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd, generateJsonLd } from '@/lib/seo';
import { ArtikelGrid } from '@/components/sections/ArtikelGrid';
import { formatTanggal } from '@/lib/utils';
import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

// Custom Simple Markdown Parser (Sesuai instruksi untuk tidak install library tambahan)
function parseMarkdown(mdText) {
  if (!mdText) return null;
  const lines = mdText.split('\n');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(<ul className="list-disc pl-5 mb-4 font-sans text-body text-neutral-900 leading-relaxed" key={`ul-${elements.length}`}>{listItems}</ul>);
      listItems = [];
    }
  };

  const processInline = (text) => {
    // Process **bold** and *italic*
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(<h1 key={index} className="font-serif text-h1 text-remax-blue mb-6 mt-8">{processInline(trimmed.slice(2))}</h1>);
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={index} className="font-serif text-h2 text-remax-blue mb-4 mt-8">{processInline(trimmed.slice(3))}</h2>);
    } else if (trimmed.startsWith('---')) {
      flushList();
      elements.push(<hr key={index} className="my-8 border-border-c" />);
    } else if (trimmed.startsWith('- ')) {
      listItems.push(<li key={index} className="mb-2">{processInline(trimmed.slice(2))}</li>);
    } else if (trimmed === '') {
      flushList();
    } else {
      flushList();
      elements.push(<p key={index} className="font-sans text-body text-neutral-900 leading-relaxed mb-4">{processInline(line)}</p>);
    }
  });
  flushList();

  return <>{elements}</>;
}

export async function generateStaticParams() {
  return artikelList.map((artikel) => ({
    slug: artikel.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // await params in Next.js 15+
  const artikel = artikelList.find((a) => a.slug === slug);
  if (!artikel) return {};

  return {
    title: `${artikel.judul} | Esther REMAX`,
    description: artikel.ringkasan,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: artikel.judul,
      description: artikel.ringkasan,
      images: [{ url: artikel.thumbnail, width: 800, height: 600, alt: artikel.judul }],
    }
  };
}

export default async function ArtikelDetailPage({ params }) {
  const { slug } = await params;
  const artikel = artikelList.find((a) => a.slug === slug);

  if (!artikel) {
    notFound();
  }

  // Get related articles based on tagKawasan, excluding the current one
  const relatedArticles = artikelList
    .filter(a => a.id !== artikel.id && a.tagKawasan.some(tag => artikel.tagKawasan.includes(tag)))
    .slice(0, 3);

  const jsonLd = generateJsonLd('Article', {
    headline: artikel.judul,
    description: artikel.ringkasan,
    image: artikel.thumbnail,
    datePublished: artikel.tanggalPublish,
    author: {
      '@type': 'Person',
      name: 'Esther',
      url: `${SITE_URL}/tentang`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Esther REMAX',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`
      }
    }
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      
      <main className="min-h-screen bg-white pb-section">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="flex items-center gap-2 text-sm font-sans text-neutral-600 mb-6">
            <span>{formatTanggal(artikel.tanggalPublish, 'id')}</span>
            <span>•</span>
            <span>Oleh Esther</span>
          </div>
          <h1 className="font-serif text-h1 md:text-5xl lg:text-6xl text-remax-blue leading-tight mb-8">
            {artikel.judul}
          </h1>
          <div className="w-full aspect-video rounded-card overflow-hidden shadow-card relative">
            <img 
              src={artikel.thumbnail} 
              alt={artikel.judul} 
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {parseMarkdown(artikel.konten)}
        </article>
      </main>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-neutral-50 py-section border-t border-border-c">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArtikelGrid artikelList={relatedArticles} title="Baca Artikel Terkait" lang="id" />
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABand
        variant="whatsapp"
        lang="id"
        customHeadline="Punya Pertanyaan Seputar Properti?"
        customSub="Jangan ragu untuk mendiskusikannya dengan saya."
      />
    </>
  );
}
