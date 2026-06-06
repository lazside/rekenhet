import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Ruler, Weight, Square } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { SITE_NAME } from "@/lib/seo/title-builder";
import { CalculatorPageJsonLd } from "@/components/seo/JsonLd";
import {
  parsePair,
  validatePair,
  generateAllPairs,
  findCategoryForUnit,
} from "@/lib/units/converter";

const SITE_URL = "https://rekenhet.nl";

interface Props {
  params: Promise<{ pair: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) return { title: `Omrekenen | ${SITE_NAME}` };
  const { from, to } = parsed;
  const result = validatePair(from, to);
  if (!result.valid) return { title: `Omrekenen | ${SITE_NAME}` };
  const { fromUnit, toUnit } = result;
  return {
    title: `${fromUnit.singular} naar ${toUnit.singular} omrekenen - Snel & Gratis | ${SITE_NAME}`,
    description: `Eenvoudig en snel ${fromUnit.singular} naar ${toUnit.singular} omrekenen. Bekijk de formule, de handige omrekeningstabel en gebruik de live calculator.`,
    openGraph: {
      title: `${fromUnit.singular} naar ${toUnit.singular} omrekenen`,
      description: `Reken ${fromUnit.plural} om naar ${toUnit.plural} met de gratis calculator.`,
    },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: `${SITE_URL}/omrekenen/${pair}` },
  };
}

export function generateStaticParams() {
  return generateAllPairs().map((pair) => ({ pair }));
}

const CAT_ICONS: Record<string, { icon: typeof Ruler; label: string; example: string }> = {
  lengte: { icon: Ruler, label: "Lengte", example: "m-naar-cm" },
  gewicht: { icon: Weight, label: "Gewicht", example: "kg-naar-g" },
  oppervlakte: { icon: Square, label: "Oppervlakte", example: "ha-naar-m2" },
};

export default async function OmrekenenPage({ params }: Props) {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) notFound();

  const { from, to } = parsed;
  const validation = validatePair(from, to);
  if (!validation.valid) notFound();

  const { fromUnit, toUnit, category } = validation;

  const { default: OmrekenenCalculator } = await import(
    "@/components/units/OmrekenenCalculator"
  );

  const canonicalUrl = `${SITE_URL}/omrekenen/${pair}`;
  const otherCats = Object.keys(CAT_ICONS).filter((c) => c !== category.id);

  return (
    <Container className="py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Kruimelpad">
        <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-gray-900 font-medium" aria-current="page">
          {fromUnit.singular} naar {toUnit.singular} omrekenen
        </span>
      </nav>

      <CalculatorLayout
        title={`${fromUnit.singular} naar ${toUnit.singular} omrekenen`}
        categorySlug="algemeen"
        currentSlug={`omrekenen/${pair}`}
        description={`Reken eenvoudig ${fromUnit.plural} om naar ${toUnit.plural}. Gebruik de calculator hieronder voor directe resultaten of bekijk de omrekeningstabel.`}
      >
        <div className="space-y-6">
          <OmrekenenCalculator fromSlug={from} toSlug={to} />

          {/* Categories */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Andere categorieën</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {otherCats.map((catId) => {
                const info = CAT_ICONS[catId];
                const Icon = info?.icon || Ruler;
                return (
                  <Link
                    key={catId}
                    href={`/omrekenen/${info?.example || "m-naar-cm"}`}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center"
                  >
                    <Icon className="h-5 w-5 mx-auto text-blue-500" />
                    <p className="text-sm font-medium text-gray-900 mt-1">{info?.label || catId}</p>
                    <p className="text-[10px] text-gray-400">Bekijken</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </CalculatorLayout>

      {/* JSON-LD */}
      <CalculatorPageJsonLd
        calculator={{
          slug: `omrekenen/${pair}`,
          categorySlug: "algemeen",
          title: `${fromUnit.singular} naar ${toUnit.singular} omrekenen`,
          description: `Reken ${fromUnit.plural} om naar ${toUnit.plural} met de gratis calculator.`,
          metaTitle: `${fromUnit.singular} naar ${toUnit.singular} omrekenen`,
          metaDescription: `Eenvoudig ${fromUnit.singular} naar ${toUnit.singular} omrekenen.`,
          keywords: [`${from} naar ${to}`, `omrekenen ${from} ${to}`, `${from} ${to} converter`],
          featured: false,
        }}
        categorySlug="algemeen"
        breadcrumbs={[
          { name: "Home", item: SITE_URL },
          { name: "Omrekenen", item: `${SITE_URL}/omrekenen` },
          { name: `${fromUnit.singular} → ${toUnit.singular}`, item: canonicalUrl },
        ]}
      />
    </Container>
  );
}
