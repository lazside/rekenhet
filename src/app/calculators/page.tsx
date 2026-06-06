import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";
import { buildCalculatorsListMetadata } from "@/lib/seo/title-builder";
import { JsonLd } from "@/components/seo/JsonLd";
import { webpageSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildCalculatorsListMetadata();

export default function CalculatorsPage() {
  const calculators = getAllCalculators();
  const categoriesWithCalc = categories.filter((cat) =>
    calculators.some((c) => c.categorySlug === cat.slug)
  );

  return (
    <>
      {/* JSON-LD WebPage schema */}
      <JsonLd
        data={webpageSchema(
          "Alle Calculators",
          "Alle gratis online calculators van Rekenhet.nl, overzichtelijk per categorie.",
          "/calculators"
        )}
      />

      <Container className="py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          Alle calculators
        </h1>
        <p className="text-gray-600 mb-8">
          Ontdek al onze gratis online calculators, overzichtelijk per
          categorie.
        </p>

        {categoriesWithCalc.map((cat) => {
          const catCalcs = calculators.filter(
            (c) => c.categorySlug === cat.slug
          );
          if (catCalcs.length === 0) return null;
          return (
            <section key={cat.slug} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${cat.color} text-white`}
                >
                  <cat.icon className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {cat.title}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {catCalcs.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.categorySlug}/${calc.slug}`}
                    className="group"
                  >
                    <Card className="h-full cursor-pointer transition-all group-hover:border-blue-200 group-hover:shadow-sm">
                      <CardContent className="p-4">
                        <CardTitle className="text-sm group-hover:text-blue-600 transition-colors">
                          {calc.title}
                        </CardTitle>
                        <CardDescription className="mt-1 text-xs line-clamp-2">
                          {calc.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
