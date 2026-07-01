
import Link from "next/link";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";
import {
  getAllCalculators,
  getCalculatorsByCategory,
} from "@/data/calculators";
import { CalculatorMeta } from "@/data/calculators";
import { ArrowRight } from "lucide-react";

interface RelatedCalculatorsProps {
  currentSlug: string;
  categorySlug: string;
  currentTags?: string[];
  maxResults?: number;
}

/**
 * Related Calculators — Internal Linking Module
 *
 * Strategically links to other calculators to distribute PageRank.
 * Priority order:
 * 1. Same-category calculators (strongest topical relevance)
 * 2. Tag/keyword overlap (semantic relevance)
 * 3. Featured calculators (editorial pick)
 *
 * Excludes the current calculator from results.
 */
export function RelatedCalculators({
  currentSlug,
  categorySlug,
  currentTags = [],
  maxResults = 4,
}: RelatedCalculatorsProps) {
  // All calculators except current
  const allOther = getAllCalculators().filter((c) => c.slug !== currentSlug);

  // Score each candidate for relevance
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

  // Sort by score descending, take top N
  const related = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((s) => s.calculator);

  if (related.length === 0) return null;

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
    </section>
  );
}
