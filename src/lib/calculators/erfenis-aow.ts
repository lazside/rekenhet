/**
 * Schenk- en erfbelasting calculator — 2026
 *
 * Tariefgroepen:
 *   1: Partners en kinderen
 *   1A: Kleinkinderen
 *   2: Broers/zussen/derden
 *
 * Vrijstellingen (2026):
 *   - Partner: € 723.000
 *   - Kind: € 31.000
 *   - Overig (eenmalig studie/verbouwing): € 66.000
 *   - Kleinkinderen/overig: € 2.500
 */

export type Tariefgroep = "partner" | "kind" | "kleinkind" | "overig";

export interface SchenkingInput {
  bedrag: number;
  tariefgroep: Tariefgroep;
  isErfenis: boolean;
  jaar: number;
}

export interface SchenkingResultaat {
  vrijstelling: number;
  belastbaar: number;
  belasting: number;
  effectiefTarief: number;
  tariefPercentage: number;
  tips: string[];
}

const VRIJSTELLINGEN: Record<Tariefgroep, { schenking: number; erven: number }> = {
  partner:   { schenking: 0, erven: 723000 },   // schenking partner is altijd belast (behalve eigen woning)
  kind:      { schenking: 31000, erven: 31000 },
  kleinkind: { schenking: 2500, erven: 2500 },
  overig:    { schenking: 2500, erven: 2500 },
};

const EENMALIGE_VERBOUW_VRIJSTELLING = 66000;

const TARIEF_SCHIJVEN: Record<Tariefgroep, { grens: number; tarief: number }[]> = {
  partner:   [{ grens: 152000, tarief: 0.10 }, { grens: Infinity, tarief: 0.20 }],
  kind:      [{ grens: 152000, tarief: 0.10 }, { grens: Infinity, tarief: 0.20 }],
  kleinkind: [{ grens: 152000, tarief: 0.18 }, { grens: Infinity, tarief: 0.36 }],
  overig:    [{ grens: 152000, tarief: 0.30 }, { grens: Infinity, tarief: 0.40 }],
};

export function berekenSchenking(input: SchenkingInput): SchenkingResultaat {
  const { bedrag, tariefgroep, isErfenis } = input;
  const vrijstelling = isErfenis
    ? VRIJSTELLINGEN[tariefgroep].erven
    : tariefgroep === "partner" ? 0 : VRIJSTELLINGEN[tariefgroep].schenking;

  const belastbaar = Math.max(0, bedrag - vrijstelling);
  const schijven = TARIEF_SCHIJVEN[tariefgroep];
  let belasting = 0;
  let rest = belastbaar;

  for (const schijf of schijven) {
    const deel = Math.min(rest, schijf.grens);
    belasting += deel * schijf.tarief;
    rest -= deel;
    if (rest <= 0) break;
  }

  belasting = Math.round(belasting);
  const effectiefTarief = belastbaar > 0 ? Math.round((belasting / belastbaar) * 10000) / 100 : 0;

  const tips: string[] = [];
  if (!isErfenis && tariefgroep === "kind") {
    const jaarlijkseVrijstelling = VRIJSTELLINGEN.kind.schenking;
    if (bedrag > jaarlijkseVrijstelling * 2) {
      const jaren = Math.ceil(bedrag / jaarlijkseVrijstelling);
      const perJaar = Math.ceil(bedrag / jaren);
      const belastingGespreid = Math.max(0, perJaar - jaarlijkseVrijstelling) * TARIEF_SCHIJVEN.kind[0].tarief * jaren;
      const besparing = belasting - belastingGespreid;
      if (besparing > 0) {
        tips.push(`Tip: Door de schenking over ${jaren} jaar te spreiden (€${perJaar.toLocaleString("nl-NL")}/jr) kun je ongeveer €${besparing.toLocaleString("nl-NL")} belasting besparen.`);
      }
    }
  }

  return {
    vrijstelling: Math.round(vrijstelling),
    belastbaar: Math.round(belastbaar),
    belasting,
    effectiefTarief,
    tariefPercentage: belastbaar > 0 ? schijven[0].tarief * 100 : 0,
    tips,
  };
}

/**
 * AOW-leeftijd calculator
 * Gebaseerd op de wettelijke tabel (2026+: 67 jaar en 3 maanden, daarna gekoppeld aan levensverwachting)
 */
export interface AowInput {
  geboortedatum: string; // "YYYY-MM-DD"
}

export interface AowResultaat {
  aowLeeftijd: string;
  aowDatum: string;
  maandenTotAow: number;
  jarenTotAow: number;
  opmerking: string;
}

const AOW_LEEFTIJDEN: { totJaar: number; leeftijdJaren: number; leeftijdMaanden: number }[] = [
  { totJaar: 2024, leeftijdJaren: 67, leeftijdMaanden: 0 },
  { totJaar: 2025, leeftijdJaren: 67, leeftijdMaanden: 3 },
  { totJaar: 2026, leeftijdJaren: 67, leeftijdMaanden: 3 },
  { totJaar: 2027, leeftijdJaren: 67, leeftijdMaanden: 3 },
  { totJaar: 2028, leeftijdJaren: 67, leeftijdMaanden: 3 },
  { totJaar: 2029, leeftijdJaren: 67, leeftijdMaanden: 3 },
  { totJaar: 2030, leeftijdJaren: 67, leeftijdMaanden: 3 },
  { totJaar: 2031, leeftijdJaren: 67, leeftijdMaanden: 6 },
  { totJaar: 2032, leeftijdJaren: 67, leeftijdMaanden: 6 },
  { totJaar: 2033, leeftijdJaren: 67, leeftijdMaanden: 6 },
  { totJaar: 2034, leeftijdJaren: 67, leeftijdMaanden: 9 },
  { totJaar: 2035, leeftijdJaren: 67, leeftijdMaanden: 9 },
  { totJaar: 2036, leeftijdJaren: 67, leeftijdMaanden: 9 },
  { totJaar: 2037, leeftijdJaren: 67, leeftijdMaanden: 9 },
  { totJaar: 2038, leeftijdJaren: 67, leeftijdMaanden: 9 },
  { totJaar: 2039, leeftijdJaren: 68, leeftijdMaanden: 0 },
  { totJaar: 2040, leeftijdJaren: 68, leeftijdMaanden: 0 },
];

export function berekenAow(input: AowInput): AowResultaat {
  const geb = new Date(input.geboortedatum);
  const vandaag = new Date();
  const leeftijdJaren = vandaag.getFullYear() - geb.getFullYear();
  const aowJaar = geb.getFullYear() + 67;

  const entry = AOW_LEEFTIJDEN.find((e) => e.totJaar >= aowJaar) || AOW_LEEFTIJDEN[AOW_LEEFTIJDEN.length - 1];
  const aowJaren = entry.leeftijdJaren;
  const aowMaanden = entry.leeftijdMaanden;

  const aowDatum = new Date(geb.getFullYear() + aowJaren, geb.getMonth() + aowMaanden, geb.getDate());
  const msTotAow = aowDatum.getTime() - vandaag.getTime();
  const maandenTotAow = Math.max(0, Math.round(msTotAow / (1000 * 60 * 60 * 24 * 30.44)));
  const jarenTotAow = Math.floor(maandenTotAow / 12);

  return {
    aowLeeftijd: `${aowJaren} jaar en ${aowMaanden} maanden`,
    aowDatum: aowDatum.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }),
    maandenTotAow,
    jarenTotAow,
    opmerking: `Je AOW-leeftijd wordt ${aowJaren} jaar en ${aowMaanden} maanden, gebaseerd op de huidige wetgeving.`,
  };
}
