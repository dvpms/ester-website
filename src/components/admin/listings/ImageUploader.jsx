'use client';

// src/components/admin/listings/ImageUploader.jsx
// Komponen upload foto properti dengan pembatasan maksimal 5 berkas per proses

import { useState, useRef } from 'react';
import { HiArrowUpTray, HiExclamationCircle, HiInformationCircle } from 'react-icons/hi2';

const MAX_FILES_PER_BATCH = 5;

export function ImageUploader({ slug = 'properti', onImagesUploaded }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [noticeMessage, setNoticeMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFiles = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setErrorMessage(null);
    setNoticeMessage(null);

    let filesToUpload = Array.from(selectedFiles);

    // Batasi maksimal 5 foto per satu kali proses
    if (filesToUpload.length > MAX_FILES_PER_BATCH) {
      setNoticeMessage(
        `Anda memilih ${filesToUpload.length} foto. Untuk menjaga proses unggah tetap cepat dan stabil, hanya ${MAX_FILES_PER_BATCH} foto pertama yang akan diproses.`
      );
      filesToUpload = filesToUpload.slice(0, MAX_FILES_PER_BATCH);
    }

    setIsUploading(true);
    const newUploadedUrls = [];

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      setUploadProgress(`Mengunggah foto ${i + 1} dari ${filesToUpload.length}...`);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('slug', slug || 'properti');

      try {
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || `Gagal mengunggah foto "${file.name}"`);
        }

        newUploadedUrls.push(data.url);
      } catch (err) {
        console.error('Upload error:', err);
        setErrorMessage(err.message || 'Terjadi kesalahan saat mengunggah foto');
        break;
      }
    }

    setIsUploading(false);
    setUploadProgress(null);

    if (newUploadedUrls.length > 0) {
      onImagesUploaded(newUploadedUrls);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isUploading) return;
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-3 font-sans">
      {/* Dropzone Box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-card p-6 sm:p-8 text-center cursor-pointer transition-all ${
          isUploading
            ? 'border-remax-blue/50 bg-blue-tint/20 cursor-wait'
            : 'border-border-c hover:border-remax-blue/60 bg-neutral-100/40 hover:bg-neutral-100/70'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="w-12 h-12 rounded-full bg-blue-tint text-remax-blue flex items-center justify-center text-xl shadow-2xs">
            {isUploading ? (
              <span className="w-5 h-5 border-2 border-remax-blue/30 border-t-remax-blue rounded-full animate-spin" />
            ) : (
              <HiArrowUpTray />
            )}
          </div>

          <div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-900">
              {isUploading ? 'Sedang Mengunggah...' : 'Klik atau seret foto ke sini untuk mengunggah'}
            </p>
            <p className="text-[11px] text-neutral-500 mt-1">
              Maksimal 5 foto per satu kali unggah • Format JPG, PNG, atau WebP (Maks. 8MB per foto)
            </p>
          </div>

          {uploadProgress && (
            <p className="text-xs text-remax-blue font-medium bg-white px-3 py-1 rounded-full border border-blue-200 shadow-2xs">
              {uploadProgress}
            </p>
          )}
        </div>
      </div>

      {/* Notice Message if files exceeded limit */}
      {noticeMessage && (
        <div className="flex items-center gap-2 p-3 bg-blue-tint border border-blue-200 rounded-btn text-xs text-remax-blue">
          <HiInformationCircle className="text-base shrink-0" />
          <span>{noticeMessage}</span>
        </div>
      )}

      {/* Error Message Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-tint border border-red-200 rounded-btn text-xs text-error">
          <HiExclamationCircle className="text-base shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
