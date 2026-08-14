import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnmhna2fc',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a Buffer (PDF/Image) directly to Cloudinary via upload_stream.
 * 
 * @param {Buffer|Uint8Array} buffer - File buffer to upload
 * @param {Object} options - Cloudinary upload options
 * @returns {Promise<import('cloudinary').UploadApiResponse>}
 */
export function uploadToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'ester-property/brochures',
        resource_type: 'raw', // 'raw' preserves PDF format
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

export default cloudinary;
