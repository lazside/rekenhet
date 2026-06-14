import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import LicensePlateInput from "@/components/vehicle/LicensePlateInput";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema, webApplicationSchema } from "@/lib/seo/jsonld";

const SITE_URL = "https://www.rekenhet.nl";

export const metadata: Metadata = {
  title: "Kenteken Check — Auto Gegevens & MRB Berekenen | Rekenhet.nl",
  description:
    "Voer een Nederlands kenteken in en ontdek direct merk, model, gewicht, CO₂-uitstoot, MRB (wegenbelasting) en bijtelling. Gebaseerd op RDW Open Data.",
  alternates: { canonical: `${SITE_URL}/kenteken-check` },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Rekenhet.nl",
    title: "Kenteken Check — Auto Gegevens & MRB Berekenen | Rekenhet.nl",
    description:
      "Voer een Nederlands kenteken in en ontdek direct merk, model, gewicht, CO₂-uitstoot, MRB (wegenbelasting) en bijtelling. Gebaseerd op RDW Open Data.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenteken Check — Auto Gegevens & MRB Berekenen | Rekenhet.nl",
    description:
      "Voer een Nederlands kenteken in en ontdek direct merk, model, gewicht, CO₂-uitstoot, MRB (wegenbelasting) en bijtelling. Gebaseerd op RDW Open Data.",
  },
};

export default function KentekenCheckPage() {
  return (
    <Container className="py-8 md:py-12">
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Kruimelpad">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium" aria-current="page">Kenteken Check</span>
      </nav>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
            Kenteken Check — Auto Informatie & Wegenbelasting
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Voer een Nederlands kenteken in en ontdek direct de specificaties van
            de auto, de actuele motorrijtuigenbelasting (MRB) per provincie, en
            de bijtelling voor zakelijk gebruik. Alle data is afkomstig van de
            officiële RDW Open Data API.
          </p>
        </div>

        <LicensePlateInput />
      </div>

      {/* JSON-LD structured data */}
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", item: SITE_URL },
        { name: "Kenteken Check", item: `${SITE_URL}/kenteken-check` },
      ])} />
      <JsonLd data={webApplicationSchema(
        {
          slug: "kenteken-check",
          categorySlug: "auto-vervoer",
          title: "Kenteken Check",
          description: "Voer een Nederlands kenteken in en ontdek direct merk, model, gewicht, CO₂-uitstoot, MRB en bijtelling.",
          metaTitle: "Kenteken Check — Auto Gegevens & MRB Berekenen | Rekenhet.nl",
          metaDescription: "Voer een Nederlands kenteken in en ontdek direct merk, model, gewicht, CO₂-uitstoot, MRB (wegenbelasting) en bijtelling.",
          keywords: ["kenteken check", "rdw", "wegenbelasting", "mrb", "autogegevens"],
          featured: false,
        },
        "auto-vervoer"
      )} />
    </Container>
  );
}
