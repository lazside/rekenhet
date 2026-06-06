/**
 * Newsletter Subscription Utility
 *
 * Adds a subscriber to a Resend Audience (contact list).
 * Uses double opt-in via Resend's native confirmation flow.
 *
 * Requires:
 *   - RESEND_API_KEY environment variable
 *   - RESEND_AUDIENCE_ID environment variable (the Audience ID)
 */
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "";

/**
 * Subscribe an email to a Resend audience list.
 * Resend automatically sends a double-opt-in confirmation email.
 *
 * Returns { success: true } or { success: false, error: string }.
 */
export async function subscribeToNewsletter(
  email: string,
  /** Optional metadata about the subscriber */
  metadata?: Record<string, string>
): Promise<{ success: true } | { success: false; error: string }> {
  if (!RESEND_API_KEY || RESEND_API_KEY.startsWith("re_")) {
    console.log(`[NEWSLETTER DEV] Would subscribe: ${email}`);
    return { success: true };
  }

  if (!AUDIENCE_ID) {
    console.warn("[NEWSLETTER] No RESEND_AUDIENCE_ID configured");
    return { success: false, error: "Audience not configured" };
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    const result = await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      ...(metadata ? { unsubscribed: false, ...metadata } : { unsubscribed: false }),
    });

    if (result.error) {
      console.error("[NEWSLETTER ERROR]", result.error);
      return { success: false, error: result.error.message || "Failed to subscribe" };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to subscribe";
    console.error("[NEWSLETTER ERROR]", message);
    return { success: false, error: message };
  }
}
