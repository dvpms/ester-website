import { notFound } from 'next/navigation';
import { artikelList } from '@/data/artikel';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd, generateJsonLd } from '@/lib/seo';
import { ArtikelGrid } from '@/components/sections/ArtikelGrid';
import { formatTanggal } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

// Custom Markdown Parser yang mendukung Headings, Lists, Tables, Blockquotes, Links, dan Formatting
function parseMarkdown(mdText) {
  if (!mdText) return null;
  const lines = mdText.split('\n');
  const elements = [];
  let listItems = [];
  let tableRows = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul className="list-disc pl-6 mb-5 font-sans text-body text-neutral-800 leading-relaxed space-y-1.5" key={`ul-${elements.length}`}>
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(1);
      elements.push(
        <div className="overflow-x-auto my-6 rounded-card border border-border-c shadow-card" key={`table-${elements.length}`}>
          <table className="min-w-full divide-y divide-border-c text-left font-sans text-sm">
            <thead className="bg-neutral-100 text-neutral-900 font-semibold">
              <tr>
                {headerRow.map((cell, cIdx) => (
                  <th key={cIdx} className="px-4 py-3 border-r border-border-c last:border-r-0">
                    {processInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-c bg-white text-neutral-800">
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white hover:bg-neutral-50' : 'bg-neutral-50/50 hover:bg-neutral-50'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 border-r border-border-c last:border-r-0">
                      {processInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
  };

  const flushAll = () => {
    flushList();
    flushTable();
  };

  const processInline = (text) => {
    if (!text) return '';
    // Match links [label](url), bold **text**, and italic *text*
    const tokens = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*)/g);
    return tokens.map((token, i) => {
      if (!token) return null;
      if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
        const match = token.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, label, href] = match;
          const isInternal = href.startsWith('/');
          return (
            <a
              key={i}
              href={href}
              className="text-remax-blue font-medium underline underline-offset-2 hover:text-remax-red transition-colors"
              {...(!isInternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {processInline(label)}
            </a>
          );
        }
      }
      if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
        return <strong key={i} className="font-semibold text-neutral-900">{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
        return <em key={i} className="italic">{token.slice(1, -1)}</em>;
      }
      return token;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      // Skip separator rows like | :--- | :--- |
      if (/^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(trimmed)) {
        return;
      }
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      tableRows.push(cells);
    } else if (trimmed.startsWith('# ')) {
      flushAll();
      elements.push(<h1 key={index} className="font-serif text-h1 text-remax-blue mb-6 mt-8">{processInline(trimmed.slice(2))}</h1>);
    } else if (trimmed.startsWith('## ')) {
      flushAll();
      elements.push(<h2 key={index} className="font-serif text-h2 text-remax-blue mb-4 mt-8">{processInline(trimmed.slice(3))}</h2>);
    } else if (trimmed.startsWith('### ')) {
      flushAll();
      elements.push(<h3 key={index} className="font-serif text-h3 text-neutral-900 font-semibold mb-3 mt-6">{processInline(trimmed.slice(4))}</h3>);
    } else if (trimmed.startsWith('---')) {
      flushAll();
      elements.push(<hr key={index} className="my-8 border-border-c" />);
    } else if (trimmed.startsWith('> ')) {
      flushAll();
      elements.push(
        <blockquote key={index} className="border-l-4 border-remax-blue bg-blue-tint/30 px-4 py-3 rounded-r-card my-4 text-neutral-700 font-sans text-body">
          {processInline(trimmed.slice(2))}
        </blockquote>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushTable();
      listItems.push(<li key={index} className="mb-1.5">{processInline(trimmed.slice(2))}</li>);
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushTable();
      const content = trimmed.replace(/^\d+\.\s/, '');
      listItems.push(<li key={index} className="mb-1.5">{processInline(content)}</li>);
    } else if (trimmed === '') {
      flushAll();
    } else {
      flushAll();
      elements.push(<p key={index} className="font-sans text-body text-neutral-900 leading-relaxed mb-4">{processInline(line)}</p>);
    }
  });

  flushAll();
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
            <Image 
              src={artikel.thumbnail} 
              alt={artikel.judul} 
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
              className="object-cover"
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
