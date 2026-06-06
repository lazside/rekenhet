import { registerPages } from "../types";

registerPages({
  slug: "huurtoeslag",
  seo: {
    title: "Huurtoeslag Berekenen 2026 — Exacte Berekening & Uitleg | Rekenhet.nl",
    description:
      "Bereken je huurtoeslag 2026 op basis van huur, inkomen, vermogen en huishoudsituatie. Met uitleg over rekenhuur, drempelhuur, aftoppingsgrens en vermogenstoets.",
    h1: "Huurtoeslag Berekenen 2026 — Waar heb je recht op?",
    intro:
      "Huurtoeslag is een tegemoetkoming van de overheid in de huurkosten. Of je recht hebt op huurtoeslag hangt af van je rekenhuur, je toetsingsinkomen, je vermogen en je huishoudsituatie. Met deze calculator bereken je eenvoudig of je in aanmerking komt voor huurtoeslag in 2026 en hoeveel je per maand ontvangt. De berekening volgt de officiële regels van de Belastingdienst Toeslagen, inclusief de kwaliteitskortingsgrens, aftoppingsgrenzen en de vermogenstoets.",
    conclusion:
      "Of je nu alleenstaand bent, een meerpersoonshuishouden hebt of als medebewoner een kamer huurt — met deze calculator krijg je een duidelijk beeld van je recht op huurtoeslag. Let op: de werkelijke toeslag kan afwijken door persoonlijke omstandigheden die niet in deze calculator zijn meegenomen. Voor een definitieve berekening log je in bij de Belastingdienst Toeslagen via Mijn Toeslagen. De huurtoeslag wordt maandelijks uitbetaald door de Belastingdienst en kan achteraf worden gecorrigeerd op basis van je definitieve inkomen.",
    keywords: [
      "huurtoeslag berekenen",
      "huurtoeslag 2026",
      "huursubsidie",
      "recht op huurtoeslag",
      "hoeveel huurtoeslag krijg ik",
      "huurtoeslag alleenstaand",
      "huurtoeslag rekenhuur",
      "toeslagen belastingdienst",
    ],
  },
  calculator: {
    componentSlug: "huurtoeslag",
    categorySlug: "geld-en-verzekeringen",
  },
  categoryLabel: "Geld & Verzekeringen",
  faqs: [
    {
      question: "Hoe wordt huurtoeslag berekend in 2026?",
      answer:
        "De huurtoeslag wordt berekend door eerst je rekenhuur (kale huur + servicekosten, max €879,66) te bepalen. Hiervan wordt de drempelhuur afgetrokken: een inkomensafhankelijk deel (15,3% voor alleenstaanden, 13% voor meerpersoonshuishoudens). Het resterende bedrag (de basishuur) wordt voor 65% vergoed, tot maximaal de aftoppingsgrens. Ook wordt getoetst of je vermogen onder de vrijstellingsgrens ligt (€63.285 voor alleenstaanden, €126.570 voor meerpersoonshuishoudens).",
    },
    {
      question: "Wat is de maximale huur voor huurtoeslag in 2026?",
      answer:
        "In 2026 mag de rekenhuur (kale huur + servicekosten) maximaal €879,66 per maand zijn om in aanmerking te komen voor huurtoeslag. Daarnaast geldt de aftoppingsgrens: voor alleenstaanden is dat €652,07 en voor meerpersoonshuishoudens €698,75. De toeslag wordt berekend over het deel van de huur tot deze aftoppingsgrens. De kwaliteitskortingsgrens ligt op €300,69 — het deel van de huur tot deze grens wordt volledig meegenomen in de toeslagberekening.",
    },
    {
      question: "Tot welk inkomen krijg je huurtoeslag in 2026?",
      answer:
        "Er is geen vaste inkomensgrens voor huurtoeslag — het hangt af van je huurhoogte, huishoudsituatie en leeftijd. Hoe hoger je inkomen, hoe hoger de drempelhuur en hoe lager de toeslag. Bij een inkomen boven ongeveer €45.000 (alleenstaand) of €55.000 (meerpersoons) is de toeslag meestal nihil, tenzij je huur erg hoog is. De calculator berekent dit nauwkeurig op basis van jouw situatie.",
    },
    {
      question: "Is huurtoeslag hetzelfde als de eenmalige huursubsidie?",
      answer:
        "Nee, huurtoeslag is een maandelijkse tegemoetkoming van de Belastingdienst die je elk jaar opnieuw kunt aanvragen. Dit is iets anders dan de eenmalige huursubsidie (starterslening of inrichtingskrediet) die sommige gemeenten verstrekken. De huurtoeslag wordt achteraf vastgesteld op basis van je definitieve inkomen, dus het is belangrijk om wijzigingen in je inkomen door te geven.",
    },
    {
      question: "Hoe vraag ik huurtoeslag aan?",
      answer:
        "Huurtoeslag vraag je aan via de Belastingdienst Toeslagen. Dit kan via de website toeslagen.nl met je DigiD. Je hebt nodig: je burgerservicenummer (BSN), je huurcontract, de huurprijs en je inkomen. De toeslag wordt met terugwerkende kracht toegekend vanaf de ingangsdatum van je huurcontract, mits je binnen 3 maanden na de ingangsdatum aanvraagt. De uitbetaling gebeurt maandelijks rond de 20e.",
    },
  ],
});
