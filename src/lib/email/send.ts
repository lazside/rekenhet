/**
 * Resend Email Sender
 *
 * Wraps the Resend SDK for sending transactional emails.
 * Requires RESEND_API_KEY environment variable.
 */
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

/**
 * Get a configured Resend client.
 * Returns null if no API key is set (safe fallback for dev).
 */
function getClient(): Resend | null {
  if (!RESEND_API_KEY || RESEND_API_KEY.startsWith("re_")) return null;
  return new Resend(RESEND_API_KEY);
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  /** Optional: from address override (defaults to the configured sender) */
  from?: string;
}

/**
 * Send an email via Resend.
 * Returns { success: true } or { success: false, error: string }.
 */
export async function sendEmail({
  to,
  subject,
  html,
  from,
}: SendEmailParams): Promise<{ success: true } | { success: false; error: string }> {
  const client = getClient();

  if (!client) {
    // In dev mode, log instead of sending
    console.log(`[EMAIL DEV] To: ${to} | Subject: ${subject}`);
    console.log(`[EMAIL DEV] HTML length: ${html.length} chars`);
    return { success: true };
  }

  try {
    const result = await client.emails.send({
      from: from || "Rekenhet.nl <noreply@rekenhet.nl>",
      to,
      subject,
      html,
    });

    if (result.error) {
      console.error("[EMAIL ERROR]", result.error);
      return { success: false, error: result.error.message || "Unknown Resend error" };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    console.error("[EMAIL ERROR]", message);
    return { success: false, error: message };
  }
}
