/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium', 'puppeteer'],
  outputFileTracingIncludes: {
    '/*': [
      './node_modules/@sparticuz/chromium/bin/**/*',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  allowedDevOrigins: ["http://localhost:3000"],
};

export default nextConfig;
