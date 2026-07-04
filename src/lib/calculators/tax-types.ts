/**
 * Gemeenschappelijke types voor de Nederlandse inkomstenbelasting 2026
 *
 * Gedeeld tussen bruto-netto-2026 en belastingjaar-vergelijken.
 */

// ─── Input Types ──────────────────────────────────────────────

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

// ─── Bracket Debug ────────────────────────────────────────────

export interface HeffingskortingTrace {
  name: string;
  max: number;
  applied: number;
  phaseOutStart: number;
  isPhasingOut: boolean;
  reductionAmount: number;
}

// ─── Leaseauto ────────────────────────────────────────────────

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

// ─── Uurloon ──────────────────────────────────────────────────

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

// ─── Full Breakdown ───────────────────────────────────────────

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
