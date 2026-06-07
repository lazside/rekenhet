/**
 * Dynamic Sitemap Generator
 *
 * Includes ALL statically generated routes:
 *   - Static pages (home, calculators listing, legal)
 *   - Category dashboard pages
 *   - Calculator tool pages (from data registry)
 *   - SEO content/guide pages (from content registry)
 *   - Parameterized bruto-netto/[amount] pages
 *   - Unit conversion /omrekenen/[pair] pages
 */
import type { MetadataRoute } from "next";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";
import { getAllContentPages } from "@/content";
import { generateAllPairs } from "@/lib/units/converter";

const SITE_URL = "https://www.rekenhet.nl";

const COMMON_AMOUNTS = [
  2000, 2500, 2800, 3000, 3200, 3500, 3800, 4000,
  4200, 4500, 4800, 5000, 5500, 6000, 6500, 7000,
  7500, 8000, 9000, 10000, 12500, 15000,
];

function changeFreqForCategory(categorySlug: string): "monthly" | "weekly" | "yearly" {
  const freqMap: Record<string, "monthly" | "weekly" | "yearly"> = {
    gezondheid: "monthly",
    "werk-en-inkomen": "monthly",
    ondernemen: "monthly",
    wiskunde: "yearly",
    algemeen: "monthly",
    "geld-en-verzekeringen": "monthly",
    hypotheek: "monthly",
  };
  return freqMap[categorySlug] || "monthly";
}

function calcPriority(featured?: boolean, categorySlug?: string): number {
  let base = 0.64;
  if (featured) base += 0.2;
  if (categorySlug === "werk-en-inkomen" || categorySlug === "geld-en-verzekeringen" || categorySlug === "hypotheek")
    base += 0.08;
  return Math.min(Math.round(base * 100) / 100, 0.96);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = getAllCalculators();
  const contentPages = getAllContentPages();

  // ── Static Pages ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/calculators`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/updates`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/kenteken-check`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/gemeentelijke-belastingen`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/zonnepanelen-opbrengst`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/thuiswerken-vs-kantoor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  // ── Category Dashboard Pages ──
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Calculator Tool Pages ──
  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${SITE_URL}/${calc.categorySlug}/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: changeFreqForCategory(calc.categorySlug),
    priority: calcPriority(calc.featured, calc.categorySlug),
  }));

  // ── SEO Content Pages (guides, keyword-specific) ──
  const contentPageEntries: MetadataRoute.Sitemap = contentPages.map((page) => ({
    url: `${SITE_URL}/calculators/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: calcPriority(true, page.calculator.categorySlug),
  }));

  // ── Parameterized: bruto-netto/[amount] ──
  const brutoNettoPages: MetadataRoute.Sitemap = COMMON_AMOUNTS.map((amount) => ({
    url: `${SITE_URL}/bruto-netto/${amount}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Parameterized: omrekenen/[pair] ──
  const conversionPages: MetadataRoute.Sitemap = generateAllPairs().map((pair) => ({
    url: `${SITE_URL}/omrekenen/${pair}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...calculatorPages,
    ...contentPageEntries,
    ...brutoNettoPages,
    ...conversionPages,
  ];
}
