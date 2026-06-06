import { registerPages } from "../types";

registerPages({
  slug: "zwangerschap",
  seo: {
    title: "Zwangerschap Calculator — Uitgerekende Datum & Week Berekenen | Rekenhet.nl",
    description:
      "Bereken eenvoudig je uitgerekende datum, huidige zwangerschapsweek en trimester. Op basis van Naegele-regel of echo. Gratis, direct inzicht.",
    h1: "Zwangerschap Calculator — Bereken je uitgerekende datum en zwangerschapsweek",
    intro:
      "Ben je zwanger of heb je een zwangerschapswens? Met deze calculator krijg je direct inzicht in je uitgerekende datum, huidige zwangerschapsweek en trimester. Je kunt rekenen op basis van de eerste dag van je laatste menstruatie (Naegele-regel) of op basis van een uitgerekende datum die je via een echo hebt gekregen. De calculator geeft je niet alleen de week, maar ook het exacte aantal weken+dagen, de zwangerschapsmaand en een visuele voortgangsbalk.",
    conclusion:
      "Of je nu rekent op basis van je laatste menstruatie of een echo-datum, deze calculator geeft je een helder beeld van waar je staat in je zwangerschap. Houd er rekening mee dat de uitgerekende datum een schatting is — slechts circa 5% van de baby's wordt daadwerkelijk op de exacte uitgerekende datum geboren. De Naegele-regel (40 weken of 280 dagen na de eerste dag van de laatste menstruatie) is de meest gebruikte methode, maar een vroege echo kan een nauwkeurigere datum geven. Gebruik deze tool als leidraad, maar overleg altijd met je verloskundige of gynaecoloog voor medisch advies.",
    keywords: [
      "zwangerschap calculator",
      "uitgerekende datum berekenen",
      "hoeveel weken zwanger",
      "zwangerschapsweek berekenen",
      "naegele regel",
      "echo uitgerekende datum",
      "trimester zwangerschap",
      "zwangerschapskalender",
      "wanneer ben ik uitgerekend",
    ],
  },
  calculator: {
    componentSlug: "zwangerschap",
    categorySlug: "gezondheid",
  },
  categoryLabel: "Gezondheid",
  faqs: [
    {
      question: "Hoe wordt de uitgerekende datum berekend?",
      answer:
        "De meest gebruikte methode is de Naegele-regel: eerste dag van de laatste menstruatie + 280 dagen (40 weken). De calculator ondersteunt ook berekening op basis van een echo-datum. Een zwangerschap duurt gemiddeld 40 weken, gerekend vanaf de eerste dag van de laatste menstruatie. De conceptie vindt ongeveer 2 weken later plaats, dus de eigenlijke zwangerschapsduur is ongeveer 38 weken.",
    },
    {
      question: "Wat is het verschil tussen Naegele en echo?",
      answer:
        "De Naegele-regel gaat uit van een cyclus van 28 dagen en de eisprong op dag 14. Als je cyclus korter of langer is, of als je een onregelmatige cyclus hebt, kan de Naegele-datum afwijken. Een vroege echo (tussen 10-13 weken) meet de CRL (Crown-Rump Length) van de baby en geeft vaak een nauwkeurigere uitgerekende datum. In Nederland wordt bij voorkeur de echo-termijn aangehouden als er een verschil is van meer dan 7 dagen met de Naegele-datum.",
    },
    {
      question: "Hoeveel maanden ben ik zwanger?",
      answer:
        "Een zwangerschap duurt ongeveer 9 maanden of 40 weken. Een zwangerschapsmaand is gemiddeld 4 weken. De calculator toont je huidige zwangerschapsmaand op basis van je week. Week 1-4 is maand 1, week 5-8 is maand 2, enzovoort. Na 40 weken (10 maanden) ben je uitgerekend. Dit wijkt af van de kalendermaanden omdat een maand gemiddeld 4,3 weken duurt.",
    },
    {
      "question": "Vanaf wanneer kun je de baby voelen?",
      "answer": "De meeste vrouwen voelen de eerste bewegingen tussen week 16 en 24 van de zwangerschap. Bij een eerste zwangerschap merk je het vaak rond week 20-22, bij een volgende zwangerschap eerder, rond week 16-18. De eerste bewegingen voelen als een zacht 'fladderen' of 'belletjes' en worden naarmate de zwangerschap vordert sterker en duidelijker herkenbaar als trapjes en draaibewegingen."
    },
    {
      question: "Wat zijn de trimesters van een zwangerschap?",
      answer:
        "Een zwangerschap wordt verdeeld in drie trimesters van ongeveer 13 weken. Het eerste trimester (week 1-13) is de periode van innesteling en orgaanvorming — veel vrouwen hebben last van vermoeidheid en misselijkheid. Het tweede trimester (week 14-26) staat in het teken van snelle groei en de eerste bewegingen — vaak ervaren als de prettigste fase. Het derde trimester (week 27-40) is de eindspurt: de baby groeit hard, oefent met ademhalen en draait zich in de juiste positie voor de geboorte.",
    },
  ],
});
