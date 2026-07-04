export function kwadratisch(a: number, b: number, c: number): { x1: number; x2: number; discriminant: number; oplossing: string } {
  const d = b * b - 4 * a * c;
  if (d > 0) { const sqrtD = Math.sqrt(d); return { x1: (-b + sqrtD) / (2 * a), x2: (-b - sqrtD) / (2 * a), discriminant: Math.round(d * 100) / 100, oplossing: "Twee reële oplossingen" }; }
  if (d === 0) return { x1: -b / (2 * a), x2: -b / (2 * a), discriminant: 0, oplossing: "Één reële oplossing" };
  return { x1: 0, x2: 0, discriminant: Math.round(d * 100) / 100, oplossing: "Geen reële oplossing (domein: complexe getallen)" };
}
export function breuken(aTeller: number, aNoemer: number, bTeller: number, bNoemer: number, bewerking: "+" | "-" | "×" | "÷"): { teller: number; noemer: number; decimaal: number } {
  let t = 0, n = 1;
  if (bewerking === "+") { t = aTeller * bNoemer + bTeller * aNoemer; n = aNoemer * bNoemer; }
  if (bewerking === "-") { t = aTeller * bNoemer - bTeller * aNoemer; n = aNoemer * bNoemer; }
  if (bewerking === "×") { t = aTeller * bTeller; n = aNoemer * bNoemer; }
  if (bewerking === "÷") { t = aTeller * bNoemer; n = aNoemer * bTeller; }
  return { teller: t, noemer: n, decimaal: Math.round((t / n) * 10000) / 10000 };
}
export function oppervlakteVolume(vorm: "vierkant" | "rechthoek" | "driehoek" | "cirkel" | "bol" | "kubus", ...d: number[]): { oppervlakte: number; omtrek: number; volume?: number } {
  if (vorm === "vierkant") return { oppervlakte: d[0] * d[0], omtrek: 4 * d[0] };
  if (vorm === "rechthoek") return { oppervlakte: d[0] * d[1], omtrek: 2 * (d[0] + d[1]) };
  if (vorm === "driehoek") return { oppervlakte: 0.5 * d[0] * d[1], omtrek: d[0] + d[1] + Math.sqrt(d[0] * d[0] + d[1] * d[1]) };
  if (vorm === "cirkel") return { oppervlakte: Math.round(Math.PI * d[0] * d[0] * 100) / 100, omtrek: Math.round(2 * Math.PI * d[0] * 100) / 100 };
  if (vorm === "kubus") return { oppervlakte: 6 * d[0] * d[0], omtrek: 12 * d[0], volume: d[0] * d[0] * d[0] };
  if (vorm === "bol") return { oppervlakte: Math.round(4 * Math.PI * d[0] * d[0] * 100) / 100, omtrek: 0, volume: Math.round((4 / 3) * Math.PI * d[0] * d[0] * d[0] * 100) / 100 };
  return { oppervlakte: 0, omtrek: 0 };
}
export function caloriebehoefte(geslacht: "man" | "vrouw", gewicht: number, lengte: number, leeftijd: number, activiteit: "weinig" | "matig" | "actief" | "sportief"): { rust: number; onderhoud: number; afvallen: number; aankomen: number } {
  const factoren: Record<string, number> = { weinig: 1.2, matig: 1.375, actief: 1.55, sportief: 1.725 };
  const bmr = geslacht === "man" ? 88.362 + 13.397 * gewicht + 4.799 * lengte - 5.677 * leeftijd : 447.593 + 9.247 * gewicht + 3.098 * lengte - 4.33 * leeftijd;
  const onderhoud = Math.round(bmr * factoren[activiteit]);
  return { rust: Math.round(bmr), onderhoud, afvallen: Math.round(onderhoud - 500), aankomen: Math.round(onderhoud + 500) };
}
export function ideaalGewicht(geslacht: "man" | "vrouw", lengteCm: number): { devine: number; robinson: number; miller: number } {
  const h = lengteCm - 152.4;
  return geslacht === "man"
    ? { devine: Math.round(50 + 2.3 * h), robinson: Math.round(52 + 1.9 * h), miller: Math.round(56.2 + 1.41 * h) }
    : { devine: Math.round(45.5 + 2.3 * h), robinson: Math.round(49 + 1.7 * h), miller: Math.round(53.1 + 1.36 * h) };
}
export function hartslagZones(leeftijd: number): { max: number; zone1Min: number; zone2Min: number; zone3Min: number; zone4Min: number; zone5Min: number } {
  const max = 220 - leeftijd;
  return { max, zone1Min: Math.round(max * 0.5), zone2Min: Math.round(max * 0.6), zone3Min: Math.round(max * 0.7), zone4Min: Math.round(max * 0.8), zone5Min: Math.round(max * 0.9) };
}
export function zwangerschap(
  input: string,
  mode: "laatste-menstruatie" | "uitgerekende-datum" = "laatste-menstruatie"
): {
  uitgerekendeDatum: string;
  trimester: string;
  trimesterNummer: 1 | 2 | 3;
  week: number;
  dag: number;
  wekenDagen: string;
  maand: number;
  conceptieDatum: string;
  percentage: number;
  dagenTotUitgerekend: number;
  dagenZwanger: number;
  foutmelding?: string;
} {
  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0);

  let start: Date;
  let due: Date;

  if (mode === "uitgerekende-datum") {
    due = new Date(input);
    if (isNaN(due.getTime())) return defaultZwangerschapError("Voer een geldige uitgerekende datum in.");
    due.setHours(0, 0, 0, 0);
    start = new Date(due);
    start.setDate(start.getDate() - 280);
  } else {
    start = new Date(input);
    if (isNaN(start.getTime())) return defaultZwangerschapError("Voer een geldige datum in.");
    start.setHours(0, 0, 0, 0);
    if (start > vandaag) return defaultZwangerschapError("De eerste dag van de laatste menstruatie kan niet in de toekomst liggen.");
    due = new Date(start);
    due.setDate(due.getDate() + 280);
  }

  const daysGone = Math.round((vandaag.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const dagenZwanger = Math.max(0, daysGone);
  const week = Math.max(0, Math.min(42, Math.floor(dagenZwanger / 7)));
  const dag = Math.max(0, dagenZwanger % 7);
  const wekenDagen = `${week}+${dag}`;
  const maand = Math.min(10, Math.max(1, Math.ceil((week + 1) / 4)));
  const percentage = Math.min(100, Math.round((dagenZwanger / 280) * 100));
  const dagenTotUitgerekend = Math.max(0, Math.round((due.getTime() - vandaag.getTime()) / (1000 * 60 * 60 * 24)));

  const conceptie = new Date(start);
  conceptie.setDate(conceptie.getDate() + 14);
  const conceptieDatum = conceptie.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

  const trimester = week <= 13 ? "Eerste trimester" : week <= 26 ? "Tweede trimester" : "Derde trimester";
  const trimesterNummer: 1 | 2 | 3 = week <= 13 ? 1 : week <= 26 ? 2 : 3;

  return {
    uitgerekendeDatum: due.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }),
    trimester,
    trimesterNummer,
    week: Math.max(1, week),
    dag,
    wekenDagen,
    maand,
    conceptieDatum,
    percentage,
    dagenTotUitgerekend,
    dagenZwanger,
  };
}

function defaultZwangerschapError(foutmelding: string): {
  uitgerekendeDatum: string;
  trimester: string;
  trimesterNummer: 1 | 2 | 3;
  week: number;
  dag: number;
  wekenDagen: string;
  maand: number;
  conceptieDatum: string;
  percentage: number;
  dagenTotUitgerekend: number;
  dagenZwanger: number;
  foutmelding: string;
} {
  return {
    uitgerekendeDatum: "—",
    trimester: "—",
    trimesterNummer: 1,
    week: 0,
    dag: 0,
    wekenDagen: "—",
    maand: 0,
    conceptieDatum: "—",
    percentage: 0,
    dagenTotUitgerekend: 0,
    dagenZwanger: 0,
    foutmelding,
  };
}
export function winstVerlies(omzet: number, inkoop: number, huur: number, personeel: number, overig: number): { winst: number; marge: number; kostenPct: number } {
  const kosten = inkoop + huur + personeel + overig; const winst = omzet - kosten;
  return { winst: Math.round(winst), marge: omzet > 0 ? Math.round((winst / omzet) * 10000) / 100 : 0, kostenPct: omzet > 0 ? Math.round((kosten / omzet) * 10000) / 100 : 0 };
}
export function zzpDagTarief(gewenstNettoJaar: number, werkdagenPerJaar: number, kostenPerMaand: number, btwPct: number): { dagtariefExcl: number; dagtariefIncl: number; maandOmzet: number; jaarOmzet: number } {
  const jaarKosten = kostenPerMaand * 12; const brutoNodig = gewenstNettoJaar + jaarKosten;
  const dagtariefExcl = Math.round(brutoNodig / werkdagenPerJaar);
  return { dagtariefExcl, dagtariefIncl: Math.round(dagtariefExcl * (1 + btwPct / 100)), maandOmzet: Math.round(brutoNodig / 12), jaarOmzet: Math.round(brutoNodig) };
}
export function investeringsaftrek(investering: number, type: "kleinschalig" | "milieu" | "energie"): { aftrek: number; besparing: number } {
  const pct = type === "kleinschalig" ? (investering > 2801 ? 0.28 : 0) : type === "milieu" ? 0.36 : 0.45;
  const aftrek = Math.round(investering * pct);
  return { aftrek, besparing: Math.round(aftrek * 0.255) };
}
export function omzetbelasting(omzetExcl: number, btwTarief: number, btwVoorbelasting: number): { btwAfTeDragen: number; totaalTeBetalen: number; btwFacturen: number } {
  const btwFacturen = Math.round(omzetExcl * (btwTarief / 100));
  return { btwAfTeDragen: Math.round(btwFacturen - btwVoorbelasting), totaalTeBetalen: Math.round(btwFacturen - btwVoorbelasting), btwFacturen };
}
export function vakantiedagen(dienstverband: "fulltime" | "parttime", urenPerWeek: number): { wettelijk: number; bovenwettelijk: number; totaal: number; dagenPerMaand: number } {
  const wettelijk = Math.round(urenPerWeek * 4 * 12 / 8);
  const bovenwettelijk = Math.round(wettelijk * 0.25);
  return { wettelijk, bovenwettelijk, totaal: wettelijk + bovenwettelijk, dagenPerMaand: Math.round((wettelijk + bovenwettelijk) / 12) };
}
export function ontslagvergoeding(maandSalaris: number, dienstjaren: number, leeftijd: number): { transitie: number; billijke: number } {
  const transitie = Math.round(maandSalaris * dienstjaren * (1/3));
  const billijke = Math.round(leeftijd > 50 ? transitie * 1.5 : transitie);
  return { transitie, billijke };
}
export function inflatieCorrigeren(bedrag: number, jaarVan: number, jaarNaar: number, inflatiePct: number): { gecorrigeerd: number; verlies: number; factor: number } {
  const jaren = jaarNaar - jaarVan; const factor = Math.pow(1 + inflatiePct / 100, jaren);
  return { gecorrigeerd: Math.round(bedrag * factor), verlies: Math.round(bedrag * factor - bedrag), factor: Math.round(factor * 100) / 100 };
}
