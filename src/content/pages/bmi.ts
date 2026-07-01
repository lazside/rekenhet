import { registerPages } from "../types";

registerPages({
  slug: "bmi",
  seo: {
    title: "BMI Calculator — Bereken Je Body Mass Index | Rekenhet.nl",
    description: "Gratis BMI calculator. Voer je lengte en gewicht in en ontdek direct je BMI.",
    h1: "BMI Calculator — Direct inzicht in je gezondheid",
    intro: "Een gezonde leefstijl begint met inzicht. Deze BMI Calculator geeft je direct duidelijkheid. Bereken je Body Mass Index op basis van je lengte en gewicht. Het is een handig hulpmiddel om je gezondheid te monitoren en doelen te stellen. Gebruik de resultaten als richtlijn en raadpleeg bij twijfel een arts of specialist.",
    conclusion: "Deze calculator geeft een indicatie op basis van wetenschappelijke formules en gemiddelden. Het is geen medisch advies en vervangt geen consult bij een arts, diëtist of specialist. Gebruik de inzichten als leidraad voor een gezonde leefstijl en raadpleeg bij vragen altijd een deskundige.",
    keywords: ["bmi calculator","bmi berekenen","body mass index","gezond gewicht","ideal gewicht","bmi calculator 2026"],
  },
  calculator: {
    componentSlug: "bmi-calculator",
    categorySlug: "gezondheid",
  },
  categoryLabel: "Gezondheid",
    faqs: [
    {
      question: "Hoe nauwkeurig is de BMI Calculator?",
      answer: "Bereken je Body Mass Index op basis van je lengte en gewicht. Ontdek direct of je een gezond gewicht hebt en ontvang persoonlijk advies. De calculator geeft een betrouwbare indicatie op basis van wetenschappelijke formules en standaardwaarden.",
    },
    {
      question: "Is de BMI Calculator een vervanging voor medisch advies?",
      answer: "Nee, deze calculator is bedoeld als informatief hulpmiddel en vervangt geen medisch consult. Raadpleeg altijd een arts of specialist voor persoonlijk gezondheidsadvies.",
    },
    {
      question: "Welke formule gebruikt de BMI Calculator?",
      answer: "De calculator gebruikt algemeen geaccepteerde wetenschappelijke formules en standaardwaarden. De exacte formule wordt bij de resultaten getoond.",
    },
    {
      question: "Voor welke leeftijden is de BMI Calculator geschikt?",
      answer: "De calculator is geschikt voor volwassenen. Voor kinderen en jongeren tot 18 jaar kunnen afwijkende waarden en formules gelden.",
    }
  ],
}
);
