"use client";
import { useState, useMemo } from "react";
import { Calculator } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import {
  CalcCard, CalcSectionTitle, CalcInput, CalcSelect, CalcToggle,
  CalcRange, CalcResultRow, CalcHero, CalcDisclaimer,
} from "@/lib/calculators/ui-primitives";
// TODO: import { berekenMijnCalculator } from "./compute";

/**
 * TODO: Calculator component.
 *
 * GEBRUIK ALTIJD de primitives uit @/lib/calculators/ui-primitives:
 *   CalcCard, CalcSectionTitle, CalcInput, CalcSelect, CalcToggle,
 *   CalcRange, CalcResultRow, CalcHero, CalcDisclaimer
 *
 * NOOIT hand-rolled className voor standaard kaarten/rijs/inputs.
 */
export default function MijnCalculator() {
  // ── State ──────────────────────────────────────────────────
  const [voorbeeld, setVoorbeeld] = useState(1000);
  // TODO: voeg meer state toe

  // ── Berekening ────────────────────────────────────────────
  const result = useMemo(() => {
    // TODO: return berekenMijnCalculator({ voorbeeld });
    return { uitkomst: voorbeeld * 1.21 };
  }, [voorbeeld]);

  return (
    <div className="space-y-5" role="form" aria-label="TODO: aria label">

      {/* ═══════ INPUT SECTIE ═══════ */}
      <CalcCard>
        <CalcSectionTitle icon={<Calculator className="h-4 w-4 text-blue-600" />} title="Jouw gegevens" />

        <CalcInput
          id="voorbeeld-input"
          label="Voorbeeldbedrag"
          value={voorbeeld}
          onChange={setVoorbeeld}
          min={0} step={100}
          prefix="€"
        />

        <CalcSelect
          id="voorbeeld-select"
          label="Kies een optie"
          value="optie1"
          onChange={() => {}}
          options={[
            { value: "optie1", label: "Optie 1" },
            { value: "optie2", label: "Optie 2" },
          ]}
        />

        <CalcToggle
          id="voorbeeld-toggle"
          label="Schakeloptie"
          checked={true}
          onChange={() => {}}
          tooltip="TODO: uitleg over deze optie."
        />

        <CalcRange
          id="voorbeeld-range"
          label="Schuifregelaar"
          value={voorbeeld}
          onChange={setVoorbeeld}
          min={0} max={10000}
          formatValue={(v) => formatEUR(v)}
        />
      </CalcCard>

      {/* ═══════ RESULTATEN SECTIE ═══════ */}
      <CalcCard>
        <CalcSectionTitle icon={<Calculator className="h-4 w-4 text-blue-600" />} title="Jouw resultaat" />

        {/* Hero — primair resultaat */}
        <CalcHero
          label="TODO: primair resultaat"
          value={formatEUR(result.uitkomst)}
        >
          <span className="text-xs opacity-80">Effectief: 21%</span>
        </CalcHero>

        {/* Detail rij */}
        <CalcResultRow label="TODO: detail" value={formatEUR(result.uitkomst)} type="info" tooltip="TODO: uitleg." />

        {/* Succes (positief) */}
        <CalcResultRow label="TODO: positief" value={`+ ${formatEUR(0)}`} type="success" />

        {/* Waarschuwing */}
        <CalcResultRow label="TODO: kosten" value={`− ${formatEUR(0)}`} type="warning" />

        {/* Eindrapport */}
        <div className="border-t border-gray-200 pt-1.5">
          <CalcResultRow label="TODO: eindtotaal" value={formatEUR(result.uitkomst)} type="highlight" />
        </div>
      </CalcCard>

      {/* ═══════ SHARE TOOLBAR ═══════ */}
      <ShareToolbar
        calculatorType="mijn-calculator"            // TODO
        calculatorName="Mijn Calculator"             // TODO
        categoryName="Algemeen"                      // TODO
        inputs={[
          { label: "Voorbeeld", value: formatEUR(voorbeeld) },
        ]}
        results={[
          { label: "Uitkomst", value: formatEUR(result.uitkomst), type: "success" },
        ]}
      />

      {/* ═══════ DISCLAIMER ═══════ */}
      <CalcDisclaimer>
        TODO: aangepaste disclaimer. of gebruik de standaard door kinderen weg te laten.
      </CalcDisclaimer>
    </div>
  );
}
