import { registerPages } from "../types";

registerPages({
  slug: "box3",
  seo: {
    title: "Box 3 Inkomstenbelasting Berekenen 2026 | Rekenhet.nl",
    description: "Gratis box 3 calculator voor belasting over sparen en beleggen.",
    h1: "Box 3 Berekening — Bereken het eenvoudig en snel",
    intro: "Of het nu gaat om belasting, spaargeld of verzekeringen — met deze Box 3 Berekening weet je waar je aan toe bent. Bereken de belasting over je box 3 vermogen in 2026. De calculator werkt met de actuele 2026-tarieven en -regels, zodat je altijd een reëel beeld krijgt.",
    conclusion: "Of je nu spaart, belegt, een lening afsluit of belasting betaalt — deze calculator geeft je inzicht in je financiële situatie. Houd er rekening mee dat persoonlijke omstandigheden het definitieve bedrag kunnen beïnvloeden. Voor een officiële berekening raadpleeg je een financieel adviseur.",
    keywords: ["box 3","box 3 belasting","sparen en beleggen","inkomstenbelasting","belasting 2026","box3 berekenen","box3 berekenen 2026"],
  },
  calculator: {
    componentSlug: "box3-berekenen",
    categorySlug: "geld-en-verzekeringen",
  },
  categoryLabel: "Geld & Verzekeringen",
  sources: [
    { name: "Belastingdienst — Box 3", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/inkomen-uit-sparen-en-beleggen", context: "Split-rate systeem 2026" },
    { name: "Rijksoverheid — Inkomstenbelasting box 3", url: "https://www.rijksoverheid.nl/onderwerpen/inkomstenbelasting/box-3" },
  ],
    faqs: [
    {
      question: "Hoe wordt de Box 3 belasting berekend in 2026?",
      answer: "In 2026 werkt de Belastingdienst met het split-rate systeem. Je vermogen wordt verdeeld in spaargeld en beleggingen. Over spaargeld wordt een fictief rendement van 1,03% gerekend, over beleggingen 6,04%. Schulden worden in mindering gebracht met 2,47%. Het totale fictieve rendement wordt belast tegen 36%. Over de eerste €57.000 (€114.000 voor partners) betaal je geen belasting (heffingsvrij vermogen).",
    },
    {
      question: "Wat is het heffingsvrij vermogen in 2026?",
      answer: "Het heffingsvrij vermogen in 2026 is €57.000 per persoon. Voor fiscale partners is dit €114.000. Over het vermogen boven deze drempel betaal je Box 3 belasting. Let op: dit is het totale vermogen (sparen + beleggen + tweede woning - schulden). Heb je een hypotheek op je eigen woning? Die valt in box 1, niet in box 3.",
    },
    {
      question: "Wordt mijn eigen woning ook belast in Box 3?",
      answer: "Nee, je eigen woning (hoofdverblijf) valt niet in box 3 maar in box 1. Alleen je spaargeld, beleggingen, aandelen, tweede woning en overige bezittingen vallen in box 3. Schulden (exclusief hypotheek eigen woning) mag je aftrekken van je box 3 bezittingen tot een maximum van €3.700 per persoon.",
    },
    {
      question: "Hoe kan ik mijn Box 3 belasting verlagen?",
      answer: "Je kunt je Box 3 belasting verlagen door: 1) gebruik te maken van het heffingsvrij vermogen, 2) schulden af te lossen (maar let op: deze mag je al aftrekken), 3) vermogen over te hevelen naar je partner (fiscaal partnerschap), 4) te beleggen in groene beleggingen (vrijstelling tot €71.251), of 5) vermogen om te zetten in je eigen woning (extra aflossen). Raadpleeg een belastingadviseur voor persoonlijk advies.",
    }
  ],
}
);
