import { registerPages } from "../types";

registerPages({
  slug: "ggd-berekenen",
  seo: {
    title: "GGD Berekenen — Grootste Gemene Deler | Rekenhet.nl",
    description: "Bereken de grootste gemene deler (GGD) van twee getallen. Essentieel voor breuken vereenvoudigen.",
    h1: "GGD Berekenen — Vind de Grootste Gemene Deler",
    intro: "De grootste gemene deler (GGD) is het grootste getal dat twee getallen beide kan delen zonder rest. Dit is essentieel voor het vereenvoudigen van breuken en vele andere wiskundige toepassingen.",
    conclusion: "De GGD is een fundamenteel concept in de getaltheorie en wordt dagelijks gebruikt bij het vereenvoudigen van breuken, het oplossen van verhoudingen en in de cryptografie. Met deze calculator vind je hem direct.",
    keywords: ["ggd","grootste gemene deler","ggd berekenen","deler","wiskunde"],
  },
  calculator: {
    componentSlug: "ggd-berekenen",
    categorySlug: "wiskunde",
  },
  categoryLabel: "Wiskunde",
    faqs: [
    {
      question: "Hoe gebruik ik de GGD Berekenen?",
      answer: "Voer eenvoudig de gevraagde waarden in en de calculator geeft direct het resultaat. Bij ggd berekenen is het belangrijk dat je de juiste eenheden gebruikt voor een nauwkeurige uitkomst.",
    },
    {
      question: "Is de GGD Berekenen geschikt voor middelbare school wiskunde?",
      answer: "Ja, deze calculator is ideaal voor middelbare scholieren. Het helpt bij het controleren van huiswerk en het begrijpen van wiskundige concepten.",
    },
    {
      question: "Werkt de GGD Berekenen ook met negatieve getallen?",
      answer: "Ja, de calculator werkt met zowel positieve als negatieve getallen. Voer gewoon het minteken in voor negatieve waarden en de tool berekent correct.",
    },
    {
      question: "Wat moet ik doen als ik een foutmelding krijg?",
      answer: "Controleer of je geldige getallen hebt ingevoerd. Zorg dat je geen letters of speciale tekens gebruikt in de getalvelden.",
    }
  ],
}
);
