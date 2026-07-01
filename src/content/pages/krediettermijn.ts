import { registerPages } from "../types";

registerPages({
  slug: "krediettermijn",
  seo: {
    title: "Krediettermijn Berekenen | Rekenhet.nl",
    description: "Gratis krediettermijn calculator voor aflossing van een vordering.",
    h1: "Krediettermijn — Bereken het eenvoudig en snel",
    intro: "Als ondernemer wil je grip op je cijfers. Deze Krediettermijn helpt je snel en eenvoudig. Bereken de looptijd van een openstaande vordering. Gebruik de tool om verschillende scenario's door te rekenen en weloverwogen beslissingen te nemen voor je bedrijf.",
    conclusion: "Deze calculator geeft je een helder beeld van je financiële situatie als ondernemer. De daadwerkelijke bedragen kunnen afwijken op basis van je persoonlijke omstandigheden en het geldende belastingtarief. Raadpleeg een fiscalist of boekhouder voor definitief advies op maat.",
    keywords: ["krediettermijn","vordering","aflossen","betalingstermijn","krediettermijn 2026"],
  },
  calculator: {
    componentSlug: "krediettermijn",
    categorySlug: "ondernemen",
  },
  categoryLabel: "Ondernemen",
    faqs: [
    {
      question: "Hoe gebruik ik de Krediettermijn voor mijn administratie?",
      answer: "Bereken de looptijd van een openstaande vordering De resultaten kun je gebruiken als indicatie voor je administratie. Voor de definitieve aangifte raden we aan een boekhouder te raadplegen.",
    },
    {
      question: "Zijn de tarieven in krediettermijn actueel voor 2026?",
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
