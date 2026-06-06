import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import LicensePlateInput from "@/components/vehicle/LicensePlateInput";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kenteken Check — Auto Gegevens & MRB Berekenen | Rekenhet.nl",
  description:
    "Voer een Nederlands kenteken in en ontdek direct merk, model, gewicht, CO₂-uitstoot, MRB (wegenbelasting) en bijtelling. Gebaseerd op RDW Open Data.",
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
    </Container>
  );
}
