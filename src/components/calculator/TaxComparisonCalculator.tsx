"use client";

import { useState, useMemo } from "react";
import { ArrowRightLeft, Euro, TrendingUp, TrendingDown, Minus, ArrowUpDown } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { formatEUR, formatNL } from "@/lib/utils";
import { vergelijkBelastingjaren, CONFIG_2025, CONFIG_2026 } from "@/lib/calculators/tax-comparison";

export default function TaxComparisonCalculator() {
  const [brutoStr, setBrutoStr] = useState("48000");
  const [vakantiegeld, setVakantiegeld] = useState(true);
  const [perspective, setPerspective] = useState<"verschil" | "2025" | "2026">("verschil");

  const brutoJaar = Number(brutoStr.replace(",", ".")) || 0;

  const result = useMemo(
    () => vergelijkBelastingjaren({ brutoJaar, vakantiegeldInbegrepen: !vakantiegeld }),
    [brutoJaar, vakantiegeld]
  );

  const verschilColor = result.verschilNettoMaand > 0
    ? "text-emerald-600"
    : result.verschilNettoMaand < 0
    ? "text-red-600"
    : "text-gray-600";

  const VerschilIcon = result.verschilNettoMaand > 0
    ? TrendingUp
    : result.verschilNettoMaand < 0
    ? TrendingDown
    : Minus;

  return (
    <div className="space-y-5" role="form" aria-label="Belastingjaar vergelijking">
      {/* ─── Input ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-indigo-600" />
          2025 vs 2026 — Vergelijk
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="tax-cmp-bruto" className="text-sm font-medium text-gray-700">
            Bruto jaarsalaris
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
            <input
              id="tax-cmp-bruto"
              type="text"
              inputMode="decimal"
              value={brutoStr}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw !== "" && !/^[\d.,]*$/.test(raw)) return;
                setBrutoStr(raw);
              }}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-7 pr-3 text-lg font-semibold text-gray-900 tabular-nums focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Vakantiegeld toggle */}
        <div className="flex items-center justify-between py-1">
          <label htmlFor="tax-cmp-vak" className="text-sm text-gray-700 cursor-pointer">
            Vakantiegeld toevoegen (8%)
          </label>
          <button
            id="tax-cmp-vak"
            role="switch"
            aria-checked={vakantiegeld}
            onClick={() => setVakantiegeld(!vakantiegeld)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
              vakantiegeld ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
              vakantiegeld ? "translate-x-[18px]" : "translate-x-[3px]"
            }`} />
          </button>
        </div>
      </div>

      {/* ─── Hero: Verschil ─── */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 p-6 text-white shadow-lg">
        <p className="text-sm text-indigo-200 text-center">Verschil in netto per maand</p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <span className="text-2xl font-bold text-indigo-200">{formatEUR(result.jaar2025.nettoMaand)}</span>
          <VerschilIcon className={`h-6 w-6 ${verschilColor.replace("text-", "text-").replace("emerald", "emerald").replace("red", "red")}`} />
          <span className={`text-4xl sm:text-5xl font-bold tabular-nums drop-shadow-sm ${verschilColor.replace("text-", "text-").replace("emerald-600", "emerald-300").replace("red-600", "red-300").replace("gray-600", "gray-300")}`}>
            {result.verschilNettoMaand > 0 ? "+" : ""}{formatEUR(result.verschilNettoMaand)}
          </span>
        </div>
        <div className="flex justify-center gap-6 mt-3 text-xs text-indigo-200">
          <span>2025: {result.jaar2025.effectiveRate}% effectief</span>
          <span>→</span>
          <span>2026: {result.jaar2026.effectiveRate}% effectief</span>
        </div>
      </div>

      {/* ─── Tab: Verschil / 2025 / 2026 ─── */}
      <div className="flex gap-2" role="tablist" aria-label="Detailweergave">
        {([
          { value: "verschil" as const, label: "Verschil" },
          { value: "2025" as const, label: "Alleen 2025" },
          { value: "2026" as const, label: "Alleen 2026" },
        ]).map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={perspective === tab.value}
            onClick={() => setPerspective(tab.value)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              perspective === tab.value
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Detail tabellen ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(perspective === "verschil" || perspective === "2025") && (
          <JaarCard jaarResult={result.jaar2025} accent="slate" />
        )}
        {(perspective === "verschil" || perspective === "2026") && (
          <JaarCard jaarResult={result.jaar2026} accent="indigo" highlight={perspective === "verschil"} />
        )}
      </div>

      {/* ─── Wat is er veranderd? ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
          Wat is er veranderd in 2026?
        </h3>
        <ul className="space-y-2 text-xs text-gray-600">
          <li className="flex items-start gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold text-center leading-4 shrink-0 mt-0.5">1</span>
            <span><strong>Eerste schijf verbreed</strong>: van €38.441 naar €40.018. Een groter deel van je inkomen valt in de laagste belastingschijf.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold text-center leading-4 shrink-0 mt-0.5">2</span>
            <span><strong>Algemene heffingskorting</strong>: maximaal bedrag gestegen van €3.068 naar €3.070. Faseringsgrens omhoog van €24.821 naar €24.928.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold text-center leading-4 shrink-0 mt-0.5">3</span>
            <span><strong>Arbeidskorting</strong>: maximale korting licht gedaald van €5.599 naar €5.598. Faseringsgrens omhoog van €39.958 naar €40.018.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold text-center leading-4 shrink-0 mt-0.5">4</span>
            <span><strong>Premies volksverzekeringen</strong>: tarief gedaald van 27,65% naar 26,54% (AOW-premie verlaagd).</span>
          </li>
        </ul>
      </div>

      <ShareToolbar
        calculatorType="belastingjaar-vergelijken"
        calculatorName="Inkomstenbelasting 2025 vs 2026"
        categoryName="Werk & Inkomen"
        inputs={[{ label: "Bruto jaarsalaris", value: formatEUR(brutoJaar) }]}
        results={[
          { label: "Netto 2025", value: formatEUR(result.jaar2025.nettoMaand) + "/mnd", type: "default" },
          { label: "Netto 2026", value: formatEUR(result.jaar2026.nettoMaand) + "/mnd", type: "success" },
          { label: "Verschil", value: (result.verschilNettoMaand > 0 ? "+" : "") + formatEUR(result.verschilNettoMaand) + "/mnd", type: "info" },
        ]}
      />

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Op basis van de officiële belastingtabellen 2025 en 2026 (Belastingdienst). Dit is een indicatie. Persoonlijke omstandigheden zoals hypotheekrenteaftrek, toeslagen en andere regelingen zijn niet meegenomen.
      </p>
    </div>
  );
}

// ─── JaarCard ───────────────────────────────────────────────────

function JaarCard({
  jaarResult,
  accent,
  highlight,
}: {
  jaarResult: import("@/lib/calculators/tax-comparison").JaarResultaat;
  accent: "slate" | "indigo";
  highlight?: boolean;
}) {
  const accentColors = {
    slate: {
      border: "border-slate-200",
      bg: "bg-slate-50",
      text: "text-slate-700",
      header: "bg-slate-100",
      headerText: "text-slate-800",
    },
    indigo: {
      border: highlight ? "border-indigo-300 ring-2 ring-indigo-200" : "border-indigo-200",
      bg: highlight ? "bg-indigo-50/30" : "bg-white",
      text: "text-indigo-700",
      header: highlight ? "bg-indigo-100" : "bg-indigo-50",
      headerText: "text-indigo-800",
    },
  };

  const c = accentColors[accent];

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4 shadow-sm space-y-2`}>
      <div className={`rounded-lg ${c.header} px-3 py-2 text-center`}>
        <p className={`text-xs font-semibold ${c.headerText}`}>
          Belastingjaar {jaarResult.label}
        </p>
        <p className={`text-xl font-bold ${c.text} tabular-nums`}>
          {formatEUR(jaarResult.nettoMaand)}
          <span className="text-xs font-normal text-gray-400 ml-1">/mnd</span>
        </p>
      </div>
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Bruto jaar</span>
          <span className="tabular-nums font-medium">{formatEUR(jaarResult.brutoJaar)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Vakantiegeld</span>
          <span className="tabular-nums font-medium">{formatEUR(jaarResult.brutoInclVak - jaarResult.brutoJaar)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Belastbaar</span>
          <span className="tabular-nums font-medium">{formatEUR(jaarResult.belastbaar)}</span>
        </div>
        {jaarResult.bracketDetails.map((b, i) => (
          <div key={i} className="flex justify-between text-gray-500 pl-2">
            <span>{b.label}</span>
            <span className="tabular-nums">€{b.amount.toLocaleString("nl-NL")} → €{b.tax.toLocaleString("nl-NL")}</span>
          </div>
        ))}
        <div className="flex justify-between text-amber-700">
          <span>Inkomstenbelasting</span>
          <span className="tabular-nums font-medium">− {formatEUR(jaarResult.inkomstenbelasting)}</span>
        </div>
        <div className="flex justify-between text-emerald-700">
          <span>Heffingskortingen</span>
          <span className="tabular-nums font-medium">+ {formatEUR(jaarResult.ahk + jaarResult.ak)}</span>
        </div>
        <div className="border-t border-gray-200 pt-1.5 flex justify-between font-semibold text-gray-900">
          <span>Netto jaar</span>
          <span className="tabular-nums">{formatEUR(jaarResult.nettoJaar)}</span>
        </div>
      </div>
    </div>
  );
}
