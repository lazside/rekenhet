import { registerPages } from "../types";

registerPages({
  slug: "machtsverheffen",
  seo: {
    title: "Machtsverheffen — Macht Berekenen | Rekenhet.nl",
    description: "Bereken een grondtal tot een bepaalde macht. Bijvoorbeeld 2³ = 8. Snel en nauwkeurig.",
    h1: "Machtsverheffen — Bereken een Getal tot de Macht",
    intro: "Met deze calculator verhef je eenvoudig een grondtal tot een macht. Vul het grondtal en de exponent in en je ziet direct het resultaat. Perfect voor wiskundige berekeningen, wetenschappelijk werk of dagelijks gebruik.",
    conclusion: "Machtsverheffen is een van de basisbewerkingen in de wiskunde. Het wordt veel gebruikt in algebra, natuurkunde, renteberekeningen en groeimodellen. Met deze calculator heb je altijd het juiste antwoord bij de hand.",
    keywords: ["machtsverheffen","macht berekenen","exponent","grondtal","rekenen"],
  },
  calculator: {
    componentSlug: "machtsverheffen",
    categorySlug: "wiskunde",
  },
  categoryLabel: "Wiskunde",
    faqs: [
    {
      question: "Hoe gebruik ik de Machtsverheffen?",
      answer: "Voer eenvoudig de gevraagde waarden in en de calculator geeft direct het resultaat. Bij machtsverheffen is het belangrijk dat je de juiste eenheden gebruikt voor een nauwkeurige uitkomst.",
    },
    {
      question: "Is de Machtsverheffen geschikt voor middelbare school wiskunde?",
      answer: "Ja, deze calculator is ideaal voor middelbare scholieren. Het helpt bij het controleren van huiswerk en het begrijpen van wiskundige concepten.",
    },
    {
      question: "Werkt de Machtsverheffen ook met negatieve getallen?",
      answer: "Ja, de calculator werkt met zowel positieve als negatieve getallen. Voer gewoon het minteken in voor negatieve waarden en de tool berekent correct.",
    },
    {
      question: "Wat moet ik doen als ik een foutmelding krijg?",
      answer: "Controleer of je geldige getallen hebt ingevoerd. Zorg dat je geen letters of speciale tekens gebruikt in de getalvelden.",
    }
  ],
}
);
