/**
 * Dutch Benefits (Toeslagen) Calculation Engine — 2026
 *
 * Calculates Zorgtoeslag, Huurtoeslag, and Kindgebonden Budget
 * based on the toetsingsinkomen (aggregate fiscal income).
 *
 * All thresholds are based on 2026 official Belastingdienst parameters.
 */

// ─── Types ─────────────────────────────────────────────────────

export interface ToeslagResult {
  /** Annual amount in EUR */
  bedrag: number;
  /** Monthly amount in EUR */
  perMaand: number;
  /** Percentage of max that is retained (0-100) */
  retainedPct: number;
  /** Label for the benefit */
  label: string;
  /** Color class for UI */
  color: string;
  /** Detailed status text */
  status: string;
}

export interface ToeslagenBreakdown {
  zorg: ToeslagResult;
  huur: ToeslagResult;
  kind: ToeslagResult;
  totaalPerMaand: number;
  totaalPerJaar: number;
}

// ─── 2026 Thresholds ──────────────────────────────────────────

const ZORG = {
  maxBedrag: 1668,       // max zorgtoeslag per jaar (only with hoge zorgkosten)
  standaardBedrag: 1100,  // standard amount most people get
  drempel: 26400,         // starts phasing out at this income
  afbouwTot: 38000,       // fully phased out at this income (for singles)
  afbouwPercentage: 0.10, // 10% clawback rate
};

const HUUR = {
  maxBedrag: 4200,       // max huurtoeslag per jaar (at lowest rent)
  drempel: 24700,        // starts phasing out at this income
  afbouwTot: 35500,      // fully phased out at this income
  afbouwPercentage: 0.12,
};

const KIND = {
  maxBedragPerKind: 1200, // max per child
  drempel: 29500,         // starts phasing out
  afbouwTot: 48000,       // fully phased out
  afbouwPercentage: 0.065,
};

// ─── Calculation Functions ─────────────────────────────────────

function calcZorgtoeslag(inkomen: number): ToeslagResult {
  const maxBedrag = ZORG.standaardBedrag;
  let bedrag: number;
  let status: string;

  if (inkomen <= ZORG.drempel) {
    bedrag = maxBedrag;
    status = "Volledig behouden";
  } else if (inkomen >= ZORG.afbouwTot) {
    bedrag = 0;
    status = "Geen zorgtoeslag";
  } else {
    const overschot = inkomen - ZORG.drempel;
    const afbouw = overschot * ZORG.afbouwPercentage;
    bedrag = Math.max(0, maxBedrag - afbouw);
    status = `Gedeeltelijk (${Math.round(afbouw / maxBedrag * 100)}% afgebouwd)`;
  }

  bedrag = Math.round(bedrag);
  const retainedPct = maxBedrag > 0 ? Math.round((bedrag / maxBedrag) * 100) : 0;

  return {
    bedrag,
    perMaand: Math.round(bedrag / 12),
    retainedPct,
    label: "Zorgtoeslag",
    color: "blue",
    status,
  };
}

function calcHuurtoeslag(inkomen: number): ToeslagResult {
  const maxBedrag = HUUR.maxBedrag;
  let bedrag: number;
  let status: string;

  if (inkomen <= HUUR.drempel) {
    bedrag = maxBedrag;
    status = "Volledig behouden";
  } else if (inkomen >= HUUR.afbouwTot) {
    bedrag = 0;
    status = "Geen huurtoeslag";
  } else {
    const overschot = inkomen - HUUR.drempel;
    const afbouw = overschot * HUUR.afbouwPercentage;
    bedrag = Math.max(0, maxBedrag - afbouw);
    status = `Gedeeltelijk (${Math.round(afbouw / maxBedrag * 100)}% afgebouwd)`;
  }

  bedrag = Math.round(bedrag);
  const retainedPct = maxBedrag > 0 ? Math.round((bedrag / maxBedrag) * 100) : 0;

  return {
    bedrag,
    perMaand: Math.round(bedrag / 12),
    retainedPct,
    label: "Huurtoeslag",
    color: "teal",
    status,
  };
}

function calcKindgebondenBudget(inkomen: number, aantalKinderen: number = 1): ToeslagResult {
  const maxBedrag = KIND.maxBedragPerKind * aantalKinderen;
  let bedrag: number;
  let status: string;

  if (inkomen <= KIND.drempel) {
    bedrag = maxBedrag;
    status = "Volledig behouden";
  } else if (inkomen >= KIND.afbouwTot) {
    bedrag = 0;
    status = "Geen kindgebonden budget";
  } else {
    const overschot = inkomen - KIND.drempel;
    const afbouw = overschot * KIND.afbouwPercentage;
    bedrag = Math.max(0, maxBedrag - afbouw);
    status = `Gedeeltelijk (${Math.round(afbouw / maxBedrag * 100)}% afgebouwd)`;
  }

  bedrag = Math.round(bedrag);
  const retainedPct = maxBedrag > 0 ? Math.round((bedrag / maxBedrag) * 100) : 0;

  return {
    bedrag,
    perMaand: Math.round(bedrag / 12),
    retainedPct,
    label: "Kindgebonden Budget",
    color: "purple",
    status,
  };
}

/**
 * Main calculation — returns full breakdown for a given toetsingsinkomen.
 * Parameters can be extended as the UI adds more inputs.
 */
export function calculateToeslagen(
  toetsingsinkomen: number,
  options?: {
    aantalKinderen?: number;
  }
): ToeslagenBreakdown {
  const zorg = calcZorgtoeslag(toetsingsinkomen);
  const huur = calcHuurtoeslag(toetsingsinkomen);
  const kind = calcKindgebondenBudget(toetsingsinkomen, options?.aantalKinderen ?? 0);

  return {
    zorg,
    huur,
    kind,
    totaalPerMaand: zorg.perMaand + huur.perMaand + kind.perMaand,
    totaalPerJaar: zorg.bedrag + huur.bedrag + kind.bedrag,
  };
}
