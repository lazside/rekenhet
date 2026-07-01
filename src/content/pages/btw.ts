import { registerPages } from "../types";

registerPages({
  slug: "btw",
  seo: {
    title: "BTW Calculator | Bereken Inclusief & Exclusief BTW (21%, 9%, 0%)",
    description: "Gratis BTW calculator. Bereken eenvoudig het BTW bedrag bij 21%, 9% of 0% tarief.",
    h1: "BTW Calculator — Bereken het eenvoudig en snel",
    intro: "Als ondernemer wil je grip op je cijfers. Deze BTW Calculator helpt je snel en eenvoudig. Bereken snel en eenvoudig de BTW over elk bedrag. Kies uit 21%, 9% of 0% tarief en bereken inclusief of exclusief BTW. Gebruik de tool om verschillende scenario's door te rekenen en weloverwogen beslissingen te nemen voor je bedrijf.",
    conclusion: "Deze calculator geeft je een helder beeld van je financiële situatie als ondernemer. De daadwerkelijke bedragen kunnen afwijken op basis van je persoonlijke omstandigheden en het geldende belastingtarief. Raadpleeg een fiscalist of boekhouder voor definitief advies op maat.",
    keywords: ["btw calculator","btw berekenen","omzetbelasting","21% btw","9% btw","btw calculator 2026"],
  },
  calculator: {
    componentSlug: "btw-calculator",
    categorySlug: "ondernemen",
  },
  categoryLabel: "Ondernemen",
  sources: [
    { name: "Belastingdienst — BTW tarieven", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/btw/content/btw-tarieven", context: "Actuele tarieven" },
    { name: "Rijksoverheid — BTW verlaagd tarief", url: "https://www.rijksoverheid.nl/onderwerpen/btw", context: "Uitzonderingen en regels" },
  ],
    faqs: [
    {
      question: "Hoe gebruik ik de BTW Calculator voor mijn administratie?",
      answer: "Voer het bedrag in en kies het juiste BTW-tarief: 21% (algemeen), 9% (verlaagd, bijv. voeding en boeken) of 0% (nultarief, bijv. export). Klik op 'Inclusief BTW' als het bedrag al BTW bevat, of 'Exclusief BTW' als je de BTW erbij wilt berekenen. De calculator toont direct het BTW-bedrag en het totaalbedrag. Gebruik deze gegevens als indicatie voor je facturen en btw-aangifte. Voor de definitieve aangifte adviseren wij altijd een boekhouder of fiscalist te raadplegen.",
    },
    {
      question: "Zijn de tarieven in btw calculator actueel voor 2026?",
      answer: "Ja, alle belastingtarieven, percentages en drempelbedragen zijn bijgewerkt met de officiële 2026-waarden van de Belastingdienst.",
    },
    {
      question: "Kan ik de resultaten gebruiken voor mijn belastingaangifte?",
      answer: "De calculator geeft een betrouwbare indicatie op basis van de actuele 2026-tarieven. Je kunt de resultaten gebruiken voor je administratie en facturen. Voor de officiële BTW-aangifte bij de Belastingdienst raden we aan de berekeningen te controleren en bij twijfel een fiscaal adviseur in te schakelen. De calculator houdt rekening met de standaard tarieven, maar niet met specifieke uitzonderingen of bijzondere regelingen.",
    },
    {
      question: "Wat zijn de voordelen voor mijn onderneming?",
      answer: "De calculator geeft je snel inzicht in je financiële situatie, zodat je betere beslissingen kunt nemen voor je bedrijf. Geen registratie nodig.",
    }
  ],
}
);
