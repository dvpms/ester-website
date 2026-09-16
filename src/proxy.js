// src/proxy.js
// NextAuth.js v5 route protection proxy for /admin routes (Next.js 16+ convention)
// Menggantikan konvensi lama middleware.js sesuai panduan Next.js: https://nextjs.org/docs/messages/middleware-to-proxy

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

// Mendukung named export 'proxy' sesuai konvensi Next.js 16 serta default export
export const proxy = auth;
export default auth;

export const config = {
  // Only apply to admin routes, excluding static assets and images
  matcher: ['/admin/:path*'],
};
