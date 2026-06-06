/**
 * Kindgebonden budget & kinderbijslag calculator — 2026 SVB-tarieven
 *
 * Kinderbijslag vaste kwartaalbedragen per leeftijdsgroep (SVB 2026):
 *   0-5  jaar: € 279,00 / kwartaal
 *   6-11 jaar: € 338,75 / kwartaal
 *   12-17 jaar: € 399,75 / kwartaal
 */
export interface Kind {
  id: number;
  leeftijd: number;
}

const KINDERBIJSLAG_PER_LEEFTIJD: Record<string, number> = {
  "0-5": 279.0,
  "6-11": 338.75,
  "12-17": 399.75,
};

export function getKinderbijslagPerKwartaal(leeftijd: number): number {
  if (leeftijd <= 5) return KINDERBIJSLAG_PER_LEEFTIJD["0-5"];
  if (leeftijd <= 11) return KINDERBIJSLAG_PER_LEEFTIJD["6-11"];
  return KINDERBIJSLAG_PER_LEEFTIJD["12-17"];
}

export function getKinderbijslagPerMaand(leeftijd: number): number {
  return Math.round((getKinderbijslagPerKwartaal(leeftijd) / 3) * 100) / 100;
}

export interface KinderbijslagResultaat {
  kinderen: {
    id: number;
    leeftijd: number;
    perKwartaal: number;
    perMaand: number;
  }[];
  totaalPerKwartaal: number;
  totaalPerMaand: number;
}

export function berekenKinderbijslag(kinderen: Kind[]): KinderbijslagResultaat {
  const items = kinderen.map((k) => {
    const perKwartaal = getKinderbijslagPerKwartaal(k.leeftijd);
    const perMaand = Math.round((perKwartaal / 3) * 100) / 100;
    return { id: k.id, leeftijd: k.leeftijd, perKwartaal, perMaand };
  });
  return {
    kinderen: items,
    totaalPerKwartaal: Math.round(items.reduce((s, i) => s + i.perKwartaal, 0) * 100) / 100,
    totaalPerMaand: Math.round(items.reduce((s, i) => s + i.perMaand, 0) * 100) / 100,
  };
}

/**
 * Eenvoudige kinderalimentatie-schatting (indicatie!)
 * Op basis van het NIBUD-rekenmodel: ~15% van netto inkomen per kind,
 * gedeeld door 2 (beide ouders dragen bij).
 */
export function schatAlimentatie(
  nettoInkomenOuder1: number,
  nettoInkomenOuder2: number,
  aantalKinderen: number
): {
  perKindPerMaand: number;
  totaalPerMaand: number;
  ouder1Bijdrage: number;
  ouder2Bijdrage: number;
} {
  const totaalInkomen = nettoInkomenOuder1 + nettoInkomenOuder2;
  const behoeftePerKind = Math.round(totaalInkomen * 0.15 / 12 / aantalKinderen);
  const totaleBehoefte = behoeftePerKind * aantalKinderen;
  const aandeel1 = Math.round(totaleBehoefte * (nettoInkomenOuder1 / totaalInkomen));
  const aandeel2 = Math.round(totaleBehoefte * (nettoInkomenOuder2 / totaalInkomen));
  return {
    perKindPerMaand: behoeftePerKind,
    totaalPerMaand: totaleBehoefte,
    ouder1Bijdrage: aandeel1,
    ouder2Bijdrage: aandeel2,
  };
}
