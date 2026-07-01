import { registerPages } from "../types";

registerPages({
  slug: "eindejaarsuitkering",
  seo: {
    title: "Eindejaarsuitkering Berekenen — Bruto & Netto | Rekenhet.nl",
    description: "Gratis eindejaarsuitkering calculator. Bereken bruto en netto uitkering.",
    h1: "Eindejaarsuitkering — Bereken het eenvoudig en snel",
    intro: "Wil je precies weten hoeveel je overhoudt of ontvangt? Deze Eindejaarsuitkering geeft je direct inzicht. Bereken de bruto en netto eindejaarsuitkering op basis van een percentage. Of je nu werknemer of werkgever bent, binnen enkele seconden zie je het resultaat op basis van de actuele 2026-regels en tarieven.",
    conclusion: "Het exacte bedrag hangt af van jouw persoonlijke situatie. Deze calculator geeft een indicatie op basis van de 2026-regels. Voor een definitieve berekening raadpleeg je een salarisadviseur of je werkgever. Gebruik de tool om verschillende scenario's door te rekenen en weloverwogen keuzes te maken.",
    keywords: ["eindejaarsuitkering","13e maand","bonus","uitkering","eindejaarsuitkering 2026"],
  },
  calculator: {
    componentSlug: "eindejaarsuitkering",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
    faqs: [
    {
      question: "Hoe berekent de Eindejaarsuitkering mijn netto inkomen?",
      answer: "Bereken de bruto en netto eindejaarsuitkering op basis van een percentage De calculator houdt rekening met belastingschijven, heffingskortingen en premies volksverzekeringen voor 2026.",
    },
    {
      question: "Klopt de Eindejaarsuitkering met de actuele belastingregels?",
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
