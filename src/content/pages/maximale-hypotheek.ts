import { registerPages } from "../types";

registerPages({
  slug: "maximale-hypotheek",
  seo: {
    title: "Maximale Hypotheek Berekenen — Sneltest | Rekenhet.nl",
    description: "Gratis sneltest voor je maximale hypotheek. Bereken leencapaciteit.",
    h1: "Sneltest Maximale Hypotheek — Bereken het eenvoudig en snel",
    intro: "Een huis kopen of verbouwen brengt grote financiële beslissingen met zich mee. Met deze Sneltest Maximale Hypotheek bereken je eenvoudig wat er financieel mogelijk is. Ontdek snel wat je maximale hypotheek is op basis van inkomen, rente en looptijd. Zo weet je precies waar je aan toe bent voordat je een gesprek met de bank of hypotheekadviseur aangaat.",
    conclusion: "Deze calculator geeft een indicatie van je hypotheekmogelijkheden. De daadwerkelijke leencapaciteit hangt af van een volledige beoordeling door een hypotheekadviseur of geldverstrekker. De actuele leennormen en rentetarieven zijn verwerkt, maar een persoonlijk gesprek blijft noodzakelijk voor een definitief advies.",
    keywords: ["maximale hypotheek","hypotheek berekenen","hoeveel hypotheek","maximale hypotheek 2026"],
  },
  calculator: {
    componentSlug: "maximale-hypotheek",
    categorySlug: "hypotheek",
  },
  categoryLabel: "Hypotheek & Wonen",
  sources: [
    { name: "NIBUD — Hypotheeknormen 2026", url: "https://www.nibud.nl/consumenten/hypotheek/" },
    { name: "AFM — Leennormen hypotheken", url: "https://www.afm.nl/nl-nl/consumenten/producten/hypotheek" },
    { name: "Rijksoverheid — Hypotheekrenteaftrek", url: "https://www.rijksoverheid.nl/onderwerpen/hypotheek" },
  ],
    faqs: [
    {
      question: "Hoe wordt mijn maximale hypotheek berekend?",
      answer: "De sneltest maximale hypotheek berekent je leencapaciteit op basis van je bruto jaarinkomen, eventueel partnerinkomen, de actuele toetsingsrente en de gewenste looptijd. De calculator gebruikt de NIBUD-normen voor 2026. Het uitgangspunt is dat je maandelijkse woonlasten (hypotheekrente + aflossing) niet meer dan 30-40% van je bruto maandinkomen bedragen, afhankelijk van de hoogte van je inkomen. Ook wordt rekening gehouden met een buffer voor onderhoud en verzekeringen.",
    },
    {
      question: "Zijn de hypotheekrente en leennormen up-to-date?",
      answer: "Ja, de calculator gebruikt de actuele toetsingsrente en leennormen voor 2026 zoals vastgesteld door het NIBUD en de AFM. De toetsingsrente is het gemiddelde van de hypotheekrentes over de afgelopen periode plus een opslag, bedoeld om te toetsen of je een rentestijging kunt opvangen. In 2026 is de toetsingsrente circa 5,5%. Bij een hypotheek met rentevaste periode van 10+ jaar mag de werkelijke rente worden gebruikt als die lager is.",
    },
    {
      question: "Welke factoren beïnvloeden mijn maximale hypotheek?",
      answer: "De belangrijkste factoren zijn: je bruto jaarinkomen (en dat van je partner), de actuele hypotheekrente, de looptijd (30 jaar gebruikelijk), eventuele studieschuld (weegt zwaar mee sinds de Wet study financing), en vaste lasten zoals creditcard of private lease. Ook je leeftijd speelt een rol: hoe ouder, hoe korter de maximale looptijd. Een studieschuld van €50.000 kan je maximale hypotheek met circa €100.000 verlagen.",
    },
    {
      question: "Is de maximale hypotheek hetzelfde als wat ik kan lenen?",
      answer: "Nee, de maximale hypotheek is de bovengrens op basis van leennormen. De daadwerkelijke lening kan lager uitvallen door: je eigen spaargeld (je hebt minimaal eigen geld nodig voor kosten koper), de waarde van de woning (maximaal 100% van de marktwaarde), en het beleid van de specifieke geldverstrekker. Laat altijd een hypotheekadviseur een definitieve berekening maken.",
    }
  ],
}
);
