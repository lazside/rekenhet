import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/data/categories";
import type { Category } from "@/types";

interface CategoryGridProps {
  calculatorCountBySlug: Record<string, number>;
}

/** Map category color → tailwind classes */
function catStyle(color: string): { bg: string } {
  const map: Record<string, string> = {
    "bg-emerald-500": "bg-emerald-500",
    "bg-blue-500": "bg-blue-500",
    "bg-violet-500": "bg-violet-500",
    "bg-rose-500": "bg-rose-500",
    "bg-amber-500": "bg-amber-500",
    "bg-slate-500": "bg-slate-500",
    "bg-indigo-500": "bg-indigo-500",
  };
  return { bg: map[color] || "bg-gray-500" };
}

/**
 * CategoryGrid — all 8 categories as linked cards
 */
export function CategoryGrid({ calculatorCountBySlug }: CategoryGridProps) {
  return (
    <section className="border-b border-gray-100 bg-white">
      <Container className="py-16">
        <div className="mb-8">
          <Badge variant="outline" className="mb-3">Categorieën</Badge>
          <h2 className="text-2xl font-bold text-gray-900">Alles wat je nodig hebt</h2>
          <p className="mt-2 text-sm text-gray-500 max-w-lg">
            Kies een onderwerp en ontdek alle calculators die we voor je hebben klaargezet.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {categories.map((cat, i) => {
            const count = calculatorCountBySlug[cat.slug] || 0;
            const style = catStyle(cat.color);
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 animate-card-enter"
                style={{ animationDelay: `${i * 0.05}s` } as React.CSSProperties}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${style.bg} text-white transition-transform duration-200 group-hover:scale-110`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {cat.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{count} calculators</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
