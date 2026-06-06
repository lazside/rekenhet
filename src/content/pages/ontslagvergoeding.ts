import { registerPages } from "../types";

registerPages({
  slug: "ontslagvergoeding",
  seo: {
    title: "Ontslagvergoeding Berekenen — Transitievergoeding 2026 | Rekenhet.nl",
    description:
      "Bereken je ontslagvergoeding op basis van salaris, dienstjaren en leeftijd. Transitievergoeding en billijke vergoeding. Direct inzicht.",
    h1: "Ontslagvergoeding Berekenen — Transitievergoeding bij ontslag",
    intro:
      "Bij ontslag heb je als werknemer mogelijk recht op een transitievergoeding. Deze vergoeding bedraagt ⅓ maandsalaris per dienstjaar en is bedoeld om de overgang naar een nieuwe baan te vergemakkelijken. Daarnaast kan er onder bepaalde omstandigheden een billijke vergoeding worden toegekend. Met deze calculator krijg je snel inzicht in de hoogte van je ontslagvergoeding.",
    conclusion:
      "De hoogte van je ontslagvergoeding hangt af van je maandsalaris, het aantal dienstjaren en je leeftijd. Sinds 2020 is de transitievergoeding voor alle werknemers gelijk (geen leeftijdsdifferentiatie meer), maar oudere werknemers kunnen nog steeds een hogere billijke vergoeding krijgen. Bij ontslag is het verstandig om juridisch advies in te winnen, zeker als je denkt recht te hebben op een billijke vergoeding.",
    keywords: [
      "ontslagvergoeding berekenen",
      "transitievergoeding 2026",
      "billijke vergoeding",
      "ontslagvergoeding bij ontslag",
      "hoeveel ontslagvergoeding",
      "transitievergoeding berekenen",
    ],
  },
  calculator: {
    componentSlug: "ontslagvergoeding",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
  faqs: [
    {
      question: "Hoe wordt de transitievergoeding berekend?",
      answer:
        "De transitievergoeding is ⅓ (0,33) maandsalaris per dienstjaar. Voor een werknemer met een salaris van €4.000 per maand en 10 dienstjaren is de transitievergoeding: 10 × (€4.000 × 0,33) = €13.200. De vergoeding is gemaximeerd op €94.000 (2026) of maximaal een jaarsalaris, afhankelijk van wat lager is.",
    },
    {
      question: "Heb ik recht op een transitievergoeding bij ontslag?",
      answer:
        "Je hebt recht op een transitievergoeding als je werkgever het initiatief neemt tot ontslag (ontslag door werkgever, niet vanwege ernstig verwijtbaar handelen aan jouw kant). Ook bij niet-verlenging van een tijdelijk contract heb je recht op een transitievergoeding. Bij ontslag wegens bedrijfseconomische redenen of langdurige arbeidsongeschiktheid heb je ook recht op de vergoeding.",
    },
    {
      question: "Wat is het verschil tussen transitievergoeding en billijke vergoeding?",
      answer:
        "De transitievergoeding is een wettelijke standaardvergoeding waar iedere werknemer recht op heeft bij ontslag (behalve bij verwijtbaar handelen). De billijke vergoeding is een extra vergoeding die de rechter kan toekennen als de werkgever ernstig verwijtbaar heeft gehandeld, bijvoorbeeld bij discriminatie of een plotseling ontslag zonder reden. De billijke vergoeding is niet gemaximeerd.",
    },
    {
      question: "Hoeveel dienstjaren tellen mee voor de transitievergoeding?",
      answer:
        "Alle dienstjaren tellen mee vanaf de eerste werkdag bij de werkgever. Tot 2020 gold er nog een differentiatie naar leeftijd (voor 50+ gold een hogere opbouw), maar sinds 2020 is dat afgeschaft. Elk dienstjaar telt gelijk: ⅓ maandsalaris per gewerkt jaar. De dienstjaren worden naar rato berekend als je geen volledig jaar hebt gewerkt.",
    },
    {
      question: "Wordt er belasting geheven over de transitievergoeding?",
      answer:
        "Ja, de transitievergoeding wordt belast als loon uit vroegere dienstbetrekking. Het valt in de bijzondere beloningen en wordt belast tegen het bijzondere tarief, dat kan oplopen tot zo'n 49,5% (afhankelijk van je totale jaarinkomen). Je werkgever houdt hier loonbelasting op in. Houd er dus rekening mee dat je netto minder overhoudt dan het bruto berekende bedrag.",
    },
  ],
});
