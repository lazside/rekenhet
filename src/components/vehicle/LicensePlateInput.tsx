"use client";

import { useState, useCallback, useMemo } from "react";
import { Search, Car, Weight, Fuel, Leaf, Calendar, Euro, Coins, Loader2, AlertCircle, ArrowRight, Share2, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleResult {
  kenteken: string; merk: string; model: string; gewicht: number;
  catalogusprijs: number; brandstof: string; co2: number;
  eersteToelating: string; zuinigheidslabel?: string;
  apkVervaldatum?: string | null;
  isEv: boolean; isPhev: boolean; isOldtimer: boolean;
  vehicleAge?: number; voertuigcategorie?: string;
}

interface MrbResult { bedrag: number; label: string; details: string; }
interface BijtellingResult { bijtellingPerMaand: number; bijtellingPerJaar: number; percentage: number; }

const provLabels: Record<string, string> = {
  "zuid-holland":"Zuid-Holland","noord-holland":"Noord-Holland","noord-brabant":"Noord-Brabant",
  utrecht:"Utrecht",gelderland:"Gelderland",limburg:"Limburg",overijssel:"Overijssel",
  flevoland:"Flevoland",groningen:"Groningen",drenthe:"Drenthe",friesland:"Friesland",zeeland:"Zeeland",
};

const MILIEUZONES: { stad: string; euroNorm: number; dieselVerboden: boolean; url: string }[] = [
  { stad:"Amsterdam", euroNorm:5, dieselVerboden:true, url:"https://www.amsterdam.nl/milieuzone" },
  { stad:"Utrecht", euroNorm:5, dieselVerboden:true, url:"https://www.utrecht.nl/milieuzone" },
  { stad:"Den Haag", euroNorm:4, dieselVerboden:true, url:"https://www.denhaag.nl/milieuzone" },
  { stad:"Rotterdam", euroNorm:4, dieselVerboden:true, url:"https://www.rotterdam.nl/milieuzone" },
  { stad:"Arnhem", euroNorm:4, dieselVerboden:true, url:"https://www.arnhem.nl/milieuzone" },
  { stad:"Eindhoven", euroNorm:4, dieselVerboden:true, url:"https://www.eindhoven.nl/milieuzone" },
  { stad:"Maastricht", euroNorm:4, dieselVerboden:true, url:"https://www.maastricht.nl/milieuzone" },
];

const GEMIDDELD_CO2 = 120; // g/km, gemiddelde Nederlandse auto 2025
const GEMIDDELD_VERBRUIK_BENZINE = 1 / 15; // 1 liter per 15 km
const GEMIDDELD_VERBRUIK_DIESEL = 1 / 18;

function apkStatus(datum?: string | null): { label: string; color: string; daysLeft: number } {
  if (!datum) return { label: "Onbekend", color: "text-gray-400", daysLeft: 999 };
  const apkDate = new Date(datum);
  const days = Math.round((apkDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (days < 0) return { label: "Verlopen", color: "text-red-600", daysLeft: days };
  if (days < 60) return { label: "Verloopt binnen {days} dagen", color: "text-orange-500", daysLeft: days };
  return { label: `Geldig tot ${apkDate.toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})}`, color: "text-green-600", daysLeft: days };
}

function milieuzoneToegang(brandstof: string, co2: number, isEv: boolean): { magRijden: boolean; steden: string[]; beperkt: string[] } {
  if (isEv) return { magRijden: true, steden: MILIEUZONES.map(m=>m.stad), beperkt: [] };
  if (brandstof.toLowerCase().includes("diesel")) {
    return { magRijden: false, steden: [], beperkt: MILIEUZONES.filter(m=>m.dieselVerboden).map(m=>m.stad) };
  }
  // Benzine: oudere benzineauto's (>15jr) beperkt in Amsterdam
  return { magRijden: true, steden: MILIEUZONES.filter(m=>m.stad!=="Amsterdam"||co2<200).map(m=>m.stad), beperkt: [] };
}

export default function LicensePlateInput() {
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{data:VehicleResult;mrb:MrbResult[];bijtelling:BijtellingResult|null}|null>(null);
  const [selProv, setSelProv] = useState("zuid-holland");
  const [kmJaar, setKmJaar] = useState(15000);
  const [brandstofPrijs, setBrandstofPrijs] = useState(2.10);
  const [copied, setCopied] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!plate.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(`/api/vehicle/${encodeURIComponent(plate.trim())}`);
      const json = await res.json();
      if (!res.ok) { setError(json.error||"Fout bij ophalen"); return; }
      setResult(json);
    } catch { setError("Netwerkfout"); }
    finally { setLoading(false); }
  }, [plate]);

  const curMrb = result?.mrb.find(m=>m.label.includes(provLabels[selProv]||selProv));
  const topProvinces = useMemo(() => {
    if (!result?.mrb) return [];
    return [...result.mrb].sort((a,b)=>a.bedrag-b.bedrag).slice(0,3);
  }, [result]);

  const brandstofKostenPerJaar = useMemo(() => {
    if (!result?.data) return 0;
    const verbruik = result.data.brandstof.toLowerCase().includes("diesel") ? GEMIDDELD_VERBRUIK_DIESEL : GEMIDDELD_VERBRUIK_BENZINE;
    if (result.data.isEv) return 0;
    return Math.round(kmJaar * verbruik * brandstofPrijs);
  }, [result, kmJaar, brandstofPrijs]);

  const mrbPerJaar = curMrb ? curMrb.bedrag * 4 : 0;
  const verzekeringSchatting = result?.data.catalogusprijs ? Math.round(result.data.catalogusprijs * 0.03) : 600;
  const totaalPerJaar = brandstofKostenPerJaar + mrbPerJaar + verzekeringSchatting;

  const mz = result?.data ? milieuzoneToegang(result.data.brandstof, result.data.co2, result.data.isEv) : null;
  const apk = result?.data ? apkStatus(result.data.apkVervaldatum) : null;

  const handleShare = useCallback(() => {
    if (!result) return;
    const url = `${window.location.origin}/kenteken-check?k=${result.data.kenteken}`;
    navigator.clipboard.writeText(url).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});
  }, [result]);

  return (<div className="space-y-6">
    {/* Input */}
    <div className="rounded-xl border-2 border-gray-300 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3"><Car className="h-5 w-5 text-blue-600"/><h2 className="text-sm font-semibold text-gray-900">Kenteken check</h2></div>
      <div className="flex gap-3"><div className="relative flex-1"><div className="flex h-14 overflow-hidden rounded-lg border-2 border-gray-800 shadow-sm"><div className="flex w-10 items-center justify-center bg-[#003d7a] text-[9px] font-bold text-white tracking-wider shrink-0">NL</div><input type="text" value={plate} onChange={e=>setPlate(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&handleSearch()} placeholder="XX-XX-XX" className="flex-1 border-0 px-3 text-xl font-bold tracking-[0.25em] text-gray-900 bg-[#fce83a] outline-none uppercase" aria-label="Kenteken" maxLength={10}/></div></div>
      <button onClick={handleSearch} disabled={loading||!plate.trim()} className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-all">{loading?<Loader2 className="h-4 w-4 animate-spin"/>:<Search className="h-4 w-4"/>}Check</button></div>
      {error&&<p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 flex items-center gap-2"><AlertCircle className="h-4 w-4"/>{error}</p>}
    </div>

    {loading&&<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 animate-pulse"><div className="h-5 w-48 rounded bg-gray-200"/><div className="h-4 w-full rounded bg-gray-100"/><div className="h-4 w-2/3 rounded bg-gray-100"/></div>}

    {result&&(<>
      {/* Vehicle summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100"><Car className="h-7 w-7 text-blue-600"/></div>
          <div className="flex-1"><h3 className="font-semibold text-gray-900 text-lg">{result.data.merk} {result.data.model}</h3>
            <p className="text-sm text-gray-500">{result.data.kenteken} · {result.data.brandstof}{result.data.isEv&&" · 🔋EV"}{result.data.isPhev&&" · ⚡PHEV"}{result.data.vehicleAge&&` · ${result.data.vehicleAge} jaar`}</p>
            {result.data.voertuigcategorie&&<p className="text-xs text-gray-400 mt-0.5">{result.data.voertuigcategorie}</p>}</div>
          <button onClick={handleShare} className={cn("flex h-8 w-8 items-center justify-center rounded-lg transition-all",copied?"bg-emerald-100 text-emerald-600":"bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-600")}aria-label="Delen">{copied?<Check className="h-4 w-4"/>:<Share2 className="h-4 w-4"/>}</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <SpecBadge icon={Weight} label="Gewicht" value={`${result.data.gewicht} kg`}/>
          <SpecBadge icon={Fuel} label="CO₂" value={`${result.data.co2} g/km`}/>
          {result.data.catalogusprijs>0&&<SpecBadge icon={Euro} label="Catalogusprijs" value={`€${(result.data.catalogusprijs/1000).toFixed(0)}k`}/>}
          <SpecBadge icon={Leaf} label="Brandstof" value={result.data.brandstof}/>
          <SpecBadge icon={Calendar} label="Eerste toelating" value={result.data.eersteToelating||"Onbekend"}/>
          {result.data.vehicleAge&&<SpecBadge icon={Calendar} label="Leeftijd" value={`${result.data.vehicleAge} jaar`}/>}
          {result.data.zuinigheidslabel&&<SpecBadge icon={Leaf} label="Zuinigheidslabel" value={`Label ${result.data.zuinigheidslabel}`}/>}
          {apk&&<SpecBadge icon={Calendar} label="APK" value={apk.label} valueClass={apk.color}/>}
        </div>
      </div>

      {/* Jaarlijkse kosten */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Euro className="h-4 w-4 text-blue-600"/>Jaarlijkse kosten</h3>
        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-5 text-white shadow-lg text-center mb-4"><p className="text-sm text-blue-200">Totale geschatte jaarkosten</p><p className="text-3xl font-bold tabular-nums mt-1">€{totaalPerJaar.toLocaleString("nl-NL")}</p><p className="text-xs text-blue-300 mt-1">€{Math.round(totaalPerJaar/12).toLocaleString("nl-NL")}/mnd</p></div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-amber-50 p-3 text-center border border-amber-100"><p className="text-[10px] text-amber-600">MRB/jaar</p><p className="text-sm font-bold text-amber-700 tabular-nums">€{mrbPerJaar.toLocaleString("nl-NL")}</p></div>
          <div className="rounded-lg bg-blue-50 p-3 text-center border border-blue-100"><p className="text-[10px] text-blue-600">Brandstof/jaar</p><p className="text-sm font-bold text-blue-700 tabular-nums">{result.data.isEv?"€0 (EV)":`€${brandstofKostenPerJaar.toLocaleString("nl-NL")}`}</p></div>
          <div className="rounded-lg bg-purple-50 p-3 text-center border border-purple-100"><p className="text-[10px] text-purple-600">Verzekering (geschat)</p><p className="text-sm font-bold text-purple-700 tabular-nums">€{verzekeringSchatting.toLocaleString("nl-NL")}</p></div>
        </div>
        {/* Brandstofkosten instellingen */}
        {!result.data.isEv&&<div className="grid grid-cols-2 gap-3 mt-3">{[
          {l:"km/jaar",v:kmJaar,s:setKmJaar,max:100000,step:1000},
          {l:`Brandstofprijs (€/l)`,v:brandstofPrijs,s:setBrandstofPrijs,max:3,step:0.05}
        ].map(inp=>(<div key={inp.l} className="space-y-1"><label className="text-xs text-gray-500">{inp.l}: {typeof inp.v==="number"&&inp.step<1?`€${inp.v.toFixed(2)}`:inp.v.toLocaleString("nl-NL")}</label><input type="range" min={0} max={inp.max} step={inp.step} value={inp.v} onChange={e=>inp.s(+e.target.value)} className="w-full accent-blue-600"/></div>))}</div>}
      </div>

      {/* Brandstofkosten en CO2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* MRB */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Coins className="h-4 w-4 text-blue-600"/>Wegenbelasting</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">{Object.entries(provLabels).slice(0,6).map(([k,v])=>(<button key={k} onClick={()=>setSelProv(k)} className={cn("rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all",selProv===k?"bg-blue-600 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200")}>{v}</button>))}</div>
          {curMrb&&<div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-amber-50 border border-amber-100"><span className="text-sm text-gray-600">Per kwartaal</span><span className="text-lg font-bold text-amber-700 tabular-nums">€{curMrb.bedrag.toFixed(2)}</span></div>}
          <div className="flex items-center justify-between px-5 py-2 text-xs text-gray-400"><span>Per maand</span><span className="font-medium">€{Math.round((curMrb?.bedrag||0)/3)}</span></div>
          {result.data.isEv&&<p className="text-xs text-green-600 mt-2">🔋 75% gewichtskorting (2026)</p>}
          {result.data.isOldtimer&&<p className="text-xs text-amber-600 mt-2">🚗 Kwarttarief mogelijk</p>}
          {/* Top 3 goedkoopste */}
          {topProvinces.length>0&&<div className="mt-3 pt-3 border-t border-gray-100"><p className="text-[10px] text-gray-500 mb-1">Goedkoopste provincies:</p>{topProvinces.map((p,i)=>(<div key={p.label} className="flex items-center justify-between text-[11px]"><span>{i===0?"🥇":i===1?"🥈":"🥉"} {p.label.replace("MRB ","")}</span><span className="font-medium">€{p.bedrag.toFixed(2)}/kwartaal</span></div>))}</div>}
        </div>

        {/* Milieuzones + CO2 */}
        <div className="space-y-4">
          {mz&&<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Leaf className="h-4 w-4 text-green-600"/>Milieuzones</h3>{mz.magRijden?<div><p className="text-sm text-green-700 font-medium mb-2">✅ Deze auto mag in alle Nederlandse milieuzones rijden.</p><div className="flex flex-wrap gap-1">{mz.steden.map(s=><span key={s} className="rounded-full bg-green-50 border border-green-100 px-2 py-0.5 text-[10px] text-green-700">{s}</span>)}</div></div>:<div><p className="text-sm text-orange-700 font-medium mb-2">⚠️ Deze auto heeft beperkte toegang tot milieuzones.</p><div className="flex flex-wrap gap-1">{mz.beperkt.map(s=><span key={s} className="rounded-full bg-orange-50 border border-orange-100 px-2 py-0.5 text-[10px] text-orange-700">❌ {s}</span>)}</div></div>}</div>}

          {/* CO2 vergelijking */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Fuel className="h-4 w-4 text-blue-600"/>CO₂-uitstoot</h3>
            <div className="flex items-center gap-4"><div className="flex-1"><div className="flex justify-between text-xs text-gray-500 mb-1"><span>Jouw auto</span><span>{result.data.co2} g/km</span></div><div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" style={{width:`${Math.min(100,result.data.co2/2.5)}%`}}/></div></div></div>
            <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3"><Info className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5"/><p className="text-[11px] text-gray-500">{result.data.co2<GEMIDDELD_CO2?`${Math.round((1-result.data.co2/GEMIDDELD_CO2)*100)}% lager dan gemiddeld (${GEMIDDELD_CO2} g/km)`:`${Math.round((result.data.co2/GEMIDDELD_CO2-1)*100)}% hoger dan gemiddeld (${GEMIDDELD_CO2} g/km)`}</p></div>
          </div>
        </div>
      </div>

      {/* Bijtelling */}
      {result.bijtelling&&<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Euro className="h-4 w-4 text-blue-600"/>Bijtelling (zakelijk)</h3><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-white text-center"><p className="text-xs text-blue-200">Per maand</p><p className="text-2xl font-bold tabular-nums mt-1">€{result.bijtelling.bijtellingPerMaand}</p></div><div className="rounded-xl bg-gray-50 p-4 text-center"><p className="text-xs text-gray-500">Percentage</p><p className="text-2xl font-bold text-gray-900 tabular-nums mt-1">{result.bijtelling.percentage}%</p></div></div></div>}

      {/* Affiliate CTA */}
      <a href="/go/verzekering-vergelijken" target="_blank" rel="noopener noreferrer sponsored" className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white shadow-lg hover:shadow-xl transition-all group"><div><p className="font-semibold">Besparen op de autoverzekering?</p><p className="text-sm text-blue-200 mt-0.5">Vergelijk direct de premies voor deze {result.data.merk}.</p></div><ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"/></a>
    </>)}
  </div>);
}

function SpecBadge({icon:Icon,label,value,valueClass}:{icon:typeof Car;label:string;value:string;valueClass?:string}) {
  return (<div className="rounded-lg bg-gray-50 p-3 border border-gray-100"><Icon className="h-4 w-4 text-gray-400 mb-1"/><p className="text-[10px] text-gray-500">{label}</p><p className={`text-sm font-semibold text-gray-900 tabular-nums ${valueClass||""}`}>{value}</p></div>);
}
