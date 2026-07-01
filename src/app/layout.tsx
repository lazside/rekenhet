import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RootLayoutInner } from "@/components/layout/RootLayoutInner";
import { SITE_NAME } from "@/lib/seo/title-builder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rekenhet.nl";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "";
const PLAUSIBLE_URL = process.env.NEXT_PUBLIC_PLAUSIBLE_URL || "";
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";
const SHOW_ANALYTICS = !!(PLAUSIBLE_URL && PLAUSIBLE_DOMAIN);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Gratis Online Calculators`, template: `%s` },
  description: "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en meer. Snel, eenvoudig en betrouwbaar.",
  keywords: ["rekenhet", "online calculator", "gratis rekenen", "btw calculator", "salaris calculator"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", locale: "nl_NL", siteName: SITE_NAME,
    title: `${SITE_NAME} — Gratis Online Calculators`,
    description: "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid en wiskunde.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Gratis Online Calculators`,
    description: "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid en wiskunde.",
  },
  ...(GOOGLE_VERIFICATION ? { verification: { google: GOOGLE_VERIFICATION } } : {}),
  alternates: {
    canonical: SITE_URL,
    languages: {
      nl: SITE_URL,
    },
  },
};

function printDateScript(): string {
  return `document.getElementById('print-date')&&(document.getElementById('print-date').textContent=new Date().toLocaleDateString('nl-NL',{year:'numeric',month:'long',day:'numeric'}))`;
}

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid en wiskunde.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid en wiskunde.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" data-scroll-behavior="smooth">
      <head>
        <meta name="color-scheme" content="light only" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
        <script dangerouslySetInnerHTML={{ __html: printDateScript() }} />
        {SHOW_ANALYTICS && (
          <script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src={`${PLAUSIBLE_URL}/js/script.js`}
          />
        )}
      </head>
      <body className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
        <div className="print-header" aria-hidden="true">
          <strong>{SITE_NAME}</strong>
          <span>— Calculatieoverzicht</span>
          <span className="print-date" id="print-date" />
        </div>
        <RootLayoutInner>{children}</RootLayoutInner>
      </body>
    </html>
  );
}
