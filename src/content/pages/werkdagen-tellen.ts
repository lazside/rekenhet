import { registerPages } from "../types";

registerPages({
  slug: "werkdagen-tellen",
  seo: {
    title: "Werkdagen Tellen — Aantal Werkdagen Berekenen | Rekenhet.nl",
    description: "Tel het aantal werkdagen (maandag tot en met vrijdag) tussen twee datums. Handig voor projectplanning en verlof.",
    h1: "Werkdagen Tellen — Hoeveel Werkdagen Tussen Twee Data?",
    intro: "Met deze werkdagen teller bereken je eenvoudig het exacte aantal werkdagen (maandag tot en met vrijdag) tussen twee datums. Perfect voor het plannen van projecten, het berekenen van levertijden of het bepalen van je vakantiedagen.",
    conclusion: "Het aantal werkdagen tussen twee data is essentieel voor realistische projectplanning, offertes en levertijden. Door weekenden automatisch uit te filteren, geeft deze calculator je een nauwkeurig beeld van de beschikbare werkdagen.",
    keywords: ["werkdagen tellen", "werkbare dagen", "werkdagen berekenen", "maandag tot vrijdag", "projectplanning"],
  },
  calculator: {
    componentSlug: "werkdagen-tellen",
    categorySlug: "algemeen",
  },
  categoryLabel: "Algemeen",
    faqs: [
    {
      question: "Hoe werkt de Werkdagen Tellen?",
      answer: "Tel het aantal werkdagen tussen twee datums Voer simpelweg de gevraagde gegevens in en het resultaat verschijnt direct op je scherm.",
    },
    {
      question: "Is de Werkdagen Tellen gratis te gebruiken?",
      answer: "Ja, deze calculator is volledig gratis te gebruiken. Geen registratie, geen verborgen kosten en onbeperkt gebruik.",
    },
    {
      question: "Kan ik de Werkdagen Tellen ook op mijn telefoon gebruiken?",
      answer: "Ja, de calculator werkt op elk apparaat: desktop, tablet en mobiel. De tool past zich automatisch aan je schermformaat aan.",
    },
    {
      question: "Houdt de Werkdagen Tellen rekening met schrikkeljaren?",
      answer: "Ja, waar relevant houden al onze datum- en tijdcalculators automatisch rekening met schrikkeljaren en de wisselende lengtes van maanden.",
    }
  ],
}
);
