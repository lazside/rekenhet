import { registerPages } from "../types";

registerPages({
  slug: "kgv-berekenen",
  seo: {
    title: "KGV Berekenen — Kleinste Gemene Veelvoud | Rekenhet.nl",
    description: "Bereken het kleinste gemene veelvoud (KGV) van twee getallen. Perfect voor breuken gelijknamig maken.",
    h1: "KGV Berekenen — Vind het Kleinste Gemene Veelvoud",
    intro: "Het kleinste gemene veelvoud (KGV) is het kleinste getal dat deelbaar is door beide getallen. Dit is essentieel bij het gelijknamig maken van breuken, het oplossen van verhoudingen en vele andere wiskundige toepassingen.",
    conclusion: "Het KGV wordt veel gebruikt in de wiskunde, vooral bij het optellen en aftrekken van breuken met verschillende noemers. Het is ook handig bij het plannen van terugkerende gebeurtenissen en het vinden van gemeenschappelijke periodes.",
    keywords: ["kgv","kleinste gemene veelvoud","kgv berekenen","veelvoud","wiskunde"],
  },
  calculator: {
    componentSlug: "kgv-berekenen",
    categorySlug: "wiskunde",
  },
  categoryLabel: "Wiskunde",
    faqs: [
    {
      question: "Hoe gebruik ik de KGV Berekenen?",
      answer: "Voer eenvoudig de gevraagde waarden in en de calculator geeft direct het resultaat. Bij kgv berekenen is het belangrijk dat je de juiste eenheden gebruikt voor een nauwkeurige uitkomst.",
    },
    {
      question: "Is de KGV Berekenen geschikt voor middelbare school wiskunde?",
      answer: "Ja, deze calculator is ideaal voor middelbare scholieren. Het helpt bij het controleren van huiswerk en het begrijpen van wiskundige concepten.",
    },
    {
      question: "Werkt de KGV Berekenen ook met negatieve getallen?",
      answer: "Ja, de calculator werkt met zowel positieve als negatieve getallen. Voer gewoon het minteken in voor negatieve waarden en de tool berekent correct.",
    },
    {
      question: "Wat moet ik doen als ik een foutmelding krijg?",
      answer: "Controleer of je geldige getallen hebt ingevoerd. Zorg dat je geen letters of speciale tekens gebruikt in de getalvelden.",
    }
  ],
}
);
