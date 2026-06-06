"use client"; import { useState, useMemo, useCallback } from "react"; import { Baby, Plus, Trash2, AlertCircle } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { berekenKinderbijslag, type Kind } from "@/lib/calculators/kinderbijslag";
const AGE_LABELS = ["0-5 jaar", "6-11 jaar", "12-17 jaar"];
export default function KinderbijslagCalculator() {
  const [k, setK] = useState<Kind[]>([{ id: 1, leeftijd: 5 }]);
  const addK = useCallback(() => { const m = Math.max(...k.map(x => x.id), 0); setK(p => [...p, { id: m + 1, leeftijd: 0 }]); }, [k]);
  const rmK = useCallback((id: number) => { setK(p => p.filter(x => x.id !== id)); }, []);
  const upd = useCallback((id: number, leeftijd: number) => { setK(p => p.map(x => x.id === id ? { ...x, leeftijd } : x)); }, []);
  const r = useMemo(() => berekenKinderbijslag(k), [k]);
  return (<div className="space-y-6">
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Baby className="h-4 w-4 text-blue-600" />Kinderbijslag</h2>
      {k.map((kid, i) => (<div key={kid.id} className="flex items-center gap-3"><span className="text-xs text-gray-400 w-6 shrink-0">{i + 1}.</span><select value={kid.leeftijd} onChange={e => upd(kid.id, +e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm" aria-label={`Leeftijd kind ${i+1}`}>{Array.from({ length: 18 }, (_, a) => <option key={a} value={a}>{a} jaar</option>)}</select><div className="w-24 text-right text-xs text-gray-500 tabular-nums">€{(r.kinderen.find(x => x.id === kid.id)?.perKwartaal || 0).toFixed(2)}/kwartaal</div>{k.length > 1 && <button onClick={() => rmK(kid.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600" aria-label={`Kind ${i+1} verwijderen`}><Trash2 className="h-3.5 w-3.5" /></button>}</div>))}
      <button onClick={addK} className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"><Plus className="h-4 w-4" /> Kind toevoegen</button>
    </div>
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-2 gap-4"><div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-white text-center shadow-sm"><p className="text-xs text-blue-200">Per maand</p><p className="text-2xl font-bold tabular-nums mt-1">€{r.totaalPerMaand.toFixed(2)}</p></div><div className="rounded-xl bg-emerald-500 to-emerald-700 bg-gradient-to-br p-4 text-white text-center shadow-sm"><p className="text-xs text-emerald-200">Per kwartaal</p><p className="text-2xl font-bold tabular-nums mt-1">€{r.totaalPerKwartaal.toFixed(2)}</p></div></div>
    </div>
    <ShareToolbar calculatorType="kinderbijslag" calculatorName="Kinderbijslag" categoryName="Geld & Verzekeringen" inputs={[{label:"Aantal kinderen",value:String(k.length)}]} results={[{label:"Per maand",value:`€${r.totaalPerMaand.toFixed(2)}`,type:"success"}]} />
    <p className="text-xs text-gray-400 text-center">Kinderbijslag op basis van SVB-tarieven 2026.</p></div>);
}
