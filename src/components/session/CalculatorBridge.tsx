"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";
import {
  loadCalculatorState,
  isStateFresh,
  getBridgeTargets,
  CalculatorSessionState,
} from "@/lib/session/calculator-state";

/**
 * Bridge CTA block — shows contextual links to related calculators
 * pre-filled with data from the current calculation.
 *
 * Only renders when session state exists and is fresh (< 1 hour).
 * Degrades gracefully (renders nothing) when no state is available.
 */
export function CalculatorBridge({
  currentSource,
}: {
  /** The calculator slug that created this state (to avoid self-linking) */
  currentSource?: string;
}) {
  const [targets, setTargets] = useState<
    { slug: string; label: string; description: string; url: string | null }[]
  >([]);

  useEffect(() => {
    const state = loadCalculatorState();
    if (!isStateFresh(state)) return;
    const all = getBridgeTargets(state);
    // Exclude self-link
    const filtered = all.filter((t) => t.slug !== currentSource);
    setTargets(filtered);
  }, [currentSource]);

  if (targets.length === 0) return null;

  return (
    <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900">
          Verder rekenen met je resultaat
        </h3>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        Je gegevens zijn onthouden. Ga verder met een gerelateerde berekening:
      </p>
      <div className="space-y-2">
        {targets.map((t) => (
          <Link
            key={t.slug}
            href={t.url || "#"}
            className="flex items-center justify-between rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div>
              <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                {t.label}
              </span>
              <p className="text-xs text-gray-400 mt-0.5">{t.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-400 group-hover:text-blue-600 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
