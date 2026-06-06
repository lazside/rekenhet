"use client";

import { useState, useCallback, useMemo } from "react";
import { Sun, ArrowUp, Euro, TrendingUp, Calendar, Home, Loader2, BarChart3, Zap } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import { REGIONS } from "@/lib/solar/regions";

const DIRECTIONS = [
  { label: "Noord", azimuth: 0, icon: "⬆️" },
  { label: "Noordoost", azimuth: 45, icon: "↗️" },
  { label: "Oost", azimuth: 90, icon: "➡️" },
  { label: "Zuidoost", azimuth: 135, icon: "↘️" },
  { label: "Zuid", azimuth: 180, icon: "⬇️" },
  { label: "Zuidwest", azimuth: 225, icon: "↙️" },
  { label: "West", azimuth: 270, icon: "⬅️" },
  { label: "Noordwest", azimuth: 315, icon: "↖️" },
];

interface SolarResult {
  data: { region: string; lat: number; lon: number; panels: number; totalWp: number; pitch: number; azimuth: number };
  yearlyKwh: number;
  monthlyData: { month: string; kwh: number }[];
  financial: { totalCost: number; savingsPerYear: number; paybackYears: number; paybackMonths: number; roi: { year: number; cumulative: number; remaining: number }[] };
  source: string;
}

export default function SolarCalculator() {
  const [panels, setPanels] = useState(10);
  const [wp, setWp] = useState(400);
  const [pitch, setPitch] = useState(35);
  const [azimuth, setAzimuth] = useState(180);
  const [region, setRegion] = useState("Nederland (centraal)");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SolarResult | null>(null);
  const [error, setError] = useState("");

  const kWhPrijs = 0.25;

  const handleCalculate = useCallback(async () => {
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(`/api/solar?region=${encodeURIComponent(region)}&panels=${panels}&wp=${wp}&pitch=${pitch}&azimuth=${azimuth}`);
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Fout bij ophalen"); return; }
      setResult(json);
    } catch { setError("Netwerkfout"); }
    finally { setLoading(false); }
  }, [region, panels, wp, pitch, azimuth]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Sun className="h-4 w-4 text-amber-500" />
          Zonnepanelen instellingen
        </h2>

        {/* Region */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Regio</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm">
            {REGIONS.map((r) => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
        </div>

        {/* Panels + Wp in grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Aantal panelen</label>
            <input type="range" min={1} max={50} value={panels} onChange={(e) => setPanels(+e.target.value)} className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-gray-400"><span>1</span><span className="font-semibold text-blue-600">{panels}</span><span>50</span></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Wattpiek (Wp)</label>
            <select value={wp} onChange={(e) => setWp(+e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm">
              <option value="350">350 Wp</option>
              <option value="375">375 Wp</option>
              <option value="400">400 Wp</option>
              <option value="425">425 Wp</option>
              <option value="450">450 Wp</option>
            </select>
          </div>
        </div>

        {/* Pitch slider */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Dakhelling: {pitch}°</label>
          <input type="range" min={5} max={60} value={pitch} onChange={(e) => setPitch(+e.target.value)} className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-gray-400"><span>5°</span><span>{pitch}°</span><span>60°</span></div>
        </div>

        {/* Direction tiles */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Oriëntatie</label>
          <div className="grid grid-cols-4 gap-2">
            {DIRECTIONS.map((d) => (
              <button
                key={d.azimuth}
                onClick={() => setAzimuth(d.azimuth)}
                className={`rounded-lg px-2 py-2.5 text-xs font-medium transition-all text-center ${azimuth === d.azimuth ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-300" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
              >
                <span className="block text-sm">{d.icon}</span>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
          {loading ? "Bezig..." : "Bereken opbrengst"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Hero yield card */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 text-amber-100 text-sm mb-1"><Zap className="h-4 w-4" />Jaarlijkse opbrengst</div>
            <p className="text-4xl font-bold tabular-nums">{result.yearlyKwh.toLocaleString("nl-NL")} kWh</p>
            <p className="text-amber-100 text-sm mt-1">≈ {formatEUR(result.financial.savingsPerYear)} besparing per jaar</p>
          </div>

          {/* Specs row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Sun, label: "Panelen", value: `${result.data.panels} × ${result.data.totalWp / result.data.panels}Wp` },
              { icon: ArrowUp, label: "Dakhelling", value: `${result.data.pitch}°` },
              { icon: Home, label: "Oriëntatie", value: `${result.data.azimuth}° (Z)` },
              { icon: Calendar, label: "Regio", value: result.data.region },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-center">
                <s.icon className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                <p className="text-[10px] text-gray-500">{s.label}</p>
                <p className="text-sm font-semibold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Monthly bar chart */}
          {result.monthlyData.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4"><BarChart3 className="h-4 w-4 text-blue-600" /><h3 className="text-sm font-semibold text-gray-900">Maandelijkse opbrengst</h3></div>
              <div className="flex items-end gap-1.5 h-32">
                {result.monthlyData.map((m, i) => {
                  const max = Math.max(...result.monthlyData.map(x => x.kwh));
                  const pct = (m.kwh / max) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] text-gray-400 font-medium">{m.kwh}</span>
                      <div className="w-full rounded-t-md bg-gradient-to-t from-amber-400 to-amber-300 transition-all" style={{ height: `${Math.max(pct, 3)}%` }} title={`${m.month}: ${m.kwh} kWh`} />
                      <span className="text-[9px] text-gray-500">{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Financial ROI */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4"><TrendingUp className="h-4 w-4 text-emerald-600" /><h3 className="text-sm font-semibold text-gray-900">Financieel overzicht</h3></div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg bg-gray-50 p-3 text-center border border-gray-100"><p className="text-[10px] text-gray-500">Investering</p><p className="text-sm font-bold text-gray-900 tabular-nums">{formatEUR(result.financial.totalCost)}</p></div>
              <div className="rounded-lg bg-emerald-50 p-3 text-center border border-emerald-100"><p className="text-[10px] text-emerald-600">Besparing/jr</p><p className="text-sm font-bold text-emerald-700 tabular-nums">{formatEUR(result.financial.savingsPerYear)}</p></div>
              <div className="rounded-lg bg-blue-50 p-3 text-center border border-blue-100"><p className="text-[10px] text-blue-600">Terugverdientijd</p><p className="text-sm font-bold text-blue-700 tabular-nums">{result.financial.paybackYears} jaar</p></div>
            </div>

            {/* ROI chart */}
            <div className="space-y-1.5">
              {result.financial.roi.filter((r) => r.year <= 10).map((r) => {
                const maxCost = result.financial.totalCost;
                const pct = Math.min((r.cumulative / maxCost) * 100, 100);
                return (
                  <div key={r.year} className="flex items-center gap-2 text-xs">
                    <span className="w-6 text-right text-gray-500 shrink-0">jr {r.year}</span>
                    <div className="flex-1 h-5 rounded-md bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-md bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-20 text-right font-medium tabular-nums text-gray-700">
                      {r.remaining <= 0 ? "✅" : `${formatEUR(r.remaining)}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {result.source === "fallback" && (
            <p className="text-xs text-amber-600 text-center">PVGIS niet bereikbaar — opbrengst geschat op basis van regionaal gemiddelde.</p>
          )}
        </>
      )}
    </div>
  );
}
