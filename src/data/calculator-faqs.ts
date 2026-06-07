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
    slug: "btw-calculator",
    faqs: [
      { question: "Hoe bereken ik BTW over een bedrag?", answer: "Vul het bedrag in, kies het BTW-tarief (21%, 9% of 0%) en selecteer of het bedrag inclusief of exclusief BTW is." },
      { question: "Wat is het verschil tussen inclusief en exclusief BTW?", answer: "Een bedrag exclusief BTW is zonder belasting. Inclusief BTW is inclusief omzetbelasting." },
      { question: "Welke BTW-tarieven zijn er in Nederland?", answer: "21% (hoog), 9% (laag) en 0% (export)." },
      { question: "Hoeveel is €100 inclusief 21% BTW?", answer: "€100 exclusief BTW wordt €121 inclusief 21% BTW." },
    ],
  },
  {
    slug: "bruto-netto-salaris-calculator",
    faqs: [
      { question: "Hoeveel belasting betaal ik over mijn salaris in 2026?", answer: "In 2026 betaal je inkomstenbelasting volgens 3 schijven: Schijf 1 (€0 – €40.018) 35,82%, Schijf 2 (€40.018 – €76.817) 37,48%, en Schijf 3 (€76.817+) 49,50%. Over de eerste schijf betaal je ook premies volksverzekeringen (AOW, Anw, Wlz). Je krijgt daarnaast heffingskortingen: algemene heffingskorting (max €3.070) en arbeidskorting (max €5.598), die je totale belasting verlagen." },
      { question: "Wat is het verschil tussen bruto en netto salaris?", answer: "Bruto is je salaris vóór aftrek van belasting en sociale premies. Netto is wat je daadwerkelijk op je bankrekening ontvangt. Het verschil bestaat uit loonheffing (inkomstenbelasting + premies volksverzekeringen) minus heffingskortingen zoals de algemene heffingskorting en arbeidskorting. Ook je vakantiegeld (8%) en eventuele bijtelling voor een leaseauto spelen een rol." },
      { question: "Hoeveel kost een leaseauto mij netto per maand?", answer: "De netto kosten van een leaseauto hangen af van de bijtelling (meestal 22% van de cataloguswaarde) en jouw belastingtarief. De bijtelling verhoogt je belastbaar inkomen, waardoor je in een hogere schijf kunt vallen. Voorbeeld: bij een auto van €45.000 met 22% bijtelling en 49,50% marginaal tarief kost de auto je netto ongeveer €408 per maand aan extra belasting, plus eventuele eigen bijdrage. Gebruik de leaseauto-module in onze calculator voor een exacte berekening." },
      { question: "Hoe werken de algemene heffingskorting en arbeidskorting in 2026?", answer: "De algemene heffingskorting is maximaal €3.070 en bouwt af met 6,595% voor elke euro boven €24.928. De arbeidskorting is maximaal €5.598 en wordt opgebouwd in stappen: 9,8% over de eerste €11.500, 30,074% over €11.500–€23.500, en 2,685% over €23.500–€40.018. Boven €40.018 bouwt de arbeidskorting af met 6,51%. In onze calculator zie je precies waar je zit in de afbouwcurve." },
      { question: "Hoeveel netto maandloon houd ik over als ZZP'er of flexwerker?", answer: "Als ZZP'er of flexwerker kun je je netto maandinkomen berekenen op basis van je uurtarief. Bij een uurtarief van €35 verdien je bruto ongeveer €5.460 per maand bij 36 uur per week. Na belasting en premies hou je netto ongeveer €3.850–€4.200 over, afhankelijk van heffingskortingen. Gebruik de 'Uurloon → Maandinkomen' matrix in onze calculator voor een projectie bij 32, 36 en 40 uur." },
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
