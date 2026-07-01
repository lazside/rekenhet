import { registerPages } from "../types";

registerPages({
  slug: "btw-incl-excl",
  seo: {
    title: "BTW Inclusief of Exclusief Berekenen | Rekenhet.nl",
    description: "Gratis BTW calculator. Bereken bedragen inclusief of exclusief BTW met tarieven 21%, 9% en 0%.",
    h1: "BTW Inclusief/Exclusief — Bereken het eenvoudig en snel",
    intro: "Als ondernemer wil je grip op je cijfers. Deze BTW Inclusief/Exclusief helpt je snel en eenvoudig. Bereken snel het BTW-bedrag en totaal inclusief of exclusief BTW (21%, 9%, 0%). Gebruik de tool om verschillende scenario's door te rekenen en weloverwogen beslissingen te nemen voor je bedrijf.",
    conclusion: "Deze calculator geeft je een helder beeld van je financiële situatie als ondernemer. De daadwerkelijke bedragen kunnen afwijken op basis van je persoonlijke omstandigheden en het geldende belastingtarief. Raadpleeg een fiscalist of boekhouder voor definitief advies op maat.",
    keywords: ["btw inclusief exclusief","btw berekenen","btw bedrag","btw incl excl","btw incl excl 2026"],
  },
  calculator: {
    componentSlug: "btw-incl-excl",
    categorySlug: "ondernemen",
  },
  categoryLabel: "Ondernemen",
  sources: [
    { name: "Belastingdienst — BTW tarieven", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/btw/content/btw-tarieven", context: "21%, 9%, 0%" },
    { name: "Rijksoverheid — BTW", url: "https://www.rijksoverheid.nl/onderwerpen/btw" },
  ],
    faqs: [
    {
      question: "Wat is het verschil tussen inclusief en exclusief BTW?",
      answer: "Bij een bedrag inclusief BTW zit de belasting al in de prijs. Als een product €121 inclusief 21% BTW kost, dan is de prijs exclusief BTW €100 en de BTW €21. Bij exclusief BTW komt de belasting nog bovenop de prijs: een product van €100 exclusief BTW kost €121 inclusief. Dit onderscheid is belangrijk voor facturen: consumentenprijzen zijn altijd inclusief BTW, zakelijke prijzen worden vaak exclusief BTW afgesproken.",
    },
    {
      question: "Hoe bereken ik een bedrag inclusief BTW naar exclusief?",
      answer: "Om een bedrag inclusief BTW om te rekenen naar exclusief, deel je het bedrag door (1 + BTW-tarief). Bij 21% BTW: bedrag ÷ 1,21 = exclusief BTW. Het verschil is de BTW. Bij 9% BTW: bedrag ÷ 1,09. Bijvoorbeeld: €242 inclusief 21% BTW wordt €242 ÷ 1,21 = €200 exclusief BTW, met €42 aan BTW.",
    },
    {
      question: "Zijn de BTW-tarieven in 2026 nog steeds 21% en 9%?",
      answer: "Ja, in 2026 zijn de BTW-tarieven ongewijzigd: 21% algemeen tarief, 9% verlaagd tarief (voor o.a. voedingsmiddelen, boeken, geneesmiddelen, sport) en 0% nultarief (voor o.a. export). Sinds 2024 valt cultuur (musea, theater) onder 21% in plaats van 9%. Onze calculator werkt met de actuele tarieven van de Belastingdienst.",
    },
    {
      question: "Wanneer gebruik ik 21%, 9% of 0% BTW op mijn factuur?",
      answer: "Het algemene tarief van 21% gebruik je voor de meeste goederen en diensten. Het verlaagde tarief van 9% gebruik je voor voedingsmiddelen, water, boeken, tijdschriften, geneesmiddelen, kunst, sport en kappers. Het nultarief (0%) gebruik je bij export naar niet-EU-landen en voor internationale transport. Let op: verkeerd tarief kan leiden tot naheffingen. Gebruik bij twijfel onze BTW calculator of raadpleeg een fiscalist.",
    }
  ],
}
);
