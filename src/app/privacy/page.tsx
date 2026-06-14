import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_NAME } from "@/lib/seo/title-builder";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema } from "@/lib/seo/jsonld";

const SITE_URL = "https://www.rekenhet.nl";

export const metadata: Metadata = {
  title: `Privacybeleid — ${SITE_NAME}`,
  description:
    "Lees hoe Rekenhet.nl omgaat met jouw privacy, cookies en gegevensverwerking. Informatie over Google AdSense, Google Analytics en jouw AVG-rechten.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Rekenhet.nl",
    title: `Privacybeleid — ${SITE_NAME}`,
    description:
      "Lees hoe Rekenhet.nl omgaat met jouw privacy, cookies en gegevensverwerking. Informatie over Google AdSense, Google Analytics en jouw AVG-rechten.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacybeleid — ${SITE_NAME}`,
    description:
      "Lees hoe Rekenhet.nl omgaat met jouw privacy, cookies en gegevensverwerking. Informatie over Google AdSense, Google Analytics en jouw AVG-rechten.",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", item: SITE_URL },
        { name: "Privacybeleid", item: `${SITE_URL}/privacy` },
      ])} />
      <LegalPageLayout title="Privacybeleid" lastUpdated="1 januari 2026">
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        1. Wie is verantwoordelijk?
      </h2>
      <p>
        Rekenhet.nl is een online calculator platform dat gratis
        rekenhulpmiddelen aanbiedt. Wij zijn de verwerkingsverantwoordelijke voor
        de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.
      </p>
      <p>
        Onze websites maken gebruik van advertenties van Google AdSense om de
        dienst gratis te kunnen aanbieden. Dit brengt met zich mee dat bepaalde
        gegevens worden verwerkt, zoals hieronder beschreven.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        2. Welke gegevens verwerken wij?
      </h2>
      <p>Rekenhet.nl verwerkt de volgende (persoons)gegevens:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Geen registratiegegevens:</strong> U hoeft geen account aan te
          maken en wij slaan geen door u ingevoerde berekeningen op.
        </li>
        <li>
          <strong>Anonieme gebruiksgegevens:</strong> Wij verzamelen anonieme
          statistieken over het gebruik van de calculators via Google Analytics
          (geanonimiseerd IP-adres).
        </li>
        <li>
          <strong>Advertentiegegevens:</strong> Google AdSense plaatst cookies
          om relevante advertenties te tonen. Hierbij kunnen gegevens worden
          verzameld zoals uw IP-adres, browsertype, bezochte pagina&apos;s en
          klikgedrag.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        3. Google AdSense
      </h2>
      <p>
        Rekenhet.nl maakt gebruik van Google AdSense om advertenties te tonen.
        Google AdSense gebruikt cookies en <em>web beacons</em> om het gedrag
        van bezoekers te analyseren en gepersonaliseerde advertenties te tonen.
      </p>
      <p>Google AdSense kan de volgende gegevens verzamelen:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>IP-adres (geanonimiseerd)</li>
        <li>Browser- en apparaatinformatie</li>
        <li>Bezochte pagina&apos;s en klikgedrag</li>
        <li>Eerder bezoek aan deze website</li>
        <li>Locatie (op land- of regio-niveau)</li>
      </ul>
      <p>
        Google verwerkt deze gegevens volgens hun eigen privacybeleid. Lees
        meer op{" "}
        <a
          href="https://policies.google.com/privacy"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          policies.google.com/privacy
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        4. Cookies
      </h2>
      <p>
        Rekenhet.nl plaatst alleen cookies na uw uitdrukkelijke toestemming. U
        kunt uw toestemming op elk moment intrekken door uw
        browserinstellingen aan te passen of door uw cookievoorkeuren te
        wissen. Zie onze{" "}
        <a href="/cookies" className="text-blue-600 underline">
          cookieverklaring
        </a>{" "}
        voor een volledig overzicht.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        5. Uw rechten (AVG)
      </h2>
      <p>Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Recht op inzage van uw gegevens</li>
        <li>Recht op rectificatie van onjuiste gegevens</li>
        <li>Recht op verwijdering van uw gegevens</li>
        <li>Recht op beperking van de verwerking</li>
        <li>Recht op bezwaar tegen verwerking</li>
        <li>Recht op gegevensoverdraagbaarheid</li>
      </ul>
      <p>
        Omdat Rekenhet.nl geen accountregistratie vereist en wij geen
        persoonsgegevens opslaan anders dan via Google&apos;s diensten,
        verwijzen wij voor de uitoefening van uw rechten naar{" "}
        <a
          href="https://policies.google.com/privacy"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s privacybeleid
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        6. Contact
      </h2>
      <p>
        Heeft u vragen over dit privacybeleid? Neem dan contact met ons op via
        het contactformulier op de website.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        7. Wijzigingen
      </h2>
      <p>
        Wij behouden ons het recht voor om dit privacybeleid te wijzigen.
        Wijzigingen worden op deze pagina gepubliceerd. Raadpleeg deze pagina
        regelmatig om op de hoogte te blijven.
      </p>
    </LegalPageLayout>
    </>
  );
}
