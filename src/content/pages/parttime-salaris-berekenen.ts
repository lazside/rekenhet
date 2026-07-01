import { registerPages } from "../types";

registerPages({
  slug: "parttime-salaris-berekenen",
  seo: {
    title: "Parttime Salaris Berekenen — Percentage & Netto | Rekenhet.nl",
    description:
      "Bereken je parttime salaris op basis van je fulltime salaris en contracturen. Ontdek wat je netto verdient bij 24, 28 of 32 uur per week.",
    h1: "Parttime Salaris Berekenen — Wat verdien je bij minder uren?",
    intro:
      "Overweeg je minder dagen te gaan werken of ben je benieuwd wat je netto overhoudt bij een parttime contract? Met deze calculator bereken je eenvoudig je parttime salaris. Voer je fulltime salaris en het aantal contracturen in en ontdek direct je bruto en netto parttime inkomen.",
    conclusion:
      "Parttime werken betekent niet alleen minder inkomen, maar vaak ook een lagere belastingdruk door heffingskortingen. Of je nu 24, 28 of 32 uur gaat werken — met deze calculator krijg je inzicht in je financiële situatie. Houd ook rekening met zaken als pensioenopbouw en eventuele toeslagen die kunnen veranderen.",
    keywords: [
      "parttime salaris berekenen",
      "salaris 32 uur",
      "salaris 24 uur",
      "parttime percentage",
      "netto parttime inkomen",
    ],
  },
  calculator: {
    componentSlug: "bruto-netto-salaris-calculator",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
    faqs: [
    {
      question: "Hoe berekent de Calculator mijn netto inkomen?",
      answer: "Bereken je parttime salaris op basis van je fulltime salaris en contracturen. Ontdek wat je netto verdient bij 24, 28 of 32 uur per week. De calculator houdt rekening met belastingschijven, heffingskortingen en premies volksverzekeringen voor 2026.",
    },
    {
      question: "Klopt de Calculator met de actuele belastingregels?",
      answer: "Ja, de calculator werkt met de meest recente belastingtarieven en -regels voor 2026. We updaten de tool jaarlijks.",
    },
    {
      question: "Houdt de calculator rekening met heffingskortingen?",
      answer: "Ja, waar relevant worden de algemene heffingskorting en arbeidskorting meegenomen in de berekening, tenzij anders aangegeven.",
    },
    {
      question: "Kan ik de calculator ook gebruiken voor parttime berekeningen?",
      answer: "Ja, de calculator werkt voor zowel fulltime als parttime dienstverbanden. Voer je contracturen in voor een nauwkeurige berekening.",
    }
  ],
}
);
