// src/app/admin/(auth)/layout.js
// Dedicated layout for admin authentication pages (login, reset, etc.)
// Selaras dengan design tokens Esther Property di globals.css

export const metadata = {
  title: 'Login Administrator | Esther Property CMS',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminAuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-remax-blue selection:text-white">
      {/* Background Decorative Ambient Glow — Brand RE/MAX Blue & Red */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-tint/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-tint/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {children}
      </div>
    </div>
  );
}
