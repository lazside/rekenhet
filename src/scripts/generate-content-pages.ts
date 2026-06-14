/**
 * Programmatic SEO Content Page Generator
 *
 * Reads the calculator registry and generates a unique SEO content page
 * for every calculator that doesn't already have one.
 *
 * Usage: npx tsx src/scripts/generate-content-pages.ts
 *
 * This script creates files in src/content/pages/ and updates content/index.ts
 * with the required imports.
 */

import * as fs from "fs";
import * as path from "path";

// ─── Calculator metadata (condensed from src/data/calculators.ts) ───

interface CalcEntry {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  featured?: boolean;
  relatedSlugs?: string[];
}

// Calculators that already have a content page — skip these
// (handled by CALC_TO_CONTENT_SLUG below)

// Map from calculator slug to existing content page slug
// (some content page slugs differ from calculator slugs)
const CALC_TO_CONTENT_SLUG: Record<string, string> = {
  "bruto-netto-salaris-calculator": "bruto-netto-salaris-2026",
  "netto-vakantiegeld": "vakantiegeld-berekenen",
  "parttime-factor": "parttime-salaris-berekenen",
  zwangerschap: "zwangerschap",
  "ideaal-gewicht": "ideaal-gewicht",
  investeringsaftrek: "investeringsaftrek",
  omzetbelasting: "omzetbelasting",
  vakantiedagen: "vakantiedagen",
  ontslagvergoeding: "ontslagvergoeding",
  "inflatie-calculator": "inflatie-calculator",
  "winst-verlies": "winst-verlies",
  huurtoeslag: "huurtoeslag",
};

// Calculator registry
const calculators: CalcEntry[] = [
  { slug: "btw-calculator", categorySlug: "ondernemen", title: "BTW Calculator", description: "Bereken snel en eenvoudig de BTW over elk bedrag. Kies uit 21%, 9% of 0% tarief en bereken inclusief of exclusief BTW.", metaTitle: "BTW Calculator | Bereken Inclusief & Exclusief BTW (21%, 9%, 0%)", metaDescription: "Gratis BTW calculator. Bereken eenvoudig het BTW bedrag bij 21%, 9% of 0% tarief.", keywords: ["btw calculator", "btw berekenen", "omzetbelasting", "21% btw", "9% btw"], featured: true, relatedSlugs: [] },
  { slug: "bmi-calculator", categorySlug: "gezondheid", title: "BMI Calculator", description: "Bereken je Body Mass Index op basis van je lengte en gewicht.", metaTitle: "BMI Calculator — Bereken Je Body Mass Index | Rekenhet.nl", metaDescription: "Gratis BMI calculator. Voer je lengte en gewicht in en ontdek direct je BMI.", keywords: ["bmi calculator", "bmi berekenen", "body mass index", "gezond gewicht", "ideal gewicht"], featured: true, relatedSlugs: [] },
  { slug: "procenten-calculator", categorySlug: "wiskunde", title: "Procenten Calculator", description: "Bereken eenvoudig procenten: deel van geheel, procentuele toename of afname.", metaTitle: "Procenten Calculator — Bereken Percentage | Rekenhet.nl", metaDescription: "Gratis procenten calculator. Bereken eenvoudig percentages en procentuele stijging of daling.", keywords: ["procenten calculator", "percentage berekenen", "procentuele toename", "korting berekenen"], featured: true, relatedSlugs: [] },
  { slug: "lengte-omrekenen", categorySlug: "algemeen", title: "Lengte Omrekenen", description: "Reken eenvoudig lengtematen om: mm, cm, m, km, inch, foot, yard en mile.", metaTitle: "Lengte Omrekenen — mm, cm, m, km, inch, ft | Rekenhet.nl", metaDescription: "Gratis lengte omrekentool. Converteer millimeters, centimeters, meters, kilometers, inches, feet, yards en miles.", keywords: ["lengte omrekenen", "cm naar m", "meter naar kilometer", "inch naar cm", "feet naar meter"], featured: true, relatedSlugs: ["gewicht-omrekenen", "oppervlakte-omrekenen"] },
  { slug: "gewicht-omrekenen", categorySlug: "algemeen", title: "Gewicht Omrekenen", description: "Reken eenvoudig gewichten om: mg, g, kg, pond, ons, ounce en pound.", metaTitle: "Gewicht Omrekenen — mg, g, kg, pond, lbs | Rekenhet.nl", metaDescription: "Gratis gewicht omrekentool. Converteer milligrammen, grammen, kilogrammen, ponden, ounces en pounds.", keywords: ["gewicht omrekenen", "kg naar pond", "gram naar ons", "pond naar kg", "lbs naar kg"], featured: true, relatedSlugs: ["lengte-omrekenen", "oppervlakte-omrekenen"] },
  { slug: "oppervlakte-omrekenen", categorySlug: "algemeen", title: "Oppervlakte Omrekenen", description: "Reken eenvoudig oppervlaktematen om: mm², cm², m², km², are en hectare.", metaTitle: "Oppervlakte Omrekenen — m², are, hectare | Rekenhet.nl", metaDescription: "Gratis oppervlakte omrekentool. Converteer m², cm², km², are en hectare.", keywords: ["oppervlakte omrekenen", "m2 naar hectare", "are naar m2", "km2 naar hectare"], featured: true, relatedSlugs: ["lengte-omrekenen", "gewicht-omrekenen"] },
  { slug: "auto-motor-omrekenen", categorySlug: "auto-vervoer", title: "Auto & Motor Omrekenen", description: "Reken eenvoudig autogerelateerde eenheden om: kW naar pk, Nm naar ft-lbs, bar naar PSI.", metaTitle: "Auto & Motor Omrekenen — kW, pk, Nm, bar, PSI | Rekenhet.nl", metaDescription: "Gratis automotive omrekentool. Converteer kW naar pk, Nm naar ft-lbs, bar naar PSI.", keywords: ["auto omrekenen", "kW naar pk", "Nm naar ft-lbs", "bar naar PSI", "motorvermogen"], featured: true, relatedSlugs: ["energie-omrekenen", "lengte-omrekenen"] },
  { slug: "energie-omrekenen", categorySlug: "algemeen", title: "Energie Omrekenen", description: "Reken eenvoudig energie-eenheden om: joule, kWh, BTU, calorie, watt en ampère.", metaTitle: "Energie Omrekenen — J, kWh, BTU, W, A | Rekenhet.nl", metaDescription: "Gratis energie omrekentool. Converteer joule, kWh, BTU, calorie, watt en ampère.", keywords: ["energie omrekenen", "kWh naar joule", "BTU naar kWh", "watt naar ampère"], featured: true, relatedSlugs: ["auto-motor-omrekenen", "data-omrekenen"] },
  { slug: "koken-omrekenen", categorySlug: "algemeen", title: "Koken & Bakken Omrekenen", description: "Reken eenvoudig keukenmaten om: ml, cups, fl_oz, eetlepels en grammen.", metaTitle: "Koken & Bakken Omrekenen — ml, cups, gram | Rekenhet.nl", metaDescription: "Gratis keukenomrekentool. Converteer milliliters, cups, fluid ounces en grammen.", keywords: ["koken omrekenen", "cups naar ml", "gram naar cups", "eetlepel naar ml", "keukenmaten"], featured: true, relatedSlugs: ["gewicht-omrekenen", "energie-omrekenen"] },
  { slug: "data-omrekenen", categorySlug: "algemeen", title: "Data Omrekenen", description: "Reken eenvoudig digitale opslag om: bytes, KB, MB, GB, TB, Mb en Gb.", metaTitle: "Data Omrekenen — MB, GB, TB, Mb, Gb | Rekenhet.nl", metaDescription: "Gratis data omrekentool. Converteer bytes, kilobytes, megabytes, gigabytes en meer.", keywords: ["data omrekenen", "MB naar GB", "GB naar TB", "megabit naar megabyte"], featured: true, relatedSlugs: ["energie-omrekenen", "auto-motor-omrekenen"] },
  { slug: "ritkosten-berekenen", categorySlug: "auto-vervoer", title: "Ritkosten Berekenen", description: "Bereken de totale kosten van een autorit: brandstofkosten, tol en parkeren. Inclusief CO₂-uitstoot.", metaTitle: "Ritkosten Berekenen — Brandstof, Tol & Parkeren | Rekenhet.nl", metaDescription: "Gratis ritkostencalculator. Bereken brandstofkosten, tol, parkeren en CO₂-uitstoot voor elke autorit.", keywords: ["ritkosten berekenen", "brandstofkosten", "autokosten", "woon-werkverkeer"], featured: true, relatedSlugs: ["snelheidsboete-calculator"] },
  { slug: "snelheidsboete-calculator", categorySlug: "auto-vervoer", title: "Snelheidsboete Calculator", description: "Bereken direct je boete bij te hard rijden. Voor snelwegen en binnenwegen. 2026 OM-tarieven.", metaTitle: "Snelheidsboete Calculator — Boetebedrag 2026 | Rekenhet.nl", metaDescription: "Gratis snelheidsboete calculator. Bereken je boetebedrag obv snelheid, limiet en wegtype.", keywords: ["snelheidsboete", "boete berekenen", "te hard rijden boete"], featured: true, relatedSlugs: ["ritkosten-berekenen"] },
  { slug: "uurtarief-berekenen", categorySlug: "werk-en-inkomen", title: "Uurtarief naar Netto Maandinkomen", description: "Bereken je netto maand- en jaarsalaris op basis van je uurtarief en werkuren.", metaTitle: "Uurtarief naar Netto Maandinkomen — Berekenen | Rekenhet.nl", metaDescription: "Gratis calculator. Zet je uurtarief om naar netto maandinkomen.", keywords: ["uurtarief berekenen", "uurtarief naar maandsalaris", "zzp netto inkomen"], featured: true, relatedSlugs: ["parttime-factor", "bruto-netto-salaris-calculator"] },
  { slug: "btw-incl-excl", categorySlug: "ondernemen", title: "BTW Inclusief/Exclusief", description: "Bereken snel het BTW-bedrag en totaal inclusief of exclusief BTW (21%, 9%, 0%).", metaTitle: "BTW Inclusief of Exclusief Berekenen | Rekenhet.nl", metaDescription: "Gratis BTW calculator. Bereken bedragen inclusief of exclusief BTW met tarieven 21%, 9% en 0%.", keywords: ["btw inclusief exclusief", "btw berekenen", "btw bedrag"], featured: true, relatedSlugs: ["btw-calculator"] },
  { slug: "parttime-factor", categorySlug: "werk-en-inkomen", title: "Parttime Salaris Factor", description: "Bereken je parttime salaris op basis van fulltime salaris en uren.", metaTitle: "Parttime Salaris Berekenen — Factor & Uren | Rekenhet.nl", metaDescription: "Gratis parttime calculator. Bereken je salaris bij minder uren.", keywords: ["parttime salaris", "parttime factor", "salaris bij minder uren"], featured: true, relatedSlugs: ["uurtarief-berekenen", "bruto-netto-salaris-calculator"] },
  { slug: "maximale-hypotheek", categorySlug: "hypotheek", title: "Sneltest Maximale Hypotheek", description: "Ontdek snel wat je maximale hypotheek is op basis van inkomen, rente en looptijd.", metaTitle: "Maximale Hypotheek Berekenen — Sneltest | Rekenhet.nl", metaDescription: "Gratis sneltest voor je maximale hypotheek. Bereken leencapaciteit.", keywords: ["maximale hypotheek", "hypotheek berekenen", "hoeveel hypotheek"], featured: true, relatedSlugs: ["annuiteiten-lasten", "bruto-netto-salaris-calculator"] },
  { slug: "annuiteiten-lasten", categorySlug: "geld-en-verzekeringen", title: "Annuïtaire Maandlasten", description: "Bereken je bruto maandlasten voor een annuïteitenhypotheek.", metaTitle: "Annuïteitenhypotheek Maandlasten Berekenen | Rekenhet.nl", metaDescription: "Gratis annuïteiten calculator. Bereken maandlasten, totale rente en totale betaling.", keywords: ["annuïteit berekenen", "hypotheek maandlasten", "annuïtaire hypotheek"], featured: true, relatedSlugs: ["maximale-hypotheek"] },
  { slug: "netto-vakantiegeld", categorySlug: "werk-en-inkomen", title: "Netto Vakantiegeld", description: "Bereken wat je netto overhoudt van je vakantiegeld (8% regeling).", metaTitle: "Netto Vakantiegeld Berekenen — 8% Regeling | Rekenhet.nl", metaDescription: "Gratis netto vakantiegeld calculator op basis van bruto salaris.", keywords: ["netto vakantiegeld", "vakantietoeslag berekenen", "8% vakantiegeld"], featured: true, relatedSlugs: ["bruto-netto-salaris-calculator", "uurtarief-berekenen"] },
  { slug: "compound-interest", categorySlug: "geld-en-verzekeringen", title: "Vermogensgroei Tracker", description: "Bereken de groei van je vermogen met compound interest (samengestelde rente).", metaTitle: "Vermogensgroei Berekenen — Compound Interest | Rekenhet.nl", metaDescription: "Gratis vermogensgroei calculator. Bereken eindwaarde met samengestelde rente.", keywords: ["vermogensgroei", "compound interest", "samengestelde rente", "beleggen groei"], featured: true, relatedSlugs: ["bruto-netto-salaris-calculator", "annuiteiten-lasten"] },
  { slug: "kenteken-check", categorySlug: "auto-vervoer", title: "Kenteken Check", description: "Voer een Nederlands kenteken in en ontdek merk, model, gewicht, CO₂, MRB en bijtelling.", metaTitle: "Kenteken Check — Auto Gegevens & MRB | Rekenhet.nl", metaDescription: "Gratis kenteken check via RDW Open Data.", keywords: ["kenteken check", "rdw kenteken", "autogegevens opzoeken", "wegenbelasting berekenen"], featured: true, relatedSlugs: ["ritkosten-berekenen", "snelheidsboete-calculator"] },
  { slug: "caloriebehoefte", categorySlug: "gezondheid", title: "Caloriebehoefte Berekenen", description: "Bereken je dagelijkse caloriebehoefte op basis van BMR en activiteitenniveau.", metaTitle: "Caloriebehoefte Berekenen — BMR & Activiteit | Rekenhet.nl", metaDescription: "Gratis caloriebehoefte calculator. Bereken je dagelijkse energiebehoefte.", keywords: ["caloriebehoefte", "calorieën per dag", "BMR", "energiebehoefte"], featured: true, relatedSlugs: ["bmi-calculator", "waterbehoefte"] },
  { slug: "hartslagzones", categorySlug: "gezondheid", title: "Hartslagzones Berekenen", description: "Bereken je optimale hartslagzones op basis van leeftijd en rusthartslag.", metaTitle: "Hartslagzones Berekenen — Max & Optimaal | Rekenhet.nl", metaDescription: "Gratis hartslagzones calculator voor sport en training.", keywords: ["hartslagzones", "hartslag", "maximale hartslag", "training zones"], featured: true, relatedSlugs: ["caloriebehoefte", "hardlooppace"] },
  { slug: "waterbehoefte", categorySlug: "gezondheid", title: "Waterbehoefte Berekenen", description: "Bereken je dagelijkse vochtbehoefte op basis van gewicht, leeftijd en activiteit.", metaTitle: "Waterbehoefte Berekenen — Dagelijkse Vocht | Rekenhet.nl", metaDescription: "Gratis waterbehoefte calculator. Bereken hoeveel water je dagelijks moet drinken.", keywords: ["waterbehoefte", "vochtbehoefte", "water drinken", "dagelijkse vocht"], featured: true, relatedSlugs: ["caloriebehoefte", "bmi-calculator"] },
  { slug: "hardlooppace", categorySlug: "gezondheid", title: "Hardlooppace Berekenen", description: "Bereken je pace per km en snelheid op basis van tijd en afstand.", metaTitle: "Hardlooppace Berekenen — Pace Per Km | Rekenhet.nl", metaDescription: "Gratis hardlooppace calculator. Bereken minuten per km en snelheid.", keywords: ["hardlooppace", "pace", "hardlopen", "snelheid", "km"], featured: true, relatedSlugs: [] },
  { slug: "wandeltempo", categorySlug: "gezondheid", title: "Wandeltempo Calculator", description: "Bereken afstand, snelheid en calorieverbruik tijdens het wandelen.", metaTitle: "Wandeltempo Berekenen — Afstand & Calorieën | Rekenhet.nl", metaDescription: "Gratis wandeltempo calculator. Bereken afstand, snelheid en verbrande calorieën.", keywords: ["wandeltempo", "wandelen", "calorieën wandelen", "afstand"], featured: true, relatedSlugs: ["hardlooppace"] },
  { slug: "ideale-lengte-kind", categorySlug: "gezondheid", title: "Ideale Lengte Kind", description: "Bekijk de gemiddelde lengte voor kinderen op basis van leeftijd.", metaTitle: "Ideale Lengte Kind — Groeicurve | Rekenhet.nl", metaDescription: "Gratis kinderlengte calculator met gemiddelde lengte per leeftijd.", keywords: ["lengte kind", "groeicurve", "gemiddelde lengte", "kind"], featured: true, relatedSlugs: ["bmi-calculator"] },
  { slug: "calorie-verbruik-activiteit", categorySlug: "gezondheid", title: "Calorieverbruik per Activiteit", description: "Bereken het aantal verbrande calorieën per activiteit op basis van MET-waarde.", metaTitle: "Calorieverbruik per Activiteit — MET | Rekenhet.nl", metaDescription: "Gratis calorieverbruik calculator met MET-waarden.", keywords: ["calorieverbruik", "MET", "sport", "activiteit", "calorieën verbranden"], featured: true, relatedSlugs: ["caloriebehoefte", "waterbehoefte"] },
  { slug: "fietsvermogen", categorySlug: "gezondheid", title: "Fietsvermogen Calculator", description: "Bereken het benodigde fietsvermogen op basis van gewicht, helling en snelheid.", metaTitle: "Fietsvermogen Berekenen — Wattage | Rekenhet.nl", metaDescription: "Gratis fietsvermogen calculator voor wattage op de fiets.", keywords: ["fietsvermogen", "wattage", "fietsen", "helling", "snelheid"], featured: true, relatedSlugs: ["hartslagzones"] },
  { slug: "overuren", categorySlug: "werk-en-inkomen", title: "Overuren Berekenen", description: "Bereken de vergoeding voor overuren op basis van salaris en toeslagfactor.", metaTitle: "Overuren Berekenen — Toeslag & Uurloon | Rekenhet.nl", metaDescription: "Gratis overuren calculator. Bereken je uurloon en overuurtoeslag.", keywords: ["overuren", "overuurtoeslag", "uurloon", "overwerk"], featured: true, relatedSlugs: ["bruto-netto-salaris-calculator"] },
  { slug: "reiskosten-woonwerk", categorySlug: "werk-en-inkomen", title: "Reiskosten Woon-Werk", description: "Bereken de maandelijkse en jaarlijkse reiskostenvergoeding.", metaTitle: "Reiskosten Woon-Werk Berekenen | Rekenhet.nl", metaDescription: "Gratis reiskosten woon-werk calculator voor kilometervergoeding.", keywords: ["reiskosten", "woon-werk", "reiskostenvergoeding", "kilometervergoeding"], featured: true, relatedSlugs: ["ritkosten-berekenen"] },
  { slug: "thuiswerkvergoeding", categorySlug: "werk-en-inkomen", title: "Thuiswerkvergoeding", description: "Bereken de maandelijkse en jaarlijkse thuiswerkvergoeding.", metaTitle: "Thuiswerkvergoeding Berekenen | Rekenhet.nl", metaDescription: "Gratis thuiswerkvergoeding calculator op basis van dagen per week.", keywords: ["thuiswerkvergoeding", "thuiswerken", "vergoeding", "dagen"], featured: true, relatedSlugs: ["reiskosten-woonwerk"] },
  { slug: "eindejaarsuitkering", categorySlug: "werk-en-inkomen", title: "Eindejaarsuitkering", description: "Bereken de bruto en netto eindejaarsuitkering op basis van een percentage.", metaTitle: "Eindejaarsuitkering Berekenen — Bruto & Netto | Rekenhet.nl", metaDescription: "Gratis eindejaarsuitkering calculator. Bereken bruto en netto uitkering.", keywords: ["eindejaarsuitkering", "13e maand", "bonus", "uitkering"], featured: true, relatedSlugs: ["dertiende-maand", "bonus-netto"] },
  { slug: "dertiende-maand", categorySlug: "werk-en-inkomen", title: "13e Maand Berekenen", description: "Bereken de bruto en netto waarde van een 13e maand.", metaTitle: "13e Maand Berekenen — Dertiende Maand | Rekenhet.nl", metaDescription: "Gratis 13e maand calculator. Bereken bruto en netto dertiende maand.", keywords: ["13e maand", "dertiende maand", "eindejaarsuitkering", "bonus"], featured: true, relatedSlugs: ["eindejaarsuitkering", "bonus-netto"] },
  { slug: "bonus-netto", categorySlug: "werk-en-inkomen", title: "Bonus Netto Berekenen", description: "Bereken de netto bonus na belasting op basis van bijzonder tarief.", metaTitle: "Bonus Netto Berekenen — Bijzonder Tarief | Rekenhet.nl", metaDescription: "Gratis bonus netto calculator na aftrek van bijzonder tarief.", keywords: ["bonus", "netto bonus", "bijzonder tarief", "belasting bonus"], featured: true, relatedSlugs: ["dertiende-maand", "eindejaarsuitkering"] },
  { slug: "ziektewet-uitkering", categorySlug: "werk-en-inkomen", title: "Ziektewet Uitkering", description: "Bereken de bruto Ziektewet-uitkering op basis van je salaris.", metaTitle: "Ziektewet Uitkering Berekenen | Rekenhet.nl", metaDescription: "Gratis Ziektewet calculator voor je bruto ZW-uitkering.", keywords: ["ziektewet", "uitkering", "ZW", "ziekte", "salaris"], featured: true, relatedSlugs: ["ww-uitkering"] },
  { slug: "ww-uitkering", categorySlug: "werk-en-inkomen", title: "WW Uitkering Schatting", description: "Schat de hoogte en duur van je WW-uitkering.", metaTitle: "WW Uitkering Berekenen — Schatting | Rekenhet.nl", metaDescription: "Gratis WW calculator voor maximale uitkering en resterende weken.", keywords: ["ww uitkering", "werkloosheid", "ww", "uitkering schatting"], featured: true, relatedSlugs: ["ziektewet-uitkering"] },
  { slug: "break-even-analyse", categorySlug: "ondernemen", title: "Break-Even Analyse", description: "Bereken het aantal eenheden dat je moet verkopen om quitte te draaien.", metaTitle: "Break-Even Analyse Berekenen | Rekenhet.nl", metaDescription: "Gratis break-even calculator voor minimaal aantal eenheden en omzet.", keywords: ["break-even", "break even analyse", "kosten", "omzet", "winst"], featured: true, relatedSlugs: ["winst-verlies", "costplus-prijs"] },
  { slug: "costplus-prijs", categorySlug: "ondernemen", title: "Cost-Plus Prijs", description: "Bereken de verkoopprijs op basis van kostprijs en marge.", metaTitle: "Cost-Plus Prijs Berekenen | Rekenhet.nl", metaDescription: "Gratis cost-plus calculator voor verkoopprijs obv kostprijs en marge.", keywords: ["cost-plus", "prijs berekenen", "kostprijs", "marge"], featured: true, relatedSlugs: ["break-even-analyse", "winst-verlies"] },
  { slug: "krediettermijn", categorySlug: "ondernemen", title: "Krediettermijn", description: "Bereken de looptijd van een openstaande vordering.", metaTitle: "Krediettermijn Berekenen | Rekenhet.nl", metaDescription: "Gratis krediettermijn calculator voor aflossing van een vordering.", keywords: ["krediettermijn", "vordering", "aflossen", "betalingstermijn"], featured: true, relatedSlugs: ["lineaire-aflossing"] },
  { slug: "btw-privegebruik", categorySlug: "ondernemen", title: "BTW Privégebruik", description: "Bereken de BTW-correctie voor privégebruik van zakelijke goederen.", metaTitle: "BTW Privégebruik Berekenen — Correctie | Rekenhet.nl", metaDescription: "Gratis BTW privégebruik calculator voor de BTW-correctie.", keywords: ["btw privegebruik", "btw correctie", "privegebruik", "ondernemer"], featured: true, relatedSlugs: ["btw-calculator", "btw-incl-excl", "omzetbelasting"] },
  { slug: "autokosten-bijtelling", categorySlug: "ondernemen", title: "Autokosten Bijtelling", description: "Bereken de bijtelling voor een auto van de zaak.", metaTitle: "Autokosten Bijtelling Berekenen | Rekenhet.nl", metaDescription: "Gratis bijtelling calculator obv catalogusprijs en percentage.", keywords: ["bijtelling", "autokosten", "auto van de zaak", "catalogusprijs", "lease"], featured: true, relatedSlugs: ["kenteken-check", "ritkosten-berekenen"] },
  { slug: "vof-winstverdeling", categorySlug: "ondernemen", title: "VOF Winstverdeling", description: "Verdeel de winst in een VOF op basis van investeringsaandeel.", metaTitle: "VOF Winstverdeling Berekenen | Rekenhet.nl", metaDescription: "Gratis VOF winstverdeling calculator op basis van ieders aandeel.", keywords: ["vof", "winstverdeling", "vennootschap", "ondernemen", "winst delen"], featured: true, relatedSlugs: ["winst-verlies", "zzp-tarief"] },
  { slug: "uurtarief-kostprijs", categorySlug: "ondernemen", title: "Uurtarief Kostprijs", description: "Bereken je minimale uurtarief op basis van gewenst inkomen en overhead.", metaTitle: "Uurtarief Kostprijs Berekenen | Rekenhet.nl", metaDescription: "Gratis uurtarief kostprijs calculator voor je minimale tarief.", keywords: ["uurtarief", "kostprijs", "zzp", "tarief berekenen", "overhead"], featured: true, relatedSlugs: ["zzp-tarief", "uurtarief-berekenen"] },
  { slug: "spaardoel-berekenen", categorySlug: "geld-en-verzekeringen", title: "Spaardoel Berekenen", description: "Bereken de eindwaarde van sparen met maandelijkse inleg en rente.", metaTitle: "Spaardoel Berekenen — Eindwaarde | Rekenhet.nl", metaDescription: "Gratis spaardoel calculator voor eindwaarde met rente.", keywords: ["spaardoel", "sparen", "rente", "eindwaarde", "maandelijkse inleg"], featured: true, relatedSlugs: ["compound-interest", "enkelvoudige-interest"] },
  { slug: "lineaire-aflossing", categorySlug: "geld-en-verzekeringen", title: "Lineaire Aflossing", description: "Bereken de maandlasten bij een lineaire lening of hypotheek.", metaTitle: "Lineaire Aflossing Berekenen | Rekenhet.nl", metaDescription: "Gratis lineaire aflossing calculator voor maandlast en totale rente.", keywords: ["lineaire aflossing", "lening", "hypotheek", "aflossen", "rente"], featured: true, relatedSlugs: ["annuiteiten-lasten", "extra-aflossen"] },
  { slug: "studieschuld-terugbetalen", categorySlug: "geld-en-verzekeringen", title: "Studieschuld Terugbetalen", description: "Bereken de maandelijkse aflossing van je studieschuld.", metaTitle: "Studieschuld Terugbetalen — DUO | Rekenhet.nl", metaDescription: "Gratis studieschuld calculator voor maandbedrag en draagkracht.", keywords: ["studieschuld", "duo", "terugbetalen", "aflossen", "lening"], featured: true, relatedSlugs: ["lineaire-aflossing", "spaardoel-berekenen"] },
  { slug: "eigen-risico-zorg", categorySlug: "geld-en-verzekeringen", title: "Eigen Risico Zorg", description: "Bereken hoeveel zorgkosten je zelf betaalt met eigen risico.", metaTitle: "Eigen Risico Zorg Berekenen | Rekenhet.nl", metaDescription: "Gratis eigen risico calculator voor zorgkosten na eigen risico.", keywords: ["eigen risico", "zorg", "zorgkosten", "verzekering", "ziektekosten"], featured: true, relatedSlugs: [] },
  { slug: "verhuiskosten", categorySlug: "geld-en-verzekeringen", title: "Verhuiskosten Berekenen", description: "Bereken de totale kosten en terugverdientijd van een verhuizing.", metaTitle: "Verhuiskosten Berekenen — Verhuis Calculator | Rekenhet.nl", metaDescription: "Gratis verhuiskosten calculator voor totale kosten en terugverdientijd.", keywords: ["verhuiskosten", "verhuizing", "kosten berekenen", "terugverdientijd"], featured: true, relatedSlugs: ["maximale-hypotheek"] },
  { slug: "overwaarde-berekenen", categorySlug: "geld-en-verzekeringen", title: "Overwaarde Berekenen", description: "Bereken de overwaarde van je woning na verkoop.", metaTitle: "Overwaarde Berekenen — Woning | Rekenhet.nl", metaDescription: "Gratis overwaarde calculator voor je woning.", keywords: ["overwaarde", "woning", "huis verkopen", "hypotheek", "verkoop"], featured: true, relatedSlugs: ["maximale-hypotheek"] },
  { slug: "huurverhoging", categorySlug: "geld-en-verzekeringen", title: "Huurverhoging Berekenen", description: "Bereken de nieuwe huur na een huurverhoging (max 5,5% in 2026).", metaTitle: "Huurverhoging Berekenen 2026 | Rekenhet.nl", metaDescription: "Gratis huurverhoging calculator voor de nieuwe huur.", keywords: ["huurverhoging", "huur", "verhoging 2026", "huurprijs"], featured: true, relatedSlugs: ["verhuiskosten"] },
  { slug: "enkelvoudige-interest", categorySlug: "geld-en-verzekeringen", title: "Enkelvoudige Interest", description: "Bereken enkelvoudige interest over een hoofdsom.", metaTitle: "Enkelvoudige Interest Berekenen | Rekenhet.nl", metaDescription: "Gratis enkelvoudige interest calculator voor eindbedrag.", keywords: ["enkelvoudige interest", "rente", "interest", "sparen", "lening"], featured: true, relatedSlugs: ["spaardoel-berekenen", "compound-interest"] },
  { slug: "vermogensbelasting-box3", categorySlug: "geld-en-verzekeringen", title: "Vermogensbelasting Box 3", description: "Bereken de Box 3 belasting over je vermogen in 2026.", metaTitle: "Box 3 Vermogensbelasting Berekenen 2026 | Rekenhet.nl", metaDescription: "Gratis Box 3 calculator voor vermogensbelasting.", keywords: ["box 3", "vermogensbelasting", "belasting", "vermogen", "sparen", "beleggen"], featured: true, relatedSlugs: ["box3-berekenen", "spaardoel-berekenen"] },
  { slug: "energielabel-berekenen", categorySlug: "hypotheek", title: "Energielabel & Verduurzaming Hypotheek", description: "Bereken hoeveel extra je kunt lenen met een beter energielabel.", metaTitle: "Energielabel Hypotheek — Extra Leencapaciteit | Rekenhet.nl", metaDescription: "Bereken direct hoeveel extra hypotheek je kunt krijgen obv energielabel.", keywords: ["energielabel hypotheek", "extra lenen energielabel", "verduurzaming hypotheek"], featured: true, relatedSlugs: ["maximale-hypotheek", "annuiteiten-lasten", "isde-subsidie"] },
  { slug: "zelfstandigenaftrek-berekenen", categorySlug: "ondernemen", title: "Zelfstandigenaftrek & Netto Inkomen 2026", description: "Bereken je zelfstandigenaftrek, MKB-winstvrijstelling en netto inkomen als ZZP'er.", metaTitle: "Zelfstandigenaftrek Berekenen 2026 — Netto Inkomen ZZP", metaDescription: "Gratis zelfstandigenaftrek calculator 2026 met MKB-winstvrijstelling.", keywords: ["zelfstandigenaftrek", "zelfstandigenaftrek 2026", "zzp belasting", "mkb winstvrijstelling"], featured: true, relatedSlugs: ["bruto-netto-salaris-calculator", "winst-verlies", "zzp-tarief"] },
  { slug: "box3-berekenen", categorySlug: "geld-en-verzekeringen", title: "Box 3 Berekening", description: "Bereken de belasting over je box 3 vermogen in 2026.", metaTitle: "Box 3 Inkomstenbelasting Berekenen 2026 | Rekenhet.nl", metaDescription: "Gratis box 3 calculator voor belasting over sparen en beleggen.", keywords: ["box 3", "box 3 belasting", "sparen en beleggen", "inkomstenbelasting", "belasting 2026"], featured: true, relatedSlugs: ["vermogensbelasting-box3", "spaardoel-berekenen"] },
  { slug: "dividend-berekenen", categorySlug: "geld-en-verzekeringen", title: "Dividend Belasting Berekenen", description: "Bereken de dividendbelasting en netto dividend na belasting.", metaTitle: "Dividend Belasting Berekenen — Netto Dividend | Rekenhet.nl", metaDescription: "Gratis dividend calculator voor bruto naar netto dividend.", keywords: ["dividend", "dividendbelasting", "dividend berekenen", "aandelen", "inkomsten"], featured: true, relatedSlugs: [] },
  { slug: "fire-berekenen", categorySlug: "geld-en-verzekeringen", title: "FIRE Berekenen — Financieel Onafhankelijk", description: "Bereken hoe lang je nodig hebt om financieel onafhankelijk te worden (FIRE).", metaTitle: "FIRE Berekenen — Financiële Onafhankelijkheid | Rekenhet.nl", metaDescription: "Gratis FIRE calculator voor financiële onafhankelijkheid en vroegpensioen.", keywords: ["fire", "financieel onafhankelijk", "vroegpensioen", "sparen", "beleggen FIRE"], featured: true, relatedSlugs: ["compound-interest", "spaardoel-berekenen"] },
  { slug: "kinderbijslag", categorySlug: "geld-en-verzekeringen", title: "Kinderbijslag Berekenen", description: "Bereken de kinderbijslag op basis van het aantal kinderen en kwartaal.", metaTitle: "Kinderbijslag Berekenen 2026 | Rekenhet.nl", metaDescription: "Gratis kinderbijslag calculator voor 2026.", keywords: ["kinderbijslag", "kindgebonden budget", "kinderen", "toeslag", "svb"], featured: true, relatedSlugs: ["kinderopvangtoeslag"] },
  { slug: "kinderalimentatie", categorySlug: "geld-en-verzekeringen", title: "Kinderalimentatie Berekenen", description: "Bereken de kinderalimentatie op basis van inkomen en kosten.", metaTitle: "Kinderalimentatie Berekenen | Rekenhet.nl", metaDescription: "Gratis kinderalimentatie calculator voor maandelijkse bijdrage.", keywords: ["kinderalimentatie", "alimentatie", "kinderen", "scheiding", "onderhoudsbijdrage"], featured: true, relatedSlugs: [] },
  { slug: "schenkbelasting", categorySlug: "geld-en-verzekeringen", title: "Schenkbelasting Berekenen", description: "Bereken de schenkbelasting op basis van het bedrag en de relatie.", metaTitle: "Schenkbelasting Berekenen 2026 | Rekenhet.nl", metaDescription: "Gratis schenkbelasting calculator voor 2026 met vrijstellingen.", keywords: ["schenkbelasting", "schenking", "vrijstelling", "belasting", "schenken 2026"], featured: true, relatedSlugs: [] },
  { slug: "aow-leeftijd", categorySlug: "geld-en-verzekeringen", title: "AOW Leeftijd Berekenen", description: "Bereken je AOW-leeftijd en AOW-bedrag op basis van geboortedatum.", metaTitle: "AOW Leeftijd Berekenen | Rekenhet.nl", metaDescription: "Gratis AOW leeftijd calculator voor je pensioenleeftijd.", keywords: ["aow leeftijd", "aow", "pensioenleeftijd", "aow datum", "wanneer aow"], featured: true, relatedSlugs: [] },
  { slug: "isde-subsidie", categorySlug: "geld-en-verzekeringen", title: "ISDE Subsidie Berekenen", description: "Bereken de ISDE-subsidie voor warmtepomp, zonneboiler of isolatie.", metaTitle: "ISDE Subsidie Berekenen 2026 | Rekenhet.nl", metaDescription: "Gratis ISDE subsidie calculator voor duurzame maatregelen.", keywords: ["isde subsidie", "subsidie warmtepomp", "duurzame energie subsidie", "isolatie subsidie"], featured: true, relatedSlugs: ["energielabel-berekenen"] },
  { slug: "extra-aflossen", categorySlug: "geld-en-verzekeringen", title: "Extra Aflossen Hypotheek", description: "Bereken wat extra aflossen op je hypotheek oplevert aan rentebesparing.", metaTitle: "Extra Aflossen Hypotheek — Rentebesparing | Rekenhet.nl", metaDescription: "Gratis extra aflossen calculator voor je hypotheek.", keywords: ["extra aflossen", "hypotheek aflossen", "rentebesparing", "boetevrij aflossen"], featured: true, relatedSlugs: ["annuiteiten-lasten", "lineaire-aflossing"] },
  { slug: "bloeddruk", categorySlug: "gezondheid", title: "Bloeddruk Calculator", description: "Bereken en beoordeel je bloeddruk op basis van systolische en diastolische waarden.", metaTitle: "Bloeddruk Berekenen & Beoordelen | Rekenhet.nl", metaDescription: "Gratis bloeddruk calculator voor het beoordelen van je bloeddruk.", keywords: ["bloeddruk", "bloeddruk meten", "systolisch", "diastolisch", "gezondheid"], featured: true, relatedSlugs: ["hartslagzones"] },
  { slug: "lichaamsvet-percentage", categorySlug: "gezondheid", title: "Lichaamsvet Percentage", description: "Bereken je lichaamsvetpercentage op basis van metingen en geslacht.", metaTitle: "Lichaamsvet Percentage Berekenen | Rekenhet.nl", metaDescription: "Gratis lichaamsvet percentage calculator voor mannen en vrouwen.", keywords: ["lichaamsvet percentage", "vetpercentage", "BMI alternatief", "gezondheid", "body fat"], featured: true, relatedSlugs: ["bmi-calculator", "ideaal-gewicht"] },
  { slug: "kwadratische-vergelijking", categorySlug: "wiskunde", title: "Kwadratische Vergelijking Oplossen", description: "Los kwadratische vergelijkingen op (ax²+bx+c=0) met de ABC-formule.", metaTitle: "Kwadratische Vergelijking Oplossen — ABC Formule | Rekenhet.nl", metaDescription: "Gratis kwadratische vergelijking solver met de ABC-formule.", keywords: ["kwadratische vergelijking", "abc formule", "wortelformule", "discriminant", "wiskunde"], featured: true, relatedSlugs: ["procenten-calculator"] },
  { slug: "oppervlakte-berekenen", categorySlug: "wiskunde", title: "Oppervlakte Berekenen", description: "Bereken de oppervlakte van cirkel, driehoek, rechthoek, cilinder, bol en kegel.", metaTitle: "Oppervlakte Berekenen — Cirkel, Driehoek & Meer | Rekenhet.nl", metaDescription: "Gratis oppervlakte calculator voor geometrische vormen.", keywords: ["oppervlakte berekenen", "cirkel", "driehoek", "rechthoek", "meetkunde", "wiskunde"], featured: true, relatedSlugs: ["oppervlakte-omrekenen"] },
  { slug: "zzp-tarief", categorySlug: "ondernemen", title: "ZZP Uurtarief Berekenen", description: "Bereken je ideale ZZP uurtarief op basis van gewenst inkomen, kosten en vrije dagen.", metaTitle: "ZZP Uurtarief Berekenen — Tariefbepaling | Rekenhet.nl", metaDescription: "Gratis ZZP uurtarief calculator voor je ideale uurtarief.", keywords: ["zzp tarief", "uurtarief", "zzp", "tarief berekenen", "freelance tarief"], featured: true, relatedSlugs: ["uurtarief-kostprijs", "uurtarief-berekenen"] },
  { slug: "lichaamsoppervlakte", categorySlug: "gezondheid", title: "Lichaamsoppervlakte (BSA) Berekenen", description: "Bereken je Body Surface Area (BSA) met Mosteller, DuBois of Boyd formule.", metaTitle: "Lichaamsoppervlakte BSA Berekenen — Mosteller | Rekenhet.nl", metaDescription: "Gratis BSA calculator voor lichaamsoppervlakte met 3 formules.", keywords: ["lichaamsoppervlakte", "bsa", "body surface area", "mosteller", "dubois", "boyd"], featured: true, relatedSlugs: ["bmi-calculator"] },
];

// ─── Category display labels ───

const CATEGORY_LABELS: Record<string, string> = {
  "werk-en-inkomen": "Werk & Inkomen",
  ondernemen: "Ondernemen",
  "geld-en-verzekeringen": "Geld & Verzekeringen",
  gezondheid: "Gezondheid",
  wiskunde: "Wiskunde",
  "auto-vervoer": "Auto & Vervoer",
  algemeen: "Algemeen",
  hypotheek: "Hypotheek & Wonen",
};

// ─── Content generation helpers ───

function generateSlug(title: string, calculatorSlug: string): string {
  // Create a slug from the calculator slug, replacing common patterns
  const slug = calculatorSlug
    .replace(/-calculator$/, "")
    .replace(/-berekenen$/, "")
    .replace(/-berekenen/, "");
  return slug;
}

function generateTitle(calc: CalcEntry): string {
  return calc.metaTitle;
}

function generateDescription(calc: CalcEntry): string {
  return calc.metaDescription;
}

function generateH1(calc: CalcEntry): string {
  const cat = calc.categorySlug;
  if (cat === "wiskunde") {
    return `${calc.title} — Reken het snel en foutloos uit`;
  }
  if (cat === "gezondheid") {
    return `${calc.title} — Direct inzicht in je gezondheid`;
  }
  if (cat === "algemeen") {
    return `${calc.title} — Snel en nauwkeurig omrekenen`;
  }
  if (cat === "auto-vervoer") {
    return `${calc.title} — Bereken je autokosten`;
  }
  return `${calc.title} — Bereken het eenvoudig en snel`;
}

function generateIntro(calc: CalcEntry): string {
  const cat = calc.categorySlug;
  const name = calc.title;

  if (cat === "werk-en-inkomen") {
    return `Wil je precies weten hoeveel je overhoudt of ontvangt? Deze ${name} geeft je direct inzicht. ${calc.description} Of je nu werknemer of werkgever bent, binnen enkele seconden zie je het resultaat op basis van de actuele 2026-regels en tarieven.`;
  }
  if (cat === "ondernemen") {
    return `Als ondernemer wil je grip op je cijfers. Deze ${name} helpt je snel en eenvoudig. ${calc.description} Gebruik de tool om verschillende scenario's door te rekenen en weloverwogen beslissingen te nemen voor je bedrijf.`;
  }
  if (cat === "geld-en-verzekeringen") {
    return `Of het nu gaat om belasting, spaargeld of verzekeringen — met deze ${name} weet je waar je aan toe bent. ${calc.description} De calculator werkt met de actuele 2026-tarieven en -regels, zodat je altijd een reëel beeld krijgt.`;
  }
  if (cat === "gezondheid") {
    return `Een gezonde leefstijl begint met inzicht. Deze ${name} geeft je direct duidelijkheid. ${calc.description} Het is een handig hulpmiddel om je gezondheid te monitoren en doelen te stellen. Gebruik de resultaten als richtlijn en raadpleeg bij twijfel een arts of specialist.`;
  }
  if (cat === "wiskunde") {
    return `Rekenen hoeft niet moeilijk te zijn. Met de ${name} voer je snel en foutloos berekeningen uit. ${calc.description} Of je nu student, docent of professional bent — deze tool bespaart tijd en geeft je direct het juiste antwoord.`;
  }
  if (cat === "auto-vervoer") {
    return `Autokosten kunnen flink oplopen. Met deze ${name} krijg je inzicht in je uitgaven. ${calc.description} Zo weet je precies waar je aan toe bent en kun je onverwachte kosten voorkomen.`;
  }
  if (cat === "algemeen") {
    return `Snel en nauwkeurig omrekenen of berekenen doe je met de ${name}. ${calc.description} Bespaar tijd en voorkom rekenfouten met deze eenvoudige tool.`;
  }
  if (cat === "hypotheek") {
    return `Een huis kopen of verbouwen brengt grote financiële beslissingen met zich mee. Met deze ${name} bereken je eenvoudig wat er financieel mogelijk is. ${calc.description} Zo weet je precies waar je aan toe bent voordat je een gesprek met de bank of hypotheekadviseur aangaat.`;
  }

  return `Met deze ${name} bereken je eenvoudig en snel het juiste resultaat. ${calc.description} De tool is gratis en geeft direct inzicht.`;
}

function generateConclusion(calc: CalcEntry): string {
  const cat = calc.categorySlug;

  if (cat === "werk-en-inkomen") {
    return `Het exacte bedrag hangt af van jouw persoonlijke situatie. Deze calculator geeft een indicatie op basis van de 2026-regels. Voor een definitieve berekening raadpleeg je een salarisadviseur of je werkgever. Gebruik de tool om verschillende scenario's door te rekenen en weloverwogen keuzes te maken.`;
  }
  if (cat === "ondernemen") {
    return `Deze calculator geeft je een helder beeld van je financiële situatie als ondernemer. De daadwerkelijke bedragen kunnen afwijken op basis van je persoonlijke omstandigheden en het geldende belastingtarief. Raadpleeg een fiscalist of boekhouder voor definitief advies op maat.`;
  }
  if (cat === "geld-en-verzekeringen") {
    return `Of je nu spaart, belegt, een lening afsluit of belasting betaalt — deze calculator geeft je inzicht in je financiële situatie. Houd er rekening mee dat persoonlijke omstandigheden het definitieve bedrag kunnen beïnvloeden. Voor een officiële berekening raadpleeg je een financieel adviseur.`;
  }
  if (cat === "gezondheid") {
    return `Deze calculator geeft een indicatie op basis van wetenschappelijke formules en gemiddelden. Het is geen medisch advies en vervangt geen consult bij een arts, diëtist of specialist. Gebruik de inzichten als leidraad voor een gezonde leefstijl en raadpleeg bij vragen altijd een deskundige.`;
  }
  if (cat === "wiskunde") {
    return `Of je nu een formule wilt controleren, een som wilt maken of een rekentool nodig hebt — deze calculator geeft je het juiste antwoord. De tool is ideaal voor thuis, op school of op kantoor en helpt je tijd te besparen bij dagelijkse wiskundige berekeningen.`;
  }
  if (cat === "auto-vervoer") {
    return `Deze calculator geeft een reële schatting van je autokosten of boetebedrag. Houd er rekening mee dat daadwerkelijke kosten kunnen afwijken door persoonlijke omstandigheden, actuele brandstofprijzen of specifieke situaties. Raadpleeg bij twijfel de officiële bronnen zoals de RDW, het CJIB of de Belastingdienst.`;
  }
  if (cat === "algemeen") {
    return `Of je nu kookt, computerwerk doet of een bouwproject hebt — deze calculator helpt je snel en accuraat te rekenen en omrekenen. De tool is volledig gratis en werkt direct. Geen registratie nodig, geen gedoe.`;
  }
  if (cat === "hypotheek") {
    return `Deze calculator geeft een indicatie van je hypotheekmogelijkheden. De daadwerkelijke leencapaciteit hangt af van een volledige beoordeling door een hypotheekadviseur of geldverstrekker. De actuele leennormen en rentetarieven zijn verwerkt, maar een persoonlijk gesprek blijft noodzakelijk voor een definitief advies.`;
  }

  return `De calculator geeft een betrouwbare indicatie op basis van de door jou ingevoerde gegevens. Voor een definitief advies raadpleeg je een deskundige op het betreffende gebied.`;
}

function generateFaqs(calc: CalcEntry): { question: string; answer: string }[] {
  const cat = calc.categorySlug;
  const name = calc.title;

  // Base FAQs per calculator — we create 4-5 tailored questions
  const faqs: { question: string; answer: string }[] = [];

  // Q1: What is this calculator for
  faqs.push({
    question: `Wat is ${name} en hoe gebruik ik hem?`,
    answer: `${name} is een gratis online tool waarmee je ${calc.description.replace(/\.$/, "").toLocaleLowerCase('nl-NL')}. Je vult de gevraagde gegevens in en het resultaat verschijnt direct. De calculator werkt met de meest actuele gegevens en tarieven, zodat je altijd een reële uitkomst krijgt. Geen registratie nodig en volledig gratis te gebruiken.`,
  });

  // Q2: What data/rates are used
  if (["werk-en-inkomen", "ondernemen", "geld-en-verzekeringen", "hypotheek"].includes(cat)) {
    faqs.push({
      question: `Zijn de tarieven en regels up-to-date voor 2026?`,
      answer: `Ja, deze calculator werkt met de actuele 2026-tarieven en -regels. De bedragen worden jaarlijks bijgewerkt op basis van de officiële publicaties van de Belastingdienst, het UWV en andere overheidsinstanties. Je kunt er dus op vertrouwen dat de berekening klopt met de meest recente wet- en regelgeving.`,
    });
  } else {
    faqs.push({
      question: `Hoe nauwkeurig is ${name}?`,
      answer: `De calculator werkt met de meest actuele standaardwaarden, wetenschappelijke formules of officiële tarieven. De uitkomst is een betrouwbare indicatie op basis van jouw invoer. Houd er rekening mee dat persoonlijke omstandigheden of afwijkingen van de standaard het resultaat kunnen beïnvloeden.`,
    });
  }

  // Q3: When to use
  faqs.push({
    question: `In welke situaties gebruik ik ${name}?`,
    answer: `Je gebruikt deze calculator wanneer je snel inzicht wilt in ${cat === 'gezondheid' ? 'je gezondheidsgegevens' : cat === 'wiskunde' ? 'een wiskundige berekening' : cat === 'algemeen' ? 'een omrekening of berekening' : 'een financiële situatie'}. Het is handig voor thuis, op het werk of onderweg. Omdat de tool gratis is en geen registratie vereist, kun je hem onbeperkt gebruiken voor verschillende scenario's.`,
  });

  // Q4: Comparison or limitation
  if (cat === "gezondheid") {
    faqs.push({
      question: `Is deze calculator medisch advies?`,
      answer: `Nee, deze calculator geeft een indicatie op basis van algemene formules en gemiddelden. Het is geen medisch advies en vervangt geen consult bij een arts of specialist. Gebruik de resultaten als richtlijn om je gezondheid te monitoren, maar raadpleeg altijd een deskundige voor persoonlijk medisch advies.`,
    });
  } else if (cat === "geld-en-verzekeringen") {
    faqs.push({
      question: `Kan ik deze berekening gebruiken voor mijn belastingaangifte?`,
      answer: `De calculator geeft een reële indicatie, maar is niet officieel. Voor je belastingaangifte gebruik je altijd de officiële berekening van de Belastingdienst of een belastingadviseur. Deze tool is bedoeld om je een snel inzicht te geven, zodat je voorbereid bent en weet wat je ongeveer kunt verwachten.`,
    });
  } else if (cat === "ondernemen") {
    faqs.push({
      question: `Kan ik deze berekening gebruiken voor mijn boekhouding?`,
      answer: `De calculator geeft een betrouwbare indicatie om snel inzicht te krijgen. Gebruik de uitkomsten als richtlijn en overleg altijd met je boekhouder of fiscalist voor de definitieve verwerking in je administratie. De tool is ideaal om scenario's door te rekenen voordat je beslissingen neemt.`,
    });
  } else if (cat === "hypotheek") {
    faqs.push({
      question: `Kan ik vertrouwen op deze berekening voor mijn hypotheekaanvraag?`,
      answer: `De calculator geeft een indicatie van wat er financieel mogelijk is op basis van de standaard Nibud-leennormen. Een hypotheekverstrekker doet een volledige toets op basis van je complete financiële situatie. Gebruik deze tool als eerste indicatie, maar vraag altijd een hypotheekadviseur om een definitieve berekening.`,
    });
  } else {
    faqs.push({
      question: `Zijn er beperkingen waar ik rekening mee moet houden?`,
      answer: `De calculator werkt met standaardwaarden en algemene formules. Bijzondere situaties of uitzonderingen worden niet altijd meegenomen. Gebruik de uitkomst als richtlijn en raadpleeg een deskundige voor een definitief advies op maat.`,
    });
  }

  // Q5: Specific to this calculator
  if (calc.relatedSlugs && calc.relatedSlugs.length > 0) {
    faqs.push({
      question: `Welke andere calculators zijn handig om ook te gebruiken?`,
      answer: `Naast ${name} zijn er op Rekenhet.nl nog meer handige calculators die je kunt gebruiken. Kijk ook eens naar de andere tools in de categorie ${CATEGORY_LABELS[cat] || cat}. Ze vullen elkaar aan en geven je een completer beeld van je situatie.`,
    });
  } else {
    faqs.push({
      question: `Wat kost het gebruik van deze calculator?`,
      answer: `Helemaal niets! Alle calculators op Rekenhet.nl zijn volledig gratis te gebruiken. Je hoeft je niet te registreren, geen app te downloaden en geen persoonlijke gegevens achter te laten. Vul je gegevens in en het resultaat verschijnt direct.`,
    });
  }

  return faqs;
}

// ─── Main generation function ───

function generate() {
  const pagesDir = path.join(__dirname, "..", "content", "pages");
  const existingFiles = new Set(fs.readdirSync(pagesDir).map((f) => f.replace(/\.ts$/, "")));
  const newPages: string[] = [];
  const skipped: string[] = [];

  const force = process.argv.includes("--force");

  for (const calc of calculators) {
    // Check if this calculator slug already has a content page
    const existingSlug = CALC_TO_CONTENT_SLUG[calc.slug];
    if (!force && existingSlug && existingFiles.has(existingSlug)) {
      skipped.push(calc.slug);
      continue;
    }

    // Generate content page slug
    const pageSlug = generateSlug(calc.title, calc.slug);

    // Check if file already exists
    if (!force && existingFiles.has(pageSlug)) {
      skipped.push(calc.slug);
      continue;
    }

    const title = generateTitle(calc);
    const description = generateDescription(calc);
    const h1 = generateH1(calc);
    const intro = generateIntro(calc);
    const conclusion = generateConclusion(calc);
    const faqs = generateFaqs(calc);
    const categoryLabel = CATEGORY_LABELS[calc.categorySlug] || calc.categorySlug;

    // Add all keywords from calculator + some extras
    const keywords = [...new Set([
      ...calc.keywords,
      calc.slug.replace(/-/g, " "),
      `${calc.slug.replace(/-/g, " ")} 2026`,
    ])];

    const content = `import { registerPages } from "../types";

registerPages({
  slug: "${pageSlug}",
  seo: {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    h1: ${JSON.stringify(h1)},
    intro: ${JSON.stringify(intro)},
    conclusion: ${JSON.stringify(conclusion)},
    keywords: ${JSON.stringify(keywords)},
  },
  calculator: {
    componentSlug: "${calc.slug}",
    categorySlug: "${calc.categorySlug}",
  },
  categoryLabel: "${categoryLabel}",
  faqs: ${JSON.stringify(faqs, null, 2)},
});
`;

    const filePath = path.join(pagesDir, `${pageSlug}.ts`);
    fs.writeFileSync(filePath, content, "utf-8");
    newPages.push(pageSlug);
    console.log(`  ✅ ${pageSlug}.ts`);
  }

  console.log(`\n✨ Generated ${newPages.length} new content page(s)`);
  console.log(`   Skipped ${skipped.length} calculator(s) (already have pages)`);

  // Show which calculators still need pages
  if (newPages.length > 0) {
    console.log("\n📄 New pages:");
    newPages.forEach((p) => console.log(`   - ${p}`));
  }
}

// ─── Run ───

console.log("🚀 Programmatic SEO Content Page Generator\n");
console.log(`📁 Output directory: ${path.join(__dirname, "..", "content", "pages")}`);
console.log(`📊 Total calculators in registry: ${calculators.length}\n`);
console.log("Usage: npx tsx src/scripts/generate-content-pages.ts [--force]");
console.log("  --force  Regenerate all pages (overwrite existing)\n");
generate();
