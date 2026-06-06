"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Percent, SlidersHorizontal, ArrowRight } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";

type Mode = "deel-van" | "toename" | "van-naar";

export default function ProcentenCalculator() {
  const [mode, setMode] = useState<Mode>("deel-van");
  const [a, setA] = useState(50);
  const [b, setB] = useState(200);

  const result = useMemo(() => {
    if (mode === "deel-van") {
      // "A is hoeveel procent van B?"
      return b === 0 ? 0 : Math.round((a / b) * 10000) / 100;
    }
    if (mode === "toename") {
      // "A + X% = ?"
      return Math.round(a * (1 + b / 100) * 100) / 100;
    }
    // "Van A naar B is hoeveel procent?"
    return a === 0 ? 0 : Math.round(((b - a) / a) * 10000) / 100;
  }, [mode, a, b]);

  const resultLabel = useMemo(() => {
    if (mode === "deel-van") return `${a} is ${result}% van ${b}`;
    if (mode === "toename") return `${a} + ${b}% = ${result}`;
    return `Van ${a} naar ${b} is ${result}% ${result >= 0 ? "stijging" : "daling"}`;
  }, [mode, a, b, result]);

  return (
    <div className="space-y-6" role="form" aria-label="Procenten calculator">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Percent className="h-4 w-4 text-blue-600" />
          Kies een berekening
        </h2>

        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Berekeningswijze">
          {[
            { value: "deel-van" as const, label: "Deel van geheel" },
            { value: "toename" as const, label: "Toename/afname" },
            { value: "van-naar" as const, label: "Van → naar" },
          ].map((m) => (
            <button
              key={m.value}
              role="radio"
              aria-checked={mode === m.value}
              onClick={() => setMode(m.value)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                mode === m.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="pa" className="text-sm font-medium text-gray-700">
              {mode === "deel-van" ? "Deel" : mode === "toename" ? "Beginwaarde" : "Van"}
            </label>
            <div className="relative">
              <input
                id="pa"
                type="number"
                value={a}
                onChange={(e) => setA(Number(e.target.value) || 0)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="pb" className="text-sm font-medium text-gray-700">
              {mode === "deel-van" ? "Geheel" : mode === "toename" ? "Procent" : "Naar"}
            </label>
            <div className="relative">
              <input
                id="pb"
                type="number"
                value={b}
                onChange={(e) => setB(Number(e.target.value) || 0)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="text-center py-6">
          <p className="text-xs text-gray-500 mb-1">Resultaat</p>
          <p className="text-2xl font-bold text-blue-600 tabular-nums">{resultLabel}</p>
        </div>
      </div>

      <ShareToolbar
        calculatorType="procenten-calculator"
        calculatorName="Procenten Calculator"
        categoryName="Wiskunde"
        inputs={[
          { label: "Berekening", value: mode },
          { label: "Waarde A", value: String(a) },
          { label: "Waarde B", value: String(b) },
        ]}
        results={[
          { label: "Resultaat", value: resultLabel, type: "highlight" },
        ]}
      />

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Deze calculator geeft een indicatie. Controleer altijd of de gekozen
        rekenmethode past bij jouw specifieke situatie.
      </p>
    </div>
  );
}
