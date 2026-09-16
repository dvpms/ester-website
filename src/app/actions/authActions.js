'use server';

// src/app/actions/authActions.js
// Server actions for NextAuth login and logout

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

/**
 * Handles admin login using NextAuth credentials provider.
 * 
 * @param {Object} prevState
 * @param {FormData} formData
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function authenticate(prevState, formData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return { success: false, error: 'Email dan password wajib diisi.' };
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin',
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Email atau password yang Anda masukkan salah.' };
        default:
          return { success: false, error: 'Terjadi kesalahan autentikasi. Silakan coba lagi.' };
      }
    }
    // Next.js redirect errors need to be rethrown
    throw error;
  }
}

/**
 * Handles admin logout.
 */
export async function logoutAction() {
  await signOut({ redirectTo: '/admin/login' });
}
