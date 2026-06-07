/**
 * Dutch 2026 Tax Calculation Engine — Premium Edition
 *
 * Implements the exact 2026 tax brackets, social security premiums,
 * algemene heffingskorting, arbeidskorting for Box 1 income.
 *
 * Killer features the competition lacks:
 *   1. Advanced Company Car Module (leaseauto) — net impact including
 *      eigen bijdrage and bracket-aware bijtelling offset
 *   2. Transparent Tax Credit Breakdown — phase-out curve at multiple
 *      income thresholds so users see *why* net pay shifts
 *   3. Hourly-to-Monthly Wage Matrix — for flex/ZZP workers across
 *      32, 36, and 40 hour workweeks
 *
 * ── Tax Brackets (Box 1) ──
 *   Schijf 1:  €0 – €40,018      35.82%  (income tax 9.28% + AOW/Anw/Wlz 26.54%)
 *   Schijf 2:  €40,018 – €76,817  37.48%  (income tax only)
 *   Schijf 3:  €76,817+           49.50%  (highest rate)
 *
 * ── Heffingskortingen ──
 *   Algemene heffingskorting: max €3,070, phase-out above €24,928
 *   Arbeidskorting: max ~€5,598, complex phase-in then phase-out
 */

// ─── Constants ──────────────────────────────────────────────────

const BRACKETS = [
  { min: 0, max: 40018, rate: 35.82, label: "Schijf 1 (35,82%)" },
  { min: 40018, max: 76817, rate: 37.48, label: "Schijf 2 (37,48%)" },
  { min: 76817, max: Infinity, rate: 49.50, label: "Schijf 3 (49,50%)" },
] as const;

const TAX_RATES = {
  schijf1: { incomeTax: 9.28, socialPremiums: 26.54 },
  schijf2: { incomeTax: 37.48, socialPremiums: 0 },
  schijf3: { incomeTax: 49.50, socialPremiums: 0 },
} as const;

const HEFFINGSKORTING = {
  algemeen: {
    max: 3070,
    phaseOutStart: 24928,
    phaseOutRate: 6.595,
    min: 0,
  },
  arbeid: {
    bracket1: { min: 0, max: 11500, rate: 9.8 },
    bracket2: { min: 11500, max: 23500, rate: 30.074 },
    bracket3: { min: 23500, max: 40018, rate: 2.685 },
    phaseOutStart: 40018,
    phaseOutRate: 6.51,
    max: 5598,
  },
} as const;

// ─── Input / Output Types ───────────────────────────────────────

export interface BrutoNettoInput {
  brutoJaar: number;
  vakantiegeldInbegrepen: boolean;
  bijtellingPercentage: number;
  catalogusWaarde?: number;
  /** Eigen bijdrage leaseauto per maand (private contribution) */
  eigenBijdrage?: number;
  algemeneHeffingskorting: boolean;
  arbeidskorting: boolean;
}

export interface HeffingskortingTrace {
  name: string;
  max: number;
  applied: number;
  phaseOutStart: number;
  isPhasingOut: boolean;
  reductionAmount: number;
}

export interface LeaseautoImpact {
  /** Annual bijtelling added to taxable income */
  bijtellingJaar: number;
  /** Marginal rate the bijtelling lands in */
  marginalRate: number;
  /** Extra tax due to bijtelling (annual) */
  extraBelasting: number;
  /** Eigen bijdrage per year */
  eigenBijdrageJaar: number;
  /** Net annual cost of the lease car (tax increase + eigen bijdrage) */
  nettoJaarkosten: number;
  /** Net monthly cost */
  nettoMaandkosten: number;
}

export interface UurloonProjectie {
  /** Number of hours per week */
  urenPerWeek: number;
  /** Annual gross at this schedule */
  brutoJaar: number;
  /** Estimated net monthly */
  nettoMaand: number;
  /** Effective rate */
  effectiveRate: number;
}

export interface BrutoNettoBreakdown {
  brutoJaar: number;
  brutoMaand: number;
  vakantiegeld: number;
  belastbaarInkomen: number;
  bracketDetails: { label: string; amount: number; tax: number }[];
  totaleBelasting: number;
  premieVolksverzekeringen: number;
  algemeneHeffingskortingBedrag: number;
  arbeidskortingBedrag: number;
  totaleHeffingskorting: number;
  /** Track phase-out details for both heffingskortingen */
  heffingskortingTrace: HeffingskortingTrace[];
  loonheffing: number;
  /** Leaseauto impact (only if bijtelling > 0) */
  leaseautoImpact?: LeaseautoImpact;
  /** Hourly wage projections (only if provided) */
  uurloonProjecties?: UurloonProjectie[];
  nettoJaar: number;
  nettoMaand: number;
  effectiveRate: number;
  marginalRate: number;
}

// ─── Core: Income Tax ───────────────────────────────────────────

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

// ─── Heffingskortingen ──────────────────────────────────────────

export function calculateAlgemeneHeffingskorting(
  taxableIncome: number
): { bedrag: number; trace: HeffingskortingTrace } {
  const { algemeen } = HEFFINGSKORTING;
  let applied: number;
  let reductionAmount = 0;

  if (taxableIncome <= algemeen.phaseOutStart) {
    applied = algemeen.max;
  } else {
    const excess = taxableIncome - algemeen.phaseOutStart;
    reductionAmount = excess * (algemeen.phaseOutRate / 100);
    applied = Math.max(algemeen.min, algemeen.max - reductionAmount);
  }

  applied = Math.round(applied * 100) / 100;

  return {
    bedrag: applied,
    trace: {
      name: "Algemene heffingskorting",
      max: algemeen.max,
      applied,
      phaseOutStart: algemeen.phaseOutStart,
      isPhasingOut: taxableIncome > algemeen.phaseOutStart,
      reductionAmount: Math.round(reductionAmount * 100) / 100,
    },
  };
}

export function calculateArbeidskorting(
  taxableIncome: number
): { bedrag: number; trace: HeffingskortingTrace } {
  const { arbeid } = HEFFINGSKORTING;

  let credit = 0;
  const bracket1Amount = Math.min(taxableIncome, arbeid.bracket1.max);
  credit += bracket1Amount * (arbeid.bracket1.rate / 100);

  if (taxableIncome > arbeid.bracket2.min) {
    const bracket2Amount = Math.min(
      taxableIncome - arbeid.bracket2.min,
      arbeid.bracket2.max - arbeid.bracket2.min
    );
    credit += bracket2Amount * (arbeid.bracket2.rate / 100);
  }

  if (taxableIncome > arbeid.bracket3.min) {
    const bracket3Amount = Math.min(
      taxableIncome - arbeid.bracket3.min,
      arbeid.bracket3.max - arbeid.bracket3.min
    );
    credit += bracket3Amount * (arbeid.bracket3.rate / 100);
  }

  credit = Math.min(credit, arbeid.max);
  let reductionAmount = 0;

  if (taxableIncome > arbeid.phaseOutStart) {
    const excess = taxableIncome - arbeid.phaseOutStart;
    reductionAmount = excess * (arbeid.phaseOutRate / 100);
    credit = Math.max(0, credit - reductionAmount);
  }

  credit = Math.round(credit * 100) / 100;

  return {
    bedrag: credit,
    trace: {
      name: "Arbeidskorting",
      max: arbeid.max,
      applied: credit,
      phaseOutStart: arbeid.phaseOutStart,
      isPhasingOut: taxableIncome > arbeid.phaseOutStart,
      reductionAmount: Math.round(reductionAmount * 100) / 100,
    },
  };
}

// ─── Company Car (Leaseauto) Module ────────────────────────────

export function calculateLeaseautoImpact(
  bijtellingPercentage: number,
  catalogusWaarde: number,
  eigenBijdragePerMaand: number,
  belastbaarInkomen: number
): LeaseautoImpact | undefined {
  if (bijtellingPercentage <= 0 || catalogusWaarde <= 0) return undefined;

  const bijtellingJaar = catalogusWaarde * (bijtellingPercentage / 100);
  const taxableWithAddition = belastbaarInkomen + bijtellingJaar;

  // Recalculate tax without bijtelling to isolate the impact
  const taxWithout = calculateIncomeTax(belastbaarInkomen);
  const taxWith = calculateIncomeTax(taxableWithAddition);
  const extraBelasting = Math.round((taxWith.totalTax - taxWithout.totalTax) * 100) / 100;

  const marginalRate = BRACKETS
    .filter((b) => taxableWithAddition > b.min)
    .pop()?.rate ?? BRACKETS[0].rate;

  const eigenBijdrageJaar = eigenBijdragePerMaand * 12;
  const nettoJaarkosten = Math.round((extraBelasting + eigenBijdrageJaar) * 100) / 100;

  return {
    bijtellingJaar: Math.round(bijtellingJaar * 100) / 100,
    marginalRate,
    extraBelasting,
    eigenBijdrageJaar,
    nettoJaarkosten,
    nettoMaandkosten: Math.round((nettoJaarkosten / 12) * 100) / 100,
  };
}

// ─── Hourly → Monthly Wage Matrix ──────────────────────────────

const STANDAARD_WERKWEEK: { uren: number; label: string }[] = [
  { uren: 40, label: "Fulltime (40 uur)" },
  { uren: 36, label: "Vijfdaags (36 uur)" },
  { uren: 32, label: "Deeltijd (32 uur)" },
];

export function berekenUurloonProjecties(
  uurloon: number,
  wekenPerJaar: number = 52
): UurloonProjectie[] {
  if (uurloon <= 0) return [];

  return STANDAARD_WERKWEEK.map(({ uren, label }) => {
    const brutoJaar = Math.round(uurloon * uren * wekenPerJaar);
    // Quick net estimate using simplified calculation (no vakantiegeld toggle, assume AHK + AK)
    const { bracketDetails, totalTax, socialPremiums } = calculateIncomeTax(brutoJaar);
    const ahk = calculateAlgemeneHeffingskorting(brutoJaar).bedrag;
    const ak = calculateArbeidskorting(brutoJaar).bedrag;
    const loonheffing = Math.max(0, totalTax - (ahk + ak));
    const nettoJaar = brutoJaar - loonheffing;

    return {
      urenPerWeek: uren,
      brutoJaar,
      nettoMaand: Math.round((nettoJaar / 12) * 100) / 100,
      effectiveRate: Math.round((loonheffing / brutoJaar) * 10000) / 100,
    };
  });
}

// ─── Main Calculation ───────────────────────────────────────────

export function calculateNetSalary(input: BrutoNettoInput): BrutoNettoBreakdown {
  const {
    brutoJaar,
    vakantiegeldInbegrepen,
    bijtellingPercentage,
    catalogusWaarde,
    eigenBijdrage = 0,
    algemeneHeffingskorting,
    arbeidskorting,
  } = input;

  // Step 1: Holiday allowance
  const vakantiegeld = vakantiegeldInbegrepen ? 0 : brutoJaar * 0.08;
  const brutoInclVakantie = brutoJaar + vakantiegeld;

  // Step 2: Bijtelling (company car)
  const bijtelling = bijtellingPercentage > 0 && (catalogusWaarde ?? 0) > 0
    ? (catalogusWaarde! * (bijtellingPercentage / 100))
    : 0;

  // Step 3: Taxable income
  const belastbaarInkomen = brutoInclVakantie + bijtelling;

  // Step 4: Income tax
  const { bracketDetails, totalTax, socialPremiums } = calculateIncomeTax(belastbaarInkomen);

  // Step 5: Heffingskortingen (with trace data)
  const ahk = algemeneHeffingskorting
    ? calculateAlgemeneHeffingskorting(belastbaarInkomen)
    : { bedrag: 0, trace: { name: "Algemene heffingskorting", max: 0, applied: 0, phaseOutStart: 0, isPhasingOut: false, reductionAmount: 0 } };

  const ak = arbeidskorting
    ? calculateArbeidskorting(belastbaarInkomen)
    : { bedrag: 0, trace: { name: "Arbeidskorting", max: 0, applied: 0, phaseOutStart: 0, isPhasingOut: false, reductionAmount: 0 } };

  const totaleHeffingskorting = Math.round((ahk.bedrag + ak.bedrag) * 100) / 100;

  // Step 6: Loonheffing
  const loonheffing = Math.max(0, Math.round((totalTax - totaleHeffingskorting) * 100) / 100);

  // Step 7: Net result
  const nettoJaar = Math.round((brutoInclVakantie - loonheffing) * 100) / 100;
  const nettoMaand = Math.round((nettoJaar / 12) * 100) / 100;

  // Marginal rate
  const marginalRate = BRACKETS
    .filter((b) => belastbaarInkomen > b.min)
    .pop()?.rate ?? BRACKETS[0].rate;

  // Leaseauto impact
  const leaseautoImpact = calculateLeaseautoImpact(
    bijtellingPercentage,
    catalogusWaarde ?? 0,
    eigenBijdrage,
    belastbaarInkomen
  );

  return {
    brutoJaar,
    brutoMaand: Math.round((brutoJaar / 12) * 100) / 100,
    vakantiegeld: Math.round(vakantiegeld * 100) / 100,
    belastbaarInkomen: Math.round(belastbaarInkomen * 100) / 100,
    bracketDetails,
    totaleBelasting: totalTax,
    premieVolksverzekeringen: socialPremiums,
    algemeneHeffingskortingBedrag: ahk.bedrag,
    arbeidskortingBedrag: ak.bedrag,
    totaleHeffingskorting,
    heffingskortingTrace: [ahk.trace, ak.trace],
    loonheffing,
    leaseautoImpact,
    nettoJaar,
    nettoMaand,
    effectiveRate: brutoInclVakantie > 0
      ? Math.round((loonheffing / brutoInclVakantie) * 10000) / 100
      : 0,
    marginalRate,
  };
}
