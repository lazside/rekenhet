/**
 * MRB (Motorrijtuigenbelasting / Wegenbelasting) calculation engine.
 *
 * Officiële structuur 2026:
 *   MRB/kwartaal = (nationale_tarief × gewichtseenheden × opcenten_factor × brandstoftoeslag)
 *
 * Waarbij:
 *   - gewichtseenheden = Math.ceil(gewicht_kg / 100)
 *   - opcenten_factor = 1 + (provinciaal_opcenten_pct / 100)
 *   - brandstoftoeslag = 1.19 voor diesel met fijnstoftoeslag, anders 1.0
 *   - EV 2026: 75% gewichtskorting (effectief gewicht × 0.25)
 */

// ─── Nationale basistarieven per 100kg per kwartaal (2026) ───

const NATIONAL_RATES = {
  benzine: 6.28,
  diesel: 13.21,
  lpg: 8.51,
} as const;

// ─── Provinciale opcenten 2026 (percentage bovenop nationale tarief) ──

const OPCENTEN: Record<string, { provincie: string; pct: number }> = {
  "zuid-holland":   { provincie: "Zuid-Holland",   pct: 96.0 },
  "noord-holland":  { provincie: "Noord-Holland",  pct: 84.5 },
  utrecht:          { provincie: "Utrecht",        pct: 84.0 },
  gelderland:       { provincie: "Gelderland",     pct: 75.8 },
  "noord-brabant":  { provincie: "Noord-Brabant",  pct: 77.6 },
  overijssel:       { provincie: "Overijssel",     pct: 69.4 },
  limburg:          { provincie: "Limburg",        pct: 70.9 },
  flevoland:        { provincie: "Flevoland",      pct: 71.1 },
  fryslan:          { provincie: "Fryslân",        pct: 67.7 },
  groningen:        { provincie: "Groningen",      pct: 64.5 },
  drenthe:          { provincie: "Drenthe",        pct: 65.4 },
  zeeland:          { provincie: "Zeeland",        pct: 66.5 },
};

// ─── Fijnstoftoeslag ──────────────────────────────────────────
// 19% opslag op dieselvoertuigen zonder/oude roetfilter

const FIJNSTOF_FACTOR = 1.19;

// ─── EV gewichtskorting 2026 ──────────────────────────────────
// 75% korting op het gewicht (EV's betalen over 25% van hun gewicht)

const EV_WEIGHT_RATIO = 0.25;

// ─── OLDtimer kwarttarief ─────────────────────────────────────
// ≥35 jaar: 25% van normale tarief (max. tot bepaalde grens)

const OLDTIMER_FACTOR = 0.25;

// ─── Bepaal brandstoftype ─────────────────────────────────────

type Fuel = "benzine" | "diesel" | "lpg" | "elektriciteit";

function determineFuel(brandstof: string, isEv: boolean, isPhev: boolean): Fuel {
  if (isEv) return "elektriciteit";
  if (isPhev) return "benzine"; // PHEV betaalt benzinetarief
  const f = brandstof.toLowerCase();
  if (f.includes("diesel")) return "diesel";
  if (f === "lpg" || f.includes("lpg")) return "lpg";
  return "benzine";
}

// ─── Bepaal effectief gewicht (incl. EV-korting) ──────────────

function effectiveWeight(weightKg: number, fuel: Fuel): number {
  if (fuel === "elektriciteit") {
    // 2026: EV's betalen over 25% van hun gewicht (75% korting)
    return Math.round(weightKg * EV_WEIGHT_RATIO);
  }
  return weightKg;
}

// ─── Bepaal gewichtseenheden (schijven van 100kg) ──────────────

function weightUnits(weightKg: number): number {
  return Math.max(1, Math.ceil(weightKg / 100));
}

// ─── Openbare functies ─────────────────────────────────────────

export interface MrbResult {
  bedrag: number;
  label: string;
  details: string;
}

export interface ProvincieInfo {
  provincie: string;
  slug: string;
  opcentenPct: number;
}

/**
 * Geef alle provincies met opcenten terug (t.b.v. UI).
 */
export function getProvincies(): ProvincieInfo[] {
  return Object.entries(OPCENTEN).map(([slug, info]) => ({
    slug,
    provincie: info.provincie,
    opcentenPct: info.pct,
  }));
}

/**
 * Bereken de MRB (motorrijtuigenbelasting).
 *
 * @param massaLedig - ledig voertuiggewicht in kg
 * @param brandstof - "Benzine" | "Diesel" | "LPG" | "Elektriciteit"
 * @param provincieSlug - provincie slug (bv. "zuid-holland")
 * @param hasFijnstoftoeslag - true als dieselfijnstoftoeslag van toepassing is
 * @param isEV - true als het een elektrische auto is
 * @param isPHEV - true als het een plug-in hybride is
 * @param isOldtimer - true als ≥35 jaar oud
 */
export function calculateMrb(
  massaLedig: number,
  brandstof: string,
  provincieSlug: string,
  hasFijnstoftoeslag: boolean,
  isEV: boolean,
  isPHEV: boolean,
  isOldtimer: boolean,
): MrbResult {
  // 1. Bepaal brandstof
  const fuel = determineFuel(brandstof, isEV, isPHEV);

  // 2. Bepaal provinciaal opcenten
  const prov = OPCENTEN[provincieSlug];
  if (!prov) return { bedrag: 0, label: "Onbekende provincie", details: "" };
  const opcentenFactor = 1 + prov.pct / 100;

  // 3. OLDtimer check
  const isOldtimerActive = isOldtimer && fuel !== "diesel";

  // 4. Nationaal basistarief per 100kg per kwartaal
  let rate: number;
  let fuelLabel: string;

  if (fuel === "elektriciteit") {
    rate = NATIONAL_RATES.benzine;
    fuelLabel = "elektrisch";
  } else if (fuel === "diesel") {
    rate = NATIONAL_RATES.diesel;
    fuelLabel = hasFijnstoftoeslag ? "diesel + fijnstoftoeslag" : "diesel";
  } else if (fuel === "lpg") {
    rate = NATIONAL_RATES.lpg;
    fuelLabel = "LPG";
  } else {
    rate = NATIONAL_RATES.benzine;
    fuelLabel = "benzine";
  }

  // 5. Effectief gewicht (EV krijgt 75% gewichtskorting in 2026)
  const effWeight = effectiveWeight(massaLedig, fuel);
  const eenheden = weightUnits(effWeight);

  // 6. Basisberekening: eenheden × tarief × opcenten × brandstoftoeslag
  let bedragPerKwartaal = eenheden * rate * opcentenFactor;

  // 7. Fijnstoftoeslag (alleen diesel)
  if (fuel === "diesel" && hasFijnstoftoeslag) {
    bedragPerKwartaal *= FIJNSTOF_FACTOR;
  }

  // 8. OLDtimer kwarttarief (≥35 jaar, benzine/LPG)
  if (isOldtimerActive) {
    bedragPerKwartaal *= OLDTIMER_FACTOR;
  }

  // 9. Afronden
  bedragPerKwartaal = Math.round(bedragPerKwartaal * 100) / 100;

  // 10. Detailstring
  const parts: string[] = [`${eenheden}× eenheid × €${rate.toFixed(2)} tarief`];
  if (opcentenFactor > 1) parts.push(`${prov.pct}% opcenten`);
  if (fuel === "elektriciteit") parts.push("75% EV-gewichtskorting");
  if (fuel === "diesel" && hasFijnstoftoeslag) parts.push("19% fijnstoftoeslag");
  if (isOldtimerActive) parts.push("kwarttarief oldtimer");
  if (massaLedig !== effWeight) parts.push(`effectief gewicht: ${effWeight}kg`);

  return {
    bedrag: bedragPerKwartaal,
    label: `MRB ${prov.provincie} (${fuelLabel})`,
    details: parts.join(", "),
  };
}

/**
 * Bereken jaarbedrag op basis van kwartaalbedrag.
 */
export function annualMrb(kwartaalBedrag: number): number {
  return Math.round(kwartaalBedrag * 4);
}

/**
 * Bijtelling 2026 — niet MRB maar wel gekoppeld in de UI.
 */
export function calculateBijtelling(
  catalogusPrijs: number,
  co2Uitstoot: number,
  isEv: boolean
): { bijtellingPerJaar: number; bijtellingPerMaand: number; percentage: number } {
  let pct: number;
  if (isEv) {
    pct = co2Uitstoot <= 0 ? 17 : 22;
  } else {
    pct = 22;
  }
  const bijtelling = catalogusPrijs * (pct / 100);
  return {
    bijtellingPerJaar: Math.round(bijtelling),
    bijtellingPerMaand: Math.round(bijtelling / 12),
    percentage: pct,
  };
}
