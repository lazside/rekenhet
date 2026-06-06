/**
 * URL Sharing Engine — encode/decode calculator state for shareable links
 *
 * Format: /calculators/[slug]?s=[base64-encoded-json]
 *
 * Base64 (not compression) is used for URL-safety and simplicity.
 * The data size is small enough (< 1KB) that compression adds no benefit.
 */

export interface CalculatorShareState {
  /** Calculator slug to validate target */
  _calc?: string;
  /** Timestamp for freshness check */
  _t?: number;
  /** Arbitrary key-value pairs from calculator inputs */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Encode calculator state into a URL-safe Base64 string.
 * Prefix: 'v1.' for versioning.
 */
export function encodeShareState(state: CalculatorShareState): string {
  try {
    const json = JSON.stringify(state);
    const base64 = btoa(unescape(encodeURIComponent(json))); // UTF-8 safe
    return `v1.${base64}`;
  } catch {
    return "";
  }
}

/**
 * Decode a share string back into calculator state.
 * Returns null if the string is invalid or expired (> 24h).
 */
export function decodeShareState(raw: string): CalculatorShareState | null {
  try {
    // Strip version prefix
    const base64 = raw.startsWith("v1.") ? raw.slice(3) : raw;
    const json = decodeURIComponent(escape(atob(base64))); // UTF-8 safe
    const state = JSON.parse(json) as CalculatorShareState;

    // Freshness check — expire after 24 hours
    if (state._t && Date.now() - state._t > 24 * 60 * 60 * 1000) {
      return null;
    }

    return state;
  } catch {
    return null;
  }
}

/**
 * Read share state from the current page's URL search params.
 */
export function getShareStateFromUrl(): CalculatorShareState | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const s = params.get("s");
  if (!s) return null;
  return decodeShareState(s);
}

/**
 * Build a full shareable URL for a calculator with its current state.
 */
export function buildShareUrl(slug: string, state: CalculatorShareState): string {
  const encoded = encodeShareState({
    ...state,
    _calc: slug,
    _t: Date.now(),
  });
  if (!encoded) return "";
  const base = window.location.origin;
  return `${base}/${slug}?s=${encoded}`;
}
