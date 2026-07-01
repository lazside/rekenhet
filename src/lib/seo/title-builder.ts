/**
 * SEO Title & Meta Description Builder
 *
 * Programmatic title/meta generation engine.
 * Uses structured templates with keyword injection to produce
 * search-optimized titles and descriptions for every page type.
 */
import type { Metadata } from "next";
import type { CalculatorMeta } from "@/data/calculators";
import type { Category } from "@/types";

// ─── Constants ──────────────────────────────────────────────────

const SITE_NAME = "Rekenhet.nl";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rekenhet.nl";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.svg`;
const SEPARATOR = "|";
const BRAND = SITE_NAME;

// ─── Page Type Templates ────────────────────────────────────────

const TITLE_TEMPLATES = {
  home: `${SITE_NAME} — Gratis Online Calculators`,
  homeMeta: "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en meer. Snel en betrouwbaar.",
  calculators: `Alle Calculators — ${SITE_NAME}`,
  calculatorsMeta: "Ontdek al onze gratis online calculators. BTW, salaris, hypotheek, BMI en meer. Overzichtelijk per categorie.",
  category: (cat: Category) =>
    `${cat.title} Calculators — ${SITE_NAME}`,
  categoryMeta: (cat: Category) =>
    `${cat.description}. Gratis online ${cat.title.toLowerCase()} calculators. Direct resultaat, geen registratie nodig.`,
  calculator: (calc: CalculatorMeta) =>
    `${calc.metaTitle || `${calc.title} — Bereken ${calc.keywords[0] || ""} Snel & Nauwkeurig`} ${SEPARATOR} ${BRAND}`,
  calculatorMeta: (calc: CalculatorMeta) =>
    calc.metaDescription ||
    `${calc.description}. Gratis online ${calc.title.toLowerCase()}. Voer je gegevens in en ontvang direct het resultaat.`,
  notFound: `Pagina niet gevonden — ${SITE_NAME}`,
} as const;

// ─── Next.js Metadata Builders ──────────────────────────────────

interface SeoMetaParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noindex?: boolean;
}

/**
 * Build a complete Next.js `Metadata` object for any page.
 * Handles canonical, OG, Twitter cards, and robots in one call.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  noindex,
}: SeoMetaParams): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

// ─── Page-specific Builders ─────────────────────────────────────

export function buildHomeMetadata(): Metadata {
  return buildMetadata({
    title: TITLE_TEMPLATES.home,
    description: TITLE_TEMPLATES.homeMeta,
    path: "/",
    keywords: [
      "rekenhet",
      "online calculator",
      "gratis rekenen",
      "btw calculator",
      "salaris calculator",
    ],
  });
}

export function buildCalculatorsListMetadata(): Metadata {
  return buildMetadata({
    title: TITLE_TEMPLATES.calculators,
    description: TITLE_TEMPLATES.calculatorsMeta,
    path: "/calculators",
    keywords: [
      "alle calculators",
      "online rekenen",
      "gratis calculators",
    ],
  });
}

export function buildCalculatorMetadata(
  calc: CalculatorMeta
): Metadata {
  return buildMetadata({
    title: TITLE_TEMPLATES.calculator(calc),
    description: TITLE_TEMPLATES.calculatorMeta(calc),
    path: `/${calc.categorySlug}/${calc.slug}`,
    keywords: calc.keywords,
  });
}

export function buildCategoryMetadata(cat: Category): Metadata {
  return buildMetadata({
    title: TITLE_TEMPLATES.category(cat),
    description: TITLE_TEMPLATES.categoryMeta(cat),
    path: `/${cat.slug}`,
  });
}

export function buildNotFoundMetadata(): Metadata {
  return buildMetadata({
    title: TITLE_TEMPLATES.notFound,
    description: "De pagina die je zoekt bestaat niet of is verplaatst.",
    path: "/404",
    noindex: true,
  });
}

// ─── URL Slug Builders ──────────────────────────────────────────

/**
 * Returns the canonical URL for a calculator page.
 */
export function getCalculatorUrl(
  categorySlug: string,
  calculatorSlug: string
): string {
  return `${SITE_URL}/${categorySlug}/${calculatorSlug}`;
}

/**
 * Returns the category URL on the site.
 */
export function getCategoryUrl(categorySlug: string): string {
  return `${SITE_URL}/${categorySlug}`;
}

// ─── Export Constants ───────────────────────────────────────────

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, SEPARATOR, TITLE_TEMPLATES };
