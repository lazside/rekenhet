import { registerPages } from "../types";

registerPages({
  slug: "dividend",
  seo: {
    title: "Dividend Belasting Berekenen — Netto Dividend | Rekenhet.nl",
    description: "Gratis dividend calculator voor bruto naar netto dividend.",
    h1: "Dividend Belasting Berekenen — Bereken het eenvoudig en snel",
    intro: "Of het nu gaat om belasting, spaargeld of verzekeringen — met deze Dividend Belasting Berekenen weet je waar je aan toe bent. Bereken de dividendbelasting en netto dividend na belasting. De calculator werkt met de actuele 2026-tarieven en -regels, zodat je altijd een reëel beeld krijgt.",
    conclusion: "Of je nu spaart, belegt, een lening afsluit of belasting betaalt — deze calculator geeft je inzicht in je financiële situatie. Houd er rekening mee dat persoonlijke omstandigheden het definitieve bedrag kunnen beïnvloeden. Voor een officiële berekening raadpleeg je een financieel adviseur.",
    keywords: ["dividend","dividendbelasting","dividend berekenen","aandelen","inkomsten","dividend berekenen 2026"],
  },
  calculator: {
    componentSlug: "dividend-berekenen",
    categorySlug: "geld-en-verzekeringen",
  },
  categoryLabel: "Geld & Verzekeringen",
    faqs: [
    {
      question: "Hoe wordt de berekening van dividend berekenen gemaakt?",
      answer: "De calculator werkt met de actuele 2026-tarieven en -regels van de Belastingdienst en andere officiële instanties. De berekening geeft een betrouwbare indicatie op basis van jouw invoer.",
    },
    {
      question: "Zijn de tarieven voor dividend berekenen up-to-date voor 2026?",
      answer: "Ja, alle tarieven in deze calculator zijn bijgewerkt met de officiële 2026-bedragen. We updaten de calculators jaarlijks na publicatie van nieuwe tarieven.",
    },
    {
      question: "Is de uitkomst van dividend berekenen bindend?",
      answer: "Nee, de calculator geeft een indicatieve berekening. Voor definitief advies over jouw persoonlijke financiële situatie raden we aan een financieel adviseur te raadplegen.",
    },
    {
      question: "Wat is het verschil tussen bruto en netto bij deze tool?",
      answer: "Bruto is het bedrag vóór belasting en premies, netto is wat je daadwerkelijk ontvangt of betaalt. De calculator toont beide waarden.",
    }
  ],
}
);
