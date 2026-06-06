import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SeoContentLayout } from "@/components/content/SeoContentLayout";
import { CalculatorPageJsonLd } from "@/components/seo/JsonLd";
import {
  getContentPage,
  getAllContentSlugs,
} from "@/content";
import { getCalculatorComponent, hasCalculatorComponent } from "@/lib/calculators/component-registry";
import { getCalculatorBySlug } from "@/data/calculators";
import { SITE_URL } from "@/lib/seo/title-builder";

interface Props {
  params: Promise<{ topic: string }>;
}

/**
 * Static generation — pre-render every content page at build time.
 * Adding a new file in src/content/pages/ → auto-generated page.
 */
export async function generateStaticParams() {
  return getAllContentSlugs().map((topic) => ({ topic }));
}

/**
 * Dynamic metadata per content page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const page = getContentPage(topic);
  if (!page) return {};

  const path = `/calculators/${topic}`;
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: `${SITE_URL}${path}`,
      siteName: "Rekenhet.nl",
      locale: "nl_NL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
  };
}

/**
 * SEO Content Page — data-driven landing page.
 * Rendered at /calculators/{topic}.
 * SSG — pre-rendered to pure HTML at build time.
 */
export default async function ContentPage({ params }: Props) {
  const { topic } = await params;
  const page = getContentPage(topic);

  if (!page) {
    notFound();
  }

  const CalculatorComponent = getCalculatorComponent(page.calculator.componentSlug);
  const calcMeta = getCalculatorBySlug(page.calculator.componentSlug);
  const path = `/calculators/${topic}`;

  const breadcrumbs = [
    { name: "Home", item: SITE_URL },
    { name: "Alle calculators", item: `${SITE_URL}/calculators` },
    {
      name: page.categoryLabel || page.calculator.categorySlug,
      item: `${SITE_URL}/calculators?categorie=${page.calculator.categorySlug}`,
    },
    { name: page.seo.h1, item: `${SITE_URL}${path}` },
  ];

  return (
    <>
      <CalculatorPageJsonLd
        calculator={
          calcMeta || {
            slug: page.slug,
            categorySlug: page.calculator.categorySlug,
            title: page.seo.h1,
            description: page.seo.intro,
            metaTitle: page.seo.title,
            metaDescription: page.seo.description,
            keywords: page.seo.keywords,
          }
        }
        categorySlug={page.calculator.categorySlug}
        faqs={page.faqs.length > 0 ? page.faqs : undefined}
        breadcrumbs={breadcrumbs}
      />

      <SeoContentLayout
        page={page}
        calculator={
          hasCalculatorComponent(page.calculator.componentSlug) &&
          CalculatorComponent ? (
            <CalculatorComponent />
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center text-sm text-gray-400">
              Calculator wordt geladen...
            </div>
          )
        }
      />
    </>
  );
}
