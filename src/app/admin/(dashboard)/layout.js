// src/app/admin/(dashboard)/layout.js
// Server layout untuk admin panel yang mengambil session pengguna

import { auth } from '@/auth';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Dashboard Admin | Esther Property CMS',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({ children }) {
  const session = await auth();

  return (
    <AdminShell user={session?.user}>
      {children}
    </AdminShell>
  );
}
