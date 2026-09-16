'use client';

// src/components/admin/listings/ListingForm.jsx
// Form editor listing properti terbagi atas 2 tab: Informasi Properti & Materi Brosur

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createListing, updateListing } from '@/app/actions/listingActions';
import { ImageUploader } from './ImageUploader';
import { MainImageSelector } from './MainImageSelector';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { toast, showWarningAlert, showErrorAlert } from '@/lib/swal';
import {
  HiArrowLeft,
  HiCheck,
  HiExclamationCircle,
  HiPlus,
  HiXMark,
  HiHomeModern,
  HiDocumentText,
  HiSparkles,
} from 'react-icons/hi2';

export function ListingForm({ initialData = null, kawasanList = [], isEdit = false }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('properti'); // 'properti' | 'brosur'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    nama: initialData?.nama || '',
    namaEn: initialData?.namaEn || '',
    slug: initialData?.slug || '',
    judulBrosur: initialData?.judulBrosur || '',
    segmen: initialData?.segmen || 'secondary',
    jenisProperti: initialData?.jenisProperti || 'rumah',
    transaksi: initialData?.transaksi || 'dijual',
    kawasanId: initialData?.kawasanId || (kawasanList[0]?.id || ''),
    harga: initialData?.harga ? String(initialData.harga) : '',
    lokasiDetail: initialData?.lokasiDetail || '',
    status: initialData?.status || 'tersedia',
    featured: initialData?.featured || false,
    developerNama: initialData?.developerNama || '',
    pemilikNama: initialData?.pemilikNama || '',
    deskripsi: initialData?.deskripsi || '',
    deskripsiEn: initialData?.deskripsiEn || '',
    tautanMaps: initialData?.tautanMaps || '',
    lat: initialData?.lat ? String(initialData.lat) : '',
    lng: initialData?.lng ? String(initialData.lng) : '',
    // Spesifikasi
    spesifikasi: {
      lt: initialData?.spesifikasi?.lt || '',
      lb: initialData?.spesifikasi?.lb || '',
      kamarTidur: initialData?.spesifikasi?.kamarTidur || '',
      kamarMandi: initialData?.spesifikasi?.kamarMandi || '',
      lantai: initialData?.spesifikasi?.lantai || '2',
      hadap: initialData?.spesifikasi?.hadap || 'Utara',
      listrik: initialData?.spesifikasi?.listrik || '2200 VA',
      air: initialData?.spesifikasi?.air || 'PAM',
      sertifikat: initialData?.spesifikasi?.sertifikat || 'SHM',
    },
    // Tags
    fiturUnggulan: Array.isArray(initialData?.fiturUnggulan) ? initialData.fiturUnggulan : [],
    bonusInterior: Array.isArray(initialData?.bonusInterior) ? initialData.bonusInterior : [],
    // Foto
    gambarUtama: initialData?.gambarUtama || (Array.isArray(initialData?.galeri) ? initialData.galeri[0] : ''),
    galeri: Array.isArray(initialData?.galeri) ? initialData.galeri : [],
  });

  // Tag inputs state
  const [tagInputFitur, setTagInputFitur] = useState('');
  const [tagInputBonus, setTagInputBonus] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecChange = (specKey, value) => {
    setFormData((prev) => ({
      ...prev,
      spesifikasi: { ...prev.spesifikasi, [specKey]: value },
    }));
  };

  const handleAddTag = (type, value, setValue) => {
    if (!value.trim()) return;
    if (formData[type].includes(value.trim())) return;
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], value.trim()] }));
    setValue('');
  };

  const handleRemoveTag = (type, tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((t) => t !== tagToRemove),
    }));
  };

  const handleImagesUploaded = (newUrls) => {
    setFormData((prev) => {
      const updatedGallery = [...prev.galeri, ...newUrls];
      return {
        ...prev,
        galeri: updatedGallery,
        gambarUtama: prev.gambarUtama || updatedGallery[0] || '',
      };
    });
  };

  const handleRemoveImage = (urlToRemove) => {
    setFormData((prev) => {
      const updated = prev.galeri.filter((url) => url !== urlToRemove);
      let newMain = prev.gambarUtama;
      if (prev.gambarUtama === urlToRemove) {
        newMain = updated[0] || '';
      }
      return {
        ...prev,
        galeri: updated,
        gambarUtama: newMain,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.nama.trim()) {
      setActiveTab('properti');
      setErrorMessage('Nama properti wajib diisi');
      showWarningAlert('Data Belum Lengkap', 'Nama properti wajib diisi.');
      return;
    }
    if (!formData.kawasanId) {
      setActiveTab('properti');
      setErrorMessage('Pilih salah satu kawasan');
      showWarningAlert('Data Belum Lengkap', 'Pilih salah satu kawasan terlebih dahulu.');
      return;
    }
    if (!formData.gambarUtama) {
      setActiveTab('properti');
      setErrorMessage('Unggah minimal 1 foto dan jadikan sebagai foto sampul utama');
      showWarningAlert('Foto Sampul Diperlukan', 'Unggah minimal 1 foto dan pilih sebagai foto sampul utama.');
      return;
    }

    try {
      setIsSubmitting(true);
      let res;

      if (isEdit && initialData?.id) {
        res = await updateListing(initialData.id, formData);
      } else {
        res = await createListing(formData);
      }

      if (res.success) {
        toast.fire({
          icon: 'success',
          title: isEdit ? 'Perubahan berhasil disimpan!' : 'Properti berhasil ditambahkan!',
        });
        router.push('/admin/properti');
        router.refresh();
      } else {
        showErrorAlert('Gagal Menyimpan Data', res.error || 'Terjadi kendala saat menyimpan.');
        setErrorMessage(res.error || 'Gagal menyimpan data');
      }
    } catch (err) {
      console.error(err);
      showErrorAlert('Kendala Sistem', err.message || 'Terjadi kesalahan sistem.');
      setErrorMessage(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans pb-12">
      {/* ── Top Header Bar ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-c">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/properti"
            className="p-2 rounded-btn text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <HiArrowLeft className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900">
              {isEdit ? 'Edit Properti' : 'Tambah Properti'}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Lengkapi informasi properti dan materi brosur di bawah ini.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-remax-blue hover:bg-blue-800 disabled:opacity-50 text-white rounded-btn text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <HiCheck className="text-base" />
              <span>{isEdit ? 'Simpan Perubahan' : 'Simpan Properti'}</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-3 p-4 bg-red-tint border border-red-200 rounded-btn text-xs text-error">
          <HiExclamationCircle className="text-lg shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ── TAB NAVIGATION ───────────────────────────────────────────── */}
      <div className="flex border-b border-border-c bg-white rounded-card p-1 shadow-card gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('properti')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'properti'
              ? 'bg-remax-blue text-white shadow-2xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <HiHomeModern className="text-base" />
          <span>Properti</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('brosur')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'brosur'
              ? 'bg-remax-blue text-white shadow-2xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <HiDocumentText className="text-base" />
          <span>Brosur</span>
          {(formData.judulBrosur || formData.fiturUnggulan.length > 0 || formData.bonusInterior.length > 0) && (
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* TAB 1: INFORMASI PROPERTI                                      */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {activeTab === 'properti' && (
        <div className="space-y-6">
          {/* Card 1: Informasi Dasar */}
          <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-5">
            <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3">
              Informasi Dasar
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Nama Properti (Bahasa Indonesia) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => handleChange('nama', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Contoh: Rumah Minimalis 2 Lantai Foresta BSD City
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Nama Properti (English)
                </label>
                <input
                  type="text"
                  value={formData.namaEn}
                  onChange={(e) => handleChange('namaEn', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Contoh: 2-Storey Minimalist House at Foresta BSD City
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Kawasan *
                </label>
                <select
                  required
                  value={formData.kawasanId}
                  onChange={(e) => handleChange('kawasanId', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
                >
                  {kawasanList.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Pilih area kawasan lokasi properti berada
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Harga (Rupiah) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.harga}
                  onChange={(e) => handleChange('harga', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 font-mono font-semibold focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Contoh: 3500000000 (Tulis angka saja tanpa titik atau koma)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Jenis Properti
                </label>
                <select
                  value={formData.jenisProperti}
                  onChange={(e) => handleChange('jenisProperti', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium capitalize"
                >
                  <option value="rumah">Rumah</option>
                  <option value="ruko">Ruko / Rukan</option>
                  <option value="kavling">Tanah Kavling</option>
                  <option value="apartemen">Apartemen</option>
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Kategori bentuk bangunan properti
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Segmen Pasar
                </label>
                <select
                  value={formData.segmen}
                  onChange={(e) => handleChange('segmen', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
                >
                  <option value="secondary">Secondary (Siap Huni)</option>
                  <option value="primary">Primary (Properti Baru Developer)</option>
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Status kepemilikan unit (baru atau siap huni)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Jenis Transaksi
                </label>
                <select
                  value={formData.transaksi}
                  onChange={(e) => handleChange('transaksi', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
                >
                  <option value="dijual">Dijual</option>
                  <option value="disewakan">Disewakan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Status Ketersediaan
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
                >
                  <option value="tersedia">Tersedia</option>
                  <option value="proses">Dalam Proses</option>
                  <option value="terjual">Terjual</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  Alamat Lengkap / Lokasi Detail
                </label>
                <input
                  type="text"
                  value={formData.lokasiDetail}
                  onChange={(e) => handleChange('lokasiDetail', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Contoh: Cluster Naturale, Foresta, BSD City, Tangerang Selatan
                </p>
              </div>

              <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="w-4 h-4 text-remax-blue rounded border-border-c focus:ring-remax-blue"
                />
                <label htmlFor="featured" className="text-xs font-semibold text-neutral-900 cursor-pointer">
                  Tampilkan sebagai Properti Rekomendasi di Halaman Depan
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Spesifikasi Properti */}
          <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-5">
            <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3">
              Spesifikasi Properti
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Luas Tanah (LT)</label>
                <input
                  type="text"
                  value={formData.spesifikasi.lt}
                  onChange={(e) => handleSpecChange('lt', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: 180 m²</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Luas Bangunan (LB)</label>
                <input
                  type="text"
                  value={formData.spesifikasi.lb}
                  onChange={(e) => handleSpecChange('lb', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: 220 m²</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Kamar Tidur (KT)</label>
                <input
                  type="text"
                  value={formData.spesifikasi.kamarTidur}
                  onChange={(e) => handleSpecChange('kamarTidur', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: 4+1</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Kamar Mandi (KM)</label>
                <input
                  type="text"
                  value={formData.spesifikasi.kamarMandi}
                  onChange={(e) => handleSpecChange('kamarMandi', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: 3+1</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Jumlah Lantai</label>
                <input
                  type="text"
                  value={formData.spesifikasi.lantai}
                  onChange={(e) => handleSpecChange('lantai', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: 2 Lantai</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Arah Hadap</label>
                <input
                  type="text"
                  value={formData.spesifikasi.hadap}
                  onChange={(e) => handleSpecChange('hadap', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: Utara / Selatan</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Daya Listrik</label>
                <input
                  type="text"
                  value={formData.spesifikasi.listrik}
                  onChange={(e) => handleSpecChange('listrik', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: 2200 VA</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Sumber Air</label>
                <input
                  type="text"
                  value={formData.spesifikasi.air}
                  onChange={(e) => handleSpecChange('air', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: PAM BSD</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">Status Sertifikat</label>
                <input
                  type="text"
                  value={formData.spesifikasi.sertifikat}
                  onChange={(e) => handleSpecChange('sertifikat', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Contoh: SHM (Sertifikat Hak Milik)</p>
              </div>
            </div>
          </div>

          {/* Card 3: Foto & Galeri */}
          <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-6">
            <div>
              <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3">
                Foto & Galeri
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Unggah foto-foto terbaik untuk properti ini. Maksimal 5 foto per satu kali unggah.
              </p>
            </div>

            <ImageUploader
              slug={formData.slug || (formData.nama ? formData.nama.toLowerCase().replace(/\s+/g, '-') : 'properti')}
              onImagesUploaded={handleImagesUploaded}
            />

            <MainImageSelector
              images={formData.galeri}
              selectedMainImage={formData.gambarUtama}
              onSelectMainImage={(url) => handleChange('gambarUtama', url)}
              onRemoveImage={handleRemoveImage}
            />
          </div>

          {/* Card 4: Deskripsi Lengkap (Rich Text) */}
          <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-6">
            <div>
              <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3">
                Deskripsi Lengkap
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Gunakan editor untuk menyusun teks deskripsi dengan format tebal, miring, poin, dan judul.
              </p>
            </div>

            <div>
              <RichTextEditor
                label="Deskripsi Properti (Bahasa Indonesia)"
                content={formData.deskripsi}
                onChange={(html) => handleChange('deskripsi', html)}
                placeholder="Tuliskan keunggulan lingkungan, kemudahan akses tol, fasilitas cluster, dan alasan terbaik untuk membeli properti ini..."
              />
            </div>

            <div>
              <RichTextEditor
                label="Deskripsi Properti (English)"
                content={formData.deskripsiEn}
                onChange={(html) => handleChange('deskripsiEn', html)}
                placeholder="English description for international clients..."
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* TAB 2: MATERI BROSUR                                           */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {activeTab === 'brosur' && (
        <div className="space-y-6">
          {/* Card Penjelasan Brosur */}
          <div className="bg-blue-tint/60 border border-blue-200 rounded-card p-5 flex items-start gap-3">
            <div className="p-2 bg-remax-blue text-white rounded-btn shrink-0">
              <HiSparkles className="text-lg" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-neutral-900">
                Pengaturan Materi Promosi Brosur Cetak
              </h2>
              <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                Informasi di halaman ini digunakan khusus saat mencetak lembar brosur A4 profesional. Pastikan poin-poin keunggulan dan bonus dibuat ringkas dan menarik perhatian calon pembeli.
              </p>
            </div>
          </div>

          {/* Card 1: Judul Brosur */}
          <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-4">
            <div>
              <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3">
                Judul Khusus Brosur
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Judul promosi yang akan dicetak besar di bagian atas brosur. Jika dikosongkan, judul akan mengikuti nama properti.
              </p>
            </div>

            <div>
              <input
                type="text"
                value={formData.judulBrosur}
                onChange={(e) => handleChange('judulBrosur', e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 uppercase font-semibold focus:outline-none focus:border-remax-blue"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Contoh: LUXURY LIVING AT FORESTA BSD CITY
              </p>
            </div>
          </div>

          {/* Card 2: Poin Keunggulan Properti */}
          <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-4">
            <div>
              <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3">
                Poin Keunggulan Properti
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Daftar fasilitas unggulan atau nilai tambah properti yang ditampilkan di brosur.
              </p>
            </div>

            <div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInputFitur}
                  onChange={(e) => setTagInputFitur(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('fiturUnggulan', tagInputFitur, setTagInputFitur))}
                  className="flex-1 px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag('fiturUnggulan', tagInputFitur, setTagInputFitur)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-btn text-xs font-semibold border border-border-c flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <HiPlus /> Tambah
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 mb-3">
                Contoh: Kolam Renang Pribadi, Smart Home System, Dekat Akses Tol
              </p>

              <div className="flex flex-wrap gap-2">
                {formData.fiturUnggulan.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic">Belum ada poin keunggulan yang ditambahkan.</p>
                ) : (
                  formData.fiturUnggulan.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-blue-tint text-remax-blue text-xs font-semibold border border-blue-200"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag('fiturUnggulan', tag)}
                        className="hover:text-remax-red"
                      >
                        <HiXMark className="text-sm" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Bonus Pembelian */}
          <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-4">
            <div>
              <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3">
                Bonus Pembelian
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Daftar furnitur, peralatan, atau bonus lain yang disertakan dalam paket penjualan unit.
              </p>
            </div>

            <div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInputBonus}
                  onChange={(e) => setTagInputBonus(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('bonusInterior', tagInputBonus, setTagInputBonus))}
                  className="flex-1 px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag('bonusInterior', tagInputBonus, setTagInputBonus)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-btn text-xs font-semibold border border-border-c flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <HiPlus /> Tambah
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 mb-3">
                Contoh: Kitchen Set Marmer, 4 Unit AC Daikin, Water Heater
              </p>

              <div className="flex flex-wrap gap-2">
                {formData.bonusInterior.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic">Belum ada bonus pembelian yang ditambahkan.</p>
                ) : (
                  formData.bonusInterior.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-neutral-100 text-neutral-900 text-xs font-medium border border-border-c"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag('bonusInterior', tag)}
                        className="hover:text-remax-red"
                      >
                        <HiXMark className="text-sm" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Submit Bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-4 border-t border-border-c">
        <Link
          href="/admin/properti"
          className="px-5 py-2 bg-white hover:bg-neutral-100 border border-border-c text-neutral-900 rounded-btn text-xs font-semibold transition-colors"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-remax-blue hover:bg-blue-800 disabled:opacity-50 text-white rounded-btn text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          {isSubmitting ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Simpan Properti')}
        </button>
      </div>
    </form>
  );
}
