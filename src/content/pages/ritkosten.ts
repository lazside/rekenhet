import { registerPages } from "../types";

registerPages({
  slug: "ritkosten",
  seo: {
    title: "Ritkosten Berekenen — Brandstof, Tol & Parkeren | Rekenhet.nl",
    description: "Gratis ritkostencalculator. Bereken brandstofkosten, tol, parkeren en CO₂-uitstoot voor elke autorit.",
    h1: "Ritkosten Berekenen — Bereken je autokosten",
    intro: "Autokosten kunnen flink oplopen. Met deze Ritkosten Berekenen krijg je inzicht in je uitgaven. Bereken de totale kosten van een autorit: brandstofkosten, tol en parkeren. Inclusief CO₂-uitstoot. Zo weet je precies waar je aan toe bent en kun je onverwachte kosten voorkomen.",
    conclusion: "Deze calculator geeft een reële schatting van je autokosten of boetebedrag. Houd er rekening mee dat daadwerkelijke kosten kunnen afwijken door persoonlijke omstandigheden, actuele brandstofprijzen of specifieke situaties. Raadpleeg bij twijfel de officiële bronnen zoals de RDW, het CJIB of de Belastingdienst.",
    keywords: ["ritkosten berekenen","brandstofkosten","autokosten","woon-werkverkeer","ritkosten berekenen 2026"],
  },
  calculator: {
    componentSlug: "ritkosten-berekenen",
    categorySlug: "auto-vervoer",
  },
  categoryLabel: "Auto & Vervoer",
    faqs: [
    {
      question: "Hoe gebruik ik de Ritkosten Berekenen?",
      answer: "Bereken de totale kosten van een autorit: brandstofkosten, tol en parkeren. Inclusief CO₂-uitstoot. Handig voor woon-werkverkeer en zakelijke ritten. Voer de gevraagde gegevens in en ontvang direct het resultaat.",
    },
    {
      question: "Zijn de gegevens in ritkosten berekenen actueel?",
      answer: "Ja, de calculator gebruikt actuele tarieven, boetebedragen en RDW-gegevens voor 2026.",
    },
    {
      question: "Kan ik de tool vertrouwen voor officiële doeleinden?",
      answer: "De calculator geeft een betrouwbare indicatie. Voor officiële documenten raden we aan de gegevens te verifiëren bij de betreffende instantie.",
    },
    {
      question: "Werkt de calculator ook voor elektrische auto's?",
      answer: "Ja, waar relevant houdt de calculator rekening met elektrische voertuigen, inclusief lagere wegenbelasting en bijtellingspercentages.",
    }
  ],
}
);
