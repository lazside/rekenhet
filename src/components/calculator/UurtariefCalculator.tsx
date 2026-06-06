"use client"; import { useState, useMemo } from "react"; import { Clock, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { hourlyToMonthly } from "@/lib/calculators/uurtarief";
export default function UurtariefCalculator() {
  const [rate, setRate] = useState(50); const [hours, setHours] = useState(40);
  const r = useMemo(() => hourlyToMonthly(rate, hours), [rate, hours]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Clock className="h-4 w-4 text-blue-600" />Uurtarief</h2>
    <div className="grid grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Uurtarief (€)</label><input type="number" value={rate} onChange={e=>setRate(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div><div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Uren per week</label><input type="number" value={hours} onChange={e=>setHours(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div></div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Euro className="h-4 w-4 text-blue-600" />Inkomen</h2>
    <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 p-5 text-white shadow-lg text-center"><p className="text-sm text-blue-200">Netto per maand</p><p className="text-4xl font-bold tabular-nums mt-1">{formatEUR(r.nettoMaand)}</p></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100"><span className="text-sm text-gray-600">Bruto per maand</span><span className="text-sm font-bold tabular-nums">{formatEUR(r.brutoMaand)}</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100"><span className="text-sm text-gray-600">Bruto per jaar</span><span className="text-sm font-bold tabular-nums">{formatEUR(r.brutoJaar)}</span></div>
  </div>
  <ShareToolbar calculatorType="uurtarief-berekenen" calculatorName="Uurtarief naar Netto" categoryName="Werk & Inkomen" inputs={[{label:"Uurtarief",value:`€${rate}`},{label:"Uren",value:`${hours}/wk`}]} results={[{label:"Netto/mnd",value:formatEUR(r.nettoMaand),type:"success"}]} />
  <p className="text-xs text-gray-400 text-center">Berekening op basis van 2026 belastingregels. Vakantiegeld is inbegrepen.</p></div>);
}
