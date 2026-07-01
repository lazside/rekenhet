import { registerPages } from "../types";

registerPages({
  slug: "cirkel-berekenen",
  seo: {
    title: "Cirkel Omtrek & Oppervlakte Berekenen | Rekenhet.nl",
    description: "Bereken de omtrek en oppervlakte van een cirkel op basis van de straal. Met π (pi) voor exacte resultaten.",
    h1: "Cirkelberekeningen — Omtrek & Oppervlakte",
    intro: "Met deze calculator bereken je eenvoudig de omtrek en oppervlakte van een cirkel. Voer de straal in en krijg direct de omtrek (2πr) en oppervlakte (πr²). Gebruik de exacte waarde van π voor nauwkeurige resultaten.",
    conclusion: "Cirkelberekeningen zijn essentieel in de meetkunde, bouwkunde, techniek en het dagelijks leven. Van het berekenen van de lengte van een hek rond een ronde vijver tot de oppervlakte van een pizzapunt, de formule voor de cirkel is onmisbaar.",
    keywords: ["cirkel", "omtrek", "oppervlakte", "straal", "pi"],
  },
  calculator: {
    componentSlug: "cirkel-berekenen",
    categorySlug: "wiskunde",
  },
  categoryLabel: "Wiskunde",
    faqs: [
    {
      question: "Hoe gebruik ik de Cirkelberekeningen?",
      answer: "Voer eenvoudig de gevraagde waarden in en de calculator geeft direct het resultaat. Bij cirkelberekeningen is het belangrijk dat je de juiste eenheden gebruikt voor een nauwkeurige uitkomst.",
    },
    {
      question: "Is de Cirkelberekeningen geschikt voor middelbare school wiskunde?",
      answer: "Ja, deze calculator is ideaal voor middelbare scholieren. Het helpt bij het controleren van huiswerk en het begrijpen van wiskundige concepten.",
    },
    {
      question: "Werkt de Cirkelberekeningen ook met negatieve getallen?",
      answer: "Ja, de calculator werkt met zowel positieve als negatieve getallen. Voer gewoon het minteken in voor negatieve waarden en de tool berekent correct.",
    },
    {
      question: "Wat moet ik doen als ik een foutmelding krijg?",
      answer: "Controleer of je geldige getallen hebt ingevoerd. Zorg dat je geen letters of speciale tekens gebruikt in de getalvelden.",
    }
  ],
}
);
