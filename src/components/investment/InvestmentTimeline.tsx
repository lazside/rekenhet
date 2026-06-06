"use client";

import { useState, useMemo } from "react";
import { ChartLine, Euro, TrendingDown, PiggyBank } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import { calculateVehicleDepreciation } from "@/lib/calculators/timeline";

interface InvestmentTimelineProps {
  purchasePrice: number;
  /** Optional — defaults to vehicle-style depreciation */
  annualRunningCost?: number;
  annualSavings?: number;
  label?: string;
}

export function InvestmentTimeline({
  purchasePrice,
  annualRunningCost = 2400,
  annualSavings = 0,
  label = "Waardeontwikkeling",
}: InvestmentTimelineProps) {
  const [selectedYear, setSelectedYear] = useState(1);

  const timeline = useMemo(
    () => calculateVehicleDepreciation(purchasePrice, annualRunningCost, annualSavings),
    [purchasePrice, annualRunningCost, annualSavings]
  );

  const current = timeline[selectedYear - 1] || timeline[0];
  const maxValue = Math.max(...timeline.map((y) => y.originalValue));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChartLine className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
        </div>
        <span className="text-xs text-gray-400">Jaar {selectedYear} van {timeline.length}</span>
      </div>

      {/* Year slider */}
      <div className="space-y-1.5">
        <input
          type="range"
          min={1}
          max={timeline.length}
          value={selectedYear}
          onChange={(e) => setSelectedYear(+e.target.value)}
          className="w-full accent-blue-600"
          aria-label="Selecteer jaar"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>Jaar 1</span>
          <span className="font-semibold text-blue-600">Jaar {selectedYear}</span>
          <span>Jaar {timeline.length}</span>
        </div>
      </div>

      {/* Stacked bar chart */}
      <div className="relative h-32 w-full">
        {timeline.map((t, i) => {
          const isSelected = i + 1 === selectedYear;
          const hPct = Math.max((t.depreciatedValue / maxValue) * 100, 2);
          const leftOffset = (i / (timeline.length - 1)) * 100;
          const barWidth = Math.max(100 / timeline.length - 2, 4);

          return (
            <div
              key={t.year}
              className="absolute bottom-0 transition-all duration-300 cursor-pointer"
              style={{
                left: `${leftOffset}%`,
                width: `${barWidth}%`,
              }}
              onClick={() => setSelectedYear(t.year)}
              title={`Jaar ${t.year}: €${t.depreciatedValue}`}
            >
              {/* Depreciated value (blue) */}
              <div
                className={`w-full rounded-t transition-all duration-300 ${
                  isSelected ? "bg-blue-500" : "bg-blue-300"
                }`}
                style={{ height: `${hPct}%` }}
              />
              {/* Running costs overlay (amber) — shown only on selected */}
              {isSelected && t.runningCosts > 0 && (
                <div
                  className="absolute bottom-0 w-full rounded-t bg-amber-400/60"
                  style={{
                    height: `${Math.min((t.runningCosts / maxValue) * 100, hPct)}%`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Selected year detail */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <DetailCard
          icon={Euro}
          label="Aanschaf"
          value={formatEUR(current.originalValue)}
          color="text-gray-900"
        />
        <DetailCard
          icon={TrendingDown}
          label="Huidige waarde"
          value={formatEUR(current.depreciatedValue)}
          color="text-blue-700"
        />
        <DetailCard
          icon={PiggyBank}
          label="Investering"
          value={formatEUR(current.runningCosts)}
          color="text-amber-700"
        />
        <DetailCard
          icon={PiggyBank}
          label="Netto positie"
          value={formatEUR(current.netPosition)}
          color={current.netPosition >= 0 ? "text-emerald-700" : "text-red-600"}
        />
      </div>

      {/* Footer */}
      <p className="text-[10px] text-gray-400 text-center leading-relaxed">
        Lineair afschrijvingsmodel. De werkelijke restwaarde kan afwijken.
      </p>
    </div>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Euro;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 text-center border border-gray-100">
      <Icon className="h-4 w-4 text-gray-400 mx-auto mb-1" />
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className={`text-sm font-bold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}
