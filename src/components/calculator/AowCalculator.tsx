"use client"; import { useState, useMemo } from "react"; import { Clock, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { berekenAow } from "@/lib/calculators/erfenis-aow";
export default function AowCalculator() {
  const [d, setD] = useState("1990-01-01"); const r = useMemo(() => berekenAow({ geboortedatum: d }), [d]);
  return (<div className="space-y-6">
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Clock className="h-4 w-4 text-indigo-600" />AOW-leeftijd</h2>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Geboortedatum</label><input type="date" value={d} onChange={e=>setD(e.target.value)} className="input-base"/></div>
    </div>
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
      <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-5 text-white shadow-lg text-center"><p className="text-sm text-emerald-200">AOW-leeftijd</p><p className="text-3xl font-bold mt-1">{r.aowLeeftijd}</p></div>
      <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-gray-50 p-3 text-center border"><p className="text-[10px] text-gray-500">Ingangsdatum AOW</p><p className="text-sm font-bold tabular-nums">{r.aowDatum}</p></div><div className="rounded-lg bg-emerald-50 p-3 text-center border border-emerald-100"><p className="text-[10px] text-emerald-600">Nog te gaan</p><p className="text-sm font-bold text-emerald-700 tabular-nums">{r.jarenTotAow} jaar</p></div></div>
      <p className="text-xs text-gray-500">{r.opmerking}</p>
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-3"><p className="text-[11px] text-amber-700">De AOW-leeftijd kan wijzigen door nieuwe wetgeving. Raadpleeg de SVB voor actuele informatie.</p></div>
    </div>
    <ShareToolbar calculatorType="aow-leeftijd" calculatorName="AOW Leeftijd" categoryName="Geld & Verzekeringen" inputs={[{label:"Geb.datum",value:d}]} results={[{label:"AOW op",value:r.aowLeeftijd,type:"success"}]} /></div>);
}
