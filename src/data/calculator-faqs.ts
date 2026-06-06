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
      { question: "Hoe wordt mijn nettosalaris berekend?", answer: "Van je bruto jaarsalaris wordt loonheffing afgetrokken. Hierbij wordt rekening gehouden met heffingskortingen, leeftijd en vakantietoeslag." },
      { question: "Wat is het verschil tussen bruto en netto salaris?", answer: "Bruto is vóór aftrek van belasting en premies. Netto is wat je op je rekening ontvangt." },
      { question: "Hoeveel belasting betaal ik over mijn salaris in 2026?", answer: "Dat hangt af van je inkomen. Gebruik de calculator voor een persoonlijke berekening." },
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
