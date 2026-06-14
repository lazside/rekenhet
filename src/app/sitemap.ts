import type { MetadataRoute } from "next";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";
import unitsData from "@/data/units.json";

const SITE_URL = "https://www.rekenhet.nl";
const BUILD_DATE = new Date();

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

function changeFreq(cat: string): "monthly" | "weekly" | "yearly" {
  const m: Record<string, "monthly" | "weekly" | "yearly"> = {
    gezondheid: "monthly", "werk-en-inkomen": "monthly",
    ondernemen: "monthly", wiskunde: "yearly",
    algemeen: "monthly", "geld-en-verzekeringen": "monthly", hypotheek: "monthly",
  };
  return m[cat] || "monthly";
}

function prio(featured?: boolean, slug?: string) {
  let b = 0.64;
  if (featured) b += 0.2;
  if (slug === "werk-en-inkomen" || slug === "geld-en-verzekeringen" || slug === "hypotheek") b += 0.08;
  return Math.min(Math.round(b * 100) / 100, 0.96);
}

function getEssentialConversionPairs(): string[] {
  const POPULAR: Record<string, string[] | undefined> = {
    lengte: ["mm", "cm", "m", "km", "inch", "ft"],
    gewicht: ["mg", "g", "kg", "ton"],
    oppervlakte: ["cm2", "m2", "are", "ha", "km2"],
    "auto-vermogen": undefined,
    "auto-koppel": undefined,
    druk: undefined,
    energie: ["J", "kJ", "kcal", "kWh"],
    elektrisch: ["W", "kW", "MW"],
    inhoud: ["ml", "cl", "l"],
    "keuken-gewicht": [],
    datagrootte: ["B", "KB", "MB", "GB", "TB"],
  };
  const pairs: string[] = [];
  for (const cat of UNIT_CATEGORIES) {
    const pop = POPULAR[cat.id];
    if (pop !== undefined && pop.length === 0) continue;
    const units = pop === undefined ? cat.units : cat.units.filter(u => pop.includes(u.slug));
    for (const from of units)
      for (const to of units)
        if (from.slug !== to.slug) pairs.push(`${from.slug}-naar-${to.slug}`);
  }
  return pairs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = getAllCalculators();

  const entries: MetadataRoute.Sitemap = [
    // Static
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

    // Categories
    ...categories.map((cat) => ({
      url: `${SITE_URL}/${cat.slug}` as const,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // Calculators
    ...calculators.map((calc) => ({
      url: `${SITE_URL}/${calc.categorySlug}/${calc.slug}` as const,
      lastModified: BUILD_DATE,
      changeFrequency: changeFreq(calc.categorySlug),
      priority: prio(calc.featured, calc.categorySlug),
    })),

    // Bruto-netto/[amount]
    ...COMMON_AMOUNTS.map((amount) => ({
      url: `${SITE_URL}/bruto-netto/${amount}` as const,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Omrekenen/[pair] — alleen essentiële paren
    ...getEssentialConversionPairs().map((pair) => ({
      url: `${SITE_URL}/omrekenen/${pair}` as const,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return entries;
}
