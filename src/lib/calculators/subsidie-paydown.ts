/**
 * ISDE Subsidie Wijzer — 2026 flat-rate subsidies
 * Bron: RVO (Rijksdienst voor Ondernemend Nederland)
 */
export type WarmtepompType = "hybride" | "volledig" | "full-electric";
export type IsolatieType = "hr++" | "dak" | "vloer" | "spouw";

export interface IsdeInput {
  warmtepompType?: WarmtepompType;
  warmtepompKw?: number;
  isolatieType?: IsolatieType;
  isolatieM2?: number;
}

export interface IsdeResultaat {
  warmtepompSubsidie: number;
  isolatieSubsidie: number;
  totaal: number;
  details: string[];
}

const WARMTEPOMP_TARIEVEN: Record<WarmtepompType, { perKw: number; max: number; minKw: number }> = {
  hybride:     { perKw: 575, max: 3750, minKw: 2 },
  volledig:    { perKw: 975, max: 7500, minKw: 3 },
  "full-electric": { perKw: 975, max: 7500, minKw: 3 },
};

const ISOLATIE_TARIEVEN: Record<IsolatieType, { perM2: number; max: number }> = {
  "hr++": { perM2: 35, max: 2800 },
  dak:    { perM2: 30, max: 2400 },
  vloer:  { perM2: 25, max: 2000 },
  spouw:  { perM2: 20, max: 1600 },
};

export function berekenIsde(input: IsdeInput): IsdeResultaat {
  const details: string[] = [];
  let warmtepompSubsidie = 0;

  if (input.warmtepompType && input.warmtepompKw) {
    const tar = WARMTEPOMP_TARIEVEN[input.warmtepompType];
    if (input.warmtepompKw >= tar.minKw) {
      warmtepompSubsidie = Math.min(input.warmtepompKw * tar.perKw, tar.max);
      details.push(`Warmtepomp (${input.warmtepompType}): ${input.warmtepompKw} kW × €${tar.perKw}/kW = €${Math.round(warmtepompSubsidie)} (max €${tar.max})`);
    } else {
      details.push(`Warmtepomp: minimaal ${tar.minKw} kW vereist voor subsidie`);
    }
  }

  let isolatieSubsidie = 0;
  if (input.isolatieType && input.isolatieM2) {
    const tar = ISOLATIE_TARIEVEN[input.isolatieType];
    isolatieSubsidie = Math.min(input.isolatieM2 * tar.perM2, tar.max);
    details.push(`Isolatie (${input.isolatieType}): ${input.isolatieM2} m² × €${tar.perM2}/m² = €${Math.round(isolatieSubsidie)} (max €${tar.max})`);
  }

  return {
    warmtepompSubsidie: Math.round(warmtepompSubsidie),
    isolatieSubsidie: Math.round(isolatieSubsidie),
    totaal: Math.round(warmtepompSubsidie + isolatieSubsidie),
    details,
  };
}

/**
 * Extra Mortgage Paydown Calculator
 * Shows the impact of an extra lump-sum payment on an annuity mortgage.
 */
export interface PaydownInput {
  hoofdsom: number;
  rentePct: number;
  looptijdJaren: number;
  extraStorting: number;
  stortingMomentJaar?: number; // year (1-based) when extra payment is made
}

export interface PaydownJaar {
  jaar: number;
  restSchuldZonder: number;
  restSchuldMet: number;
  betaaldZonder: number;
  betaaldMet: number;
  bespaardeRente: number;
}

export interface PaydownResultaat {
  jaren: PaydownJaar[];
  origineleMaandlast: number;
  nieuweMaandlast: number;
  besparingPerMaand: number;
  totaleBesparing: number;
  jarenEerderKlaar: number;
  nieuwEindJaar: number;
}

export function berekenPaydown(input: PaydownInput): PaydownResultaat {
  const { hoofdsom, rentePct, looptijdJaren, extraStorting, stortingMomentJaar = 1 } = input;
  const r = rentePct / 100 / 12;
  const n = looptijdJaren * 12;

  // Annuity formula: M = P × r(1+r)^n / ((1+r)^n - 1)
  const maandLast = hoofdsom * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const jaren: PaydownJaar[] = [];

  let restZonder = hoofdsom;
  let restMet = hoofdsom;
  let totaalBetaaldZonder = 0;
  let totaalBetaaldMet = 0;
  let metKlaarJaar = looptijdJaren;

  for (let y = 1; y <= looptijdJaren; y++) {
    // Standard trajectory
    for (let m = 0; m < 12; m++) {
      if (restZonder <= 0) break;
      const renteM = restZonder * r;
      const aflossingM = maandLast - renteM;
      restZonder = Math.max(0, restZonder - aflossingM);
      totaalBetaaldZonder += maandLast;
    }

    // Accelerated trajectory
    const isStortingsJaar = y === stortingMomentJaar;
    for (let m = 0; m < 12; m++) {
      if (restMet <= 0) break;
      if (isStortingsJaar && m === 0) {
        restMet = Math.max(0, restMet - extraStorting);
      }
      if (restMet <= 0) { metKlaarJaar = y; break; }
      const renteM = restMet * r;
      const aflossingM = maandLast - renteM;
      restMet = Math.max(0, restMet - aflossingM);
      totaalBetaaldMet += maandLast;
    }

    jaren.push({
      jaar: y,
      restSchuldZonder: Math.round(restZonder),
      restSchuldMet: Math.round(restMet),
      betaaldZonder: Math.round(totaalBetaaldZonder),
      betaaldMet: Math.round(totaalBetaaldMet),
      bespaardeRente: Math.round(totaalBetaaldMet - totaalBetaaldZonder),
    });

    if (restZonder <= 0 && restMet <= 0) break;
  }

  const totaleBesparing = Math.round(totaalBetaaldZonder - totaalBetaaldMet);
  const jarenEerderKlaar = Math.max(0, looptijdJaren - metKlaarJaar);

  return {
    jaren,
    origineleMaandlast: Math.round(maandLast * 100) / 100,
    nieuweMaandlast: Math.round(maandLast * 100) / 100, // same monthly payment, fewer months
    besparingPerMaand: 0,
    totaleBesparing,
    jarenEerderKlaar,
    nieuwEindJaar: metKlaarJaar,
  };
}
