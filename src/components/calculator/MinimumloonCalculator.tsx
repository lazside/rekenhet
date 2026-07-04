"use client";

import { useState, useMemo } from "react";
import { Euro, Calendar, Clock, Users, TrendingUp } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { formatEUR, formatNL } from "@/lib/utils";
import { berekenMinimumloon } from "@/lib/calculators/minimumloon";

export default function MinimumloonCalculator() {
  const [leeftijd, setLeeftijd] = useState(25);
  const [uren, setUren] = useState(40);
  const [periode, setPeriode] = useState<"eerste" | "tweede">("tweede");

  const result = useMemo(
    () => berekenMinimumloon({ leeftijd, urenPerWeek: uren, periode }),
    [leeftijd, uren, periode]
  );

  const handleLeeftijdChange = (v: number) => {
    setLeeftijd(Math.max(15, Math.min(67, v)));
  };

  const bijvullingen = useMemo(() => {
    const uurloon21 = periode === "eerste" ? 14.71 : 14.99;
    return [
      { uren: 40, label: "Fulltime 40 uur", maand: Math.round(uurloon21 * 40 * 52 / 12 * 100) / 100 },
      { uren: 36, label: "Vijfdaags 36 uur", maand: Math.round(uurloon21 * 36 * 52 / 12 * 100) / 100 },
      { uren: 32, label: "Deeltijd 32 uur", maand: Math.round(uurloon21 * 32 * 52 / 12 * 100) / 100 },
    ];
  }, [periode]);

  return (
    <div className="space-y-5" role="form" aria-label="Minimumloon calculator 2026">
      {/* ─── Input ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Euro className="h-4 w-4 text-emerald-600" />
          Jouw gegevens
        </h2>

        {/* Periode toggle */}
        <div className="flex gap-2" role="radiogroup" aria-label="Periode">
          {([
            { value: "eerste" as const, label: "Jan – jun 2026" },
            { value: "tweede" as const, label: "Jul – dec 2026" },
          ]).map((p) => (
            <button
              key={p.value}
              role="radio"
              aria-checked={periode === p.value}
              onClick={() => setPeriode(p.value)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                periode === p.value
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Calendar className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
              {p.label}
            </button>
          ))}
        </div>

        {/* Leeftijd */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="minloon-leeftijd" className="text-sm font-medium text-gray-700">
              <Users className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
              Leeftijd
            </label>
            <span className="text-sm font-semibold text-emerald-700 tabular-nums">{leeftijd} jaar</span>
          </div>
          <input
            id="minloon-leeftijd"
            type="range"
            min={15}
            max={67}
            value={leeftijd}
            onChange={(e) => handleLeeftijdChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-600"
            aria-label="Leeftijd in jaren"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>15</span><span>21+</span><span>67</span>
          </div>
          {leeftijd < 21 && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
              Voor {leeftijd}-jarigen geldt het <strong>jeugdminimumloon</strong>: {result.leeftijdLabel} ({100 - result.leeftijdskorting}% van het wettelijk minimumuurloon).
            </p>
          )}
          {leeftijd >= 21 && (
            <p className="text-xs text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2">
              Vanaf 21 jaar heb je recht op het <strong>volledige wettelijk minimumuurloon</strong>.
            </p>
          )}
        </div>

        {/* Uren per week */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="minloon-uren" className="text-sm font-medium text-gray-700">
              <Clock className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
              Uren per week
            </label>
            <span className="text-sm font-semibold text-emerald-700 tabular-nums">{uren} uur</span>
          </div>
          <input
            id="minloon-uren"
            type="range"
            min={4}
            max={60}
            step={1}
            value={uren}
            onChange={(e) => setUren(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-600"
            aria-label="Uren per week"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>4 uur</span><span>40 uur (fulltime)</span><span>60 uur</span>
          </div>
        </div>
      </div>

      {/* ─── Resultaat ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-lg text-center">
          <p className="text-sm text-emerald-200">Jouw minimumuurloon</p>
          <p className="text-4xl sm:text-5xl font-bold tabular-nums mt-1">
            {formatEUR(result.uurloon)}
          </p>
          <p className="text-xs text-emerald-200 mt-2">per uur, bruto</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white border border-gray-100 p-4 text-center shadow-sm">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Bruto per maand</p>
            <p className="text-lg font-bold text-gray-900 tabular-nums mt-1">{formatEUR(result.maandloonBruto)}</p>
          </div>
          <div className="rounded-xl bg-white border border-gray-100 p-4 text-center shadow-sm">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Bruto per jaar</p>
            <p className="text-lg font-bold text-gray-900 tabular-nums mt-1">{formatEUR(result.jaarBruto)}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-center shadow-sm">
            <p className="text-[10px] text-emerald-600 uppercase tracking-wider">Netto per maand *</p>
            <p className="text-lg font-bold text-emerald-700 tabular-nums mt-1">{formatEUR(result.nettoMaand)}</p>
          </div>
          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-center shadow-sm">
            <p className="text-[10px] text-blue-600 uppercase tracking-wider">Leeftijdskorting</p>
            <p className="text-lg font-bold text-blue-700 tabular-nums mt-1">{formatNL(result.leeftijdskorting)}%</p>
          </div>
        </div>
      </div>

      {/* ─── Referentie: minimumloon 21+ ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-2 mb-3">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          Minimumloon 21+ bij verschillende werkweken
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {bijvullingen.map((b) => (
            <div key={b.uren} className="rounded-lg bg-gradient-to-b from-emerald-50 to-white border border-emerald-100 p-3 text-center">
              <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">{b.label}</p>
              <p className="text-sm font-bold text-emerald-700 tabular-nums mt-0.5">{formatEUR(b.maand)}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">bruto/maand</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Delen ─── */}
      <ShareToolbar
        calculatorType="minimumloon-2026"
        calculatorName="Minimumloon Calculator 2026"
        categoryName="Werk & Inkomen"
        inputs={[
          { label: "Leeftijd", value: `${leeftijd} jaar` },
          { label: "Uren/week", value: `${uren} uur` },
        ]}
        results={[
          { label: "Minimumuurloon", value: formatEUR(result.uurloon), type: "success" },
          { label: "Bruto/maand", value: formatEUR(result.maandloonBruto), type: "default" },
        ]}
      />

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        * Netto is een schatting op basis van gemiddelde belastingdruk. Het exacte netto bedrag hangt af van persoonlijke omstandigheden. Bron: Rijksoverheid.nl — minimumloon {periode === "eerste" ? "1e helft" : "2e helft"} 2026.
      </p>
    </div>
  );
}
