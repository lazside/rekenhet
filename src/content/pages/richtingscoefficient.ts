import { registerPages } from "../types";

registerPages({
  slug: "richtingscoefficient",
  seo: {
    title: "Richtingscoëfficiënt Berekenen — Helling van een Lijn | Rekenhet.nl",
    description: "Bereken de richtingscoëfficiënt (RC) en het intercept van een lijn door twee punten. Snel en nauwkeurig.",
    h1: "Richtingscoëfficiënt Berekenen — RC & Intercept van een Lijn",
    intro: "Met deze calculator bereken je de richtingscoëfficiënt (helling) en het intercept van een rechte lijn door twee gegeven punten. Voer de coördinaten van twee punten in en krijg direct de formule y = ax + b van de lijn.",
    conclusion: "De richtingscoëfficiënt vertelt je hoe steil een lijn is. Een positieve RC betekent een stijgende lijn, negatief een dalende. Dit is fundamenteel voor lineaire functies, differentiaalrekening en vele toepassingen in de praktijk.",
    keywords: ["richtingscoefficient", "rc berekenen", "helling lijn", "lineaire functie", "intercept"],
  },
  calculator: {
    componentSlug: "richtingscoefficient",
    categorySlug: "wiskunde",
  },
  categoryLabel: "Wiskunde",
    faqs: [
    {
      question: "Hoe gebruik ik de Richtingscoëfficiënt?",
      answer: "Voer eenvoudig de gevraagde waarden in en de calculator geeft direct het resultaat. Bij richtingscoëfficiënt is het belangrijk dat je de juiste eenheden gebruikt voor een nauwkeurige uitkomst.",
    },
    {
      question: "Is de Richtingscoëfficiënt geschikt voor middelbare school wiskunde?",
      answer: "Ja, deze calculator is ideaal voor middelbare scholieren. Het helpt bij het controleren van huiswerk en het begrijpen van wiskundige concepten.",
    },
    {
      question: "Werkt de Richtingscoëfficiënt ook met negatieve getallen?",
      answer: "Ja, de calculator werkt met zowel positieve als negatieve getallen. Voer gewoon het minteken in voor negatieve waarden en de tool berekent correct.",
    },
    {
      question: "Wat moet ik doen als ik een foutmelding krijg?",
      answer: "Controleer of je geldige getallen hebt ingevoerd. Zorg dat je geen letters of speciale tekens gebruikt in de getalvelden.",
    }
  ],
}
);
