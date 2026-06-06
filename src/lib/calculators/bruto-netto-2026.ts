/**
 * Dutch 2026 Tax Calculation Engine
 *
 * Implements the exact 2026 tax brackets, social security premiums,
 * algemene heffingskorting, and arbeidskorting for Box 1 income.
 *
 * Based on the Belastingplan 2026 (Prinsjesdag 2025) indexatation
 * of the 2025 rates with estimated inflation correction.
 *
 * ── Tax Brackets (Box 1) ──
 *   Schijf 1:  €0 – €40,018      35.82%  (income tax 9.28% + AOW/Anw/Wlz 26.54%)
 *   Schijf 2:  €40,018 – €76,817  37.48%  (income tax only)
 *   Schijf 3:  €76,817+           49.50%  (highest rate)
 *
 * ── Heffingskortingen ──
 *   Algemene heffingskorting: max €3,070, phase-out at higher incomes
 *   Arbeidskorting: max ~€5,598, phased in then out
 */

// ─── Constants ──────────────────────────────────────────────────

const BRACKETS = [
  { min: 0, max: 40018, rate: 35.82, label: "Schijf 1 (35,82%)" },
  { min: 40018, max: 76817, rate: 37.48, label: "Schijf 2 (37,48%)" },
  { min: 76817, max: Infinity, rate: 49.50, label: "Schijf 3 (49,50%)" },
] as const;

const TAX_RATES = {
  schijf1: { incomeTax: 9.28, socialPremiums: 26.54 }, // Total: 35.82%
  schijf2: { incomeTax: 37.48, socialPremiums: 0 }, // Total: 37.48%
  schijf3: { incomeTax: 49.50, socialPremiums: 0 }, // Total: 49.50%
} as const;

const HEFFINGSKORTING = {
  /** Algemene heffingskorting — max €3,070, phase-out above €24,928 */
  algemeen: {
    max: 3070,
    phaseOutStart: 24928,
    phaseOutRate: 6.595, // per €100 → €6.595 reduction
    min: 0,
  },
  /** Arbeidskorting — phased in based on income brackets */
  arbeid: {
    // Income ranges and marginal rates for building up the credit
    bracket1: { min: 0, max: 11500, rate: 9.8 },
    bracket2: { min: 11500, max: 23500, rate: 30.074 },
    bracket3: { min: 23500, max: 40018, rate: 2.685 },
    // Phase-out starts above €40,018
    phaseOutStart: 40018,
    phaseOutRate: 6.51,
    max: 5598, // Maximum arbeidskorting
  },
} as const;

// ─── Input / Output Types ───────────────────────────────────────

export interface BrutoNettoInput {
  /** Gross annual salary in EUR */
  brutoJaar: number;
  /** Whether holiday allowance (8%) is included in brutoJaar */
  vakantiegeldInbegrepen: boolean;
  /** Company car bijtelling percentage (0, 12, 16, 22) */
  bijtellingPercentage: number;
  /** Cataloguswaarde of company car (for bijtelling) */
  catalogusWaarde?: number;
  /** Apply algemene heffingskorting */
  algemeneHeffingskorting: boolean;
  /** Apply arbeidskorting */
  arbeidskorting: boolean;
}

export interface BrutoNettoBreakdown {
  /** Gross annual salary */
  brutoJaar: number;
  /** Gross monthly salary */
  brutoMaand: number;
  /** Holiday allowance (8% of base) */
  vakantiegeld: number;
  /** Total taxable income */  
  belastbaarInkomen: number;
  /** Income tax per bracket */
  bracketDetails: {
    label: string;
    amount: number;
    tax: number;
  }[];
  /** Total income tax before credits */
  totaleBelasting: number;
  /** Social security premiums (AOW/Anw/Wlz) */
  premieVolksverzekeringen: number;
  /** Algemene heffingskorting applied */
  algemeneHeffingskortingBedrag: number;
  /** Arbeidskorting applied */
  arbeidskortingBedrag: number;
  /** Total heffingskortingen */
  totaleHeffingskorting: number;
  /** Effective loonheffing (tax - credits) */
  loonheffing: number;
  /** Net annual salary */
  nettoJaar: number;
  /** Net monthly salary */
  nettoMaand: number;
  /** Effective tax rate (total tax / bruto) */
  effectiveRate: number;
  /** Marginal tax rate (highest bracket the user is in) */
  marginalRate: number;
}

// ─── Core Calculation Functions ─────────────────────────────────

/**
 * Calculate income tax using progressive brackets.
 * Returns tax per bracket and total.
 */
export function calculateIncomeTax(
  taxableIncome: number
): {
  bracketDetails: BrutoNettoBreakdown["bracketDetails"];
  totalTax: number;
  socialPremiums: number;
} {
  let totalTax = 0;
  let socialPremiums = 0;
  const bracketDetails: BrutoNettoBreakdown["bracketDetails"] = [];

  for (const bracket of BRACKETS) {
    if (taxableIncome <= bracket.min) break;

    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    if (taxableInBracket <= 0) continue;

    const bracketTax = taxableInBracket * (bracket.rate / 100);
    totalTax += bracketTax;

    // Social premiums only apply to schijf 1
    if (bracket.min === 0) {
      socialPremiums = taxableInBracket * (TAX_RATES.schijf1.socialPremiums / 100);
    }

    bracketDetails.push({
      label: bracket.label,
      amount: taxableInBracket,
      tax: Math.round(bracketTax * 100) / 100,
    });
  }

  return {
    bracketDetails,
    totalTax: Math.round(totalTax * 100) / 100,
    socialPremiums: Math.round(socialPremiums * 100) / 100,
  };
}

/**
 * Calculate algemene heffingskorting for 2026.
 * Max €3,070, reducing by 6.595% of income above €24,928.
 */
export function calculateAlgemeneHeffingskorting(
  taxableIncome: number
): number {
  const { algemeen } = HEFFINGSKORTING;

  // If income is below phase-out start, full credit applies
  if (taxableIncome <= algemeen.phaseOutStart) {
    return algemeen.max;
  }

  // Phase-out: reduce by 6.595% of amount above €24,928
  const excess = taxableIncome - algemeen.phaseOutStart;
  const reduction = excess * (algemeen.phaseOutRate / 100);
  const credit = Math.max(algemeen.min, algemeen.max - reduction);

  return Math.round(credit * 100) / 100;
}

/**
 * Calculate arbeidskorting for 2026.
 * Complex phase-in across 3 brackets, then phase-out.
 */
export function calculateArbeidskorting(taxableIncome: number): number {
  const { arbeid } = HEFFINGSKORTING;

  // Phase-in
  let credit = 0;

  // Bracket 1: first €11,500 at 9.8%
  const bracket1Amount = Math.min(taxableIncome, arbeid.bracket1.max);
  credit += bracket1Amount * (arbeid.bracket1.rate / 100);

  // Bracket 2: €11,500 - €23,500 at 30.074%
  if (taxableIncome > arbeid.bracket2.min) {
    const bracket2Amount = Math.min(
      taxableIncome - arbeid.bracket2.min,
      arbeid.bracket2.max - arbeid.bracket2.min
    );
    credit += bracket2Amount * (arbeid.bracket2.rate / 100);
  }

  // Bracket 3: €23,500 - €40,018 at 2.685%
  if (taxableIncome > arbeid.bracket3.min) {
    const bracket3Amount = Math.min(
      taxableIncome - arbeid.bracket3.min,
      arbeid.bracket3.max - arbeid.bracket3.min
    );
    credit += bracket3Amount * (arbeid.bracket3.rate / 100);
  }

  // Cap at maximum
  credit = Math.min(credit, arbeid.max);

  // Phase-out: income above €40,018 → reduce by 6.51%
  if (taxableIncome > arbeid.phaseOutStart) {
    const excess = taxableIncome - arbeid.phaseOutStart;
    const reduction = excess * (arbeid.phaseOutRate / 100);
    credit = Math.max(0, credit - reduction);
  }

  return Math.round(credit * 100) / 100;
}

/**
 * Calculate bijtelling (company car addition).
 * Adds a percentage of the car's cataloguswaarde to taxable income.
 */
export function calculateBijtelling(
  percentage: number,
  catalogusWaarde: number
): number {
  if (percentage <= 0 || catalogusWaarde <= 0) return 0;
  return catalogusWaarde * (percentage / 100);
}

/**
 * Full net salary calculation.
 * Takes all inputs and returns the complete breakdown.
 */
export function calculateNetSalary(input: BrutoNettoInput): BrutoNettoBreakdown {
  const { brutoJaar, vakantiegeldInbegrepen, bijtellingPercentage, catalogusWaarde, algemeneHeffingskorting, arbeidskorting } = input;

  // ── Step 1: Holiday allowance ──
  // If not included, add 8% to gross
  const vakantiegeld = vakantiegeldInbegrepen
    ? 0
    : brutoJaar * 0.08;
  
  const brutoInclVakantie = brutoJaar + vakantiegeld;

  // ── Step 2: Bijtelling (company car) ──
  const bijtelling = calculateBijtelling(bijtellingPercentage, catalogusWaarde ?? 0);

  // ── Step 3: Taxable income ──
  const belastbaarInkomen = brutoInclVakantie + bijtelling;

  // ── Step 4: Calculate income tax ──
  const { bracketDetails, totalTax, socialPremiums } = calculateIncomeTax(belastbaarInkomen);

  // ── Step 5: Heffingskortingen ──
  const ahkBedrag = algemeneHeffingskorting
    ? calculateAlgemeneHeffingskorting(belastbaarInkomen)
    : 0;
  const akBedrag = arbeidskorting
    ? calculateArbeidskorting(belastbaarInkomen)
    : 0;
  const totaleHeffingskorting = ahkBedrag + akBedrag;

  // ── Step 6: Loonheffing (payroll tax) ──
  const loonheffing = Math.max(0, totalTax - totaleHeffingskorting);

  // ── Step 7: Net result ──
  const nettoJaar = brutoInclVakantie - loonheffing;
  const nettoMaand = nettoJaar / 12;

  // Determine marginal rate (highest bracket the user hits)
  const marginalRate = BRACKETS
    .filter((b) => belastbaarInkomen > b.min)
    .pop()?.rate ?? BRACKETS[0].rate;

  return {
    brutoJaar,
    brutoMaand: brutoJaar / 12,
    vakantiegeld: Math.round(vakantiegeld * 100) / 100,
    belastbaarInkomen: Math.round(belastbaarInkomen * 100) / 100,
    bracketDetails,
    totaleBelasting: totalTax,
    premieVolksverzekeringen: socialPremiums,
    algemeneHeffingskortingBedrag: ahkBedrag,
    arbeidskortingBedrag: akBedrag,
    totaleHeffingskorting: Math.round(totaleHeffingskorting * 100) / 100,
    loonheffing: Math.round(loonheffing * 100) / 100,
    nettoJaar: Math.round(nettoJaar * 100) / 100,
    nettoMaand: Math.round(nettoMaand * 100) / 100,
    effectiveRate: Math.round((loonheffing / brutoInclVakantie) * 10000) / 100,
    marginalRate,
  };
}
