"use client";

import { useState, useMemo } from "react";
import { Wallet, TrendingDown, Info, Users } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import { calculateToeslagen } from "@/lib/calculators/toeslagen";
import type { ToeslagResult } from "@/lib/calculators/toeslagen";

interface BenefitsImpactPanelProps {
  /** The toetsingsinkomen used for calculation */
  toetsingsinkomen: number;
  /** Allow user to change number of children */
  showKindToggle?: boolean;
}

const COLOR_MAP: Record<string, { bg: string; text: string; bar: string; light: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", bar: "bg-blue-500", light: "bg-blue-100" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", bar: "bg-teal-500", light: "bg-teal-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", bar: "bg-purple-500", light: "bg-purple-100" },
};

export function BenefitsImpactPanel({ toetsingsinkomen, showKindToggle = true }: BenefitsImpactPanelProps) {
  const [aantalKinderen, setAantalKinderen] = useState(1);

  const toeslagen = useMemo(
    () => calculateToeslagen(toetsingsinkomen, { aantalKinderen: showKindToggle ? aantalKinderen : 0 }),
    [toetsingsinkomen, aantalKinderen, showKindToggle]
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900">Toeslagen Impact</h3>
        </div>
        {showKindToggle && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Users className="h-3.5 w-3.5" />
            <select
              value={aantalKinderen}
              onChange={(e) => setAantalKinderen(+e.target.value)}
              className="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
              aria-label="Aantal kinderen"
            >
              <option value={0}>0 kinderen</option>
              <option value={1}>1 kind</option>
              <option value={2}>2 kinderen</option>
              <option value={3}>3 kinderen</option>
              <option value={4}>4+ kinderen</option>
            </select>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
        <p className="text-xs text-gray-500">Geschatte toeslagen per maand</p>
        <p className="text-3xl font-bold text-gray-900 tabular-nums mt-1">
          {formatEUR(toeslagen.totaalPerMaand)}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          bij toetsingsinkomen van {formatEUR(toetsingsinkomen)}/jr
        </p>
      </div>

      <div className="space-y-3">
        {renderToeslag(toeslagen.zorg)}
        {renderToeslag(toeslagen.huur)}
        {renderToeslag(toeslagen.kind)}
      </div>

      {/* Info box */}
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-3">
        <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-700 leading-relaxed">
          Dit is een indicatie op basis van de 2026 belastingregels. De werkelijke
          toeslag hangt af van je exacte situatie (huurprijs, zorgkosten,
          verzamelinkomen, vermogen). Raadpleeg de officiële{" "}
          <a
            href="https://www.belastingdienst.nl/toeslagen"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium hover:text-amber-800"
          >
            Belastingdienst Toeslagen tool
          </a>{" "}
          voor een definitieve berekening.
        </p>
      </div>
    </div>
  );
}

function renderToeslag(result: ToeslagResult) {
  const colors = COLOR_MAP[result.color] || COLOR_MAP.blue;
  return (
    <div key={result.label}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-gray-700">{result.label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{result.status}</span>
          <span className={`text-xs font-bold tabular-nums ${result.bedrag > 0 ? colors.text : "text-gray-400"}`}>
            {result.bedrag > 0 ? `${formatEUR(result.bedrag)}/jr` : "—"}
          </span>
        </div>
      </div>
      <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors.bar}`}
          style={{ width: `${result.retainedPct}%` }}
        />
        {result.bedrag > 0 && result.retainedPct < 100 && (
          <div
            className="absolute right-0 top-0 h-full rounded-full bg-gray-200/50"
            style={{ width: `${100 - result.retainedPct}%`, left: `${result.retainedPct}%` }}
          />
        )}
      </div>
    </div>
  );
}
