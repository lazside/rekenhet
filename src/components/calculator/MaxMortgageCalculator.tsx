"use client"; import { useState, useMemo } from "react"; import { Home, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { maxMortgage } from "@/lib/calculators/max-mortgage";
export default function MaxMortgageCalculator() {
  const [i, setI] = useState(50000); const [pi, setPi] = useState(0); const [r, setR] = useState(4.5); const [l, setL] = useState(30);
  const res = useMemo(() => maxMortgage(i, pi, r, l), [i, pi, r, l]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Home className="h-4 w-4 text-blue-600" />Maximale Hypotheek</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Jouw inkomen (€)</label><input type="number" value={i} onChange={e=>setI(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Partnerinkomen (€)</label><input type="number" value={pi} onChange={e=>setPi(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Rente (%)</label><input type="number" step="0.1" value={r} onChange={e=>setR(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Looptijd (jr)</label><input type="number" value={l} onChange={e=>setL(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
    </div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 p-5 text-white shadow-lg text-center"><p className="text-sm text-blue-200">Maximale hypotheek</p><p className="text-3xl font-bold tabular-nums mt-1">{formatEUR(res.maxHypotheek)}</p></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100"><span className="text-sm text-gray-600">Bruto maandlasten</span><span className="text-sm font-bold tabular-nums">{formatEUR(res.maandlasten)}</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100"><span className="text-sm text-gray-600">Inkomensfactor</span><span className="text-sm font-bold tabular-nums">{res.maxFactor}</span></div>
  </div>
  <ShareToolbar calculatorType="maximale-hypotheek" calculatorName="Sneltest Maximale Hypotheek" categoryName="Geld & Verzekeringen" inputs={[{label:"Inkomen",value:formatEUR(i)},{label:"Rente",value:`${r}%`}]} results={[{label:"Max hypotheek",value:formatEUR(res.maxHypotheek),type:"success"},{label:"Maandlasten",value:formatEUR(res.maandlasten),type:"info"}]} />
  <p className="text-xs text-gray-400 text-center">Dit is een sneltest. Een hypotheekadviseur berekent de exacte maximale hypotheek.</p></div>);
}
