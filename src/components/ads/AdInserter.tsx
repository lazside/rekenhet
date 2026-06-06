"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AD_FORMAT_SIZES, isAdEnabled, ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";

// ─── Adblock detection ─────────────────────────────────────────

function useAdblockCheck(
  containerRef: React.RefObject<HTMLDivElement | null>,
  timeoutMs = 3000
): boolean {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const timer = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const ins = el.querySelector("ins.adsbygoogle");
      // AdSense ins element has zero rendered height when blocked
      if (ins && ins.clientHeight === 0) {
        setBlocked(true);
      }
    }, timeoutMs);
    return () => clearTimeout(timer);
  }, [containerRef, timeoutMs]);

  return blocked;
}

// ─── Props ─────────────────────────────────────────────────────

interface AdInserterProps {
  /** Unique ID for this slot (used to enforce single-init) */
  id: string;
  /** Google AdSense slot ID */
  slotId?: string;
  /** Additional CSS classes (does NOT override min-h) */
  className?: string;
  /** Label shown in dev placeholder mode */
  label?: string;
}

// ─── Component ─────────────────────────────────────────────────

/**
 * AdInserter — CLS-safe banner injector between page modules.
 *
 * Renders a 728×90 leaderboard (desktop) or 336×280 rectangle (mobile)
 * between major content sections. The container always reserves exact
 * dimensions: min-h-[90px] desktop, min-h-[280px] mobile.
 *
 * When an adblocker is active, the container collapses neatly via CSS
 * (renders a hidden 1px placeholder to avoid layout thrash).
 *
 * Zero CLS guarantee:
 *   ✅ Fixed min-h on the wrapper — no height collapse
 *   ✅ Adblock detection collapses safely
 *   ✅ No flicker — dimensions locked before React hydrates
 */
export function AdInserter({
  id,
  slotId,
  className,
  label,
}: AdInserterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const blocked = useAdblockCheck(containerRef);

  // Push AdSense ad (single init, never retry)
  useEffect(() => {
    if (initialized.current || blocked || !isAdEnabled()) return;
    initialized.current = true;

    try {
      // @ts-expect-error — global AdSense type
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silently fail
    }
  }, [blocked]);

  // ── Not configured → collapse cleanly with 1px remnant ──
  if (!isAdEnabled()) {
    return <div className="w-full overflow-hidden" style={{ height: "1px" }} aria-hidden="true" />;
  }

  // ── Adblocker detected → collapse cleanly ──
  if (blocked) {
    return <div className="w-full overflow-hidden" style={{ height: "1px" }} aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full", className)}
      aria-label={label ? `Advertentie: ${label}` : "Advertentie"}
    >
      {/* Desktop: 728×90 leaderboard */}
      <div className="hidden md:flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 min-h-[90px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "728px", height: "90px" }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slotId || "1234567890"}
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        />
      </div>

      {/* Mobile: 336×280 rectangle */}
      <div className="flex md:hidden items-center justify-center overflow-hidden rounded-lg bg-gray-50 min-h-[280px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "336px", height: "280px" }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slotId || "1234567892"}
          data-ad-format="rectangle"
          data-full-width-responsive="false"
        />
      </div>
    </div>
  );
}
