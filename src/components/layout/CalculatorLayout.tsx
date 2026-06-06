import { Container } from "@/components/ui/Container";
import { AdZoneSidebar, AdZoneInline } from "@/components/ads/AdSenseBanner";
import { Calculator, Clock, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getCategoryBySlug } from "@/data/categories";
import { getCalculatorsByCategory } from "@/data/calculators";
import { ContextualOfferCard } from "@/components/affiliate/ContextualOfferCard";
import { findBestOffer } from "@/lib/affiliate/lookup";
import { CalculatorStats } from "@/components/stats/CalculatorStats";

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  showAds?: boolean;
  breadcrumb?: React.ReactNode;
  /** Category slug for sidebar content */
  categorySlug?: string;
  /** Current calculator slug (to exclude from sidebar list) */
  currentSlug?: string;
  /** Calculator description for sidebar */
  description?: string;
}

/**
 * Richer calculator page layout with a content-filled sidebar.
 *
 * Desktop: Two-column layout
 *   Main:   Calculator form + results
 *   Sidebar: Category card, how-to steps, category calculators list, ad
 *
 * Mobile:  Single column, sidebar content moves below calculator
 *
 * The sidebar is sticky and provides useful navigation context,
 * making the page feel visually rich even when the calculator
 * itself is compact.
 */
export function CalculatorLayout({
  children,
  title,
  showAds = true,
  breadcrumb,
  categorySlug,
  currentSlug,
  description,
}: CalculatorLayoutProps) {
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const categoryCalculators = categorySlug
    ? getCalculatorsByCategory(categorySlug).filter((c) => c.slug !== currentSlug)
    : [];

  return (
    <div className="min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        {breadcrumb && (
          <div className="py-4">
            <nav className="text-sm text-gray-500">{breadcrumb}</nav>
          </div>
        )}

        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {category && (
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${category.color} text-white shadow-sm shrink-0`}
              >
                <category.icon className="h-5 w-5" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h1>
              {description && (
                <p className="text-gray-500 text-sm mt-0.5 max-w-2xl">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Main Content (section — root layout already has <main>) ── */}
          <section className="flex-1 min-w-0 max-w-3xl">
            <article className="space-y-8">{children}</article>

            {/* Zone B: Inline ad below results */}
            {showAds && (
              <section className="mt-10 mb-4" aria-label="Advertentie">
                <AdZoneInline />
              </section>
            )}
          </section>

          {/* ── Sidebar (desktop only) ── */}
          <aside className="hidden lg:block w-80 shrink-0" aria-label="Zijbalk">
            <div className="space-y-5 sticky top-24">
              {/* Category card */}
              {category && (
                <section aria-label={`Categorie: ${category.title}`}>
                  <div className={`rounded-xl ${category.color} p-5 text-white shadow-sm`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                        <category.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-white/70 uppercase tracking-wider font-medium">Categorie</p>
                        <p className="text-sm font-semibold">{category.title}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">{category.description}</p>
                    <Link href={`/${category.slug}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white/90 hover:text-white transition-colors">
                      Alle {category.title.toLowerCase()} calculators <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </section>
              )}

              {/* How-to quick guide */}
              <section aria-label="Zo gebruik je deze calculator">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900">Zo gebruik je deze calculator</h3>
                  </div>
                  <ol className="space-y-2.5">
                    {[
                      "Vul je gegevens in de velden hieronder in",
                      "Pas de invoer aan voor direct resultaat",
                      "Bekijk de uitsplitsing en resultaten",
                      "Deel of download het resultaat",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              {/* Other calculators in this category */}
              {categoryCalculators.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator className="h-4 w-4 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900">
                      Meer in {category?.title || "deze categorie"}
                    </h3>
                  </div>
                  <nav className="space-y-1">
                    {categoryCalculators.slice(0, 5).map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/${calc.categorySlug}/${calc.slug}`}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                        <span>{calc.title}</span>
                      </Link>
                    ))}
                  </nav>
                  {categoryCalculators.length > 5 && (
                    <Link
                      href={`/${categorySlug}`}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Alle {categoryCalculators.length} bekijken
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              )}

              {/* Contextual affiliate offer */}
              {currentSlug && categorySlug && findBestOffer(currentSlug, categorySlug) && (
                <ContextualOfferCard
                  offer={findBestOffer(currentSlug, categorySlug)!}
                />
              )}

              {/* Stats */}
              <CalculatorStats compact />

              {/* Ad — sticky at the bottom of the sidebar */}
              {showAds && (
                <div className="pt-2">
                  <AdZoneSidebar />
                </div>
              )}
            </div>
          </aside>

          {/* Mobile-only sidebar content (repeats below calculator on mobile) */}
          <div className="lg:hidden space-y-5 mt-2">
            {category && (
              <div
                className={`rounded-xl ${category.color} p-5 text-white shadow-sm`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wider font-medium">
                      Categorie
                    </p>
                    <p className="text-sm font-semibold">{category.title}</p>
                  </div>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  {category.description}
                </p>
                <Link
                  href={`/${category.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white/90 hover:text-white transition-colors"
                >
                  Alle calculators
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}

            {categoryCalculators.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Meer calculators
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categoryCalculators.slice(0, 4).map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/${calc.categorySlug}/${calc.slug}`}
                      className="block rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {calc.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
