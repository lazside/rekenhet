"use client"; import { useState, useMemo } from "react"; import { Gauge, Euro } from "lucide-react"; import { ShareToolbar } from "@/components/share/ShareToolbar"; import { formatEUR } from "@/lib/utils"; import { calculateFine } from "@/lib/calculators/speeding-fine";
export default function SpeedingFineCalculator() {
  const [speed, setSpeed] = useState(80); const [limit, setLimit] = useState(80); const [motorway, setMotorway] = useState(true);
  const fine = useMemo(() => calculateFine(speed, limit, motorway), [speed, limit, motorway]);
  const over = speed - limit;
  return (<div className="space-y-6"><div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Gauge className="h-4 w-4 text-blue-600" />Snelheid</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Jouw snelheid (km/h)</label><input type="number" value={speed} onChange={e=>setSpeed(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Toegestane snelheid (km/h)</label><input type="number" value={limit} onChange={e=>setLimit(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
    </div>
    <div className="flex gap-2"><button onClick={()=>setMotorway(true)} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${motorway?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Snelweg</button><button onClick={()=>setMotorway(false)} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${!motorway?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Binnenweg</button></div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Euro className="h-4 w-4 text-blue-600" />Boete</h2>
    {over<=0?<p className="text-center py-4 text-emerald-600 font-medium">Je houdt je aan de snelheid. Geen boete!</p>:<>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-white border border-gray-100"><span className="text-sm text-gray-600">Te hard</span><span className="text-sm font-bold tabular-nums text-red-600">{over} km/h</span></div>
    <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-amber-50 border border-amber-100"><span className="text-sm text-gray-600">Boetebedrag</span><span className="text-sm font-bold tabular-nums text-amber-700">{formatEUR(fine)}</span></div>
    {over>=50&&<p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 text-center">Boven {motorway?60:50} km/h kan het CJIB een strafbeschikking of dagvaarding sturen.</p>}
    </>}
  </div>
  <ShareToolbar calculatorType="snelheidsboete-calculator" calculatorName="Snelheidsboete Calculator" categoryName="Algemeen" inputs={[{label:"Snelheid",value:`${speed} km/h`},{label:"Limiet",value:`${limit} km/h`}]} results={[{label:"Boete",value:formatEUR(fine),type:"warning"}]} />
  <p className="text-xs text-gray-400 text-center">Boetebedragen zijn indicatief op basis van het OM-tarief 2026.</p></div>);
}
