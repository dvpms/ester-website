'use client';

import { useState } from 'react';
import { listings } from '@/data/listings';
import { BrochureTemplate } from '@/components/brochure/BrochureTemplate';
import { formatHarga } from '@/lib/utils';

export default function PreviewBrosurPage() {
  const [selectedSlug, setSelectedSlug] = useState(listings[0]?.slug || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const listing = listings.find((l) => l.slug === selectedSlug) || listings[0];

  async function handleGenerateToCloudinary() {
    setIsGenerating(true);
    setUploadedUrl('');
    try {
      const res = await fetch(`/api/brochure/generate?slug=${selectedSlug}`);
      const data = await res.json();
      if (data.success && data.cloudinaryUrl) {
        setUploadedUrl(data.cloudinaryUrl);
      } else {
        alert('Gagal generate brosur: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCopy() {
    if (!uploadedUrl) return;
    navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4 flex flex-col items-center">
      {/* ── CONTROLS BAR ─────────────────────────────────────── */}
      <div className="w-full max-w-[794px] bg-black border border-slate-700 p-4 rounded-xl shadow-2xl mb-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="select-listing" className="text-sm font-semibold text-slate-200 shrink-0">
              Pilih Properti:
            </label>
            <select
              id="select-listing"
              value={selectedSlug}
              onChange={(e) => {
                setSelectedSlug(e.target.value);
                setUploadedUrl('');
              }}
              className="w-full sm:w-80 px-3 py-2 text-sm bg-black border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
            >
              {listings.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.nama} ({formatHarga(item.harga)})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/api/brochure/generate?slug=${selectedSlug}&download=true`}
              download={`brosur-${selectedSlug}.jpg`}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5"
            >
              <span>📥</span> Unduh Gambar Asli
            </a>
            <button
              onClick={handleGenerateToCloudinary}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#003DA5] hover:bg-blue-800 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-all shadow-md"
            >
              {isGenerating ? 'Memproses Gambar...' : 'Upload Gambar ke Cloudinary'}
            </button>
          </div>
        </div>

        {/* CLOUDINARY RESULT BAR */}
        {uploadedUrl && (
          <div className="bg-emerald-950/80 border border-emerald-600/50 p-3 rounded-lg flex items-center justify-between gap-3 text-xs text-emerald-200 animate-fadeIn">
            <div className="truncate flex-1">
              <span className="font-bold text-emerald-400 block">Cloudinary Image URL:</span>
              <span className="font-mono text-[11px] select-all">{uploadedUrl}</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs shrink-0 transition-all"
            >
              {copied ? 'Tersalin! ✓' : 'Salin URL'}
            </button>
          </div>
        )}
      </div>

      {/* ── MODULAR A4 BROCHURE TEMPLATE ──────────────────────── */}
      <BrochureTemplate listing={listing} />
    </div>
  );
}
