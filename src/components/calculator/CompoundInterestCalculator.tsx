"use client"; import { useState, useMemo } from "react"; import { TrendingUp, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils";
export default function CompoundInterestCalculator() {
  const [p, setP] = useState(10000); const [r, setR] = useState(7); const [y, setY] = useState(20); const [m, setM] = useState(200);
  const res = useMemo(() => {
    const rate = r / 100; let total = p; let totalInv = p;
    for (let i = 0; i < y; i++) { total = (total + m * 12) * (1 + rate); totalInv += m * 12; }
    const growth = total - totalInv;
    return { eindWaarde: Math.round(total), ingelegd: Math.round(totalInv), groei: Math.round(growth), rendement: Math.round((total / totalInv - 1) * 10000) / 100 };
  }, [p, r, y, m]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-blue-600" />Vermogensgroei</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Startkapitaal (€)</label><input type="number" value={p} onChange={e=>setP(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Jaarlijks rendement (%)</label><input type="number" step="0.5" value={r} onChange={e=>setR(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Looptijd (jaren)</label><input type="number" value={y} onChange={e=>setY(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Maandelijks inleggen (€)</label><input type="number" value={m} onChange={e=>setM(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
    </div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-5 text-white shadow-lg text-center"><p className="text-sm text-emerald-200">Eindwaarde</p><p className="text-3xl font-bold tabular-nums mt-1">{formatEUR(res.eindWaarde)}</p></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100"><span className="text-sm text-gray-600">Zelf ingelegd</span><span className="text-sm font-bold tabular-nums">{formatEUR(res.ingelegd)}</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-emerald-50 border border-emerald-100"><span className="text-sm text-gray-600">Rendement (groei)</span><span className="text-sm font-bold tabular-nums text-emerald-700">{formatEUR(res.groei)}</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-blue-50 border border-blue-100"><span className="text-sm text-gray-600">Totaal rendement</span><span className="text-sm font-bold tabular-nums text-blue-700">{res.rendement}%</span></div>
  </div>
  <ShareToolbar calculatorType="compound-interest" calculatorName="Vermogensgroei Tracker" categoryName="Geld & Verzekeringen" inputs={[{label:"Start",value:formatEUR(p)},{label:"Rendement",value:`${r}%`}]} results={[{label:"Eindwaarde",value:formatEUR(res.eindWaarde),type:"success"}]} />
  <p className="text-xs text-gray-400 text-center">Rendement is een indicatie. Historische resultaten garanderen geen toekomstige prestaties.</p></div>);
}
