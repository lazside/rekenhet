"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { formatEUR, formatNL } from "@/lib/utils";
import { calculateNetSalary, berekenUurloonProjecties, type BrutoNettoBreakdown } from "@/lib/calculators/bruto-netto-2026";
import { cn } from "@/lib/utils";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { ShareCalculationLink } from "@/components/share/ShareCalculationLink";
import { ResultBenchmark } from "@/components/benchmark/ResultBenchmark";
import netIncomeData from "@/data/cbs-benchmarks.json";
import { saveCalculatorState } from "@/lib/session/calculator-state";
import { BenefitsImpactPanel } from "@/components/toeslagen/BenefitsImpactPanel";
import {
  Info, SlidersHorizontal, Car, Percent,
  ArrowDownUp, Users, Clock, TrendingUp, Share2,
} from "lucide-react";

// ─── Default state ─────────────────────────────────────────────

const DEFAULTS = {
  salary: 48000,
  period: "jaar" as "maand" | "jaar",
  vakantiegeld: true,
  bijtelling: 0,
  catalogusWaarde: 45000,
  eigenBijdrage: 0,
  algemeneHeffingskorting: true,
  arbeidskorting: true,
  showUurloon: false,
  uurloon: 35,
};

const BIJTELLING_OPTIES = [
  { value: 0, label: "Geen auto van de zaak" },
  { value: 22, label: "22% bijtelling (standaard)" },
  { value: 16, label: "16% bijtelling (elektrisch)" },
  { value: 12, label: "12% bijtelling (oude regeling)" },
];

// ─── Tooltip ────────────────────────────────────────────────────

function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <Info className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help" tabIndex={0} aria-label={text} />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus-within:block w-60 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg z-10 pointer-events-none" role="tooltip">
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </span>
    </span>
  );
}

// ─── Salary Slider ─────────────────────────────────────────────

function SalarySlider({ value, onChange, min, max, step, label, ariaLabel }: {
  value: number; onChange: (v: number) => void; min: number; max: number; step: number; label: string; ariaLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500">{label}</label>
        <span className="text-xs text-gray-400 tabular-nums">{formatEUR(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} aria-label={ariaLabel}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600
          [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600
          [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab"
        style={{ background: `linear-gradient(to right, #2563eb 0%, #2563eb ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)` }}
      />
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────

function Toggle({ label, checked, onChange, tooltip, id }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; tooltip?: string; id: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer select-none">{label}</label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <button
        id={id} role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          checked ? "bg-indigo-600" : "bg-gray-300"
        )}
      >
        <span className={cn("inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform", checked ? "translate-x-[18px]" : "translate-x-[3px]")} />
      </button>
    </div>
  );
}

// ─── Select ──────────────────────────────────────────────────

function Select({ options, value, onChange, label, id }: {
  options: { value: number; label: string }[]; value: number; onChange: (v: number) => void; label: string; id: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      >
        {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
      </select>
    </div>
  );
}

// ─── Result Row ─────────────────────────────────────────────

function ResultRow({ label, value, type = "default", tooltip }: {
  label: string; value: string; type?: "default" | "success" | "warning" | "info" | "highlight"; tooltip?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between rounded-xl px-5 py-3.5 transition-all", {
      "bg-white border border-gray-100": type === "default",
      "bg-gradient-to-r from-emerald-50 to-white border border-emerald-100": type === "success",
      "bg-gradient-to-r from-amber-50 to-white border border-amber-100": type === "warning",
      "bg-gradient-to-r from-blue-50 to-white border border-blue-100": type === "info",
      "bg-gradient-to-r from-gray-100 to-white border border-gray-200 font-semibold": type === "highlight",
    })}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <span className={cn("text-sm font-bold tabular-nums tracking-tight", {
        "text-gray-900": type === "default" || type === "highlight",
        "text-emerald-700": type === "success",
        "text-amber-700": type === "warning",
        "text-indigo-700": type === "info",
      })}>{value}</span>
    </div>
  );
}

// ─── Leaseauto Impact Inline ────────────────────────────────

function LeaseautoInline({ impact }: { impact: NonNullable<BrutoNettoBreakdown["leaseautoImpact"]> }) {
  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
        <Car className="h-3.5 w-3.5" />
        Netto impact leaseauto
        <Tooltip text="De bijtelling verhoogt je belastbaar inkomen. De extra belasting + eventuele eigen bijdrage bepaalt wat de auto je netto kost." />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded bg-white/80 px-2 py-1.5">
          <p className="text-[10px] text-amber-700">Extra belasting</p>
          <p className="text-xs font-bold text-amber-900 tabular-nums">{formatEUR(impact.extraBelasting)}/jr</p>
        </div>
        <div className="rounded bg-white/80 px-2 py-1.5">
          <p className="text-[10px] text-amber-700">Eigen bijdrage</p>
          <p className="text-xs font-bold text-amber-900 tabular-nums">{formatEUR(impact.eigenBijdrageJaar)}/jr</p>
        </div>
        <div className="rounded bg-white/80 px-2 py-1.5 ring-1 ring-amber-300">
          <p className="text-[10px] text-amber-700">Netto kosten</p>
          <p className="text-xs font-bold text-amber-900 tabular-nums">{formatEUR(impact.nettoMaandkosten)}/mnd</p>
        </div>
      </div>
    </div>
  );
}

// ─── Uurloon Matrix ──────────────────────────────────────────

function UurloonMatrix({ projecties }: { projecties: NonNullable<BrutoNettoBreakdown["uurloonProjecties"]> }) {
  return (
    <div className="grid grid-cols-3 gap-3 mt-3">
      {projecties.map((p) => (
        <div key={p.urenPerWeek} className="rounded-lg bg-gradient-to-b from-blue-50 to-white border border-blue-100 p-3 text-center">
          <p className="text-[10px] text-indigo-600 font-medium uppercase tracking-wider">{p.urenPerWeek} uur</p>
          <p className="text-sm font-bold text-indigo-700 tabular-nums mt-0.5">{formatEUR(p.nettoMaand)}/mnd</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{p.effectiveRate}% effectief</p>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────

interface BrutoNettoCalculatorProps { initialSalary?: number; }

export default function BrutoNettoCalculator({ initialSalary }: BrutoNettoCalculatorProps) {
  const [salaryStr, setSalaryStr] = useState(() => String(initialSalary || DEFAULTS.salary));
  const [period, setPeriod] = useState<"maand" | "jaar">(DEFAULTS.period);
  const [vakantiegeld, setVakantiegeld] = useState(DEFAULTS.vakantiegeld);
  const [bijtelling, setBijtelling] = useState(DEFAULTS.bijtelling);
  const [catalogusWaarde, setCatalogusWaarde] = useState(DEFAULTS.catalogusWaarde);
  const [eigenBijdrage, setEigenBijdrage] = useState(DEFAULTS.eigenBijdrage);
  const [algemeneHK, setAlgemeneHK] = useState(DEFAULTS.algemeneHeffingskorting);
  const [arbeidskorting, setArbeidskorting] = useState(DEFAULTS.arbeidskorting);
  const [showUurloon, setShowUurloon] = useState(DEFAULTS.showUurloon);
  const [uurloon, setUurloon] = useState(DEFAULTS.uurloon);
  const [showToeslagen, setShowToeslagen] = useState(false);
  const [showCbs, setShowCbs] = useState(false);
  const [showHeffingsDetail, setShowHeffingsDetail] = useState(false);

  const salaryNum = Number(salaryStr.replace(",", ".")) || 0;
  const brutoJaar = period === "maand" ? salaryNum * 12 : salaryNum;

  const breakdown = useMemo(
    () => calculateNetSalary({
      brutoJaar, vakantiegeldInbegrepen: !vakantiegeld, bijtellingPercentage: bijtelling,
      catalogusWaarde: bijtelling > 0 ? catalogusWaarde : 0, eigenBijdrage: bijtelling > 0 ? eigenBijdrage : 0,
      algemeneHeffingskorting: algemeneHK, arbeidskorting,
    }),
    [brutoJaar, vakantiegeld, bijtelling, catalogusWaarde, eigenBijdrage, algemeneHK, arbeidskorting]
  );

  const sliderMin = period === "maand" ? 500 : 6000;
  const sliderMax = period === "maand" ? 25000 : 300000;

  useEffect(() => {
    saveCalculatorState({ grossAnnualSalary: brutoJaar, netMonthlyIncome: breakdown.nettoMaand, calculationType: "bruto-netto-salaris-calculator" });
  }, [brutoJaar, breakdown.nettoMaand]);

  useEffect(() => {
    import("@/lib/share/share-url").then(({ getShareStateFromUrl }) => {
      const state = getShareStateFromUrl();
      if (state) {
        if (typeof state.salary === "number") setSalaryStr(String(state.salary));
        if (typeof state.period === "string") setPeriod(state.period as "maand" | "jaar");
        if (typeof state.vakantiegeld === "boolean") setVakantiegeld(state.vakantiegeld);
      }
    });
  }, []);

  const handleSalaryChange = useCallback(
    (v: number) => {
      const clamped = Math.max(sliderMin, Math.min(sliderMax, v));
      setSalaryStr(String(clamped));
    },
    [sliderMin, sliderMax]
  );

  return (
    <div className="space-y-5" role="form" aria-label="Bruto netto salaris calculator">

      {/* ═══════════════ INPUT ═══════════════ */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-indigo-600" />
          Jouw gegevens
        </h2>

        {/* Periode toggle */}
        <div className="flex gap-2" role="radiogroup" aria-label="Periode">
          {(["maand", "jaar"] as const).map((p) => (
            <button key={p} role="radio" aria-checked={period === p}
              onClick={() => { setPeriod(p); setSalaryStr(String(p === "maand" && period === "jaar" ? Math.round(salaryNum / 12 / 50) * 50 : p === "jaar" && period === "maand" ? Math.round(salaryNum * 12 / 600) * 600 : salaryNum)); }}
              className={cn("flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all", period === p ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}
            >Per {p === "maand" ? "maand" : "jaar"}</button>
          ))}
        </div>

        {/* Salaris input + slider */}
        <div className="space-y-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
            <input type="text" inputMode="decimal" value={salaryStr}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw !== "" && !/^[\d.,]*$/.test(raw)) return;
                setSalaryStr(raw);
              }}
              aria-label={`Bruto salaris per ${period}`}
              autoComplete="off"
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-7 pr-3 text-lg font-semibold text-gray-900 tabular-nums focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <SalarySlider value={salaryNum} onChange={handleSalaryChange} min={sliderMin} max={sliderMax} step={period === "maand" ? 50 : 600} label="Pas aan" ariaLabel={`Bruto salaris per ${period}`} />
        </div>

        {/* Vakantiegeld + heffingskortingen */}
        <div className="space-y-1">
          <Toggle id="vakantiegeld-toggle" label="Vakantiegeld (8%)" checked={vakantiegeld} onChange={setVakantiegeld} tooltip="8% van je bruto jaarsalaris, meestal in mei uitbetaald." />
          <div className="border-t border-gray-100 pt-2 mt-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Heffingskortingen</p>
            <Toggle id="ahk-toggle" label="Algemene heffingskorting (max €3.070)" checked={algemeneHK} onChange={setAlgemeneHK} tooltip="Korting op je inkomstenbelasting. Bouwt af boven €24.928." />
            <Toggle id="ak-toggle" label="Arbeidskorting (max €5.598)" checked={arbeidskorting} onChange={setArbeidskorting} tooltip="Korting omdat je werkt. Bouwt af boven €40.018." />
          </div>
        </div>

        {/* Leaseauto — compact */}
        <details className="group rounded-lg border border-amber-100">
          <summary className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">
            <span className="flex items-center gap-2"><Car className="h-4 w-4 text-amber-600" />Leaseauto</span>
            <span className="text-xs text-gray-400 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-4 pb-4 border-t border-amber-100 pt-3 space-y-3">
            <Select options={BIJTELLING_OPTIES} value={bijtelling} onChange={setBijtelling} label="Bijtelling" id="bijtelling-select" />
            {bijtelling > 0 && (
              <>
                <div className="space-y-1">
                  <label htmlFor="cataloguswaarde" className="text-sm text-gray-700">Cataloguswaarde</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
                    <input id="cataloguswaarde" type="text" value={catalogusWaarde} onChange={(e) => setCatalogusWaarde(Math.max(0, Number(e.target.value) || 0))} min={0} step={1000} className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-7 pr-3 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="eigenBijdrage" className="text-sm text-gray-700">Eigen bijdrage (p/mnd)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
                    <input id="eigenBijdrage" type="text" value={eigenBijdrage} onChange={(e) => setEigenBijdrage(Math.max(0, Number(e.target.value) || 0))} min={0} step={25} className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-7 pr-3 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
                  </div>
                </div>
              </>
            )}
          </div>
        </details>
      </div>

      {/* ═══════════════ RESULTATEN ═══════════════ */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <ArrowDownUp className="h-4 w-4 text-indigo-600" />
          Jouw resultaat
        </h2>

        {/* Hero netto */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <p className="text-sm text-indigo-200 font-medium mb-1">Netto per maand</p>
            <p className="text-4xl sm:text-5xl font-bold tabular-nums tracking-tight text-white drop-shadow-sm">
              {formatEUR(breakdown.nettoMaand)}
            </p>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="text-xs text-indigo-200">Effectief: <strong className="text-white">{breakdown.effectiveRate}%</strong></span>
              <span className="text-xs text-indigo-200">Marginaal: <strong className="text-white">{breakdown.marginalRate}%</strong></span>
              {breakdown.leaseautoImpact && (
                <span className="text-xs text-amber-200"><Car className="inline h-3 w-3 mr-0.5" />Auto: <strong className="text-white">{formatEUR(breakdown.leaseautoImpact.nettoMaandkosten)}/mnd</strong></span>
              )}
            </div>
          </div>
        </div>

        {/* Resultaten tabel */}
        <div className="space-y-2">
          <ResultRow label="Bruto per jaar" value={formatEUR(breakdown.brutoJaar)} />
          {breakdown.vakantiegeld > 0 && <ResultRow label="Vakantietoeslag" value={`+ ${formatEUR(breakdown.vakantiegeld)}`} type="info" tooltip="8% van je bruto jaarsalaris." />}
          {bijtelling > 0 && <ResultRow label="Bijtelling (auto)" value={`+ ${formatEUR(breakdown.belastbaarInkomen - breakdown.brutoJaar - breakdown.vakantiegeld)}`} type="warning" tooltip={`${bijtelling}% van de cataloguswaarde.`} />}
          <ResultRow label="Belastbaar inkomen" value={formatEUR(breakdown.belastbaarInkomen)} tooltip="Bruto + vakantiegeld + bijtelling." />
          <ResultRow label="Inkomstenbelasting" value={`− ${formatEUR(breakdown.totaleBelasting)}`} type="warning" tooltip="Berekend over de belastingschijven 2026." />
          {breakdown.premieVolksverzekeringen > 0 && <ResultRow label="Premies volksverzekeringen" value={`− ${formatEUR(breakdown.premieVolksverzekeringen)}`} type="warning" tooltip="AOW, Anw, Wlz over schijf 1." />}
          {breakdown.algemeneHeffingskortingBedrag > 0 && <ResultRow label="Algemene heffingskorting" value={`+ ${formatEUR(breakdown.algemeneHeffingskortingBedrag)}`} type="success" tooltip={`Max €3.070, afbouw boven €24.928.`} />}
          {breakdown.arbeidskortingBedrag > 0 && <ResultRow label="Arbeidskorting" value={`+ ${formatEUR(breakdown.arbeidskortingBedrag)}`} type="success" tooltip={`Max €5.598, afbouw boven €40.018.`} />}
          <div className="border-t border-gray-200 pt-1.5">
            <ResultRow label="Netto per jaar" value={formatEUR(breakdown.nettoJaar)} type="highlight" />
          </div>
        </div>

        {/* Leaseauto detail (alleen als actief) */}
        {breakdown.leaseautoImpact && <LeaseautoInline impact={breakdown.leaseautoImpact} />}

        {/* Inklapbaar: heffingskorting detail */}
        {breakdown.heffingskortingTrace.filter(t => t.max > 0).length > 0 && (
          <details className="group rounded-lg border border-gray-200">
            <summary className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-600">
              <span className="flex items-center gap-2"><Percent className="h-3.5 w-3.5 text-emerald-500" />Heffingskortingen — doorloop</span>
              <span className="text-xs text-gray-400 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
              {breakdown.heffingskortingTrace.filter(t => t.max > 0).map((t) => (
                <div key={t.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{t.name}</span>
                    <span className="tabular-nums">€{formatNL(t.applied)} / max €{formatNL(t.max)}</span>
                  </div>
                  <div className="relative h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-500", t.isPhasingOut ? "bg-amber-400" : "bg-emerald-400")} style={{ width: `${(t.applied / t.max) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                    <span>Faseringsgrens: €{formatNL(t.phaseOutStart)}</span>
                    {t.isPhasingOut && t.reductionAmount > 0 ? <span className="text-amber-600">−€{formatNL(t.reductionAmount)} afgebouwd</span> : <span className="text-emerald-600">✓ Volledig</span>}
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 border-t border-gray-100 pt-2 space-y-1">
                {breakdown.bracketDetails.map((b, i) => (
                  <div key={i} className="flex justify-between"><span>{b.label}</span><span className="tabular-nums">{formatEUR(b.amount)} → {formatEUR(b.tax)}</span></div>
                ))}
              </div>
            </div>
          </details>
        )}
      </div>

      {/* ═══════════════ GELDSTROOM ═══════════════ */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          <h3 className="text-sm font-semibold text-gray-900">Jouw geldstroom</h3>
        </div>
        <div className="flex items-center gap-1 text-white text-[10px] font-medium overflow-x-auto pb-1">
          <div className="rounded-lg bg-gray-500 px-3 py-2 shrink-0">Bruto</div>
          <div className="h-0.5 w-3 bg-gray-300 shrink-0" />
          <div className="rounded-lg bg-indigo-400 px-3 py-2 shrink-0">Vak.</div>
          <div className="h-0.5 w-3 bg-gray-300 shrink-0" />
          <div className="rounded-lg bg-rose-400 px-3 py-2 shrink-0">Belasting</div>
          <div className="h-0.5 w-3 bg-gray-300 shrink-0" />
          <div className="rounded-lg bg-emerald-400 px-3 py-2 shrink-0">Korting</div>
          <div className="h-0.5 w-3 bg-gray-300 shrink-0" />
          <div className="rounded-lg bg-emerald-600 px-3 py-2 font-bold shrink-0">Netto ✓</div>
        </div>
        <div className="relative h-6 w-full rounded-lg overflow-hidden flex mt-3 shadow-inner">
          {(() => {
            const total = breakdown.brutoJaar + breakdown.vakantiegeld;
            if (total <= 0) return null;
            const netPct = (breakdown.nettoJaar / total) * 100;
            const taxPct = (breakdown.loonheffing / total) * 100;
            return [
              { pct: netPct, color: "bg-emerald-400", label: "Netto", value: formatEUR(breakdown.nettoJaar) },
              { pct: taxPct, color: "bg-rose-400", label: "Loonheffing", value: formatEUR(breakdown.loonheffing) },
            ].filter(s => s.pct > 0.5).map((seg, i) => (
              <div key={i} className={`${seg.color} h-full transition-all duration-700`} style={{ width: `${seg.pct}%` }} title={`${seg.label}: ${seg.value}`} />
            ));
          })()}
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          {((total) => { if (total <= 0) return null; const np = (breakdown.nettoJaar / total) * 100; const tp = (breakdown.loonheffing / total) * 100; return (<>{np > 0.5 && <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />Netto: <strong className="text-gray-700">{formatEUR(breakdown.nettoJaar)}</strong> ({np.toFixed(0)}%)</span>}{tp > 0.5 && <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-rose-400" />Loonheffing: <strong className="text-gray-700">{formatEUR(breakdown.loonheffing)}</strong> ({tp.toFixed(0)}%)</span>}</>); })(breakdown.brutoJaar + breakdown.vakantiegeld)}
        </div>
      </div>

      {/* ═══════════════ UURLOON MODULE ═══════════════ */}
      <details className="group rounded-xl border border-gray-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-gray-700 hover:text-indigo-600">
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-indigo-500" />Uurloon → maandinkomen projectie</span>
          <span className="text-xs text-gray-400 transition-transform group-open:rotate-180">▼</span>
        </summary>
        <div className="px-5 pb-5 border-t border-gray-100 pt-3 space-y-3">
          <p className="text-xs text-gray-500">Bereken je netto maandinkomen op basis van je uurloon bij 32, 36 of 40 uur per week.</p>
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
            <input type="text" value={uurloon} onChange={(e) => setUurloon(Math.max(0, Number(e.target.value) || 0))} min={0} step={1} aria-label="Uurloon"
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-7 pr-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <UurloonMatrix projecties={berekenUurloonProjecties(uurloon)} />
        </div>
      </details>

      {/* ═══════════════ DELEN ═══════════════ */}
      <ShareToolbar
        calculatorType="bruto-netto-salaris-calculator" calculatorName="Bruto Netto Salaris Calculator" categoryName="Werk & Inkomen"
        inputs={[{ label: "Bruto jaarsalaris", value: formatEUR(breakdown.brutoJaar) }, { label: "Vakantiegeld", value: breakdown.vakantiegeld > 0 ? "Toegevoegd (8%)" : "Inbegrepen" }, { label: "Belastbaar inkomen", value: formatEUR(breakdown.belastbaarInkomen) }]}
        results={[{ label: "Netto per maand", value: formatEUR(breakdown.nettoMaand), type: "success" }, { label: "Netto per jaar", value: formatEUR(breakdown.nettoJaar), type: "success" }, { label: "Effectief tarief", value: `${breakdown.effectiveRate}%`, type: "default" }]}
      />

      {/* Deel + export knoppen */}
      <div className="flex justify-center gap-2 flex-wrap">
        <ShareCalculationLink calculatorSlug="werk-en-inkomen/bruto-netto-salaris-calculator" state={{ salary: brutoJaar, period, vakantiegeld: !vakantiegeld }} />
      </div>

      {/* ═══════════════ EXTRA INZICHTEN ═══════════════ */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <Share2 className="h-4 w-4 text-gray-400" />
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Extra inzichten</h3>
        </div>
        <Toggle id="cbs-toggle" label="CBS Benchmark — vergelijk je inkomen" checked={showCbs} onChange={setShowCbs} tooltip="Vergelijk met leeftijdsgenoten op basis van CBS-data." />
        <Toggle id="toeslagen-toggle" label="Toeslagen impact — huur, zorg, kind" checked={showToeslagen} onChange={setShowToeslagen} tooltip="Bekijk waar je recht op hebt op basis van je inkomen." />
      </div>

      {showCbs && (
        <details className="group rounded-xl border border-gray-200 bg-white shadow-sm open:border-indigo-200 transition-all">
          <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-gray-700 hover:text-indigo-600">
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-indigo-500" />CBS Benchmark</span>
            <span className="text-xs text-gray-400 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            <CbsBenchmarkSection nettoJaar={breakdown.nettoJaar} />
          </div>
        </details>
      )}

      {showToeslagen && <BenefitsImpactPanel toetsingsinkomen={brutoJaar} />}

      {/* ═══════════════ DISCLAIMER ═══════════════ */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Dit is een indicatie op basis van de 2026 belastingregels. Het exacte bedrag kan afwijken. Raadpleeg een salarisadviseur voor een definitieve berekening.
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
        <label htmlFor="benchmark-age" className="text-sm text-gray-700 shrink-0">Jouw leeftijd:</label>
        <input id="benchmark-age" type="text" min={18} max={99} value={age} onChange={(e) => setAge(e.target.value === '' ? 35 : Number(e.target.value))} className="w-20 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-center focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
        <span className="text-xs text-gray-400">jaar</span>
      </div>
      <ResultBenchmark value={Math.round(nettoJaar / 12)} dataset={incomeData} userAge={age} label="Netto per maand" color="blue" />
    </div>
  );
}
