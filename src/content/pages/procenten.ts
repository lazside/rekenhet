import { registerPages } from "../types";

registerPages({
  slug: "procenten",
  seo: {
    title: "Procenten Calculator — Bereken Percentage | Rekenhet.nl",
    description: "Gratis procenten calculator. Bereken eenvoudig percentages en procentuele stijging of daling.",
    h1: "Procenten Calculator — Reken het snel en foutloos uit",
    intro: "Rekenen hoeft niet moeilijk te zijn. Met de Procenten Calculator voer je snel en foutloos berekeningen uit. Bereken eenvoudig procenten: deel van geheel, procentuele toename of afname. Of je nu student, docent of professional bent — deze tool bespaart tijd en geeft je direct het juiste antwoord.",
    conclusion: "Of je nu een formule wilt controleren, een som wilt maken of een rekentool nodig hebt — deze calculator geeft je het juiste antwoord. De tool is ideaal voor thuis, op school of op kantoor en helpt je tijd te besparen bij dagelijkse wiskundige berekeningen.",
    keywords: ["procenten calculator","percentage berekenen","procentuele toename","korting berekenen","procenten calculator 2026"],
  },
  calculator: {
    componentSlug: "procenten-calculator",
    categorySlug: "wiskunde",
  },
  categoryLabel: "Wiskunde",
    faqs: [
    {
      question: "Hoe bereken ik een percentage van een getal?",
      answer: "Om een percentage van een getal te berekenen gebruik je de formule: (percentage ÷ 100) × getal. Bijvoorbeeld: 15% van €200 = (15 ÷ 100) × 200 = €30. Selecteer in de calculator de optie 'Deel van geheel' en voer het percentage en het totaalbedrag in.",
    },
    {
      question: "Hoe bereken ik de procentuele stijging of daling?",
      answer: "De procentuele verandering bereken je met: ((nieuw - oud) ÷ oud) × 100%. Bij een stijging van €100 naar €120: ((120 - 100) ÷ 100) × 100% = 20% stijging. Bij een daling van €100 naar €80: ((80 - 100) ÷ 100) × 100% = -20% (20% daling). Selecteer in de calculator de optie 'Procentuele toename/afname'.",
    },
    {
      question: "Is de Procenten Calculator geschikt voor middelbare school wiskunde?",
      answer: "Ja, deze calculator is ideaal voor middelbare scholieren. Het helpt bij het controleren van huiswerk, het begrijpen van procentuele veranderingen en het oefenen met kortingen, rente en groeifactoren. Docenten kunnen de calculator ook gebruiken om voorbeelden te geven in de klas.",
    },
    {
      question: "Hoeveel is een procentuele toename van 10% per jaar over 5 jaar?",
      answer: "Bij een jaarlijkse toename van 10% gebruik je de formule voor samengestelde groei: eindwaarde = beginwaarde × (1 + 0,10)^5. Voor een startbedrag van €1000 is dit: €1000 × 1,10^5 = €1000 × 1,61 = €1.610. De totale stijging is 61%, niet 50%, door het rente-op-rente effect. Gebruik onze procenten calculator met 'Procentuele toename' of de compound interest calculator voor meerdere jaren.",
    }
  ],
}
);
