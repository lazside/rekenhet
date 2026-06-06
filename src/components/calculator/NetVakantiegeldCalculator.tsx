"use client"; import { useState, useMemo } from "react"; import { Umbrella, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { netVakantiegeld } from "@/lib/calculators/net-vakantiegeld";
export default function NetVakantiegeldCalculator() {
  const [sal, setSal] = useState(50000); const [ahk, setAhk] = useState(true); const [ak, setAk] = useState(true);
  const r = useMemo(() => netVakantiegeld(sal, ahk, ak), [sal, ahk, ak]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Umbrella className="h-4 w-4 text-blue-600" />Netto Vakantiegeld</h2>
    <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Bruto jaarsalaris (€)</label><input type="number" value={sal} onChange={e=>setSal(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
    <div className="flex gap-2"><button onClick={()=>setAhk(!ahk)} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${ahk?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>AHK: {ahk?"Aan":"Uit"}</button><button onClick={()=>setAk(!ak)} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${ak?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Arbeidskorting: {ak?"Aan":"Uit"}</button></div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 p-4 text-white text-center"><p className="text-xs text-green-200">Bruto</p><p className="text-xl font-bold tabular-nums mt-1">{formatEUR(r.brutoVakantiegeld)}</p></div>
      <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-white text-center"><p className="text-xs text-blue-200">Netto</p><p className="text-xl font-bold tabular-nums mt-1">{formatEUR(r.nettoVakantiegeld)}</p></div>
    </div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-amber-50 border border-amber-100"><span className="text-sm text-gray-600">Belasting + premies</span><span className="text-sm font-bold tabular-nums text-amber-700">{formatEUR(r.belastingEnPremies)}</span></div>
  </div>
  <ShareToolbar calculatorType="netto-vakantiegeld" calculatorName="Netto Vakantiegeld" categoryName="Werk & Inkomen" inputs={[{label:"Salaris",value:formatEUR(sal)}]} results={[{label:"Netto",value:formatEUR(r.nettoVakantiegeld),type:"success"}]} />
  <p className="text-xs text-gray-400 text-center">Berekening op basis van 8% vakantietoeslag en 2026 belastingregels.</p></div>);
}
