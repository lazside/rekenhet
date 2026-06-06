import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_NAME } from "@/lib/seo/title-builder";

export const metadata: Metadata = {
  title: `Disclaimer — ${SITE_NAME}`,
  description:
    "Lees de disclaimer van Rekenhet.nl. Berekeningen zijn indicatief en er kunnen geen rechten aan worden ontleend. Raadpleeg een professional voor financieel advies.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer & Algemene Voorwaarden" lastUpdated="1 januari 2026">
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        1. Algemeen
      </h2>
      <p>
        Rekenhet.nl is een gratis online calculator platform. Wij doen ons
        uiterste best om de calculators zo nauwkeurig mogelijk te maken, maar
        kunnen geen garanties geven over de volledigheid, juistheid of
        actualiteit van de berekeningen.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        2. Geen financieel advies
      </h2>
      <p className="font-semibold text-gray-900 bg-amber-50 border border-amber-200 rounded-lg p-4">
        BELANGRIJK: De calculators op Rekenhet.nl geven indicatieve
        berekeningen en zijn nadrukkelijk geen financieel, juridisch of
        fiscaal advies. U kunt geen rechten ontlenen aan de uitkomsten van de
        calculators.
      </p>
      <p>
        Voor salarisberekeningen, belastingaangiftes, hypotheekadvies of andere
        financiële beslissingen raden wij u altijd aan een gekwalificeerde
        adviseur te raadplegen, zoals een salarisadministrateur, belastingadviseur
        of financieel planner.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        3. Nauwkeurigheid van berekeningen
      </h2>
      <p>
        De berekeningen op Rekenhet.nl zijn gebaseerd op:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Openbare belastingtarieven en premiegegevens van de Belastingdienst
        </li>
        <li>
          Algoritmische benaderingen van standaard rekenkundige en financiële
          formules
        </li>
        <li>Schattingen op basis van gepubliceerde overheidscijfers</li>
      </ul>
      <p>
        De daadwerkelijke uitkomsten kunnen afwijken door persoonlijke
        omstandigheden, wijzigingen in wet- en regelgeving, of specifieke
        cao-afspraken. Wij adviseren u de uitkomsten altijd te verifiëren bij
        een professional.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        4. Aansprakelijkheid
      </h2>
      <p>
        Rekenhet.nl is op geen enkele wijze aansprakelijk voor enige directe
        of indirecte schade die voortvloeit uit het gebruik van de website, de
        calculators, of de verstrekte informatie. Dit omvat, maar is niet
        beperkt tot:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Vermogensschade door onjuiste berekeningen</li>
        <li>Gemiste inkomsten of besparingen</li>
        <li>Beslissingen genomen op basis van calculatoruitkomsten</li>
        <li>Technische storingen of onderbrekingen van de dienst</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        5. Beschikbaarheid
      </h2>
      <p>
        Wij streven naar een beschikbaarheid van 99,9%, maar kunnen niet
        garanderen dat de website te allen tijde toegankelijk is. Wij zijn niet
        aansprakelijk voor schade als gevolg van onderhoud, technische
        storingen of overmacht.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        6. Intellectueel eigendom
      </h2>
      <p>
        Alle rechten op de inhoud, het ontwerp en de software van Rekenhet.nl
        berusten bij ons. Het is niet toegestaan om de calculators of inhoud
        van deze website over te nemen zonder voorafgaande schriftelijke
        toestemming.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        7. Toepasselijk recht
      </h2>
      <p>
        Op deze disclaimer en het gebruik van Rekenhet.nl is Nederlands recht
        van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter
        in Nederland.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        8. Contact
      </h2>
      <p>
        Heeft u vragen over deze disclaimer? Neem dan contact met ons op via
        het contactformulier.
      </p>
    </LegalPageLayout>
  );
}
