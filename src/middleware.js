// src/middleware.js
// NextAuth.js v5 route protection middleware for /admin routes

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Only apply to admin routes, excluding static assets and images
  matcher: ['/admin/:path*'],
};
