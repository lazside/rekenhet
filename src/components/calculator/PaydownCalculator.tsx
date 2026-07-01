"use client";

import { useState, useMemo } from "react";
import { Landmark, Euro, TrendingDown } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { formatEUR } from "@/lib/utils";
import { berekenPaydown } from "@/lib/calculators/subsidie-paydown";

export default function PaydownCalculator() {
  const [h, setH] = useState(300000);
  const [r, setR] = useState(4.5);
  const [l, setL] = useState(30);
  const [e, setE] = useState(20000);
  const [sj, setSj] = useState(5);

  const res = useMemo(() => berekenPaydown({ hoofdsom: h, rentePct: r, looptijdJaren: l, extraStorting: e, stortingMomentJaar: sj }), [h, r, l, e, sj]);
  const maxS = Math.max(...res.jaren.map(j => Math.max(j.restSchuldZonder, j.restSchuldMet)), 1);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Landmark className="h-4 w-4 text-indigo-600" /> Extra Aflossen Hypotheek
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Hypotheek (€)</label><input type="text" value={h} onChange={e => setH(+e.target.value||0)} className="input-base" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Rente (%)</label><input type="text" step="0.1" value={r} onChange={e => setR(+e.target.value||0)} className="input-base" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Looptijd (jr)</label><input type="text" value={l} onChange={e => setL(+e.target.value||0)} className="input-base" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Extra aflossing (€)</label><input type="text" value={e} onChange={e => setE(+e.target.value||0)} className="input-base" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">In jaar</label><input type="text" min={1} max={l} value={sj} onChange={e => setSj(Math.min(l, Math.max(1, +e.target.value||1)))} className="input-base" /></div>
        </div>
      </div>

      {/* Hero results */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-700 p-4 text-white shadow-sm text-center">
          <p className="text-xs text-amber-200">Besparing totaal</p>
          <p className="text-2xl font-bold tabular-nums mt-1">{formatEUR(res.totaleBesparing)}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 text-white shadow-sm text-center">
          <p className="text-xs text-emerald-200">Jaren eerder klaar</p>
          <p className="text-2xl font-bold tabular-nums mt-1">{res.jarenEerderKlaar} jaar</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="h-4 w-4 text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-900">Restschuld vergelijking</h3>
        </div>
        <div className="relative h-40 w-full">
          {(() => {
            const max = Math.min(20, res.jaren.length);
            const bars = [];
            for (let i = 0; i < max; i++) {
              const y = res.jaren[i];
              if (!y) continue;
              const hZ = ((y.restSchuldZonder || 0) / maxS) * 100;
              const hM = ((y.restSchuldMet || 0) / maxS) * 100;
              const left = max > 1 ? (i / (max - 1)) * 100 : 0;
              const width = Math.max(4, 100 / max - 0.5);
              bars.push(
                <div key={i} className="absolute bottom-0" style={{ left: `${left}%`, width: `${width}%` }}>
                  <div className="w-full rounded-t bg-blue-300" style={{ height: `${hZ}%` }} title={`Jaar ${y.jaar}: €${y.restSchuldZonder}`} />
                  <div className="w-3/4 mx-auto rounded-t bg-emerald-500 mt-0.5" style={{ height: `${hM}%` }} title={`Jaar ${y.jaar} (versneld): €${y.restSchuldMet}`} />
                </div>
              );
            }
            return bars;
          })()}
        </div>
        <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded bg-blue-300" /> Huidig</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded bg-emerald-500" /> Versneld</span>
        </div>
      </div>

      <ShareToolbar
        calculatorType="extra-aflossen"
        calculatorName="Extra Aflossen Hypotheek"
        categoryName="Geld & Verzekeringen"
        inputs={[{ label: "Hypotheek", value: formatEUR(h) }, { label: "Aflossing", value: formatEUR(e) }]}
        results={[{ label: "Besparing", value: formatEUR(res.totaleBesparing), type: "success" }]}
      />
      <p className="text-xs text-gray-400 text-center">Op basis van annuïtair aflossen. Jaarlijks mag je boetevrij extra aflossen.</p>
    </div>
  );
}
