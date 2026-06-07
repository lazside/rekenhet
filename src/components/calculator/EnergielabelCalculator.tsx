"use client";
import { useState, useMemo } from "react";
import { Home, Leaf, Euro } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { formatEUR } from "@/lib/utils";

// ─── Label Data ─────────────────────────────────────────────────

const LABEL_OPTIONS = [
  { value: "A++++ met garantie", label: "A++++ met garantie" },
  { value: "A++++", label: "A++++" },
  { value: "A+++", label: "A+++" },
  { value: "A++", label: "A++" },
  { value: "A+", label: "A+" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
] as const;

type Energielabel = (typeof LABEL_OPTIONS)[number]["value"];

/**
 * Extra leencapaciteit per energielabel op basis van Nibud-normen 2026.
 * Hoe beter het label, hoe hoger de extra hypotheekruimte.
 */
const EXTRA_PER_LABEL: Record<Energielabel, number> = {
  "A++++ met garantie": 50000,
  "A++++": 45000,
  "A+++": 40000,
  "A++": 35000,
  "A+": 30000,
  "A": 25000,
  "B": 15000,
  "C": 10000,
  "D": 5000,
  "E": 0,
  "F": 0,
  "G": 0,
};

/**
 * Extra duurzaamheidsbudget per labelcategorie wanneer de koper
 * zelf wil verduurzamen (max 6% woningwaarde / €20.000).
 */
const DUURZAAMHEID_PER_LABEL: Record<Energielabel, number> = {
  "A++++ met garantie": 5000,
  "A++++": 5000,
  "A+++": 8000,
  "A++": 10000,
  "A+": 12000,
  "A": 15000,
  "B": 18000,
  "C": 20000,
  "D": 20000,
  "E": 20000,
  "F": 20000,
  "G": 20000,
};

// ─── Compute ────────────────────────────────────────────────────

function computeEnergielabel(
  brutoInkomen: number,
  partnerInkomen: number,
  huidigLabel: Energielabel,
  extraVerduurzamen: boolean
) {
  const combined = brutoInkomen + partnerInkomen;
  // Base leencapaciteit: 4.25x combined inkomen (conservatieve Nibud-baseline)
  const baseLeencapaciteit = combined * 4.25;
  // Extra leencapaciteit op basis van energielabel
  const extraLabelBudget = EXTRA_PER_LABEL[huidigLabel] || 0;
  // Duurzaamheidsbudget als koper wil verduurzamen
  const duurzaamheidsBudget = extraVerduurzamen ? DUURZAAMHEID_PER_LABEL[huidigLabel] || 0 : 0;
  // Totaal maximaal te lenen
  const maximaalTeLenen = baseLeencapaciteit + extraLabelBudget + duurzaamheidsBudget;

  return {
    baseLeencapaciteit,
    extraLabelBudget,
    duurzaamheidsBudget,
    maximaalTeLenen,
    combinedInkomen: combined,
  };
}

// ─── Component ──────────────────────────────────────────────────

export default function EnergielabelCalculator() {
  const [brutoInkomen, setBrutoInkomen] = useState(55000);
  const [partnerInkomen, setPartnerInkomen] = useState(0);
  const [huidigLabel, setHuidigLabel] = useState<Energielabel>("D");
  const [extraVerduurzamen, setExtraVerduurzamen] = useState(false);

  const result = useMemo(
    () => computeEnergielabel(brutoInkomen, partnerInkomen, huidigLabel, extraVerduurzamen),
    [brutoInkomen, partnerInkomen, huidigLabel, extraVerduurzamen]
  );

  return (
    <div className="space-y-6">
      {/* ─── Form ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Home className="h-4 w-4 text-indigo-600" />
          Energielabel & Verduurzaming
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="brutoInkomen" className="text-sm font-medium text-gray-700">
              Jouw bruto inkomen (€/jr)
            </label>
            <input
              id="brutoInkomen"
              type="number"
              inputMode="decimal"
              min={0}
              value={brutoInkomen}
              onChange={(e) => setBrutoInkomen(Math.max(0, +e.target.value || 0))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="partnerInkomen" className="text-sm font-medium text-gray-700">
              Partnerinkomen (€/jr, optioneel)
            </label>
            <input
              id="partnerInkomen"
              type="number"
              inputMode="decimal"
              min={0}
              value={partnerInkomen}
              onChange={(e) => setPartnerInkomen(Math.max(0, +e.target.value || 0))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="huidigLabel" className="text-sm font-medium text-gray-700">
              Huidig energielabel
            </label>
            <select
              id="huidigLabel"
              value={huidigLabel}
              onChange={(e) => setHuidigLabel(e.target.value as Energielabel)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              {LABEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="extraVerduurzamen" className="text-sm font-medium text-gray-700">
              Extra verduurzamen?
            </label>
            <div className="flex items-center gap-3 pt-1.5">
              <button
                type="button"
                id="extraVerduurzamen"
                onClick={() => setExtraVerduurzamen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !extraVerduurzamen
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Nee
              </button>
              <button
                type="button"
                onClick={() => setExtraVerduurzamen(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  extraVerduurzamen
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Ja
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Results ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        {/* Primary result */}
        <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-5 text-white shadow-lg text-center">
          <p className="text-sm text-indigo-200">Maximaal te lenen</p>
          <p className="text-3xl font-bold tabular-nums mt-1">
            {formatEUR(result.maximaalTeLenen)}
          </p>
        </div>

        {/* Detail rows */}
        <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100">
          <span className="text-sm text-gray-600">Gezamenlijk inkomen</span>
          <span className="text-sm font-bold tabular-nums">{formatEUR(result.combinedInkomen)}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100">
          <span className="text-sm text-gray-600">Basis leencapaciteit (4,25×)</span>
          <span className="text-sm font-bold tabular-nums">{formatEUR(result.baseLeencapaciteit)}</span>
        </div>
        {result.extraLabelBudget > 0 && (
          <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-800">Extra door energielabel {huidigLabel}</span>
            </div>
            <span className="text-sm font-bold tabular-nums text-emerald-700">+{formatEUR(result.extraLabelBudget)}</span>
          </div>
        )}
        {result.duurzaamheidsBudget > 0 && (
          <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">Verduurzamingsbudget</span>
            </div>
            <span className="text-sm font-bold tabular-nums text-blue-700">+{formatEUR(result.duurzaamheidsBudget)}</span>
          </div>
        )}
      </div>

      {/* ─── Share ─── */}
      <ShareToolbar
        calculatorType="energielabel-berekenen"
        calculatorName="Energielabel & Verduurzaming Hypotheek"
        categoryName="Hypotheek & Wonen"
        inputs={[
          { label: "Bruto inkomen", value: formatEUR(brutoInkomen) },
          { label: "Partnerinkomen", value: formatEUR(partnerInkomen) },
          { label: "Energielabel", value: huidigLabel },
          { label: "Verduurzamen", value: extraVerduurzamen ? "Ja" : "Nee" },
        ]}
        results={[
          { label: "Maximaal te lenen", value: formatEUR(result.maximaalTeLenen), type: "success" },
          { label: "Duurzaamheidsbudget", value: formatEUR(result.duurzaamheidsBudget), type: "info" },
        ]}
      />

      <p className="text-xs text-gray-400 text-center">
        Dit is een indicatie op basis van de actuele Nibud-leennormen. Een hypotheekadviseur berekent de exacte maximale hypotheek.
      </p>
    </div>
  );
}
