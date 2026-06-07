"use client";

import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
    <div className={cn("rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4", className)}>
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
  value: number;
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
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        {tooltip && <CalcTooltip text={tooltip} />}
      </div>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">{prefix}</span>}
        <input
          id={id} type="number" inputMode="decimal"
          value={value} onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          min={min} max={max} step={step}
          className={cn(
            "block w-full rounded-lg border border-gray-300 bg-white py-2.5 text-sm text-gray-900 tabular-nums focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
            prefix ? "pl-7 pr-3" : "px-3"
          )}
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
        <span className="text-xs text-gray-400 tabular-nums">{formatValue ? formatValue(value) : value}</span>
      </div>
      <input
        id={id} type="range" min={min} max={max} step={step}
        value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600
          [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600
          [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab"
        style={{ background: `linear-gradient(to right, #2563eb 0%, #2563eb ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)` }}
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
        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
          checked ? "bg-blue-600" : "bg-gray-300"
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
    <div className={cn("flex items-center justify-between rounded-xl px-5 py-3.5 transition-all", {
      "bg-white border border-gray-100": type === "default",
      "bg-gradient-to-r from-emerald-50 to-white border border-emerald-100": type === "success",
      "bg-gradient-to-r from-amber-50 to-white border border-amber-100": type === "warning",
      "bg-gradient-to-r from-blue-50 to-white border border-blue-100": type === "info",
      "bg-gradient-to-r from-gray-100 to-white border border-gray-200 font-semibold": type === "highlight",
    })}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{label}</span>
        {tooltip && <CalcTooltip text={tooltip} />}
      </div>
      <span className={cn("text-sm font-bold tabular-nums tracking-tight", {
        "text-gray-900": type === "default" || type === "highlight",
        "text-emerald-700": type === "success",
        "text-amber-700": type === "warning",
        "text-blue-700": type === "info",
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

export function CalcHero({ label, value, children, gradient = "from-blue-600 via-blue-700 to-indigo-800" }: CalcHeroProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-lg", gradient)}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative">
        <p className="text-sm font-medium mb-1 opacity-80">{label}</p>
        <p className="text-4xl sm:text-5xl font-bold tabular-nums tracking-tight drop-shadow-sm">{value}</p>
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
