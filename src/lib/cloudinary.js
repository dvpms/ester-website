// src/lib/cloudinary.js
// Utility terpusat untuk operasi media Cloudinary — Esther Property

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnmhna2fc',
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
 * Menghapus file media dari Cloudinary berdasarkan public_id.
 * 
 * @param {string} publicId - Public ID aset Cloudinary
 * @param {'image'|'raw'|'video'} [resourceType='image']
 * @returns {Promise<any>}
 */
export async function deleteCloudinaryAsset(publicId, resourceType = 'image') {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export default cloudinary;
