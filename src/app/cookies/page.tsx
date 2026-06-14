import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_NAME } from "@/lib/seo/title-builder";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema } from "@/lib/seo/jsonld";

const SITE_URL = "https://www.rekenhet.nl";

export const metadata: Metadata = {
  title: `Cookieverklaring — ${SITE_NAME}`,
  description:
    "Overzicht van cookies die Rekenhet.nl gebruikt, waaronder Google AdSense cookies voor advertenties, en hoe u uw cookievoorkeuren kunt beheren.",
  alternates: { canonical: `${SITE_URL}/cookies` },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Rekenhet.nl",
    title: `Cookieverklaring — ${SITE_NAME}`,
    description:
      "Overzicht van cookies die Rekenhet.nl gebruikt, waaronder Google AdSense cookies voor advertenties, en hoe u uw cookievoorkeuren kunt beheren.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Cookieverklaring — ${SITE_NAME}`,
    description:
      "Overzicht van cookies die Rekenhet.nl gebruikt, waaronder Google AdSense cookies voor advertenties, en hoe u uw cookievoorkeuren kunt beheren.",
  },
};

export default function CookiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", item: SITE_URL },
        { name: "Cookieverklaring", item: `${SITE_URL}/cookies` },
      ])} />
      <LegalPageLayout title="Cookieverklaring" lastUpdated="1 januari 2026">
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        1. Wat zijn cookies?
      </h2>
      <p>
        Cookies zijn kleine tekstbestandjes die door uw browser worden opgeslagen
        op uw apparaat wanneer u een website bezoekt. Ze helpen websites om
        functioneel te blijven, de gebruikerservaring te verbeteren en relevante
        advertenties te tonen.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        2. Welke cookies gebruikt Rekenhet.nl?
      </h2>

      <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
        2.1 Functionele cookies
      </h3>
      <p>
        Deze cookies zijn noodzakelijk voor de werking van de website. Ze worden
        zonder toestemming geplaatst omdat de website anders niet correct
        functioneert.
      </p>
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-3 py-2 font-medium text-gray-700 border border-gray-200">Cookie</th>
              <th className="text-left px-3 py-2 font-medium text-gray-700 border border-gray-200">Doel</th>
              <th className="text-left px-3 py-2 font-medium text-gray-700 border border-gray-200">Bewaartermijn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border border-gray-200 font-mono text-xs">rekenhet-cookie-consent</td>
              <td className="px-3 py-2 border border-gray-200">Cookie toestemmingsvoorkeur</td>
              <td className="px-3 py-2 border border-gray-200">Permanent</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
        2.2 Advertentiecookies (Google AdSense)
      </h3>
      <p>
        Rekenhet.nl gebruikt Google AdSense om advertenties te tonen. Deze
        cookies worden <strong>alleen geplaatst na uw uitdrukkelijke toestemming</strong>.
        Google AdSense gebruikt cookies om:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Advertenties af te stemmen op uw interesses</li>
        <li>Het aantal keren dat u een advertentie ziet te beperken</li>
        <li>De effectiviteit van advertentiecampagnes te meten</li>
        <li>Fraude te voorkomen</li>
      </ul>
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-3 py-2 font-medium text-gray-700 border border-gray-200">Cookie</th>
              <th className="text-left px-3 py-2 font-medium text-gray-700 border border-gray-200">Doel</th>
              <th className="text-left px-3 py-2 font-medium text-gray-700 border border-gray-200">Bewaartermijn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border border-gray-200 font-mono text-xs">_ga, _gid, _gat</td>
              <td className="px-3 py-2 border border-gray-200">Google Analytics (geanonimiseerd)</td>
              <td className="px-3 py-2 border border-gray-200">2 jaar / 24 uur / 1 min</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200 font-mono text-xs">NID</td>
              <td className="px-3 py-2 border border-gray-200">Google AdSense voorkeuren</td>
              <td className="px-3 py-2 border border-gray-200">6 maanden</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200 font-mono text-xs">IDE</td>
              <td className="px-3 py-2 border border-gray-200">Google AdSense advertenties</td>
              <td className="px-3 py-2 border border-gray-200">13 maanden</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-200 font-mono text-xs">pagead/1p-user-list</td>
              <td className="px-3 py-2 border border-gray-200">Advertentietracking</td>
              <td className="px-3 py-2 border border-gray-200">Sessie</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        3. Toestemming beheren
      </h2>
      <p>
        U kunt uw cookievoorkeuren op elk moment aanpassen via:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Browserinstellingen:</strong> De meeste browsers bieden de
          mogelijkheid om cookies te blokkeren of te verwijderen via de
          instellingen.
        </li>
        <li>
          <strong>Google&apos;s advertentie-instellingen:</strong> Bezoek{" "}
          <a
            href="https://adssettings.google.com"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            adssettings.google.com
          </a>{" "}
          om gepersonaliseerde advertenties uit te schakelen.
        </li>
        <li>
          <strong>Cookieconsent wissen:</strong> Verwijder de
          &quot;rekenhet-cookie-consent&quot; cookie uit uw browser om de
          cookiebanner opnieuw te zien.
        </li>
      </ul>
      <p>
        Het uitschakelen van cookies kan invloed hebben op de functionaliteit
        van de website.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        4. Cookieverklaring wijzigen
      </h2>
      <p>
        Wij kunnen deze cookieverklaring periodiek bijwerken. Wijzigingen worden
        op deze pagina gepubliceerd. Controleer deze pagina regelmatig voor de
        meest actuele informatie.
      </p>
    </LegalPageLayout>
    </>
  );
}
