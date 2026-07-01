import { registerPages } from "../types";

registerPages({
  slug: "fire",
  seo: {
    title: "FIRE Berekenen — Financiële Onafhankelijkheid | Rekenhet.nl",
    description: "Gratis FIRE calculator voor financiële onafhankelijkheid en vroegpensioen.",
    h1: "FIRE Berekenen — Financieel Onafhankelijk — Bereken het eenvoudig en snel",
    intro: "Of het nu gaat om belasting, spaargeld of verzekeringen — met deze FIRE Berekenen — Financieel Onafhankelijk weet je waar je aan toe bent. Bereken hoe lang je nodig hebt om financieel onafhankelijk te worden (FIRE). De calculator werkt met de actuele 2026-tarieven en -regels, zodat je altijd een reëel beeld krijgt.",
    conclusion: "Of je nu spaart, belegt, een lening afsluit of belasting betaalt — deze calculator geeft je inzicht in je financiële situatie. Houd er rekening mee dat persoonlijke omstandigheden het definitieve bedrag kunnen beïnvloeden. Voor een officiële berekening raadpleeg je een financieel adviseur.",
    keywords: ["fire","financieel onafhankelijk","vroegpensioen","sparen","beleggen FIRE","fire berekenen","fire berekenen 2026"],
  },
  calculator: {
    componentSlug: "fire-berekenen",
    categorySlug: "geld-en-verzekeringen",
  },
  categoryLabel: "Geld & Verzekeringen",
    faqs: [
    {
      question: "Hoe wordt de berekening van fire calculator gemaakt?",
      answer: "De calculator werkt met de actuele 2026-tarieven en -regels van de Belastingdienst en andere officiële instanties. De berekening geeft een betrouwbare indicatie op basis van jouw invoer.",
    },
    {
      question: "Zijn de tarieven voor fire calculator up-to-date voor 2026?",
      answer: "Ja, alle tarieven in deze calculator zijn bijgewerkt met de officiële 2026-bedragen. We updaten de calculators jaarlijks na publicatie van nieuwe tarieven.",
    },
    {
      question: "Is de uitkomst van fire calculator bindend?",
      answer: "Nee, de calculator geeft een indicatieve berekening. Voor definitief advies over jouw persoonlijke financiële situatie raden we aan een financieel adviseur te raadplegen.",
    },
    {
      question: "Wat is het verschil tussen bruto en netto bij deze tool?",
      answer: "Bruto is het bedrag vóór belasting en premies, netto is wat je daadwerkelijk ontvangt of betaalt. De calculator toont beide waarden.",
    }
  ],
}
);
