import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";
import { ArrowRight, ChevronRight } from "lucide-react";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getCalculatorsByCategory, getAllCalculators } from "@/data/calculators";
import { buildCategoryMetadata } from "@/lib/seo/title-builder";
import { JsonLd } from "@/components/seo/JsonLd";
import { webApplicationSchema, breadcrumbListSchema } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/title-builder";

interface Props {
  params: Promise<{ category: string }>;
}

/**
 * Static generation — pre-render every category page.
 */
export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

/**
 * Dynamic metadata per category page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return buildCategoryMetadata(cat);
}

/**
 * Category Dashboard Page
 *
 * Lists all calculators in a specific category with rich SEO content.
 * Uses semantic HTML: <nav> (breadcrumbs), <section>, <article>.
 *
 * Routes:
 *   /werk-en-inkomen
 *   /ondernemen
 *   /geld-en-verzekeringen
 *   /gezondheid
 *   /wiskunde
 *   /algemeen
 */
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  const calculators = getCalculatorsByCategory(category);
  const allCalcs = getAllCalculators();

  if (!cat) {
    notFound();
  }

  // Other categories for cross-linking
  const otherCategories = categories.filter((c) => c.slug !== category);

  // Breadcrumbs
  const breadcrumbItems = [
    { name: "Home", item: SITE_URL },
    { name: "Alle calculators", item: `${SITE_URL}/calculators` },
    { name: cat.title, item: `${SITE_URL}/${cat.slug}` },
  ];

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={webApplicationSchema(
          {
            slug: category,
            categorySlug: category,
            title: cat.title,
            description: cat.description,
            metaTitle: `${cat.title} Calculators — Rekenhet.nl`,
            metaDescription: cat.description,
            keywords: [],
          },
          category
        )}
      />
      <JsonLd data={breadcrumbListSchema(breadcrumbItems)} />

      <Container>
        {/* Breadcrumbs */}
        <nav aria-label="Kruimelpad" className="mb-4 text-sm text-gray-500 pt-4">
          {breadcrumbItems.map((item, i) => (
            <span key={item.name}>
              {i > 0 && (
                <ChevronRight className="inline h-3 w-3 mx-1 text-gray-400" />
              )}
              {i < breadcrumbItems.length - 1 ? (
                <Link href={item.item} className="text-gray-500 hover:text-gray-700">
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-900" aria-current="page">
                  {item.name}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Category header */}
        <div className="flex items-start gap-4 mb-8">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${cat.color} text-white shadow-sm`}
          >
            <cat.icon className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {cat.title}
            </h1>
            <p className="mt-1 text-gray-600 max-w-2xl">{cat.description}</p>
            <p className="mt-1 text-sm text-gray-400">
              {calculators.length} calculator{calculators.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Calculators grid */}
        <section aria-labelledby="calculators-heading">
          <h2 id="calculators-heading" className="sr-only">
            {cat.title} calculators
          </h2>

          {calculators.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center text-gray-400">
              <p className="text-sm">
                Nog geen calculators in deze categorie.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <article key={calc.slug}>
                <Link
                  href={`/${calc.categorySlug}/${calc.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full transition-all group-hover:shadow-md group-hover:border-blue-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cat.color} text-white`}
                        >
                          <cat.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                            {calc.title}
                          </CardTitle>
                          <CardDescription className="mt-1 line-clamp-2">
                            {calc.description}
                          </CardDescription>
                          {calc.featured && (
                            <span className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                              Populair
                            </span>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 self-center" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Other categories (cross-linking for SEO) */}
        {otherCategories.length > 0 && (
          <nav aria-label="Andere categorieën" className="mt-16 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Andere categorieën
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherCategories.map((oc) => (
                <Link key={oc.slug} href={`/${oc.slug}`}>
                  <Card className="h-full cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${oc.color} text-white`}
                        >
                          <oc.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm">{oc.title}</CardTitle>
                          <CardDescription className="text-xs">
                            {oc.description}
                          </CardDescription>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-300 shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </Container>
    </>
  );
}
