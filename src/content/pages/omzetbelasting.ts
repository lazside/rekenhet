import { registerPages } from "../types";

registerPages({
  slug: "omzetbelasting",
  seo: {
    title: "Omzetbelasting (BTW) Berekenen — Af te Dragen BTW | Rekenhet.nl",
    description:
      "Bereken eenvoudig je af te dragen BTW op basis van omzet, tarief en voorbelasting. Met 21%, 9% en 0% tarieven. Direct inzicht voor je BTW-aangifte.",
    h1: "Omzetbelasting Berekenen — BTW berekenen voor ondernemers",
    intro:
      "Als ondernemer in Nederland moet je BTW (omzetbelasting) berekenen over je facturen en dit bedrag periodiek afdragen aan de Belastingdienst. Met deze calculator bereken je eenvoudig hoeveel BTW je moet afdragen op basis van je omzet exclusief BTW, het toepasselijke BTW-tarief en de voorbelasting die je kunt terugvorderen. De calculator geeft direct inzicht in het bedrag dat je moet betalen of terugkrijgt.",
    conclusion:
      "Het correct berekenen en afdragen van omzetbelasting is een belangrijke verplichting voor elke ondernemer. Door je voorbelasting goed bij te houden kun je de BTW-druk verlagen. Veel ondernemers dienen elk kwartaal hun BTW-aangifte in. Bij twijfel over de juiste toepassing van BTW-tarieven of bijzondere regelingen kun je het beste contact opnemen met een boekhouder of de Belastingdienst.",
    keywords: [
      "omzetbelasting berekenen",
      "BTW berekenen",
      "af te dragen BTW",
      "btw aangifte",
      "voorbelasting",
      "btw tarief 21 procent",
      "btw factuur",
    ],
  },
  calculator: {
    componentSlug: "omzetbelasting",
    categorySlug: "ondernemen",
  },
  categoryLabel: "Ondernemen",
    faqs: [
    {
      question: "Hoe gebruik ik de Omzetbelasting voor mijn administratie?",
      answer: "Bereken de af te dragen BTW op basis van omzet, BTW-tarief en voorbelasting. De resultaten kun je gebruiken als indicatie voor je administratie. Voor de definitieve aangifte raden we aan een boekhouder te raadplegen.",
    },
    {
      question: "Zijn de tarieven in omzetbelasting actueel voor 2026?",
      answer: "Ja, alle belastingtarieven, percentages en drempelbedragen zijn bijgewerkt met de officiële 2026-waarden van de Belastingdienst.",
    },
    {
      question: "Kan ik de resultaten gebruiken voor mijn belastingaangifte?",
      answer: "De calculator geeft een betrouwbare indicatie, maar voor de officiële belastingaangifte raden we aan de berekeningen te verifiëren met een fiscaal adviseur.",
    },
    {
      question: "Wat zijn de voordelen voor mijn onderneming?",
      answer: "De calculator geeft je snel inzicht in je financiële situatie, zodat je betere beslissingen kunt nemen voor je bedrijf. Geen registratie nodig.",
    }
  ],
}
);
