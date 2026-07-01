import { registerPages } from "../types";

registerPages({
  slug: "compound-interest",
  seo: {
    title: "Vermogensgroei Berekenen — Compound Interest | Rekenhet.nl",
    description: "Gratis vermogensgroei calculator. Bereken eindwaarde met samengestelde rente.",
    h1: "Vermogensgroei Tracker — Bereken het eenvoudig en snel",
    intro: "Of het nu gaat om belasting, spaargeld of verzekeringen — met deze Vermogensgroei Tracker weet je waar je aan toe bent. Bereken de groei van je vermogen met compound interest (samengestelde rente). De calculator werkt met de actuele 2026-tarieven en -regels, zodat je altijd een reëel beeld krijgt.",
    conclusion: "Of je nu spaart, belegt, een lening afsluit of belasting betaalt — deze calculator geeft je inzicht in je financiële situatie. Houd er rekening mee dat persoonlijke omstandigheden het definitieve bedrag kunnen beïnvloeden. Voor een officiële berekening raadpleeg je een financieel adviseur.",
    keywords: ["vermogensgroei","compound interest","samengestelde rente","beleggen groei","compound interest 2026"],
  },
  calculator: {
    componentSlug: "compound-interest",
    categorySlug: "geld-en-verzekeringen",
  },
  categoryLabel: "Geld & Verzekeringen",
    faqs: [
    {
      question: "Hoe wordt de berekening van vermogensgroei tracker gemaakt?",
      answer: "De calculator werkt met de actuele 2026-tarieven en -regels van de Belastingdienst en andere officiële instanties. De berekening geeft een betrouwbare indicatie op basis van jouw invoer.",
    },
    {
      question: "Zijn de tarieven voor vermogensgroei tracker up-to-date voor 2026?",
      answer: "Ja, alle tarieven in deze calculator zijn bijgewerkt met de officiële 2026-bedragen. We updaten de calculators jaarlijks na publicatie van nieuwe tarieven.",
    },
    {
      question: "Is de uitkomst van vermogensgroei tracker bindend?",
      answer: "Nee, de calculator geeft een indicatieve berekening. Voor definitief advies over jouw persoonlijke financiële situatie raden we aan een financieel adviseur te raadplegen.",
    },
    {
      question: "Wat is het verschil tussen bruto en netto bij deze tool?",
      answer: "Bruto is het bedrag vóór belasting en premies, netto is wat je daadwerkelijk ontvangt of betaalt. De calculator toont beide waarden.",
    }
  ],
}
);
