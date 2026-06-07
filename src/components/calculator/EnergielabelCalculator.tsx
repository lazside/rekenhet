"use client";
import { useState, useMemo } from "react";
import { Home, Leaf } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { formatEUR } from "@/lib/utils";
import {
  CalcCard, CalcSectionTitle, CalcInput, CalcSelect,
  CalcResultRow, CalcHero, CalcDisclaimer, CalcToggle,
} from "@/lib/calculators/ui-primitives";

// ─── Data ────────────────────────────────────────────────────

const LABEL_OPTIONS = [
  "A++++ met garantie", "A++++", "A+++", "A++", "A+", "A",
  "B", "C", "D", "E", "F", "G",
] as const;
type Label = (typeof LABEL_OPTIONS)[number];

const EXTRA: Record<Label, number> = {
  "A++++ met garantie": 50000, "A++++": 45000, "A+++": 40000,
  "A++": 35000, "A+": 30000, "A": 25000, "B": 15000, "C": 10000,
  "D": 5000, "E": 0, "F": 0, "G": 0,
};

const DUURZAAM: Record<Label, number> = {
  "A++++ met garantie": 5000, "A++++": 5000, "A+++": 8000, "A++": 10000,
  "A+": 12000, "A": 15000, "B": 18000, "C": 20000, "D": 20000,
  "E": 20000, "F": 20000, "G": 20000,
};

function compute(bruto: number, partner: number, label: Label, verduurzamen: boolean) {
  const combined = bruto + partner;
  const base = combined * 4.25;
  const extra = EXTRA[label];
  const duurzaam = verduurzamen ? DUURZAAM[label] : 0;
  return { combinedInkomen: combined, baseLeencapaciteit: base, extraLabelBudget: extra, duurzaamheidsBudget: duurzaam, maximaalTeLenen: base + extra + duurzaam };
}

// ─── Component ────────────────────────────────────────────────

export default function EnergielabelCalculator() {
  const [bruto, setBruto] = useState(55000);
  const [partner, setPartner] = useState(0);
  const [label, setLabel] = useState<Label>("D");
  const [verduurzamen, setVerduurzamen] = useState(false);

  const r = useMemo(() => compute(bruto, partner, label, verduurzamen), [bruto, partner, label, verduurzamen]);

  return (
    <div className="space-y-5" role="form" aria-label="Energielabel hypotheek calculator">
      <CalcCard>
        <CalcSectionTitle icon={<Home className="h-4 w-4 text-indigo-600" />} title="Energielabel & Verduurzaming" />
        <div className="grid grid-cols-2 gap-4">
          <CalcInput id="bruto" label="Jouw bruto inkomen (€/jr)" value={bruto} onChange={setBruto} min={0} step={500} prefix="€" />
          <CalcInput id="partner" label="Partnerinkomen (€/jr)" value={partner} onChange={setPartner} min={0} step={500} prefix="€" />
          <CalcSelect
            id="label"
            label="Huidig energielabel"
            value={label}
            onChange={(v) => setLabel(v as Label)}
            options={LABEL_OPTIONS.map((l) => ({ value: l, label: l }))}
          />
          <div className="space-y-1.5 pt-1">
            <CalcToggle id="verduurzamen" label="Extra verduurzamen?" checked={verduurzamen} onChange={setVerduurzamen} />
          </div>
        </div>
      </CalcCard>

      <CalcCard>
        <CalcSectionTitle icon={<Home className="h-4 w-4 text-indigo-600" />} title="Jouw resultaat" />

        <CalcHero label="Maximaal te lenen" value={formatEUR(r.maximaalTeLenen)} gradient="from-indigo-600 to-indigo-800" />

        <CalcResultRow label="Gezamenlijk inkomen" value={formatEUR(r.combinedInkomen)} />
        <CalcResultRow label="Basis leencapaciteit (4,25×)" value={formatEUR(r.baseLeencapaciteit)} />
        {r.extraLabelBudget > 0 && (
          <CalcResultRow
            label={`Extra door energielabel ${label}`}
            value={`+ ${formatEUR(r.extraLabelBudget)}`}
            type="success"
          />
        )}
        {r.duurzaamheidsBudget > 0 && (
          <CalcResultRow label="Verduurzamingsbudget" value={`+ ${formatEUR(r.duurzaamheidsBudget)}`} type="info" />
        )}
      </CalcCard>

      <ShareToolbar
        calculatorType="energielabel-berekenen" calculatorName="Energielabel & Verduurzaming Hypotheek" categoryName="Hypotheek & Wonen"
        inputs={[{ label: "Bruto inkomen", value: formatEUR(bruto) }, { label: "Partnerinkomen", value: formatEUR(partner) }, { label: "Energielabel", value: label }, { label: "Verduurzamen", value: verduurzamen ? "Ja" : "Nee" }]}
        results={[{ label: "Maximaal te lenen", value: formatEUR(r.maximaalTeLenen), type: "success" }, { label: "Duurzaamheidsbudget", value: formatEUR(r.duurzaamheidsBudget), type: "info" }]}
      />

      <CalcDisclaimer>Dit is een indicatie op basis van de actuele Nibud-leennormen. Een hypotheekadviseur berekent de exacte maximale hypotheek.</CalcDisclaimer>
    </div>
  );
}
