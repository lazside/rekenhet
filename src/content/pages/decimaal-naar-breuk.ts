import { registerPages } from "../types";

registerPages({
  slug: "decimaal-naar-breuk",
  seo: {
    title: "Decimaal naar Breuk — Omzetten | Rekenhet.nl",
    description: "Zet een decimaal getal om naar een breuk. Bijvoorbeeld 0,75 wordt 3/4. Direct en nauwkeurig.",
    h1: "Decimaal naar Breuk — Zet Decimale Getallen Om",
    intro: "Met deze calculator zet je decimale getallen (zoals 0,75 of 1,25) eenvoudig om naar breuken. De calculator geeft de breuk in de eenvoudigste vorm, met teller en noemer. Perfect voor wiskunde, koken of technische berekeningen.",
    conclusion: "Het omzetten van decimalen naar breuken is handig in veel situaties. Breuken zijn vaak makkelijker te begrijpen in recepten, bouwtekeningen of wiskundige formules. Deze tool doet het rekenwerk voor je.",
    keywords: ["decimaal naar breuk","breuk","decimaal getal","omzetten","breuken"],
  },
  calculator: {
    componentSlug: "decimaal-naar-breuk",
    categorySlug: "wiskunde",
  },
  categoryLabel: "Wiskunde",
    faqs: [
    {
      question: "Hoe gebruik ik de Decimaal naar Breuk?",
      answer: "Voer eenvoudig de gevraagde waarden in en de calculator geeft direct het resultaat. Bij decimaal naar breuk is het belangrijk dat je de juiste eenheden gebruikt voor een nauwkeurige uitkomst.",
    },
    {
      question: "Is de Decimaal naar Breuk geschikt voor middelbare school wiskunde?",
      answer: "Ja, deze calculator is ideaal voor middelbare scholieren. Het helpt bij het controleren van huiswerk en het begrijpen van wiskundige concepten.",
    },
    {
      question: "Werkt de Decimaal naar Breuk ook met negatieve getallen?",
      answer: "Ja, de calculator werkt met zowel positieve als negatieve getallen. Voer gewoon het minteken in voor negatieve waarden en de tool berekent correct.",
    },
    {
      question: "Wat moet ik doen als ik een foutmelding krijg?",
      answer: "Controleer of je geldige getallen hebt ingevoerd. Zorg dat je geen letters of speciale tekens gebruikt in de getalvelden.",
    }
  ],
}
);
