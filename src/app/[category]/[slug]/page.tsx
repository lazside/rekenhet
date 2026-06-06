import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { CalculatorPageJsonLd } from "@/components/seo/JsonLd";
import { RelatedCalculators } from "@/components/seo/RelatedCalculators";
import { buildCalculatorMetadata } from "@/lib/seo/title-builder";
import { getCalculatorBySlug, calculatorRegistry } from "@/data/calculators";
import { getCategoryBySlug } from "@/data/categories";
import { getCalculatorFaqs } from "@/data/calculator-faqs";
import { getCalculatorUrl, getCategoryUrl } from "@/lib/seo/title-builder";
import { getCalculatorComponent, hasCalculatorComponent } from "@/lib/calculators/component-registry";
import { CalculatorErrorBoundary } from "@/components/calculator/CalculatorErrorBoundary";
import { CalculatorSkeleton } from "@/components/calculator/CalculatorSkeleton";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return calculatorRegistry.map((calc) => ({
    category: calc.categorySlug,
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) return {};
  return buildCalculatorMetadata(calculator);
}

export default async function CalculatorPage({ params }: Props) {
  const { category, slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  const categoryMeta = getCategoryBySlug(category);
  const faqs = getCalculatorFaqs(slug);

  if (!calculator || calculator.categorySlug !== category) {
    notFound();
  }

  const CalculatorComponent = getCalculatorComponent(slug);
  const hasComponent = hasCalculatorComponent(slug);

  const breadcrumbItems = [
    { name: "Home", item: "/" },
    ...(categoryMeta
      ? [{ name: categoryMeta.title, item: getCategoryUrl(categoryMeta.slug) }]
      : []),
    { name: calculator.title, item: getCalculatorUrl(category, slug) },
  ];

  const breadcrumbNav = (
    <nav aria-label="Kruimelpad">
      {breadcrumbItems.map((item, i) => (
        <span key={item.name}>
          {i > 0 && <ChevronRight className="inline h-3 w-3 mx-1 text-gray-400" />}
          {i < breadcrumbItems.length - 1 ? (
            <Link href={item.item} className="text-gray-500 hover:text-gray-700">{item.name}</Link>
          ) : (
            <span className="text-gray-900" aria-current="page">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );

  return (
    <>
      <CalculatorPageJsonLd
        calculator={calculator}
        categorySlug={category}
        faqs={faqs.length > 0 ? faqs : undefined}
        breadcrumbs={breadcrumbItems}
      />

      <CalculatorLayout
        title={calculator.title}
        breadcrumb={breadcrumbNav}
        categorySlug={category}
        currentSlug={slug}
        description={calculator.description}
      >
        <article className="space-y-8">
          <p className="text-gray-600 leading-relaxed">
            {calculator.description}
          </p>

          {hasComponent && CalculatorComponent ? (
            <CalculatorErrorBoundary>
              <CalculatorComponent />
            </CalculatorErrorBoundary>
          ) : (
            <CalculatorSkeleton />
          )}

          {faqs.length > 0 && (
            <section className="mt-10 pt-6 border-t border-gray-100" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-lg font-semibold text-gray-900 mb-4">
                Veelgestelde vragen over {calculator.title.toLowerCase()}
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group rounded-lg border border-gray-200 [&[open]]:border-blue-200">
                    <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:text-blue-600">
                      {faq.question}
                      <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </section>
          )}

          <RelatedCalculators
            currentSlug={calculator.slug}
            categorySlug={calculator.categorySlug}
            currentTags={calculator.keywords}
          />
        </article>
      </CalculatorLayout>
    </>
  );
}
