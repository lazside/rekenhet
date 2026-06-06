"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Scale, SlidersHorizontal, ArrowDownUp } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";

// ─── BMI Categories ───────────────────────────────────────────

const BMI_CATEGORIES = [
  { min: 0, max: 18.5, label: "Ondergewicht", color: "text-amber-600", bg: "bg-amber-50" },
  { min: 18.5, max: 25, label: "Gezond gewicht", color: "text-emerald-600", bg: "bg-emerald-50" },
  { min: 25, max: 30, label: "Overgewicht", color: "text-orange-600", bg: "bg-orange-50" },
  { min: 30, max: 35, label: "Obesitas (klasse I)", color: "text-red-600", bg: "bg-red-50" },
  { min: 35, max: 40, label: "Obesitas (klasse II)", color: "text-red-700", bg: "bg-red-100" },
  { min: 40, max: Infinity, label: "Ernstige obesitas (klasse III)", color: "text-red-800", bg: "bg-red-200" },
] as const;

function getCategory(bmi: number) {
  return BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) || BMI_CATEGORIES[0];
}

// ─── Main ─────────────────────────────────────────────────────

export default function BmiCalculator() {
  const [lengte, setLengte] = useState(175);
  const [gewicht, setGewicht] = useState(75);

  const lengteM = lengte / 100;
  const bmi = Math.round((gewicht / (lengteM * lengteM)) * 10) / 10;
  const cat = getCategory(bmi);

  const advies = useMemo(() => {
    if (bmi < 18.5) return "Je hebt mogelijk ondergewicht. Overleg met een huisarts of diëtist.";
    if (bmi < 25) return "Je hebt een gezond gewicht. Blijf goed eten en bewegen!";
    if (bmi < 30) return "Je hebt licht overgewicht. Gezonde voeding en beweging kunnen helpen.";
    if (bmi < 35) return "Je hebt obesitas. Raadpleeg een arts voor persoonlijk advies.";
    return "Je hebt ernstige obesitas. Zoek medisch advies voor een behandelplan.";
  }, [bmi]);

  const idealMin = Math.round(18.5 * lengteM * lengteM * 10) / 10;
  const idealMax = Math.round(25 * lengteM * lengteM * 10) / 10;

  return (
    <div className="space-y-6" role="form" aria-label="BMI calculator">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Scale className="h-4 w-4 text-blue-600" />
          Jouw gegevens
        </h2>

        {/* Lengte */}
        <div className="space-y-2">
          <label htmlFor="lengte" className="text-sm font-medium text-gray-700">
            Lengte
          </label>
          <div className="relative">
            <input
              id="lengte"
              type="range"
              min={100}
              max={250}
              value={lengte}
              onChange={(e) => setLengte(Number(e.target.value))}
              className="w-full accent-blue-600"
              aria-label="Lengte in centimeters"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>100 cm</span>
              <span className="font-semibold text-blue-600">{lengte} cm</span>
              <span>250 cm</span>
            </div>
          </div>
        </div>

        {/* Gewicht */}
        <div className="space-y-2">
          <label htmlFor="gewicht" className="text-sm font-medium text-gray-700">
            Gewicht
          </label>
          <div className="relative">
            <input
              id="gewicht"
              type="range"
              min={30}
              max={250}
              value={gewicht}
              onChange={(e) => setGewicht(Number(e.target.value))}
              className="w-full accent-blue-600"
              aria-label="Gewicht in kilogram"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>30 kg</span>
              <span className="font-semibold text-blue-600">{gewicht} kg</span>
              <span>250 kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="text-center py-4">
          <p className="text-xs text-gray-500 mb-1">Jouw BMI</p>
          <p className="text-5xl font-bold text-blue-600 tabular-nums">{bmi}</p>
          <div className={cn("inline-block mt-2 rounded-full px-4 py-1 text-sm font-medium", cat.bg, cat.color)}>
            {cat.label}
          </div>
        </div>

        <div className="space-y-2">
          {/* BMI scale bar */}
          <div className="h-3 w-full rounded-full overflow-hidden flex">
            {BMI_CATEGORIES.map((c, i) => {
              const pct = Math.min(100, Math.max(0, ((c.max === Infinity ? 50 : c.max) - c.min) / 50 * 100));
              return <div key={i} className={cn("h-full", c.bg.replace("50", "300").replace("100", "400").replace("200", "500"))} style={{ width: `${pct}%` }} />;
            })}
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>18.5</span><span>25</span><span>30</span><span>35</span><span>40</span>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-gray-700 leading-relaxed">
          {advies}
        </div>

        <div className="text-xs text-gray-400">
          Gezond BMI-bereik voor {lengte} cm: <strong>{idealMin} – {idealMax} kg</strong>
        </div>
      </div>

      <ShareToolbar
        calculatorType="bmi-calculator"
        calculatorName="BMI Calculator"
        categoryName="Gezondheid"
        inputs={[
          { label: "Lengte", value: `${lengte} cm` },
          { label: "Gewicht", value: `${gewicht} kg` },
        ]}
        results={[
          { label: "BMI", value: String(bmi), type: "highlight" },
          { label: "Categorie", value: cat.label, type: "info" },
        ]}
      />

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        BMI is een indicatie en houdt geen rekening met spiermassa, botdichtheid of
        lichaamsbouw. Raadpleeg een arts voor persoonlijk gezondheidsadvies.
      </p>
    </div>
  );
}
