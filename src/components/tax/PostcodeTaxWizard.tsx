"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, MapPin, Home, Droplets, Trash2, Euro, Loader2, AlertCircle } from "lucide-react";
import muniData from "@/data/municipalities.json";
import { formatEUR } from "@/lib/utils";

interface MuniEntry {
  postcodes: string[];
  municipality: string;
  province: string;
  ozbPct: number;
  rioolEnkel: number;
  rioolMeer: number;
  afvalEnkel: number;
  afvalMeer: number;
}

interface FallbackEntry {
  municipality: string;
  province: string;
  ozbPct: number;
  rioolEnkel: number;
  rioolMeer: number;
  afvalEnkel: number;
  afvalMeer: number;
}

type MuniLookupResult = MuniEntry | FallbackEntry;

const data = muniData as { municipalities: MuniEntry[]; fallback: FallbackEntry };

function lookupMunicipality(postcode: string): MuniLookupResult {
  const digits = postcode.replace(/[^0-9]/g, "").slice(0, 4);
  const prefix = digits.slice(0, 2);
  const entry = data.municipalities.find((m) => m.postcodes.includes(prefix));
  return entry || data.fallback;
}

interface PostcodeTaxWizardProps {
  /** Optionally pre-fill the postcode input (for /lokaal/[city] pages) */
  initialPostcode?: string;
}

export default function PostcodeTaxWizard({ initialPostcode }: PostcodeTaxWizardProps) {
  const [postcode, setPostcode] = useState(initialPostcode || "");
  const [woz, setWoz] = useState(350000);
  const [huishouden, setHuishouden] = useState<"enkel" | "meer">("meer");

  const lookup = useMemo(() => {
    if (postcode.trim().length < 2) return null;
    return lookupMunicipality(postcode);
  }, [postcode]);

  const taxBreakdown = useMemo(() => {
    if (!lookup) return null;
    const ozb = woz * (lookup.ozbPct / 100);
    const riool = huishouden === "enkel" ? lookup.rioolEnkel : lookup.rioolMeer;
    const afval = huishouden === "enkel" ? lookup.afvalEnkel : lookup.afvalMeer;
    return {
      ozb: Math.round(ozb),
      riool,
      afval,
      totaal: Math.round(ozb + riool + afval),
      ozbPct: lookup.ozbPct,
    };
  }, [lookup, woz, huishouden]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          Gemeentelijke belastingen check
        </h2>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="Vul je postcode in (bijv. 3011)"
              maxLength={7}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-semibold tracking-wider focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              aria-label="Postcode"
            />
          </div>
        </div>

        {lookup && (
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
            <p className="text-sm font-medium text-blue-800">
              {lookup.municipality}
              {lookup.province && <span className="font-normal text-blue-600"> ({lookup.province})</span>}
            </p>
          </div>
        )}
      </div>

      {/* Parameters */}
      {lookup && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setHuishouden("enkel")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${huishouden === "enkel" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              Alleenstaand
            </button>
            <button
              onClick={() => setHuishouden("meer")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${huishouden === "meer" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              Meerpersoons
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">WOZ-waarde (€)</label>
            <input
              type="number"
              value={woz}
              onChange={(e) => setWoz(+e.target.value || 0)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      )}

      {/* Results */}
      {taxBreakdown && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Jaarlijkse lasten {lookup?.municipality}</h3>
          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 p-5 text-white shadow-lg text-center">
            <p className="text-sm text-blue-200">Totaal per jaar</p>
            <p className="text-3xl font-bold tabular-nums mt-1">{formatEUR(taxBreakdown.totaal)}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="rounded-lg bg-blue-50 p-3 text-center border border-blue-100">
              <Home className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <p className="text-[10px] text-blue-600 font-medium uppercase">OZB</p>
              <p className="text-sm font-bold text-blue-700 tabular-nums">{formatEUR(taxBreakdown.ozb)}</p>
              <p className="text-[9px] text-blue-400">({taxBreakdown.ozbPct.toFixed(3)}%)</p>
            </div>
            <div className="rounded-lg bg-cyan-50 p-3 text-center border border-cyan-100">
              <Droplets className="h-4 w-4 text-cyan-500 mx-auto mb-1" />
              <p className="text-[10px] text-cyan-600 font-medium uppercase">Riool</p>
              <p className="text-sm font-bold text-cyan-700 tabular-nums">{formatEUR(taxBreakdown.riool)}</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-3 text-center border border-amber-100">
              <Trash2 className="h-4 w-4 text-amber-500 mx-auto mb-1" />
              <p className="text-[10px] text-amber-600 font-medium uppercase">Afval</p>
              <p className="text-sm font-bold text-amber-700 tabular-nums">{formatEUR(taxBreakdown.afval)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
