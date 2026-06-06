"use client";

import { useState, useCallback, useMemo, useId, useEffect } from "react";
import { formatEUR, formatNL } from "@/lib/utils";
import { calculateNetSalary, type BrutoNettoBreakdown } from "@/lib/calculators/bruto-netto-2026";
import { cn } from "@/lib/utils";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { ShareCalculationLink } from "@/components/share/ShareCalculationLink";
import { EmbedCodeGenerator } from "@/components/embed/EmbedCodeGenerator";
import { ResultBenchmark } from "@/components/benchmark/ResultBenchmark";
import netIncomeData from "@/data/cbs-benchmarks.json";
import { CalculatorBridge } from "@/components/session/CalculatorBridge";
import { saveCalculatorState } from "@/lib/session/calculator-state";
import { BenefitsImpactPanel } from "@/components/toeslagen/BenefitsImpactPanel";
import { InvestmentTimeline } from "@/components/investment/InvestmentTimeline";
import { Info, SlidersHorizontal, Car, Check, Percent, ArrowDownUp, Users } from "lucide-react";

// ─── Default state ─────────────────────────────────────────────

const DEFAULTS = {
  salary: 48000,
  period: "jaar" as "maand" | "jaar",
  vakantiegeld: true,
  bijtelling: 0,
  catalogusWaarde: 45000,
  algemeneHeffingskorting: true,
  arbeidskorting: true,
};

const BIJTELLING_OPTIES = [
  { value: 0, label: "Geen auto van de zaak" },
  { value: 22, label: "22% bijtelling" },
  { value: 16, label: "16% bijtelling (elektrisch)" },
  { value: 12, label: "12% bijtelling (oude regeling)" },
];

// ─── Tooltip Component ──────────────────────────────────────────

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

// ─── Slider Component ───────────────────────────────────────────

function SalarySlider({
  value,
  onChange,
  min,
  max,
  step,
  label,
  ariaLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  ariaLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500">{label}</label>
        <span className="text-xs text-gray-400 tabular-nums">
          {formatEUR(value)}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={ariaLabel}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-blue-600
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-grab
            [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-blue-600
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-grab"
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Toggle Switch ──────────────────────────────────────────────

function Toggle({
  label,
  checked,
  onChange,
  tooltip,
  id,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  tooltip?: string;
  id: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer select-none">
          {label}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          checked ? "bg-blue-600" : "bg-gray-300"
        )}
      >
        <span
          className={cn(
            "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[18px]" : "translate-x-[3px]"
          )}
        />
      </button>
    </div>
  );
}

// ─── Select ─────────────────────────────────────────────────────

function Select({
  options,
  value,
  onChange,
  label,
  id,
}: {
  options: { value: number; label: string }[];
  value: number;
  onChange: (v: number) => void;
  label: string;
  id: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Result Row ─────────────────────────────────────────────────

/**
 * Result Row — modern card variant
 */
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
        "flex items-center justify-between rounded-xl px-5 py-3.5 transition-all",
        {
          "bg-white border border-gray-100 hover:border-gray-200": type === "default",
          "bg-gradient-to-r from-emerald-50 to-white border border-emerald-100": type === "success",
          "bg-gradient-to-r from-amber-50 to-white border border-amber-100": type === "warning",
          "bg-gradient-to-r from-blue-50 to-white border border-blue-100": type === "info",
          "bg-gradient-to-r from-gray-100 to-white border border-gray-200": type === "highlight",
        }
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <span
        className={cn(
          "text-sm font-bold tabular-nums tracking-tight",
          {
            "text-gray-900": type === "default" || type === "highlight",
            "text-emerald-700": type === "success",
            "text-amber-700": type === "warning",
            "text-blue-700": type === "info",
          }
        )}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Animated Value ─────────────────────────────────────────────

function AnimatedValue({ value, suffix = "" }: { value: number; suffix?: string }) {
  const formatted = formatEUR(Math.abs(value));
  const isNegative = value < 0;
  return (
    <span
      className="tabular-nums transition-all duration-300"
      aria-live="polite"
      aria-atomic="true"
    >
      {isNegative && <span className="text-red-500">−</span>}
      {formatted}
      {suffix}
    </span>
  );
}

// ─── Main Component ─────────────────────────────────────────────

interface BrutoNettoCalculatorProps {
  /** Optional pre-filled salary value from parameterized routes */
  initialSalary?: number;
}

export default function BrutoNettoCalculator({ initialSalary }: BrutoNettoCalculatorProps) {
  const [salary, setSalary] = useState(initialSalary || DEFAULTS.salary);
  const [period, setPeriod] = useState<"maand" | "jaar">(DEFAULTS.period);
  const [vakantiegeld, setVakantiegeld] = useState(DEFAULTS.vakantiegeld);
  const [bijtelling, setBijtelling] = useState(DEFAULTS.bijtelling);
  const [catalogusWaarde, setCatalogusWaarde] = useState(DEFAULTS.catalogusWaarde);
  const [algemeneHK, setAlgemeneHK] = useState(DEFAULTS.algemeneHeffingskorting);
  const [arbeidskorting, setArbeidskorting] = useState(DEFAULTS.arbeidskorting);

  // Convert to annual
  const brutoJaar = period === "maand" ? salary * 12 : salary;

  // Memoize calculation
  const breakdown = useMemo(
    () =>
      calculateNetSalary({
        brutoJaar,
        vakantiegeldInbegrepen: !vakantiegeld,
        bijtellingPercentage: bijtelling,
        catalogusWaarde: bijtelling > 0 ? catalogusWaarde : 0,
        algemeneHeffingskorting: algemeneHK,
        arbeidskorting,
      }),
    [brutoJaar, vakantiegeld, bijtelling, catalogusWaarde, algemeneHK, arbeidskorting]
  );

  // Slider bounds depend on period
  const sliderMin = period === "maand" ? 500 : 6000;
  const sliderMax = period === "maand" ? 25000 : 300000;

  // Save state for cross-calculator bridging
  useEffect(() => {
    saveCalculatorState({
      grossAnnualSalary: brutoJaar,
      netMonthlyIncome: breakdown.nettoMaand,
      calculationType: "bruto-netto-salaris-calculator",
    });
  }, [brutoJaar, breakdown.nettoMaand]);

  // Hydrate from shared URL params on mount
  useEffect(() => {
    import("@/lib/share/share-url").then(({ getShareStateFromUrl }) => {
      const state = getShareStateFromUrl();
      if (state) {
        if (typeof state.salary === "number") setSalary(state.salary);
        if (typeof state.period === "string") setPeriod(state.period as "maand" | "jaar");
        if (typeof state.vakantiegeld === "boolean") setVakantiegeld(state.vakantiegeld);
      }
    });
  }, []);

  const sliderStep = period === "maand" ? 50 : 600;

  const handleSalaryChange = useCallback(
    (v: number) => setSalary(Math.max(sliderMin, Math.min(sliderMax, v))),
    [sliderMin, sliderMax]
  );

  return (
    <div className="space-y-6" role="form" aria-label="Bruto netto salaris calculator">
      {/* ── Input Section ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          Jouw gegevens
        </h2>

        {/* Period toggle */}
        <div className="flex gap-2" role="radiogroup" aria-label="Periode">
          {(["maand", "jaar"] as const).map((p) => (
            <button
              key={p}
              role="radio"
              aria-checked={period === p}
              onClick={() => {
                setPeriod(p);
                // Convert salary when switching
                if (p === "maand" && period === "jaar") setSalary(Math.round(salary / 12 / 50) * 50);
                if (p === "jaar" && period === "maand") setSalary(Math.round(salary * 12 / 600) * 600);
              }}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                period === p
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Per {p === "maand" ? "maand" : "jaar"}
            </button>
          ))}
        </div>

        {/* Salary Input */}
        <div className="space-y-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
            <input
              type="number"
              inputMode="decimal"
              value={salary}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!isNaN(v) && v >= 0) setSalary(v);
              }}
              min={sliderMin}
              max={sliderMax}
              step={sliderStep}
              aria-label={`Bruto salaris per ${period}`}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-7 pr-3 text-lg font-semibold text-gray-900 tabular-nums focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <SalarySlider
            value={salary}
            onChange={handleSalaryChange}
            min={sliderMin}
            max={sliderMax}
            step={sliderStep}
            label={`Bruto per ${period === "maand" ? "maand" : "jaar"}`}
            ariaLabel={`Schuifregelaar bruto salaris per ${period}`}
          />
        </div>

        {/* Toggles */}
        <div className="space-y-1 border-t border-gray-100 pt-4">
          <Toggle
            id="vakantiegeld"
            label="Vakantietoeslag (8%)"
            checked={vakantiegeld}
            onChange={setVakantiegeld}
            tooltip="Voegt 8% vakantietoeslag toe aan het bruto jaarsalaris. Dit wordt standaard in Nederland uitbetaald in mei."
          />
          <Toggle
            id="algemene-hk"
            label="Algemene heffingskorting"
            checked={algemeneHK}
            onChange={setAlgemeneHK}
            tooltip="Een belastingkorting waar iedereen recht op heeft. Het bedrag hangt af van je inkomen."
          />
          <Toggle
            id="arbeidskorting"
            label="Arbeidskorting"
            checked={arbeidskorting}
            onChange={setArbeidskorting}
            tooltip="Een belastingkorting voor mensen die werken. Hoe meer je verdient, hoe hoger de korting (tot een maximum)."
          />
        </div>

        {/* Bijtelling */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <Select
            id="bijtelling"
            label="Auto van de zaak (bijtelling)"
            options={BIJTELLING_OPTIES}
            value={bijtelling}
            onChange={setBijtelling}
          />
          {bijtelling > 0 && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
              <input
                type="number"
                value={catalogusWaarde}
                onChange={(e) => setCatalogusWaarde(Number(e.target.value) || 0)}
                aria-label="Cataloguswaarde auto"
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-7 pr-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Cataloguswaarde auto"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Results Section ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <ArrowDownUp className="h-4 w-4 text-blue-600" />
          Jouw resultaat
        </h2>

        {/* Net monthly result — premium hero card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <p className="text-sm text-blue-200 font-medium mb-1">Netto per maand</p>
            <p className="text-5xl font-bold tabular-nums tracking-tight text-white drop-shadow-sm">
              <AnimatedValue value={breakdown.nettoMaand} />
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-blue-200">
                <span>Effectief tarief</span>
                <span className="font-semibold text-white">{breakdown.effectiveRate}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-blue-200">
                <span>Marginaal</span>
                <span className="font-semibold text-white">{breakdown.marginalRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="space-y-2">
          <ResultRow
            label="Bruto per jaar"
            value={formatEUR(breakdown.brutoJaar)}
            type="default"
          />
          {breakdown.vakantiegeld > 0 && (
            <ResultRow
              label="Vakantietoeslag"
              value={`+ ${formatEUR(breakdown.vakantiegeld)}`}
              type="info"
              tooltip="8% van je bruto jaarsalaris, standaard uitbetaald in mei."
            />
          )}
          {bijtelling > 0 && (
            <ResultRow
              label="Bijtelling (auto)"
              value={`+ ${formatEUR(breakdown.belastbaarInkomen - breakdown.brutoJaar - breakdown.vakantiegeld)}`}
              type="warning"
              tooltip={`${bijtelling}% van de cataloguswaarde toegevoegd aan je belastbaar inkomen.`}
            />
          )}
          <ResultRow
            label="Belastbaar inkomen"
            value={formatEUR(breakdown.belastbaarInkomen)}
            type="default"
            tooltip="Het bedrag waarover je belasting betaalt (bruto + vakantiegeld + bijtelling)."
          />
          <ResultRow
            label="Inkomstenbelasting"
            value={`− ${formatEUR(breakdown.totaleBelasting)}`}
            type="warning"
            tooltip="Belasting berekend over de belastingschijven 2026."
          />
          {breakdown.premieVolksverzekeringen > 0 && (
            <ResultRow
              label="Premies volksverzekeringen"
              value={`− ${formatEUR(breakdown.premieVolksverzekeringen)}`}
              type="warning"
              tooltip="AOW, Anw en Wlz premies. Alleen over het deel tot ~€40.018."
            />
          )}
          {breakdown.algemeneHeffingskortingBedrag > 0 && (
            <ResultRow
              label="Algemene heffingskorting"
              value={`+ ${formatEUR(breakdown.algemeneHeffingskortingBedrag)}`}
              type="success"
              tooltip={`Korting van €${formatNL(breakdown.algemeneHeffingskortingBedrag)} op je belasting.`}
            />
          )}
          {breakdown.arbeidskortingBedrag > 0 && (
            <ResultRow
              label="Arbeidskorting"
              value={`+ ${formatEUR(breakdown.arbeidskortingBedrag)}`}
              type="success"
              tooltip={`Korting van €${formatNL(breakdown.arbeidskortingBedrag)} omdat je werkt.`}
            />
          )}
          <div className="border-t border-gray-200 pt-1.5">
            <ResultRow
              label="Netto per jaar"
              value={formatEUR(breakdown.nettoJaar)}
              type="highlight"
            />
          </div>
          <ResultRow
            label="Marginaal tarief"
            value={`${breakdown.marginalRate}%`}
            type="info"
            tooltip="Het hoogste belastingtarief dat op jouw inkomen van toepassing is."
          />
        </div>

        {/* Bracket breakdown */}
        {breakdown.bracketDetails.length > 0 && (
          <details className="group rounded-lg border border-gray-200">
            <summary className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600">
              Belastingschijven 2026
              <span className="text-xs text-gray-400 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="px-4 pb-3 space-y-1.5">
              {breakdown.bracketDetails.map((b, i) => (
                <div key={i} className="flex justify-between text-xs text-gray-600">
                  <span>{b.label}</span>
                  <span className="tabular-nums">
                    {formatEUR(b.amount)} → {formatEUR(b.tax)}
                  </span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* ── Share Toolbar ── */}
      <ShareToolbar
        calculatorType="bruto-netto-salaris-calculator"
        calculatorName="Bruto Netto Salaris Calculator"
        categoryName="Werk & Inkomen"
        inputs={[
          { label: "Bruto jaarsalaris", value: formatEUR(breakdown.brutoJaar) },
          { label: "Vakantiegeld", value: breakdown.vakantiegeld > 0 ? "Toegevoegd (8%)" : "Inbegrepen" },
          { label: "Belastbaar inkomen", value: formatEUR(breakdown.belastbaarInkomen) },
        ]}
        results={[
          { label: "Netto per maand", value: formatEUR(breakdown.nettoMaand), type: "success" },
          { label: "Netto per jaar", value: formatEUR(breakdown.nettoJaar), type: "success" },
          { label: "Inkomstenbelasting", value: formatEUR(breakdown.totaleBelasting), type: "warning" },
          { label: "Premies volksverzekeringen", value: formatEUR(breakdown.premieVolksverzekeringen), type: "info" },
          { label: "Effectief tarief", value: `${breakdown.effectiveRate}%`, type: "default" },
        ]}
      />

      {/* Shareable calculation link */}
      <div className="flex justify-center gap-2 flex-wrap">
        <ShareCalculationLink
          calculatorSlug="werk-en-inkomen/bruto-netto-salaris-calculator"
          state={{ salary: brutoJaar, period, vakantiegeld: !vakantiegeld }}
        />
        <EmbedCodeGenerator
          calculatorSlug="werk-en-inkomen/bruto-netto-salaris-calculator"
          calculatorName="Bruto Netto Salaris Calculator"
        />
      </div>

      {/* Cross-calculator bridge */}
      <CalculatorBridge currentSource="bruto-netto-salaris-calculator" />

      {/* ── CBS Benchmark ── */}
      <details className="group rounded-xl border border-gray-200 bg-white shadow-sm open:border-blue-200 open:shadow-md transition-all">
        <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            CBS Benchmark — hoe scoort jouw inkomen?
          </span>
          <span className="text-xs text-gray-400 transition-transform group-open:rotate-180">▼</span>
        </summary>
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          <CbsBenchmarkSection nettoJaar={breakdown.nettoJaar} />
        </div>
      </details>

      {/* ── Toeslagen Impact ── */}
      <BenefitsImpactPanel toetsingsinkomen={brutoJaar} />

      {/* ── Visual Breakdown ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          <h3 className="text-sm font-semibold text-gray-900">Inkomstenverdeling</h3>
        </div>

        {/* Animated stacked bar */}
        <div className="relative h-8 w-full rounded-xl overflow-hidden flex shadow-inner">
          {(() => {
            const total = breakdown.nettoJaar + breakdown.loonheffing + breakdown.premieVolksverzekeringen;
            if (total <= 0) return null;
            const netPct = (breakdown.nettoJaar / total) * 100;
            const taxPct = ((breakdown.loonheffing - breakdown.premieVolksverzekeringen) / total) * 100;
            const socialPct = (breakdown.premieVolksverzekeringen / total) * 100;
            const segments = [
              { pct: netPct, color: "bg-gradient-to-r from-emerald-400 to-emerald-500", label: "Netto" },
              { pct: taxPct, color: "bg-gradient-to-r from-blue-400 to-blue-500", label: "Belasting" },
              { pct: socialPct, color: "bg-gradient-to-r from-amber-400 to-amber-500", label: "Premies" },
            ];
            return segments.map((seg, i) =>
              seg.pct > 0.5 ? (
                <div
                  key={i}
                  className={`${seg.color} h-full transition-all duration-700 ease-out`}
                  style={{ width: `${seg.pct}%` }}
                  title={`${seg.label}: ${seg.pct.toFixed(1)}%`}
                />
              ) : null
            );
          })()}
        </div>

        {/* Legend + values in a grid */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="rounded-lg bg-emerald-50 p-3 text-center">
            <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">Netto</p>
            <p className="text-sm font-bold text-emerald-700 tabular-nums mt-0.5">{formatEUR(breakdown.nettoMaand)}/mnd</p>
            <p className="text-[10px] text-emerald-500">{formatEUR(breakdown.nettoJaar)}/jr</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-3 text-center">
            <p className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">Belasting</p>
            <p className="text-sm font-bold text-blue-700 tabular-nums mt-0.5">{formatEUR(breakdown.loonheffing - breakdown.premieVolksverzekeringen)}</p>
            <p className="text-[10px] text-blue-500">per jaar</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-center">
            <p className="text-[10px] text-amber-600 font-medium uppercase tracking-wider">Premies</p>
            <p className="text-sm font-bold text-amber-700 tabular-nums mt-0.5">{formatEUR(breakdown.premieVolksverzekeringen)}</p>
            <p className="text-[10px] text-amber-500">per jaar</p>
          </div>
        </div>

        {/* Details row */}
        <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span>Effectief tarief: <strong className="text-gray-700">{breakdown.effectiveRate}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
            <span>Marginaal tarief: <strong className="text-gray-700">{breakdown.marginalRate}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            <span>Premies: <strong className="text-gray-700">{formatEUR(breakdown.premieVolksverzekeringen)}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
            <span>Heffingskorting: <strong className="text-gray-700">{formatEUR(breakdown.totaleHeffingskorting)}</strong></span>
          </div>
        </div>
      </div>

      {/* ── Investment Timeline ── */}
      <InvestmentTimeline
        purchasePrice={Math.round(breakdown.nettoJaar * 0.3)}  // 30% of net annual as investment
        annualRunningCost={0}
        annualSavings={Math.round(breakdown.nettoMaand * 0.1 * 12)} // 10% of monthly net invested yearly
        label="Wat als je 10% van je netto investeert?"
      />

      {/* ── Info Footer ── */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Deze berekening is een indicatie op basis van de 2026 belastingregels.
        Het exacte bedrag kan afwijken door persoonlijke omstandigheden.
        Raadpleeg een salarisadviseur voor een definitieve berekening.
      </p>
    </div>
  );
}

// ─── CBS Benchmark Section ─────────────────────────────────────

function CbsBenchmarkSection({ nettoJaar }: { nettoJaar: number }) {
  const [age, setAge] = useState(35);
  const incomeData = (netIncomeData as { netIncome: { brackets: any[]; title: string; unit: string; description: string } }).netIncome;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label htmlFor="benchmark-age" className="text-sm text-gray-700 shrink-0">
          Jouw leeftijd:
        </label>
        <input
          id="benchmark-age"
          type="number"
          min={18}
          max={99}
          value={age}
          onChange={(e) => setAge(Number(e.target.value) || 35)}
          className="w-20 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <span className="text-xs text-gray-400">jaar</span>
      </div>
      <ResultBenchmark
        value={Math.round(nettoJaar / 12)}
        dataset={incomeData}
        userAge={age}
        label="Netto per maand"
        color="blue"
      />
    </div>
  );
}
