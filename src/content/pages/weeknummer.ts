import { registerPages } from "../types";

registerPages({
  slug: "weeknummer",
  seo: {
    title: "Weeknummer Berekenen — Welke Week is Het? | Rekenhet.nl",
    description: "Bereken het weeknummer van elke datum. Ontdek in welke ISO-week een datum valt. Direct resultaat.",
    h1: "Weeknummer Berekenen — In Welke Week Val je Datum?",
    intro: "Met deze weeknummer calculator ontdek je eenvoudig het ISO-weeknummer van elke datum. Perfect voor planning op het werk, projectmanagement, schoolroosters of gewoon om bij te houden in welke week we zitten.",
    conclusion: "Weeknummers worden veel gebruikt in bedrijfsplanning, onderwijs, productie en projectmanagement. Met deze calculator vind je snel het weeknummer van elke datum, zodat je altijd weet in welke week je zit.",
    keywords: ["weeknummer", "welke week", "iso week", "weeknummer berekenen", "week"],
  },
  calculator: {
    componentSlug: "weeknummer",
    categorySlug: "algemeen",
  },
  categoryLabel: "Algemeen",
    faqs: [
    {
      question: "Hoe werkt de Weeknummer?",
      answer: "Bereken het weeknummer van een datum Voer simpelweg de gevraagde gegevens in en het resultaat verschijnt direct op je scherm.",
    },
    {
      question: "Is de Weeknummer gratis te gebruiken?",
      answer: "Ja, deze calculator is volledig gratis te gebruiken. Geen registratie, geen verborgen kosten en onbeperkt gebruik.",
    },
    {
      question: "Kan ik de Weeknummer ook op mijn telefoon gebruiken?",
      answer: "Ja, de calculator werkt op elk apparaat: desktop, tablet en mobiel. De tool past zich automatisch aan je schermformaat aan.",
    },
    {
      question: "Houdt de Weeknummer rekening met schrikkeljaren?",
      answer: "Ja, waar relevant houden al onze datum- en tijdcalculators automatisch rekening met schrikkeljaren en de wisselende lengtes van maanden.",
    }
  ],
}
);
