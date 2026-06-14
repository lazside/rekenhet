import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import CommuteComparison from "@/components/commute/CommuteComparison";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema, webApplicationSchema } from "@/lib/seo/jsonld";

const SITE_URL = "https://www.rekenhet.nl";

export const metadata: Metadata = {
  title: "Thuiswerken vs Kantoordag — Reisafstand & Kosten Vergelijken | Rekenhet.nl",
  description: "Vergelijk de kosten van thuiswerken versus naar kantoor gaan. Bereken reisafstand, reistijd, reiskosten en besparingen met OSRM.",
  alternates: { canonical: `${SITE_URL}/thuiswerken-vs-kantoor` },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Rekenhet.nl",
    title: "Thuiswerken vs Kantoordag — Reisafstand & Kosten Vergelijken | Rekenhet.nl",
    description: "Vergelijk de kosten van thuiswerken versus naar kantoor gaan. Bereken reisafstand, reistijd, reiskosten en besparingen met OSRM.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuiswerken vs Kantoordag — Reisafstand & Kosten Vergelijken | Rekenhet.nl",
    description: "Vergelijk de kosten van thuiswerken versus naar kantoor gaan. Bereken reisafstand, reistijd, reiskosten en besparingen met OSRM.",
  },
};

export default function CommutePage() {
  return (
    <Container className="py-8 md:py-12">
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium" aria-current="page">Thuiswerken vs Kantoordag</span>
      </nav>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Thuiswerken vs. Kantoordag</h1>
        <p className="text-gray-600 mb-8">Vergelijk de werkelijke kosten van thuiswerken met naar kantoor gaan. Gebaseerd op OSRM-routegegevens en actuele belastingregels.</p>
        <CommuteComparison />
      </div>

      {/* JSON-LD structured data */}
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", item: SITE_URL },
        { name: "Thuiswerken vs Kantoordag", item: `${SITE_URL}/thuiswerken-vs-kantoor` },
      ])} />
      <JsonLd data={webApplicationSchema(
        {
          slug: "thuiswerken-vs-kantoor",
          categorySlug: "werk-en-inkomen",
          title: "Thuiswerken vs Kantoordag",
          description: "Vergelijk de kosten van thuiswerken versus naar kantoor gaan.",
          metaTitle: "Thuiswerken vs Kantoordag — Reisafstand & Kosten Vergelijken | Rekenhet.nl",
          metaDescription: "Vergelijk de kosten van thuiswerken versus naar kantoor gaan. Bereken reisafstand, reistijd, reiskosten en besparingen met OSRM.",
          keywords: ["thuiswerken", "kantoordag", "reiskosten", "woon-werkverkeer"],
          featured: false,
        },
        "werk-en-inkomen"
      )} />
    </Container>
  );
}
