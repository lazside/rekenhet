import { FAQs as brutoNettoFaqs } from "@/lib/calculators/modules/bruto-netto-salaris-calculator/faqs";

interface FaqItem {
  question: string;
  answer: string;
}

interface CalculatorFaqEntry {
  slug: string;
  faqs: FaqItem[];
}

const explicitFaqs: CalculatorFaqEntry[] = [
  {
    slug: "bruto-netto-salaris-calculator",
    faqs: brutoNettoFaqs,
  },
  {
    slug: "btw-calculator",
    faqs: [
      { question: "Hoe bereken ik BTW over een bedrag?", answer: "Vul het bedrag in, kies het BTW-tarief (21%, 9% of 0%) en selecteer of het bedrag inclusief of exclusief BTW is." },
      { question: "Wat is het verschil tussen inclusief en exclusief BTW?", answer: "Een bedrag exclusief BTW is zonder belasting. Inclusief BTW is inclusief omzetbelasting." },
      { question: "Welke BTW-tarieven zijn er in Nederland?", answer: "21% (hoog), 9% (laag) en 0% (export)." },
      { question: "Hoeveel is €100 inclusief 21% BTW?", answer: "€100 exclusief BTW wordt €121 inclusief 21% BTW." },
    ],
  },
  {
    slug: "bmi-calculator",
    faqs: [
      { question: "Wat is een gezonde BMI?", answer: "Een BMI tussen 18,5 en 25 is gezond. 18,5 is ondergewicht, 25-30 overgewicht, boven 30 obesitas." },
      { question: "Klopt BMI wel voor sporters?", answer: "BMI houdt geen rekening met spiermassa. Gebruik het als indicatie." },
    ],
  },
  {
    slug: "procenten-calculator",
    faqs: [
      { question: "Hoe bereken ik procenten?", answer: "Deel het deel door het geheel en vermenigvuldig met 100." },
      { question: "Hoe bereken ik een procentuele stijging?", answer: "Trek oude van nieuwe waarde af, deel door oude waarde, keer 100." },
    ],
  },
  {
    slug: "energielabel-berekenen",
    faqs: [
      { question: "Hoeveel extra hypotheek krijg ik met energielabel A?", answer: "Met energielabel A kun je tot €25.000 extra lenen bovenop de standaard leencapaciteit. Voor A+ is dat €30.000, A++ €35.000 en A+++ of hoger kan oplopen tot €50.000. Hoe beter het energielabel, hoe hoger de extra hypotheekruimte volgens de Nibud-normen." },
      { question: "Wat is de 106%-LTV regel voor verduurzaming?", answer: "De 106%-LTV (Loan-to-Value) regel houdt in dat je bij verduurzaming tot 106% van de woningwaarde mag lenen in plaats van de gebruikelijke 100%. Die extra 6% is bedoeld voor energiebesparende maatregelen zoals isolatie, warmtepompen of zonnepanelen. Je hebt hiervoor minimaal een energielabel A nodig of een plan om naar A+ te gaan." },
      { question: "Hoe kan ik het extra budget voor verduurzaming gebruiken?", answer: "Het extra budget (duurzaamheidsbudget) kun je besteden aan energiebesparende maatregelen zoals dakisolatie, spouwmuurisolatie, HR++ glas, een warmtepomp, zonnepanelen of een ventilatiesysteem. Deze investeringen verhogen niet alleen je wooncomfort maar ook de waarde van je woning en verlagen je energierekening." },
      { question: "Welke energielabels komen in aanmerking voor extra hypotheek?", answer: "In principe komen alle energielabels van A++++ tot en met G in aanmerking voor een bepaalde mate van extra leencapaciteit, maar de hoogte verschilt sterk. Voor woningen met label A of hoger is de extra hypotheekruimte het grootst. Vanaf label E, F en G is de extra leencapaciteit minimaal, maar het verduurzamingsbudget juist hoger omdat er meer verbeteringen nodig zijn." },
    ],
  },
  {
    slug: "minimumloon-2026",
    faqs: [
      { question: "Wat is het minimumloon in 2026?", answer: "Per 1 juli 2026 is het wettelijk minimumuurloon voor 21-jarigen en ouder €14,99 bruto. In de eerste helft van 2026 was dit €14,71 per uur. Het minimumloon wordt twee keer per jaar geïndexeerd op basis van de cao-loonontwikkeling." },
      { question: "Hoeveel is het minimumloon per maand in 2026?", answer: "Bij een fulltime dienstverband (40 uur per week) is het minimumloon per maand ongeveer €2.597 bruto (2e helft 2026: €14,99 × 40 × 52 / 12). Let op: dit is exclusief vakantiegeld. Het exacte bedrag hangt af van het aantal gewerkte uren per week." },
      { question: "Hoeveel is het minimumloon voor jongeren (jeugdminimumloon)?", answer: "Het jeugdminimumloon is een percentage van het wettelijk minimumuurloon voor 21+. Bijvoorbeeld: 20-jarigen krijgen 80% (€11,99/uur), 19-jarigen 60% (€8,99/uur), 18-jarigen 50% (€7,50/uur), 17-jarigen 39,5% (€5,92/uur), 16-jarigen 34,5% (€5,17/uur) en 15-jarigen 30% (€4,50/uur)." },
      { question: "Wat is het verschil tussen minimumloon 2025 en 2026?", answer: "Het minimumloon is in 2026 gestegen door indexatie. Per 1 januari 2026 steeg het naar €14,71/uur (was €13,68/uur per juli 2025). Per 1 juli 2026 volgde een tweede stijging naar €14,99/uur. De totale stijging op jaarbasis is ongeveer 4,5-5%." },
      { question: "Heb ik recht op het volledige minimumloon vanaf 21 jaar?", answer: "Ja, vanaf 21 jaar heb je recht op 100% van het wettelijk minimumuurloon. Daarvoor gelden de lagere jeugdminimumlonen. Er is geen apart minimumloon meer voor 22-jarigen en ouder — dat is sinds 2024 afgeschaft en samengevoegd met de 21+ leeftijdsgroep." },
    ],
  },
  {
    slug: "belastingjaar-vergelijken",
    faqs: [
      { question: "Wat is het grootste verschil tussen belastingjaar 2025 en 2026?", answer: "De belangrijkste wijzigingen zijn: (1) de eerste schijf is verbreed van €38.441 naar €40.018, waardoor een groter deel van je inkomen in het lage tarief valt; (2) de AOW-premie is verlaagd van 27,65% naar 26,54%, wat de totale schijf-1-druk onveranderd op 35,82% houdt; (3) de algemene heffingskorting is licht gestegen van €3.068 naar €3.070." },
      { question: "Is 2026 voordeliger dan 2025?", answer: "Voor de meeste inkomens is 2026 iets voordeliger, voornamelijk door de verbreding van de eerste schijf. Het exacte verschil hangt af van je inkomen en of vakantiegeld is inbegrepen. Bij een modaal inkomen (€45.000) scheelt het doorgaans enkele tientallen euro's per maand in het voordeel van 2026." },
      { question: "Zijn de heffingskortingen veranderd in 2026?", answer: "De algemene heffingskorting is licht gestegen (max €3.070 vs €3.068 in 2025). De faseringsgrens is omhoog gegaan van €24.821 naar €24.928. De arbeidskorting is nagenoeg gelijk (max €5.598 vs €5.599), maar de faseringsgrens is verhoogd van €39.958 naar €40.018." },
      { question: "Wat is de belastingdruk in 2026?", answer: "De belastingdruk in de eerste schijf blijft 35,82% (waarvan 9,28% inkomstenbelasting en 26,54% AOW/Anw/Wlz-premies). De tweede schijf is 37,48% en de top schijf is 49,50%. Door de verbrede eerste schijf betaal je effectief iets minder belasting dan in 2025." },
    ],
  },
  {
    slug: "jaarruimte-berekenen",
    faqs: [
      { question: "Wat is jaarruimte?", answer: "Jaarruimte is het maximale bedrag dat je jaarlijks fiscaal voordelig kunt inleggen voor je pensioen (bijvoorbeeld via een lijfrentespaarrekening of -beleggingsrekening). De inleg is aftrekbaar in box 1 tegen je marginale belastingtarief, wat een belastingbesparing kan opleveren tot 49,5%." },
      { question: "Hoeveel is de jaarruimte in 2026?", answer: "De maximale jaarruimte in 2026 is €35.589. De jaarruimte wordt berekend als 30% van de premiegrondslag (salaris − AOW-franchise van €17.545, met een maximum salaris van €137.800) minus factor A (pensioenopbouw via werkgever)." },
      { question: "Wat is reserveringsruimte?", answer: "Reserveringsruimte is de jaarruimte die je in de afgelopen 10 jaar niet hebt benut. In 2026 kun je maximaal €42.753 aan reserveringsruimte gebruiken. Je kunt jaarruimte en reserveringsruimte combineren voor een totale inleg." },
      { question: "Waar vind ik factor A?", answer: "Factor A vind je op het Uniform Pensioenoverzicht (UPO) dat je jaarlijks ontvangt van je pensioenfonds of pensioenuitvoerder. Het is de waarde van de pensioenopbouw die je in 2025 via je werkgever hebt opgebouwd. Heb je geen pensioenregeling, dan is factor A €0." },
      { question: "Wat is het belastingvoordeel van jaarruimte?", answer: "De inleg voor jaarruimte is aftrekbaar in box 1 tegen je marginale belastingtarief. Dat betekent dat je bij een inkomen tot €40.018 35,82% terugkrijgt, tot €76.817 37,48%, en daarboven 49,50%. Over het opgebouwde vermogen betaal je geen box 3-belasting, en bij uitkering in de toekomst betaal je inkomstenbelasting over de uitkeringen." },
    ],
  },
  {
    slug: "zelfstandigenaftrek-berekenen",
    faqs: [
      { question: "Hoeveel is de zelfstandigenaftrek in 2026?", answer: "In 2026 is de zelfstandigenaftrek gedaald naar €1.200. Dat is een halvering ten opzichte van 2025 (€2.470). Deze drastische afbouw is onderdeel van het Belastingplan om het verschil in belastingdruk tussen werknemers en zelfstandigen te verkleinen. Voor ondernemers die de AOW-leeftijd hebben bereikt geldt de helft: €600." },
      { question: "Wanneer heb ik recht op de startersaftrek?", answer: "Je hebt recht op startersaftrek (€2.123 extra bovenop de zelfstandigenaftrek) als je aan het urencriterium voldoet én in de 5 voorafgaande jaren maximaal 2 keer zelfstandigenaftrek hebt toegepast. De startersaftrek geldt in de eerste jaren van je onderneming en is bedoeld om startende ZZP'ers een extra belastingvoordeel te geven." },
      { question: "Hoeveel belasting betaal ik als ZZP'er over mijn winst in 2026?", answer: "Als ZZP'er betaal je inkomstenbelasting volgens 3 schijven (tot €40.018: 35,82%, tot €76.817: 37,48%, daarboven: 49,50%). Daarnaast betaal je Zvw-premie (5,43% over je winst tot ~€71.000). Je mag echter eerst de zelfstandigenaftrek (€1.200), eventuele startersaftrek (€2.123) en de MKB-winstvrijstelling (12,7% van de winst na aftrek) van je winst aftrekken. Onze calculator berekent dit volledig voor je." },
      { question: "Wat is de MKB-winstvrijstelling en hoe werkt het?", answer: "De MKB-winstvrijstelling is een aftrekpost van 12,7% op je winst ná ondernemersaftrek (zelfstandigenaftrek + startersaftrek). Het is geen vast bedrag maar een percentage, dus hoe hoger je winst, hoe hoger de vrijstelling. Over het resterende bedrag betaal je pas inkomstenbelasting. In 2026 is dit percentage ongewijzigd ten opzichte van 2025." },
    ],
  },
];

export function getCalculatorFaqs(slug: string): FaqItem[] {
  const explicit = explicitFaqs.find((e: CalculatorFaqEntry) => e.slug === slug);
  if (explicit) return explicit.faqs;
  return generateDefaultFaqs(slug);
}

function generateDefaultFaqs(slug: string): FaqItem[] {
  const name = slug.replace(/-/g, " ");
  return [
    {
      question: `Hoe werkt de ${name}?`,
      answer: `Vul de gevraagde gegevens in de calculator in. De resultaten worden direct berekend en getoond. Je kunt de resultaten delen, downloaden als PDF of per e-mail versturen.`,
    },
    {
      question: `Is de ${name} gratis?`,
      answer: `Ja, alle calculators op Rekenhet.nl zijn volledig gratis te gebruiken. Er is geen registratie nodig.`,
    },
    {
      question: `Hoe nauwkeurig is deze berekening?`,
      answer: `De berekening is gebaseerd op de meest actuele wet- en regelgeving. Het blijft een indicatie. Raadpleeg een professional voor definitief advies.`,
    },
    {
      question: `Kan ik het resultaat opslaan of delen?`,
      answer: `Ja, je kunt het resultaat kopiëren, delen via e-mail, downloaden als PDF of een deelbare link genereren met jouw ingevulde waarden.`,
    },
  ];
}