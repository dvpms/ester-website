// src/lib/cloudinary.js
// Utility terpusat untuk operasi media Cloudinary — Esther Property

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Mengunggah buffer media mentah langsung ke Cloudinary via stream.
 * 
 * @param {Buffer|Uint8Array} buffer - File buffer yang akan diunggah
 * @param {Object} options - Konfigurasi opsi Cloudinary upload_stream
 * @returns {Promise<import('cloudinary').UploadApiResponse>}
 */
export function uploadToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'esther-website',
        resource_type: 'auto',
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary upload returned empty response'));
        resolve(result);
      }
    );

    uploadStream.end(Buffer.from(buffer));
  });
}

/**
 * Mengunggah foto galeri listing ke folder terstruktur:
 * `esther-website/listings/{slug}/`
 * 
 * @param {Object} params
 * @param {Buffer|Uint8Array} params.buffer - File buffer foto
 * @param {string} params.slug - Slug listing properti
 * @param {string} [params.fileName] - Nama file asli opsional
 * @returns {Promise<import('cloudinary').UploadApiResponse>}
 */
export async function uploadListingImage({ buffer, slug, fileName }) {
  if (!slug) throw new Error('Listing slug is required for Cloudinary folder organization');
  
  // Bersihkan nama file agar aman digunakan sebagai public_id opsional
  const cleanName = fileName ? fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_') : undefined;

  return uploadToCloudinary(buffer, {
    folder: `esther-website/listings/${slug}`,
    public_id: cleanName,
    resource_type: 'image',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ]
  });
}

/**
 * Mengunggah file brosur ter-generate (image/PDF) ke folder:
 * `esther-website/listings/{slug}/brochure/`
 * 
 * @param {Object} params
 * @param {Buffer|Uint8Array} params.buffer - File buffer gambar brosur HD
 * @param {string} params.slug - Slug listing properti
 * @returns {Promise<import('cloudinary').UploadApiResponse>}
 */
export async function uploadBrochureImage({ buffer, slug }) {
  if (!slug) throw new Error('Listing slug is required for brochure upload');

  return uploadToCloudinary(buffer, {
    folder: `esther-website/listings/${slug}/brochure`,
    public_id: `brosur-${slug}`,
    resource_type: 'image',
    overwrite: true,
    transformation: [
      { quality: 'auto:best' },
      { fetch_format: 'auto' }
    ]
  });
}

/**
 * Mengekstrak public_id Cloudinary dari URL gambar atau mengembalikan public_id jika sudah berupa ID.
 * Contoh: "https://res.cloudinary.com/xyz/image/upload/v1234/esther-website/listings/rumah/foto.jpg"
 * -> "esther-website/listings/rumah/foto"
 * 
 * @param {string} urlOrPublicId
 * @returns {string|null}
 */
export function getCloudinaryPublicId(urlOrPublicId) {
  if (!urlOrPublicId || typeof urlOrPublicId !== 'string') return null;

  // Jika bukan format URL http/https, asumsikan sudah berupa public_id
  if (!urlOrPublicId.startsWith('http://') && !urlOrPublicId.startsWith('https://')) {
    return urlOrPublicId;
  }

  // Hanya proses URL yang berasal dari Cloudinary
  if (!urlOrPublicId.includes('cloudinary.com')) {
    return null;
  }

  try {
    const uploadIndex = urlOrPublicId.indexOf('/upload/');
    if (uploadIndex === -1) return null;

    const afterUpload = urlOrPublicId.substring(uploadIndex + 8);
    // Lewati transformasi opsional dan versi (misal: /v1726462728/ atau /c_fill,w_300/v1234/)
    const versionMatch = afterUpload.match(/(?:.*\/)?v\d+\/(.+)$/);
    let publicIdWithExt = versionMatch ? versionMatch[1] : afterUpload;

    // Hapus query parameters jika ada
    publicIdWithExt = publicIdWithExt.split('?')[0];

    // Hapus ekstensi file (.jpg, .png, .webp, .pdf, dll.)
    const lastDotIndex = publicIdWithExt.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return publicIdWithExt.substring(0, lastDotIndex);
    }
    return publicIdWithExt;
  } catch (err) {
    console.error('Error parsing Cloudinary public ID:', err);
    return null;
  }
}

/**
 * Menghapus file media dari Cloudinary berdasarkan URL atau public_id.
 * 
 * @param {string} urlOrPublicId - URL Cloudinary atau Public ID aset
 * @param {'image'|'raw'|'video'} [resourceType='image']
 * @returns {Promise<any>}
 */
export async function deleteCloudinaryAsset(urlOrPublicId, resourceType = 'image') {
  const publicId = getCloudinaryPublicId(urlOrPublicId);
  if (!publicId) return null;

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return result;
  } catch (error) {
    console.warn(`Gagal menghapus aset Cloudinary (${publicId}):`, error.message);
    return null;
  }
}

/**
 * Menghapus kumpulan file media dari Cloudinary secara bersamaan (batch).
 * 
 * @param {string[]} urlsOrPublicIds - Daftar URL atau Public ID aset
 * @param {'image'|'raw'|'video'} [resourceType='image']
 * @returns {Promise<any[]>}
 */
export async function deleteCloudinaryAssets(urlsOrPublicIds = [], resourceType = 'image') {
  if (!Array.isArray(urlsOrPublicIds) || urlsOrPublicIds.length === 0) return [];

  const publicIds = urlsOrPublicIds
    .map(getCloudinaryPublicId)
    .filter(Boolean);

  if (publicIds.length === 0) return [];

  const deletePromises = publicIds.map((pid) =>
    cloudinary.uploader.destroy(pid, { resource_type: resourceType }).catch((err) => {
      console.warn(`Gagal menghapus aset Cloudinary (${pid}):`, err.message);
      return null;
    })
  );

  return Promise.allSettled(deletePromises);
}

/**
 * Menghapus seluruh folder listing beserta file di dalamnya dari Cloudinary.
 * 
 * @param {string} folderPath - Path folder (misal: "esther-website/listings/slug")
 * @returns {Promise<boolean>}
 */
export async function deleteCloudinaryFolder(folderPath) {
  if (!folderPath) return false;

  try {
    // 1. Hapus semua aset dengan prefix folder tersebut
    await cloudinary.api.delete_resources_by_prefix(folderPath);
    // 2. Hapus foldernya setelah kosong
    await cloudinary.api.delete_folder(folderPath);
    return true;
  } catch (error) {
    // Folder mungkin sudah kosong atau belum pernah terbuat di Cloudinary
    console.warn(`Peringatan saat membersihkan folder Cloudinary (${folderPath}):`, error.message);
    return false;
  }
}

export default cloudinary;
