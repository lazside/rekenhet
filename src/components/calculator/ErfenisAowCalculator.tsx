"use client";

import { useState, useMemo } from "react";
import { Gift, Clock, Euro, Lightbulb, AlertCircle } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { formatEUR } from "@/lib/utils";
import { berekenSchenking, berekenAow, type Tariefgroep } from "@/lib/calculators/erfenis-aow";

const TARIEF_LABELS: Record<Tariefgroep, string> = {
  partner: "Partner / Kind",
  kind: "Kind",
  kleinkind: "Kleinkind",
  overig: "Overig (broer/zus/derden)",
};

const GROEP_KLEUREN: Record<Tariefgroep, string> = {
  partner: "bg-blue-50 border-blue-100",
  kind: "bg-emerald-50 border-emerald-100",
  kleinkind: "bg-amber-50 border-amber-100",
  overig: "bg-red-50 border-red-100",
};

export default function ErfenisAowCalculator() {
  const [tab, setTab] = useState<"schenking" | "aow">("schenking");
  const [bedrag, setBedrag] = useState(50000);
  const [groep, setGroep] = useState<Tariefgroep>("kind");
  const [erfenis, setErfenis] = useState(false);
  const [geboorteDatum, setGeboorteDatum] = useState("1990-01-01");

  const schenkRes = useMemo(() => berekenSchenking({ bedrag, tariefgroep: groep, isErfenis: erfenis, jaar: 2026 }), [bedrag, groep, erfenis]);
  const aowRes = useMemo(() => berekenAow({ geboortedatum: geboorteDatum }), [geboorteDatum]);

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex gap-2">
        <button onClick={() => setTab("schenking")} className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${tab==="schenking"?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}><Gift className="h-4 w-4 inline mr-1"/>Schenking/Erfenis</button>
        <button onClick={() => setTab("aow")} className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${tab==="aow"?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}><Clock className="h-4 w-4 inline mr-1"/>AOW-leeftijd</button>
      </div>

      {/* Schenking tab */}
      {tab === "schenking" && (
        <>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Gift className="h-4 w-4 text-blue-600" />Schenk-/Erfbelasting</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Bedrag (€)</label><input type="number" value={bedrag} onChange={e=>setBedrag(+e.target.value||0)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
              <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Relatie</label><select value={groep} onChange={e=>setGroep(e.target.value as Tariefgroep)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{(Object.entries(TARIEF_LABELS) as [Tariefgroep, string][]).map(([k,v])=> <option key={k} value={k}>{v}</option>)}</select></div>
            </div>
            <div className="flex gap-2"><button onClick={()=>setErfenis(false)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${!erfenis?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Schenking</button><button onClick={()=>setErfenis(true)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${erfenis?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600"}`}>Erfenis</button></div>
          </div>

          <div className={`rounded-xl border p-5 shadow-sm space-y-3 ${GROEP_KLEUREN[groep]}`}>
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 p-5 text-white shadow-lg text-center">
              <p className="text-sm text-blue-200">Te betalen belasting</p>
              <p className="text-3xl font-bold tabular-nums mt-1">{formatEUR(schenkRes.belasting)}</p>
              <p className="text-xs text-blue-300 mt-1">Effectief tarief: {schenkRes.effectiefTarief}%</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/80 p-3 text-center border"><p className="text-[10px] text-gray-500">Vrijstelling</p><p className="text-sm font-bold tabular-nums">{formatEUR(schenkRes.vrijstelling)}</p></div>
              <div className="rounded-lg bg-white/80 p-3 text-center border"><p className="text-[10px] text-gray-500">Belastbaar</p><p className="text-sm font-bold tabular-nums">{formatEUR(schenkRes.belastbaar)}</p></div>
            </div>
            {schenkRes.tips.length > 0 && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-3">
                <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">{schenkRes.tips[0]}</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* AOW tab */}
      {tab === "aow" && (
        <>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Clock className="h-4 w-4 text-blue-600" />AOW-leeftijd</h2>
            <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Geboortedatum</label><input type="date" value={geboorteDatum} onChange={e=>setGeboorteDatum(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"/></div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
            <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-5 text-white shadow-lg text-center">
              <p className="text-sm text-emerald-200">AOW-leeftijd</p>
              <p className="text-3xl font-bold mt-1">{aowRes.aowLeeftijd}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 p-3 text-center border"><p className="text-[10px] text-gray-500">Ingangsdatum AOW</p><p className="text-sm font-bold tabular-nums">{aowRes.aowDatum}</p></div>
              <div className="rounded-lg bg-emerald-50 p-3 text-center border border-emerald-100"><p className="text-[10px] text-emerald-600">Nog te gaan</p><p className="text-sm font-bold text-emerald-700 tabular-nums">{aowRes.jarenTotAow} jaar</p></div>
            </div>
            <p className="text-xs text-gray-500">{aowRes.opmerking}</p>
          </div>
        </>
      )}

      {/* Legal disclaimer */}
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-3">
        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-700 leading-relaxed">
          Dit is een indicatie. Schenk- en erfbelasting hangt af van specifieke omstandigheden, 
          eerdere schenkingen en eventuele toeslagen. De AOW-leeftijd kan wijzigen door nieuwe wetgeving. 
          Raadpleeg een notaris, belastingadviseur of de SVB voor een definitief advies.
        </p>
      </div>

      <ShareToolbar calculatorType="erfenis-schenking-aow" calculatorName="Schenking/Erfenis & AOW" categoryName="Geld & Verzekeringen" 
        inputs={[{label: tab==="schenking"?"Bedrag":"Geb.datum", value: tab==="schenking"?formatEUR(bedrag):geboorteDatum}]} 
        results={[{label: tab==="schenking"?"Belasting":`AOW op ${aowRes.aowLeeftijd}`, value: tab==="schenking"?formatEUR(schenkRes.belasting):aowRes.aowDatum, type:"success"}]} />
    </div>
  );
}
