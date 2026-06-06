"use client";

import { useState, useCallback } from "react";
import { Search, Car, Weight, Fuel, Leaf, Calendar, Euro, Coins, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleResult {
  kenteken: string;
  merk: string;
  model: string;
  gewicht: number;
  catalogusprijs: number;
  brandstof: string;
  co2: number;
  eersteToelating: string;
  zuinigheidslabel?: string;
  apkVervaldatum?: string | null;
  isEv: boolean;
  isPhev: boolean;
  isOldtimer: boolean;
  vehicleAge?: number;
}

interface MrbResult {
  bedrag: number;
  label: string;
  details: string;
}

interface BijtellingResult {
  bijtellingPerMaand: number;
  bijtellingPerJaar: number;
  percentage: number;
}

// ─── Helpers ──────────────────────────────────────────────────

const provLabels: Record<string, string> = {
  "zuid-holland": "Zuid-Holland",
  "noord-holland": "Noord-Holland",
  "noord-brabant": "Noord-Brabant",
  utrecht: "Utrecht",
  gelderland: "Gelderland",
  limburg: "Limburg",
  overijssel: "Overijssel",
  flevoland: "Flevoland",
  groningen: "Groningen",
  drenthe: "Drenthe",
  friesland: "Friesland",
  zeeland: "Zeeland",
};

export default function LicensePlateInput() {
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ data: VehicleResult; mrb: MrbResult[]; bijtelling: BijtellingResult | null } | null>(null);
  const [selectedProvince, setSelectedProvince] = useState("zuid-holland");

  const handleSearch = useCallback(async () => {
    if (!plate.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/vehicle/${encodeURIComponent(plate.trim())}`);
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Fout bij ophalen"); return; }
      setResult(json);
    } catch {
      setError("Netwerkfout");
    } finally { setLoading(false); }
  }, [plate]);

  const currentMrb = result?.mrb.find((m) => m.label.includes(selectedProvince === "zuid-holland" ? "Zuid-Holland" :
    selectedProvince === "noord-holland" ? "Noord-Holland" :
    selectedProvince === "noord-brabant" ? "Noord-Brabant" :
    provLabels[selectedProvince] || selectedProvince));

  return (
    <div className="space-y-6">
      {/* License plate input */}
      <div className="rounded-xl border-2 border-gray-300 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Car className="h-5 w-5 text-blue-600" />
          <h2 className="text-sm font-semibold text-gray-900">Kenteken check</h2>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            {/* Dutch plate visual */}
            <div className="flex h-14 overflow-hidden rounded-lg border-2 border-gray-800 shadow-sm">
              <div className="flex w-10 items-center justify-center bg-[#003d7a] text-[9px] font-bold text-white tracking-wider shrink-0">
                NL
              </div>
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="XX-XX-XX"
                className="flex-1 border-0 px-3 text-xl font-bold tracking-[0.25em] text-gray-900 bg-[#fce83a] outline-none uppercase"
                aria-label="Kenteken"
                maxLength={10}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !plate.trim()}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Check
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 flex items-center gap-2"><AlertCircle className="h-4 w-4" />{error}</p>}
      </div>

      {/* Results */}
      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 animate-pulse">
          <div className="h-5 w-48 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-2/3 rounded bg-gray-100" />
        </div>
      )}

      {result && (
        <>
          {/* Summary card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {result.data.merk} {result.data.model}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {result.data.kenteken} &middot; {result.data.brandstof}
                  {result.data.isEv && " · 🟢 Elektrisch"}
                  {result.data.isPhev && " · Plug-in Hybride"}
                  {result.data.vehicleAge && ` · ${result.data.vehicleAge} jaar`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <SpecBadge icon={Weight} label="Gewicht" value={`${result.data.gewicht} kg`} />
              <SpecBadge icon={Fuel} label="CO₂" value={`${result.data.co2} g/km`} />
              {result.data.catalogusprijs > 0 && (
                <SpecBadge icon={Euro} label="Catalogusprijs" value={`€${(result.data.catalogusprijs / 1000).toFixed(0)}k`} />
              )}
              <SpecBadge icon={Leaf} label="Brandstof" value={result.data.brandstof} />
              <SpecBadge icon={Calendar} label="Eerste toelating" value={result.data.eersteToelating || "Onbekend"} />
              {result.data.vehicleAge && (
                <SpecBadge icon={Calendar} label="Leeftijd" value={`${result.data.vehicleAge} jaar`} />
              )}
              {result.data.zuinigheidslabel && (
                <SpecBadge icon={Leaf} label="Zuinigheidslabel" value={`Label ${result.data.zuinigheidslabel}`} />
              )}
              {result.data.apkVervaldatum && (
                <SpecBadge icon={Calendar} label="APK vervaldatum" value={new Date(result.data.apkVervaldatum).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })} />
              )}
            </div>
          </div>

          {/* MRB Calculator */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Coins className="h-4 w-4 text-blue-600" />
              Motorrijtuigenbelasting (MRB / Wegenbelasting)
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {["zuid-holland", "noord-holland", "noord-brabant", "utrecht", "gelderland", "limburg"].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedProvince(p)}
                  className={cn("rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all", selectedProvince === p ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}
                >
                  {provLabels[p]}
                </button>
              ))}
            </div>

            {currentMrb && (
              <div className="flex items-center justify-between rounded-xl px-5 py-3.5 bg-amber-50 border border-amber-100">
                <span className="text-sm text-gray-600">Per kwartaal</span>
                <span className="text-lg font-bold text-amber-700 tabular-nums">€{currentMrb.bedrag.toFixed(2)}</span>
              </div>
            )}

            {result.data.isOldtimer && (
              <p className="text-xs text-amber-600 mt-2">🚗 Oldtimer (≥35 jaar) — mogelijk kwarttarief van toepassing.</p>
            )}
            {result.data.isEv && (
              <p className="text-xs text-green-600 mt-2">🔋 Elektrisch — 75% gewichtskorting in 2026.</p>
            )}
          </div>

          {/* Bijtelling (if company car) */}
          {result.bijtelling && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Euro className="h-4 w-4 text-blue-600" />
                Bijtelling (zakelijk)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-white text-center">
                  <p className="text-xs text-blue-200">Per maand</p>
                  <p className="text-2xl font-bold tabular-nums mt-1">€{result.bijtelling.bijtellingPerMaand}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500">Bijtellingspercentage</p>
                  <p className="text-2xl font-bold text-gray-900 tabular-nums mt-1">{result.bijtelling.percentage}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Affiliate CTA */}
          <a
            href="/go/verzekering-vergelijken"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white shadow-lg hover:shadow-xl transition-all group"
          >
            <div>
              <p className="font-semibold">Besparen op de autoverzekering?</p>
              <p className="text-sm text-blue-200 mt-0.5">Vergelijk direct de premies voor deze {result.data.merk}.</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
        </>
      )}
    </div>
  );
}
function SpecBadge({ icon: Icon, label, value }: { icon: typeof Car; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <Icon className="h-4 w-4 text-gray-400 mb-1" />
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900 tabular-nums">{value}</p>
    </div>
  );
}
