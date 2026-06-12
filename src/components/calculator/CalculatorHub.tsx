"use client";

import { useState } from"react";
import { usePathname } from"next/navigation";
import { ShareToolbar } from"@/components/share/ShareToolbar";
import { calculatorConfigs as CALCULATORS, type CalcField, type CalcOutput, type CalcConfig } from"./calculator-configs";

function formatEur(v: number): string {
 return new Intl.NumberFormat("nl-NL", { style:"currency", currency:"EUR" }).format(v);
}
function formatNum(v: number): string {
 return new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 2, useGrouping: true }).format(v);
}
function formatPct(v: number): string {
 return formatNum(v) +"%";
}

function renderValue(val: number | string, out: CalcOutput): string {
 if (typeof val ==="string") return val;
 if (out.format ==="eur") return formatEur(val);
 if (out.format ==="pct") return formatPct(val);
 return formatNum(val);
}

export default function CalculatorHub() {
 const pathname = usePathname();
 const slug = pathname.split("/").pop() ||"";
 const config: CalcConfig | undefined = (CALCULATORS as Record<string, CalcConfig>)[slug];

 if (!config) {
 return (
 <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-400">
 Calculator niet gevonden.
 </div>
 );
 }

 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [values, setValues] = useState<Record<string, number | string>>(() => {
 const init: Record<string, number | string> = {};
 config.fields.forEach((f) => { init[f.key] = f.default; });
 return init;
 });

 const result = config.calc(values);
 const Icon = config.icon;

 // Smart field width: date/select fields and single-field calculators span full width
 const fieldWidthClass = (f: CalcField, idx: number, total: number): string => {
 if (f.type ==="date") return"col-span-2";
 if (total === 1) return"col-span-2";
 // Odd last field in 2-column grid: span full width for better visual balance
 if (idx === total - 1 && total % 2 === 1 && f.type !=="select") return"";
 return"";
 };

 return (
 <div className="space-y-6">
 {/* ── Input ── */}
 <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
 <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
 <Icon className="h-4 w-4 text-blue-500" />
 {config.title}
 </h2>
 <p className="text-xs text-gray-500 -mt-2">{config.description}</p>
 <div className="grid grid-cols-2 gap-3">
 {config.fields.map((f, idx) => {
 const spanClass = fieldWidthClass(f, idx, config.fields.length);
 return (
 <div key={f.key} className={`space-y-1 ${spanClass}`}>
 <label className="text-xs font-medium text-gray-500">{f.label}</label>
 {f.type ==="select" ? (
 <select value={String(values[f.key] ?? f.default)} onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))} className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 tabular-nums placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
 {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
 </select>
 ) : f.type ==="date" ? (
 <input type="date" value={String(values[f.key] ?? f.default)} onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))} className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 tabular-nums placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
 ) : (
 <input type="text" value={Number(values[f.key] ?? f.default)} onChange={(e) => setValues((p) => ({ ...p, [f.key]: parseFloat(e.target.value) || 0 }))} min={f.min} max={f.max} step={f.step ?? 1} className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 tabular-nums placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
 )}
 </div>
 );
 })}
 </div>
 </div>

 {/* ── Outputs ── */}
 <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
 <div className="grid grid-cols-2 gap-3">
 {config.outputs.map((out) => {
 const raw = result[out.key];
 const display = renderValue(raw, out);
 const isPrimary = out.primary;
 return isPrimary ? (
 <div key={out.key} className="col-span-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-white text-center shadow-sm">
 <p className="text-xs text-blue-200">{out.label}</p>
 <p className="text-xl font-bold tabular-nums mt-1">
 {display}
 {out.suffix ? <span className="text-sm font-normal text-blue-200 ml-1">{out.suffix}</span> : null}
 </p>
 </div>
 ) : (
 <div key={out.key} className="rounded-lg bg-gray-50 p-3 text-center border border-gray-100">
 <p className="text-[10px] text-gray-500">{out.label}</p>
 <p className="text-sm font-bold text-gray-700 tabular-nums">
 {display}
 {out.suffix ? <span className="text-[10px] font-normal text-gray-400 ml-1">{out.suffix}</span> : null}
 </p>
 </div>
 );
 })}
 </div>
 </div>

 {/* ── Share ── */}
 <ShareToolbar
 calculatorType={slug}
 calculatorName={config.title}
 categoryName={config.category}
 inputs={config.fields.map((f) => ({ label: f.label, value: String(values[f.key] ??"") }))}
 results={config.outputs.map((o) => ({ label: o.label, value: renderValue(result[o.key] ??"", o), type: o.primary ?"success" as const :"info" as const }))}
 />
 </div>
 );
}
