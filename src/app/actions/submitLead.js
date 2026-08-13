'use server';

import { getLeadNotificationHtml, getBrochureHtml } from '@/lib/email-templates';
import { sendEmail } from '@/lib/sendEmail';
import { listings } from '@/data/listings';
import { formatHarga } from '@/lib/utils';

/**
 * Server Action to submit a lead via email using Nodemailer.
 * If leadData.jenisForm === 'brosur', also sends the brochure email to the client using listing.brosurUrl.
 * 
 * @param {import('@/lib/types').LeadSubmission} leadData
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function submitLead(leadData) {
  try {
    const { EMAIL_RECEIVER, GOOGLE_SHEETS_URL } = process.env;

    if (!EMAIL_RECEIVER) {
      console.error('Missing EMAIL_RECEIVER in environment variables.');
      return { success: false, error: 'Server configuration error' };
    }

    const subject = `[Lead Baru] ${leadData.jenisForm || 'Website'} — ${leadData.nama || 'Tanpa Nama'}`;
    const htmlTemplate = await getLeadNotificationHtml(leadData);

    // 1. Simpan ke Google Sheets (jika dikonfigurasi)
    if (GOOGLE_SHEETS_URL) {
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
      } catch (sheetErr) {
        console.error('[ERROR] Google Sheets logging failed:', sheetErr);
      }
    } else {
      console.warn('[WARN] GOOGLE_SHEETS_URL tidak ditemukan di .env.local');
    }

    // 2. Kirim Notifikasi Lead Baru ke Agen via Nodemailer
    const agentEmailResult = await sendEmail({
      to: EMAIL_RECEIVER,
      subject: subject,
      html: htmlTemplate,
    });

    if (!agentEmailResult.success) {
      throw new Error(agentEmailResult.error);
    }

    // 3. Jika jenis form adalah request brosur dan email klien diisi, kirim brosur langsung ke klien
    if (leadData.jenisForm === 'brosur' && leadData.email) {
      const listing = listings.find((l) => l.slug === leadData.listingSlug);

      if (listing) {
        const listingDetails = {
          nama: listing.nama,
          lokasi: listing.lokasiDetail,
          jenis: listing.jenisProperti,
          harga: formatHarga(listing.harga),
          brosurUrl: listing.brosurUrl, // Menggunakan brosurUrl dari listing
        };

        const clientBrochureHtml = await getBrochureHtml(leadData, listingDetails);

        await sendEmail({
          to: leadData.email,
          subject: `[Brosur Properti] ${listing.nama} — Esther REMAX`,
          html: clientBrochureHtml,
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error in submitLead:', error);
    return { success: false, error: 'Failed to process lead submission' };
  }
}
