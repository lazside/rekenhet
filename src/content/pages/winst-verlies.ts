import { registerPages } from "../types";

registerPages({
  slug: "winst-verlies",
  seo: {
    title: "Winst & Verlies Calculator — Ondernemingsresultaat Berekenen | Rekenhet.nl",
    description:
      "Bereken de winst, winstmarge en kostenpercentage van je onderneming. Voer omzet, inkoop, huur, personeel en overige kosten in.",
    h1: "Winst & Verlies Calculator — Bereken het resultaat van je onderneming",
    intro:
      "Als ondernemer wil je snel inzicht in je financiële resultaten. Met deze winst- en verliescalculator bereken je eenvoudig je winst, winstmarge en kostenpercentage. Door je omzet en belangrijkste kostenposten in te vullen (inkoop, huur, personeel en overige kosten) krijg je direct een helder beeld van hoe je onderneming ervoor staat.",
    conclusion:
      "Een gezonde winstmarge is essentieel voor het voortbestaan van je onderneming. Door je kosten en opbrengsten regelmatig te analyseren, kun je tijdig bijsturen. Een vuistregel: streef naar een winstmarge van minimaal 10-20%, afhankelijk van je sector. Gebruik deze calculator om snel scenario's door te rekenen en te zien wat het effect is van kostenbesparingen of omzetgroei.",
    keywords: [
      "winst verlies berekenen",
      "winstmarge berekenen",
      "onderneming resultaat",
      "kostenpercentage",
      "winstberekening",
      "financieel overzicht onderneming",
    ],
  },
  calculator: {
    componentSlug: "winst-verlies",
    categorySlug: "ondernemen",
  },
  categoryLabel: "Ondernemen",
    faqs: [
    {
      question: "Hoe gebruik ik de Winst & Verlies voor mijn administratie?",
      answer: "Bereken je winst, marge en kostenpercentage op basis van omzet en kosten. De resultaten kun je gebruiken als indicatie voor je administratie. Voor de definitieve aangifte raden we aan een boekhouder te raadplegen.",
    },
    {
      question: "Zijn de tarieven in winst & verlies actueel voor 2026?",
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
