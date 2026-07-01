import { registerPages } from "../types";

registerPages({
  slug: "vakantiedagen",
  seo: {
    title: "Vakantiedagen Berekenen — Wettelijk & Bovenwettelijk | Rekenhet.nl",
    description:
      "Bereken je wettelijke en bovenwettelijke vakantiedagen op basis van je dienstverband en uren per week. Fulltime of parttime. Direct inzicht.",
    h1: "Vakantiedagen Berekenen — Hoeveel vakantiedagen heb jij?",
    intro:
      "Hoeveel vakantiedagen heb je eigenlijk? In Nederland heeft elke werknemer recht op wettelijke vakantiedagen. Het minimum is vier keer het aantal werkuren per week. Daarnaast kunnen er bovenwettelijke vakantiedagen zijn op basis van je CAO of arbeidsovereenkomst. Met deze calculator bereken je eenvoudig je wettelijke, bovenwettelijke en totale vakantiedagen, zowel voor fulltime als parttime dienstverband.",
    conclusion:
      "Het aantal vakantiedagen is een belangrijke arbeidsvoorwaarde. Wettelijk heb je recht op minimaal vier keer je werkuren per week aan vakantie, maar veel werkgevers bieden bovenwettelijke dagen. Als parttimer bouw je naar rato vakantiedagen op. Houd er rekening mee dat niet alle vakantiedagen hetzelfde zijn: bovenwettelijke dagen mogen soms anders worden behandeld bij bijvoorbeeld een ontslag of einde dienstverband.",
    keywords: [
      "vakantiedagen berekenen",
      "wettelijke vakantiedagen",
      "bovenwettelijke vakantiedagen",
      "vakantiedagen fulltime",
      "vakantiedagen parttime",
      "hoeveel vakantiedagen krijg ik",
      "vakantie opbouwen",
    ],
  },
  calculator: {
    componentSlug: "vakantiedagen",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
    faqs: [
    {
      question: "Hoe berekent de Vakantiedagen mijn netto inkomen?",
      answer: "Bereken je wettelijke en bovenwettelijke vakantiedagen op basis van dienstverband en uren per week. De calculator houdt rekening met belastingschijven, heffingskortingen en premies volksverzekeringen voor 2026.",
    },
    {
      question: "Klopt de Vakantiedagen met de actuele belastingregels?",
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
