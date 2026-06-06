/**
 * Cookie Consent — localStorage utilities
 *
 * Stores user's GDPR consent decision for AdSense.
 * Keys prefixed with "rekenhet-" to avoid collisions.
 */

const STORAGE_KEY = "rekenhet-cookie-consent";

export type ConsentDecision = "accepted" | "rejected" | null;

/**
 * Read the user's consent decision from localStorage.
 * Returns null if no decision has been made yet.
 */
export function getConsent(): ConsentDecision {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === "accepted" || val === "rejected") return val;
  return null;
}

/**
 * Save the user's consent decision.
 */
export function setConsent(decision: "accepted" | "rejected"): void {
  try {
    localStorage.setItem(STORAGE_KEY, decision);
  } catch {
    // localStorage may be unavailable (private browsing, etc.)
  }
}

/**
 * Check if the user has given consent.
 */
export function hasConsent(): boolean {
  return getConsent() === "accepted";
}

/**
 * Clear stored consent (for testing or reset).
 */
export function clearConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}
