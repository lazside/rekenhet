/**
 * FIRE Calculator — Financial Independence, Retire Early
 *
 * Models: portfolio growth with 2% inflation drag,
 * withdrawal rate, and target milestone year.
 */

export interface FireInput {
  huidigVermogen: number;
  maandelijkseInleg: number;
  jaarlijksRendement: number; // e.g., 7 for 7%
  inflatie: number;           // e.g., 2 for 2%
  jaarKosten: number;         // annual expenses in retirement
  veiligOpnamePct: number;    // e.g., 4 for 4%
}

export interface FireJaar {
  jaar: number;
  ingelegd: number;
  cumulatiefIngeld: number;
  waarde: number;
  reeleWaarde: number; // after inflation
  opnameJaar: number;
}

export interface FireResultaat {
  jaren: FireJaar[];
  fireGetal: number;
  bereiktInJaar: number | null;
  fireWaardeOpMoment: number;
  totaalIngelegd: number;
  maandelijkseOpname: number;
}

export function berekenFire(input: FireInput): FireResultaat {
  const {
    huidigVermogen,
    maandelijkseInleg,
    jaarlijksRendement,
    inflatie,
    jaarKosten,
    veiligOpnamePct,
  } = input;

  const fireGetal = Math.round(jaarKosten / (veiligOpnamePct / 100));
  const maandOpname = Math.round(jaarKosten / 12);
  const reeleFactor = 1 / (1 + inflatie / 100); // inflation discount per year

  const jaren: FireJaar[] = [];
  let waarde = huidigVermogen;
  let cumulatiefIngeld = huidigVermogen;
  let bereiktInJaar: number | null = null;

  for (let y = 1; y <= 50; y++) {
    // Monthly contributions with yearly compounding
    waarde = (waarde + maandelijkseInleg * 12) * (1 + jaarlijksRendement / 100);
    cumulatiefIngeld += maandelijkseInleg * 12;

    const reeleWaarde = Math.round(waarde * Math.pow(reeleFactor, y));
    const opnameJaar = Math.round(waarde * (veiligOpnamePct / 100));

    jaren.push({
      jaar: y,
      ingelegd: Math.round(maandelijkseInleg * 12),
      cumulatiefIngeld: Math.round(cumulatiefIngeld),
      waarde: Math.round(waarde),
      reeleWaarde,
      opnameJaar,
    });

    if (bereiktInJaar === null && waarde >= fireGetal) {
      bereiktInJaar = y;
    }
  }

  const fireOpMoment = bereiktInJaar ? jaren[bereiktInJaar - 1]?.waarde ?? 0 : 0;

  return {
    jaren,
    fireGetal,
    bereiktInJaar,
    fireWaardeOpMoment: Math.round(fireOpMoment),
    totaalIngelegd: Math.round(cumulatiefIngeld),
    maandelijkseOpname: maandOpname,
  };
}
