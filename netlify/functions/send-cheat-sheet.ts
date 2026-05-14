import type { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM ?? 'uTap <hello@utaptech.co.za>';
const PDF_DOWNLOAD_URL = 'https://utaptech.co.za/downloads/campus-ordering-cheat-sheet.pdf';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email: string;
  try {
    const body = JSON.parse(event.body ?? '{}');
    email = (body.email ?? '').trim().toLowerCase();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address' }) };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '📋 Your Campus Ordering Cheat Sheet',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: #f0fdf4; border-radius: 12px; padding: 32px 40px; margin-bottom: 24px;">
            <h1 style="margin: 0 0 8px; font-size: 24px; color: #166534;">Here's your cheat sheet 🎉</h1>
            <p style="margin: 0; color: #4b5563;">The breakdown every South African student needs.</p>
          </div>

          <p>Hey there,</p>
          <p>Here's the quick truth: a <strong>R100 meal on Mr D</strong> can cost you up to <strong>R185</strong> once you add delivery fees, service fees, and a tip.</p>
          <p>On uTap? You pay <strong>exactly R100</strong>. No markups. No surprises.</p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${PDF_DOWNLOAD_URL}" style="background: #16a34a; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
              Download the Cheat Sheet →
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px;">The PDF includes the full fee breakdown, a Free vs Premium comparison, and a 3-step quick-start guide for your first pickup order.</p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

          <p style="font-size: 14px; color: #9ca3af;">
            You're receiving this because you signed up at utap.co.za.<br />
            <a href="https://utap.co.za" style="color: #16a34a;">Visit uTap</a> &bull; No spam, ever.
          </p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Resend error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email. Please try again.' }),
    };
  }
};
