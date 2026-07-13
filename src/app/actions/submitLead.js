'use server';

import { getLeadNotificationHtml } from '@/lib/email-templates';
import { sendEmail } from '@/lib/sendEmail';

/**
 * Server Action to submit a lead via email using Nodemailer.
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
    const htmlTemplate = getLeadNotificationHtml(leadData);

    // 1. Simpan ke Google Sheets (jika dikonfigurasi)
    if (GOOGLE_SHEETS_URL) {
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
      } catch (sheetErr) {
        console.error('Google Sheets logging failed:', sheetErr);
        // Kita tidak memberhentikan fungsi jika Google Sheets gagal, email tetap harus dikirim.
      }
    }

    // 2. Kirim Notifikasi via Nodemailer
    const result = await sendEmail({
      to: EMAIL_RECEIVER,
      subject: subject,
      html: htmlTemplate,
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
