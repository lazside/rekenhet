import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { UpdatesTimeline } from "@/components/updates/UpdatesTimeline";
import { ChevronRight, Sparkles, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import updatesData from "@/data/updates.json";

export const metadata: Metadata = {
  title: "Updates & Wetgeving — Calculator Wijzigingen | Rekenhet.nl",
  description:
    "Blijf op de hoogte van alle wijzigingen aan Rekenhet.nl: nieuwe calculators, fiscale wetswijzigingen, bugfixes en optimalisaties.",
  openGraph: {
    title: "Updates & Wetgeving — Rekenhet.nl",
    description: "Blijf op de hoogte van alle calculator-updates en fiscale wijzigingen.",
  },
};

export default function UpdatesPage() {
  const updates = (updatesData as { updates: any[] }).updates;

  return (
    <Container className="py-10 md:py-16">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-500" aria-label="Kruimelpad">
        <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <ChevronRight className="inline h-3 w-3 mx-1 text-gray-400" />
        <span className="text-gray-900" aria-current="page">Updates & Wetgeving</span>
      </nav>

      {/* Page header */}
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3 flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-blue-600" />
          Updates & Wetgeving
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Hier vind je een overzicht van alle wijzigingen aan Rekenhet.nl. Van
          nieuwe calculators en fiscale wetswijzigingen tot bugfixes en
          optimalisaties — we houden je graag op de hoogte.
        </p>
      </div>

      {/* Newsletter CTA */}
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">Blijf op de hoogte</h2>
              <p className="text-sm text-blue-200 leading-relaxed">
                Ontvang fiscale wijzigingen en nieuwe calculators direct in je mailbox.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap"
          >
            Schrijf je in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Timeline */}
      <UpdatesTimeline updates={updates} />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Updates & Wetgeving — Rekenhet.nl",
            description:
              "Overzicht van alle wijzigingen aan Rekenhet.nl, waaronder nieuwe calculators, fiscale wetswijzigingen en optimalisaties.",
            publisher: {
              "@type": "Organization",
              name: "Rekenhet.nl",
              url: "https://rekenhet.nl",
            },
            mainEntity: updates.map((u: any) => ({
              "@type": "TechArticle",
              headline: u.title,
              datePublished: u.date,
              dateModified: u.date,
              version: u.version,
              about: {
                "@type": "Thing",
                name: u.type,
              },
            })),
          }),
        }}
      />
    </Container>
  );
}
