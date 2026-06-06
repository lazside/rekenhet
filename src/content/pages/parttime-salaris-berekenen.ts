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
      question: "Hoeveel verdien ik netto bij 32 uur werken?",
      answer:
        "Bij 32 uur (80% van een fulltime dienstverband van 40 uur) ontvang je 80% van het fulltime salaris. Bij een fulltime salaris van €50.000 bruto is dat €40.000 bruto per jaar. Het nettobedrag hangt af van heffingskortingen en je persoonlijke situatie. Gebruik de calculator voor een exacte berekening.",
    },
    {
      question: "Hoe bereken ik mijn parttime percentage?",
      answer:
        "Je parttime percentage bereken je door je contracturen te delen door de fulltime uren en te vermenigvuldigen met 100. Bij 24 uur werken in een 40-urige werkweek is dat (24/40) × 100 = 60%. Dit percentage vermenigvuldig je met je fulltime salaris voor je bruto parttime salaris.",
    },
    {
      question: "Blijven heffingskortingen gelijk bij parttime werken?",
      answer:
        "Heffingskortingen zoals de algemene heffingskorting en arbeidskorting zijn inkomensafhankelijk. Bij een lager parttime inkomen kan de arbeidskorting lager uitvallen, maar de algemene heffingskorting kan juist hoger zijn omdat je in een lagere schijf valt. De calculator houdt hier rekening mee.",
    },
  ],
});
