import { registerPages } from "../types";

registerPages({
  slug: "bruto-netto-salaris-2026",
  seo: {
    title: "Bruto Netto Salaris 2026 — Bereken Je Netto Salaris | Rekenhet.nl",
    description:
      "Bereken je netto salaris voor 2026 met de actuele belastingschijven. Vul je bruto jaarsalaris in en ontvang direct je netto maandloon, vakantietoeslag en belastingdruk.",
    h1: "Bruto Netto Salaris 2026 — Wat hou je netto over?",
    intro:
      "Wil je weten wat je in 2026 netto overhoudt van je bruto salaris? Met deze calculator bereken je eenvoudig je nettosalaris op basis van de actuele belastingtarieven en heffingskortingen. Of je nu fulltime, parttime of als freelancer werkt — binnen enkele seconden zie je wat er op je rekening wordt gestort.",
    conclusion:
      "Het bruto netto salaris voor 2026 wordt bepaald door de belastingschijven, premies volksverzekeringen en heffingskortingen. De overheid indexeert jaarlijks de tarieven, waardoor de exacte bedragen kunnen afwijken. Gebruik deze calculator als indicatie en raadpleeg een salarisadviseur voor een definitieve berekening op maat.",
    keywords: [
      "bruto netto salaris 2026",
      "netto salaris berekenen 2026",
      "salaris 2026",
      "loonberekening 2026",
      "wat hou ik netto over 2026",
    ],
  },
  calculator: {
    componentSlug: "bruto-netto-salaris-calculator",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
  sources: [
    { name: "Belastingdienst — Loonheffingen", url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/loonheffingen/content/loonheffingen", context: "Tarieven en schijven 2026" },
    { name: "Rijksoverheid — Inkomstenbelasting", url: "https://www.rijksoverheid.nl/onderwerpen/inkomstenbelasting" },
  ],
    faqs: [
    {
      question: "Hoe berekent de Calculator mijn netto inkomen?",
      answer: "De Bruto Netto Salaris Calculator 2026 gebruikt de actuele belastingschijven van de Belastingdienst om je netto inkomen te berekenen. Het bruto jaarsalaris wordt verdeeld over de schijven: de eerste schijf (€0-€75.000) wordt belast tegen 35,82%, het meerdere tegen 49,50%. Vervolgens worden de algemene heffingskorting (€3.362) en arbeidskorting (max. €5.527) toegepast. Tot slot worden premies volksverzekeringen (AOW, ANW, Wlz) verrekend. Het resultaat is je netto jaarsalaris, dat wordt uitgesplitst naar netto per maand en per jaar.",
    },
    {
      question: "Klopt de Calculator met de actuele belastingregels?",
      answer: "Ja, de Bruto Netto Salaris Calculator 2026 is volledig bijgewerkt met de officiële belastingtarieven, schijven en heffingskortingen voor 2026 zoals gepubliceerd door de Belastingdienst en Rijksoverheid. De calculator wordt jaarlijks geüpdatet na Prinsjesdag en publicatie van het Belastingplan. Mocht er gedurende het jaar een wijziging optreden (bijv. aanpassing van heffingskortingen), dan werken wij de calculator binnen enkele dagen bij.",
    },
    {
      question: "Houdt de calculator rekening met heffingskortingen?",
      answer: "Ja, de calculator neemt standaard de algemene heffingskorting (€3.362 in 2026) en arbeidskorting (maximaal €5.527 in 2026) mee in de berekening. Deze kortingen worden door de Belastingdienst verrekend via de loonheffing. Je kunt ze desgewenst uitschakelen in de calculator om het effect op je netto salaris te zien. De hoogte van de heffingskortingen is afhankelijk van je inkomen en wordt automatisch berekend.",
    },
    {
      question: "Kan ik de calculator ook gebruiken voor parttime berekeningen?",
      answer: "Ja, de calculator werkt voor zowel fulltime als parttime dienstverbanden. Vul je bruto maandsalaris of jaarsalaris in zoals vermeld in je arbeidsovereenkomst. De calculator berekent op basis van het ingevoerde bedrag het juiste nettosalaris, ongeacht of je 24, 32 of 40 uur per week werkt. Gebruik ook onze parttime salaris calculator voor een specifieke berekening op basis van uren.",
    }
  ],
}
);
