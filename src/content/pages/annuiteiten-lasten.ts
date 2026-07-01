import { registerPages } from "../types";

registerPages({
  slug: "annuiteiten-lasten",
  seo: {
    title: "Annuïteitenhypotheek Maandlasten Berekenen | Rekenhet.nl",
    description: "Gratis annuïteiten calculator. Bereken maandlasten, totale rente en totale betaling.",
    h1: "Annuïtaire Maandlasten — Bereken het eenvoudig en snel",
    intro: "Of het nu gaat om belasting, spaargeld of verzekeringen — met deze Annuïtaire Maandlasten weet je waar je aan toe bent. Bereken je bruto maandlasten voor een annuïteitenhypotheek. De calculator werkt met de actuele 2026-tarieven en -regels, zodat je altijd een reëel beeld krijgt.",
    conclusion: "Of je nu spaart, belegt, een lening afsluit of belasting betaalt — deze calculator geeft je inzicht in je financiële situatie. Houd er rekening mee dat persoonlijke omstandigheden het definitieve bedrag kunnen beïnvloeden. Voor een officiële berekening raadpleeg je een financieel adviseur.",
    keywords: ["annuïteit berekenen","hypotheek maandlasten","annuïtaire hypotheek","annuiteiten lasten","annuiteiten lasten 2026"],
  },
  calculator: {
    componentSlug: "annuiteiten-lasten",
    categorySlug: "geld-en-verzekeringen",
  },
  categoryLabel: "Geld & Verzekeringen",
  sources: [
    { name: "NIBUD — Hypotheek", url: "https://www.nibud.nl/consumenten/hypotheek/" },
    { name: "Belastingdienst — Eigenwoningschuld", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/eigen-woning/content/eigen-woning" },
  ],
    faqs: [
    {
      question: "Wat is een annuïteitenhypotheek?",
      answer: "Bij een annuïteitenhypotheek betaal je elke maand een vast bedrag (de annuïteit). Dit bedrag bestaat uit een deel rente en een deel aflossing. In het begin betaal je vooral rente, later vooral aflossing. Na 30 jaar is de hele hypotheek afgelost. Dit is de standaard hypotheekvorm in Nederland en voldoet aan de eisen voor hypotheekrenteaftrek.",
    },
    {
      question: "Hoe worden de bruto maandlasten van mijn annuïteitenhypotheek berekend?",
      answer: "De bruto maandlast wordt berekend met de annuïteitenformule: M = (S × r) / (1 - (1 + r)^(-n)). Hierin is S het hypotheekbedrag, r de maandrente (jaarrente ÷ 12) en n het aantal maanden (30 jaar = 360 maanden). De calculator toont ook de totale rente over de hele looptijd en het totale bedrag dat je uiteindelijk betaalt.",
    },
    {
      question: "Wat is het verschil tussen bruto en netto maandlasten?",
      answer: "Bruto maandlasten zijn de totale maandelijkse betaling (rente + aflossing). Netto maandlasten zijn wat je daadwerkelijk betaalt na aftrek van de hypotheekrenteaftrek in box 1. Omdat je de betaalde hypotheekrente kunt aftrekken van je inkomen, betaal je minder belasting. De netto lasten kunnen daardoor aanzienlijk lager zijn dan de bruto lasten. Gebruik de netto maandlast calculator voor een complete berekening.",
    },
    {
      question: "Wat is het effect van extra aflossen op mijn annuïteitenhypotheek?",
      answer: "Extra aflossen verlaagt je restschuld, waardoor je maandelijkse rentelasten dalen. Omdat de annuïteit opnieuw wordt berekend over een lagere schuld, kun je maandelijks flink besparen. Ook verkort je de looptijd van de hypotheek. Gebruik onze extra aflossen calculator om te berekenen wat het jou oplevert. Let op: sommige hypotheken hebben een boeterente bij extra aflossen.",
    }
  ],
}
);
