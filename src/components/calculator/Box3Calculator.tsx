"use client"; import { useState, useMemo } from "react"; import { Landmark, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { berekenBox3 } from "@/lib/calculators/box3";
export default function Box3Calculator() {
  const [s, setS] = useState(50000); const [b, setB] = useState(50000); const [sk, setSk] = useState(0); const [a, setA] = useState(true);
  const r = useMemo(() => berekenBox3({ sparen: s, beleggen: b, schulden: sk, alleenstaand: a }), [s, b, sk, a]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Landmark className="h-4 w-4 text-indigo-600" />Box 3 — Vermogen</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Banktegoeden (€)</label><input type="text" value={s} onChange={e=>setS(+e.target.value||0)} className="input-base"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Beleggingen (€)</label><input type="text" value={b} onChange={e=>setB(+e.target.value||0)} className="input-base"/></div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Schulden (€)</label><input type="text" value={sk} onChange={e=>setSk(+e.target.value||0)} className="input-base"/></div>
      <div className="flex items-end gap-2 pb-1"><button onClick={()=>setA(true)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${a?"bg-indigo-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Alleenstaand</button><button onClick={()=>setA(false)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${!a?"bg-indigo-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Samen</button></div>
    </div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-5 text-white shadow-lg text-center"><p className="text-sm text-indigo-200">Box 3 belasting</p><p className="text-3xl font-bold tabular-nums mt-1">{formatEUR(r.belasting)}</p></div>
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg bg-gray-50 p-3 border border-gray-100"><p className="text-[10px] text-gray-500">Rendementsgrondslag</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.rendementsgrondslag)}</p></div>
      <div className="rounded-lg bg-gray-50 p-3 border border-gray-100"><p className="text-[10px] text-gray-500">Heffingsvrij</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.heffingsvrij)}</p></div>
      <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-100"><p className="text-[10px] text-emerald-600">Fictief rendement sparen</p><p className="text-sm font-bold text-emerald-700 tabular-nums">{formatEUR(r.fictiefRendementSparen)}</p></div>
      <div className="rounded-lg bg-amber-50 p-3 border border-amber-100"><p className="text-[10px] text-amber-600">Fictief rendement beleggen</p><p className="text-sm font-bold text-amber-700 tabular-nums">{formatEUR(r.fictiefRendementBeleggen)}</p></div>
      {r.aftrekbareSchulden > 0 && <div className="rounded-lg bg-blue-50 p-3 border border-blue-100"><p className="text-[10px] text-blue-600">Aftrekbare schulden</p><p className="text-sm font-bold text-blue-700 tabular-nums">− {formatEUR(r.aftrekbareSchulden)}</p></div>}
    </div>
  </div>
  <ShareToolbar calculatorType="box3-berekenen" calculatorName="Box 3 Berekenen" categoryName="Geld & Verzekeringen" inputs={[{label:"Sparen",value:formatEUR(s)},{label:"Beleggen",value:formatEUR(b)}]} results={[{label:"Belasting",value:formatEUR(r.belasting),type:"warning"}]} />
  <p className="text-xs text-gray-400 text-center">Op basis van 2026 forfaitaire rendementen (sparen 1,52%, beleggen 6,04%, heffingsvrij vermogen €{r.heffingsvrij.toLocaleString("nl-NL")}, tarief 36%). Schulden boven €3.700 worden afgetrokken van de rendementsgrondslag.</p></div>);
}
