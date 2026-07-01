import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";
import { getAllContentPages } from "@/content";
import { getAllNews } from "@/data/news";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rekenhet.nl";
const BUILD_DATE = new Date();

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
    { url: `${SITE_URL}/nieuws`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.7 },

    // ── Standalone tool pages ──
    { url: `${SITE_URL}/kenteken-check`, lastModified: getFileDate("src/app/kenteken-check/page.tsx"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/gemeentelijke-belastingen`, lastModified: getFileDate("src/app/gemeentelijke-belastingen/page.tsx"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/zonnepanelen-opbrengst`, lastModified: getFileDate("src/app/zonnepanelen-opbrengst/page.tsx"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/thuiswerken-vs-kantoor`, lastModified: getFileDate("src/app/thuiswerken-vs-kantoor/page.tsx"), changeFrequency: "monthly", priority: 0.6 },

    // ── Nieuwsblog ──
    ...getAllNews().map((article) => ({
      url: `${SITE_URL}/nieuws/${article.slug}` as const,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

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

  ];

  return entries;
}
