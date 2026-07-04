"use client";

import { formatEUR } from "@/lib/utils";

interface SalarySliderProps {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  ariaLabel: string;
}

/**
 * SalarySlider — styled range input with EUR value label
 *
 * Indigo gradient fill tracks the current position.
 * Custom thumb styling via Tailwind arbitrary selectors.
 */
export function SalarySlider({ value, onChange, min, max, step, label, ariaLabel }: SalarySliderProps) {
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
