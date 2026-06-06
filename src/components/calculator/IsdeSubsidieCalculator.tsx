"use client"; import { useState, useMemo } from "react"; import { Leaf, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { berekenIsde, type WarmtepompType, type IsolatieType } from "@/lib/calculators/subsidie-paydown";
export default function IsdeSubsidieCalculator() {
  const [wt, setWt] = useState<WarmtepompType>("hybride"); const [kw, setKw] = useState(4); const [it, setIt] = useState<IsolatieType>("hr++"); const [m2, setM2] = useState(50);
  const r = useMemo(() => berekenIsde({ warmtepompType: wt, warmtepompKw: kw, isolatieType: it, isolatieM2: m2 }), [wt, kw, it, m2]);
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Leaf className="h-4 w-4 text-green-600" />ISDE Subsidie Wijzer</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2"><label className="text-xs font-medium text-gray-500">Warmtepomp type</label><select value={wt} onChange={e=>setWt(e.target.value as WarmtepompType)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"><option value="hybride">Hybride warmtepomp</option><option value="volledig">Volledig elektrisch</option></select><div className="space-y-1"><label className="text-xs text-gray-500">Vermogen: {kw} kW</label><input type="range" min={2} max={16} value={kw} onChange={e=>setKw(+e.target.value)} className="w-full accent-green-600"/></div></div>
      <div className="space-y-2"><label className="text-xs font-medium text-gray-500">Isolatie type</label><select value={it} onChange={e=>setIt(e.target.value as IsolatieType)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"><option value="hr++">HR++ glas</option><option value="dak">Dakisolatie</option><option value="vloer">Vloerisolatie</option><option value="spouw">Spouwmuurisolatie</option></select><div className="space-y-1"><label className="text-xs text-gray-500">Oppervlak: {m2} m²</label><input type="range" min={5} max={200} value={m2} onChange={e=>setM2(+e.target.value)} className="w-full accent-green-600"/></div></div>
    </div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 p-5 text-white shadow-lg text-center"><p className="text-sm text-green-200">ISDE-subsidie totaal</p><p className="text-3xl font-bold tabular-nums mt-1">{formatEUR(r.totaal)}</p></div>
    <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-white border border-gray-100 p-3 text-center"><p className="text-[10px] text-gray-500">Warmtepomp</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.warmtepompSubsidie)}</p></div><div className="rounded-lg bg-white border border-gray-100 p-3 text-center"><p className="text-[10px] text-gray-500">Isolatie</p><p className="text-sm font-bold tabular-nums">{formatEUR(r.isolatieSubsidie)}</p></div></div>
    {r.details.map((d,i)=><p key={i} className="text-xs text-gray-500">{d}</p>)}
  </div>
  <ShareToolbar calculatorType="isde-subsidie" calculatorName="ISDE Subsidie" categoryName="Geld & Verzekeringen" inputs={[{label:"Warmtepomp",value:`${wt} ${kw}kW`},{label:"Isolatie",value:`${it} ${m2}m²`}]} results={[{label:"Subsidie",value:formatEUR(r.totaal),type:"success"}]} />
  <p className="text-xs text-gray-400 text-center">ISDE-subsidies 2026. Actuele bedragen kunnen afwijken. Raadpleeg de RVO-website.</p></div>);
}
