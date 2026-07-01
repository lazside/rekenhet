"use client";

import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect, useRef, type ReactNode, type ChangeEvent } from "react";
import { numOnChange, numConvert } from "./input-helpers";

// ═══════════════════════════════════════════════════════════════
// GEDEELDE STYLING — gebruik deze constanten in ALLE calculators
// ═══════════════════════════════════════════════════════════════

/** Standaard input className — overal dezelfde look & feel */
export const INPUT_CLASSES =
  "block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 tabular-nums font-mono placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all";

/** Standaard select className */
export const SELECT_CLASSES =
  "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

/** Input className met prefix spacing */
export function inputCn(prefix?: string): string {
  return prefix
    ? `block w-full rounded-lg border border-gray-300 bg-white py-2.5 text-sm text-gray-900 tabular-nums font-mono placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all pl-7 pr-3`
    : INPUT_CLASSES;
}

// ═══════════════════════════════════════════════════════════════
// TOOLTIP
// ═══════════════════════════════════════════════════════════════

export function CalcTooltip({ text }: { text: string }) {
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

// ═══════════════════════════════════════════════════════════════
// CARD — standaard kaart wrapper
// ═══════════════════════════════════════════════════════════════

export function CalcCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
      "rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_0_rgb(0_0_0_/_0.04),0_1px_2px_-1px_rgb(0_0_0_/_0.06)] p-5 space-y-4 transition-all duration-200",
      className
    )}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION HEADER — titel met icoon
// ═══════════════════════════════════════════════════════════════

export function CalcSectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
      {icon}
      {title}
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
// INPUT NUMBER
// ═══════════════════════════════════════════════════════════════

interface CalcInputProps {
  id: string;
  label: string;
  /** Huidige getalswaarde van de parent (wordt alleen gebruikt bij reset) */
  value: number;
  /** Wordt aangeroepen met een geldig getal */
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  className?: string;
}

export function CalcInput({ id, label, value, onChange, min, max, step, prefix, suffix, tooltip }: CalcInputProps) {
  // Eén bron van waarheid: een string die de gebruiker vrij kan bewerken.
  const [display, setDisplay] = useState(() => value === 0 ? "" : String(value));

  // Alleen synchroniseren van parent naar child als de parent-waarde
  // écht verandert (bv. period-switch in bruto-netto) EN het veld
  // niet de focus heeft.
  const hasFocus = useRef(false);
  const userCleared = useRef(false);
  useEffect(() => {
    if (!hasFocus.current && !userCleared.current) {
      setDisplay(value === 0 ? "" : String(value));
    }
  }, [value]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // Alleen cijfers, punt en komma toestaan
    let raw = e.target.value.replace(/[^0-9.,]/g, "");
    // Leidende nullen strippen (behalve bij "0.5" of "0,5")
    if (raw.length > 1 && raw.startsWith("0") && raw[1] !== "." && raw[1] !== ",") {
      raw = raw.replace(/^0+/, "");
    }
    setDisplay(raw);
    if (raw === "") {
      userCleared.current = true;
      // Parent updaten naar 0, zodat het veld leeg blijft
      onChange(0);
    } else {
      userCleared.current = false;
      const num = Number(raw.replace(",", "."));
      if (!isNaN(num)) onChange(num);
    }
  }, [onChange]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        {tooltip && <CalcTooltip text={tooltip} />}
      </div>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">{prefix}</span>}
        <input
          id={id} type="text" inputMode="decimal"
          value={display}
          onChange={handleChange}
          onFocus={() => { hasFocus.current = true; }}
          onBlur={() => {
            hasFocus.current = false;
            // Als de gebruiker het veld leegmaakte: niet terugspringen
            if (userCleared.current) {
              setDisplay("");
              userCleared.current = false;
            } else {
              setDisplay(value === 0 ? "" : String(value));
            }
          }}
          className={inputCn(prefix)}
          autoComplete="off"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">{suffix}</span>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INPUT RANGE
// ═══════════════════════════════════════════════════════════════

interface CalcRangeProps {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (v: number) => string;
}

export function CalcRange({ id, label, value, onChange, min, max, step = 1, formatValue }: CalcRangeProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-gray-500">{label}</label>
        <span className="text-xs text-gray-400 tabular-nums font-mono">{formatValue ? formatValue(value) : value}</span>
      </div>
      <input
        id={id} type="range" min={min} max={max} step={step}
        value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600
          [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600
          [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab"
        style={{ background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)` }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SELECT
// ═══════════════════════════════════════════════════════════════

interface CalcSelectProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

export function CalcSelect({ id, label, value, onChange, options }: CalcSelectProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <select
        id={id} value={String(value)} onChange={(e) => onChange(e.target.value)}
        className={SELECT_CLASSES}
      >
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TOGGLE
// ═══════════════════════════════════════════════════════════════

interface CalcToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  tooltip?: string;
}

export function CalcToggle({ id, label, checked, onChange, tooltip }: CalcToggleProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer select-none">{label}</label>
        {tooltip && <CalcTooltip text={tooltip} />}
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

// ═══════════════════════════════════════════════════════════════
// RESULT ROW
// ═══════════════════════════════════════════════════════════════

interface CalcResultRowProps {
  label: string;
  value: string;
  type?: "default" | "success" | "warning" | "info" | "highlight";
  tooltip?: string;
}

export function CalcResultRow({ label, value, type = "default", tooltip }: CalcResultRowProps) {
  return (
    <div className={cn("flex items-center justify-between rounded-xl px-5 py-3.5 transition-all duration-200", {
      "bg-white border border-gray-100": type === "default",
      "bg-gradient-to-r from-emerald-50 to-white border border-emerald-100": type === "success",
      "bg-gradient-to-r from-amber-50 to-white border border-amber-100": type === "warning",
      "bg-gradient-to-r from-indigo-50 to-white border border-indigo-100": type === "info",
      "bg-gradient-to-r from-gray-50 to-white border border-gray-200 font-semibold": type === "highlight",
    })}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{label}</span>
        {tooltip && <CalcTooltip text={tooltip} />}
      </div>
      <span className={cn("text-sm font-bold font-mono tabular-nums tracking-tight", {
        "text-gray-900": type === "default" || type === "highlight",
        "text-emerald-700": type === "success",
        "text-amber-700": type === "warning",
        "text-indigo-700": type === "info",
      })}>{value}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HERO CARD — groot resultaat
// ═══════════════════════════════════════════════════════════════

interface CalcHeroProps {
  label: string;
  value: string;
  children?: ReactNode;
  gradient?: string;
}

export function CalcHero({ label, value, children, gradient = "from-indigo-600 via-indigo-700 to-indigo-800" }: CalcHeroProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-lg", gradient)}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative">
        <p className="text-sm font-medium mb-1 opacity-80">{label}</p>
        <p className="text-4xl sm:text-5xl font-bold font-mono tabular-nums tracking-tight drop-shadow-sm">{value}</p>
        {children && <div className="flex items-center gap-4 mt-3 flex-wrap">{children}</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DISCLAIMER
// ═══════════════════════════════════════════════════════════════

export function CalcDisclaimer({ children }: { children?: ReactNode }) {
  return (
    <p className="text-xs text-gray-400 text-center leading-relaxed">
      {children || "Dit is een indicatie op basis van de actuele regelgeving. Raadpleeg een professional voor definitief advies."}
    </p>
  );
}
