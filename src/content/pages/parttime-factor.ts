import { registerPages } from "../types";

registerPages({
  slug: "parttime-factor",
  seo: {
    title: "Parttime Salaris Berekenen — Factor & Uren | Rekenhet.nl",
    description: "Bereken je parttime salaris op basis van je fulltime inkomen en het aantal uren. Ontdek direct je parttime factor en wat je netto overhoudt.",
    h1: "Parttime Salaris Berekenen — Wat verdien je bij minder uren?",
    intro: "Overweeg je minder te gaan werken? Met deze parttime calculator bereken je eenvoudig wat er gebeurt met je salaris als je minder uren gaat werken. Je ziet direct je parttime factor, het bijbehorende bruto salaris en een schatting van wat je netto overhoudt.",
    conclusion: "Minder werken betekent niet alleen een lager salaris, maar vaak ook meer vrije tijd en een betere werk-privébalans. Houd bij je berekening ook rekening met vaste lasten, pensioenopbouw en eventuele regelingen zoals een 13e maand of vakantiegeld.",
    keywords: [
      "parttime salaris berekenen",
      "parttime factor",
      "minder uren werken salaris",
      "fulltime naar parttime",
      "salaris bij minder uren",
    ],
  },
  calculator: {
    componentSlug: "parttime-factor",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
    faqs: [
    {
      question: "Hoe berekent de Parttime Salaris Factor mijn netto inkomen?",
      answer: "Bereken je parttime salaris op basis van je fulltime salaris en het aantal uren dat je gaat werken. Inclusief procentuele factor. De calculator houdt rekening met belastingschijven, heffingskortingen en premies volksverzekeringen voor 2026.",
    },
    {
      question: "Klopt de Parttime Salaris Factor met de actuele belastingregels?",
      answer: "Ja, de calculator werkt met de meest recente belastingtarieven en -regels voor 2026. We updaten de tool jaarlijks.",
    },
    {
      question: "Houdt de calculator rekening met heffingskortingen?",
      answer: "Ja, waar relevant worden de algemene heffingskorting en arbeidskorting meegenomen in de berekening, tenzij anders aangegeven.",
    },
    {
      question: "Kan ik de calculator ook gebruiken voor parttime berekeningen?",
      answer: "Ja, de calculator werkt voor zowel fulltime als parttime dienstverbanden. Voer je contracturen in voor een nauwkeurige berekening.",
    }
  ],
}
);
