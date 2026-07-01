import { registerPages } from "../types";

registerPages({
  slug: "inflatie-calculator",
  seo: {
    title: "Inflatie Calculator — Koopkrachtverlies & Gecorrigeerd Bedrag | Rekenhet.nl",
    description:
      "Bereken de waarde van een bedrag gecorrigeerd voor inflatie. Ontdek het koopkrachtverlies door prijsstijgingen door de jaren heen.",
    h1: "Inflatie Calculator — Bereken de waarde van geld door de jaren heen",
    intro:
      "Inflatie zorgt ervoor dat je geld minder waard wordt na verloop van tijd. €10.000 in 2020 is in 2026 minder waard door prijsstijgingen. Met deze inflatiecalculator kun je een bedrag uit het verleden corrigeren voor inflatie, of juist berekenen wat een toekomstig bedrag nu waard zou zijn. Je ziet direct het gecorrigeerde bedrag, het koopkrachtverlies en de inflatiefactor.",
    conclusion:
      "Inflatie heeft een grote invloed op je koopkracht. Met een gemiddelde inflatie van 3% is €10.000 na 6 jaar nog maar ongeveer €8.370 waard in koopkracht — een verlies van €1.627. Het is belangrijk om rekening te houden met inflatie bij langetermijnbesparingen, pensioenopbouw en investeringen. Een goede belegging of spaarvorm moet minimaal de inflatie verslaan om je vermogen op peil te houden.",
    keywords: [
      "inflatie calculator",
      "koopkrachtverlies berekenen",
      "inflatie corrigeren",
      "waarde geld door de tijd",
      "inflatie berekenen",
      "prijsstijging berekenen",
      "koopkracht berekenen",
    ],
  },
  calculator: {
    componentSlug: "inflatie-calculator",
    categorySlug: "geld-en-verzekeringen",
  },
  categoryLabel: "Geld & Verzekeringen",
    faqs: [
    {
      question: "Hoe wordt de berekening van inflatie calculator gemaakt?",
      answer: "De calculator werkt met de actuele 2026-tarieven en -regels van de Belastingdienst en andere officiële instanties. De berekening geeft een betrouwbare indicatie op basis van jouw invoer.",
    },
    {
      question: "Zijn de tarieven voor inflatie calculator up-to-date voor 2026?",
      answer: "Ja, alle tarieven in deze calculator zijn bijgewerkt met de officiële 2026-bedragen. We updaten de calculators jaarlijks na publicatie van nieuwe tarieven.",
    },
    {
      question: "Is de uitkomst van inflatie calculator bindend?",
      answer: "Nee, de calculator geeft een indicatieve berekening. Voor definitief advies over jouw persoonlijke financiële situatie raden we aan een financieel adviseur te raadplegen.",
    },
    {
      question: "Wat is het verschil tussen bruto en netto bij deze tool?",
      answer: "Bruto is het bedrag vóór belasting en premies, netto is wat je daadwerkelijk ontvangt of betaalt. De calculator toont beide waarden.",
    }
  ],
}
);
