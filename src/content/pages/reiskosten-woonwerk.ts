import { registerPages } from "../types";

registerPages({
  slug: "reiskosten-woonwerk",
  seo: {
    title: "Reiskosten Woon-Werk Berekenen | Rekenhet.nl",
    description: "Gratis reiskosten woon-werk calculator voor kilometervergoeding.",
    h1: "Reiskosten Woon-Werk — Bereken het eenvoudig en snel",
    intro: "Wil je precies weten hoeveel je overhoudt of ontvangt? Deze Reiskosten Woon-Werk geeft je direct inzicht. Bereken de maandelijkse en jaarlijkse reiskostenvergoeding. Of je nu werknemer of werkgever bent, binnen enkele seconden zie je het resultaat op basis van de actuele 2026-regels en tarieven.",
    conclusion: "Het exacte bedrag hangt af van jouw persoonlijke situatie. Deze calculator geeft een indicatie op basis van de 2026-regels. Voor een definitieve berekening raadpleeg je een salarisadviseur of je werkgever. Gebruik de tool om verschillende scenario's door te rekenen en weloverwogen keuzes te maken.",
    keywords: ["reiskosten","woon-werk","reiskostenvergoeding","kilometervergoeding","reiskosten woonwerk","reiskosten woonwerk 2026"],
  },
  calculator: {
    componentSlug: "reiskosten-woonwerk",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
    faqs: [
    {
      question: "Hoe berekent de Reiskosten Woon-Werk mijn netto inkomen?",
      answer: "Bereken de maandelijkse en jaarlijkse reiskostenvergoeding De calculator houdt rekening met belastingschijven, heffingskortingen en premies volksverzekeringen voor 2026.",
    },
    {
      question: "Klopt de Reiskosten Woon-Werk met de actuele belastingregels?",
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
