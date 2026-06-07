import type { ResultRow } from "@/types";

/**
 * Calculator metadata used for SEO, routing, and rendering.
 * Each calculator must be registered here.
 */
export interface CalculatorMeta {
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

/**
 * Registry of all calculators with metadata.
 * Update this when adding a new calculator.
 */
const registry: CalculatorMeta[] = [
  {
    slug: "btw-calculator",
    categorySlug: "ondernemen",
    title: "BTW Calculator",
    description:
      "Bereken snel en eenvoudig de BTW over elk bedrag. Kies uit 21%, 9% of 0% tarief en bereken inclusief of exclusief BTW.",
    metaTitle:
      "BTW Calculator | Bereken Inclusief & Exclusief BTW (21%, 9%, 0%)",
    metaDescription:
      "Gratis BTW calculator. Bereken eenvoudig het BTW bedrag bij 21%, 9% of 0% tarief. Kies voor berekenen inclusief of exclusief BTW.",
    keywords: [
      "btw calculator",
      "btw berekenen",
      "omzetbelasting",
      "21% btw",
      "9% btw",
    ],
    featured: true,
    relatedSlugs: [],
  },
  {
    slug: "bruto-netto-salaris-calculator",
    categorySlug: "werk-en-inkomen",
    title: "Bruto Netto Salaris Calculator",
    description:
      "Bereken je netto salaris op basis van je bruto jaarsalaris. Rekening houdend met belasting, premies, vakantietoeslag.",
    metaTitle:
      "Bruto Netto Salaris Calculator | Bereken Je Netto Salaris 2026",
    metaDescription:
      "Gratis bruto netto salaris calculator. Vul je bruto jaarsalaris in en ontdek direct je netto maandloon, vakantietoeslag en meer.",
    keywords: [
      "bruto netto calculator",
      "salaris berekenen",
      "netto salaris",
      "loonberekening",
    ],
    featured: true,
    relatedSlugs: [],
  },
  {
    slug: "bmi-calculator",
    categorySlug: "gezondheid",
    title: "BMI Calculator",
    description:
      "Bereken je Body Mass Index op basis van je lengte en gewicht. Ontdek direct of je een gezond gewicht hebt en ontvang persoonlijk advies.",
    metaTitle:
      "BMI Calculator — Bereken Je Body Mass Index | Rekenhet.nl",
    metaDescription:
      "Gratis BMI calculator. Voer je lengte en gewicht in en ontdek direct je BMI, gewichtscategorie en persoonlijk advies voor een gezond gewicht.",
    keywords: [
      "bmi calculator",
      "bmi berekenen",
      "body mass index",
      "gezond gewicht",
      "ideal gewicht",
    ],
    featured: true,
    relatedSlugs: [],
  },
  {
    slug: "procenten-calculator",
    categorySlug: "wiskunde",
    title: "Procenten Calculator",
    description:
      "Bereken eenvoudig procenten: deel van geheel, procentuele toename of afname, en van getal naar getal. Perfect voor kortingen, rente en groei.",
    metaTitle:
      "Procenten Calculator — Bereken Percentage & Procentuele Toename | Rekenhet.nl",
    metaDescription:
      "Gratis procenten calculator. Bereken eenvoudig percentages, procentuele stijging of daling en relatieve veranderingen. Direct resultaat.",
    keywords: [
      "procenten calculator",
      "percentage berekenen",
      "procentuele toename",
      "korting berekenen",
    ],
    featured: true,
    relatedSlugs: [],
  },
  {
    slug: "lengte-omrekenen",
    categorySlug: "algemeen",
    title: "Lengte Omrekenen",
    description:
      "Reken eenvoudig lengtematen om: millimeter, centimeter, decimeter, meter, kilometer, inch, foot, yard en mile. Direct resultaat.",
    metaTitle:
      "Lengte Omrekenen — mm, cm, m, km, inch, ft | Gratis | Rekenhet.nl",
    metaDescription:
      "Gratis lengte omrekentool. Converteer millimeters, centimeters, meters, kilometers, inches, feet, yards en miles. Gebruik de live calculator.",
    keywords: [
      "lengte omrekenen",
      "cm naar m",
      "meter naar kilometer",
      "inch naar cm",
      "feet naar meter",
    ],
    featured: true,
    relatedSlugs: ["gewicht-omrekenen", "oppervlakte-omrekenen"],
  },
  {
    slug: "gewicht-omrekenen",
    categorySlug: "algemeen",
    title: "Gewicht Omrekenen",
    description:
      "Reken eenvoudig gewichten om: milligram, gram, kilogram, pond, ons, ounce en pound. Direct resultaat met omrekentabel.",
    metaTitle:
      "Gewicht Omrekenen — mg, g, kg, pond, lbs | Gratis | Rekenhet.nl",
    metaDescription:
      "Gratis gewicht omrekentool. Converteer milligrammen, grammen, kilogrammen, ponden, ounces en pounds. Gebruik de live calculator.",
    keywords: [
      "gewicht omrekenen",
      "kg naar pond",
      "gram naar ons",
      "pond naar kg",
      "lbs naar kg",
    ],
    featured: true,
    relatedSlugs: ["lengte-omrekenen", "oppervlakte-omrekenen"],
  },
  {
    slug: "oppervlakte-omrekenen",
    categorySlug: "algemeen",
    title: "Oppervlakte Omrekenen",
    description:
      "Reken eenvoudig oppervlaktematen om: mm², cm², m², km², are en hectare. Direct resultaat met omrekentabel.",
    metaTitle:
      "Oppervlakte Omrekenen — m², are, hectare | Gratis | Rekenhet.nl",
    metaDescription:
      "Gratis oppervlakte omrekentool. Converteer vierkante meters, centimeters, kilometers, aren en hectaren. Gebruik de live calculator.",
    keywords: [
      "oppervlakte omrekenen",
      "m2 naar hectare",
      "are naar m2",
      "km2 naar hectare",
    ],
    featured: true,
    relatedSlugs: ["lengte-omrekenen", "gewicht-omrekenen"],
  },
  {
    slug: "auto-motor-omrekenen",
    categorySlug: "auto-vervoer",
    title: "Auto & Motor Omrekenen",
    description:
      "Reken eenvoudig autogerelateerde eenheden om: kW naar pk, Nm naar ft-lbs, bar naar PSI. Perfect voor automotive en technische berekeningen.",
    metaTitle:
      "Auto & Motor Omrekenen — kW, pk, Nm, bar, PSI | Gratis | Rekenhet.nl",
    metaDescription:
      "Gratis automotive omrekentool. Converteer kilowatt naar pk, newtonmeter naar foot-pound, bar naar PSI. Gebruik de live calculator.",
    keywords: [
      "auto omrekenen",
      "kW naar pk",
      "Nm naar ft-lbs",
      "bar naar PSI",
      "motorvermogen",
    ],
    featured: true,
    relatedSlugs: ["energie-omrekenen", "lengte-omrekenen"],
  },
  {
    slug: "energie-omrekenen",
    categorySlug: "algemeen",
    title: "Energie Omrekenen",
    description:
      "Reken eenvoudig energie-eenheden om: joule, kilojoule, BTU, kWh, calorie. Ook elektrisch vermogen: watt, ampère (230V) en megawatt.",
    metaTitle:
      "Energie Omrekenen — J, kWh, BTU, W, A | Gratis | Rekenhet.nl",
    metaDescription:
      "Gratis energie-omrekentool. Converteer joule, kWh, BTU, calorie, watt en ampère. Gebruik de live calculator.",
    keywords: [
      "energie omrekenen",
      "kWh naar joule",
      "BTU naar kWh",
      "watt naar ampère",
    ],
    featured: true,
    relatedSlugs: ["auto-motor-omrekenen", "data-omrekenen"],
  },
  {
    slug: "koken-omrekenen",
    categorySlug: "algemeen",
    title: "Koken & Bakken Omrekenen",
    description:
      "Reken eenvoudig keukenmaten om: ml, cups, fl_oz, eetlepels, theelepels. Ook grammen voor bloem, suiker, boter, rijst en honing.",
    metaTitle:
      "Koken & Bakken Omrekenen — ml, cups, gram | Gratis | Rekenhet.nl",
    metaDescription:
      "Gratis keukenomrekentool. Converteer milliliters, cups, fluid ounces, eetlepels en grammen voor bloem, suiker, boter en meer.",
    keywords: [
      "koken omrekenen",
      "cups naar ml",
      "gram naar cups",
      "eetlepel naar ml",
      "keukenmaten",
    ],
    featured: true,
    relatedSlugs: ["gewicht-omrekenen", "energie-omrekenen"],
  },
  {
    slug: "data-omrekenen",
    categorySlug: "algemeen",
    title: "Data Omrekenen",
    description:
      "Reken eenvoudig digitale opslag om: bytes, kilobytes, megabytes, gigabytes, terabits, megabits en gigabits. Perfect voor IT en tech.",
    metaTitle:
      "Data Omrekenen — MB, GB, TB, Mb, Gb | Gratis | Rekenhet.nl",
    metaDescription:
      "Gratis data-omrekentool. Converteer bytes, kilobytes, megabytes, gigabytes, terabits, megabits en gigabits. Gebruik de live calculator.",
    keywords: [
      "data omrekenen",
      "MB naar GB",
      "GB naar TB",
      "megabit naar megabyte",
    ],
    featured: true,
    relatedSlugs: ["energie-omrekenen", "auto-motor-omrekenen"],
  },
  {
    slug: "ritkosten-berekenen",
    categorySlug: "auto-vervoer",
    title: "Ritkosten Berekenen",
    description: "Bereken de totale kosten van een autorit: brandstofkosten, tol en parkeren. Inclusief CO₂-uitstoot. Handig voor woon-werkverkeer en zakelijke ritten.",
    metaTitle: "Ritkosten Berekenen — Brandstof, Tol & Parkeren | Rekenhet.nl",
    metaDescription: "Gratis ritkostencalculator. Bereken brandstofkosten, tol, parkeren en CO₂-uitstoot voor elke autorit.",
    keywords: ["ritkosten berekenen", "brandstofkosten", "autokosten", "woon-werkverkeer"],
    featured: true,
    relatedSlugs: ["snelheidsboete-calculator"],
  },
  {
    slug: "snelheidsboete-calculator",
    categorySlug: "auto-vervoer",
    title: "Snelheidsboete Calculator",
    description: "Bereken direct je boete bij te hard rijden. Voor snelwegen en binnenwegen. Boetebedragen op basis van 2026 OM-tarieven.",
    metaTitle: "Snelheidsboete Calculator — Boetebedrag 2026 | Rekenhet.nl",
    metaDescription: "Gratis snelheidsboete calculator. Bereken je boetebedrag op basis van snelheid, limiet en wegtype. Actuele OM-tarieven.",
    keywords: ["snelheidsboete", "boete berekenen", "te hard rijden boete"],
    featured: true,
    relatedSlugs: ["ritkosten-berekenen"],
  },
  {
    slug: "uurtarief-berekenen",
    categorySlug: "werk-en-inkomen",
    title: "Uurtarief naar Netto Maandinkomen",
    description: "Bereken je netto maand- en jaarsalaris op basis van je uurtarief en werkuren. Inclusief vakantiegeld en 2026 belastingregels.",
    metaTitle: "Uurtarief naar Netto Maandinkomen — Berekenen | Rekenhet.nl",
    metaDescription: "Gratis calculator. Zet je uurtarief om naar netto maandinkomen. Rekening houdend met 2026 belastingtarieven en vakantiegeld.",
    keywords: ["uurtarief berekenen", "uurtarief naar maandsalaris", "zzp netto inkomen"],
    featured: true,
    relatedSlugs: ["parttime-factor", "bruto-netto-salaris-calculator"],
  },
  {
    slug: "btw-incl-excl",
    categorySlug: "ondernemen",
    title: "BTW Inclusief/Exclusief",
    description: "Bereken snel het BTW-bedrag en totaal inclusief of exclusief BTW. Kies uit 21%, 9% of 0% tarief.",
    metaTitle: "BTW Inclusief of Exclusief Berekenen — Snel & Gratis | Rekenhet.nl",
    metaDescription: "Gratis BTW calculator. Bereken eenvoudig bedragen inclusief of exclusief BTW met de tarieven 21%, 9% en 0%.",
    keywords: ["btw inclusief exclusief", "btw berekenen", "btw bedrag"],
    featured: true,
    relatedSlugs: ["btw-calculator"],
  },
  {
    slug: "parttime-factor",
    categorySlug: "werk-en-inkomen",
    title: "Parttime Salaris Factor",
    description: "Bereken je parttime salaris op basis van je fulltime salaris en het aantal uren dat je gaat werken. Inclusief procentuele factor.",
    metaTitle: "Parttime Salaris Berekenen — Factor & Uren | Rekenhet.nl",
    metaDescription: "Gratis parttime calculator. Bereken je salaris bij minder uren op basis van je fulltime inkomen en de parttime factor.",
    keywords: ["parttime salaris", "parttime factor", "salaris bij minder uren"],
    featured: true,
    relatedSlugs: ["uurtarief-berekenen", "bruto-netto-salaris-calculator"],
  },
  {
    slug: "maximale-hypotheek",
    categorySlug: "hypotheek",
    title: "Sneltest Maximale Hypotheek",
    description: "Ontdek snel wat je maximale hypotheek is op basis van je inkomen, partnerinkomen, rente en looptijd.",
    metaTitle: "Maximale Hypotheek Berekenen — Sneltest | Rekenhet.nl",
    metaDescription: "Gratis sneltest voor je maximale hypotheek. Bereken je leencapaciteit op basis van inkomen, rente en looptijd.",
    keywords: ["maximale hypotheek", "hypotheek berekenen", "hoeveel hypotheek"],
    featured: true,
    relatedSlugs: ["annuiteiten-lasten", "bruto-netto-salaris-calculator"],
  },
  {
    slug: "annuiteiten-lasten",
    categorySlug: "geld-en-verzekeringen",
    title: "Annuïtaire Maandlasten",
    description: "Bereken je bruto maandlasten voor een annuïteitenhypotheek. Inclusief totale rente en totale betaling over de looptijd.",
    metaTitle: "Annuïteitenhypotheek Maandlasten Berekenen | Rekenhet.nl",
    metaDescription: "Gratis annuïteiten calculator. Bereken je maandlasten, totale rente en totale betaling voor een annuïteitenhypotheek.",
    keywords: ["annuïteit berekenen", "hypotheek maandlasten", "annuïtaire hypotheek"],
    featured: true,
    relatedSlugs: ["maximale-hypotheek"],
  },
  {
    slug: "netto-vakantiegeld",
    categorySlug: "werk-en-inkomen",
    title: "Netto Vakantiegeld",
    description:
      "Bereken wat je netto overhoudt van je vakantiegeld. Rekening houdend met belasting, premies en heffingskortingen in 2026.",
    metaTitle:
      "Netto Vakantiegeld Berekenen — 8% Regeling | Rekenhet.nl",
    metaDescription:
      "Gratis netto vakantiegeld calculator. Bereken je netto vakantietoeslag op basis van bruto salaris en 2026 belastingregels.",
    keywords: [
      "netto vakantiegeld",
      "vakantietoeslag berekenen",
      "8% vakantiegeld",
    ],
    featured: true,
    relatedSlugs: ["bruto-netto-salaris-calculator", "uurtarief-berekenen"],
  },
  {
    slug: "compound-interest",
    categorySlug: "geld-en-verzekeringen",
    title: "Vermogensgroei Tracker",
    description: "Bereken de groei van je vermogen met compound interest (samengestelde rente). Startkapitaal, maandelijkse inleg en rendement.",
    metaTitle: "Vermogensgroei Berekenen — Compound Interest | Rekenhet.nl",
    metaDescription: "Gratis vermogensgroei calculator. Bereken de eindwaarde van je beleggingen met samengestelde rente, startkapitaal en maandelijkse inleg.",
    keywords: ["vermogensgroei", "compound interest", "samengestelde rente", "beleggen groei"],
    featured: true,
    relatedSlugs: ["bruto-netto-salaris-calculator", "annuiteiten-lasten"],
  },
  {
    slug: "kenteken-check",
    categorySlug: "auto-vervoer",
    title: "Kenteken Check",
    description: "Voer een Nederlands kenteken in en ontdek direct merk, model, gewicht, CO₂, wegenbelasting (MRB) en bijtelling. RDW Open Data.",
    metaTitle: "Kenteken Check — Auto Gegevens & MRB Berekenen | Rekenhet.nl",
    metaDescription: "Gratis kenteken check. Ontdek alle auto-specificaties via de RDW: gewicht, brandstof, CO₂, motorrijtuigenbelasting en bijtelling.",
    keywords: ["kenteken check", "rdw kenteken", "autogegevens opzoeken", "wegenbelasting berekenen"],
    featured: true,
    relatedSlugs: ["ritkosten-berekenen", "snelheidsboete-calculator", "auto-motor-omrekenen"],
  },
  {
    slug: "gemeentelijke-belastingen",
    categorySlug: "algemeen",
    title: "Gemeentelijke Belastingen",
    description: "Ontdek de gemiddelde OZB, rioolheffing en afvalstoffenheffing in jouw gemeente op basis van postcode. Actuele CBS-data.",
    metaTitle: "Gemeentelijke Belastingen Check — OZB, Riool, Afval | Rekenhet.nl",
    metaDescription: "Gratis gemeentelijke belastingen check. Bereken OZB, rioolheffing en afvalstoffenheffing op basis van je postcode.",
    keywords: ["gemeentelijke belastingen", "ozb berekenen", "rioolheffing", "afvalstoffenheffing", "postcode check"],
    featured: true,
    relatedSlugs: [],
  },
  {
    slug: "zonnepanelen-opbrengst",
    categorySlug: "algemeen",
    title: "Zonnepanelen Opbrengst",
    description: "Bereken de jaarlijkse opbrengst van zonnepanelen op basis van regio, dakhelling, oriëntatie en aantal panelen. PVGIS-data van de EU.",
    metaTitle: "Zonnepanelen Opbrengst Calculator — PVGIS | Rekenhet.nl",
    metaDescription: "Gratis zonnepanelen opbrengst calculator. Berekend via de officiële EU PVGIS API. Inclusief financiële ROI en terugverdientijd.",
    keywords: ["zonnepanelen opbrengst", "zonne-energie berekenen", "pvgis", "terugverdientijd zonnepanelen"],
    featured: true,
    relatedSlugs: [],
  },
  {
    slug: "thuiswerken-vs-kantoor",
    categorySlug: "algemeen",
    title: "Thuiswerken vs Kantoordag",
    description: "Vergelijk de kosten van thuiswerken versus naar kantoor. Reisafstand, reiskosten, reistijd en besparing per jaar. OSRM-routegegevens.",
    metaTitle: "Thuiswerken vs Kantoordag — Kosten Vergelijken | Rekenhet.nl",
    metaDescription: "Gratis thuiswerken vs kantoordag calculator. Vergelijk reiskosten, reistijd en besparingen op basis van je postcode en OSRM-route.",
    keywords: ["thuiswerken", "kantoordag", "reiskosten vergelijken", "woon-werkverkeer"],
    featured: true,
    relatedSlugs: ["ritkosten-berekenen"],
  },
  {
    slug: "box3-berekenen",
    categorySlug: "geld-en-verzekeringen",
    title: "Box 3 Belasting Berekenen",
    description: "Bereken de vermogensrendementsheffing (Box 3) op basis van 2026 forfaitaire rendementen. Sparen vs beleggen, heffingsvrij vermogen.",
    metaTitle: "Box 3 Belasting Berekenen — 2026 | Rekenhet.nl",
    metaDescription: "Gratis Box 3 calculator. Bereken de belasting over je spaargeld en beleggingen met de 2026 split-rate regeling.",
    keywords: ["box 3 berekenen", "vermogensrendementsheffing", "box 3 belasting"],
    featured: true,
    relatedSlugs: ["compound-interest", "dividend-berekenen"],
  },
  {
    slug: "dividend-berekenen",
    categorySlug: "geld-en-verzekeringen",
    title: "Dividend Berekenen",
    description: "Bereken je netto dividendinkomsten na 15% dividendbelasting. Inclusief bruto/netto per jaar en maand.",
    metaTitle: "Dividend Berekenen — Netto Opbrengst | Rekenhet.nl",
    metaDescription: "Gratis dividend calculator. Bereken je netto dividend opbrengst na belasting op basis van investering en dividendpercentage.",
    keywords: ["dividend berekenen", "dividendbelasting", "netto dividend"],
    featured: true,
    relatedSlugs: ["box3-berekenen", "compound-interest"],
  },
  {
    slug: "fire-berekenen",
    categorySlug: "geld-en-verzekeringen",
    title: "FIRE Calculator",
    description: "Bereken wanneer je financieel onafhankelijk bent. Inclusief inflatie, veilig opnamepercentage en portefeuillegroei.",
    metaTitle: "FIRE Calculator — Financiële Onafhankelijkheid | Rekenhet.nl",
    metaDescription: "Gratis FIRE calculator. Bereken je FIRE-getal en het jaar waarin je financieel onafhankelijk bent. Inclusief inflatiecorrectie.",
    keywords: ["fire calculator", "financiële onafhankelijkheid", "fire getal", "early retirement"],
    featured: true,
    relatedSlugs: ["compound-interest", "box3-berekenen"],
  },
  {
    slug: "kinderbijslag",
    categorySlug: "geld-en-verzekeringen",
    title: "Kinderbijslag",
    description: "Bereken de kinderbijslag per kind op basis van leeftijd. SVB-tarieven 2026.",
    metaTitle: "Kinderbijslag Berekenen — SVB Tarieven 2026 | Rekenhet.nl",
    metaDescription: "Gratis kinderbijslag calculator. Bereken SVB-kinderbijslag per leeftijdsgroep.",
    keywords: ["kinderbijslag", "svb kinderbijslag", "kinderen"],
    featured: true,
    relatedSlugs: ["kinderalimentatie", "bruto-netto-salaris-calculator"],
  },
  {
    slug: "kinderalimentatie",
    categorySlug: "geld-en-verzekeringen",
    title: "Kinderalimentatie",
    description: "Schat de kinderalimentatie op basis van het NIBUD-rekenmodel. Voer de netto inkomens van beide ouders in.",
    metaTitle: "Kinderalimentatie Berekenen — NIBUD-model | Rekenhet.nl",
    metaDescription: "Gratis kinderalimentatie calculator. Schat de maandelijkse bijdrage per ouder op basis van inkomen en aantal kinderen.",
    keywords: ["kinderalimentatie", "alimentatie berekenen", "kinderalimentatie schatting"],
    featured: true,
    relatedSlugs: ["kinderbijslag", "bruto-netto-salaris-calculator"],
  },
  {
    slug: "schenkbelasting",
    categorySlug: "geld-en-verzekeringen",
    title: "Schenkbelasting",
    description: "Bereken de schenk- en erfbelasting op basis van tariefgroep en vrijstellingen.",
    metaTitle: "Schenkbelasting Berekenen — 2026 Vrijstellingen | Rekenhet.nl",
    metaDescription: "Gratis schenkbelasting calculator. Bereken de te betalen belasting over schenkingen en erfenissen. Tariefgroepen en vrijstellingen.",
    keywords: ["schenkbelasting", "erfbelasting", "schenking 2026", "erfbelasting 2026"],
    featured: true,
    relatedSlugs: ["box3-berekenen", "aow-leeftijd"],
  },
  {
    slug: "aow-leeftijd",
    categorySlug: "geld-en-verzekeringen",
    title: "AOW-leeftijd",
    description: "Bereken je AOW-leeftijd op basis van geboortedatum. Inclusief ingangsdatum en resterende jaren tot AOW.",
    metaTitle: "AOW-leeftijd Berekenen — Wanneer Gaat Mijn AOW In? | Rekenhet.nl",
    metaDescription: "Gratis AOW-leeftijd calculator. Bereken wanneer je AOW ingaat op basis van je geboortedatum. Officiële tabel.",
    keywords: ["aow leeftijd", "aow berekenen", "wanneer aow", "pensioen leeftijd"],
    featured: true,
    relatedSlugs: ["schenkbelasting", "bruto-netto-salaris-calculator"],
  },
  {
    slug: "isde-subsidie",
    categorySlug: "geld-en-verzekeringen",
    title: "ISDE Subsidie Wijzer",
    description: "Bereken de ISDE-subsidie voor warmtepompen (hybride/volledig) en isolatie (HR++ glas, dak, vloer, spouw).",
    metaTitle: "ISDE Subsidie Berekenen — Warmtepomp & Isolatie 2026 | Rekenhet.nl",
    metaDescription: "Gratis ISDE subsidie calculator. Bereken de RVO-subsidie voor warmtepompen en isolatie op basis van type en vermogen.",
    keywords: ["isde subsidie", "warmtepomp subsidie", "isolatie subsidie", "rvo subsidie"],
    featured: true,
    relatedSlugs: ["zonnepanelen-opbrengst", "annuiteiten-lasten"],
  },
  {
    slug: "extra-aflossen",
    categorySlug: "geld-en-verzekeringen",
    title: "Extra Aflossen Hypotheek",
    description: "Bereken hoeveel je bespaart door extra af te lossen op je hypotheek. Inclusief rentebesparing en verkorting looptijd.",
    metaTitle: "Extra Aflossen Hypotheek — Rentebesparing | Rekenhet.nl",
    metaDescription: "Gratis extra aflossen calculator. Bereken je rentebesparing en hoe veel jaar eerder je hypotheekvrij bent.",
    keywords: ["extra aflossen", "hypotheek aflossen", "rentebesparing", "boetevrij aflossen"],
    featured: true,
    relatedSlugs: ["annuiteiten-lasten", "maximale-hypotheek"],
  },
  {
    slug: "inflatie-calculator",
    categorySlug: "geld-en-verzekeringen",
    title: "Inflatie Calculator",
    description: "Corrigeer een bedrag voor inflatie. Bereken de gecorrigeerde waarde, koopkrachtverlies en inflatiefactor.",
    metaTitle: "Inflatie Calculator — Koopkracht & Gecorrigeerd Bedrag | Rekenhet.nl",
    metaDescription: "Gratis inflatie calculator. Corrigeer een bedrag voor inflatie en zie direct het koopkrachtverlies door prijsstijgingen.",
    keywords: ["inflatie calculator", "koopkrachtverlies", "inflatie corrigeren", "prijsstijging"],
    featured: true,
    relatedSlugs: ["compound-interest", "fire-berekenen"],
  },
  {
    slug: "vakantiedagen",
    categorySlug: "werk-en-inkomen",
    title: "Vakantiedagen",
    description: "Bereken je wettelijke en bovenwettelijke vakantiedagen op basis van dienstverband en uren per week.",
    metaTitle: "Vakantiedagen Berekenen — Wettelijk & Bovenwettelijk | Rekenhet.nl",
    metaDescription: "Gratis vakantiedagen calculator. Bereken je wettelijke, bovenwettelijke en totale vakantiedagen voor fulltime of parttime.",
    keywords: ["vakantiedagen berekenen", "wettelijke vakantiedagen", "bovenwettelijke vakantiedagen", "vakantie opbouwen"],
    featured: true,
    relatedSlugs: ["netto-vakantiegeld", "parttime-factor"],
  },
  {
    slug: "ontslagvergoeding",
    categorySlug: "werk-en-inkomen",
    title: "Ontslagvergoeding",
    description: "Bereken je transitievergoeding en billijke vergoeding op basis van salaris, dienstjaren en leeftijd.",
    metaTitle: "Ontslagvergoeding Berekenen — Transitievergoeding | Rekenhet.nl",
    metaDescription: "Gratis ontslagvergoeding calculator. Bereken je transitievergoeding (⅓ per dienstjaar) en billijke vergoeding.",
    keywords: ["ontslagvergoeding", "transitievergoeding", "billijke vergoeding", "ontslag"],
    featured: true,
    relatedSlugs: ["vakantiedagen", "bruto-netto-salaris-calculator"],
  },
  // ── Wiskunde ──
  {
    slug: "kwadratische-vergelijking",
    categorySlug: "wiskunde",
    title: "Kwadratische Vergelijking",
    description: "Los ax² + bx + c = 0 op. Berekent discriminant, x₁ en x₂.",
    metaTitle: "Kwadratische Vergelijking Oplossen | Rekenhet.nl",
    metaDescription: "Gratis kwadratische vergelijking calculator. Los ax² + bx + c = 0 op met discriminant. Toon reële oplossingen.",
    keywords: ["kwadratische vergelijking", "abc formule", "discriminant", "tweedegraads vergelijking"],
    featured: true,
    relatedSlugs: [],
  },
  {
    slug: "oppervlakte-berekenen",
    categorySlug: "wiskunde",
    title: "Oppervlakte & Volume",
    description: "Bereken oppervlakte, omtrek en volume van vierkant, rechthoek, driehoek, cirkel, kubus en bol.",
    metaTitle: "Oppervlakte en Volume Berekenen | Rekenhet.nl",
    metaDescription: "Gratis oppervlakte en volume calculator. Bereken de oppervlakte, omtrek en inhoud van geometrische vormen.",
    keywords: ["oppervlakte berekenen", "volume berekenen", "omtrek berekenen", "meetkunde"],
    featured: true,
    relatedSlugs: ["kwadratische-vergelijking"],
  },
  // ── Gezondheid ──
  {
    slug: "ideaal-gewicht",
    categorySlug: "gezondheid",
    title: "Ideaal Gewicht",
    description: "Bereken je ideale gewicht op basis van lengte en geslacht met Devine, Robinson en Miller formules.",
    metaTitle: "Ideaal Gewicht Berekenen — Devine, Robinson & Miller | Rekenhet.nl",
    metaDescription: "Gratis ideaal gewicht calculator. Bereken je ideale gewicht met 3 medische formules: Devine, Robinson en Miller. Gebaseerd op lengte en geslacht.",
    keywords: ["ideaal gewicht", "gezond gewicht", "devine formule", "robinson formule", "miller formule"],
    featured: true,
    relatedSlugs: ["bmi-calculator", "caloriebehoefte"],
  },
  {
    slug: "caloriebehoefte",
    categorySlug: "gezondheid",
    title: "Caloriebehoefte",
    description: "Bereken je dagelijkse caloriebehoefte op basis van geslacht, gewicht, lengte, leeftijd en activiteit.",
    metaTitle: "Caloriebehoefte Berekenen — BMR & Onderhoud | Rekenhet.nl",
    metaDescription: "Gratis caloriebehoefte calculator. Bereken je BMR, onderhoud, afvallen en aankomen op basis van de Mifflin-St Jeor formule.",
    keywords: ["caloriebehoefte", "bmr berekenen", "calorieën", "afvallen", "onderhoud"],
    featured: true,
    relatedSlugs: ["bmi-calculator", "hartslagzones"],
  },
  {
    slug: "hartslagzones",
    categorySlug: "gezondheid",
    title: "Hartslagzones",
    description: "Bereken je maximale hartslag en trainingszones op basis van leeftijd.",
    metaTitle: "Hartslagzones Berekenen — Maximale Hartslag | Rekenhet.nl",
    metaDescription: "Gratis hartslagzone calculator. Bereken je maximale hartslag en 5 trainingszones op basis van leeftijd.",
    keywords: ["hartslagzones", "maximale hartslag", "trainingszones", "hartslag"],
    featured: true,
    relatedSlugs: ["caloriebehoefte", "bmi-calculator"],
  },
  {
    slug: "zwangerschap",
    categorySlug: "gezondheid",
    title: "Zwangerschap",
    description: "Bereken je uitgerekende datum, huidige zwangerschapsweek (+dagen) en trimester. Op basis van Naegele-regel of echo.",
    metaTitle: "Zwangerschap Calculator — Uitgerekende Datum & Week | Rekenhet.nl",
    metaDescription: "Gratis zwangerschap calculator. Bereken je uitgerekende datum, huidige zwangerschapsweek (+dagen), trimester en conceptiedatum. Met Naegele of echo.",
    keywords: ["zwangerschap", "uitgerekende datum", "zwangerschapsweek", "trimester", "naegele", "echo uitgerekende datum", "zwangerschapskalender", "hoeveel weken zwanger"],
    featured: true,
    relatedSlugs: ["caloriebehoefte", "bmi-calculator"],
  },
  // ── Ondernemen ──
  {
    slug: "investeringsaftrek",
    categorySlug: "ondernemen",
    title: "Investeringsaftrek",
    description: "Bereken je investeringsaftrek voor KIA, MIA of EIA. Inclusief belastingbesparing op basis van 25,5%.",
    metaTitle: "Investeringsaftrek Berekenen — KIA, MIA & EIA | Rekenhet.nl",
    metaDescription: "Gratis investeringsaftrek calculator. Bereken KIA (28%), MIA (36%) of EIA (45%) aftrek en belastingbesparing.",
    keywords: ["investeringsaftrek", "KIA", "MIA", "EIA", "kleinschaligheidsinvesteringsaftrek"],
    featured: true,
    relatedSlugs: ["omzetbelasting", "winst-verlies"],
  },
  {
    slug: "omzetbelasting",
    categorySlug: "ondernemen",
    title: "Omzetbelasting",
    description: "Bereken de af te dragen BTW op basis van omzet, BTW-tarief en voorbelasting.",
    metaTitle: "Omzetbelasting (BTW) Berekenen — Af te Dragen | Rekenhet.nl",
    metaDescription: "Gratis omzetbelasting calculator. Bereken de BTW over je omzet, voorbelasting en het af te dragen bedrag.",
    keywords: ["omzetbelasting", "BTW berekenen", "voorbelasting", "btw aangifte", "af te dragen btw"],
    featured: true,
    relatedSlugs: ["investeringsaftrek", "winst-verlies", "btw-calculator"],
  },
  {
    slug: "winst-verlies",
    categorySlug: "ondernemen",
    title: "Winst & Verlies",
    description: "Bereken je winst, marge en kostenpercentage op basis van omzet en kosten.",
    metaTitle: "Winst & Verlies Calculator — Onderneming | Rekenhet.nl",
    metaDescription: "Gratis winst en verlies calculator. Bereken je bedrijfswinst, brutomarge en kostenpercentage.",
    keywords: ["winst berekenen", "verlies berekenen", "marge", "kosten", "onderneming"],
    featured: true,
    relatedSlugs: ["zzp-tarief", "btw-calculator"],
  },
  {
    slug: "zzp-tarief",
    categorySlug: "ondernemen",
    title: "ZZP Dagtarief",
    description: "Bereken je uurtarief als ZZP'er op basis van gewenst netto jaarinkomen, werkdagen en kosten.",
    metaTitle: "ZZP Uurtarief Berekenen — Dagtarief Calculator | Rekenhet.nl",
    metaDescription: "Gratis ZZP uurtarief calculator. Bereken je dagtarief op basis van gewenst netto inkomen, werkdagen en maandelijkse kosten.",
    keywords: ["zzp tarief", "uurtarief", "dagtarief", "zzp calculator", "freelance tarief"],
    featured: true,
    relatedSlugs: ["winst-verlies", "uurtarief-berekenen"],
  },
  // ── Wiskunde (10 nieuw) ──
  {slug:"worteltrekken",categorySlug:"wiskunde",title:"Worteltrekken",description:"Bereken de vierkantswortel en het kwadraat van een getal",metaTitle:"Worteltrekken — Vierkantswortel & Kwadraat | Rekenhet.nl",metaDescription:"Gratis worteltrekken calculator. Bereken de vierkantswortel en het kwadraat van elk getal.",keywords:["worteltrekken","vierkantswortel","kwadraat","machtsverheffen"],featured:true,relatedSlugs:[]},
  {slug:"machtsverheffen",categorySlug:"wiskunde",title:"Machtsverheffen",description:"Bereken een grondtal tot een macht",metaTitle:"Machtsverheffen — Macht Berekenen | Rekenhet.nl",metaDescription:"Gratis machtsverheffen calculator. Bereken een grondtal tot een bepaalde exponent.",keywords:["machtsverheffen","macht","exponent","grondtal","rekenen"],featured:true,relatedSlugs:["worteltrekken"]},
  {slug:"breuk-vereenvoudigen",categorySlug:"wiskunde",title:"Breuk Vereenvoudigen",description:"Vereenvoudig een breuk naar de kleinste teller en noemer",metaTitle:"Breuk Vereenvoudigen — Breuk Rekenen | Rekenhet.nl",metaDescription:"Gratis breuk vereenvoudigen calculator. Vereenvoudig elke breuk naar de kleinste teller en noemer.",keywords:["breuk vereenvoudigen","breuk","teller","noemer","ggd"],featured:true,relatedSlugs:[]},
  {slug:"decimaal-naar-breuk",categorySlug:"wiskunde",title:"Decimaal naar Breuk",description:"Zet een decimaal getal om naar een breuk",metaTitle:"Decimaal naar Breuk — Omzetten | Rekenhet.nl",metaDescription:"Gratis decimaal naar breuk calculator. Zet decimale getallen om in breuken.",keywords:["decimaal naar breuk","breuk","decimaal getal","omzetten"],featured:true,relatedSlugs:["breuk-vereenvoudigen"]},
  {slug:"kgv-berekenen",categorySlug:"wiskunde",title:"KGV Berekenen",description:"Bereken het kleinste gemene veelvoud van twee getallen",metaTitle:"KGV Berekenen — Kleinste Gemene Veelvoud | Rekenhet.nl",metaDescription:"Gratis KGV calculator. Bereken het kleinste gemene veelvoud van twee getallen.",keywords:["kgv","kleinste gemene veelvoud","veelvoud"],featured:true,relatedSlugs:["ggd-berekenen"]},
  {slug:"ggd-berekenen",categorySlug:"wiskunde",title:"GGD Berekenen",description:"Bereken de grootste gemene deler van twee getallen",metaTitle:"GGD Berekenen — Grootste Gemene Deler | Rekenhet.nl",metaDescription:"Gratis GGD calculator. Bereken de grootste gemene deler van twee getallen.",keywords:["ggd","grootste gemene deler","deler"],featured:true,relatedSlugs:["kgv-berekenen"]},
  {slug:"richtingscoefficient",categorySlug:"wiskunde",title:"Richtingscoëfficiënt",description:"Bereken de richtingscoëfficiënt en intercept van een lijn",metaTitle:"Richtingscoëfficiënt Berekenen | Rekenhet.nl",metaDescription:"Gratis richtingscoëfficiënt calculator. Bereken RC en intercept van een lijn door twee punten.",keywords:["richtingscoefficient","helling","lineaire functie","intercept","wiskunde"],featured:true,relatedSlugs:[]},
  {slug:"afstand-tussen-punten",categorySlug:"wiskunde",title:"Afstand Tussen Punten",description:"Bereken de afstand tussen twee punten in een vlak",metaTitle:"Afstand Tussen Punten Berekenen | Rekenhet.nl",metaDescription:"Gratis afstand calculator. Bereken de afstand tussen twee coördinaten in een vlak.",keywords:["afstand","punten","coordinaten","wiskunde","pythagoras"],featured:true,relatedSlugs:[]},
  {slug:"driehoek-oppervlakte",categorySlug:"wiskunde",title:"Driehoek Oppervlakte",description:"Bereken de oppervlakte van een driehoek (basis × hoogte ÷ 2)",metaTitle:"Driehoek Oppervlakte Berekenen | Rekenhet.nl",metaDescription:"Gratis driehoek oppervlakte calculator. Bereken de oppervlakte via basis en hoogte.",keywords:["driehoek","oppervlakte","basis","hoogte","meetkunde"],featured:true,relatedSlugs:["oppervlakte-berekenen"]},
  {slug:"cirkel-berekenen",categorySlug:"wiskunde",title:"Cirkelberekeningen",description:"Bereken omtrek en oppervlakte van een cirkel",metaTitle:"Cirkel Omtrek & Oppervlakte Berekenen | Rekenhet.nl",metaDescription:"Gratis cirkel calculator. Bereken omtrek en oppervlakte via de straal.",keywords:["cirkel","omtrek","oppervlakte","straal","pi"],featured:true,relatedSlugs:["oppervlakte-berekenen","driehoek-oppervlakte"]},
  // ── Algemeen — Datum/Tijd (8 nieuw) ──
  {slug:"leeftijd-berekenen",categorySlug:"algemeen",title:"Leeftijd Berekenen",description:"Bereken je exacte leeftijd in jaren, maanden en dagen",metaTitle:"Leeftijd Berekenen — Exacte Leeftijd | Rekenhet.nl",metaDescription:"Gratis leeftijd calculator. Bereken je exacte leeftijd in jaren, maanden en dagen.",keywords:["leeftijd","berekenen","jaren","maanden","dagen","geboortedatum"],featured:true,relatedSlugs:["datum-verschil"]},
  {slug:"datum-verschil",categorySlug:"algemeen",title:"Datumverschil",description:"Bereken het aantal dagen, weken en maanden tussen twee data",metaTitle:"Datumverschil Berekenen — Dagen Tussen Data | Rekenhet.nl",metaDescription:"Gratis datumverschil calculator. Bereken dagen, weken en maanden tussen twee datums.",keywords:["datumverschil","dagen tussen data","datum verschil"],featured:true,relatedSlugs:["leeftijd-berekenen"]},
  {slug:"datum-optellen",categorySlug:"algemeen",title:"Datum Optellen",description:"Tel dagen, weken of maanden op bij een datum",metaTitle:"Datum Optellen — Datum Berekenen | Rekenhet.nl",metaDescription:"Gratis datum optellen calculator. Tel dagen op bij een startdatum en zie de nieuwe datum.",keywords:["datum optellen","datum berekenen","dagen optellen"],featured:true,relatedSlugs:["datum-verschil"]},
  {slug:"weeknummer",categorySlug:"algemeen",title:"Weeknummer",description:"Bereken het weeknummer van een datum",metaTitle:"Weeknummer Berekenen — Welke Week | Rekenhet.nl",metaDescription:"Gratis weeknummer calculator. Ontdek het weeknummer van elke datum.",keywords:["weeknummer","week","datum","kalender"],featured:true,relatedSlugs:[]},
  {slug:"tijdrekenen",categorySlug:"algemeen",title:"Tijdrekenen",description:"Reken uren en minuten om en tel tijd bij elkaar op",metaTitle:"Tijdrekenen — Uren & Minuten | Rekenhet.nl",metaDescription:"Gratis tijdrekenen tool. Tel uren en minuten op en reken om tussen tijdseenheden.",keywords:["tijdrekenen","uren","minuten","tijd omrekenen"],featured:true,relatedSlugs:[]},
  {slug:"schrikkeljaar",categorySlug:"algemeen",title:"Schrikkeljaar Check",description:"Controleer of een jaar een schrikkeljaar is",metaTitle:"Schrikkeljaar Check — Is Het Een Schrikkeljaar? | Rekenhet.nl",metaDescription:"Gratis schrikkeljaar check. Ontdek of elk jaar een schrikkeljaar is.",keywords:["schrikkeljaar","check","jaar","februari","29 dagen"],featured:true,relatedSlugs:[]},
  {slug:"dagen-tot-datum",categorySlug:"algemeen",title:"Dagen tot Datum",description:"Bereken hoeveel dagen het nog duurt tot een bepaalde datum",metaTitle:"Dagen tot Datum — Countdown | Rekenhet.nl",metaDescription:"Gratis dagen tot datum calculator. Bereken de resterende dagen tot een datum.",keywords:["dagen tot datum","countdown","dagen over"],featured:true,relatedSlugs:["datum-verschil","datum-optellen"]},
  {slug:"werkdagen-tellen",categorySlug:"algemeen",title:"Werkdagen Tellen",description:"Tel het aantal werkdagen tussen twee datums",metaTitle:"Werkdagen Tellen — Werkdagen Berekenen | Rekenhet.nl",metaDescription:"Gratis werkdagen calculator. Tel het aantal werkdagen (ma-vr) tussen twee datums.",keywords:["werkdagen","tellen","werkbare dagen","maandag tot vrijdag"],featured:true,relatedSlugs:["datum-verschil"]},
  // ── Gezondheid (8 nieuw) ──
  {slug:"bloeddruk",categorySlug:"gezondheid",title:"Bloeddruk Interpreteren",description:"Interpreteer je bloeddrukwaarden met categorie en advies",metaTitle:"Bloeddruk Check — Interpreteren & Advies | Rekenhet.nl",metaDescription:"Gratis bloeddruk interpreteren tool. Ontdek je bloeddrukcategorie en ontvang direct advies.",keywords:["bloeddruk","interpretatie","bovendruk","onderdruk","hypertensie"],featured:true,relatedSlugs:["hartslagzones","caloriebehoefte"]},
  {slug:"lichaamsvet-percentage",categorySlug:"gezondheid",title:"Lichaamsvet Percentage",description:"Bereken je lichaamsvetpercentage op basis van omtrekmaten",metaTitle:"Lichaamsvet Percentage Berekenen | Rekenhet.nl",metaDescription:"Gratis lichaamsvet percentage calculator. Bereken je vetpercentage via middel- en nekomtrek.",keywords:["lichaamsvet","vetpercentage","middelomtrek","gezondheid"],featured:true,relatedSlugs:["bmi-calculator","caloriebehoefte"]},
  {slug:"waterbehoefte",categorySlug:"gezondheid",title:"Waterbehoefte",description:"Bereken je dagelijkse waterbehoefte op basis van gewicht",metaTitle:"Waterbehoefte Berekenen — Hoeveel Water Drinken | Rekenhet.nl",metaDescription:"Gratis waterbehoefte calculator. Ontdek hoeveel water je dagelijks nodig hebt.",keywords:["waterbehoefte","water drinken","hydratatie","gezondheid"],featured:true,relatedSlugs:["caloriebehoefte"]},
  {slug:"hardlooppace",categorySlug:"gezondheid",title:"Hardlooppace Calculator",description:"Bereken je pace per km en snelheid op basis van tijd en afstand",metaTitle:"Hardlooppace Berekenen — Pace Per Km | Rekenhet.nl",metaDescription:"Gratis hardlooppace calculator. Bereken je minuten per km en gemiddelde snelheid.",keywords:["hardlooppace","pace","hardlopen","snelheid","km"],featured:true,relatedSlugs:[]},
  {slug:"wandeltempo",categorySlug:"gezondheid",title:"Wandeltempo Calculator",description:"Bereken afstand, snelheid en calorieverbruik tijdens het wandelen",metaTitle:"Wandeltempo Berekenen — Afstand & Calorieën | Rekenhet.nl",metaDescription:"Gratis wandeltempo calculator. Bereken afstand, snelheid en verbrande calorieën.",keywords:["wandeltempo","wandelen","calorieën wandelen","afstand"],featured:true,relatedSlugs:["hardlooppace"]},
  {slug:"ideale-lengte-kind",categorySlug:"gezondheid",title:"Ideale Lengte Kind",description:"Bekijk de gemiddelde lengte voor kinderen op basis van leeftijd",metaTitle:"Ideale Lengte Kind — Groeicurve | Rekenhet.nl",metaDescription:"Gratis kinderlengte calculator. Bekijk de gemiddelde lengte per leeftijd voor jongens en meisjes.",keywords:["lengte kind","groeicurve","gemiddelde lengte","kind"],featured:true,relatedSlugs:["bmi-calculator"]},
  {slug:"calorie-verbruik-activiteit",categorySlug:"gezondheid",title:"Calorieverbruik per Activiteit",description:"Bereken het aantal verbrande calorieën per activiteit op basis van MET-waarde",metaTitle:"Calorieverbruik per Activiteit — MET Calculator | Rekenhet.nl",metaDescription:"Gratis calorieverbruik calculator. Bereken verbrande calorieën per activiteit via MET-waarden.",keywords:["calorieverbruik","MET","sport","activiteit","calorieën verbranden"],featured:true,relatedSlugs:["caloriebehoefte","waterbehoefte"]},
  {slug:"fietsvermogen",categorySlug:"gezondheid",title:"Fietsvermogen Calculator",description:"Bereken het benodigde fietsvermogen op basis van gewicht, helling en snelheid",metaTitle:"Fietsvermogen Berekenen — Wattage | Rekenhet.nl",metaDescription:"Gratis fietsvermogen calculator. Bereken het wattage dat je levert op de fiets.",keywords:["fietsvermogen","wattage","fietsen","helling","snelheid"],featured:true,relatedSlugs:["hartslagzones"]},
  // ── Werk & Inkomen (8 nieuw) ──
  {slug:"overuren",categorySlug:"werk-en-inkomen",title:"Overuren Berekenen",description:"Bereken de vergoeding voor overuren op basis van salaris en toeslagfactor",metaTitle:"Overuren Berekenen — Toeslag & Uurloon | Rekenhet.nl",metaDescription:"Gratis overuren calculator. Bereken je uurloon en overuurtoeslag.",keywords:["overuren","overuurtoeslag","uurloon","overwerk"],featured:true,relatedSlugs:["bruto-netto-salaris-calculator"]},
  {slug:"reiskosten-woonwerk",categorySlug:"werk-en-inkomen",title:"Reiskosten Woon-Werk",description:"Bereken de maandelijkse en jaarlijkse reiskostenvergoeding",metaTitle:"Reiskosten Woon-Werk Berekenen | Rekenhet.nl",metaDescription:"Gratis reiskosten woon-werk calculator. Bereken je vergoeding op basis van afstand en dagen.",keywords:["reiskosten","woon-werk","reiskostenvergoeding","kilometervergoeding"],featured:true,relatedSlugs:["ritkosten-berekenen"]},
  {slug:"thuiswerkvergoeding",categorySlug:"werk-en-inkomen",title:"Thuiswerkvergoeding",description:"Bereken de maandelijkse en jaarlijkse thuiswerkvergoeding",metaTitle:"Thuiswerkvergoeding Berekenen | Rekenhet.nl",metaDescription:"Gratis thuiswerkvergoeding calculator. Bereken je vergoeding op basis van dagen per week.",keywords:["thuiswerkvergoeding","thuiswerken","vergoeding","dagen"],featured:true,relatedSlugs:["reiskosten-woonwerk"]},
  {slug:"eindejaarsuitkering",categorySlug:"werk-en-inkomen",title:"Eindejaarsuitkering",description:"Bereken de bruto en netto eindejaarsuitkering op basis van een percentage",metaTitle:"Eindejaarsuitkering Berekenen — Bruto & Netto | Rekenhet.nl",metaDescription:"Gratis eindejaarsuitkering calculator. Bereken bruto en netto uitkering.",keywords:["eindejaarsuitkering","13e maand","bonus","uitkering"],featured:true,relatedSlugs:["dertiende-maand","bonus-netto"]},
  {slug:"dertiende-maand",categorySlug:"werk-en-inkomen",title:"13e Maand Berekenen",description:"Bereken de bruto en netto waarde van een 13e maand",metaTitle:"13e Maand Berekenen — Dertiende Maand | Rekenhet.nl",metaDescription:"Gratis 13e maand calculator. Bereken bruto en netto dertiende maand.",keywords:["13e maand","dertiende maand","eindejaarsuitkering","bonus"],featured:true,relatedSlugs:["eindejaarsuitkering","bonus-netto"]},
  {slug:"bonus-netto",categorySlug:"werk-en-inkomen",title:"Bonus Netto Berekenen",description:"Bereken de netto bonus na belasting op basis van bijzonder tarief",metaTitle:"Bonus Netto Berekenen — Bijzonder Tarief | Rekenhet.nl",metaDescription:"Gratis bonus netto calculator. Bereken je netto bonus na aftrek van bijzonder tarief.",keywords:["bonus","netto bonus","bijzonder tarief","belasting bonus"],featured:true,relatedSlugs:["dertiende-maand","eindejaarsuitkering"]},
  {slug:"ziektewet-uitkering",categorySlug:"werk-en-inkomen",title:"Ziektewet Uitkering",description:"Bereken de bruto Ziektewet-uitkering op basis van je salaris",metaTitle:"Ziektewet Uitkering Berekenen | Rekenhet.nl",metaDescription:"Gratis Ziektewet calculator. Bereken je bruto ZW-uitkering op basis van je maandsalaris.",keywords:["ziektewet","uitkering","ZW","ziekte","salaris"],featured:true,relatedSlugs:["ww-uitkering"]},
  {slug:"ww-uitkering",categorySlug:"werk-en-inkomen",title:"WW Uitkering Schatting",description:"Schat de hoogte en duur van je WW-uitkering",metaTitle:"WW Uitkering Berekenen — Schatting | Rekenhet.nl",metaDescription:"Gratis WW calculator. Schat de maximale uitkering en resterende weken.",keywords:["ww uitkering","werkloosheid","ww","uitkering schatting"],featured:true,relatedSlugs:["ziektewet-uitkering"]},
  // ── Ondernemen (7 nieuw) ──
  {slug:"break-even-analyse",categorySlug:"ondernemen",title:"Break-Even Analyse",description:"Bereken het aantal eenheden dat je moet verkopen om quitte te draaien",metaTitle:"Break-Even Analyse Berekenen | Rekenhet.nl",metaDescription:"Gratis break-even calculator. Bereken het minimale aantal eenheden en de omzet.",keywords:["break-even","break even analyse","kosten","omzet","winst"],featured:true,relatedSlugs:["winst-verlies","costplus-prijs"]},
  {slug:"costplus-prijs",categorySlug:"ondernemen",title:"Cost-Plus Prijs",description:"Bereken de verkoopprijs op basis van kostprijs en marge",metaTitle:"Cost-Plus Prijs Berekenen | Rekenhet.nl",metaDescription:"Gratis cost-plus calculator. Bereken de verkoopprijs op basis van kostprijs en marge.",keywords:["cost-plus","prijs berekenen","kostprijs","marge"],featured:true,relatedSlugs:["break-even-analyse","winst-verlies"]},
  {slug:"krediettermijn",categorySlug:"ondernemen",title:"Krediettermijn",description:"Bereken de looptijd van een openstaande vordering",metaTitle:"Krediettermijn Berekenen | Rekenhet.nl",metaDescription:"Gratis krediettermijn calculator. Bereken hoe lang het duurt om een vordering af te lossen.",keywords:["krediettermijn","vordering","aflossen","betalingstermijn"],featured:true,relatedSlugs:["lineaire-aflossing"]},
  {slug:"btw-privegebruik",categorySlug:"ondernemen",title:"BTW Privégebruik",description:"Bereken de BTW-correctie voor privégebruik van zakelijke goederen",metaTitle:"BTW Privégebruik Berekenen — Correctie | Rekenhet.nl",metaDescription:"Gratis BTW privégebruik calculator. Bereken de BTW-correctie voor privégebruik.",keywords:["btw privegebruik","btw correctie","privegebruik","ondernemer"],featured:true,relatedSlugs:["btw-calculator","btw-incl-excl","omzetbelasting"]},
  {slug:"autokosten-bijtelling",categorySlug:"ondernemen",title:"Autokosten Bijtelling",description:"Bereken de bijtelling voor een auto van de zaak",metaTitle:"Autokosten Bijtelling Berekenen | Rekenhet.nl",metaDescription:"Gratis autokosten bijtelling calculator. Bereken je bijtelling op basis van catalogusprijs en percentage.",keywords:["bijtelling","autokosten","auto van de zaak","catalogusprijs","lease"],featured:true,relatedSlugs:["kenteken-check","ritkosten-berekenen"]},
  {slug:"vof-winstverdeling",categorySlug:"ondernemen",title:"VOF Winstverdeling",description:"Verdeel de winst in een VOF op basis van investeringsaandeel",metaTitle:"VOF Winstverdeling Berekenen | Rekenhet.nl",metaDescription:"Gratis VOF winstverdeling calculator. Verdeel de winst op basis van ieders aandeel.",keywords:["vof","winstverdeling","vennootschap","ondernemen","winst delen"],featured:true,relatedSlugs:["winst-verlies","zzp-tarief"]},
  {slug:"uurtarief-kostprijs",categorySlug:"ondernemen",title:"Uurtarief Kostprijs",description:"Bereken je minimale uurtarief op basis van gewenst inkomen en overhead",metaTitle:"Uurtarief Kostprijs Berekenen | Rekenhet.nl",metaDescription:"Gratis uurtarief kostprijs calculator. Bereken je minimale uurtarief excl. en incl. BTW.",keywords:["uurtarief","kostprijs","zzp","tarief berekenen","overhead"],featured:true,relatedSlugs:["zzp-tarief","uurtarief-berekenen"]},
  // ── Geld & Verzekeringen (9 nieuw) ──
  {slug:"spaardoel-berekenen",categorySlug:"geld-en-verzekeringen",title:"Spaardoel Berekenen",description:"Bereken de eindwaarde van sparen met maandelijkse inleg en rente",metaTitle:"Spaardoel Berekenen — Eindwaarde | Rekenhet.nl",metaDescription:"Gratis spaardoel calculator. Bereken de eindwaarde van sparen met rente.",keywords:["spaardoel","sparen","rente","eindwaarde","maandelijkse inleg"],featured:true,relatedSlugs:["compound-interest","enkelvoudige-interest"]},
  {slug:"lineaire-aflossing",categorySlug:"geld-en-verzekeringen",title:"Lineaire Aflossing",description:"Bereken de maandlasten bij een lineaire lening of hypotheek",metaTitle:"Lineaire Aflossing Berekenen | Rekenhet.nl",metaDescription:"Gratis lineaire aflossing calculator. Bereken eerste en laatste maandlast en totale rente.",keywords:["lineaire aflossing","lening","hypotheek","aflossen","rente"],featured:true,relatedSlugs:["annuiteiten-lasten","extra-aflossen"]},
  {slug:"studieschuld-terugbetalen",categorySlug:"geld-en-verzekeringen",title:"Studieschuld Terugbetalen",description:"Bereken de maandelijkse aflossing van je studieschuld",metaTitle:"Studieschuld Terugbetalen — DUO | Rekenhet.nl",metaDescription:"Gratis studieschuld calculator. Bereken je maandbedrag op basis van schuld en draagkracht.",keywords:["studieschuld","duo","terugbetalen","aflossen","lening"],featured:true,relatedSlugs:["lineaire-aflossing","spaardoel-berekenen"]},
  {slug:"eigen-risico-zorg",categorySlug:"geld-en-verzekeringen",title:"Eigen Risico Zorg",description:"Bereken hoeveel zorgkosten je zelf betaalt met eigen risico",metaTitle:"Eigen Risico Zorg Berekenen | Rekenhet.nl",metaDescription:"Gratis eigen risico calculator. Bereken je zorgkosten na eigen risico.",keywords:["eigen risico","zorg","zorgkosten","verzekering","ziektekosten"],featured:true,relatedSlugs:[]},
  {slug:"verhuiskosten",categorySlug:"geld-en-verzekeringen",title:"Verhuiskosten Berekenen",description:"Bereken de totale kosten en terugverdientijd van een verhuizing",metaTitle:"Verhuiskosten Berekenen — Verhuis Calculator | Rekenhet.nl",metaDescription:"Gratis verhuiskosten calculator. Bereken totale kosten, besparing en terugverdientijd.",keywords:["verhuiskosten","verhuizing","kosten berekenen","terugverdientijd"],featured:true,relatedSlugs:["maximale-hypotheek"]},
  {slug:"overwaarde-berekenen",categorySlug:"geld-en-verzekeringen",title:"Overwaarde Berekenen",description:"Bereken de overwaarde van je woning na verkoop",metaTitle:"Overwaarde Berekenen — Woning | Rekenhet.nl",metaDescription:"Gratis overwaarde calculator. Bereken de overwaarde van je woning.",keywords:["overwaarde","woning","huis verkopen","hypotheek","verkoop"],featured:true,relatedSlugs:["maximale-hypotheek","overwaarde-berekenen"]},
  {slug:"huurverhoging",categorySlug:"geld-en-verzekeringen",title:"Huurverhoging Berekenen",description:"Bereken de nieuwe huur na een huurverhoging (max 5,5% in 2026)",metaTitle:"Huurverhoging Berekenen 2026 | Rekenhet.nl",metaDescription:"Gratis huurverhoging calculator. Bereken de nieuwe huur met de maximale 5,5% verhoging.",keywords:["huurverhoging","huur","verhoging 2026","huurprijs"],featured:true,relatedSlugs:["verhuiskosten"]},
  {slug:"enkelvoudige-interest",categorySlug:"geld-en-verzekeringen",title:"Enkelvoudige Interest",description:"Bereken enkelvoudige interest over een hoofdsom",metaTitle:"Enkelvoudige Interest Berekenen | Rekenhet.nl",metaDescription:"Gratis enkelvoudige interest calculator. Bereken het eindbedrag en de totale rente.",keywords:["enkelvoudige interest","rente","interest","sparen","lening"],featured:true,relatedSlugs:["spaardoel-berekenen","compound-interest"]},
  {slug:"vermogensbelasting-box3",categorySlug:"geld-en-verzekeringen",title:"Vermogensbelasting Box 3",description:"Bereken de Box 3 belasting over je vermogen in 2026",metaTitle:"Box 3 Vermogensbelasting Berekenen 2026 | Rekenhet.nl",metaDescription:"Gratis Box 3 calculator. Bereken de vermogensbelasting op basis van forfaitair rendement.",keywords:["box 3","vermogensbelasting","belasting","vermogen","sparen","beleggen"],featured:true,relatedSlugs:["box3-berekenen","spaardoel-berekenen"]},
  // ── Huurtoeslag 2026 ──
  {slug:"huurtoeslag",categorySlug:"geld-en-verzekeringen",title:"Huurtoeslag Berekenen 2026",description:"Bereken je huurtoeslag op basis van huur, inkomen, vermogen en huishoudsituatie.",metaTitle:"Huurtoeslag Berekenen 2026 — Exacte Berekening | Rekenhet.nl",metaDescription:"Gratis huurtoeslag calculator 2026. Bereken je recht op huurtoeslag op basis van rekenhuur, toetsingsinkomen, vermogen en huishouden.",keywords:["huurtoeslag","huurtoeslag 2026","huursubsidie","huurtoeslag berekenen","toeslagen"],featured:true,relatedSlugs:["bruto-netto-salaris-calculator","box3-berekenen"]},
  // ── Hypotheek & Energielabel ──
  {slug:"energielabel-berekenen",categorySlug:"hypotheek",title:"Energielabel & Verduurzaming Hypotheek",description:"Bereken hoeveel extra je kunt lenen voor een woning met een beter energielabel en verduurzaming. Actuele Nibud-leennormen.",metaTitle:"Energielabel Hypotheek Berekenen — Extra Leencapaciteit | Rekenhet.nl",metaDescription:"Bereken direct hoeveel extra hypotheek je kunt krijgen op basis van het energielabel van de woning. Inclusief verduurzamingsbudget volgens de actuele leennormen.",keywords:["energielabel hypotheek","extra lenen energielabel","verduurzaming hypotheek","hypotheek energielabel a","nibud leennormen"],featured:true,relatedSlugs:["maximale-hypotheek","annuiteiten-lasten","isde-subsidie"]},
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return registry.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(
  categorySlug: string
): CalculatorMeta[] {
  return registry.filter((c) => c.categorySlug === categorySlug);
}

export function getFeaturedCalculators(): CalculatorMeta[] {
  return registry.filter((c) => c.featured);
}

export function getAllCalculators(): CalculatorMeta[] {
  return [...registry];
}

export { registry as calculatorRegistry };
