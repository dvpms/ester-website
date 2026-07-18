// src/app/robots.js
export default function robots() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
