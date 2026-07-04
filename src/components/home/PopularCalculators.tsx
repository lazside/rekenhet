import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/data/categories";
import type { CalculatorMeta } from "@/data/calculators";

interface PopularCalculatorsProps {
  calculators: CalculatorMeta[];
}

/** Map category color to style */
function catStyle(color: string): { bg: string; text: string; light: string } {
  const map: Record<string, { bg: string; text: string; light: string }> = {
    "bg-emerald-500": { bg: "bg-emerald-500", text: "text-emerald-700", light: "bg-emerald-50" },
    "bg-blue-500":    { bg: "bg-blue-500",    text: "text-blue-700",    light: "bg-blue-50" },
    "bg-violet-500":  { bg: "bg-violet-500",  text: "text-violet-700",  light: "bg-violet-50" },
    "bg-rose-500":    { bg: "bg-rose-500",    text: "text-rose-700",    light: "bg-rose-50" },
    "bg-amber-500":   { bg: "bg-amber-500",   text: "text-amber-700",   light: "bg-amber-50" },
    "bg-slate-500":   { bg: "bg-slate-500",   text: "text-slate-700",   light: "bg-slate-50" },
    "bg-indigo-500":  { bg: "bg-indigo-500",  text: "text-indigo-700",  light: "bg-indigo-50" },
  };
  return map[color] || { bg: "bg-gray-500", text: "text-gray-700", light: "bg-gray-50" };
}

/**
 * PopularCalculators — grid of featured calculator cards
 *
 * Each card shows a category-colored top accent line,
 * category icon, title, description, and badge.
 */
export function PopularCalculators({ calculators }: PopularCalculatorsProps) {
  return (
    <section className="border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/30">
      <Container className="py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <Badge variant="warning" className="mb-3">
              <TrendingUp className="mr-1 inline h-3 w-3" />
              Populair
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">Meest gebruikt</h2>
            <p className="mt-2 text-sm text-gray-500">Onze populairste rekentools, door duizenden gebruikt</p>
          </div>
          <Link
            href="/calculators"
            className="hidden items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors sm:flex"
          >
            Alle calculators
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc, i) => {
            const cat = categories.find((c) => c.slug === calc.categorySlug);
            const style = cat ? catStyle(cat.color) : { bg: "bg-gray-500", text: "text-gray-700", light: "bg-gray-50" };
            return (
              <Link
                key={calc.slug}
                href={`/${calc.categorySlug}/${calc.slug}`}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 animate-card-enter"
                style={{ animationDelay: `${i * 0.05}s` } as React.CSSProperties}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 opacity-60 ${style.bg}`} />
                <div className="flex items-start gap-3">
                  {cat && (
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${style.bg} text-white transition-transform duration-200 group-hover:scale-110`}>
                      <cat.icon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {calc.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {calc.description}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${style.light} ${style.text}`}>
                        {cat?.title || calc.categorySlug}
                      </span>
                      <ArrowRight className="h-3 w-3 text-gray-300 group-hover:text-indigo-500 transition-colors ml-auto" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Alle calculators bekijken
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
