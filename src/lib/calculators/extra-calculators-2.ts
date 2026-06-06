// ─── Wiskunde (10) ─────────────────────────────────────────────

export function worteltrekken(n: number): { wortel: number; kwadraat: number } {
  return { wortel: Math.sqrt(n), kwadraat: n * n };
}
export function machtsverheffen(basis: number, exponent: number): number {
  return Math.pow(basis, exponent);
}
export function breukVereenvoudigen(teller: number, noemer: number): { teller: number; noemer: number; decimaal: number } {
  let a = Math.abs(teller), b = Math.abs(noemer);
  while (b) { [a, b] = [b, a % b]; }
  const ggd = a;
  return { teller: teller / ggd, noemer: noemer / ggd, decimaal: Math.round((teller / noemer) * 1e6) / 1e6 };
}
export function decimaalNaarBreuk(decimaal: number): { teller: number; noemer: number } {
  const prec = 1e6;
  const teller = Math.round(decimaal * prec);
  let a = Math.abs(teller), b = prec;
  while (b) { [a, b] = [b, a % b]; }
  const ggd = a;
  return { teller: teller / ggd, noemer: prec / ggd };
}
export function kgv(a: number, b: number): number {
  let x = Math.abs(a), y = Math.abs(b);
  while (y) { [x, y] = [y, x % y]; }
  return (Math.abs(a) / x) * Math.abs(b);
}
export function ggd(a: number, b: number): number {
  let x = Math.abs(a), y = Math.abs(b);
  while (y) { [x, y] = [y, x % y]; }
  return x;
}
export function richtingsCoefficient(x1: number, y1: number, x2: number, y2: number): { rc: number; intercept: number } {
  const rc = x2 !== x1 ? (y2 - y1) / (x2 - x1) : 0;
  return { rc: Math.round(rc * 100) / 100, intercept: Math.round((y1 - rc * x1) * 100) / 100 };
}
export function afstandTussenPunten(x1: number, y1: number, x2: number, y2: number): number {
  return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 100) / 100;
}
export function driehoekOppervlakte(basis: number, hoogte: number): number {
  return Math.round(0.5 * basis * hoogte * 100) / 100;
}
export function cirkelBerekeningen(straal: number): { omtrek: number; oppervlakte: number } {
  return { omtrek: Math.round(2 * Math.PI * straal * 100) / 100, oppervlakte: Math.round(Math.PI * straal * straal * 100) / 100 };
}

// ─── Algemeen — Datum/Tijd (8) ────────────────────────────────

export function leeftijdBerekenen(geboorteDatum: string): { jaren: number; maanden: number; dagen: number; totaalDagen: number } {
  const start = new Date(geboorteDatum); const vandaag = new Date();
  let jaren = vandaag.getFullYear() - start.getFullYear();
  let maanden = vandaag.getMonth() - start.getMonth();
  let dagen = vandaag.getDate() - start.getDate();
  if (dagen < 0) { maanden--; dagen += new Date(vandaag.getFullYear(), vandaag.getMonth(), 0).getDate(); }
  if (maanden < 0) { jaren--; maanden += 12; }
  const totaalDagen = Math.round((vandaag.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return { jaren, maanden, dagen, totaalDagen };
}
export function datumVerschil(datum1: string, datum2: string): { dagen: number; weken: number; maanden: number } {
  const d1 = new Date(datum1), d2 = new Date(datum2);
  const dagen = Math.abs(Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  return { dagen, weken: Math.floor(dagen / 7), maanden: Math.round(dagen / 30.44) };
}
export function datumOptellen(datum: string, dagen: number): string {
  const d = new Date(datum); d.setDate(d.getDate() + dagen);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}
export function weeknummer(datum: string): number {
  const d = new Date(datum); d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}
export function tijdrekenen(uren: number, minuten: number, extraMinuten: number): { totaalUren: number; totaalMinuten: number; dagen: number } {
  const totaal = uren * 60 + minuten + extraMinuten;
  return { totaalUren: Math.floor(totaal / 60), totaalMinuten: totaal % 60, dagen: Math.floor(totaal / (60 * 24)) };
}
export function isSchrikkeljaar(jaar: number): boolean {
  return (jaar % 4 === 0 && jaar % 100 !== 0) || jaar % 400 === 0;
}
export function dagenTotDatum(datum: string): number {
  return Math.max(0, Math.round((new Date(datum).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
}
export function werkdagenTellen(start: string, einde: string): { werkdagen: number; totaal: number } {
  const d1 = new Date(start), d2 = new Date(einde);
  let werkdagen = 0;
  for (let d = new Date(d1); d <= d2; d.setDate(d.getDate() + 1)) {
    const dag = d.getDay();
    if (dag !== 0 && dag !== 6) werkdagen++;
  }
  const totaal = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return { werkdagen, totaal };
}

// ─── Gezondheid (8) ───────────────────────────────────────────

export function bloeddrukInterpretatie(bovendruk: number, onderdruk: number): { categorie: string; advies: string } {
  if (bovendruk < 120 && onderdruk < 80) return { categorie: "Optimaal", advies: "Geen verhoogd risico." };
  if (bovendruk < 130 && onderdruk < 85) return { categorie: "Normaal", advies: "Gezonde leefstijl behouden." };
  if (bovendruk < 140 && onderdruk < 90) return { categorie: "Hoog normaal", advies: "Let op leefstijl en voeding." };
  if (bovendruk < 160 && onderdruk < 100) return { categorie: "Lichte hypertensie", advies: "Raadpleeg huisarts." };
  if (bovendruk < 180 && onderdruk < 110) return { categorie: "Matige hypertensie", advies: "Medische beoordeling nodig." };
  return { categorie: "Ernstige hypertensie", advies: "Direct medisch advies inwinnen!" };
}
export function lichaamsvetPercentage(middelomtrek: number, nekomtrek: number, lengte: number, geslacht: "man"|"vrouw"): number {
  if (geslacht === "man") return Math.round(86.01 * Math.log10(middelomtrek - nekomtrek) - 70.041 * Math.log10(lengte) + 36.76);
  return Math.round(163.205 * Math.log10(middelomtrek + nekomtrek) - 97.684 * Math.log10(lengte) - 78.387);
}
export function waterbehoefte(gewicht: number, actief: boolean): number {
  const basis = gewicht * 0.035;
  return Math.round(actief ? basis * 1.2 : basis);
}
export function hardlooppace(tijdMinuten: number, afstandKm: number): { pacePerKm: string; snelheidKmh: number } {
  const paceMin = tijdMinuten / afstandKm;
  const min = Math.floor(paceMin), sec = Math.round((paceMin - min) * 60);
  return { pacePerKm: `${min}:${sec.toString().padStart(2, "0")} min/km`, snelheidKmh: Math.round((afstandKm / (tijdMinuten / 60)) * 10) / 10 };
}
export function wandeltempo(stappen: number, tijdMinuten: number, paslengteCm: number): { afstandKm: number; snelheidKmh: number; kcal: number } {
  const afstandKm = Math.round((stappen * paslengteCm / 100000) * 100) / 100;
  return { afstandKm, snelheidKmh: Math.round((afstandKm / (tijdMinuten / 60)) * 10) / 10, kcal: Math.round(afstandKm * 50) };
}
export function idealeLengteKind(leeftijdMaanden: number, geslacht: "jongen"|"meisje"): { gemiddeldCm: number; range: string } {
  const groei: Record<string, number[]> = { jongen: [50, 54, 58, 62, 66, 68, 71, 73, 75, 77, 79, 81, 83, 86, 89, 92, 95, 98, 101, 104, 107, 110, 113, 116, 119, 122, 125, 128, 131, 134, 137], meisje: [49, 53, 57, 61, 64, 67, 69, 72, 74, 76, 78, 80, 82, 85, 88, 91, 94, 97, 100, 103, 106, 109, 112, 115, 118, 121, 124, 127, 130, 133, 136] };
  const idx = Math.min(leeftijdMaanden, 30);
  const g = groei[geslacht] || groei.jongen;
  const gem = g[idx] || g[30];
  return { gemiddeldCm: gem, range: `${gem - 5} - ${gem + 5} cm` };
}
export function calorieVerbruikActiviteit(gewicht: number, metWaarde: number, minuten: number): number {
  return Math.round(metWaarde * 3.5 * gewicht / 200 * minuten);
}
export function fietsVermogen(gewicht: number, hellingPct: number, snelheidKmh: number, windTegen: boolean): number {
  const rolweerstand = 0.004 * gewicht * 9.81 * snelheidKmh / 3.6;
  const luchtweerstand = 0.5 * 1.225 * 0.5 * Math.pow(snelheidKmh / 3.6, 2) * (windTegen ? 1.5 : 1);
  const helling = hellingPct > 0 ? hellingPct / 100 * gewicht * 9.81 * snelheidKmh / 3.6 : 0;
  return Math.round((rolweerstand + luchtweerstand + helling) / 0.95);
}

// ─── Werk & Inkomen (8) ───────────────────────────────────────

export function overurenBetalen(maandSalaris: number, contractUren: number, overuren: number, factor: number): { uurloon: number; overuurToeslag: number; totaal: number } {
  const uurloon = maandSalaris / contractUren / 4.33;
  const overuurToeslag = Math.round(uurloon * factor * overuren);
  return { uurloon: Math.round(uurloon), overuurToeslag, totaal: Math.round(uurloon * overuren + overuurToeslag) };
}
export function reiskostenWoonWerk(afstandEnkeleReis: number, dagenPerWeek: number, vergoedingPerKm: number): { maand: number; jaar: number } {
  const maand = Math.round(afstandEnkeleReis * 2 * dagenPerWeek * 4.33 * vergoedingPerKm);
  return { maand, jaar: maand * 12 };
}
export function thuiswerkVergoeding(dagenPerWeek: number, vergoedingPerDag: number): { maand: number; jaar: number } {
  const maand = Math.round(dagenPerWeek * 4.33 * vergoedingPerDag);
  return { maand, jaar: maand * 12 };
}
export function eindejaarsuitkering(jaarSalaris: number, pct: number): { bruto: number; netto: number } {
  const bruto = Math.round(jaarSalaris * pct / 100);
  return { bruto, netto: Math.round(bruto * 0.6) };
}
export function dertiendeMaand(maandSalaris: number): { bruto: number; netto: number } {
  return { bruto: maandSalaris, netto: Math.round(maandSalaris * 0.6) };
}
export function bonusNetto(bonusBruto: number, jaarInkomen: number): { belasting: number; netto: number; bijzonderTarief: number } {
  const bijzonderTarief = jaarInkomen < 38498 ? 0.35 : jaarInkomen < 77936 ? 0.42 : 0.50;
  const belasting = Math.round(bonusBruto * bijzonderTarief);
  return { belasting, netto: bonusBruto - belasting, bijzonderTarief: Math.round(bijzonderTarief * 100) };
}
export function ziektewetUitkering(maandSalaris: number): { percentage: number; brutoPerMaand: number } {
  return { percentage: 70, brutoPerMaand: Math.round(maandSalaris * 0.7) };
}
export function wwUitkeringSchatting(maandSalaris: number, dienstjaren: number, werkloosWeken: number): { maximaal: number; resterendWeken: number } {
  const maxWeken = dienstjaren >= 10 ? 24 : dienstjaren >= 5 ? 12 : 3;
  return { maximaal: Math.round(maandSalaris * 0.75), resterendWeken: Math.max(0, maxWeken - werkloosWeken) };
}

// ─── Ondernemen (7) ───────────────────────────────────────────

export function breakEvenAnalyse(vasteKosten: number, verkoopPrijs: number, variabeleKostenPerStuk: number): { eenheden: number; omzet: number } {
  const eenheden = Math.ceil(vasteKosten / (verkoopPrijs - variabeleKostenPerStuk));
  return { eenheden, omzet: Math.round(eenheden * verkoopPrijs) };
}
export function costPlusPrijs(kostprijs: number, margePct: number): { verkoopprijs: number; winst: number } {
  const verkoopprijs = Math.round(kostprijs * (1 + margePct / 100));
  return { verkoopprijs, winst: verkoopprijs - kostprijs };
}
export function krediettermijn(vordering: number, maandelijkseBetaling: number): { maanden: number; totaalRente: number } {
  const maanden = Math.ceil(vordering / maandelijkseBetaling);
  return { maanden, totaalRente: 0 };
}
export function btwPriveGebruik(materiaal: number,uren: number,uurtarief: number,btwPct: number): { correctie: number; totaal: number } {
  const totaalExcl = materiaal + uren * uurtarief;
  return { correctie: Math.round(totaalExcl * btwPct / 100), totaal: Math.round(totaalExcl * (1 + btwPct / 100)) };
}
export function autokostenBijtelling(catalogusPrijs: number, bijtellingPct: number, eigenBijdrageMaand: number): { bijtellingJaar: number; bijtellingMaand: number; nettoPerMaand: number } {
  const bijtellingJaar = Math.round(catalogusPrijs * bijtellingPct / 100);
  const bijtellingMaand = Math.round(bijtellingJaar / 12);
  const nettoPerMaand = Math.max(0, Math.round(bijtellingMaand * 0.5 - eigenBijdrageMaand));
  return { bijtellingJaar, bijtellingMaand, nettoPerMaand };
}
export function vofWinstverdeling(winst: number, aandeelA: number, aandeelB: number): { a: number; b: number; pctA: number; pctB: number } {
  const totaal = aandeelA + aandeelB;
  return { a: Math.round(winst * aandeelA / totaal), b: Math.round(winst * aandeelB / totaal), pctA: Math.round(aandeelA / totaal * 100), pctB: Math.round(aandeelB / totaal * 100) };
}
export function uurtariefKostprijs(gewenstNettoMaand: number, werkdagenPerMaand: number, urenPerDag: number, overheadPct: number): { tariefExcl: number; tariefIncl: number; dekking: number } {
  const tariefExcl = Math.round(gewenstNettoMaand / (werkdagenPerMaand * urenPerDag) * (1 + overheadPct / 100));
  return { tariefExcl, tariefIncl: Math.round(tariefExcl * 1.21), dekking: Math.round(gewenstNettoMaand / (werkdagenPerMaand * urenPerDag)) };
}

// ─── Geld & Verzekeringen (9) ─────────────────────────────────

export function spaardoelBerekenen(startkapitaal: number, maandelijkseInleg: number, rentePct: number, maanden: number): { eindbedrag: number; totaalInleg: number; totaalRente: number } {
  let bedrag = startkapitaal; const maandRente = rentePct / 100 / 12;
  for (let i = 0; i < maanden; i++) bedrag = bedrag * (1 + maandRente) + maandelijkseInleg;
  return { eindbedrag: Math.round(bedrag), totaalInleg: startkapitaal + maandelijkseInleg * maanden, totaalRente: Math.round(bedrag - startkapitaal - maandelijkseInleg * maanden) };
}
export function lineaireAflossing(lening: number, looptijdMaanden: number, rentePct: number): { maandLastenEerste: number; maandLastenLaatste: number; totaleRente: number; totaal: number } {
  const maandAflossing = lening / looptijdMaanden; const maandRente = rentePct / 100 / 12;
  const eersteRente = Math.round(lening * maandRente); const laatsteRente = Math.round(maandAflossing * maandRente);
  const totaleRente = Math.round(maandRente * (lening + maandAflossing) * looptijdMaanden / 2);
  return { maandLastenEerste: Math.round(maandAflossing + eersteRente), maandLastenLaatste: Math.round(maandAflossing + laatsteRente), totaleRente, totaal: Math.round(lening + totaleRente) };
}
export function studieschuldTerugbetalen(schuld: number, draagkrachtMaand: number, rentePct: number): { maandBedrag: number; looptijdMaanden: number; totaal: number } {
  const maandRente = rentePct / 100 / 12;
  const maandBedrag = Math.min(draagkrachtMaand, Math.round(schuld * maandRente * Math.pow(1 + maandRente, 180) / (Math.pow(1 + maandRente, 180) - 1)));
  if (maandBedrag <= 0) return { maandBedrag: 0, looptijdMaanden: 180, totaal: 0 };
  return { maandBedrag, looptijdMaanden: 180, totaal: Math.round(maandBedrag * 180) };
}
export function eigenRisicoZorg(zorgKosten: number, eigenRisico: number): { vergoeding: number; zelfBetalen: number; resterendEigenRisico: number } {
  const zelfBetalen = Math.min(eigenRisico, zorgKosten);
  return { vergoeding: Math.max(0, zorgKosten - eigenRisico), zelfBetalen, resterendEigenRisico: Math.max(0, eigenRisico - zorgKosten) };
}
export function verhuisKosten(huidigeHuur: number, nieuweHuur: number, overbruggingMaanden: number, verhuisBedrag: number): { totaleKosten: number; maandelijkseBesparing: number; terugverdienMaanden: number } {
  const totaleKosten = huidigeHuur * overbruggingMaanden + verhuisBedrag;
  const besparing = huidigeHuur - nieuweHuur;
  return { totaleKosten, maandelijkseBesparing: Math.max(0, besparing), terugverdienMaanden: besparing > 0 ? Math.ceil(totaleKosten / besparing) : 999 };
}
export function overwaardeBerekenen(huidigeWaarde: number, hypotheekSaldo: number, verkoopKostenPct: number): { overwaarde: number; nettoOpbrengst: number; kosten: number } {
  const kosten = Math.round(huidigeWaarde * verkoopKostenPct / 100);
  return { overwaarde: huidigeWaarde - hypotheekSaldo, nettoOpbrengst: huidigeWaarde - hypotheekSaldo - kosten, kosten };
}
export function huurverhogingBerekenen(huidigeHuur: number, verhogingPct: number): { nieuweHuur: number; stijging: number; max2026: number } {
  const maxPct = Math.min(verhogingPct, 5.5);
  return { nieuweHuur: Math.round(huidigeHuur * (1 + maxPct / 100)), stijging: Math.round(huidigeHuur * maxPct / 100), max2026: 5.5 };
}
export function enkelvoudigeInterest(hoofdsom: number, rentePct: number, jaren: number): { totaal: number; rente: number } {
  const rente = Math.round(hoofdsom * rentePct / 100 * jaren);
  return { totaal: hoofdsom + rente, rente };
}
export function vermogensBelastingBox3(vermogen: number, schulden: number, heffingsvrijVermogen: number): { grondslag: number; rendement: number; belasting: number } {
  const grondslag = Math.max(0, vermogen - schulden - heffingsvrijVermogen);
  const rendement = Math.round(grondslag * 0.0637);
  return { grondslag, rendement, belasting: Math.round(rendement * 0.36) };
}
