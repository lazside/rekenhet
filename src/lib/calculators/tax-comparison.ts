/**
 * Inkomstenbelasting 2025 vs 2026 — Vergelijking
 *
 * Toont het verschil in nettosalaris en belastingdruk tussen
 * de belastingjaren 2025 en 2026.
 *
 * ─── 2025 ───
 *   Schijf 1: €0 – €38.441 → 35,82% (belasting 8,17% + premies 27,65%)
 *   Schijf 2: €38.441 – €76.817 → 37,48%
 *   Schijf 3: €76.817+ → 49,50%
 *   AHK: max €3.068, afbouw vanaf €24.821, 6,595%
 *   AK: max €5.599, afbouw vanaf €39.958, 6,51%
 *
 * ─── 2026 ───
 *   Schijf 1: €0 – €40.018 → 35,82% (belasting 9,28% + premies 26,54%)
 *   Schijf 2: €40.018 – €76.817 → 37,48%
 *   Schijf 3: €76.817+ → 49,50%
 *   AHK: max €3.070, afbouw vanaf €24.928, 6,595%
 *   AK: max €5.598, afbouw vanaf €40.018, 6,51%
 */

// ─── Types ──────────────────────────────────────────────────────

export interface TaxJaarConfig {
  jaar: number;
  label: string;
  brackets: { min: number; max: number; rate: number; label: string }[];
  algemeneHK: { max: number; phaseOutStart: number; phaseOutRate: number; min: number };
  arbeidskorting: {
    bracket1: { min: number; max: number; rate: number };
    bracket2: { min: number; max: number; rate: number };
    bracket3: { min: number; max: number; rate: number };
    phaseOutStart: number;
    phaseOutRate: number;
    max: number;
  };
}

export interface VergelijkingInput {
  brutoJaar: number;
  vakantiegeldInbegrepen: boolean;
}

export interface JaarResultaat {
  jaar: number;
  label: string;
  brutoJaar: number;
  brutoInclVak: number;
  belastbaar: number;
  bracketDetails: { label: string; amount: number; tax: number }[];
  inkomstenbelasting: number;
  premies: number;
  ahk: number;
  ak: number;
  loonheffing: number;
  nettoJaar: number;
  nettoMaand: number;
  effectiveRate: number;
  marginalRate: number;
}

export interface VergelijkingResultaat {
  jaar2025: JaarResultaat;
  jaar2026: JaarResultaat;
  verschilNettoJaar: number;
  verschilNettoMaand: number;
  verschilBelasting: number;
  verschilPercentage: number;
}

// ─── Configuraties ──────────────────────────────────────────────

const CONFIG_2025: TaxJaarConfig = {
  jaar: 2025,
  label: "2025",
  brackets: [
    { min: 0, max: 38441, rate: 35.82, label: "Schijf 1 (35,82%)" },
    { min: 38441, max: 76817, rate: 37.48, label: "Schijf 2 (37,48%)" },
    { min: 76817, max: Infinity, rate: 49.50, label: "Schijf 3 (49,50%)" },
  ],
  algemeneHK: { max: 3068, phaseOutStart: 24821, phaseOutRate: 6.595, min: 0 },
  arbeidskorting: {
    bracket1: { min: 0, max: 11500, rate: 9.8 },
    bracket2: { min: 11500, max: 23500, rate: 30.074 },
    bracket3: { min: 23500, max: 39958, rate: 2.685 },
    phaseOutStart: 39958,
    phaseOutRate: 6.51,
    max: 5599,
  },
};

const CONFIG_2026: TaxJaarConfig = {
  jaar: 2026,
  label: "2026",
  brackets: [
    { min: 0, max: 40018, rate: 35.82, label: "Schijf 1 (35,82%)" },
    { min: 40018, max: 76817, rate: 37.48, label: "Schijf 2 (37,48%)" },
    { min: 76817, max: Infinity, rate: 49.50, label: "Schijf 3 (49,50%)" },
  ],
  algemeneHK: { max: 3070, phaseOutStart: 24928, phaseOutRate: 6.595, min: 0 },
  arbeidskorting: {
    bracket1: { min: 0, max: 11500, rate: 9.8 },
    bracket2: { min: 11500, max: 23500, rate: 30.074 },
    bracket3: { min: 23500, max: 40018, rate: 2.685 },
    phaseOutStart: 40018,
    phaseOutRate: 6.51,
    max: 5598,
  },
};

// ─── Shared compute ────────────────────────────────────────────

function berekenJaar(config: TaxJaarConfig, input: VergelijkingInput): JaarResultaat {
  const { brutoJaar, vakantiegeldInbegrepen } = input;

  // Vakantiegeld
  const vak = vakantiegeldInbegrepen ? 0 : brutoJaar * 0.08;
  const brutoInclVak = brutoJaar + vak;
  const belastbaar = brutoInclVak;

  // Brackets
  let totalTax = 0;
  const bracketDetails: { label: string; amount: number; tax: number }[] = [];
  for (const bracket of config.brackets) {
    if (belastbaar <= bracket.min) break;
    const taxableInBracket = Math.min(belastbaar, bracket.max) - bracket.min;
    if (taxableInBracket <= 0) continue;
    const bracketTax = taxableInBracket * (bracket.rate / 100);
    totalTax += bracketTax;
    bracketDetails.push({
      label: bracket.label,
      amount: taxableInBracket,
      tax: Math.round(bracketTax * 100) / 100,
    });
  }

  // Premies (alleen in schijf 1: incomeTax+premies = rate. Voor 2025/2026 is sociale premies alleen in schijf 1)
  const premies = config.brackets[0]
    ? Math.min(belastbaar, config.brackets[0].max) * (config.brackets[0].rate / 100 - 0.0928)
    : 0;

  // AHK
  let ahk = config.algemeneHK.max;
  if (belastbaar > config.algemeneHK.phaseOutStart) {
    const excess = belastbaar - config.algemeneHK.phaseOutStart;
    ahk = Math.max(config.algemeneHK.min, config.algemeneHK.max - excess * (config.algemeneHK.phaseOutRate / 100));
  }
  ahk = Math.round(ahk * 100) / 100;

  // AK
  const akConfig = config.arbeidskorting;
  let ak = 0;
  ak += Math.min(belastbaar, akConfig.bracket1.max) * (akConfig.bracket1.rate / 100);
  if (belastbaar > akConfig.bracket2.min) {
    ak += Math.min(belastbaar - akConfig.bracket2.min, akConfig.bracket2.max - akConfig.bracket2.min) * (akConfig.bracket2.rate / 100);
  }
  if (belastbaar > akConfig.bracket3.min) {
    ak += Math.min(belastbaar - akConfig.bracket3.min, akConfig.bracket3.max - akConfig.bracket3.min) * (akConfig.bracket3.rate / 100);
  }
  ak = Math.min(ak, akConfig.max);
  if (belastbaar > akConfig.phaseOutStart) {
    ak = Math.max(0, ak - (belastbaar - akConfig.phaseOutStart) * (akConfig.phaseOutRate / 100));
  }
  ak = Math.round(ak * 100) / 100;

  // Loonheffing
  const heffingskorting = ahk + ak;
  const loonheffing = Math.max(0, Math.round((totalTax - heffingskorting) * 100) / 100);

  // Netto
  const nettoJaar = brutoInclVak - loonheffing;

  // Marginal rate
  const marginalRate = [...config.brackets]
    .reverse()
    .find((b) => belastbaar > b.min)?.rate ?? config.brackets[0].rate;

  return {
    jaar: config.jaar,
    label: config.label,
    brutoJaar,
    brutoInclVak: Math.round(brutoInclVak * 100) / 100,
    belastbaar: Math.round(belastbaar * 100) / 100,
    bracketDetails,
    inkomstenbelasting: Math.round(totalTax * 100) / 100,
    premies: Math.round(premies * 100) / 100,
    ahk,
    ak,
    loonheffing,
    nettoJaar: Math.round(nettoJaar * 100) / 100,
    nettoMaand: Math.round((nettoJaar / 12) * 100) / 100,
    effectiveRate: brutoInclVak > 0 ? Math.round((loonheffing / brutoInclVak) * 10000) / 100 : 0,
    marginalRate,
  };
}

// ─── Main ───────────────────────────────────────────────────────

export function vergelijkBelastingjaren(input: VergelijkingInput): VergelijkingResultaat {
  const jaar2025 = berekenJaar(CONFIG_2025, input);
  const jaar2026 = berekenJaar(CONFIG_2026, input);

  return {
    jaar2025,
    jaar2026,
    verschilNettoJaar: Math.round((jaar2026.nettoJaar - jaar2025.nettoJaar) * 100) / 100,
    verschilNettoMaand: Math.round((jaar2026.nettoMaand - jaar2025.nettoMaand) * 100) / 100,
    verschilBelasting: Math.round((jaar2026.loonheffing - jaar2025.loonheffing) * 100) / 100,
    verschilPercentage: jaar2025.nettoJaar > 0
      ? Math.round(((jaar2026.nettoJaar - jaar2025.nettoJaar) / jaar2025.nettoJaar) * 10000) / 100
      : 0,
  };
}

export { CONFIG_2025, CONFIG_2026 };
