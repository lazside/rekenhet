"use client"; import { useState, useMemo } from "react"; import { Car, Fuel, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { calculateTripCost } from "@/lib/calculators/trip-cost";
export default function TripCostCalculator() {
  const [d, setD] = useState(150); const [c, setC] = useState(15); const [p, setP] = useState(2.15); const [t, setT] = useState(0); const [pk, setPk] = useState(0);
  const r = useMemo(() => calculateTripCost(d, c, p, t, pk), [d, c, p, t, pk]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Car className="h-4 w-4 text-blue-600" />Ritkosten</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Afstand (km)</label><input type="number" value={d} onChange={e => setD(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Verbruik (km/l)</label><input type="number" value={c} onChange={e => setC(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Brandstofprijs (€/l)</label><input type="number" step="0.01" value={p} onChange={e => setP(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Tol (€)</label><input type="number" value={t} onChange={e => setT(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
    </div>
    <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Parkeren (€)</label><input type="number" value={pk} onChange={e => setPk(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Euro className="h-4 w-4 text-blue-600" />Kostenoverzicht</h2>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100"><span className="text-sm text-gray-600">Brandstofkosten</span><span className="text-sm font-bold tabular-nums">{formatEUR(r.fuelCost)}</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-amber-50 border border-amber-100"><span className="text-sm text-gray-600">Tol + Parkeren</span><span className="text-sm font-bold tabular-nums text-amber-700">{formatEUR(t + pk)}</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-emerald-50 border border-emerald-100"><span className="text-sm text-gray-600">Totale kosten</span><span className="text-sm font-bold tabular-nums text-emerald-700">{formatEUR(r.total)}</span></div>
    <p className="text-xs text-gray-400 text-center">CO₂-uitstoot: {r.co2Kg} kg</p>
  </div>
  <ShareToolbar calculatorType="ritkosten-berekenen" calculatorName="Ritkosten Berekenen" categoryName="Algemeen" inputs={[{label:"Afstand",value:`${d} km`},{label:"Verbruik",value:`${c} km/l`},{label:"Prijs",value:`€${p}/l`}]} results={[{label:"Totale kosten",value:formatEUR(r.total),type:"success"},{label:"Brandstof",value:formatEUR(r.fuelCost),type:"default"}]} />
  <p className="text-xs text-gray-400 text-center">Deze berekening is een indicatie. Werkelijke kosten kunnen afwijken.</p></div>);
}
