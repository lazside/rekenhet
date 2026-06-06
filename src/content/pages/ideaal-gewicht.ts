import { registerPages } from "../types";

registerPages({
  slug: "ideaal-gewicht",
  seo: {
    title: "Ideaal Gewicht Berekenen — Devine, Robinson & Miller Formule | Rekenhet.nl",
    description:
      "Bereken je ideale gewicht op basis van lengte en geslacht. Drie wetenschappelijke formules: Devine, Robinson en Miller. Gratis en direct inzicht.",
    h1: "Ideaal Gewicht Berekenen — Wat is een gezond gewicht voor jouw lengte?",
    intro:
      "Wat is een gezond gewicht voor iemand van jouw lengte? Deze calculator berekent je ideale gewicht aan de hand van drie veelgebruikte medische formules: Devine, Robinson en Miller. Elk van deze formules geeft een iets ander adviesgewicht, maar samen geven ze een goede indicatie van wat een gezond streefgewicht voor jou is. Houd er rekening mee dat ideaal gewicht een richtlijn is — factoren zoals spiermassa, botdichtheid en lichaamsbouw spelen ook een belangrijke rol.",
    conclusion:
      "Je ideale gewicht is geen vast getal, maar een indicatie. De formules van Devine, Robinson en Miller geven elk een iets ander advies, maar ze liggen meestal dicht bij elkaar. Gebruik deze calculator als richtlijn, maar kijk ook naar andere factoren zoals hoe je je voelt, je energieniveau en je algehele gezondheid. Bij twijfel kun je altijd advies vragen aan een huisarts of diëtist.",
    keywords: [
      "ideaal gewicht berekenen",
      "gezond gewicht",
      "devine formule",
      "robinson formule",
      "miller formule",
      "gewicht naar lengte",
      "wat is mijn ideale gewicht",
    ],
  },
  calculator: {
    componentSlug: "ideaal-gewicht",
    categorySlug: "gezondheid",
  },
  categoryLabel: "Gezondheid",
  faqs: [
    {
      question: "Wat is het verschil tussen de Devine, Robinson en Miller formules?",
      answer:
        "De Devine-formule is oorspronkelijk ontwikkeld voor het berekenen van medicijndoseringen en geeft voor mannen: 50 kg + 2,3 kg per 2,54 cm boven 152,4 cm, en voor vrouwen: 45,5 kg + 2,3 kg per 2,54 cm boven 152,4 cm. Robinson geeft iets lagere waarden (52 kg + 1,9 kg per inch voor mannen) en Miller geeft de laagste waarden (56,2 kg + 1,41 kg per inch voor mannen). Ze zijn allemaal richtlijnen, geen absolute waarheden.",
    },
    {
      question: "Is BMI hetzelfde als ideaal gewicht?",
      answer:
        "Nee, BMI (Body Mass Index) is een verhouding tussen gewicht en lengte, terwijl ideaal gewicht een specifiek streefgewicht in kilo's is op basis van formules. BMI geeft een categorie (ondergewicht, gezond, overgewicht, obesitas), terwijl ideaal gewicht een concreet getal geeft. Beide zijn indicaties, maar geen van beide houdt rekening met spiermassa of lichaamsbouw.",
    },
    {
      question: "Hoeveel mag ik wegen bij 180 cm?",
      answer:
        "Bij een lengte van 180 cm geeft de Devine-formule voor een man een ideaal gewicht van ongeveer 77 kg en voor een vrouw ongeveer 72,5 kg. Robinson geeft 75 kg (man) en 72 kg (vrouw), Miller geeft 71 kg (man) en 70 kg (vrouw). Een gezond BMI-bereik voor 180 cm is tussen de 60 en 81 kg.",
    },
    {
      question: "Kan mijn ideale gewicht veranderen met de leeftijd?",
      answer:
        "Ja, naarmate je ouder wordt verandert je lichaamssamenstelling. Spiermassa neemt vaak af en vetmassa kan toenemen. De formules voor ideaal gewicht houden echter geen rekening met leeftijd. Het is daarom goed om naast deze formules ook naar andere indicatoren te kijken, zoals je middelomtrek, energieniveau en eventuele gezondheidsklachten.",
    },
    {
      question: "Waarom gebruiken deze formules inches in plaats van centimeters?",
      answer:
        "De formules van Devine, Robinson en Miller zijn ontwikkeld in de Verenigde Staten, waar het imperiale stelsel wordt gebruikt. De formules rekenen met een basislengte van 5 voet (152,4 cm) en een correctie per extra inch (2,54 cm) boven die lengte. Onze calculator rekent dit automatisch voor je om.",
    },
  ],
});
