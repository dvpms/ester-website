'use server';

import { after } from 'next/server';
import { getLeadNotificationHtml, getBrochureHtml } from '@/lib/email-templates';
import { sendEmail } from '@/lib/sendEmail';
import { listings } from '@/data/listings';
import { formatHarga } from '@/lib/utils';

/**
 * Standalone asynchronous background logger for Google Sheets.
 * Runs completely non-blocking in background with generous timeout for Google Apps Script cold-starts.
 * 
 * @param {import('@/lib/types').LeadSubmission} leadData
 */
async function logLeadToGoogleSheets(leadData) {
  const { GOOGLE_SHEETS_URL } = process.env;
  if (!GOOGLE_SHEETS_URL) return;

  try {
    const res = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
      redirect: 'follow',
      signal: AbortSignal.timeout(30000), // 30s timeout untuk cold start Google Apps Script
    });

    if (res.ok) {
      console.log('[INFO] Lead successfully recorded to Google Sheets');
    }
  } catch (error) {
    console.error('[WARN] Google Sheets logging failed:', error?.message || error);
  }
}

/**
 * Dispatches agent notifications & client brochure emails in the background.
 * 
 * @param {import('@/lib/types').LeadSubmission} leadData
 */
async function dispatchEmails(leadData) {
  const { EMAIL_RECEIVER } = process.env;
  if (!EMAIL_RECEIVER) return;

  const emailTasks = [];

  // 1. Email Notifikasi ke Agen
  const agentSubject = `[Lead Baru] ${leadData.jenisForm || 'Website'} — ${leadData.nama || 'Tanpa Nama'}`;
  const agentTask = getLeadNotificationHtml(leadData)
    .then((html) =>
      sendEmail({
        to: EMAIL_RECEIVER,
        subject: agentSubject,
        html,
      })
    )
    .catch((err) => console.error('[ERROR] Agent email delivery failed:', err));
  emailTasks.push(agentTask);

  // 2. Email Brosur ke Klien (jika form brosur dan email klien tersedia)
  if (leadData.jenisForm === 'brosur' && leadData.email) {
    const listing = listings.find((l) => l.slug === leadData.listingSlug);

    if (listing) {
      const listingDetails = {
        nama: listing.nama,
        lokasi: listing.lokasiDetail,
        jenis: listing.jenisProperti,
        harga: formatHarga(listing.harga),
        brosurUrl: listing.brosurUrl,
      };

      const clientTask = getBrochureHtml(leadData, listingDetails)
        .then((clientHtml) =>
          sendEmail({
            to: leadData.email,
            subject: `[Brosur Properti] ${listing.nama} — Esther REMAX`,
            html: clientHtml,
          })
        )
        .catch((err) => console.error('[ERROR] Client brochure email delivery failed:', err));
      emailTasks.push(clientTask);
    }
  }

  await Promise.allSettled(emailTasks);
}

/**
 * Server Action to submit a lead.
 * Responds to the client immediately (< 100ms) while executing email dispatch 
 * and Google Sheets logging safely in the background via Next.js `after`.
 * 
 * @param {import('@/lib/types').LeadSubmission} leadData
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function submitLead(leadData) {
  try {
    // Validasi dasar
    if (!leadData || (!leadData.nama && !leadData.email && !leadData.telepon)) {
      return { success: false, error: 'Data formulir tidak lengkap' };
    }

    // Jalankan pengiriman email & pencatatan Google Sheets di background tanpa memblokir UI klien
    after(async () => {
      await Promise.allSettled([
        dispatchEmails(leadData),
        logLeadToGoogleSheets(leadData),
      ]);
    });

    // Berikan respons sukses instan ke browser pengguna
    return { success: true };
  } catch (error) {
    console.error('Error in submitLead action:', error);
    return { success: false, error: 'Gagal memproses data lead' };
  }
}
