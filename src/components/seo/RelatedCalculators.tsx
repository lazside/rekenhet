
import Link from "next/link";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";
import {
  getAllCalculators,
  getCalculatorsByCategory,
  calculatorRegistry,
} from "@/data/calculators";
import { getAllNews } from "@/data/news";
import { categories } from "@/data/categories";
import type { CalculatorMeta } from "@/data/calculators";
import { ArrowRight, Newspaper } from "lucide-react";

interface RelatedCalculatorsProps {
  currentSlug: string;
  categorySlug: string;
  currentTags?: string[];
  maxResults?: number;
}

/**
 * Related Calculators — Internal Linking Module
 *
 * Strategically links to other calculators and relevant news articles
 * to distribute PageRank and improve topical authority.
 *
 * Priority order:
 * 1. Manually curated relatedSlugs from registry (editorial pick)
 * 2. Same-category calculators (strongest topical relevance)
 * 3. Tag/keyword overlap (semantic relevance)
 * 4. Featured calculators (popularity boost)
 *
 * Falls back to cross-category suggestions when needed.
 */
export function RelatedCalculators({
  currentSlug,
  categorySlug,
  currentTags = [],
  maxResults = 4,
}: RelatedCalculatorsProps) {
  // 1. Find manually curated related calculators
  const currentCalc = calculatorRegistry.find((c) => c.slug === currentSlug);
  const curatedSlugs = currentCalc?.relatedSlugs || [];
  const curatedCalcs = curatedSlugs
    .map((slug) => calculatorRegistry.find((c) => c.slug === slug))
    .filter((c): c is CalculatorMeta => c !== undefined);

  // 2. Dynamically score remaining calculators
  const curatedSlugSet = new Set(curatedSlugs);
  const allOther = calculatorRegistry.filter(
    (c) => c.slug !== currentSlug && !curatedSlugSet.has(c.slug)
  );

  const scored = allOther.map((calc) => {
    let score = 0;

    // Same category = strongest signal
    if (calc.categorySlug === categorySlug) score += 100;

    // Tag overlap
    if (currentTags.length > 0 && calc.keywords) {
      const overlap = calc.keywords.filter((kw) =>
        currentTags.some((tag) =>
          kw.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(kw.toLowerCase())
        )
      ).length;
      score += overlap * 20;
    }

    // Featured calculators get a boost
    if (calc.featured) score += 10;

    return { calculator: calc, score };
  });

  const dynamicCalcs = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults - curatedCalcs.length)
    .map((s) => s.calculator);

  const related = [...curatedCalcs, ...dynamicCalcs].slice(0, maxResults);

  // 3. Find relevant news articles for this category
  const relatedNews = getAllNews().filter(
    (article) =>
      article.category.toLowerCase() ===
        categories.find((c) => c.slug === categorySlug)?.title.toLowerCase() ||
      article.relatedCalculators.some((rc) => rc.slug === currentSlug)
  ).slice(0, 2);

  if (related.length === 0 && relatedNews.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          Gerelateerde berekeningen
        </h2>
        <Link
          href="/calculators"
          className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Alle calculators
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.categorySlug}/${calc.slug}`}
            className="group"
          >
            <Card className="h-full transition-all group-hover:border-indigo-200 group-hover:shadow-sm">
              <CardContent className="p-4">
                <CardTitle className="text-sm group-hover:text-indigo-600 transition-colors">
                  {calc.title}
                </CardTitle>
                <CardDescription className="mt-1 text-xs line-clamp-2">
                  {calc.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Link to relevant news articles */}
      {relatedNews.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {relatedNews.map((article) => (
            <Link
              key={article.slug}
              href={`/nieuws/${article.slug}`}
              className="group"
            >
              <Card className="h-full transition-all group-hover:border-indigo-200 group-hover:shadow-sm border-dashed">
                <CardContent className="p-4 flex items-center gap-3">
                  <Newspaper className="h-5 w-5 text-indigo-400 shrink-0" />
                  <div>
                    <CardTitle className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Nieuwsartikel
                    </CardTitle>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {article.title}
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-indigo-500 ml-auto shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
