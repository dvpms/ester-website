"use client";

// src/components/admin/listings/ListingForm.jsx
// Form editor listing properti terbagi atas 2 tab: Informasi Properti & Materi Brosur

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createListing, updateListing } from "@/app/actions/listingActions";
import { generateCuratedBrochureAction } from "@/app/actions/brochureActions";
import { ImageUploader } from "./ImageUploader";
import { MainImageSelector } from "./MainImageSelector";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { BrochurePreviewModal } from "./BrochurePreviewModal";
import {
  toast,
  showSuccessAlert,
  showWarningAlert,
  showErrorAlert,
} from "@/lib/swal";
import {
  HiArrowLeft,
  HiCheck,
  HiExclamationCircle,
  HiPlus,
  HiXMark,
  HiHomeModern,
  HiDocumentText,
  HiSparkles,
  HiStar,
  HiCheckCircle,
  HiArrowTopRightOnSquare,
  HiArrowPath,
  HiPhoto,
  HiDocumentArrowDown,
  HiEye,
  HiInformationCircle,
} from "react-icons/hi2";

export function ListingForm({
  initialData = null,
  kawasanList = [],
  isEdit = false,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("properti"); // 'properti' | 'brosur'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nama: initialData?.nama || "",
    namaEn: initialData?.namaEn || "",
    slug: initialData?.slug || "",
    judulBrosur: initialData?.judulBrosur || "",
    segmen: initialData?.segmen || "secondary",
    jenisProperti: initialData?.jenisProperti || "rumah",
    transaksi: initialData?.transaksi || "dijual",
    kawasanId: initialData?.kawasanId || kawasanList[0]?.id || "",
    harga: initialData?.harga ? String(initialData.harga) : "",
    lokasiDetail: initialData?.lokasiDetail || "",
    status: initialData?.status || "tersedia",
    featured: initialData?.featured || false,
    developerNama: initialData?.developerNama || "",
    pemilikNama: initialData?.pemilikNama || "",
    deskripsi: initialData?.deskripsi || "",
    deskripsiEn: initialData?.deskripsiEn || "",
    tautanMaps: initialData?.tautanMaps || "",
    lat: initialData?.lat ? String(initialData.lat) : "",
    lng: initialData?.lng ? String(initialData.lng) : "",
    // Spesifikasi
    spesifikasi: {
      lt: initialData?.spesifikasi?.lt || "",
      lb: initialData?.spesifikasi?.lb || "",
      kamarTidur: initialData?.spesifikasi?.kamarTidur || "",
      kamarMandi: initialData?.spesifikasi?.kamarMandi || "",
      lantai: initialData?.spesifikasi?.lantai || "2",
      hadap: initialData?.spesifikasi?.hadap || "Utara",
      listrik: initialData?.spesifikasi?.listrik || "2200 VA",
      air: initialData?.spesifikasi?.air || "PAM",
      sertifikat: initialData?.spesifikasi?.sertifikat || "SHM",
    },
    // Tags
    fiturUnggulan: Array.isArray(initialData?.fiturUnggulan)
      ? initialData.fiturUnggulan
      : [],
    bonusInterior: Array.isArray(initialData?.bonusInterior)
      ? initialData.bonusInterior
      : [],
    // Foto
    gambarUtama:
      initialData?.gambarUtama ||
      (Array.isArray(initialData?.galeri) ? initialData.galeri[0] : ""),
    galeri: Array.isArray(initialData?.galeri) ? initialData.galeri : [],
  });

  // Tag inputs state
  const [tagInputFitur, setTagInputFitur] = useState("");
  const [tagInputBonus, setTagInputBonus] = useState("");

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
    setValue("");
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
        gambarUtama: prev.gambarUtama || updatedGallery[0] || "",
      };
    });
  };

  const handleRemoveImage = (urlToRemove) => {
    setFormData((prev) => {
      const updated = prev.galeri.filter((url) => url !== urlToRemove);
      let newMain = prev.gambarUtama;
      if (prev.gambarUtama === urlToRemove) {
        newMain = updated[0] || "";
      }
      return {
        ...prev,
        galeri: updated,
        gambarUtama: newMain,
      };
    });
    if (selectedCover === urlToRemove) {
      setSelectedCover("");
    }
    setSelectedInterior((prev) => prev.filter((u) => u !== urlToRemove));
  };

  // ── Brochure Curation & Generation State ──────────────────────────
  const [brosurUrl, setBrosurUrl] = useState(initialData?.brosurUrl || null);
  const [selectedCover, setSelectedCover] = useState(
    initialData?.gambarUtama ||
      initialData?.galeri?.[0] ||
      formData.galeri?.[0] ||
      "",
  );
  const [selectedInterior, setSelectedInterior] = useState(() => {
    const currentCover =
      initialData?.gambarUtama ||
      initialData?.galeri?.[0] ||
      formData.galeri?.[0] ||
      "";
    const rawList =
      Array.isArray(initialData?.fotoBrosur) && initialData.fotoBrosur.length > 0
        ? initialData.fotoBrosur
        : Array.isArray(initialData?.galeri)
          ? initialData.galeri
          : [];

    // Filter ketat: pastikan foto sampul TIDAK PERNAH masuk dan hanya foto yang ada di galeri
    return rawList
      .filter(
        (img) =>
          img !== currentCover && (formData.galeri || []).includes(img),
      )
      .slice(0, 5);
  });
  const [isGeneratingBrochure, setIsGeneratingBrochure] = useState(false);

  // Sanitasi daftar foto interior: buang foto sampul & buang foto yang tidak ada di galeri saat ini
  const cleanSelectedInterior = selectedInterior.filter(
    (u) => u !== selectedCover && formData.galeri.includes(u),
  );

  const handleSelectCover = (imgUrl) => {
    setSelectedCover(imgUrl);
    // Foto sampul otomatis dikeluarkan dari daftar foto interior
    setSelectedInterior((prev) => prev.filter((u) => u !== imgUrl));
  };

  const handleToggleInterior = (imgUrl) => {
    if (imgUrl === selectedCover) {
      showWarningAlert(
        "Foto Merupakan Sampul",
        "Foto ini sudah dipilih sebagai foto sampul utama lembar brosur.",
      );
      return;
    }

    setSelectedInterior((prev) => {
      // Selalu bersihkan dari foto sampul atau foto yang sudah tidak ada di galeri
      const validPrev = prev.filter(
        (u) => u !== selectedCover && formData.galeri.includes(u),
      );

      if (validPrev.includes(imgUrl)) {
        return validPrev.filter((u) => u !== imgUrl);
      }

      if (validPrev.length >= 5) {
        showWarningAlert(
          "Batas Foto Tercapai",
          "Maksimal 5 foto pendukung interior/fasilitas untuk lembar brosur.",
        );
        return validPrev;
      }

      return [...validPrev, imgUrl];
    });
  };

  const handleGenerateBrochure = async () => {
    if (!isEdit || !initialData?.id) {
      showWarningAlert(
        "Simpan Properti Terlebih Dahulu",
        "Properti baru perlu disimpan ke database terlebih dahulu sebelum berkas brosur cetak Cloudinary dapat dibuat.",
      );
      return;
    }

    if (!selectedCover) {
      showWarningAlert(
        "Foto Sampul Belum Dipilih",
        "Pilih 1 foto sampul utama untuk brosur cetak.",
      );
      return;
    }

    try {
      setIsGeneratingBrochure(true);

      // 1. Simpan pembaruan formulir terkini ke database terlebih dahulu secara otomatis
      await updateListing(initialData.id, formData);

      // 2. Buat brosur HD dengan foto-foto terkurasi
      const res = await generateCuratedBrochureAction({
        listingId: initialData.id,
        coverImage: selectedCover,
        interiorImages: cleanSelectedInterior,
      });

      if (res?.error) {
        showErrorAlert("Gagal Membuat Brosur", res.error);
        return;
      }

      setBrosurUrl(res.brosurUrl);
      showSuccessAlert(
        "Brosur Berhasil Dibuat!",
        "Perubahan data formulir otomatis tersimpan dan lembar cetak A4 Ultra-HD siap di Cloudinary.",
      );
    } catch (err) {
      console.error("Error generating brochure:", err);
      showErrorAlert(
        "Terjadi Kesalahan",
        err.message || "Gagal memproses brosur.",
      );
    } finally {
      setIsGeneratingBrochure(false);
    }
  };

  // Objek listing untuk pratinjau langsung brosur
  const currentKawasan = kawasanList.find((k) => k.id === formData.kawasanId);
  const previewListingData = {
    ...formData,
    id: initialData?.id || "preview-id",
    slug: initialData?.slug || "preview-slug",
    harga: Number(formData.harga) || 0,
    kawasan: currentKawasan || { nama: "BSD City" },
    kawasanId: currentKawasan?.slug || currentKawasan?.nama || "bsd-city",
    gambarUtama:
      selectedCover || formData.gambarUtama || formData.galeri[0] || "",
    galeri: [
      selectedCover || formData.gambarUtama || formData.galeri[0] || "",
      ...cleanSelectedInterior,
    ],
    spesifikasi: formData.spesifikasi,
    fiturUnggulan: formData.fiturUnggulan,
    bonusInterior: formData.bonusInterior,
    judulBrosur: formData.judulBrosur || formData.nama,
    lokasiDetail: formData.lokasiDetail,
    transaksi: formData.transaksi || "Dijual",
    status: formData.status || "Tersedia",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.nama.trim()) {
      setActiveTab("properti");
      setErrorMessage("Nama properti wajib diisi");
      showWarningAlert("Data Belum Lengkap", "Nama properti wajib diisi.");
      return;
    }
    if (!formData.kawasanId) {
      setActiveTab("properti");
      setErrorMessage("Pilih salah satu kawasan");
      showWarningAlert(
        "Data Belum Lengkap",
        "Pilih salah satu kawasan terlebih dahulu.",
      );
      return;
    }
    if (!formData.gambarUtama) {
      setActiveTab("properti");
      setErrorMessage(
        "Unggah minimal 1 foto dan jadikan sebagai foto sampul utama",
      );
      showWarningAlert(
        "Foto Sampul Diperlukan",
        "Unggah minimal 1 foto dan pilih sebagai foto sampul utama.",
      );
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
          icon: "success",
          title: isEdit
            ? "Perubahan berhasil disimpan!"
            : "Properti berhasil ditambahkan!",
        });
        router.push("/admin/properti");
        router.refresh();
      } else {
        showErrorAlert(
          "Gagal Menyimpan Data",
          res.error || "Terjadi kendala saat menyimpan.",
        );
        setErrorMessage(res.error || "Gagal menyimpan data");
      }
    } catch (err) {
      console.error(err);
      showErrorAlert(
        "Kendala Sistem",
        err.message || "Terjadi kesalahan sistem.",
      );
      setErrorMessage(err.message || "Terjadi kesalahan sistem");
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
                {isEdit ? "Edit Properti" : "Tambah Properti"}
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
                <span>{isEdit ? "Simpan Perubahan" : "Simpan Properti"}</span>
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
            onClick={() => setActiveTab("properti")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "properti"
                ? "bg-remax-blue text-white shadow-2xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            <HiHomeModern className="text-base" />
            <span>Properti</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("brosur")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "brosur"
                ? "bg-remax-blue text-white shadow-2xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            <HiDocumentText className="text-base" />
            <span>Brosur</span>
            {(formData.judulBrosur ||
              formData.fiturUnggulan.length > 0 ||
              formData.bonusInterior.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* TAB 1: INFORMASI PROPERTI                                      */}
        {/* ─────────────────────────────────────────────────────────────── */}
        {activeTab === "properti" && (
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
                    onChange={(e) => handleChange("nama", e.target.value)}
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
                    onChange={(e) => handleChange("namaEn", e.target.value)}
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
                    onChange={(e) => handleChange("kawasanId", e.target.value)}
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
                    onChange={(e) => handleChange("harga", e.target.value)}
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
                    onChange={(e) =>
                      handleChange("jenisProperti", e.target.value)
                    }
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
                    onChange={(e) => handleChange("segmen", e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue font-medium"
                  >
                    <option value="secondary">Secondary (Siap Huni)</option>
                    <option value="primary">
                      Primary (Properti Baru Developer)
                    </option>
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
                    onChange={(e) => handleChange("transaksi", e.target.value)}
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
                    onChange={(e) => handleChange("status", e.target.value)}
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
                    onChange={(e) =>
                      handleChange("lokasiDetail", e.target.value)
                    }
                    className="w-full px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: Cluster Naturale, Foresta, BSD City, Tangerang
                    Selatan
                  </p>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleChange("featured", e.target.checked)}
                    className="w-4 h-4 text-remax-blue rounded border-border-c focus:ring-remax-blue"
                  />
                  <label
                    htmlFor="featured"
                    className="text-xs font-semibold text-neutral-900 cursor-pointer"
                  >
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
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Luas Tanah (LT)
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.lt}
                    onChange={(e) => handleSpecChange("lt", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: 180 m²
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Luas Bangunan (LB)
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.lb}
                    onChange={(e) => handleSpecChange("lb", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: 220 m²
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Kamar Tidur (KT)
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.kamarTidur}
                    onChange={(e) =>
                      handleSpecChange("kamarTidur", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: 4+1
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Kamar Mandi (KM)
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.kamarMandi}
                    onChange={(e) =>
                      handleSpecChange("kamarMandi", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: 3+1
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Jumlah Lantai
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.lantai}
                    onChange={(e) => handleSpecChange("lantai", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: 2 Lantai
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Arah Hadap
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.hadap}
                    onChange={(e) => handleSpecChange("hadap", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: Utara / Selatan
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Daya Listrik
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.listrik}
                    onChange={(e) =>
                      handleSpecChange("listrik", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: 2200 VA
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Sumber Air
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.air}
                    onChange={(e) => handleSpecChange("air", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: PAM BSD
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Status Sertifikat
                  </label>
                  <input
                    type="text"
                    value={formData.spesifikasi.sertifikat}
                    onChange={(e) =>
                      handleSpecChange("sertifikat", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Contoh: SHM (Sertifikat Hak Milik)
                  </p>
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
                  Unggah foto-foto terbaik untuk properti ini. Maksimal 5 foto
                  per satu kali unggah.
                </p>
              </div>

              <ImageUploader
                slug={
                  formData.slug ||
                  (formData.nama
                    ? formData.nama.toLowerCase().replace(/\s+/g, "-")
                    : "properti")
                }
                onImagesUploaded={handleImagesUploaded}
              />

              <MainImageSelector
                images={formData.galeri}
                selectedMainImage={formData.gambarUtama}
                onSelectMainImage={(url) => handleChange("gambarUtama", url)}
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
                  Gunakan editor untuk menyusun teks deskripsi dengan format
                  tebal, miring, poin, dan judul.
                </p>
              </div>

              <div>
                <RichTextEditor
                  label="Deskripsi Properti (Bahasa Indonesia)"
                  content={formData.deskripsi}
                  onChange={(html) => handleChange("deskripsi", html)}
                  placeholder="Tuliskan keunggulan lingkungan, kemudahan akses tol, fasilitas cluster, dan alasan terbaik untuk membeli properti ini..."
                />
              </div>

              <div>
                <RichTextEditor
                  label="Deskripsi Properti (English)"
                  content={formData.deskripsiEn}
                  onChange={(html) => handleChange("deskripsiEn", html)}
                  placeholder="English description for international clients..."
                />
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* TAB 2: MATERI BROSUR                                           */}
        {/* ─────────────────────────────────────────────────────────────── */}
        {activeTab === "brosur" && (
          <div className="space-y-6">
            {/* Card Penjelasan Brosur & Panduan Alur Kerja */}
            <div className="bg-blue-tint/70 border border-blue-200 rounded-card p-5 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-remax-blue text-white rounded-btn shrink-0 mt-0.5 shadow-xs">
                  <HiSparkles className="text-lg" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-neutral-900">
                    Panduan Alur & Materi Lembar Brosur Cetak (A4 300 DPI)
                  </h2>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                    Materi di tab ini dicetak khusus pada lembar brosur fisik profesional untuk calon pembeli.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 border border-blue-200/90 rounded-btn p-3.5 text-xs text-neutral-700 space-y-2 shadow-2xs">
                <span className="font-bold text-remax-blue flex items-center gap-1.5 text-[11px]">
                  <HiInformationCircle className="text-sm shrink-0" />
                  Alur Kerja Penyusunan Brosur:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-neutral-600 pl-1 leading-relaxed">
                  <li>
                    <strong className="text-neutral-900">Lengkapi Materi:</strong> Tulis judul khusus brosur, poin keunggulan, serta pilih 1 foto sampul utama dan maksimal 5 foto interior pendukung di bawah.
                  </li>
                  <li>
                    <strong className="text-neutral-900">Pratinjau Brosur (Preview):</strong> Klik tombol <span className="font-semibold text-remax-blue">&quot;Pratinjau Brosur&quot;</span> di bagian bawah kapan saja untuk memeriksa tampilan tata letak cetak secara instan 1:1 tanpa perlu menunggu atau menyimpan dulu.
                  </li>
                  <li>
                    <strong className="text-neutral-900">Buat / Perbarui Brosur HD:</strong> Klik tombol <span className="font-semibold text-remax-blue">&quot;Buat / Perbarui Brosur Siap Cetak&quot;</span>. Sistem akan <em>otomatis menyimpan seluruh data formulir terbaru ke database terlebih dahulu</em>, lalu mencetak berkas resolusi tinggi ke Cloudinary. Anda <u>tidak perlu</u> repot menekan tombol &apos;Simpan Perubahan&apos; terlebih dahulu.
                  </li>
                </ol>
              </div>
            </div>

            {/* Card 1: Judul Brosur */}
            <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-4">
              <div>
                <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3">
                  Judul Khusus Brosur
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Judul promosi yang akan dicetak besar di bagian atas brosur.
                  Jika dikosongkan, judul akan mengikuti nama properti.
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={formData.judulBrosur}
                  onChange={(e) => handleChange("judulBrosur", e.target.value)}
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
                  Daftar fasilitas unggulan atau nilai tambah properti yang
                  ditampilkan di brosur.
                </p>
              </div>

              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInputFitur}
                    onChange={(e) => setTagInputFitur(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(),
                      handleAddTag(
                        "fiturUnggulan",
                        tagInputFitur,
                        setTagInputFitur,
                      ))
                    }
                    className="flex-1 px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleAddTag(
                        "fiturUnggulan",
                        tagInputFitur,
                        setTagInputFitur,
                      )
                    }
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-btn text-xs font-semibold border border-border-c flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <HiPlus /> Tambah
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500 mb-3">
                  Contoh: Kolam Renang Pribadi, Smart Home System, Dekat Akses
                  Tol
                </p>

                <div className="flex flex-wrap gap-2">
                  {formData.fiturUnggulan.length === 0 ? (
                    <p className="text-xs text-neutral-400 italic">
                      Belum ada poin keunggulan yang ditambahkan.
                    </p>
                  ) : (
                    formData.fiturUnggulan.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-blue-tint text-remax-blue text-xs font-semibold border border-blue-200"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag("fiturUnggulan", tag)}
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
                  Daftar furnitur, peralatan, atau bonus lain yang disertakan
                  dalam paket penjualan unit.
                </p>
              </div>

              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInputBonus}
                    onChange={(e) => setTagInputBonus(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(),
                      handleAddTag(
                        "bonusInterior",
                        tagInputBonus,
                        setTagInputBonus,
                      ))
                    }
                    className="flex-1 px-3.5 py-2 bg-white border border-border-c rounded-btn text-xs text-neutral-900 focus:outline-none focus:border-remax-blue"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleAddTag(
                        "bonusInterior",
                        tagInputBonus,
                        setTagInputBonus,
                      )
                    }
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
                    <p className="text-xs text-neutral-400 italic">
                      Belum ada bonus pembelian yang ditambahkan.
                    </p>
                  ) : (
                    formData.bonusInterior.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-neutral-100 text-neutral-900 text-xs font-medium border border-border-c"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag("bonusInterior", tag)}
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

            {/* Card 4: Kurasi Foto Brosur (Sampul & Interior) */}
            <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-6">
              <div>
                <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3 flex items-center justify-between">
                  <span>Kurasi Foto Lembar Brosur</span>
                  <span className="text-xs font-sans font-normal text-neutral-500">
                    {formData.galeri.length} foto tersedia di galeri
                  </span>
                </h2>
                <p className="text-xs text-neutral-500 mt-1.5">
                  Pilih 1 foto fasad utama untuk sampul atas brosur, dan pilih
                  hingga maksimal 5 foto interior/fasilitas untuk galeri strip
                  di bawah spesifikasi.
                </p>
              </div>

              {formData.galeri.length === 0 ? (
                <div className="p-8 text-center bg-neutral-100/50 rounded-btn border border-dashed border-border-c">
                  <HiPhoto className="text-3xl text-neutral-400 mx-auto mb-2" />
                  <p className="text-xs text-neutral-600 font-medium">
                    Belum ada foto galeri.
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Unggah foto pada tab <strong>Informasi Properti</strong>{" "}
                    terlebih dahulu agar dapat dipilih untuk brosur.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 1. Pilih Foto Sampul (1 Foto) */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-2">
                      1. Foto Sampul Utama Brosur (Pilih 1 Foto)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {formData.galeri.map((imgUrl, idx) => {
                        const isCover = selectedCover === imgUrl;
                        return (
                          <div
                            key={`cover-${idx}`}
                            onClick={() => handleSelectCover(imgUrl)}
                            className={`group relative aspect-4/3 rounded-btn overflow-hidden cursor-pointer border-2 transition-all ${
                              isCover
                                ? "border-remax-blue ring-2 ring-remax-blue/20 shadow-sm"
                                : "border-border-c hover:border-neutral-400 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={imgUrl}
                              alt={`Foto ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 50vw, 20vw"
                            />
                            {isCover && (
                              <div className="absolute top-2 left-2 bg-remax-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                <HiStar className="text-xs text-amber-300" />
                                <span>Sampul</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Pilih Foto Pendukung / Interior (Maks 5 Foto) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-neutral-800">
                        2. Foto Interior & Fasilitas Pendukung (Maksimal 5 Foto)
                      </label>
                      <span className="text-[11px] font-semibold text-remax-blue bg-blue-tint px-2.5 py-0.5 rounded-full">
                        Terpilih {cleanSelectedInterior.length} / 5 Foto
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {formData.galeri
                        .filter((img) => img !== selectedCover)
                        .map((imgUrl, idx) => {
                          const isSelected =
                            cleanSelectedInterior.includes(imgUrl);
                          return (
                            <div
                              key={`interior-${idx}`}
                              onClick={() => handleToggleInterior(imgUrl)}
                              className={`group relative aspect-4/3 rounded-btn overflow-hidden cursor-pointer border-2 transition-all ${
                                isSelected
                                  ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                                  : "border-border-c hover:border-neutral-400 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={imgUrl}
                                alt={`Interior ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 50vw, 20vw"
                              />
                              {isSelected ? (
                                <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                  <HiCheckCircle className="text-xs" />
                                  <span>Brosur</span>
                                </div>
                              ) : (
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="bg-white/90 text-neutral-900 text-[10px] font-bold px-2 py-1 rounded shadow">
                                    + Pilih
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Card 5: Generator & Hasil Brosur Siap Cetak */}
            <div className="bg-white border border-border-c rounded-card p-6 shadow-card space-y-4">
              <div>
                <h2 className="text-sm font-bold font-serif text-neutral-900 border-b border-border-c pb-3 flex items-center justify-between">
                  <span>Status & Pembuatan Brosur Cetak</span>
                  {brosurUrl && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <HiCheckCircle className="text-xs" /> Siap Cetak
                    </span>
                  )}
                </h2>
              </div>

              {isEdit ? (
                <div className="flex flex-col sm:flex-row items-start gap-6 pt-2">
                  {/* Preview Thumbnail Brosur */}
                  <div className="w-full sm:w-48 aspect-210/297 bg-neutral-100 border border-border-c rounded-btn overflow-hidden relative shrink-0 shadow-sm flex items-center justify-center text-center p-2">
                    {brosurUrl ? (
                      <Image
                        src={brosurUrl}
                        alt="Preview Brosur"
                        fill
                        className="object-contain"
                        sizes="200px"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-neutral-400 gap-2">
                        <HiDocumentText className="text-4xl" />
                        <span className="text-[10px] font-medium">
                          Brosur Belum Dibuat
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Kontrol & Aksi Brosur */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xs font-bold text-neutral-900">
                        {brosurUrl
                          ? "Lembar Brosur Siap Digunakan"
                          : "Brosur Belum Dibuat"}
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        {brosurUrl
                          ? "Lembar brosur cetak Ultra-HD telah berhasil digenerate dan tersimpan di Cloudinary. Anda dapat langsung membuka file resolusi tinggi untuk dicetak atau dibagikan ke calon pembeli."
                          : "Klik tombol di bawah untuk membuat lembar brosur resolusi tinggi (300 DPI A4) dengan foto sampul dan foto interior yang telah Anda tentukan di atas."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {/* Tombol Pratinjau Brosur Modal */}
                      <button
                        type="button"
                        onClick={() => setIsPreviewOpen(true)}
                        disabled={formData.galeri.length === 0}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 rounded-btn text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                        title="Lihat tampilan lembar brosur 1:1 secara instan sebelum generate"
                      >
                        <HiEye className="text-base text-remax-blue" />
                        <span>Pratinjau Brosur (Preview)</span>
                      </button>

                      {/* Tombol Generate / Update ke Cloudinary */}
                      <button
                        type="button"
                        onClick={handleGenerateBrochure}
                        disabled={
                          isGeneratingBrochure || formData.galeri.length === 0
                        }
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-remax-blue hover:bg-blue-800 disabled:opacity-50 text-white rounded-btn text-xs font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        {isGeneratingBrochure ? (
                          <>
                            <HiArrowPath className="animate-spin text-base" />
                            <span>Memproses Brosur HD (Puppeteer)...</span>
                          </>
                        ) : (
                          <>
                            <HiSparkles className="text-base text-amber-300" />
                            <span>
                              {brosurUrl
                                ? "Update Brosur Siap Cetak"
                                : "Buat Brosur Siap Cetak"}
                            </span>
                          </>
                        )}
                      </button>

                      {brosurUrl && (
                        <a
                          href={brosurUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 border border-border-c text-neutral-900 rounded-btn text-xs font-semibold shadow-2xs transition-colors"
                        >
                          <HiArrowTopRightOnSquare className="text-base text-remax-blue" />
                          <span>Buka Brosur HD (Cloudinary)</span>
                        </a>
                      )}
                    </div>

                    {/* Penjelasan Alur Kerja Eksekusi Brosur */}
                    <div className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-btn text-[11px] text-neutral-600 leading-relaxed">
                      💡 <strong>Petunjuk Alur:</strong> Anda <u>tidak perlu</u> menekan tombol <em>Simpan Perubahan</em> di bawah terlebih dahulu. Mengklik tombol <strong>&quot;{brosurUrl ? "Update Brosur Siap Cetak" : "Buat Brosur Siap Cetak"}&quot;</strong> akan secara otomatis menyimpan seluruh perubahan data formulir terbaru ke database terlebih dahulu, lalu langsung membuat dan mengunggah berkas cetak resolusi tinggi ke Cloudinary.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-btn text-xs text-amber-800 space-y-3">
                  <p>
                    💡 <strong>Informasi:</strong> Simpan data properti terlebih
                    dahulu dengan tombol <em>Simpan Properti</em> di bawah agar tercatat di database. Setelah itu, Anda dapat langsung membuat berkas brosur cetak Cloudinary di halaman ini.
                  </p>
                  {formData.galeri.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsPreviewOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-900 rounded-btn text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <HiEye className="text-base text-amber-700" />
                      <span>Coba Pratinjau Tata Letak Brosur Sekarang</span>
                    </button>
                  )}
                </div>
              )}
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
            {isSubmitting
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Simpan Properti"}
          </button>
        </div>

        {/* ── Interactive Live Brochure Preview Modal ──────────────────── */}
        <BrochurePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          listing={previewListingData}
          onGenerateBrochure={isEdit ? handleGenerateBrochure : null}
          isGeneratingBrochure={isGeneratingBrochure}
        />
      </form>
    );
}
