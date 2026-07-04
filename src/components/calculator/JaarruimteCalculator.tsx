"use client";

import { useState, useMemo } from "react";
import { PiggyBank, Euro, Percent, Calculator, Info, TrendingUp } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { formatEUR, formatNL } from "@/lib/utils";
import { berekenJaarruimte } from "@/lib/calculators/jaarruimte";

export default function JaarruimteCalculator() {
  const [brutoStr, setBrutoStr] = useState("50000");
  const [factorAStr, setFactorAStr] = useState("2000");
  const [heeftRegeling, setHeeftRegeling] = useState(true);
  const [reserveringStr, setReserveringStr] = useState("0");

  const brutoJaar = Number(brutoStr.replace(",", ".")) || 0;
  const factorA = Number(factorAStr.replace(",", ".")) || 0;
  const reserveringsruimte = Number(reserveringStr.replace(",", ".")) || 0;

  const result = useMemo(
    () => berekenJaarruimte({
      brutoJaar,
      factorA,
      heeftPensioenregeling: heeftRegeling,
      reserveringsruimte,
    }),
    [brutoJaar, factorA, heeftRegeling, reserveringsruimte]
  );

  return (
    <div className="space-y-5" role="form" aria-label="Jaarruimte calculator 2026">
      {/* ─── Input ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-indigo-600" />
          Jaarruimte 2026
        </h2>
        <p className="text-xs text-gray-500 -mt-2">
          Bereken hoeveel je dit jaar fiscaal voordelig kunt inleggen voor je pensioen.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="jr-bruto" className="text-xs font-medium text-gray-500">
              Bruto jaarsalaris (€)
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">€</span>
              <input id="jr-bruto" type="text" inputMode="decimal" value={brutoStr}
                onChange={(e) => { const r = e.target.value; if (r !== "" && !/^[\d.,]*$/.test(r)) return; setBrutoStr(r); }}
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-6 pr-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {heeftRegeling && (
            <div className="space-y-1.5">
              <label htmlFor="jr-factorA" className="text-xs font-medium text-gray-500">
                Factor A (opbouw 2025, €)
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">€</span>
                <input id="jr-factorA" type="text" inputMode="decimal" value={factorAStr}
                  onChange={(e) => { const r = e.target.value; if (r !== "" && !/^[\d.,]*$/.test(r)) return; setFactorAStr(r); }}
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-6 pr-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          )}
        </div>

        {/* Toggle: pensioenregeling */}
        <div className="flex items-center justify-between py-1">
          <label htmlFor="jr-regeling" className="text-sm text-gray-700 cursor-pointer">
            Ik heb een pensioenregeling via mijn werkgever
          </label>
          <button id="jr-regeling" role="switch" aria-checked={heeftRegeling}
            onClick={() => setHeeftRegeling(!heeftRegeling)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
              heeftRegeling ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
              heeftRegeling ? "translate-x-[18px]" : "translate-x-[3px]"
            }`} />
          </button>
        </div>

        {/* Reserveringsruimte */}
        <div className="space-y-1.5">
          <label htmlFor="jr-reservering" className="text-xs font-medium text-gray-500">
            Eerdere niet-benutte jaarruimte (reserveringsruimte, €)
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">€</span>
            <input id="jr-reservering" type="text" inputMode="decimal" value={reserveringStr}
              onChange={(e) => { const r = e.target.value; if (r !== "" && !/^[\d.,]*$/.test(r)) return; setReserveringStr(r); }}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-6 pr-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <p className="text-[10px] text-gray-400">Reserveringsruimte is de niet-benutte jaarruimte van de afgelopen 10 jaar. Max €42.753.</p>
        </div>
      </div>

      {/* ─── Resultaat ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 p-6 text-white shadow-lg text-center">
          <p className="text-sm text-indigo-200">Jouw jaarruimte 2026</p>
          <p className="text-4xl sm:text-5xl font-bold tabular-nums mt-1 drop-shadow-sm">
            {formatEUR(result.jaarruimte)}
          </p>
          {result.totaleRuimte > result.jaarruimte && (
            <p className="text-xs text-indigo-200 mt-1">
              incl. reserveringsruimte: {formatEUR(result.totaleRuimte)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-50 p-3 border border-gray-100 text-center">
            <p className="text-[10px] text-gray-500">Premiegrondslag</p>
            <p className="text-sm font-bold tabular-nums">{formatEUR(result.premieGrondslag)}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 border border-gray-100 text-center">
            <p className="text-[10px] text-gray-500">Franchise (AOW)</p>
            <p className="text-sm font-bold tabular-nums">{formatEUR(result.franchise)}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 border border-gray-100 text-center">
            <p className="text-[10px] text-gray-500">Factor A</p>
            <p className="text-sm font-bold tabular-nums">{formatEUR(result.factorA)}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 border border-gray-100 text-center">
            <p className="text-[10px] text-gray-500">Percentage</p>
            <p className="text-sm font-bold tabular-nums">{result.percentage}%</p>
          </div>
        </div>

        {/* Belastingbesparing */}
        {result.jaarruimte > 0 && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <p className="text-xs font-semibold text-emerald-800">Belastingbesparing</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded bg-white/80 p-2">
                <p className="text-[10px] text-emerald-700">Per jaar</p>
                <p className="text-sm font-bold text-emerald-900 tabular-nums">
                  {formatEUR(result.belastingBesparing)}
                </p>
              </div>
              <div className="rounded bg-white/80 p-2">
                <p className="text-[10px] text-emerald-700">Per maand</p>
                <p className="text-sm font-bold text-emerald-900 tabular-nums">
                  {formatEUR(result.perMaand)}
                </p>
              </div>
              <div className="rounded bg-white/80 p-2">
                <p className="text-[10px] text-emerald-700">Marginaal tarief</p>
                <p className="text-sm font-bold text-emerald-900 tabular-nums">
                  {result.marginaalTarief}%
                </p>
              </div>
            </div>
            <p className="text-[10px] text-emerald-600 mt-2">
              * Bij inleg van {formatEUR(result.totaleRuimte)} bespaar je ongeveer {formatEUR(result.belastingBesparing)} aan inkomstenbelasting (bij {result.marginaalTarief}% marginaal tarief).
            </p>
          </div>
        )}
      </div>

      {/* ─── Uitleg ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-2 mb-3">
          <Info className="h-3.5 w-3.5 text-indigo-500" />
          Hoe wordt jaarruimte berekend?
        </h3>
        <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
          <p><strong className="text-gray-700">1. Premiegrondslag</strong> = je salaris (max €{formatNL(137800, 0)}) − AOW-franchise (€{formatNL(17545, 0)})</p>
          <p><strong className="text-gray-700">2. Jaarruimte</strong> = 30% van de premiegrondslag − Factor A (pensioenopbouw via werkgever)</p>
          <p><strong className="text-gray-700">3. Maximum</strong> = €{formatNL(35589, 0)} per jaar. Reserveringsruimte max €{formatNL(42753, 0)} extra.</p>
          <p><strong className="text-gray-700">4. Let op:</strong> Factor A vind je in het Uniform Pensioenoverzicht (UPO) van 2025. Zonder pensioenregeling is factor A €0.</p>
        </div>
      </div>

      <ShareToolbar
        calculatorType="jaarruimte-berekenen"
        calculatorName="Jaarruimte Calculator 2026"
        categoryName="Geld & Verzekeringen"
        inputs={[
          { label: "Salaris", value: formatEUR(brutoJaar) },
          { label: "Factor A", value: formatEUR(factorA) },
        ]}
        results={[
          { label: "Jaarruimte", value: formatEUR(result.jaarruimte), type: "success" },
          { label: "Besparing", value: formatEUR(result.belastingBesparing) + "/jr", type: "warning" },
        ]}
      />

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Dit is een indicatie op basis van 2026-regels. Raadpleeg een financieel adviseur voor definitief advies. Jaarruimte-inleg is aftrekbaar in box 1 (max {result.marginaalTarief}% belastingvoordeel).
      </p>
    </div>
  );
}
