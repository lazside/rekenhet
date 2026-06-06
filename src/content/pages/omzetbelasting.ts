import { registerPages } from "../types";

registerPages({
  slug: "omzetbelasting",
  seo: {
    title: "Omzetbelasting (BTW) Berekenen — Af te Dragen BTW | Rekenhet.nl",
    description:
      "Bereken eenvoudig je af te dragen BTW op basis van omzet, tarief en voorbelasting. Met 21%, 9% en 0% tarieven. Direct inzicht voor je BTW-aangifte.",
    h1: "Omzetbelasting Berekenen — BTW berekenen voor ondernemers",
    intro:
      "Als ondernemer in Nederland moet je BTW (omzetbelasting) berekenen over je facturen en dit bedrag periodiek afdragen aan de Belastingdienst. Met deze calculator bereken je eenvoudig hoeveel BTW je moet afdragen op basis van je omzet exclusief BTW, het toepasselijke BTW-tarief en de voorbelasting die je kunt terugvorderen. De calculator geeft direct inzicht in het bedrag dat je moet betalen of terugkrijgt.",
    conclusion:
      "Het correct berekenen en afdragen van omzetbelasting is een belangrijke verplichting voor elke ondernemer. Door je voorbelasting goed bij te houden kun je de BTW-druk verlagen. Veel ondernemers dienen elk kwartaal hun BTW-aangifte in. Bij twijfel over de juiste toepassing van BTW-tarieven of bijzondere regelingen kun je het beste contact opnemen met een boekhouder of de Belastingdienst.",
    keywords: [
      "omzetbelasting berekenen",
      "BTW berekenen",
      "af te dragen BTW",
      "btw aangifte",
      "voorbelasting",
      "btw tarief 21 procent",
      "btw factuur",
    ],
  },
  calculator: {
    componentSlug: "omzetbelasting",
    categorySlug: "ondernemen",
  },
  categoryLabel: "Ondernemen",
  faqs: [
    {
      question: "Wat is het verschil tussen BTW en omzetbelasting?",
      answer:
        "Omzetbelasting is de officiële naam van de belasting die je betaalt over geleverde goederen en diensten. BTW (Belasting over de Toegevoegde Waarde) is dezelfde belasting; de termen worden door elkaar gebruikt. In Nederland hanteren we drie BTW-tarieven: 21% (algemeen tarief voor de meeste goederen en diensten), 9% (verlaagd tarief voor bijvoorbeeld levensmiddelen, boeken en medicijnen), en 0% voor bijvoorbeeld export.",
    },
    {
      question: "Wat is voorbelasting?",
      answer:
        "Voorbelasting is de BTW die jij betaalt op inkopen en kosten voor je onderneming. Denk aan BTW op ingekochte goederen, kantoorbenodigdheden, verbouwingen of diensten van derden. Deze voorbelasting mag je aftrekken van de BTW die je aan je klanten hebt berekend. Het verschil draag je af aan de Belastingdienst. Als de voorbelasting hoger is dan de BTW op je verkopen, krijg je het verschil terug.",
    },
    {
      "question": "Hoe vaak doe ik BTW-aangifte?",
      "answer": "De meeste ondernemers doen elk kwartaal BTW-aangifte. Je kunt ook kiezen voor maandaangifte (bij hoge BTW-bedragen) of jaaraangifte (als je gebruikmaakt van de kleineondernemersregeling). De Belastingdienst stelt het tijdvak vast op basis van je omzet en aangiftegeschiedenis. De aangifte moet uiterlijk een maand na afloop van het tijdvak zijn ingediend."
    },
    {
      question: "Wat gebeurt er als ik te weinig BTW afdraag?",
      answer:
        "Als je te weinig BTW afdraagt, kan de Belastingdienst een naheffing opleggen. Daarnaast kun je een boete krijgen en moet je belastingrente betalen over het te laat betaalde bedrag. Het is daarom belangrijk om je BTW-aangifte zorgvuldig en op tijd in te dienen. Gebruik deze calculator als hulpmiddel, maar controleer altijd de definitieve bedragen in je boekhouding.",
    },
    {
      question: "Moet ik BTW rekenen over facturen naar het buitenland?",
      answer:
        "Bij facturen naar het buitenland gelden speciale regels. Voor facturen naar particulieren in andere EU-landen geldt vaak het BTW-tarief van jouw land. Voor zakelijke klanten in andere EU-landen is de BTW meestal 0% (verlegd naar de afnemer, ICP-aangifte). Voor facturen buiten de EU geldt meestal 0% BTW (export). Dit is een complex onderwerp; raadpleeg een fiscaal adviseur voor de juiste toepassing.",
    },
  ],
});
