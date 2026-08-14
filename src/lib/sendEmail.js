import nodemailer from 'nodemailer';

/** @type {nodemailer.Transporter | null} */
let transporter = null;

/**
 * Returns a cached, pooled nodemailer transporter instance.
 * 
 * @returns {nodemailer.Transporter}
 */
function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Missing SMTP Configuration in environment variables.');
  }

  const port = Number(SMTP_PORT) || 465;

  transporter = nodemailer.createTransport({
    pool: true, // Use connection pool for fast concurrent email dispatch
    maxConnections: 5,
    maxMessages: 100,
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  return transporter;
}

/**
 * Reusable helper to send an email using Nodemailer connection pool.
 * 
 * @param {Object} options
 * @param {string} options.to - Penerima email
 * @param {string} options.subject - Subjek email
 * @param {string} options.html - Body email dalam format HTML
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendEmail({ to, subject, html }) {
  try {
    const { SMTP_USER, SMTP_FROM } = process.env;
    const mailer = getTransporter();

    await mailer.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to,
      subject,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error('Error in sendEmail helper:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
}
