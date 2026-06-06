import { registerPages } from "../types";

registerPages({
  slug: "vakantiegeld-berekenen",
  seo: {
    title: "Vakantiegeld Berekenen 2026 — 8% Vakantietoeslag | Rekenhet.nl",
    description:
      "Bereken je vakantiegeld over 2026. Ontdek wat 8% vakantietoeslag betekent voor jouw salaris en hoe het je nettosalaris en belastingdruk beïnvloedt.",
    h1: "Vakantiegeld Berekenen — Hoeveel ontvang je in 2026?",
    intro:
      "In Nederland heeft iedere werknemer recht op vakantiegeld: 8% van je bruto jaarsalaris. Maar wat betekent dat concreet voor jouw portemonnee? Met deze tool bereken je eenvoudig je vakantietoeslag en zie je direct wat er netto van overblijft na belastingheffing.",
    conclusion:
      "Vakantiegeld is een mooie extra, maar houd er rekening mee dat er belasting over wordt geheven. Door het progressieve belastingstelsel valt je vakantietoeslag vaak in een hogere schijf, waardoor je er netto minder van overhoudt dan 8% van je bruto salaris. Plan hier je financiën rondom de uitbetaling in mei.",
    keywords: [
      "vakantiegeld berekenen 2026",
      "8 procent vakantietoeslag",
      "vakantiegeld netto",
      "vakantietoeslag 2026",
      "hoeveel vakantiegeld krijg ik",
    ],
  },
  calculator: {
    componentSlug: "bruto-netto-salaris-calculator",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
  faqs: [
    {
      question: "Hoeveel vakantiegeld krijg ik bij een salaris van €45.000?",
      answer:
        "Bij een bruto jaarsalaris van €45.000 ontvang je 8% vakantiegeld, oftewel €3.600 bruto. Na belastingheffing houd je netto ongeveer €2.200 tot €2.500 over, afhankelijk van je totale inkomen en heffingskortingen.",
    },
    {
      question: "Wanneer wordt vakantiegeld uitbetaald?",
      answer:
        "In Nederland wordt vakantiegeld meestal in mei uitbetaald. Veel werkgevers keren het tussen 1 mei en 1 juni uit. Sommige cao's hanteren een afwijkende regeling, bijvoorbeeld maandelijkse uitbetaling.",
    },
    {
      question: "Betaal ik belasting over mijn vakantiegeld?",
      answer:
        "Ja, over vakantiegeld betaal je inkomstenbelasting en premies volksverzekeringen. Het wordt bij je reguliere salaris opgeteld in de maand van uitbetaling, waardoor het totale inkomen in die maand hoger is en er meer belasting wordt ingehouden.",
    },
  ],
});
