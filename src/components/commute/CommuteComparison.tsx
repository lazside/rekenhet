"use client";

import { useState, useCallback, useMemo } from "react";
import { Home, Briefcase, Euro, TrendingDown, Car, Zap, Clock, Loader2, ArrowRightLeft } from "lucide-react";
import { formatEUR } from "@/lib/utils";

const TAX_FREE_KM_RATE = 0.25;
const HOME_OFFICE_DAILY_COST = 2.50; // avg electricity/heating per day
const COFFEE_DAILY = 1.50;

export default function CommuteComparison() {
  const [fromPostcode, setFromPostcode] = useState("");
  const [toPostcode, setToPostcode] = useState("3011");
  const [hourlyWage, setHourlyWage] = useState(30);
  const [daysThuis, setDaysThuis] = useState(2);
  const [kmRate, setKmRate] = useState(TAX_FREE_KM_RATE);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState<{ distanceKm: number; durationMin: number; fromName: string; toName: string } | null>(null);
  const [error, setError] = useState("");

  const totalDays = 5; // work days per week
  const daysKantoor = totalDays - daysThuis;
  const weeksPerYear = 46; // after holidays

  const handleCalculate = useCallback(async () => {
    if (!fromPostcode.trim() || !toPostcode.trim()) return;
    setLoading(true); setError(""); setRouteData(null);
    try {
      const res = await fetch(`/api/route-distance?from=${encodeURIComponent(fromPostcode)}&to=${encodeURIComponent(toPostcode)}`);
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Fout"); return; }
      setRouteData(json);
    } catch { setError("Netwerkfout"); }
    finally { setLoading(false); }
  }, [fromPostcode, toPostcode]);

  const comparison = useMemo(() => {
    if (!routeData) return null;
    const { distanceKm, durationMin } = routeData;
    const travelCostPerDay = distanceKm * 2 * kmRate; // round trip
    const travelTimeMinDay = durationMin * 2;
    const travelTimeHoursYear = (travelTimeMinDay / 60) * daysKantoor * weeksPerYear;
    const travelCostYear = travelCostPerDay * daysKantoor * weeksPerYear;
    const opportunityCostYear = Math.round(travelTimeHoursYear * hourlyWage);
    const homeOfficeCostYear = daysThuis * weeksPerYear * (HOME_OFFICE_DAILY_COST + COFFEE_DAILY);
    const totalExtraCostKantoor = travelCostYear + opportunityCostYear;
    const netSavingsThuis = totalExtraCostKantoor - homeOfficeCostYear;

    return {
      distanceKm,
      durationMin,
      travelCostPerDay: Math.round(travelCostPerDay * 100) / 100,
      travelCostYear,
      travelTimeHoursYear: Math.round(travelTimeHoursYear * 10) / 10,
      travelTimeMinDay,
      opportunityCostYear,
      homeOfficeCostYear,
      totalExtraCostKantoor,
      netSavingsThuis,
      daysKantoor,
      daysThuis,
      weeksPerYear,
    };
  }, [routeData, kmRate, hourlyWage, daysThuis]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-blue-600" />
          Woon-werk vergelijking
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Van (postcode)</label><input type="text" value={fromPostcode} onChange={e=>setFromPostcode(e.target.value.toUpperCase())} placeholder="3011" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Naar (postcode)</label><input type="text" value={toPostcode} onChange={e=>setToPostcode(e.target.value.toUpperCase())} placeholder="3011" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Uurloon (€)</label><input type="number" value={hourlyWage} onChange={e=>setHourlyWage(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Dagen thuis/week</label><input type="number" min={0} max={5} value={daysThuis} onChange={e=>setDaysThuis(Math.min(5,Math.max(0,+e.target.value||0)))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">KM-vergoeding (€)</label><input type="number" step="0.01" value={kmRate} onChange={e=>setKmRate(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        </div>
        <button onClick={handleCalculate} disabled={loading||!fromPostcode} className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Car className="h-4 w-4" />}
          {loading ? "Bezig..." : "Bereken reisafstand"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {/* Route info */}
      {routeData && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="h-4 w-4" /> {routeData.fromName}
            <ArrowRightLeft className="h-3 w-3 text-gray-300" />
            <Briefcase className="h-4 w-4" /> {routeData.toName}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="rounded-lg bg-blue-50 p-3 text-center"><p className="text-[10px] text-blue-600">Afstand (enkele reis)</p><p className="text-lg font-bold text-blue-700 tabular-nums">{routeData.distanceKm} km</p></div>
            <div className="rounded-lg bg-amber-50 p-3 text-center"><p className="text-[10px] text-amber-600">Reistijd (enkele reis)</p><p className="text-lg font-bold text-amber-700 tabular-nums">{routeData.durationMin} min</p></div>
          </div>
        </div>
      )}

      {/* Comparison */}
      {comparison && (
        <>
          {/* Hero savings */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-lg text-center">
            <p className="text-sm text-emerald-200">Netto voordeel thuiswerken per jaar</p>
            <p className="text-4xl font-bold tabular-nums mt-1">
              {comparison.netSavingsThuis > 0 ? `+${formatEUR(comparison.netSavingsThuis)}` : formatEUR(comparison.netSavingsThuis)}
            </p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kantoor */}
            <div className="rounded-xl border-2 border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100"><Briefcase className="h-4 w-4 text-blue-600" /></div>
                <div><h3 className="text-sm font-semibold text-gray-900">Kantoordag</h3><p className="text-xs text-gray-500">{comparison.daysKantoor} dagen/week</p></div>
              </div>
              <ul className="space-y-2.5">
                <ComparisonRow label="Reiskosten per dag" value={formatEUR(comparison.travelCostPerDay)} icon={Car} />
                <ComparisonRow label="Reistijd per dag" value={`${comparison.travelTimeMinDay} min`} icon={Clock} />
                <ComparisonRow label="Reiskosten per jaar" value={formatEUR(comparison.travelCostYear)} icon={Euro} />
                <ComparisonRow label="Reistijd per jaar" value={`${comparison.travelTimeHoursYear} uur`} icon={Clock} />
                <ComparisonRow label="Kansrijkheid (loon)" value={formatEUR(comparison.opportunityCostYear)} icon={TrendingDown} />
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-600">Totale kosten</span>
                <span className="text-sm font-bold text-blue-700 tabular-nums">{formatEUR(comparison.totalExtraCostKantoor)}</span>
              </div>
            </div>

            {/* Thuis */}
            <div className="rounded-xl border-2 border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100"><Home className="h-4 w-4 text-emerald-600" /></div>
                <div><h3 className="text-sm font-semibold text-gray-900">Thuiswerkdag</h3><p className="text-xs text-gray-500">{comparison.daysThuis} dagen/week</p></div>
              </div>
              <ul className="space-y-2.5">
                <ComparisonRow label="Reiskosten" value="€ 0" icon={Car} />
                <ComparisonRow label="Reistijd" value="0 min" icon={Clock} />
                <ComparisonRow label="Stroom & verwarming" value={formatEUR(HOME_OFFICE_DAILY_COST * comparison.daysThuis * comparison.weeksPerYear)} icon={Zap} />
                <ComparisonRow label="Koffie/thuis" value={formatEUR(COFFEE_DAILY * comparison.daysThuis * comparison.weeksPerYear)} icon={Euro} />
                <ComparisonRow label="Reistijd bespaard" value={`${Math.round(comparison.travelTimeMinDay * comparison.daysThuis / totalDays * comparison.weeksPerYear / 60 * 10) / 10} uur`} icon={Clock} />
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-600">Totale kosten</span>
                <span className="text-sm font-bold text-emerald-700 tabular-nums">{formatEUR(comparison.homeOfficeCostYear)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ComparisonRow({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Car }) {
  return (
    <li className="flex items-center justify-between text-xs">
      <span className="flex items-center gap-1.5 text-gray-500"><Icon className="h-3 w-3" />{label}</span>
      <span className="font-semibold text-gray-800 tabular-nums">{value}</span>
    </li>
  );
}
