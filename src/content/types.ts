/**
 * SEO Content Page — Type Definitions
 *
 * A content page is a data-driven landing page targeting a specific
 * keyword search intent. Each page has its own:
 *   - Full SEO metadata (title, description, H1, intro, conclusion)
 *   - FAQ data (rendered as FAQPage JSON-LD)
 *   - Calculator component reference (embeds the tool)
 *   - Category reference (breadcrumbs, related links)
 */

import type { FaqItem } from "@/types";
import type { CalculatorMeta } from "@/data/calculators";
import type { Source } from "@/components/seo/SourcesList";

// ─── Content Page Definition ───────────────────────────────────

export interface SeoContentPage {
  /** Unique URL slug (e.g., "bruto-netto-salaris-2026") */
  slug: string;

  /** SEO metadata used by generateMetadata and JSON-LD */
  seo: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    conclusion: string;
    keywords: string[];
  };

  /** Calculator component reference */
  calculator: {
    /** Slug of the calculator component to embed */
    componentSlug: string;
    /** Category slug for breadcrumbs and related links */
    categorySlug: string;
  };

  /** Frequently Asked Questions (→ FAQPage JSON-LD) */
  faqs: FaqItem[];

  /** Optional: override category display name in breadcrumbs */
  categoryLabel?: string;

  /** Optional: bronvermeldingen voor E-E-A-T */
  sources?: Source[];
}

// ─── Registry ──────────────────────────────────────────────────

/**
 * All SEO content pages are registered here.
 * Each entry becomes a statically generated page at /{slug}.
 */
const registry: SeoContentPage[] = [];

/**
 * Register one or more content pages.
 */
export function registerPages(...pages: SeoContentPage[]) {
  registry.push(...pages);
}

/**
 * Get a content page by slug.
 */
export function getContentPage(slug: string): SeoContentPage | undefined {
  return registry.find((p) => p.slug === slug);
}

/**
 * Get all registered content page slugs (for generateStaticParams).
 */
export function getAllContentSlugs(): string[] {
  return registry.map((p) => p.slug);
}

/**
 * Get all registered content pages.
 */
export function getAllContentPages(): SeoContentPage[] {
  return [...registry];
}

/**
 * Find the content page associated with a calculator slug.
 * Each content page references a calculator via `calculator.componentSlug`.
 */
export function getContentPageForCalculator(
  calculatorSlug: string,
): SeoContentPage | undefined {
  return registry.find((p) => p.calculator.componentSlug === calculatorSlug);
}
