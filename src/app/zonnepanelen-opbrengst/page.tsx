import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import SolarCalculator from "@/components/solar/SolarCalculator";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema, webApplicationSchema } from "@/lib/seo/jsonld";

const SITE_URL = "https://www.rekenhet.nl";

export const metadata: Metadata = {
  title: "Zonnepanelen Opbrengst Calculator — PVGIS | Rekenhet.nl",
  description: "Bereken de jaarlijkse opbrengst van zonnepanelen op basis van regio, dakhelling en oriëntatie. Data van de Europese PVGIS API.",
  alternates: { canonical: `${SITE_URL}/zonnepanelen-opbrengst` },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Rekenhet.nl",
    title: "Zonnepanelen Opbrengst Calculator — PVGIS | Rekenhet.nl",
    description: "Bereken de jaarlijkse opbrengst van zonnepanelen op basis van regio, dakhelling en oriëntatie. Data van de Europese PVGIS API.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zonnepanelen Opbrengst Calculator — PVGIS | Rekenhet.nl",
    description: "Bereken de jaarlijkse opbrengst van zonnepanelen op basis van regio, dakhelling en oriëntatie. Data van de Europese PVGIS API.",
  },
};

export default function SolarPage() {
  return (
    <Container className="py-8 md:py-12">
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium" aria-current="page">Zonnepanelen Opbrengst</span>
      </nav>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Zonnepanelen Opbrengst Calculator</h1>
        <p className="text-gray-600 mb-8">Bereken de verwachte jaarlijkse opbrengst van zonnepanelen op basis van jouw regio, dakhelling en oriëntatie. Data van de Europese PVGIS API.</p>
        <SolarCalculator />
      </div>

      {/* JSON-LD structured data */}
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", item: SITE_URL },
        { name: "Zonnepanelen Opbrengst", item: `${SITE_URL}/zonnepanelen-opbrengst` },
      ])} />
      <JsonLd data={webApplicationSchema(
        {
          slug: "zonnepanelen-opbrengst",
          categorySlug: "algemeen",
          title: "Zonnepanelen Opbrengst Calculator",
          description: "Bereken de jaarlijkse opbrengst van zonnepanelen op basis van regio, dakhelling en oriëntatie.",
          metaTitle: "Zonnepanelen Opbrengst Calculator — PVGIS | Rekenhet.nl",
          metaDescription: "Bereken de jaarlijkse opbrengst van zonnepanelen op basis van regio, dakhelling en oriëntatie.",
          keywords: ["zonnepanelen opbrengst", "zonnepanelen", "pvgis", "zonne-energie"],
          featured: false,
        },
        "algemeen"
      )} />
    </Container>
  );
}
