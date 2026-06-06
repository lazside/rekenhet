import { registerPages } from "../types";

registerPages({
  slug: "inflatie-calculator",
  seo: {
    title: "Inflatie Calculator — Koopkrachtverlies & Gecorrigeerd Bedrag | Rekenhet.nl",
    description:
      "Bereken de waarde van een bedrag gecorrigeerd voor inflatie. Ontdek het koopkrachtverlies door prijsstijgingen door de jaren heen.",
    h1: "Inflatie Calculator — Bereken de waarde van geld door de jaren heen",
    intro:
      "Inflatie zorgt ervoor dat je geld minder waard wordt na verloop van tijd. €10.000 in 2020 is in 2026 minder waard door prijsstijgingen. Met deze inflatiecalculator kun je een bedrag uit het verleden corrigeren voor inflatie, of juist berekenen wat een toekomstig bedrag nu waard zou zijn. Je ziet direct het gecorrigeerde bedrag, het koopkrachtverlies en de inflatiefactor.",
    conclusion:
      "Inflatie heeft een grote invloed op je koopkracht. Met een gemiddelde inflatie van 3% is €10.000 na 6 jaar nog maar ongeveer €8.370 waard in koopkracht — een verlies van €1.627. Het is belangrijk om rekening te houden met inflatie bij langetermijnbesparingen, pensioenopbouw en investeringen. Een goede belegging of spaarvorm moet minimaal de inflatie verslaan om je vermogen op peil te houden.",
    keywords: [
      "inflatie calculator",
      "koopkrachtverlies berekenen",
      "inflatie corrigeren",
      "waarde geld door de tijd",
      "inflatie berekenen",
      "prijsstijging berekenen",
      "koopkracht berekenen",
    ],
  },
  calculator: {
    componentSlug: "inflatie-calculator",
    categorySlug: "geld-en-verzekeringen",
  },
  categoryLabel: "Geld & Verzekeringen",
  faqs: [
    {
      question: "Wat is inflatie en waarom is het belangrijk?",
      answer:
        "Inflatie is de mate waarin prijzen van goederen en diensten stijgen. Een inflatie van 3% betekent dat wat je vorig jaar voor €100 kocht, dit jaar €103 kost. Hierdoor wordt je geld minder waard naarmate de tijd verstrijkt. Daarom is het belangrijk om rekening te houden met inflatie bij sparen, beleggen en pensioenplanning. De Europese Centrale Bank streeft naar een inflatie van ongeveer 2%.",
    },
    {
      question: "Wat is de gemiddelde inflatie in Nederland?",
      answer:
        "De gemiddelde inflatie in Nederland schommelt. Historisch lag deze rond de 2-3% per jaar, maar in 2022-2023 was er een uitzonderlijk hoge inflatie van 10-12% door energieprijzen en grondstoffenschaarste. Over de afgelopen 20 jaar (2004-2024) ligt het gemiddelde rond de 2,5%. Voor lange termijn berekeningen kun je rekenen met een inflatie van 2-3%.",
    },
    {
      question: "Hoe bereken ik de gecorrigeerde waarde van een bedrag?",
      answer:
        "De gecorrigeerde waarde wordt berekend met de formule: bedrag × (1 + inflatiepercentage/100)^(aantal jaren). Een voorbeeld: €10.000 met 3% inflatie over 6 jaar wordt €10.000 × 1,03^6 = €11.940. Dit betekent dat je €11.940 nodig hebt in 2026 om dezelfde koopkracht te hebben als €10.000 in 2020.",
    },
    {
      question: "Wat is het verschil tussen nominale en reële waarde?",
      answer:
        "De nominale waarde is het bedrag zoals het op het briefje staat, zonder correctie voor inflatie. De reële waarde is het bedrag gecorrigeerd voor inflatie — het weerspiegelt de werkelijke koopkracht. €10.000 nominaal in 2026 is misschien maar €8.500 reëel waard in koopkracht van 2020. Deze calculator toont het gecorrigeerde bedrag (de nominale waarde die nodig is om dezelfde reële waarde te behouden).",
    },
    {
      question: "Hoe bescherm ik mijn spaargeld tegen inflatie?",
      answer:
        "Om je spaargeld te beschermen tegen inflatie kun je verschillende dingen doen: (1) Beleg in aandelen of indexfondsen, die historisch gezien een hoger rendement bieden dan inflatie. (2) Overweeg obligaties of inflatiegerelateerde producten. (3) Spaar op een spaarrekening met een rente die hoger is dan de inflatie. (4) Investeer in tastbare activa zoals vastgoed. Houd er wel rekening mee dat beleggen risico's met zich meebrengt.",
    },
  ],
});
