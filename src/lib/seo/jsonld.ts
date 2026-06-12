/**
 * Programmatic JSON-LD Generator
 *
 * Pure functions that produce structured data objects.
 * Every page gets a strategic combination of schemas for rich snippets.
 */
import type { CalculatorMeta } from "@/data/calculators";
import type { Category, FaqItem } from "@/types";
import { SITE_URL } from "./title-builder";

// ─── Schema Type Resolution ─────────────────────────────────────

type AppCategory =
  | "UtilitiesApplication"
  | "FinanceApplication"
  | "MathApplication"
  | "HealthApplication";

/**
 * Map category slugs to the correct schema.org applicationCategory.
 */
function resolveAppCategory(slug: string): AppCategory {
  const map: Record<string, AppCategory> = {
    "werk-en-inkomen": "FinanceApplication",
    ondernemen: "FinanceApplication",
    "geld-en-verzekeringen": "FinanceApplication",
    gezondheid: "HealthApplication",
    wiskunde: "MathApplication",
    hypotheek: "FinanceApplication",
    algemeen: "UtilitiesApplication",
  };
  return map[slug] || "UtilitiesApplication";
}

// ─── Individual Schema Builders ──────────────────────────────────

/**
 * WebSite schema — placed on the homepage only.
 * Gives Google the site name and search action.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite",
    name: "Rekenhet.nl",
    url: SITE_URL,
    description:
      "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en meer.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * WebPage schema — generic page metadata.
 */
export function webpageSchema(
  name: string,
  description: string,
  path: string,
  dateModified?: string
) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    ...(dateModified ? { dateModified } : {}),
    about: {
      "@type": "Thing",
      name,
    },
  };
}

/**
 * SoftwareApplication schema — primary schema for calculator pages.
 * Triggers "Software" rich result in SERP (install button, rating).
 */
export function softwareApplicationSchema(
  calc: CalculatorMeta,
  categorySlug: string
) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "SoftwareApplication",
    name: calc.title,
    description: calc.description,
    url: `${SITE_URL}/${categorySlug}/${calc.slug}`,
    applicationCategory: resolveAppCategory(categorySlug),
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    ...(calc.keywords.length > 0
      ? { keywords: calc.keywords.join(", ") }
      : {}),
  };
}

/**
 * WebApplication schema — lighter than SoftwareApplication,
 * more appropriate for browser-based tools. Triggers "Web app" rich result.
 */
export function webApplicationSchema(
  calc: CalculatorMeta,
  categorySlug: string
) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebApplication",
    name: calc.title,
    description: calc.description,
    url: `${SITE_URL}/${categorySlug}/${calc.slug}`,
    applicationCategory: resolveAppCategory(categorySlug),
    operatingSystem: "Web",
    browserRequirements: "JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };
}

/**
 * HowTo schema — makes sense for step-by-step calculators
 * (e.g. hypotheek berekenen → stappenplan).
 */
export function howToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[]
) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * FAQPage schema — renders Q&A for rich "FAQ" SERP results.
 * This is one of the highest-CTR rich snippets.
 */
export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema — navigation breadcrumbs for every page.
 * Essential for sitelinks in SERP.
 */
export function breadcrumbListSchema(
  items: { name: string; item: string }[]
) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.item.startsWith("http") ? item.item : `${SITE_URL}${item.item}`,
    })),
  };
}

/**
 * Organization schema — builds trust signals in SERP.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Organization",
    name: "Rekenhet.nl",
    url: SITE_URL,
    description: "Gratis online calculator platform",
  };
}

/**
 * AboutPage schema — for /over-ons or /contact.
 */
export function aboutPageSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "AboutPage",
    name,
    description,
    url: SITE_URL,
  };
}

// ─── Composite Page Schemas ─────────────────────────────────────

/**
 * Homepage schema bundle.
 * Returns an array of JSON-LD objects to inject on the home page.
 */
export function homePageSchemas() {
  return [websiteSchema(), organizationSchema()];
}

/**
 * Calculator page schema bundle.
 * Returns multiple schema objects that together trigger rich results:
 * - BreadcrumbList (sitelinks)
 * - WebApplication (app rich result)
 * - FAQPage (FAQ snippet) — if FAQs provided
 * - HowTo (step-by-step) — if steps provided
 */
export function calculatorPageSchemas(
  calc: CalculatorMeta,
  category: string,
  breadcrumbs: { name: string; item: string }[],
  faqs?: FaqItem[]
) {
  const schemas: Record<string, unknown>[] = [
    breadcrumbListSchema(breadcrumbs),
    webApplicationSchema(calc, category),
  ];

  if (faqs && faqs.length > 0) {
    schemas.push(faqPageSchema(faqs));
  }

  return schemas;
}

/**
 * Category list page schema bundle.
 */
export function categoryListPageSchemas(
  category: Category
) {
  const breadcrumbs: { name: string; item: string }[] = [
    { name: "Home", item: "/" },
    { name: "Alle calculators", item: "/calculators" },
    { name: category.title, item: `/${category.slug}` },
  ];

  return [
    breadcrumbListSchema(breadcrumbs),
    webpageSchema(
      `${category.title} Calculators — Rekenhet.nl`,
      category.description,
      `/${category.slug}`
    ),
  ];
}
