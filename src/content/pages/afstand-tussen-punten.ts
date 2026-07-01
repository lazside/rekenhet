import { registerPages } from "../types";

registerPages({
  slug: "afstand-tussen-punten",
  seo: {
    title: "Afstand Tussen Punten Berekenen — Coördinaten | Rekenhet.nl",
    description: "Bereken de afstand tussen twee punten in een vlak met de Pythagoras-formule. Direct resultaat.",
    h1: "Afstand Tussen Punten Berekenen in een Vlak",
    intro: "Met deze calculator bereken je eenvoudig de afstand tussen twee punten in een 2D-vlak. Gebruik de stelling van Pythagoras om de euclidische afstand te vinden. Voer de coördinaten in en zie direct het resultaat.",
    conclusion: "Het berekenen van afstanden tussen punten is essentieel in meetkunde, navigatie, bouw en vele andere toepassingen. Of je nu de kortste route plant of een constructietekening maakt, deze tool geeft direct antwoord.",
    keywords: ["afstand tussen punten", "coordinaten", "afstand berekenen", "pythagoras", "meetkunde"],
  },
  calculator: {
    componentSlug: "afstand-tussen-punten",
    categorySlug: "wiskunde",
  },
  categoryLabel: "Wiskunde",
    faqs: [
    {
      question: "Hoe gebruik ik de Afstand Tussen Punten?",
      answer: "Voer eenvoudig de gevraagde waarden in en de calculator geeft direct het resultaat. Bij afstand tussen punten is het belangrijk dat je de juiste eenheden gebruikt voor een nauwkeurige uitkomst.",
    },
    {
      question: "Is de Afstand Tussen Punten geschikt voor middelbare school wiskunde?",
      answer: "Ja, deze calculator is ideaal voor middelbare scholieren. Het helpt bij het controleren van huiswerk en het begrijpen van wiskundige concepten.",
    },
    {
      question: "Werkt de Afstand Tussen Punten ook met negatieve getallen?",
      answer: "Ja, de calculator werkt met zowel positieve als negatieve getallen. Voer gewoon het minteken in voor negatieve waarden en de tool berekent correct.",
    },
    {
      question: "Wat moet ik doen als ik een foutmelding krijg?",
      answer: "Controleer of je geldige getallen hebt ingevoerd. Zorg dat je geen letters of speciale tekens gebruikt in de getalvelden.",
    }
  ],
}
);
