"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ADSENSE_PUBLISHER_ID,
  AD_FORMAT_SIZES,
  isAdEnabled,
  type AdFormat,
} from "@/lib/ads/config";

// ─── Adblock detection ─────────────────────────────────────────

/** Contextual affiliate offers shown when adblocker is detected */
const FALLBACK_OFFERS: Record<string, { icon: string; title: string; description: string; cta: string; url: string }> = {
  "werk-en-inkomen": {
    icon: "💼",
    title: "Salarisadministratie",
    description: "Bespaar tijd met professionele salarisadministratie.",
    cta: "Vergelijk",
    url: "/go/boekhouden-beste",
  },
  ondernemen: {
    icon: "📊",
    title: "Boekhoudsoftware",
    description: "Vergelijk de beste boekhoudprogramma's voor je onderneming.",
    cta: "Vergelijk",
    url: "/go/boekhouden-beste",
  },
  "geld-en-verzekeringen": {
    icon: "🏠",
    title: "Hypotheek vergelijken",
    description: "Ontdek de beste hypotheekrente voor jouw situatie.",
    cta: "Vergelijk",
    url: "/go/verzekering-vergelijken",
  },
  algemeen: {
    icon: "🔍",
    title: "Gratis tools",
    description: "Ontdek alle handige calculators op Rekenhet.nl.",
    cta: "Bekijken",
    url: "/calculators",
  },
};

/**
 * Detects an adblocker by checking if the `<ins>` element
 * has zero rendered height 3 seconds after injection.
 */
function useAdblockDetector(
  ref: React.RefObject<HTMLDivElement | null>,
  timeoutMs = 3000
): boolean {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const timer = setTimeout(() => {
      if (!ref.current) return;
      const ins = ref.current.querySelector("ins.adsbygoogle");
      if (ins && ins.clientHeight === 0) {
        setBlocked(true);
      }
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [ref, timeoutMs]);

  return blocked;
}

// ─── Props ─────────────────────────────────────────────────────

interface AdSenseBannerProps {
  /** Google AdSense slot ID */
  slotId: string;
  /** Format determines size constraints */
  format?: AdFormat;
  /** Additional CSS classes (will NOT override min-height) */
  className?: string;
  /** Show the ad placeholder even if not configured (dev mode) */
  showPlaceholder?: boolean;
  /** Custom label for the placeholder */
  label?: string;
  /** Category slug for contextual affiliate fallback when adblock is detected */
  fallbackCategory?: string;
}

// ─── Component ─────────────────────────────────────────────────

/**
 * Universal AdSense Banner — Zero CLS Guarantee
 *
 * Features:
 *   ✅ Fixed min-height matching exact Google ad sizes
 *   ✅ Adblock detection with graceful fallback
 *   ✅ Single-initialization guard (no duplicate pushes)
 *   ✅ Placeholder in dev/preview mode
 *   ✅ Full ARIA labels for accessibility
 *   ✅ Responsive sizing via Tailwind breakpoints
 */
export function AdSenseBanner({
  slotId,
  format = "responsive",
  className,
  showPlaceholder = false,
  label,
  fallbackCategory,
}: AdSenseBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const blocked = useAdblockDetector(containerRef);
  const size = AD_FORMAT_SIZES[format];

  // Push ad to AdSense queue (once per slot)
  useEffect(() => {
    if (initialized.current || blocked || !isAdEnabled()) return;
    initialized.current = true;

    try {
      // @ts-expect-error — AdSense global type
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silently fail — adblocker or network error
    }
  }, [blocked]);

  // If AdSense isn't configured and we're not showing a placeholder, render nothing
  if (!isAdEnabled() && !showPlaceholder) {
    return null;
  }

  // ── Adblocker fallback with contextual affiliate content ──
  if (blocked) {
    const affiliate = fallbackCategory ? FALLBACK_OFFERS[fallbackCategory] || null : null;
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm",
          size.className,
          className
        )}
        aria-hidden="true"
      >
        {affiliate ? (
          <a
            href={affiliate.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex h-full w-full flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-blue-50/40 to-white hover:from-blue-100/60 transition-all duration-200"
          >
            <span className="text-xl mb-1.5">{affiliate.icon}</span>
            <p className="text-xs font-semibold text-gray-900 leading-tight">{affiliate.title}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-tight max-w-[240px]">{affiliate.description}</p>
            <span className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-3 py-1 text-[9px] font-semibold text-white shadow-sm">
              {affiliate.cta}
            </span>
          </a>
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4">
            <p className="text-[10px] text-gray-300">Advertentie</p>
          </div>
        )}
      </div>
    );
  }

  // ── Placeholder for dev mode ──
  if (showPlaceholder) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "flex items-center justify-center rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-500 font-medium",
          size.className,
          className
        )}
        aria-label={
          label
            ? `Advertentie: ${label}`
            : `Advertentie (${format}, ${size.className.replace(/min-h-\[(\d+)px\]/, "$1px")})`
        }
      >
        {label || `Ad • ${size.className.match(/min-h-\[(\d+)px\]/)?.[1] || "?"}px`}
      </div>
    );
  }

  // ── Live ad ──
  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg bg-gray-50",
        size.className,
        className
      )}
      aria-label={label ? `Advertentie: ${label}` : "Advertentie"}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format={size.adFormat}
        data-full-width-responsive={format === "responsive" ? "true" : "false"}
      />
    </div>
  );
}

// ─── Pre-configured Zone Components ────────────────────────────

/**
 * Zone A: Desktop Sticky Sidebar (300×600)
 * Hidden on mobile, sticky on desktop.
 */
export function AdZoneSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "hidden lg:block w-[160px] xl:w-[300px] shrink-0",
        className
      )}
      aria-label="Advertentie zijbalk"
    >
      <div className="sticky top-24 rounded-xl bg-gradient-to-b from-gray-50/30 to-transparent p-2">
        <AdSenseBanner
          slotId={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || "1234567891"}
          format="vertical"
          label="Sidebar"
          fallbackCategory="algemeen"
        />
      </div>
    </aside>
  );
}

/**
 * Zone B: Inline Below-Results (728×90 desktop / 336×280 mobile)
 * Responsive — switches leaderboard ↔ rectangle at viewport thresholds.
 */
export function AdZoneInline({ className }: { className?: string }) {
  return (
    <div className={cn("w-full rounded-xl bg-gradient-to-b from-gray-50/20 to-transparent p-2", className)} aria-label="Advertentie na resultaten">
      {/* Desktop: 728×90 leaderboard */}
      <div className="hidden md:flex justify-center">
        <AdSenseBanner
          slotId={process.env.NEXT_PUBLIC_AD_SLOT_ABOVE || "1234567890"}
          format="horizontal"
          label="Leaderboard"
        />
      </div>
      {/* Mobile: 336×280 rectangle */}
      <div className="md:hidden flex justify-center">
        <AdSenseBanner
          slotId={process.env.NEXT_PUBLIC_AD_SLOT_INLINE || "1234567892"}
          format="rectangle"
          label="Rectangle"
        />
      </div>
    </div>
  );
}

/**
 * Zone C: Mobile Sticky Anchor Footer (320×100)
 * Dismissible — respects sessionStorage.
 * Only visible on mobile screens.
 */
export function AdZoneMobileAnchor() {
  const [dismissed, setDismissed] = useState(true); // Start dismissed
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check session storage after mount (hydration safety)
    const dismissedAt = sessionStorage.getItem("ad-anchor-dismissed");
    if (dismissedAt) {
      const elapsed = Date.now() - Number(dismissedAt);
      // Re-show after 30 minutes
      if (elapsed < 30 * 60 * 1000) {
        setDismissed(true);
        return;
      }
    }
    // Show anchor after 2 second delay
    const timer = setTimeout(() => setShow(true), 2000);
    setDismissed(false);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem("ad-anchor-dismissed", String(Date.now()));
  };

  if (dismissed || !show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] md:hidden animate-slide-up"
      role="complementary"
      aria-label="Advertentie"
    >
      <div className="relative flex justify-center items-center px-4 py-2">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200/70 text-gray-400 hover:bg-gray-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[10px] transition-all duration-200"
          aria-label="Advertentie sluiten"
          title="Sluiten"
        >
          <X className="h-3 w-3" />
        </button>

        <AdSenseBanner
          slotId={process.env.NEXT_PUBLIC_AD_SLOT_ANCHOR || "1234567893"}
          format="anchor"
          label="Anchor"
        />
      </div>
    </div>
  );
}
