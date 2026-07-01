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
  sources: [
    { name: "Wereldgezondheidsorganisatie (WHO) — BMI classificatie", url: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
    { name: "RIVM — Overgewicht en obesitas", url: "https://www.rivm.nl/overgewicht-en-obesitas", context: "Cijfers en richtlijnen" },
    { name: "Voedingscentrum — Gezond gewicht", url: "https://www.voedingscentrum.nl/encyclopedie/bmi.aspx" },
  ],
    faqs: [
    {
      question: "Hoe nauwkeurig is de BMI Calculator?",
      answer: "De BMI Calculator gebruikt de officiële WHO-formule: BMI = gewicht (kg) / (lengte in meters)². De calculator geeft een betrouwbare indicatie van je gewichtsstatus, maar houdt geen rekening met spiermassa, botdichtheid of vetverdeling. Voor een compleet beeld raden we aan ook je tailleomtrek en lichaamsvetpercentage te meten. Sporters met veel spiermassa kunnen een verhoogde BMI hebben zonder dat er sprake is van overgewicht.",
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
      answer: "De calculator is geschikt voor volwassenen van 18 jaar en ouder. Voor kinderen en jongeren tot 18 jaar gelden afwijkende BMI-grenzen omdat zij nog in de groei zijn. Voor kinderen wordt gebruikgemaakt van speciale groeicurven (TNO/RIVM) die rekening houden met leeftijd en geslacht. Ook voor senioren (70+) wordt de BMI anderson geïnterpreteerd: een lichte verhoging is vaak acceptabel.",
    }
  ],
}
);
