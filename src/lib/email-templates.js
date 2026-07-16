/**
 * Kumpulan template email menggunakan React Email
 */
import React from 'react';
import { render } from 'react-email';

import LeadNotification from '../../emails/LeadNotification';
import ContactConfirmation from '../../emails/ContactConfirmation';
import SurveyConfirmation from '../../emails/SurveyConfirmation';
import BrochureEmail from '../../emails/BrochureEmail';
import SurveyReminder from '../../emails/SurveyReminder';
import BroadcastEmail from '../../emails/BroadcastEmail';

// ==========================================
// 1. Notifikasi Lead Baru (Ke Agent)
// ==========================================
export async function getLeadNotificationHtml(data) {
  return await render(<LeadNotification {...data} />);
}

// ==========================================
// 2. Konfirmasi Pesan Diterima (Ke Klien)
// ==========================================
export async function getContactConfirmationHtml(data) {
  return await render(<ContactConfirmation {...data} />);
}

// ==========================================
// 3. Konfirmasi Janji Temu (Ke Klien)
// ==========================================
export async function getSurveyConfirmationHtml(data) {
  return await render(<SurveyConfirmation {...data} />);
}

// ==========================================
// 4. Pengiriman Brosur & Pricelist (Ke Klien)
// ==========================================
export async function getBrochureHtml(data, listingDetails) {
  return await render(
    <BrochureEmail 
      nama={data.nama} 
      listingSlug={data.listingSlug} 
      listingDetails={listingDetails} 
    />
  );
}

// ==========================================
// 5. Reminder Janji Temu (Ke Klien)
// ==========================================
export async function getSurveyReminderHtml(data) {
  return await render(<SurveyReminder {...data} />);
}

// ==========================================
// 6. Broadcast Email — Property Highlight (Ke Klien)
// ==========================================
export async function getBroadcastHtml(properties, articles) {
  return await render(<BroadcastEmail properties={properties} articles={articles} />);
}
