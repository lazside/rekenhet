import { registerPages } from "../types";

registerPages({
  slug: "vakantiedagen",
  seo: {
    title: "Vakantiedagen Berekenen — Wettelijk & Bovenwettelijk | Rekenhet.nl",
    description:
      "Bereken je wettelijke en bovenwettelijke vakantiedagen op basis van je dienstverband en uren per week. Fulltime of parttime. Direct inzicht.",
    h1: "Vakantiedagen Berekenen — Hoeveel vakantiedagen heb jij?",
    intro:
      "Hoeveel vakantiedagen heb je eigenlijk? In Nederland heeft elke werknemer recht op wettelijke vakantiedagen. Het minimum is vier keer het aantal werkuren per week. Daarnaast kunnen er bovenwettelijke vakantiedagen zijn op basis van je CAO of arbeidsovereenkomst. Met deze calculator bereken je eenvoudig je wettelijke, bovenwettelijke en totale vakantiedagen, zowel voor fulltime als parttime dienstverband.",
    conclusion:
      "Het aantal vakantiedagen is een belangrijke arbeidsvoorwaarde. Wettelijk heb je recht op minimaal vier keer je werkuren per week aan vakantie, maar veel werkgevers bieden bovenwettelijke dagen. Als parttimer bouw je naar rato vakantiedagen op. Houd er rekening mee dat niet alle vakantiedagen hetzelfde zijn: bovenwettelijke dagen mogen soms anders worden behandeld bij bijvoorbeeld een ontslag of einde dienstverband.",
    keywords: [
      "vakantiedagen berekenen",
      "wettelijke vakantiedagen",
      "bovenwettelijke vakantiedagen",
      "vakantiedagen fulltime",
      "vakantiedagen parttime",
      "hoeveel vakantiedagen krijg ik",
      "vakantie opbouwen",
    ],
  },
  calculator: {
    componentSlug: "vakantiedagen",
    categorySlug: "werk-en-inkomen",
  },
  categoryLabel: "Werk & Inkomen",
  faqs: [
    {
      question: "Hoeveel vakantiedagen heb ik bij een fulltime dienstverband?",
      answer:
        "Bij een fulltime dienstverband van 40 uur per week heb je wettelijk recht op minimaal 160 uur vakantie per jaar, oftewel 20 dagen bij een 8-urige werkdag. Dit is het wettelijk minimum. Daarnaast bouw je vaak bovenwettelijke vakantiedagen op via je CAO of arbeidsovereenkomst, gemiddeld 5 extra dagen, waarmee je op zo'n 25 dagen per jaar uitkomt.",
    },
    {
      question: "Hoeveel vakantiedagen bouw ik op als parttimer?",
      answer:
        "Als parttimer bouw je naar rato vakantiedagen op. Het wettelijk minimum is vier keer het aantal uren dat je per week werkt. Werk je 24 uur per week (3 dagen), dan heb je recht op 96 uur vakantie per jaar, wat overeenkomt met 12 dagen van 8 uur. Dit geldt voor zowel het wettelijke als bovenwettelijke deel.",
    },
    {
      "question": "Wat is het verschil tussen wettelijke en bovenwettelijke vakantiedagen?",
      "answer": "Wettelijke vakantiedagen zijn de dagen waar je minimaal recht op hebt volgens de wet: 4 keer je werkuren per week. Bovenwettelijke vakantiedagen zijn extra dagen die je krijgt via je CAO of contract. Het belangrijkste verschil: wettelijke dagen vervallen na 6 maanden (tenzij je ze niet kon opnemen), terwijl bovenwettelijke dagen vaak langer geldig blijven, soms tot 5 jaar."
    },
    {
      question: "Wat gebeurt er met mijn vakantiedagen als ik ontslag neem?",
      answer:
        "Bij ontslag worden niet-opgenomen vakantiedagen uitbetaald. Wettelijke vakantiedagen moeten binnen 6 maanden na het kalenderjaar waarin ze zijn opgebouwd worden opgenomen, anders vervallen ze. Bovenwettelijke dagen hebben vaak een langere geldigheid. Bij uitdiensttreding worden alle resterende dagen uitbetaald tegen het geldende salaris.",
    },
    {
      question: "Kan ik vakantiedagen verkopen?",
      answer:
        "In Nederland is het niet toegestaan om wettelijke vakantiedagen te verkopen — je moet ze daadwerkelijk opnemen. Bovenwettelijke vakantiedagen mag je in sommige gevallen wel laten uitbetalen, mits dit is vastgelegd in je CAO of arbeidsovereenkomst. Uitbetaling van vakantiedagen is overigens belast als regulier inkomen.",
    },
  ],
});
