"use client"; import { useState, useMemo } from "react"; import { Percent, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { calculateBtw } from "@/lib/calculators/btw-simple";
const TARIEVEN = [{value:21,label:"21%"},{value:9,label:"9%"},{value:0,label:"0%"}];
export default function BtwSimpleCalculator() {
  const [b, setB] = useState(121); const [t, setT] = useState(21); const [incl, setIncl] = useState(true);
  const r = useMemo(() => calculateBtw(b, t, incl), [b, t, incl]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Percent className="h-4 w-4 text-blue-600" />BTW Berekenen</h2>
    <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Bedrag</label><input type="number" step="0.01" value={b} onChange={e=>setB(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
    <div className="grid grid-cols-3 gap-2">{[21,9,0].map(v=><button key={v} onClick={()=>setT(v)} className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${t===v?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{v}%</button>)}</div>
    <div className="flex gap-2"><button onClick={()=>setIncl(true)} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${incl?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Incl. BTW</button><button onClick={()=>setIncl(false)} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${!incl?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Excl. BTW</button></div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100"><span className="text-sm text-gray-600">BTW bedrag</span><span className="text-sm font-bold tabular-nums text-amber-700">{formatEUR(r.btw)}</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-blue-50 border border-blue-100"><span className="text-sm text-gray-600">Exclusief BTW</span><span className="text-sm font-bold tabular-nums text-blue-700">{formatEUR(r.exclusief)}</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-emerald-50 border border-emerald-100"><span className="text-sm font-bold tabular-nums text-emerald-700">Totaal incl. BTW</span><span className="text-sm font-bold tabular-nums text-emerald-700">{formatEUR(r.inclusief)}</span></div>
  </div>
  <ShareToolbar calculatorType="btw-incl-excl" calculatorName="BTW Inclusief/Exclusief" categoryName="Ondernemen" inputs={[{label:"Bedrag",value:`€${b}`},{label:"Tarief",value:`${t}%`}]} results={[{label:"BTW",value:formatEUR(r.btw),type:"warning"}]} />
  <p className="text-xs text-gray-400 text-center">Gebruik de BTW Calculator voor meer geavanceerde berekeningen.</p></div>);
}
