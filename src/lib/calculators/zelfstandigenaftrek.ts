/**
 * Zelfstandigenaftrek & Netto Inkomen Calculator 2026
 *
 * Berekent de volledige ondernemersaftrek (zelfstandigenaftrek, startersaftrek,
 * MKB-winstvrijstelling) en het netto inkomen voor ZZP'ers en ondernemers.
 *
 * Op basis van het Belastingplan 2026:
 *   - Zelfstandigenaftrek: €1.200 (was €2.470 in 2025 — daling van 51%)
 *   - Startersaftrek: €2.123 (extra bovenop zelfstandigenaftrek)
 *   - MKB-winstvrijstelling: 12,7% van de winst na ondernemersaftrek
 *   - AOW-gerechtigden: 50% van de zelfstandigenaftrek
 *   - Tarief voor belastingvoordeel: 37,56%
 */

import { formatEUR } from "@/lib/utils";

// ─── Constants ──────────────────────────────────────────────────

const ZELFSTANDIGENAFTREK = 1200;
const ZELFSTANDIGENAFTREK_AOW = 600;
const STARTERSAFTREK = 2123;
const MKB_VRIJSTELLING_PERCENTAGE = 12.7;
const VOORDEELTARIEF = 37.56; // percentage used for voordeel berekening

const BELASTING_SCHIJVEN = [
  { min: 0, max: 40018, rate: 35.82, label: "Schijf 1 (35,82%)" },
  { min: 40018, max: 76817, rate: 37.48, label: "Schijf 2 (37,48%)" },
  { min: 76817, max: Infinity, rate: 49.50, label: "Schijf 3 (49,50%)" },
] as const;

// ─── Types ──────────────────────────────────────────────────────

export interface ZelfstandigenaftrekInput {
  /** Annual profit before tax (winst voor belastingen) */
  winst: number;
  /** Whether the user meets the urencriterium (1,225 hours/year) */
  voldoetUrencriterium: boolean;
  /** Whether the user qualifies for startersaftrek (first 5 years) */
  heeftStartersaftrek: boolean;
  /** Whether the user has reached AOW age */
  aowLeeftijd: boolean;
  /** Whether the user is entitled to MKB-winstvrijstelling */
  rechtMkbVrijstelling: boolean;
}

export interface ZelfstandigenaftrekResult {
  /** Zelfstandigenaftrek base amount */
  zelfstandigenaftrek: number;
  /** Startersaftrek extra amount */
  startersaftrek: number;
  /** Total ondernemersaftrek (zelfstandigenaftrek + startersaftrek) */
  totaleOndernemersaftrek: number;
  /** Winst after ondernemersaftrek */
  winstNaOndernemersaftrek: number;
  /** MKB-winstvrijstelling percentage */
  mkbPercentage: number;
  /** MKB-winstvrijstelling amount */
  mkbVrijstellingBedrag: number;
  /** Belastbare winst after all deductions */
  belastbareWinst: number;
  /** Tax per bracket */
  bracketDetails: { label: string; amount: number; tax: number }[];
  /** Total income tax due */
  inkomstenbelasting: number;
  /** Social security premiums (Zvw) */
  zvwPremie: number;
  /** Net annual income */
  nettoJaar: number;
  /** Net monthly income */
  nettoMaand: number;
  /** Effective tax rate */
  effectiefTarief: number;
  /** Marginal rate */
  marginaalTarief: number;
  /** Monthly amount to reserve for tax */
  reserveringPerMaand: number;
  /** Besparing door zelfstandigenaftrek */
  besparingZelfstandigenaftrek: number;
  /** Besparing door MKB-vrijstelling */
  besparingMkbVrijstelling: number;
  /** Totale belastingbesparing */
  totaleBesparing: number;
}

// ─── Calculation Functions ─────────────────────────────────────

/**
 * Calculate income tax using progressive 2026 brackets.
 */
function calculateIncomeTax(taxableIncome: number) {
  let totalTax = 0;
  const bracketDetails: { label: string; amount: number; tax: number }[] = [];

  for (const bracket of BELASTING_SCHIJVEN) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    if (taxableInBracket <= 0) continue;
    const tax = Math.round(taxableInBracket * (bracket.rate / 100) * 100) / 100;
    totalTax += tax;
    bracketDetails.push({ label: bracket.label, amount: taxableInBracket, tax });
  }

  return { totalTax: Math.round(totalTax * 100) / 100, bracketDetails };
}

/**
 * Calculate Zvw (Zorgverzekeringswet) bijdrage — fixed percentage over profit.
 * In 2026: 5.43% over winst (bijdrage-inkomen, max ~€71.000 bijdrage-inkomensgrens)
 */
function calculateZvw(winst: number): number {
  const ZVW_PERCENTAGE = 5.43;
  const ZVW_MAX_INKOMEN = 71000;
  const bijdrageInkomen = Math.min(winst, ZVW_MAX_INKOMEN);
  return Math.round(bijdrageInkomen * (ZVW_PERCENTAGE / 100) * 100) / 100;
}

/**
 * Find the marginal tax rate.
 */
function getMarginalRate(taxableIncome: number): number {
  const bracket = [...BELASTING_SCHIJVEN].reverse().find(b => taxableIncome > b.min);
  return bracket?.rate ?? BELASTING_SCHIJVEN[0].rate;
}

// ─── Main Compute Function ──────────────────────────────────────

export function berekenZelfstandigenaftrek(input: ZelfstandigenaftrekInput): ZelfstandigenaftrekResult {
  const { winst, voldoetUrencriterium, heeftStartersaftrek, aowLeeftijd, rechtMkbVrijstelling } = input;

  // ── Step 1: Zelfstandigenaftrek ──
  let zelfstandigenaftrek = 0;
  let startersaftrek = 0;

  if (voldoetUrencriterium) {
    // Base zelfstandigenaftrek
    zelfstandigenaftrek = aowLeeftijd ? ZELFSTANDIGENAFTREK_AOW : ZELFSTANDIGENAFTREK;

    // Startersaftrek (extra opbouw)
    if (heeftStartersaftrek) {
      startersaftrek = STARTERSAFTREK;
    }

    // Beperking: totale aftrek mag niet hoger zijn dan de winst (tenzij startersaftrek)
    const totaleAftrek = zelfstandigenaftrek + startersaftrek;
    if (totaleAftrek > winst && !heeftStartersaftrek) {
      // Limit to winst, rest verrekenbaar met toekomstige jaren
      zelfstandigenaftrek = Math.min(zelfstandigenaftrek, winst);
      startersaftrek = 0;
    }
  }

  const totaleOndernemersaftrek = zelfstandigenaftrek + startersaftrek;
  const winstNaOndernemersaftrek = Math.max(0, winst - totaleOndernemersaftrek);

  // ── Step 3: MKB-winstvrijstelling ──
  let mkbVrijstellingBedrag = 0;
  if (rechtMkbVrijstelling) {
    mkbVrijstellingBedrag = Math.round(winstNaOndernemersaftrek * (MKB_VRIJSTELLING_PERCENTAGE / 100) * 100) / 100;
  }

  // ── Step 4: Belastbare winst ──
  const belastbareWinst = Math.max(0, Math.round((winstNaOndernemersaftrek - mkbVrijstellingBedrag) * 100) / 100);

  // ── Step 5: Inkomstenbelasting ──
  const { totalTax, bracketDetails } = calculateIncomeTax(belastbareWinst);

  // ── Step 6: Zvw premie ──
  const zvwPremie = calculateZvw(winst);

  // ── Step 7: Total taxes ──
  const totaleBelasting = Math.round((totalTax + zvwPremie) * 100) / 100;

  // ── Step 8: Net result ──
  const nettoJaar = Math.round((winst - totaleBelasting) * 100) / 100;
  const nettoMaand = Math.round((nettoJaar / 12) * 100) / 100;

  // ── Step 9: Effective rate ──
  const effectiefTarief = winst > 0 ? Math.round((totaleBelasting / winst) * 10000) / 100 : 0;
  const marginaalTarief = getMarginalRate(belastbareWinst);

  // ── Step 10: Tax savings breakdown ──
  // Besparing = ondernemersaftrek × marginaal tarief + indirect MKB-effect
  const besparingDirect = Math.round(totaleOndernemersaftrek * (marginaalTarief / 100) * 100) / 100;
  const besparingMkb = rechtMkbVrijstelling
    ? Math.round(totaleOndernemersaftrek * (MKB_VRIJSTELLING_PERCENTAGE / 100) * (marginaalTarief / 100) * 100) / 100
    : 0;

  const reserveringPerMaand = Math.round((totaleBelasting / 12) * 100) / 100;

  return {
    zelfstandigenaftrek,
    startersaftrek,
    totaleOndernemersaftrek: Math.round(totaleOndernemersaftrek * 100) / 100,
    winstNaOndernemersaftrek: Math.round(winstNaOndernemersaftrek * 100) / 100,
    mkbPercentage: rechtMkbVrijstelling ? MKB_VRIJSTELLING_PERCENTAGE : 0,
    mkbVrijstellingBedrag,
    belastbareWinst,
    bracketDetails,
    inkomstenbelasting: totalTax,
    zvwPremie,
    nettoJaar,
    nettoMaand,
    effectiefTarief,
    marginaalTarief,
    reserveringPerMaand,
    besparingZelfstandigenaftrek: Math.round(besparingDirect * 100) / 100,
    besparingMkbVrijstelling: Math.round(besparingMkb * 100) / 100,
    totaleBesparing: Math.round((besparingDirect + besparingMkb) * 100) / 100,
  };
}
