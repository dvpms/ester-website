// src/app/sitemap.js
import { listings } from '@/data/listings';
import { kawasanList } from '@/data/kawasan';
import { artikelList } from '@/data/artikel';

export default function sitemap() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estherproperty.com';

  const routes = [
    '',
    '/properti',
    '/kawasan',
    '/blog',
    '/tentang',
    '/kontak',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  const propertyRoutes = listings.map((listing) => ({
    url: `${SITE_URL}/properti/${listing.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const kawasanRoutes = kawasanList.map((kawasan) => ({
    url: `${SITE_URL}/kawasan/${kawasan.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes = artikelList.map((artikel) => ({
    url: `${SITE_URL}/blog/${artikel.slug}`,
    lastModified: new Date(artikel.tanggalPublish).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...propertyRoutes, ...kawasanRoutes, ...blogRoutes];
}
