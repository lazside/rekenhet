import { Container } from "@/components/ui/Container";
import { AdZoneInline } from "@/components/ads/AdSenseBanner";
import { RelatedCalculators } from "@/components/seo/RelatedCalculators";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { SeoContentPage } from "@/content/types";

interface SeoContentLayoutProps {
  page: SeoContentPage;
  /** The calculator React node to embed */
  calculator: React.ReactNode;
}

/**
 * SEO Content Page Layout
 *
 * Renders a fully-optimized landing page from structured content data:
 *
 *   1. Breadcrumbs → H1 title → SEO intro paragraph
 *   2. Embedded calculator component (interactive tool)
 *   3. Ad inline zone (below calculator)
 *   4. FAQ section (with expandable <details>)
 *   5. SEO conclusion paragraph
 *   6. Related calculators (internal linking module)
 *
 * This layout is shared by all programmatic SEO pages.
 */
export function SeoContentLayout({ page, calculator }: SeoContentLayoutProps) {
  const { seo, faqs, calculator: calcRef } = page;

  return (
    <Container>
      <div className="flex gap-6">
        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* Breadcrumbs */}
          <nav className="mb-4 text-sm text-gray-500" aria-label="Kruimelpad">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="inline h-3 w-3 mx-1 text-gray-400" />
            <Link
              href={`/${calcRef.categorySlug}`}
              className="text-gray-500 hover:text-gray-700"
            >
              {page.categoryLabel || calcRef.categorySlug}
            </Link>
            <ChevronRight className="inline h-3 w-3 mx-1 text-gray-400" />
            <span className="text-gray-900" aria-current="page">
              {seo.h1}
            </span>
          </nav>

          {/* H1 */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            {seo.h1}
          </h1>

          {/* SEO Intro Paragraph */}
          <p className="text-gray-600 leading-relaxed mb-8">{seo.intro}</p>

          {/* Embedded Calculator */}
          <div className="mb-8">{calculator}</div>

          {/* Ad Zone B: Below results */}
          <div className="mt-8 mb-8">
            <AdZoneInline />
          </div>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section className="mb-10" aria-labelledby="faq-heading">
              <h2
                id="faq-heading"
                className="text-lg font-semibold text-gray-900 mb-4"
              >
                Veelgestelde vragen
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-lg border border-gray-200 [&[open]]:border-blue-200"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:text-blue-600">
                      {faq.question}
                      <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-90 shrink-0" />
                    </summary>
                    <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Conclusion */}
          <section className="rounded-xl bg-gray-50 p-6 mb-8">
            <p className="text-gray-700 leading-relaxed">{seo.conclusion}</p>
          </section>

          {/* Internal linking */}
          <RelatedCalculators
            currentSlug={page.slug}
            categorySlug={calcRef.categorySlug}
            currentTags={seo.keywords}
            maxResults={3}
          />
        </main>

        {/* Zone A: Sidebar ad — desktop only */}
        <aside
          className="hidden lg:block w-[160px] xl:w-[300px] shrink-0"
          aria-label="Advertentie zijbalk"
        >
          <div className="sticky top-24">
            <div className="min-h-[600px] w-[160px] lg:w-[300px] flex items-center justify-center rounded-lg bg-gray-50 text-xs text-gray-400">
              Advertentie
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
