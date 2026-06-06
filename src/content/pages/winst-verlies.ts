import { registerPages } from "../types";

registerPages({
  slug: "winst-verlies",
  seo: {
    title: "Winst & Verlies Calculator — Ondernemingsresultaat Berekenen | Rekenhet.nl",
    description:
      "Bereken de winst, winstmarge en kostenpercentage van je onderneming. Voer omzet, inkoop, huur, personeel en overige kosten in.",
    h1: "Winst & Verlies Calculator — Bereken het resultaat van je onderneming",
    intro:
      "Als ondernemer wil je snel inzicht in je financiële resultaten. Met deze winst- en verliescalculator bereken je eenvoudig je winst, winstmarge en kostenpercentage. Door je omzet en belangrijkste kostenposten in te vullen (inkoop, huur, personeel en overige kosten) krijg je direct een helder beeld van hoe je onderneming ervoor staat.",
    conclusion:
      "Een gezonde winstmarge is essentieel voor het voortbestaan van je onderneming. Door je kosten en opbrengsten regelmatig te analyseren, kun je tijdig bijsturen. Een vuistregel: streef naar een winstmarge van minimaal 10-20%, afhankelijk van je sector. Gebruik deze calculator om snel scenario's door te rekenen en te zien wat het effect is van kostenbesparingen of omzetgroei.",
    keywords: [
      "winst verlies berekenen",
      "winstmarge berekenen",
      "onderneming resultaat",
      "kostenpercentage",
      "winstberekening",
      "financieel overzicht onderneming",
    ],
  },
  calculator: {
    componentSlug: "winst-verlies",
    categorySlug: "ondernemen",
  },
  categoryLabel: "Ondernemen",
  faqs: [
    {
      question: "Hoe bereken ik mijn winst?",
      answer:
        "Winst bereken je door je totale omzet te verminderen met alle kosten. De formule is: Winst = Omzet - (Inkoop + Huur + Personeelskosten + Overige kosten). De calculator geeft ook direct de winstmarge (winst als percentage van de omzet) en het kostenpercentage (totale kosten als percentage van de omzet).",
    },
    {
      question: "Wat is een gezonde winstmarge?",
      answer:
        "Een gezonde winstmarge verschilt per sector. Over het algemeen geldt: een marge van 10-20% is gezond voor de meeste bedrijven. Horeca heeft vaak lagere marges (5-10%), terwijl dienstverlening hogere marges kan hebben (20-40%). Vergelijk je marge altijd met branchegenoten voor een reëel beeld. Een negatieve marge betekent dat je verlies lijdt.",
    },
    {
      question: "Wat valt onder overige kosten?",
      answer:
        "Overige kosten zijn alle bedrijfskosten die niet onder inkoop, huur of personeelskosten vallen. Denk aan: verzekeringen, kantoorbenodigdheden, marketing- en advertentiekosten, reiskosten, afschrijvingen, rentelasten, advocaat- en adviseurskosten, abonnementen, en klein onderhoud. Het is belangrijk om al deze kosten goed te administreren voor een accuraat beeld.",
    },
    {
      question: "Hoe kan ik mijn winstmarge verbeteren?",
      answer:
        "Je kunt je winstmarge verbeteren door (1) je omzet te verhogen zonder evenredige kostenstijging, bijvoorbeeld door prijsverhogingen of meer verkopen, (2) je kosten te verlagen door betere inkoopvoorwaarden of efficiëntere processen, (3) je productmix te optimaliseren door te focussen op producten met hogere marges, en (4) vaste kosten te delen met anderen of te variabiliseren.",
    },
    {
      question: "Is winst hetzelfde als wat ik op mijn rekening krijg?",
      answer:
        "Nee, winst is niet hetzelfde als je banksaldo. Winst is het resultaat van omzet minus kosten op basis van facturatie (baten en lasten). Je kunt winst hebben terwijl er nog niet betaald is door klanten, of je kunt verlies hebben terwijl je bankrekening vol staat door een lening of investering. Daarnaast moet je over je winst nog belasting betalen (vennootschapsbelasting of inkomstenbelasting).",
    },
  ],
});
