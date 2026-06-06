"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Users, TrendingUp, ArrowUp, Share2, Check, BarChart3 } from "lucide-react";
import type { PieSegment } from "@/components/charts";
import type { DataPoint } from "@/components/charts";

// ─── Types ─────────────────────────────────────────────────────

interface BenchmarkBracket {
  ageMin: number;
  ageMax: number;
  label: string;
  median: number;
  p10: number;
  p25: number;
  p75: number;
  p90: number;
}

interface BenchmarkDataset {
  title: string;
  unit: string;
  description: string;
  brackets: BenchmarkBracket[];
}

interface ResultBenchmarkProps {
  /** The user's value to compare */
  value: number;
  /** Which benchmark dataset to use */
  dataset: BenchmarkDataset;
  /** User's age for bracket matching (default: 35) */
  userAge?: number;
  /** Label for the user's value (e.g., "Netto per maand") */
  label: string;
  /** Color theme */
  color?: "blue" | "emerald" | "amber";
  className?: string;
}

// ─── Percentile calculation ────────────────────────────────────

function calcPercentile(value: number, bracket: BenchmarkBracket): number {
  const { p10, p25, median, p75, p90 } = bracket;
  const points: { val: number; pct: number }[] = [
    { val: p10, pct: 10 },
    { val: p25, pct: 25 },
    { val: median, pct: 50 },
    { val: p75, pct: 75 },
    { val: p90, pct: 90 },
  ];

  // Below lowest point
  if (value <= points[0].val) return Math.max(1, (value / points[0].val) * points[0].pct);

  // Between points — linear interpolation
  for (let i = 0; i < points.length - 1; i++) {
    if (value >= points[i].val && value <= points[i + 1].val) {
      const ratio = (value - points[i].val) / (points[i + 1].val - points[i].val);
      return points[i].pct + ratio * (points[i + 1].pct - points[i].pct);
    }
  }

  // Above highest point
  if (value > points[points.length - 1].val) {
    const excess = (value - points[points.length - 1].val) / points[points.length - 1].val;
    return Math.min(99, points[points.length - 1].pct + excess * 9);
  }

  return 50;
}

// ─── Gauge SVG ────────────────────────────────────────────────

function GaugeSVG({ pct, color }: { pct: number; color: string }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const filled = (pct / 100) * circumference;
  const colors: Record<string, { track: string; fill: string }> = {
    blue: { track: "#dbeafe", fill: "#3b82f6" },
    emerald: { track: "#d1fae5", fill: "#10b981" },
    amber: { track: "#fef3c7", fill: "#f59e0b" },
  };
  const c = colors[color] || colors.blue;

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90 shrink-0">
      {/* Track */}
      <circle cx="70" cy="70" r={radius} fill="none" stroke={c.track} strokeWidth="12" />
      {/* Fill */}
      <circle
        cx="70"
        cy="70"
        r={radius}
        fill="none"
        stroke={c.fill}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeDashoffset={0}
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

// ─── Component ─────────────────────────────────────────────────

export function ResultBenchmark({
  value,
  dataset,
  userAge = 35,
  label,
  color = "blue",
  className,
}: ResultBenchmarkProps) {
  const [copied, setCopied] = useState(false);

  // Find matching age bracket
  const bracket = dataset.brackets.find(
    (b) => userAge >= b.ageMin && userAge <= b.ageMax
  ) || dataset.brackets[2];

  const pct = calcPercentile(value, bracket);
  const medianDiff = value - bracket.median;
  const medianPct = Math.round((medianDiff / bracket.median) * 100);
  const isAbove = medianDiff >= 0;

  // Human-readable tier label
  let tier = "";
  let tierIcon = "📊";
  if (pct >= 90) { tier = "top 10%"; tierIcon = "🏆"; }
  else if (pct >= 75) { tier = "top 25%"; tierIcon = "⭐"; }
  else if (pct >= 50) { tier = "boven gemiddeld"; tierIcon = "📈"; }
  else if (pct >= 25) { tier = "onder gemiddeld"; tierIcon = "📉"; }
  else { tier = "lagere inkomensgroep"; tierIcon = "💪"; }

  const colors = {
    blue: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-100", badge: "bg-blue-600" },
    emerald: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100", badge: "bg-emerald-600" },
    amber: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100", badge: "bg-amber-600" },
  };
  const c = colors[color];

  const handleShare = async () => {
    const text = `Mijn ${label.toLowerCase()} is €${value.toLocaleString("nl-NL")}. Dat valt in de ${tier} vergeleken met leeftijdsgenoten (${bracket.label}). Bereken het zelf op Rekenhet.nl!`;
    if (navigator.share) {
      await navigator.share({ title: "Rekenhet.nl Benchmark", text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("rounded-xl border p-5 shadow-sm", c.border, c.bg, className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className={cn("h-5 w-5", c.text)} />
        <h3 className="text-sm font-semibold text-gray-900">CBS Benchmark</h3>
        <span className="ml-auto text-[10px] text-gray-400">{bracket.label}</span>
      </div>

      {/* Gauge + tier */}
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <GaugeSVG pct={pct} color={color} />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-lg font-bold text-gray-900 tabular-nums">{Math.round(pct)}%</span>
            <span className="text-[9px] text-gray-400 -mt-0.5">percentiel</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{tierIcon}</span>
            <span className={cn("text-base font-bold", c.text)}>{tier}</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Je {label.toLowerCase()} van <strong>€{value.toLocaleString("nl-NL")}</strong> is{" "}
            <strong className={isAbove ? "text-emerald-600" : "text-amber-600"}>
              {Math.abs(medianPct)}% {isAbove ? "hoger" : "lager"}
            </strong>{" "}
            dan de mediaan van €{bracket.median.toLocaleString("nl-NL")} in jouw leeftijdsgroep.
          </p>
        </div>
      </div>

      {/* Percentile bar */}
      <div className="mt-4">
        <div className="relative h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className={cn("absolute inset-y-0 left-0 rounded-full transition-all duration-700", c.badge)}
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
          <span>Laag</span>
          <span className={cn("font-medium text-[11px]", c.text)}>Jij: {Math.round(pct)}%</span>
          <span>Hoog</span>
        </div>
      </div>

      {/* Reference points */}
      <div className="mt-3 grid grid-cols-5 gap-1 text-center text-[9px] text-gray-400">
        <div><div className="h-1 w-full rounded bg-gray-200 mb-0.5" /> 10%</div>
        <div><div className="h-1.5 w-full rounded bg-gray-200 mb-0.5" /> 25%</div>
        <div><div className="h-2 w-full rounded bg-blue-200 mb-0.5" /> 50%</div>
        <div><div className="h-1.5 w-full rounded bg-gray-200 mb-0.5" /> 75%</div>
        <div><div className="h-1 w-full rounded bg-gray-200 mb-0.5" /> 90%</div>
      </div>

      {/* Share */}
      <button
        onClick={handleShare}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-600">Gekopieerd!</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5" />
            <span>Deel je benchmark</span>
          </>
        )}
      </button>
    </div>
  );
}

export type { BenchmarkDataset, BenchmarkBracket };
