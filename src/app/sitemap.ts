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
import unitsData from "@/data/units.json";

const SITE_URL = "https://www.rekenhet.nl";

// Build timestamp — één momentopname, voorkomt dat alle 600+ URL's
// een identieke "nu" timestamp krijgen bij elke build.
const BUILD_DATE = new Date();

// Type voor een unit-categorie uit units.json
interface UnitCategory {
  id: string;
  name: string;
  baseUnit: string;
  units: { id: string; slug: string }[];
}

const UNIT_CATEGORIES = (unitsData as { categories: UnitCategory[] }).categories;

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

/**
 * Genereer énkel de meest nuttige omrekenparen voor de sitemap.
 * Per categorie houden we alleen paren tussen de populairste eenheden.
 * Dit schrapt ~360 niche-paren (zoals g-honing-naar-g-rijst)
 * die de sitemap verdunnen en Google's crawl-budget verspillen.
 */
function getEssentialConversionPairs(): string[] {
  // Populaire eenheden per categorie
  const POPULAR_UNITS: Record<string, string[] | undefined> = {
    lengte: ["mm", "cm", "m", "km", "inch", "ft"],
    gewicht: ["mg", "g", "kg", "ton"],
    oppervlakte: ["cm2", "m2", "are", "ha", "km2"],
    "auto-vermogen": undefined, // undefined = alle units bewaren
    "auto-koppel": undefined,
    druk: undefined,
    energie: ["J", "kJ", "kcal", "kWh"],
    elektrisch: ["W", "kW", "MW"],
    inhoud: ["ml", "cl", "l"],
    "keuken-gewicht": [],      // leeg = helemaal overslaan
    datagrootte: ["B", "KB", "MB", "GB", "TB"],
  };

  const pairs: string[] = [];
  for (const cat of UNIT_CATEGORIES) {
    const popular = POPULAR_UNITS[cat.id];
    // undefined = alle units bewaren, [] = overslaan, [...] = filteren
    if (popular !== undefined && popular.length === 0) continue;
    const units = popular === undefined ? cat.units : cat.units.filter(u => popular.includes(u.slug));

    for (const from of units) {
      for (const to of units) {
        if (from.slug !== to.slug) {
          pairs.push(`${from.slug}-naar-${to.slug}`);
        }
      }
    }
  }
  return pairs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = getAllCalculators();
  const contentPages = getAllContentPages();

  // ── Static Pages (wekelijks vernieuwd) ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/calculators`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/kenteken-check`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/gemeentelijke-belastingen`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/zonnepanelen-opbrengst`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/thuiswerken-vs-kantoor`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/disclaimer`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.3 },
  ];

  // ── Category Dashboard Pages ──
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Calculator Tool Pages (lagere prioriteit dan statisch) ──
  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${SITE_URL}/${calc.categorySlug}/${calc.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: changeFreqForCategory(calc.categorySlug),
    priority: calcPriority(calc.featured, calc.categorySlug),
  }));

  // ── SEO Content Pages ──
  const contentPageEntries: MetadataRoute.Sitemap = contentPages.map((page) => ({
    url: `${SITE_URL}/calculators/${page.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: calcPriority(true, page.calculator.categorySlug),
  }));

  // ── Parameterized: bruto-netto/[amount] ──
  const brutoNettoPages: MetadataRoute.Sitemap = COMMON_AMOUNTS.map((amount) => ({
    url: `${SITE_URL}/bruto-netto/${amount}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Parameterized: omrekenen/[pair] — alleen essentiële paren ──
  const conversionPages: MetadataRoute.Sitemap = getEssentialConversionPairs().map((pair) => ({
    url: `${SITE_URL}/omrekenen/${pair}`,
    lastModified: BUILD_DATE,
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
