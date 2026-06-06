import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import SolarCalculator from "@/components/solar/SolarCalculator";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zonnepanelen Opbrengst Calculator — PVGIS | Rekenhet.nl",
  description: "Bereken de jaarlijkse opbrengst van zonnepanelen op basis van regio, dakhelling en oriëntatie. Data van de Europese PVGIS API.",
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
    </Container>
  );
}
