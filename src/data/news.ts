/**
 * Nieuwsblog — Rekenhet.nl
 *
 * SEO-geoptimaliseerde nieuwsartikelen over financiële onderwerpen.
 * Elk artikel linkt naar relevante calculators voor interne linkbuilding.
 *
 * Waarom een nieuwsblog?
 * 1. Regelmatige nieuwe content — Google crawled vaker
 * 2. Long-tail zoekwoorden — "aow bedragen 2026", "minimumloon juli 2026"
 * 3. Interne links naar calculators — spreidt linkjuice
 * 4. E-E-A-T signaal — toont expertise en actualiteit
 * 5. Bron van terugkerend verkeer — mensen delen nieuwsartikelen
 */

export interface NewsArticle {
  /** URL-slug (gebruik korte, descriptieve slugs) */
  slug: string;
  /** Publicatiedatum (wordt getoond als "Gepubliceerd: 1 juli 2026") */
  date: string;
  /** Categorie/tag (bijv. "Belastingen", "Werk & Inkomen") */
  category: string;
  /** SEO-title (max 60 chars) */
  title: string;
  /** SEO-description (max 160 chars) */
  description: string;
  /** Keywords voor deze pagina */
  keywords: string[];
  /** De hoofdinhoud in Markdown-stijl paragrafen */
  content: string[];
  /** Links naar gerelateerde calculators (interne links!) */
  relatedCalculators: { slug: string; categorySlug: string; label: string }[];
  /** Externe bronnen (bouwt E-E-A-T) */
  sources: { name: string; url: string }[];
}

const registry: NewsArticle[] = [
  {
    slug: "minimumloon-2026-per-1-juli",
    date: "2026-07-01",
    category: "Werk & Inkomen",
    title: "Minimumloon 2026: nieuwe bedragen per 1 juli — €14,99 per uur",
    description:
      "Het wettelijk minimumuurloon stijgt per 1 juli 2026 naar €14,99 per uur. Bekijk de nieuwe minimumloonbedragen voor 2026 en bereken direct je bruto salaris.",
    keywords: [
      "minimumloon 2026",
      "minimumuurloon",
      "minimumloon per 1 juli 2026",
      "wettelijk minimumloon",
    ],
    content: [
      "Per 1 juli 2026 gaat het wettelijk minimumuurloon omhoog naar **€14,99 per uur**. Dit is een stijging van 1,90% ten opzichte van het vorige tarief van €14,71. De nieuwe bedragen gelden voor alle werknemers van 21 jaar en ouder.",

      "Het minimumloon wordt tweemaal per jaar aangepast: op 1 januari en op 1 juli. De aanpassing is gebaseerd op de gemiddelde cao-loonontwikkeling. Voor 2026 betekent dit een gematigde stijging die recht doet aan zowel werkgevers als werknemers.",

      "Voor werknemers jonger dan 21 jaar gelden lagere minimumjeugdlonen. Deze zijn vastgesteld als een percentage van het volwassen minimumloon, variërend van 30% op 15-jarige leeftijd tot 80% op 20-jarige leeftijd.",

      "Het wettelijk minimumloon is het bruto bedrag dat een werkgever minimaal moet betalen. Over dit bedrag worden nog belastingen en premies ingehouden. Wil je weten wat je netto overhoudt? Gebruik dan onze bruto-netto calculator.",

      "**Let op:** Het minimumloon is een bruto bedrag. Of je recht hebt op het volledige minimumloon hangt af van je leeftijd en het aantal gewerkte uren. Per 1 juli 2026 geldt het minimumuurloon, ongeacht het aantal uren in een dienstverband.",
    ],
    relatedCalculators: [
      { slug: "bruto-netto-salaris-calculator", categorySlug: "werk-en-inkomen", label: "Bruto-netto salaris berekenen" },
      { slug: "uurtarief-berekenen", categorySlug: "werk-en-inkomen", label: "Uurtarief naar maandinkomen" },
      { slug: "vakantiegeld-berekenen", categorySlug: "werk-en-inkomen", label: "Vakantiegeld berekenen" },
    ],
    sources: [
      { name: "Rijksoverheid — Minimumloon", url: "https://www.rijksoverheid.nl/onderwerpen/minimumloon" },
      { name: "Belastingdienst — Loonheffingen", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/loonheffingen/content/loonheffingen" },
    ],
  },
  {
    slug: "aow-leeftijd-en-bedragen-2026",
    date: "2026-06-15",
    category: "Pensioen & AOW",
    title: "AOW-leeftijd en AOW-bedragen 2026 — dit gaat er veranderen",
    description:
      "Wat is de AOW-leeftijd in 2026? En hoeveel AOW krijg je? Bekijk de actuele AOW-bedragen voor alleenstaanden en partners. Bereken direct jouw AOW-leeftijd.",
    keywords: [
      "aow leeftijd 2026",
      "aow bedragen 2026",
      "aow alleenstaand 2026",
      "aow pensioen",
    ],
    content: [
      "De AOW-leeftijd is in 2026 gekoppeld aan de levensverwachting en blijft voorlopig **67 jaar**. Voor mensen geboren in 1959 of later ligt de ingangsdatum van de AOW op 67 jaar en 3 maanden of later, afhankelijk van de exacte geboortedatum.",

      "**AOW-bedragen 2026:** Voor een alleenstaande bedraagt de AOW-uitkering circa **€1.580 bruto per maand** exclusief vakantietoeslag. Voor gehuwden en samenwonenden is dit circa **€1.080 per persoon per maand**. Deze bedragen worden tweemaal per jaar aangepast aan de cao-loonontwikkeling.",

      "Naast de basis AOW-uitkering ontvangen de meeste Nederlanders ook een aanvullend pensioen via hun werkgever. De hoogte hiervan verschilt per pensioenfonds en sector.",

      "Wil je precies weten wanneer jij met AOW kunt? En hoeveel AOW je ontvangt op basis van je opgebouwde jaren? Gebruik onze AOW-leeftijd calculator voor een exacte berekening.",
    ],
    relatedCalculators: [
      { slug: "aow-leeftijd", categorySlug: "geld-en-verzekeringen", label: "AOW-leeftijd berekenen" },
      { slug: "bruto-netto-salaris-calculator", categorySlug: "werk-en-inkomen", label: "Bruto-netto pensioen berekenen" },
      { slug: "fire-berekenen", categorySlug: "geld-en-verzekeringen", label: "FIRE calculator — vroegpensioen" },
    ],
    sources: [
      { name: "SVB — AOW", url: "https://www.svb.nl/nl/aow" },
      { name: "Rijksoverheid — AOW-leeftijd", url: "https://www.rijksoverheid.nl/onderwerpen/aow" },
    ],
  },
  {
    slug: "belastingplan-2026-wijzigingen",
    date: "2026-06-01",
    category: "Belastingen",
    title: "Belastingplan 2026: alle wijzigingen op een rij",
    description:
      "Het Belastingplan 2026 is goedgekeurd. Ontdek wat er verandert: nieuwe belastingtarieven, schijven, heffingskortingen en box 3. Bereken direct wat het voor jou betekent.",
    keywords: [
      "belastingplan 2026",
      "belastingtarieven 2026",
      "inkomstenbelasting 2026",
      "belastingwijzigingen 2026",
    ],
    content: [
      "Het Belastingplan 2026 is door de Tweede Kamer goedgekeurd en brengt een aantal belangrijke wijzigingen met zich mee. De belangrijkste aanpassingen vind je hieronder.",

      "**Inkomstenbelasting box 1 (werk en woning):** De eerste schijf wordt verlaagd naar 35,82% (was 36,97% in 2025). De tweede schijf blijft 37,48% en de derde schijf (topinkomens) wordt 49,50%. De algemene heffingskorting en arbeidskorting worden licht verhoogd om de koopkracht te ondersteunen.",

      "**Box 2 (aanmerkelijk belang):** Het tarief stijgt naar 33% over de eerste €70.000 aan inkomen en 31% over het meerdere. Dit is een vereenvoudiging ten opzichte van de eerdere staffel.",

      "**Box 3 (sparen en beleggen):** Het forfaitaire rendement wordt aangepast. Voor spaargeld geldt een lager fictief rendement, voor beleggingen een hoger. Het heffingsvrij vermogen stijgt naar €57.000 per persoon.",

      "**Overige wijzigingen:** De zelfstandigenaftrek daalt verder naar €2.470. De hypotheekrenteaftrek blijft ongewijzigd. Het kindgebonden budget en de kinderopvangtoeslag worden verhoogd.",

      "Wil je weten wat deze wijzigingen voor jouw portemonnee betekenen? Gebruik onze calculators om je salaris, box 3 belasting en toeslagen te berekenen.",
    ],
    relatedCalculators: [
      { slug: "bruto-netto-salaris-calculator", categorySlug: "werk-en-inkomen", label: "Bruto-netto salaris 2026" },
      { slug: "box3-berekenen", categorySlug: "geld-en-verzekeringen", label: "Box 3 belasting berekenen" },
      { slug: "zelfstandigenaftrek", categorySlug: "ondernemen", label: "Zelfstandigenaftrek berekenen" },
    ],
    sources: [
      { name: "Rijksoverheid — Belastingplan 2026", url: "https://www.rijksoverheid.nl/onderwerpen/belastingplan" },
      { name: "Belastingdienst — Tarieven", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/inkomstenbelasting/tarieven" },
    ],
  },
  {
    slug: "kinderbijslag-2026-nieuwe-bedragen",
    date: "2026-05-20",
    category: "Toeslagen",
    title: "Kinderbijslag 2026: nieuwe bedragen 3e en 4e kwartaal",
    description:
      "De SVB heeft de nieuwe kinderbijslagbedragen voor 2026 bekendgemaakt. Bekijk de bedragen per leeftijdsgroep en bereken direct hoeveel kinderbijslag jij ontvangt.",
    keywords: [
      "kinderbijslag 2026",
      "kinderbijslag bedragen 2026",
      "svb kinderbijslag",
      "kinderbijslag 3e kwartaal",
    ],
    content: [
      "De Sociale Verzekeringsbank (SVB) heeft de kinderbijslagbedragen voor het 3e en 4e kwartaal van 2026 bekendgemaakt. De kinderbijslag wordt per kwartaal uitbetaald en is afhankelijk van de leeftijd van het kind.",

      "**Kinderbijslag 2026 per kwartaal:** Voor kinderen van 0 tot 5 jaar ontvang je circa €280 per kwartaal. Voor kinderen van 6 tot 11 jaar is dit circa €340 per kwartaal. Voor kinderen van 12 tot 17 jaar ontvang je circa €400 per kwartaal.",

      "De kinderbijslag is een van de weinige toeslagen die niet inkomensafhankelijk is. Iedereen met kinderen ontvangt hetzelfde bedrag, ongeacht het inkomen. Wel moet je kind bij aanvang in Nederland wonen en verzekerd zijn.",

      "Naast de kinderbijslag bestaat er ook het kindgebonden budget. Dit is wél inkomensafhankelijk en wordt via de Belastingdienst uitbetaald. Gebruik onze kinderbijslag calculator om te zien hoeveel jij ontvangt.",
    ],
    relatedCalculators: [
      { slug: "kinderbijslag", categorySlug: "geld-en-verzekeringen", label: "Kinderbijslag berekenen" },
      { slug: "kinderalimentatie", categorySlug: "geld-en-verzekeringen", label: "Kinderalimentatie berekenen" },
      { slug: "bruto-netto-salaris-calculator", categorySlug: "werk-en-inkomen", label: "Bruto-netto salaris 2026" },
    ],
    sources: [
      { name: "SVB — Kinderbijslag", url: "https://www.svb.nl/nl/kinderbijslag" },
    ],
  },
  {
    slug: "box-3-belasting-2026-tarieven",
    date: "2026-05-10",
    category: "Belastingen",
    title: "Box 3 belasting 2026: tarieven, vrijstelling & rendementen",
    description:
      "Alles wat je moet weten over Box 3 in 2026. Ontdek de forfaitaire rendementen, heffingsvrij vermogen en belastingtarieven. Bereken direct je vermogensrendementsheffing.",
    keywords: [
      "box 3 2026",
      "box 3 tarieven 2026",
      "vermogensrendementsheffing 2026",
      "heffingsvrij vermogen 2026",
    ],
    content: [
      "In 2026 wordt de vermogensrendementsheffing (Box 3) berekend op basis van een split-rate systeem. Dit betekent dat spaargeld en beleggingen apart worden belast met verschillende fictieve rendementspercentages.",

      "**Forfaitaire rendementen 2026:** Voor spaargeld geldt een fictief rendement van 1,03%. Voor beleggingen en andere bezittingen geldt een fictief rendement van 6,04%. Schulden worden in mindering gebracht met een fictief rendement van 2,47%.",

      "**Heffingsvrij vermogen 2026:** Het heffingsvrij vermogen stijgt naar **€57.000 per persoon** (€114.000 voor fiscale partners). Over het meerdere wordt belasting geheven tegen een tarief van 36%.",

      "**Voorbeeld:** Stel, je hebt €80.000 spaargeld en €30.000 aan beleggingen. Je heffingsvrije vermogen is €57.000. Over het resterende deel wordt het fictieve rendement berekend en belast tegen 36%.",

      "Gebruik onze Box 3 calculator om exact te berekenen hoeveel belasting je betaalt over je vermogen. De calculator houdt rekening met de split-rate, heffingsvrij vermogen en de verdeling tussen sparen en beleggen.",
    ],
    relatedCalculators: [
      { slug: "box3-berekenen", categorySlug: "geld-en-verzekeringen", label: "Box 3 berekenen" },
      { slug: "vermogensbelasting-box3", categorySlug: "geld-en-verzekeringen", label: "Vermogensbelasting Box 3" },
      { slug: "compound-interest", categorySlug: "geld-en-verzekeringen", label: "Vermogensgroei tracker" },
    ],
    sources: [
      { name: "Belastingdienst — Box 3", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/inkomen-uit-sparen-en-beleggen" },
    ],
  },
  {
    slug: "btw-tarieven-2026",
    date: "2026-05-01",
    category: "Ondernemen",
    title: "BTW tarieven 2026 — wijzigingen voor ondernemers",
    description:
      "Overzicht van BTW tarieven in 2026: 21%, 9% en 0%. Wat is er veranderd? Bereken eenvoudig de BTW over je facturen en omzet met onze BTW calculator.",
    keywords: [
      "btw tarieven 2026",
      "btw 2026",
      "btw percentage 2026",
      "omzetbelasting 2026",
    ],
    content: [
      "In 2026 blijven de BTW-tarieven in Nederland ongewijzigd: het **algemene tarief is 21%**, het **verlaagde tarief is 9%** en het **nultarief is 0%**. Het verlaagde tarief van 9% geldt voor onder andere voedingsmiddelen, boeken, geneesmiddelen en sport.",

      "**Let op:** Sinds 2024 is het verlaagde BTW-tarief voor cultuur, media en sport verhoogd naar 21%. Dit betekent dat entreekaartjes voor musea, theaters, festivals en sportwedstrijden sindsdien onder het hoge BTW-tarief vallen.",

      "Voor ondernemers is het belangrijk om het juiste BTW-tarief toe te passen op facturen. Bij verkeerd tarief kun je een naheffing krijgen van de Belastingdienst. Gebruik onze BTW calculator om snel het juiste bedrag te berekenen.",

      "Daarnaast kun je als ondernemer gebruikmaken van de **kleineondernemersregeling (KOR)** als je omzet onder €20.000 per jaar blijft. Dan hoef je geen BTW te berekenen en af te dragen.",
    ],
    relatedCalculators: [
      { slug: "btw-calculator", categorySlug: "ondernemen", label: "BTW calculator" },
      { slug: "btw-incl-excl", categorySlug: "ondernemen", label: "BTW inclusief/exclusief" },
      { slug: "btw-privegebruik", categorySlug: "ondernemen", label: "BTW privégebruik" },
    ],
    sources: [
      { name: "Belastingdienst — BTW tarieven", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/btw/content/btw-tarieven" },
    ],
  },
  {
    slug: "hypotheekrente-2026-actueel",
    date: "2026-04-15",
    category: "Hypotheek & Wonen",
    title: "Hypotheekrente 2026 — actuele rente en trends",
    description:
      "De hypotheekrente in 2026: een compleet overzicht van actuele rentetarieven, trends en voorspellingen. Bereken direct je maximale hypotheek en maandlasten.",
    keywords: [
      "hypotheekrente 2026",
      "hypotheekrente actueel",
      "hypotheekrente trend 2026",
      "maximale hypotheek 2026",
    ],
    content: [
      "De hypotheekrente in 2026 beweegt zich rond de **3,5% tot 4,5%** voor een 10-jaars vaste rente, afhankelijk van de loan-to-value (LTV) verhouding. Voor een 20- of 30-jaars vaste rente liggen de tarieven iets hoger.",

      "Na de sterke rentestijging in 2022-2023 is de markt in 2026 gestabiliseerd. De Nederlandsche Bank (DNB) verwacht dat de rente de komende periode geleidelijk zal dalen naarmate de inflatie afneemt.",

      "**Hypotheekrente aftrek 2026:** De hypotheekrenteaftrek blijft ongewijzigd. Je kunt de rente over je aflossingsvrije of annuïteitenhypotheek aftrekken van je inkomen in box 1, mits je voldoet aan de aflossingseisen (minimaal annuïtair aflossen in 30 jaar).",

      "Wil je weten wat je maximale hypotheek is op basis van jouw inkomen? En wat je maandlasten zouden zijn bij de huidige rente? Gebruik onze calculators voor een snelle en betrouwbare berekening.",
    ],
    relatedCalculators: [
      { slug: "maximale-hypotheek", categorySlug: "hypotheek", label: "Maximale hypotheek berekenen" },
      { slug: "annuiteiten-lasten", categorySlug: "geld-en-verzekeringen", label: "Annuïteiten maandlasten" },
      { slug: "extra-aflossen", categorySlug: "geld-en-verzekeringen", label: "Extra aflossen hypotheek" },
    ],
    sources: [
      { name: "DNB — Hypotheekrente", url: "https://www.dnb.nl/statistiek/" },
      { name: "Rijksoverheid — Hypotheekrenteaftrek", url: "https://www.rijksoverheid.nl/onderwerpen/hypotheek" },
    ],
  },
  {
    slug: "zorgtoeslag-2026-bedragen",
    date: "2026-04-01",
    category: "Toeslagen",
    title: "Zorgtoeslag 2026: nieuwe bedragen en inkomensgrenzen",
    description:
      "De zorgtoeslag in 2026: nieuwe bedragen, inkomensgrenzen en drempelbedragen. Bereken direct of je recht hebt op zorgtoeslag en hoeveel je ontvangt.",
    keywords: [
      "zorgtoeslag 2026",
      "zorgtoeslag bedragen 2026",
      "zorgtoeslag inkomen 2026",
      "zorgtoeslag drempel",
    ],
    content: [
      "De zorgtoeslag in 2026 wordt verhoogd om de stijgende zorgpremies te compenseren. Voor alleenstaanden bedraagt de maximale zorgtoeslag circa **€140 per maand**. Voor partners is dit circa **€270 per maand**.",

      "**Inkomensgrens 2026:** Voor alleenstaanden is de inkomensgrens voor zorgtoeslag circa **€34.500** bruto per jaar. Voor partners geldt een grens van circa **€46.000** per jaar. Boven deze inkomens ontvang je geen zorgtoeslag.",

      "De zorgtoeslag wordt door de Belastingdienst berekend op basis van je geschatte jaarinkomen. Als je inkomen gedurende het jaar wijzigt, kun je een voorlopige toeslag aanvragen. Het is belangrijk om wijzigingen door te geven om terugvorderingen te voorkomen.",

      "Wil je precies weten of je recht hebt op zorgtoeslag en hoeveel je ontvangt? Onze calculators helpen je bij het berekenen van je zorg- en huurtoeslag.",
    ],
    relatedCalculators: [
      { slug: "bruto-netto-salaris-calculator", categorySlug: "werk-en-inkomen", label: "Bruto-netto salaris 2026" },
    ],
    sources: [
      { name: "Belastingdienst — Zorgtoeslag", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/zorgtoeslag" },
    ],
  },
  {
    slug: "prinsjesdag-2026-belastingplan",
    date: "2026-03-15",
    category: "Belastingen",
    title: "Prinsjesdag 2026 — dit zijn de belangrijkste wijzigingen",
    description:
      "Prinsjesdag 2026: alle kabinetsplannen voor 2027 op een rij. Nieuwe belastingtarieven, koopkrachtontwikkeling en wijzigingen in toeslagen en heffingskortingen.",
    keywords: [
      "prinsjesdag 2026",
      "belastingplan 2027",
      "miljoenennota 2027",
      "kabinetsplannen 2027",
    ],
    content: [
      "Op Prinsjesdag 2026 (derde dinsdag van september) presenteert het kabinet de Miljoenennota en het Belastingplan voor 2027. Dit is het belangrijkste moment van het jaar voor financiële wijzigingen.",

      "**Wat kunnen we verwachten?** Het kabinet zal naar verwachting verdere stappen zetten in de herziening van het belastingstelsel. De belangrijkste punten zijn: aanpassing van de inkomstenbelasting in box 1, verdere hervorming van box 3 en wijzigingen in de hypotheekrenteaftrek.",

      "**Koopkracht 2027:** De meeste huishoudens kunnen een lichte koopkrachtstijging verwachten door de verhoging van heffingskortingen en de aanpassing van de belastingschijven. De inflatie is naar verwachting gedaald naar circa 2-3%.",

      "Zodra de plannen definitief zijn, werken wij onze calculators bij zodat je direct kunt berekenen wat de wijzigingen voor jou betekenen.",
    ],
    relatedCalculators: [
      { slug: "bruto-netto-salaris-calculator", categorySlug: "werk-en-inkomen", label: "Bruto-netto salaris berekenen" },
      { slug: "box3-berekenen", categorySlug: "geld-en-verzekeringen", label: "Box 3 berekenen" },
      { slug: "maximale-hypotheek", categorySlug: "hypotheek", label: "Maximale hypotheek" },
    ],
    sources: [
      { name: "Rijksoverheid — Prinsjesdag", url: "https://www.rijksoverheid.nl/onderwerpen/prinsjesdag" },
      { name: "Ministerie van Financiën — Miljoenennota", url: "https://www.rijksoverheid.nl/ministeries/ministerie-van-financien" },
    ],
  },
  {
    slug: "huurtoeslag-2026-bedragen-en-grenzen",
    date: "2026-03-01",
    category: "Toeslagen",
    title: "Huurtoeslag 2026: bedragen, inkomensgrenzen en huurtoeslagberekening",
    description:
      "Alles over huurtoeslag in 2026. Ontdek de maximale huurgrens, inkomensgrenzen en hoogte van de huurtoeslag. Bereken direct je huurtoeslag.",
    keywords: [
      "huurtoeslag 2026",
      "huurtoeslag bedragen 2026",
      "maximale huurtoeslag 2026",
      "huurtoeslag inkomensgrens",
    ],
    content: [
      "De huurtoeslag in 2026 is bedoeld voor huurders met een laag inkomen. Je ontvangt huurtoeslag als je huur niet hoger is dan de **maximale huurgrens** en je inkomen onder de inkomensgrens valt.",

      "**Maximale huurgrens 2026:** De maximale huur voor huurtoeslag is circa **€880 per maand** (prijspeil 2026). Dit is de zogenaamde liberalisatiegrens. Voor jongeren onder de 23 jaar geldt een lagere grens.",

      "**Inkomensgrenzen 2026:** Voor alleenstaanden geldt een inkomensgrens van circa **€38.000** bruto per jaar. Voor meerpersoonshuishoudens is dit circa **€46.000**. Hoe hoger je inkomen, hoe lager de toeslag.",

      "De hoogte van de huurtoeslag hangt af van je rekenhuur, je inkomen en de samenstelling van je huishouden. Gebruik onze calculator om te berekenen hoeveel huurtoeslag jij ontvangt.",
    ],
    relatedCalculators: [
      { slug: "huurtoeslag", categorySlug: "geld-en-verzekeringen", label: "Huurtoeslag berekenen" },
      { slug: "bruto-netto-salaris-calculator", categorySlug: "werk-en-inkomen", label: "Bruto-netto salaris 2026" },
    ],
    sources: [
      { name: "Belastingdienst — Huurtoeslag", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/huurtoeslag" },
    ],
  },
];

/**
 * Get all news articles, sorted by date (most recent first)
 */
export function getAllNews(): NewsArticle[] {
  return [...registry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single article by slug
 */
export function getNewsArticle(slug: string): NewsArticle | undefined {
  return registry.find((a) => a.slug === slug);
}

/**
 * Get all unique categories
 */
export function getNewsCategories(): string[] {
  return [...new Set(registry.map((a) => a.category))];
}
