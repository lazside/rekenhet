import { registerPages } from "../types";

registerPages({
  slug: "investeringsaftrek",
  seo: {
    title: "Investeringsaftrek Berekenen — KIA, MIA & EIA 2026 | Rekenhet.nl",
    description:
      "Bereken je investeringsaftrek voor KIA (kleinschalig), MIA (milieu) of EIA (energie). Inclusief belastingbesparing. Direct inzicht in je aftrek.",
    h1: "Investeringsaftrek Berekenen — KIA, MIA & EIA voor ondernemers",
    intro:
      "Als ondernemer kun je profiteren van fiscale aftrekposten bij investeringen. Deze calculator helpt je inzichtelijk te maken hoeveel je kunt aftrekken via de Kleinschaligheidsinvesteringsaftrek (KIA), de Milieu-investeringsaftrek (MIA) of de Energie-investeringsaftrek (EIA). Afhankelijk van het type investering en het bedrag kun je tot 45% van de investering aftrekken van de winst, wat leidt tot een aanzienlijke belastingbesparing.",
    conclusion:
      "Investeringsaftrek is een krachtig fiscaal instrument voor ondernemers. Door te kiezen voor milieu- of energiezuinige investeringen kun je niet alleen bijdragen aan een duurzamere bedrijfsvoering, maar ook profiteren van hogere aftrekpercentages. De daadwerkelijke belastingbesparing hangt af van je winst en belastingtarief. Raadpleeg een fiscalist voor persoonlijk advies.",
    keywords: [
      "investeringsaftrek berekenen",
      "KIA 2026",
      "kleinschaligheidsinvesteringsaftrek",
      "MIA",
      "milieu investeringsaftrek",
      "EIA",
      "energie investeringsaftrek",
      "belastingbesparing ondernemer",
    ],
  },
  calculator: {
    componentSlug: "investeringsaftrek",
    categorySlug: "ondernemen",
  },
  categoryLabel: "Ondernemen",
  faqs: [
    {
      question: "Wat is de Kleinschaligheidsinvesteringsaftrek (KIA)?",
      answer:
        "De KIA is een fiscale regeling voor ondernemers die investeren in bedrijfsmiddelen. Bij een investering van meer dan €2.801 kun je 28% van het investeringsbedrag aftrekken van je winst, waardoor je minder inkomstenbelasting betaalt. Het maximale aftrekbedrag is afhankelijk van de hoogte van de investering. De KIA geldt voor de meeste bedrijfsmiddelen, met uitzondering van bijvoorbeeld personenauto's en grond.",
    },
    {
      question: "Wat is het verschil tussen MIA en EIA?",
      answer:
        "De MIA (Milieu-investeringsaftrek) is voor bedrijfsmiddelen die milieuvriendelijker zijn dan standaard, met een aftrek van 36% van het investeringsbedrag. De EIA (Energie-investeringsaftrek) is voor energiebesparende bedrijfsmiddelen en duurzame energie-opties, met een aftrek van 45%. Beide regelingen zijn onderdeel van dezelfde fiscale stimulering, maar richten zich op verschillende type investeringen.",
    },
    {
      question: "Hoeveel belasting bespaar ik met investeringsaftrek?",
      answer:
        "De belastingbesparing is het aftrekbedrag vermenigvuldigd met je belastingtarief. De calculator gebruikt een standaard tarief van 25,5% (Vennootschapsbelasting). Bij een KIA-aftrek van €14.000 op een investering van €50.000 bespaar je ongeveer €3.570 aan belasting. Het exacte voordeel hangt af van je winstniveau en belastingtarief.",
    },
    {
      question: "Voor welke investeringen geldt de EIA?",
      answer:
        "De EIA geldt voor energiebesparende bedrijfsmiddelen en duurzame energie-opties die voorkomen op de Energielijst. Denk aan zonnepanelen, warmtepompen, isolatie, energiezuinige verlichting, HR-ketels en warmteterugwinsystemen. De investering moet minimaal €2.500 bedragen en maximaal €149.000. Het aftrekpercentage is 45% voor 2026.",
    },
    {
      question: "Kan ik KIA en MIA/EIA combineren?",
      answer:
        "Nee, voor dezelfde investering kun je niet zowel KIA als MIA of EIA toepassen. Je kiest de regeling die het voordeligst is. MIA en EIA hebben vaak hogere aftrekpercentages (36-45%) dan de KIA (28%), maar zijn alleen van toepassing op specifieke milieuvriendelijke of energiezuinige investeringen. Voor reguliere bedrijfsmiddelen gebruik je de KIA.",
    },
  ],
});
