import { registerPages } from "../types";

registerPages({
  slug: "auto-motor-omrekenen",
  seo: {
    title: "Auto & Motor Omrekenen — kW, pk, Nm, bar, PSI | Rekenhet.nl",
    description: "Gratis automotive omrekentool. Converteer kW naar pk, Nm naar ft-lbs, bar naar PSI.",
    h1: "Auto & Motor Omrekenen — Bereken je autokosten",
    intro: "Autokosten kunnen flink oplopen. Met deze Auto & Motor Omrekenen krijg je inzicht in je uitgaven. Reken eenvoudig autogerelateerde eenheden om: kW naar pk, Nm naar ft-lbs, bar naar PSI. Zo weet je precies waar je aan toe bent en kun je onverwachte kosten voorkomen.",
    conclusion: "Deze calculator geeft een reële schatting van je autokosten of boetebedrag. Houd er rekening mee dat daadwerkelijke kosten kunnen afwijken door persoonlijke omstandigheden, actuele brandstofprijzen of specifieke situaties. Raadpleeg bij twijfel de officiële bronnen zoals de RDW, het CJIB of de Belastingdienst.",
    keywords: ["auto omrekenen","kW naar pk","Nm naar ft-lbs","bar naar PSI","motorvermogen","auto motor omrekenen","auto motor omrekenen 2026"],
  },
  calculator: {
    componentSlug: "auto-motor-omrekenen",
    categorySlug: "auto-vervoer",
  },
  categoryLabel: "Auto & Vervoer",
    faqs: [
    {
      question: "Hoe gebruik ik de Auto & Motor Omrekenen?",
      answer: "Reken eenvoudig autogerelateerde eenheden om: kW naar pk, Nm naar ft-lbs, bar naar PSI. Perfect voor automotive en technische berekeningen. Voer de gevraagde gegevens in en ontvang direct het resultaat.",
    },
    {
      question: "Zijn de gegevens in auto & motor omrekenen actueel?",
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
