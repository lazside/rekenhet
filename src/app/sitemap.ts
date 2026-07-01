import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";
import { getAllContentPages } from "@/content";
import citiesData from "@/data/cities.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rekenhet.nl";
const BUILD_DATE = new Date();

interface CityEntry {
  slug: string;
  name: string;
  province: string;
  postcodePrefix: string;
}

const cities = citiesData as CityEntry[];

const COMMON_AMOUNTS = [
  2000, 2500, 2800, 3000, 3200, 3500, 3800, 4000,
  4200, 4500, 4800, 5000, 5500, 6000, 6500, 7000,
  7500, 8000, 9000, 10000, 12500, 15000,
];

/** Cache file modification dates to differentiate lastModified across pages */
const FILE_DATE_CACHE = new Map<string, Date>();

function getFileDate(filePath: string): Date {
  if (FILE_DATE_CACHE.has(filePath)) return FILE_DATE_CACHE.get(filePath)!;
  try {
    const stat = fs.statSync(path.join(process.cwd(), filePath));
    FILE_DATE_CACHE.set(filePath, stat.mtime);
    return stat.mtime;
  } catch {
    return BUILD_DATE;
  }
}

function changeFreq(cat: string): "monthly" | "weekly" | "yearly" {
  const m: Record<string, "monthly" | "weekly" | "yearly"> = {
    gezondheid: "monthly", "werk-en-inkomen": "monthly",
    ondernemen: "monthly", wiskunde: "yearly",
    algemeen: "monthly", "geld-en-verzekeringen": "monthly", hypotheek: "monthly",
    "auto-vervoer": "monthly",
  };
  return m[cat] || "monthly";
}

function prio(featured?: boolean, slug?: string) {
  let b = 0.64;
  if (featured) b += 0.2;
  if (slug === "werk-en-inkomen" || slug === "geld-en-verzekeringen" || slug === "hypotheek") b += 0.08;
  return Math.min(Math.round(b * 100) / 100, 0.96);
}

/** Only include the most popular conversion pairs to avoid thin content */
function getPopularConversionPairs(): string[] {
  const PAIRS = [
    "cm-naar-m", "m-naar-cm", "mm-naar-cm", "cm-naar-mm",
    "km-naar-m", "m-naar-km", "inch-naar-cm", "cm-naar-inch",
    "gram-naar-kg", "kg-naar-gram", "mg-naar-gram", "gram-naar-mg",
    "kg-naar-pond", "pond-naar-kg", "kg-naar-lbs", "lbs-naar-kg",
    "m2-naar-cm2", "cm2-naar-m2", "m2-naar-ha", "ha-naar-m2",
    "kW-naar-pk", "pk-naar-kW", "bar-naar-psi", "psi-naar-bar",
    "Nm-naar-ft-lbs", "ft-lbs-naar-Nm",
    "kWh-naar-J", "J-naar-kWh", "BTU-naar-kWh", "kWh-naar-BTU",
    "W-naar-kW", "kW-naar-W",
    "ml-naar-l", "l-naar-ml", "cups-naar-ml", "ml-naar-fl_oz",
    "Mb-naar-MB", "MB-naar-Mb", "GB-naar-MB", "MB-naar-GB",
  ];
  return PAIRS;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = getAllCalculators();
  const contentPages = getAllContentPages();

  // Build a map of calculator slug → content page date for differentiation
  const calcContentDate = new Map<string, Date>();
  contentPages.forEach((cp) => {
    const fileDate = getFileDate(`src/content/pages/${cp.slug}.ts`);
    calcContentDate.set(cp.calculator.componentSlug, fileDate);
  });

  const entries: MetadataRoute.Sitemap = [
    // ── Core static pages (with differentiated dates) ──
    { url: SITE_URL, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/calculators`, lastModified: getFileDate("src/app/calculators/page.tsx"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/over-ons`, lastModified: getFileDate("src/app/over-ons/page.tsx"), changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/veelgestelde-vragen`, lastModified: getFileDate("src/app/veelgestelde-vragen/page.tsx"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: getFileDate("src/app/privacy/page.tsx"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: getFileDate("src/app/cookies/page.tsx"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: getFileDate("src/app/disclaimer/page.tsx"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: getFileDate("src/app/contact/page.tsx"), changeFrequency: "monthly", priority: 0.5 },

    // ── Standalone tool pages ──
    { url: `${SITE_URL}/kenteken-check`, lastModified: getFileDate("src/app/kenteken-check/page.tsx"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/gemeentelijke-belastingen`, lastModified: getFileDate("src/app/gemeentelijke-belastingen/page.tsx"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/zonnepanelen-opbrengst`, lastModified: getFileDate("src/app/zonnepanelen-opbrengst/page.tsx"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/thuiswerken-vs-kantoor`, lastModified: getFileDate("src/app/thuiswerken-vs-kantoor/page.tsx"), changeFrequency: "monthly", priority: 0.6 },

    // ── Categories ──
    ...categories.map((cat) => {
      const catDate = getFileDate(`src/app/${cat.slug}/page.tsx`);
      return {
        url: `${SITE_URL}/${cat.slug}` as const,
        lastModified: catDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    }),

    // ── All calculators ──
    ...calculators.map((calc) => {
      const contentDate = calcContentDate.get(calc.slug);
      const date = contentDate || getFileDate(`src/app/${calc.categorySlug}/${calc.slug}/page.tsx`) || BUILD_DATE;
      return {
        url: `${SITE_URL}/${calc.categorySlug}/${calc.slug}` as const,
        lastModified: date,
        changeFrequency: changeFreq(calc.categorySlug),
        priority: prio(calc.featured, calc.categorySlug),
      };
    }),

    // ── Bruto-netto/[amount] ──
    ...COMMON_AMOUNTS.map((amount) => ({
      url: `${SITE_URL}/bruto-netto/${amount}` as const,
      lastModified: getFileDate("src/app/bruto-netto/[amount]/page.tsx"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // ── Omrekenen/[pair] — only popular pairs (avoids thin content) ──
    ...getPopularConversionPairs().map((pair) => ({
      url: `${SITE_URL}/omrekenen/${pair}` as const,
      lastModified: getFileDate("src/app/omrekenen/[pair]/page.tsx"),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),

    // ── Lokale belastingen per stad ──
    ...cities.slice(0, 100).map((city) => ({
      url: `${SITE_URL}/lokaal/${city.slug}` as const,
      lastModified: getFileDate("src/data/cities.json"),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];

  return entries;
}
