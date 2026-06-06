"use client"; import { useState, useMemo } from "react"; import { Coins, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils";
const DIVIDEND_BELASTING = 0.15; // 15% dividendbelasting NL
export default function DividendCalculator() {
  const [i, setI] = useState(50000); const [d, setD] = useState(3.5); const [h, setH] = useState(true);
  const r = useMemo(() => {
    const brutoJaar = i * (d / 100); const belasting = h ? brutoJaar * DIVIDEND_BELASTING : 0; const netto = brutoJaar - belasting;
    const maand = netto / 12; const effectief = netto / i * 100;
    return { bruto: Math.round(brutoJaar), belasting: Math.round(belasting), nettoJaar: Math.round(netto), nettoMaand: Math.round(maand), effectief: Math.round(effectief * 100) / 100 };
  }, [i, d, h]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Coins className="h-4 w-4 text-blue-600" />Dividend Berekenen</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Investering (€)</label><input type="number" value={i} onChange={e=>setI(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Dividend (%)</label><input type="number" step="0.1" value={d} onChange={e=>setD(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
    </div>
    <div className="flex gap-2"><button onClick={()=>setH(true)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${h?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Incl. dividendbelasting</button><button onClick={()=>setH(false)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${!h?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Excl. belasting</button></div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <div className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 p-5 text-white shadow-lg text-center"><p className="text-sm text-amber-100">Dividend per jaar (netto)</p><p className="text-3xl font-bold tabular-nums mt-1">{formatEUR(r.nettoJaar)}</p></div>
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-lg bg-gray-50 p-3 text-center border border-gray-100"><p className="text-[10px] text-gray-500">Bruto</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.bruto)}</p></div>
      <div className="rounded-lg bg-amber-50 p-3 text-center border border-amber-100"><p className="text-[10px] text-amber-600">Belasting (15%)</p><p className="text-sm font-bold text-amber-700 tabular-nums">{formatEUR(r.belasting)}</p></div>
      <div className="rounded-lg bg-emerald-50 p-3 text-center border border-emerald-100"><p className="text-[10px] text-emerald-600">Netto/maand</p><p className="text-sm font-bold text-emerald-700 tabular-nums">{formatEUR(r.nettoMaand)}</p></div>
    </div>
  </div>
  <ShareToolbar calculatorType="dividend-berekenen" calculatorName="Dividend Berekenen" categoryName="Geld & Verzekeringen" inputs={[{label:"Investering",value:formatEUR(i)},{label:"Dividend",value:`${d}%`}]} results={[{label:"Netto/jaar",value:formatEUR(r.nettoJaar),type:"success"}]} />
  <p className="text-xs text-gray-400 text-center">Standaard 15% dividendbelasting in Nederland. Uiteindelijke belasting kan afwijken.</p></div>);
}
