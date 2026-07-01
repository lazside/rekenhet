import { registerPages } from "../types";

registerPages({
  slug: "overuren",
  seo: {
    title: "Overuren Berekenen — Toeslag & Uurloon | Rekenhet.nl",
    description: "Gratis overuren calculator. Bereken je uurloon en overuurtoeslag.",
    h1: "Overuren Berekenen — Bereken het eenvoudig en snel",
    intro: "Wil je precies weten hoeveel je overhoudt of ontvangt? Deze Overuren Berekenen geeft je direct inzicht. Bereken de vergoeding voor overuren op basis van salaris en toeslagfactor. Of je nu werknemer of werkgever bent, binnen enkele seconden zie je het resultaat op basis van de actuele 2026-regels en tarieven.",
    conclusion: "Het exacte bedrag hangt af van jouw persoonlijke situatie. Deze calculator geeft een indicatie op basis van de 2026-regels. Voor een definitieve berekening raadpleeg je een salarisadviseur of je werkgever. Gebruik de tool om verschillende scenario's door te rekenen en weloverwogen keuzes te maken.",
    keywords: ["overuren","overuurtoeslag","uurloon","overwerk","overuren 2026"],
  },
  calculator: {
    componentSlug: "overuren",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
    faqs: [
    {
      question: "Hoe berekent de Overuren Berekenen mijn netto inkomen?",
      answer: "Bereken de vergoeding voor overuren op basis van salaris en toeslagfactor De calculator houdt rekening met belastingschijven, heffingskortingen en premies volksverzekeringen voor 2026.",
    },
    {
      question: "Klopt de Overuren Berekenen met de actuele belastingregels?",
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
