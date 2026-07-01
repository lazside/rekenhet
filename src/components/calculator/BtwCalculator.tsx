"use client";

import { useState, useCallback, useMemo } from "react";
import { formatEUR } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Calculator, SlidersHorizontal, ArrowDownUp, Percent, Info } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";

// ─── BTW Tarieven ─────────────────────────────────────────────

const BTW_TARIEVEN = [
  { value: 21, label: "21% (standaard)" },
  { value: 9, label: "9% (laag)" },
  { value: 0, label: "0% (vrijstelling)" },
] as const;

// ─── Berekening ───────────────────────────────────────────────

interface BtwBreakdown {
  bedrag: number;
  tarief: number;
  btwBedrag: number;
  totaalInclusief: number;
  totaalExclusief: number;
  tariefLabel: string;
}

function calculateBtw(
  bedrag: number,
  tarief: number,
  isInclusief: boolean
): BtwBreakdown {
  const tariefLabel =
    BTW_TARIEVEN.find((t) => t.value === tarief)?.label || `${tarief}%`;

  if (tarief === 0) {
    return {
      bedrag,
      tarief,
      btwBedrag: 0,
      totaalInclusief: bedrag,
      totaalExclusief: bedrag,
      tariefLabel,
    };
  }

  if (isInclusief) {
    // Bedrag is inclusief BTW
    const factor = 1 + tarief / 100;
    const excl = bedrag / factor;
    const btw = bedrag - excl;
    return {
      bedrag,
      tarief,
      btwBedrag: Math.round(btw * 100) / 100,
      totaalInclusief: bedrag,
      totaalExclusief: Math.round(excl * 100) / 100,
      tariefLabel,
    };
  } else {
    // Bedrag is exclusief BTW
    const factor = 1 + tarief / 100;
    const btw = bedrag * (tarief / 100);
    return {
      bedrag,
      tarief,
      btwBedrag: Math.round(btw * 100) / 100,
      totaalInclusief: Math.round(bedrag * factor * 100) / 100,
      totaalExclusief: bedrag,
      tariefLabel,
    };
  }
}

// ─── Tooltip ──────────────────────────────────────────────────

function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <Info className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg z-10">
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </span>
    </span>
  );
}

// ─── Result Row ───────────────────────────────────────────────

function ResultRow({
  label,
  value,
  type = "default",
  tooltip,
}: {
  label: string;
  value: string;
  type?: "default" | "success" | "warning" | "info" | "highlight";
  tooltip?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg px-4 py-3",
        {
          "bg-gray-50": type === "default",
          "bg-emerald-50 border border-emerald-100": type === "success",
          "bg-amber-50 border border-amber-100": type === "warning",
          "bg-blue-50 border border-blue-100": type === "info",
          "bg-gray-100 border border-gray-200": type === "highlight",
        }
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-gray-600">{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <span
        className={cn(
          "text-sm font-semibold tabular-nums",
          {
            "text-gray-900": type === "default" || type === "highlight",
            "text-emerald-700": type === "success",
            "text-amber-700": type === "warning",
            "text-indigo-700": type === "info",
          }
        )}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export default function BtwCalculator() {
  const [bedrag, setBedrag] = useState(121);
  const [tarief, setTarief] = useState(21);
  const [isInclusief, setIsInclusief] = useState(true);

  const breakdown = useMemo(
    () => calculateBtw(bedrag, tarief, isInclusief),
    [bedrag, tarief, isInclusief]
  );

  return (
    <div className="space-y-6" role="form" aria-label="BTW calculator">
      {/* ── Input ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-indigo-600" />
          Jouw gegevens
        </h2>

        {/* Bedrag */}
        <div className="space-y-2">
          <label htmlFor="btw-bedrag" className="block text-sm font-medium text-gray-700">
            Bedrag
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
            <input
              id="btw-bedrag"
              type="text"
              inputMode="decimal"
              min={0}
              step={0.01}
              value={bedrag}
              onChange={(e) => setBedrag(e.target.value === '' ? 0 : Number(e.target.value))}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-7 pr-3 text-lg font-semibold text-gray-900 tabular-nums focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Tarief selectie */}
        <div className="space-y-2">
          <label htmlFor="btw-tarief" className="block text-sm font-medium text-gray-700">
            BTW-tarief
          </label>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="BTW-tarief">
            {BTW_TARIEVEN.map((t) => (
              <button
                key={t.value}
                role="radio"
                aria-checked={tarief === t.value}
                onClick={() => setTarief(t.value)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-all text-center",
                  tarief === t.value
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Berekeningswijze */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Het bedrag van €{bedrag} is...
          </label>
          <div className="flex gap-2" role="radiogroup" aria-label="Berekeningswijze">
            <button
              role="radio"
              aria-checked={isInclusief}
              onClick={() => setIsInclusief(true)}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                isInclusief
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Inclusief BTW
            </button>
            <button
              role="radio"
              aria-checked={!isInclusief}
              onClick={() => setIsInclusief(false)}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                !isInclusief
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Exclusief BTW
            </button>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Percent className="h-4 w-4 text-indigo-600" />
          BTW-berekening
        </h2>

        <ResultRow
          label={`Bedrag ${isInclusief ? "inclusief" : "exclusief"} BTW`}
          value={formatEUR(breakdown.bedrag)}
          type="default"
        />
        <ResultRow
          label={`BTW bedrag (${breakdown.tariefLabel})`}
          value={formatEUR(breakdown.btwBedrag)}
          type="warning"
          tooltip={`${breakdown.tarief}% BTW over €${breakdown.totaalExclusief.toFixed(2)}`}
        />
        <div className="border-t border-gray-200 pt-1">
          <ResultRow
            label="Totaal exclusief BTW"
            value={formatEUR(breakdown.totaalExclusief)}
            type="info"
          />
          <ResultRow
            label="Totaal inclusief BTW"
            value={formatEUR(breakdown.totaalInclusief)}
            type="highlight"
          />
        </div>
      </div>

      {/* ── Share ── */}
      <ShareToolbar
        calculatorType="btw-calculator"
        calculatorName="BTW Calculator"
        categoryName="Ondernemen"
        inputs={[
          { label: "Bedrag", value: `€ ${formatEUR(breakdown.bedrag)}` },
          { label: "BTW-tarief", value: `${breakdown.tarief}%` },
          { label: "Berekeningswijze", value: isInclusief ? "Inclusief BTW" : "Exclusief BTW" },
        ]}
        results={[
          { label: "BTW bedrag", value: formatEUR(breakdown.btwBedrag), type: "warning" },
          { label: "Totaal exclusief", value: formatEUR(breakdown.totaalExclusief), type: "info" },
          { label: "Totaal inclusief", value: formatEUR(breakdown.totaalInclusief), type: "success" },
        ]}
      />

      {/* ── Footer ── */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Deze berekening is een indicatie. De exacte BTW kan afwijken afhankelijk van
        de specifieke btw-regelgeving voor jouw product of dienst.
      </p>
    </div>
  );
}
