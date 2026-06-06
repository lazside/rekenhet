import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import PostcodeTaxWizard from "@/components/tax/PostcodeTaxWizard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gemeentelijke Belastingen Check — OZB, Riool, Afval | Rekenhet.nl",
  description: "Ontdek de gemiddelde gemeentelijke lasten op basis van je postcode: OZB, rioolheffing en afvalstoffenheffing. Actuele CBS-tarieven.",
};

export default function LocalTaxesPage() {
  return (
    <Container className="py-8 md:py-12">
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Kruimelpad">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium" aria-current="page">Gemeentelijke Belastingen</span>
      </nav>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Gemeentelijke Belastingen Check</h1>
          <p className="text-gray-600 leading-relaxed">Voer je postcode in om de gemiddelde OZB, rioolheffing en afvalstoffenheffing in jouw gemeente te zien. Gebaseerd op CBS StatLine-data.</p>
        </div>
        <PostcodeTaxWizard />
      </div>
    </Container>
  );
}
