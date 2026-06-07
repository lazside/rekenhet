"use client";
import { useState, useMemo } from "react";
import { Calculator, Percent, Euro, TrendingUp } from "lucide-react";
import { formatEUR, formatNL } from "@/lib/utils";
import { berekenZelfstandigenaftrek, type ZelfstandigenaftrekInput } from "@/lib/calculators/zelfstandigenaftrek";
import { ShareToolbar } from "@/components/share/ShareToolbar";

function Toggle({ label, checked, onChange, id }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; id: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer select-none">{label}</label>
      <button
        id={id} role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-[18px]" : "translate-x-[3px]"}`} />
      </button>
    </div>
  );
}

function ResultRow({ label, value, type = "default", big }: {
  label: string; value: string; type?: "default" | "success" | "warning" | "info" | "highlight"; big?: boolean;
}) {
  const base = "flex items-center justify-between rounded-xl px-5 py-3.5 transition-all";
  const styles: Record<string, string> = {
    default: "bg-white border border-gray-100",
    success: "bg-gradient-to-r from-emerald-50 to-white border border-emerald-100",
    warning: "bg-gradient-to-r from-amber-50 to-white border border-amber-100",
    info: "bg-gradient-to-r from-blue-50 to-white border border-blue-100",
    highlight: "bg-gradient-to-r from-gray-100 to-white border border-gray-200 font-semibold",
  };
  const colors: Record<string, string> = {
    default: "text-gray-900", success: "text-emerald-700", warning: "text-amber-700",
    info: "text-blue-700", highlight: "text-gray-900",
  };
  return (
    <div className={`${base} ${styles[type]}`}>
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`${big ? "text-base" : "text-sm"} font-bold tabular-nums tracking-tight ${colors[type]}`}>{value}</span>
    </div>
  );
}

export default function ZelfstandigenaftrekCalculator() {
  const [winst, setWinst] = useState(45000);
  const [urencriterium, setUrencriterium] = useState(true);
  const [startersaftrek, setStartersaftrek] = useState(false);
  const [aowLeeftijd, setAowLeeftijd] = useState(false);
  const [mkbVrijstelling, setMkbVrijstelling] = useState(true);

  const result = useMemo(() => berekenZelfstandigenaftrek({
    winst, voldoetUrencriterium: urencriterium, heeftStartersaftrek: startersaftrek,
    aowLeeftijd, rechtMkbVrijstelling: mkbVrijstelling,
  }), [winst, urencriterium, startersaftrek, aowLeeftijd, mkbVrijstelling]);

  return (
    <div className="space-y-5" role="form" aria-label="Zelfstandigenaftrek calculator">
      {/* ── Input ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-blue-600" />
          Jouw ondernemingsgegevens
        </h2>

        <div className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="winst" className="text-sm font-medium text-gray-700">Jaarwinst vóór belasting (€)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
              <input id="winst" type="number" value={winst}
                onChange={(e) => setWinst(Math.max(0, Number(e.target.value) || 0))} min={0} step={1000}
                className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-7 pr-3 text-lg font-semibold text-gray-900 tabular-nums focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <Toggle id="urencriterium-toggle" label="Voldoe aan urencriterium (1.225 uur/jaar)" checked={urencriterium} onChange={setUrencriterium} />
          <Toggle id="startersaftrek-toggle" label="Recht op startersaftrek (€2.123)" checked={startersaftrek} onChange={setStartersaftrek} />
          <Toggle id="aow-toggle" label="AOW-leeftijd bereikt (50% zelfstandigenaftrek)" checked={aowLeeftijd} onChange={setAowLeeftijd} />
          <Toggle id="mkb-toggle" label="Recht op MKB-winstvrijstelling (12,7%)" checked={mkbVrijstelling} onChange={setMkbVrijstelling} />
        </div>
      </div>

      {/* ── Resultaten ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Euro className="h-4 w-4 text-green-600" />
          Jouw resultaat
        </h2>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-emerald-800 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <p className="text-sm text-green-200 font-medium mb-1">Netto per maand</p>
            <p className="text-4xl sm:text-5xl font-bold tabular-nums tracking-tight text-white drop-shadow-sm">{formatEUR(result.nettoMaand)}</p>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="text-xs text-green-200">Netto jaar: <strong className="text-white">{formatEUR(result.nettoJaar)}</strong></span>
              <span className="text-xs text-green-200">Effectief: <strong className="text-white">{result.effectiefTarief}%</strong></span>
              <span className="text-xs text-green-200">Reserveer: <strong className="text-white">{formatEUR(result.reserveringPerMaand)}/mnd</strong></span>
            </div>
          </div>
        </div>

        {/* Aftrekposten */}
        <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 space-y-2">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
            <Percent className="h-3 w-3" />Ondernemersaftrek 2026
          </p>
          {result.zelfstandigenaftrek > 0 && (
            <div className="flex justify-between text-sm"><span className="text-gray-600">Zelfstandigenaftrek</span><span className="font-bold text-gray-900 tabular-nums">− {formatEUR(result.zelfstandigenaftrek)}</span></div>
          )}
          {result.startersaftrek > 0 && (
            <div className="flex justify-between text-sm"><span className="text-gray-600">Startersaftrek</span><span className="font-bold text-gray-900 tabular-nums">− {formatEUR(result.startersaftrek)}</span></div>
          )}
          <div className="flex justify-between text-sm font-semibold border-t border-blue-200 pt-1.5 mt-1.5">
            <span className="text-blue-800">Totale ondernemersaftrek</span>
            <span className="text-blue-800 tabular-nums">{formatEUR(result.totaleOndernemersaftrek)}</span>
          </div>
          {result.mkbVrijstellingBedrag > 0 && (
            <div className="flex justify-between text-sm"><span className="text-gray-600">MKB-winstvrijstelling ({result.mkbPercentage}%)</span><span className="font-bold text-gray-900 tabular-nums">− {formatEUR(result.mkbVrijstellingBedrag)}</span></div>
          )}
          <div className="flex justify-between text-sm font-semibold border-t border-blue-200 pt-1.5 mt-1.5">
            <span className="text-blue-800">Belastbare winst</span>
            <span className="text-blue-800 tabular-nums">{formatEUR(result.belastbareWinst)}</span>
          </div>
        </div>

        {/* Resultaten */}
        <ResultRow label="Inkomstenbelasting" value={`− ${formatEUR(result.inkomstenbelasting)}`} type="warning" />
        {result.zvwPremie > 0 && <ResultRow label="Zvw-premie (5,43%)" value={`− ${formatEUR(result.zvwPremie)}`} type="warning" />}
        <div className="border-t border-gray-200 pt-1.5">
          <ResultRow label="Netto per jaar" value={formatEUR(result.nettoJaar)} type="highlight" big />
        </div>
        <ResultRow label="Effectief belastingtarief" value={`${result.effectiefTarief}%`} type="info" />
        <ResultRow label="Marginaal tarief" value={`${result.marginaalTarief}%`} type="info" />
        <ResultRow label="Maandelijks reserveren voor belasting" value={formatEUR(result.reserveringPerMaand)} type="warning" />

        {/* Belastingbesparing */}
        {result.totaleBesparing > 0 && (
          <details className="group rounded-lg border border-gray-200">
            <summary className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-green-600">
              <span className="flex items-center gap-2"><TrendingUp className="h-3.5 w-3.5 text-green-500" />Belastingbesparing door aftrek</span>
              <span className="text-xs text-gray-400 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="px-4 pb-3 border-t border-gray-100 pt-2 space-y-1.5">
              <div className="flex justify-between text-xs text-gray-600"><span>Door zelfstandigenaftrek</span><span className="tabular-nums text-green-700 font-semibold">+ {formatEUR(result.besparingZelfstandigenaftrek)}</span></div>
              {result.besparingMkbVrijstelling > 0 && <div className="flex justify-between text-xs text-gray-600"><span>Door MKB-winstvrijstelling</span><span className="tabular-nums text-green-700 font-semibold">+ {formatEUR(result.besparingMkbVrijstelling)}</span></div>}
              <div className="flex justify-between text-xs font-bold border-t border-gray-100 pt-1.5"><span className="text-gray-800">Totale besparing</span><span className="tabular-nums text-green-700">{formatEUR(result.totaleBesparing)}</span></div>
            </div>
          </details>
        )}
      </div>

      {/* ── Share ── */}
      <ShareToolbar
        calculatorType="zelfstandigenaftrek-berekenen"
        calculatorName="Zelfstandigenaftrek & Netto Inkomen 2026"
        categoryName="Ondernemen"
        inputs={[{ label: "Jaarwinst", value: formatEUR(winst) }, { label: "Urencriterium", value: urencriterium ? "Ja" : "Nee" }, { label: "Startersaftrek", value: startersaftrek ? "Ja" : "Nee" }]}
        results={[{ label: "Netto per maand", value: formatEUR(result.nettoMaand), type: "success" }, { label: "Netto per jaar", value: formatEUR(result.nettoJaar), type: "success" }, { label: "Inkomstenbelasting", value: formatEUR(result.inkomstenbelasting), type: "warning" }]}
      />

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Indicatie op basis van het Belastingplan 2026. De zelfstandigenaftrek is €1.200 in 2026 (was €2.470 in 2025).
        Raadpleeg een belastingadviseur voor definitief advies.
      </p>
    </div>
  );
}
