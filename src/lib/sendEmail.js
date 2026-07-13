import nodemailer from 'nodemailer';

/**
 * Reusable helper to send an email using Nodemailer.
 * 
 * @param {Object} options
 * @param {string} options.to - Penerima email
 * @param {string} options.subject - Subjek email
 * @param {string} options.html - Body email dalam format HTML
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendEmail({ to, subject, html }) {
  try {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error('Missing SMTP Configuration in environment variables.');
      return { success: false, error: 'Server configuration error' };
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 465,
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to,
      subject,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error('Error in sendEmail helper:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
