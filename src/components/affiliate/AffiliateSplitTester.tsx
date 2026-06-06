"use client";

import { useState, useEffect, useCallback } from "react";
import { ExternalLink, TrendingUp, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Offer Type (shared shape) ────────────────────────────────

export interface SplitOffer {
  id: string;
  name: string;
  description: string;
  cta: string;
  url: string;
  icon: string;
  priority?: number;
}

// ─── Props ────────────────────────────────────────────────────

interface AffiliateSplitTesterProps {
  /** Variant A config */
  offerA: SplitOffer;
  /** Variant B config */
  offerB: SplitOffer;
  /** Optional className overrides */
  className?: string;
  /** Force a specific variant for testing (overrides randomizer) */
  forceVariant?: "a" | "b";
}

// ─── Telemetry endpoint ───────────────────────────────────────

const TELEMETRY_URL = "/api/telemetry";

function sendBeacon(variant: "a" | "b", offerId: string): void {
  try {
    const payload = JSON.stringify({
      calculatorId: "affiliate-split-test",
      action: "affiliate_click",
      metadata: {
        variant: `variant_${variant}`,
        offerId,
        clicked: true,
      },
    });
    // sendBeacon with string sends text/plain — API needs application/json
    navigator.sendBeacon(
      TELEMETRY_URL,
      new Blob([payload], { type: "application/json" })
    );
  } catch {
    // Beacon failure is non-critical — silent ignore
  }
}

// ─── Component ────────────────────────────────────────────────

/**
 * AffiliateSplitTester — Cookie-less A/B split test wrapper.
 *
 * Uses client-side 50/50 randomisation at initial render to select
 * one of two offer variants. Both variants share an identical DOM
 * shell (same dimensions, same structure), guaranteeing zero CLS
 * regardless of which variant is shown.
 *
 * On click: fires an async `sendBeacon` to `/api/telemetry` with
 * the variant ID and offer ID — no cookies, no PII, no blocking.
 */
export function AffiliateSplitTester({
  offerA,
  offerB,
  className,
  forceVariant,
}: AffiliateSplitTesterProps) {
  const [variant, setVariant] = useState<"a" | "b" | null>(null);

  // Deterministic choice on mount — stays stable for the session
  useEffect(() => {
    if (forceVariant === "a" || forceVariant === "b") {
      setVariant(forceVariant);
    } else {
      setVariant(Math.random() < 0.5 ? "a" : "b");
    }
  }, [forceVariant]);

  const activeOffer = variant === "a" ? offerA : variant === "b" ? offerB : null;

  const handleClick = useCallback(() => {
    if (!activeOffer) return;
    sendBeacon(variant!, activeOffer.id);
  }, [variant, activeOffer]);

  // ── Loading: CLS-safe skeleton (same dimensions as card) ──
  if (!activeOffer) {
    return (
      <div
        className={cn(
          "rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-5 shadow-sm",
          "min-h-[168px]",
          className
        )}
        aria-label="Aanbevolen aanbieding wordt geladen"
      >
        <div className="animate-pulse space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-blue-200" />
            <div className="h-4 w-2/3 rounded bg-blue-200" />
          </div>
          <div className="h-3 w-full rounded bg-blue-100" />
          <div className="h-3 w-4/5 rounded bg-blue-100" />
          <div className="h-10 w-full rounded-lg bg-blue-200" />
        </div>
      </div>
    );
  }

  // ── Active variant — CLS-safe: same container dimensions ──
  return (
    <div
      className={cn(
        "rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-5 shadow-sm",
        "min-h-[168px]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">
          {activeOffer.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-gray-900">
              {activeOffer.name}
            </h3>
            {(activeOffer.priority ?? 0) >= 9 && (
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 whitespace-nowrap">
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                Aanbevolen
              </span>
            )}
            {/* Split-test badge for debugging */}
            <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700 whitespace-nowrap">
              <FlaskConical className="h-2.5 w-2.5 mr-0.5" />
              Variant {variant!.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            {activeOffer.description}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <a
        href={activeOffer.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span>{activeOffer.cta}</span>
        <ExternalLink
          className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
