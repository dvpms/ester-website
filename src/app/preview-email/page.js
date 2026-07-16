import { 
  getLeadNotificationHtml, 
  getContactConfirmationHtml, 
  getSurveyConfirmationHtml, 
  getBrochureHtml, 
  getSurveyReminderHtml, 
  getBroadcastHtml 
} from '@/lib/email-templates';

// Halaman ini bersifat statis, tidak memerlukan konfigurasi server khusus
export const metadata = {
  title: 'Preview Email Templates',
  robots: 'noindex, nofollow', // Mencegah Google mengindeks halaman preview ini
};

export default async function PreviewEmailPage({ searchParams }) {
  const params = await searchParams;
  // Simulasi data (Mock Data) agar tidak perlu mengisi form
  const mockLeadData = {
    nama: "Budi Santoso",
    email: "budi.santoso@example.com",
    telepon: "081234567890",
    jenisForm: "konsultasi",
    pesan: "Saya tertarik dengan rumah di kawasan Gading Serpong, apakah ada diskon KPR?",
    listingSlug: "rumah-minimalis-gading-serpong",
    preferensi: { kawasan: "Gading Serpong" },
    tanggalSurvei: "2026-08-15",
    catatan: "Tolong hubungi saya di atas jam 5 sore."
  };

  const mockListingDetails = {
    nama: "Rumah Minimalis Gading Serpong",
    lokasi: "Gading Serpong, Tangerang",
    jenis: "Rumah",
    harga: "Rp 1.500.000.000",
    brosurUrl: "https://example.com/brosur.pdf"
  };

  const mockProperties = [
    {
      nama: "Cluster Aether Greenwich BSD",
      lokasi: "BSD City",
      harga: "Mulai Rp 2,8 Miliar",
      ringkasan: "Hunian resort 3 lantai dengan double balcony.",
      gambar: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      url: "https://estherproperty.com/properti/cluster-aether"
    },
    {
      nama: "Pasadena Grand Residences",
      lokasi: "Gading Serpong",
      harga: "Mulai Rp 4,5 Miliar",
      ringkasan: "Kawasan premium dengan fasilitas bintang 5.",
      gambar: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      url: "https://estherproperty.com/properti/pasadena"
    }
  ];

  const mockArticles = [
    { judul: "5 Tips Cerdas Memilih KPR di Tahun 2026", url: "#" },
    { judul: "Kenapa Harga Tanah di BSD Terus Naik?", url: "#" }
  ];

  // Render semua template berdasarkan jenis
  const templates = {
    '1': { title: '1. Notifikasi Lead Baru (Ke Agent)', html: await getLeadNotificationHtml(mockLeadData) },
    '2': { title: '2. Konfirmasi Pesan Diterima (Ke Klien)', html: await getContactConfirmationHtml(mockLeadData) },
    '3': { title: '3. Konfirmasi Janji Temu (Ke Klien)', html: await getSurveyConfirmationHtml(mockLeadData) },
    '4': { title: '4. Pengiriman Brosur (Ke Klien)', html: await getBrochureHtml(mockLeadData, mockListingDetails) },
    '5': { title: '5. Reminder Janji Temu (Ke Klien)', html: await getSurveyReminderHtml(mockLeadData) },
    '6': { title: '6. Broadcast / Newsletter', html: await getBroadcastHtml(mockProperties, mockArticles) },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Template Previewer</h1>
        <p className="text-gray-600 mb-4">Gunakan halaman ini untuk mengecek desain email tanpa perlu mengisi form berulang kali.</p>
        
        <div className="flex flex-wrap gap-2">
          {Object.keys(templates).map((key) => (
            <a 
              key={key} 
              href={`/preview-email?id=${key}`} 
              className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white rounded text-sm transition-colors"
            >
              Template {key}
            </a>
          ))}
        </div>
      </div>

      {Object.keys(templates).map((key) => {
        // Tampilkan hanya jika ID di-klik, atau tampilkan nomor 1 sebagai default
        const showTemplate = (!params.id && key === '1') || params.id === key;
        
        if (!showTemplate) return null;

        return (
          <div key={key} className="w-full max-w-4xl mb-12">
            <h2 className="text-xl font-bold text-gray-700 mb-4">{templates[key].title}</h2>
            {/* Render HTML Template mentah ke dalam iframe-like div */}
            <div 
              className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
              style={{ padding: '20px' }}
              dangerouslySetInnerHTML={{ __html: templates[key].html }}
            />
          </div>
        );
      })}
    </div>
  );
}
