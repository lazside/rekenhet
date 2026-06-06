import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import CommuteComparison from "@/components/commute/CommuteComparison";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thuiswerken vs Kantoordag — Reisafstand & Kosten Vergelijken | Rekenhet.nl",
  description: "Vergelijk de kosten van thuiswerken versus naar kantoor gaan. Bereken reisafstand, reistijd, reiskosten en besparingen met OSRM.",
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
    </Container>
  );
}
