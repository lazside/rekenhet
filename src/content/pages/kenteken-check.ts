import { registerPages } from "../types";

registerPages({
  slug: "kenteken-check",
  seo: {
    title: "Kenteken Check — Auto Gegevens & MRB | Rekenhet.nl",
    description: "Gratis kenteken check via RDW Open Data.",
    h1: "Kenteken Check — Bereken je autokosten",
    intro: "Autokosten kunnen flink oplopen. Met deze Kenteken Check krijg je inzicht in je uitgaven. Voer een Nederlands kenteken in en ontdek merk, model, gewicht, CO₂, MRB en bijtelling. Zo weet je precies waar je aan toe bent en kun je onverwachte kosten voorkomen.",
    conclusion: "Deze calculator geeft een reële schatting van je autokosten of boetebedrag. Houd er rekening mee dat daadwerkelijke kosten kunnen afwijken door persoonlijke omstandigheden, actuele brandstofprijzen of specifieke situaties. Raadpleeg bij twijfel de officiële bronnen zoals de RDW, het CJIB of de Belastingdienst.",
    keywords: ["kenteken check","rdw kenteken","autogegevens opzoeken","wegenbelasting berekenen","kenteken check 2026"],
  },
  calculator: {
    componentSlug: "kenteken-check",
    categorySlug: "auto-vervoer",
  },
  categoryLabel: "Auto & Vervoer",
    faqs: [
    {
      question: "Hoe gebruik ik de Kenteken Check?",
      answer: "Voer een Nederlands kenteken in en ontdek direct merk, model, gewicht, CO₂, wegenbelasting (MRB) en bijtelling. RDW Open Data. Voer de gevraagde gegevens in en ontvang direct het resultaat.",
    },
    {
      question: "Zijn de gegevens in kenteken check actueel?",
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
