"use client"; import { useState, useMemo } from "react"; import { Gift, Euro, Lightbulb } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { berekenSchenking, type Tariefgroep } from "@/lib/calculators/erfenis-aow";
const TARIEF_LABELS: Record<Tariefgroep, string> = { partner: "Partner / Kind", kind: "Kind", kleinkind: "Kleinkind", overig: "Broer/zus/derden" };
const GROEP_KLEUREN: Record<Tariefgroep, string> = { partner: "bg-blue-50 border-blue-100", kind: "bg-emerald-50 border-emerald-100", kleinkind: "bg-amber-50 border-amber-100", overig: "bg-red-50 border-red-100" };
export default function SchenkbelastingCalculator() {
  const [b, setB] = useState(50000); const [g, setG] = useState<Tariefgroep>("kind"); const [e, setE] = useState(false);
  const r = useMemo(() => berekenSchenking({ bedrag: b, tariefgroep: g, isErfenis: e, jaar: 2026 }), [b, g, e]);
  return (<div className="space-y-6">
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Gift className="h-4 w-4 text-blue-600" />Schenk- & Erfbelasting</h2>
      <div className="grid grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Bedrag (€)</label><input type="number" value={b} onChange={e=>setB(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div><div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Relatie</label><select value={g} onChange={e=>setG(e.target.value as Tariefgroep)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{(Object.entries(TARIEF_LABELS) as [Tariefgroep, string][]).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></div></div>
      <div className="flex gap-2"><button onClick={()=>setE(false)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${!e?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Schenking</button><button onClick={()=>setE(true)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${e?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Erfenis</button></div>
    </div>
    <div className={`rounded-xl border p-5 shadow-sm space-y-3 ${GROEP_KLEUREN[g]}`}>
      <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 p-5 text-white shadow-lg text-center"><p className="text-sm text-blue-200">Te betalen belasting</p><p className="text-3xl font-bold tabular-nums mt-1">{formatEUR(r.belasting)}</p><p className="text-xs text-blue-300 mt-1">Effectief tarief: {r.effectiefTarief}%</p></div>
      <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-white/80 p-3 text-center border"><p className="text-[10px] text-gray-500">Vrijstelling</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.vrijstelling)}</p></div><div className="rounded-lg bg-white/80 p-3 text-center border"><p className="text-[10px] text-gray-500">Belastbaar</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.belastbaar)}</p></div></div>
      {r.tips.length>0 && <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-3"><Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5"/><p className="text-xs text-amber-700 leading-relaxed">{r.tips[0]}</p></div>}
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-3"><p className="text-[11px] text-amber-700">Dit is een indicatie. Raadpleeg een notaris voor definitief advies.</p></div>
    </div>
    <ShareToolbar calculatorType="schenkbelasting" calculatorName="Schenkbelasting" categoryName="Geld & Verzekeringen" inputs={[{label:"Bedrag",value:formatEUR(b)}]} results={[{label:"Belasting",value:formatEUR(r.belasting),type:"warning"}]} /></div>);
}
