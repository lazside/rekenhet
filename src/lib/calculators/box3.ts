/**
 * Box 3 (Vermogensrendementsheffing) Calculator — 2026
 *
 * Split-rate system: banktegoeden (savings) at low fictional return,
 * overige bezittingen (investments) at higher fictional return.
 * Heffingsvrij vermogen: €57.000 (2026).
 */

export interface Box3Input {
  sparen: number;       // banktegoeden
  beleggen: number;     // overige bezittingen (aandelen, crypto, etc.)
  schulden: number;     // drempel: €3.700, daarboven 6,01% rekenen
  alleenstaand: boolean; // true=€57.000, false=€114.000
}

export interface Box3Resultaat {
  rendementsgrondslag: number;
  heffingsvrij: number;
  grondslagSparen: number;
  grondslagBeleggen: number;
  fictiefRendementSparen: number;
  fictiefRendementBeleggen: number;
  totaalFictief: number;
  belasting: number;
  effectiefTarief: number;
  totaalVermogen: number;
}

const RENDEMENT_SPAREN = 0.0152;  // 1.52% (2026)
const RENDEMENT_BELEGGEN = 0.0604; // 6.04% (2026)
const HEFFINGSVRIJ_ENKEL = 57000;
const HEFFINGSVRIJ_DUBBEL = 114000;
const SCHULDEN_DREMPEL = 3700;
const SCHULDEN_FACTOR = 0.0601;
const BOX3_TARIEF = 0.36; // 36% (2026)

export function berekenBox3(input: Box3Input): Box3Resultaat {
  const heffingsvrij = input.alleenstaand ? HEFFINGSVRIJ_ENKEL : HEFFINGSVRIJ_DUBBEL;
  const schuldAftrekbaar = Math.max(0, input.schulden - SCHULDEN_DREMPEL) * SCHULDEN_FACTOR;
  const totaalVermogen = input.sparen + input.beleggen;

  // Split rendementsgrondslag
  const rendementsgrondslag = Math.max(0, totaalVermogen + schuldAftrekbaar - heffingsvrij);
  const aandeelSparen = rendementsgrondslag * (input.sparen / Math.max(1, totaalVermogen));
  const aandeelBeleggen = rendementsgrondslag * (input.beleggen / Math.max(1, totaalVermogen));

  const fictiefSparen = aandeelSparen * RENDEMENT_SPAREN;
  const fictiefBeleggen = aandeelBeleggen * RENDEMENT_BELEGGEN;
  const totaalFictief = fictiefSparen + fictiefBeleggen;
  const belasting = totaalFictief * BOX3_TARIEF;

  return {
    rendementsgrondslag: Math.round(rendementsgrondslag),
    heffingsvrij,
    grondslagSparen: Math.round(aandeelSparen),
    grondslagBeleggen: Math.round(aandeelBeleggen),
    fictiefRendementSparen: Math.round(fictiefSparen),
    fictiefRendementBeleggen: Math.round(fictiefBeleggen),
    totaalFictief: Math.round(totaalFictief),
    belasting: Math.round(belasting),
    effectiefTarief: Math.round((belasting / Math.max(1, totaalFictief)) * 100),
    totaalVermogen,
  };
}
