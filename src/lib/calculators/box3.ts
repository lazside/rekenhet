/**
 * Box 3 (Vermogensrendementsheffing) Calculator — 2026
 *
 * Forfaitair stelsel: banktegoeden (sparen) tegen laag fictief rendement,
 * overige bezittingen (beleggen) tegen hoger fictief rendement.
 * Schulden (na drempel) worden AFGETROKKEN van de rendementsgrondslag.
 * Heffingsvrij vermogen: €57.000 (2026).
 *
 * Let op: dit is het forfaitaire stelsel. Vanaf 2026 mogen belastingplichtigen
 * ook kiezen voor het werkelijke rendement (box 3-realisatiestelsel).
 */

export interface Box3Input {
  sparen: number;       // banktegoeden
  beleggen: number;     // overige bezittingen (aandelen, crypto, etc.)
  schulden: number;     // schulden (drempel: €3.700 wordt niet meegerekend)
  alleenstaand: boolean; // true=€57.000 heffingsvrij, false=€114.000
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
  aftrekbareSchulden: number;
}

const RENDEMENT_SPAREN = 0.0152;  // 1.52% (2026, forfaitair)
const RENDEMENT_BELEGGEN = 0.0604; // 6.04% (2026, forfaitair)
const HEFFINGSVRIJ_ENKEL = 57000;
const HEFFINGSVRIJ_DUBBEL = 114000;
const SCHULDEN_DREMPEL = 3700;
const BOX3_TARIEF = 0.36; // 36% (2026)

export function berekenBox3(input: Box3Input): Box3Resultaat {
  const heffingsvrij = input.alleenstaand ? HEFFINGSVRIJ_ENKEL : HEFFINGSVRIJ_DUBBEL;
  const totaalVermogen = input.sparen + input.beleggen;

  // Step 1: Schulden aftrekken (alleen boven de drempel, géén factor)
  const aftrekbareSchulden = Math.max(0, input.schulden - SCHULDEN_DREMPEL);

  // Step 2: Rendementsgrondslag = bezittingen - aftrekbare schulden - heffingsvrij
  const rendementsgrondslag = Math.max(0, totaalVermogen - aftrekbareSchulden - heffingsvrij);

  // Step 3: Proportioneel splitsen over sparen en beleggen
  const aandeelSparen = rendementsgrondslag * (input.sparen / Math.max(1, totaalVermogen));
  const aandeelBeleggen = rendementsgrondslag * (input.beleggen / Math.max(1, totaalVermogen));

  // Step 4: Fictief rendement per categorie
  const fictiefSparen = aandeelSparen * RENDEMENT_SPAREN;
  const fictiefBeleggen = aandeelBeleggen * RENDEMENT_BELEGGEN;
  const totaalFictief = fictiefSparen + fictiefBeleggen;

  // Step 5: 36% belasting over fictief rendement
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
    aftrekbareSchulden: Math.round(aftrekbareSchulden),
  };
}
