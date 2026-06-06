"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ─── AdSense Slot IDs ─────────────────────────────────────────────
// Replace these with your actual AdSense slot IDs after registration.
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-xxxxxxxxxxxxxx";

interface AdSlotProps {
  slotId: string;
  format?: "horizontal" | "vertical" | "rectangle" | "responsive";
  className?: string;
}

/**
 * AdSense display slot with fixed dimensions to prevent CLS.
 * Each slot type has a defined min-height to avoid layout shifts.
 */
function AdSlot({ slotId, format = "responsive", className }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once per slot
    if (initialized.current) return;
    initialized.current = true;

    try {
      // @ts-expect-error - AdSense global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silently fail — AdSense may be blocked
    }
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg",
        {
          "min-h-[90px] w-full": format === "horizontal" || format === "responsive",
          "min-h-[600px] min-w-[160px]": format === "vertical",
          "min-h-[250px] min-w-[300px]": format === "rectangle",
        },
        className
      )}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format={format === "responsive" ? "auto" : format}
        data-full-width-responsive={format === "responsive" ? "true" : "false"}
      />
    </div>
  );
}

// ─── Pre-defined slot placements ──────────────────────────────────

/** Horizontal banner below page H1 — 728x90 or responsive */
export function AdAboveContent({ className }: { className?: string }) {
  return (
    <AdSlot
      slotId="1234567890" // Replace with "above-content" slot ID
      format="horizontal"
      className={className}
    />
  );
}

/** Vertical skyscraper in sidebar — 160x600 or 300x600 */
export function AdSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("hidden lg:block w-[160px] shrink-0", className)}>
      <div className="sticky top-20">
        <AdSlot
          slotId="1234567891" // Replace with "sidebar" slot ID
          format="vertical"
        />
      </div>
    </aside>
  );
}

/** Responsive banner below calculator results */
export function AdBelowResults({ className }: { className?: string }) {
  return (
    <AdSlot
      slotId="1234567892" // Replace with "below-results" slot ID
      format="responsive"
      className={className}
    />
  );
}
