/**
 * Jaarruimte & Pensioenbeleggen Calculator — 2026
 *
 * Berekent de maximale fiscaal aftrekbare jaarruimte voor
 * pensioenbeleggen (lijfrentesparen).
 *
 * Formule (vanaf 2023):
 *   Jaarruimte = (premiegrondslag × 30%) - factor A
 *
 *   premiegrondslag = maximum salaris (€137.800) - franchise (€17.545)
 *   factor A = pensioenopbouw via werkgever in het voorafgaande jaar
 *
 * ─── Grenzen 2026 ───
 *   Maximum jaarruimte: €35.589
 *   Reserveringsruimte: €42.753 (niet benutte jaarruimte afgelopen 10 jaar)
 *   Maximum premiegrondslag: €137.800
 *   Franchise: €17.545 (2026, AOW-franchise)
 *   Factor A max: 100% van premiegrondslag
 */

// ─── Types ──────────────────────────────────────────────────────

export interface JaarruimteInput {
  /** Bruto jaarsalaris in EUR */
  brutoJaar: number;
  /** Factor A: pensioenopbouw via werkgever in 2025 (EUR) */
  factorA: number;
  /** Heeft de gebruiker een pensioenregeling via werkgever? */
  heeftPensioenregeling: boolean;
  /** Eerder niet-benutte jaarruimte (reserveringsruimte) */
  reserveringsruimte?: number;
}

export interface JaarruimteResultaat {
  /** Maximum salaris waarover jaarruimte wordt berekend */
  maxSalaris: number;
  /** Franchise (AOW-aftrek) */
  franchise: number;
  /** Premiegrondslag = salaris - franchise (max €137.800 - €17.545) */
  premieGrondslag: number;
  /** Factor A (opbouw werkgever) */
  factorA: number;
  /** Percentage voor jaarruimte */
  percentage: number;
  /** Berekende jaarruimte */
  jaarruimte: number;
  /** Maximale jaarruimte (plafond) */
  maxJaarruimte: number;
  /** Reserveringsruimte (niet-benutte jaren) */
  reserveringsruimte: number;
  /** Totale ruimte (jaarruimte + reserveringsruimte) */
  totaleRuimte: number;
  /** Max totale ruimte */
  maxTotaleRuimte: number;
  /** Geschatte belastingbesparing bij marginaal tarief */
  belastingBesparing: number;
  /** Marginaal tarief voor de besparing */
  marginaalTarief: number;
  /** Maandbedrag voor automatische overschrijving */
  perMaand: number;
}

// ─── Constanten 2026 ──────────────────────────────────────────

const MAX_SALARIS = 137800;
const FRANCHISE = 17545;
const PERCENTAGE = 0.30; // 30%
const MAX_JAARUIMTE = 35589;
const MAX_RESERVERINGSRUIMTE = 42753;
const BELASTING_SCHIJVEN = [
  { min: 0, max: 40018, rate: 35.82 },
  { min: 40018, max: 76817, rate: 37.48 },
  { min: 76817, max: Infinity, rate: 49.50 },
] as const;

// ─── Compute ────────────────────────────────────────────────────

export function berekenJaarruimte(input: JaarruimteInput): JaarruimteResultaat {
  const { brutoJaar, factorA, heeftPensioenregeling, reserveringsruimte = 0 } = input;

  // 1. Premiegrondslag = max(0, min(brutoJaar, MAX_SALARIS) - FRANCHISE)
  const toetsInkomen = Math.min(brutoJaar, MAX_SALARIS);
  const premieGrondslag = Math.max(0, toetsInkomen - FRANCHISE);

  // 2. Jaarruimte = premieGrondslag × 30% - factor A
  let jaarruimte: number;
  if (!heeftPensioenregeling) {
    // Zonder pensioenregeling: geen factor A
    jaarruimte = premieGrondslag * PERCENTAGE;
  } else {
    jaarruimte = Math.max(0, premieGrondslag * PERCENTAGE - factorA);
  }

  // 3. Plafond
  jaarruimte = Math.min(jaarruimte, MAX_JAARUIMTE);
  jaarruimte = Math.round(jaarruimte);

  // 4. Reserveringsruimte
  const maxReservering = Math.min(reserveringsruimte, MAX_RESERVERINGSRUIMTE);
  const totaleRuimte = Math.min(jaarruimte + maxReservering, MAX_JAARUIMTE + MAX_RESERVERINGSRUIMTE);

  // 5. Belastingbesparing o.b.v. marginaal tarief
  const marginaalTarief = [...BELASTING_SCHIJVEN]
    .reverse()
    .find((b) => brutoJaar > b.min)?.rate ?? BELASTING_SCHIJVEN[0].rate;

  const belastingBesparing = Math.round(totaleRuimte * (marginaalTarief / 100));

  return {
    maxSalaris: MAX_SALARIS,
    franchise: FRANCHISE,
    premieGrondslag: Math.round(premieGrondslag),
    factorA: Math.min(factorA, premieGrondslag),
    percentage: PERCENTAGE * 100,
    jaarruimte,
    maxJaarruimte: MAX_JAARUIMTE,
    reserveringsruimte: Math.round(maxReservering),
    totaleRuimte,
    maxTotaleRuimte: MAX_JAARUIMTE + MAX_RESERVERINGSRUIMTE,
    belastingBesparing,
    marginaalTarief,
    perMaand: Math.round(totaleRuimte / 12),
  };
}
