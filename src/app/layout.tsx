import type { Metadata } from "next";
import "./globals.css";
import { RootLayoutInner } from "@/components/layout/RootLayoutInner";
import { SITE_NAME } from "@/lib/seo/title-builder";

const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Gratis Online Calculators`,
    template: `%s`,
  },
  description:
    "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en meer. Snel, eenvoudig en betrouwbaar.",
  keywords: [
    "rekenhet",
    "online calculator",
    "gratis rekenen",
    "btw calculator",
    "salaris calculator",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Gratis Online Calculators`,
    description:
      "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en meer.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Gratis Online Calculators`,
    description:
      "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en meer.",
  },
  ...(GOOGLE_VERIFICATION ? { verification: { google: GOOGLE_VERIFICATION } } : {}),
  alternates: {
    canonical: "https://www.rekenhet.nl",
  },
};

function printDateScript(): string {
  return `document.getElementById('print-date')&&(document.getElementById('print-date').textContent=new Date().toLocaleDateString('nl-NL',{year:'numeric',month:'long',day:'numeric'}))`;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        {/* ═══ Force light mode (disable browser dark mode override) ═══ */}
        <meta name="color-scheme" content="light only" />
        {/* ═══ Print date ═══ */}
        <script dangerouslySetInnerHTML={{ __html: printDateScript() }} />
      </head>
      <body>
        <div className="print-header" aria-hidden="true">
          <strong>Rekenhet.nl</strong>
          <span>— Calculatieoverzicht</span>
          <span className="print-date" id="print-date" />
        </div>
        <RootLayoutInner>{children}</RootLayoutInner>
      </body>
    </html>
  );
}
