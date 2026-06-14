import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Euro } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CalculatorPageJsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME } from "@/lib/seo/title-builder";
import { getCalculatorFaqs } from "@/data/calculator-faqs";
import { calculateNetSalary } from "@/lib/calculators/bruto-netto-2026";

// ─── Pre-rendered amounts ─────────────────────────────────────

const COMMON_AMOUNTS = [
  2000, 2500, 2800, 3000, 3200, 3500, 3800, 4000,
  4200, 4500, 4800, 5000, 5500, 6000, 6500, 7000,
  7500, 8000, 9000, 10000, 12500, 15000,
];

interface Props {
  params: Promise<{ amount: string }>;
}

// ─── Dynamic Metadata ─────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount } = await params;
  const num = parseInt(amount, 10);

  if (isNaN(num) || num < 100 || num > 999999) {
    return { title: `Bruto Netto Calculator | ${SITE_NAME}` };
  }

  const title = `Hoeveel is €${num.toLocaleString("nl-NL")} bruto netto? | ${SITE_NAME}`;
  const description = `Bereken exact hoeveel nettosalaris je overhoudt van €${num.toLocaleString("nl-NL")} bruto per maand. Bekijk de loonheffing, heffingskortingen en nettototaal voor 2026.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.rekenhet.nl"}/bruto-netto/${amount}` },
  };
}

// ─── Static Paths ─────────────────────────────────────────────

export function generateStaticParams() {
  return COMMON_AMOUNTS.map((a) => ({ amount: String(a) }));
}

// ─── Page ─────────────────────────────────────────────────────

export default async function BrutoNettoAmountPage({ params }: Props) {
  const { amount } = await params;
  const num = parseInt(amount, 10);
  if (isNaN(num) || num < 100 || num > 999999) notFound();

  // Import the calculator component dynamically for browser use
  const { default: BrutoNettoCalculator } = await import(
    "@/components/calculator/BrutoNettoCalculator"
  );

  const categorySlug = "werk-en-inkomen";
  const calculatorName = "Bruto Netto Salaris Calculator";
  const canonicalUrl = `https://www.rekenhet.nl/bruto-netto/${amount}`;

  // Pre-calculate a preview for OG/schema
  const preview = calculateNetSalary({
    brutoJaar: num * 12,
    vakantiegeldInbegrepen: true,
    bijtellingPercentage: 0,
    catalogusWaarde: 0,
    algemeneHeffingskorting: true,
    arbeidskorting: true,
  });

  const faqs = getCalculatorFaqs("bruto-netto-salaris-calculator");

  return (
    <Container className="py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Kruimelpad">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${categorySlug}`} className="hover:text-gray-700">Werk & Inkomen</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${categorySlug}/bruto-netto-salaris-calculator`} className="hover:text-gray-700">
          Bruto Netto Calculator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium" aria-current="page">€{num.toLocaleString("nl-NL")}</span>
      </nav>

      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
          Hoeveel is €{num.toLocaleString("nl-NL")} bruto netto?
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-2xl">
          Van €{num.toLocaleString("nl-NL")} bruto per maand houd je netto ongeveer{" "}
          <strong className="text-emerald-700">€{preview.nettoMaand.toLocaleString("nl-NL")}</strong> over
          (op basis van 2026 belastingregels met vakantiegeld). Het exacte bedrag hangt af van
          heffingskortingen en persoonlijke situatie.
        </p>
      </div>

      {/* Calculator */}
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <Euro className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Bruto €{num.toLocaleString("nl-NL")} → Netto
              </h2>
              <p className="text-xs text-gray-500">2026 belastingregels</p>
            </div>
          </div>
          <BrutoNettoCalculator initialSalary={num} />
        </div>
      </div>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="mt-10 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Veelgestelde vragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 bg-white shadow-sm open:border-indigo-200 transition-all">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-gray-700 hover:text-indigo-600">
                  {faq.question}
                  <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD */}
      <CalculatorPageJsonLd
        calculator={{
          slug: `bruto-netto/${amount}`,
          categorySlug,
          title: calculatorName,
          description: `Bereken het nettosalaris van €${num.toLocaleString("nl-NL")} bruto per maand met de 2026 belastingregels.`,
          metaTitle: `Bruto €${num.toLocaleString("nl-NL")} naar Netto`,
          metaDescription: `Bereken exact hoeveel nettosalaris je overhoudt van €${num.toLocaleString("nl-NL")} bruto per maand.`,
          keywords: [`bruto ${amount} netto`, `${amount} euro netto`, `salaris ${amount}`],
          featured: false,
        }}
        categorySlug={categorySlug}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", item: "https://www.rekenhet.nl" },
          { name: "Werk & Inkomen", item: "https://www.rekenhet.nl/werk-en-inkomen" },
          { name: "Bruto Netto Calculator", item: "https://www.rekenhet.nl/werk-en-inkomen/bruto-netto-salaris-calculator" },
          { name: `€${num.toLocaleString("nl-NL")} bruto`, item: canonicalUrl },
        ]}
      />
    </Container>
  );
}
