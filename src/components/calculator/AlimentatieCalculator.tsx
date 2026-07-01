"use client"; import { useState, useMemo } from "react"; import { Euro, AlertCircle } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { schatAlimentatie } from "@/lib/calculators/kinderbijslag";
export default function AlimentatieCalculator() {
  const [i1, setI1] = useState(50000); const [i2, setI2] = useState(0); const [ak, setAk] = useState(2);
  const r = useMemo(() => schatAlimentatie(i1, i2, ak), [i1, i2, ak]);
  return (<div className="space-y-6">
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Euro className="h-4 w-4 text-orange-500" />Kinderalimentatie</h2>
      <div className="grid grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Netto inkomen ouder 1 (€)</label><input type="text" value={i1} onChange={e=>setI1(e.target.value===''?0:+e.target.value)} className="input-base"/></div><div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Netto inkomen ouder 2 (€)</label><input type="text" value={i2} onChange={e=>setI2(e.target.value===''?0:+e.target.value)} className="input-base"/></div></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Aantal kinderen</label><input type="text" min={1} value={ak} onChange={e=>setAk(e.target.value===''?1:Math.max(1,+e.target.value))} className="input-base"/></div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-orange-500 bg-gradient-to-br to-amber-700 p-4 text-white shadow-sm text-center"><p className="text-xs text-amber-200">Ouder 1 bijdrage</p><p className="text-2xl font-bold tabular-nums mt-1">{formatEUR(r.ouder1Bijdrage)}/mnd</p></div>
      <div className="rounded-xl bg-blue-500 bg-gradient-to-br to-indigo-700 p-4 text-white shadow-sm text-center"><p className="text-xs text-indigo-200">Ouder 2 bijdrage</p><p className="text-2xl font-bold tabular-nums mt-1">{formatEUR(r.ouder2Bijdrage)}/mnd</p></div>
    </div>
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-2"><div className="grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-gray-50 p-2 border"><p className="text-[10px] text-gray-500">Totaal/mnd</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.totaalPerMaand)}</p></div><div className="rounded-lg bg-gray-50 p-2 border"><p className="text-[10px] text-gray-500">Per kind/mnd</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.perKindPerMaand)}</p></div></div>
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-3"><AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5"/><p className="text-[11px] text-amber-700 leading-relaxed">Dit is een zeer globale schatting op basis van het NIBUD-model. De werkelijke alimentatie wordt door de rechtbank vastgesteld. Raadpleeg een familierechtadvocaat.</p></div>
    </div>
    <ShareToolbar calculatorType="kinderalimentatie" calculatorName="Kinderalimentatie" categoryName="Geld & Verzekeringen" inputs={[{label:"Inkomen ouder 1",value:formatEUR(i1)},{label:"Inkomen ouder 2",value:formatEUR(i2)}]} results={[{label:"Totaal/mnd",value:formatEUR(r.totaalPerMaand),type:"warning"}]} /></div>);
}
