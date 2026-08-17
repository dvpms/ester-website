// src/lib/gtag.js
// Google Analytics & Google Ads Tracking Helper

export const GA_TRACKING_ID = 'G-1P0NHW67GW';
export const GOOGLE_ADS_ID = 'AW-18381904404';
export const LEAD_CONVERSION_SEND_TO = 'AW-18381904404/MLzVCJWZveIcEJS0lr1E';

/**
 * Trigger event tracking to Google gtag
 * @param {string} action
 * @param {Record<string, any>} [params]
 */
export function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

/**
 * Trigger Google Ads lead conversion event ('Mengirim formulir lead')
 */
export function trackLeadConversion() {
  trackEvent('conversion', {
    send_to: LEAD_CONVERSION_SEND_TO,
  });
}
