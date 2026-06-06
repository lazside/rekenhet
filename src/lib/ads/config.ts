/**
 * Ad Configuration Constants
 *
 * Standard Google AdSense sizes, slot IDs, and responsive breakpoints.
 * All sizes use `min-height` to guarantee zero CLS regardless of
 * whether the ad loads, is blocked, or fills.
 */
import type { MetadataRoute } from "next";

// ─── Publisher ─────────────────────────────────────────────────

export const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-xxxxxxxxxxxxxx";

// ─── Standard Ad Sizes (width × height) ───────────────────────

export const AD_SIZES = {
  /** 728×90 leaderboard — above/below content */
  LEADERBOARD: { w: 728, h: 90 },

  /** 336×280 large rectangle — inline */
  LARGE_RECTANGLE: { w: 336, h: 280 },

  /** 300×600 large skyscraper — sidebar */
  LARGE_SKYSCRAPER: { w: 300, h: 600 },

  /** 160×600 wide skyscraper — narrow sidebar */
  WIDE_SKYSCRAPER: { w: 160, h: 600 },

  /** 320×100 large anchor — mobile footer */
  LARGE_ANCHOR: { w: 320, h: 100 },

  /** 320×50 standard anchor — mobile footer (fallback) */
  SMALL_ANCHOR: { w: 320, h: 50 },
} as const;

// ─── Ad Format Names (Google AdSense API) ────────────────────

export type AdFormat =
  | "horizontal"   // 728×90 leaderboard
  | "vertical"     // 160×600 or 300×600 skyscraper
  | "rectangle"    // 336×280 large rectangle
  | "anchor"       // 320×100 mobile anchor
  | "responsive";  // auto-width, responsive

// ─── Slot IDs (placeholder — replace in .env) ────────────────

export const AD_SLOTS = {
  SIDEBAR: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || "1234567891",
  INLINE_RESULTS: process.env.NEXT_PUBLIC_AD_SLOT_INLINE || "1234567892",
  MOBILE_ANCHOR: process.env.NEXT_PUBLIC_AD_SLOT_ANCHOR || "1234567893",
  ABOVE_CONTENT: process.env.NEXT_PUBLIC_AD_SLOT_ABOVE || "1234567890",
} as const;

// ─── Responsive Breakpoints (Tailwind lg = 1024px) ───────────

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
} as const;

// ─── CSR (Client-Side Rendering) ───────────────────────────────

export function isAdEnabled(): boolean {
  return !ADSENSE_PUBLISHER_ID.includes("xxxxxxxx");
}

// ─── Ad Size → CSS min-height mapping ─────────────────────────

export const AD_FORMAT_SIZES: Record<
  AdFormat,
  { className: string; adFormat: string }
> = {
  horizontal: {
    className: "min-h-[90px] w-full max-w-[728px]",
    adFormat: "horizontal",
  },
  vertical: {
    className: "min-h-[600px] w-[160px] lg:w-[300px]",
    adFormat: "vertical",
  },
  rectangle: {
    className: "min-h-[280px] w-full max-w-[336px]",
    adFormat: "rectangle",
  },
  anchor: {
    className: "min-h-[100px] w-[320px]",
    adFormat: "horizontal", // Anchor uses responsive with fixed size constraint
  },
  responsive: {
    className: "min-h-[90px] w-full",
    adFormat: "auto",
  },
};
