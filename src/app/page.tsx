import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight, Sparkles, BookOpen, Search,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/data/categories";
import { getAllCalculators } from "@/data/calculators";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/title-builder";
import {
  HeroSearch,
  TrustStats,
  CategoryGrid,
  PopularCalculators,
  HowItWorks,
} from "@/components/home";

export const metadata: Metadata = buildMetadata({
  title: "Online Calculators Berekenen | Rekenhet.nl",
  description:
    "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en meer. Snel, betrouwbaar en up-to-date met 2026-tarieven.",
  path: "/",
  keywords: [
    "online calculator", "gratis rekenen", "rekenhet",
    "btw berekenen", "salaris berekenen", "hypotheek berekenen",
    "bmi berekenen", "procenten berekenen", "belasting 2026",
  ],
});

// ─── Featured high-volume calculators ─────────────────────────

const POPULAR_SLUGS = [
  "bruto-netto-salaris-calculator",
  "minimumloon-2026",
  "btw-calculator",
  "zelfstandigenaftrek-berekenen",
  "belastingjaar-vergelijken",
  "energielabel-berekenen",
  "bmi-calculator",
  "maximale-hypotheek",
  "jaarruimte-berekenen",
];

function getPopularCalculators() {
  const all = getAllCalculators();
  return POPULAR_SLUGS.map((slug) => all.find((c) => c.slug === slug)).filter(Boolean) as ReturnType<typeof getAllCalculators>;
}

// ═══════════════════════════════════════════════════════════════

export default function HomePage() {
  const calculators = getAllCalculators();
  const popular = getPopularCalculators();
  const nieuwste = calculators.slice(-4).reverse();

  // Build category → calculator count map
  const countBySlug: Record<string, number> = {};
  categories.forEach((cat) => {
    countBySlug[cat.slug] = calculators.filter((c) => c.categorySlug === cat.slug).length;
  });

  return (
    <>
      <HomePageJsonLd />

      {/* ═══════ HERO ═══════ */}
      <header>
        <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-indigo-50 via-white to-amber-50/30">
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-indigo-100/40 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-100/40 blur-3xl" aria-hidden="true" />

          <Container className="relative py-16 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-5 animate-fade-in">
                <Sparkles className="mr-1 inline h-3 w-3" />
                {calculators.length} gratis online tools — Bijgewerkt juli 2026
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl text-balance">
                Slim, Snel &{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
                  Nauwkeurig
                </span>{' '}
                Berekenen
              </h1>

              <p className="mt-5 text-lg text-gray-600 max-w-lg mx-auto">
                BTW, salaris, hypotheek, BMI en meer. Al onze calculators zijn gratis,
                direct en up-to-date met de 2026-tarieven.
              </p>

              <div className="mx-auto mt-8 max-w-lg">
                <HeroSearch />
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {[
                  { label: "Bruto/Netto", href: "/werk-en-inkomen/bruto-netto-salaris-calculator" },
                  { label: "Minimumloon", href: "/werk-en-inkomen/minimumloon-2026" },
                  { label: "BTW", href: "/ondernemen/btw-calculator" },
                  { label: "BMI", href: "/gezondheid/bmi-calculator" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center rounded-full bg-white/80 border border-gray-200 px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-200"
                  >
                    {link.label}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </header>

      {/* ═══════ MAIN ═══════ */}
      <main>
        <TrustStats calculatorCount={calculators.length} categoryCount={categories.length} />
        <CategoryGrid calculatorCountBySlug={countBySlug} />
        <PopularCalculators calculators={popular} />

        {/* ── Nieuwste ── */}
        {nieuwste.length > 0 && (
          <section className="border-b border-gray-100 bg-white">
            <Container className="py-16">
              <div className="mb-8">
                <Badge variant="info" className="mb-3"><Sparkles className="mr-1 inline h-3 w-3" />Nieuw</Badge>
                <h2 className="text-2xl font-bold text-gray-900">Nieuwste calculators</h2>
                <p className="mt-2 text-sm text-gray-500">Recent toegevoegd aan ons platform</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {nieuwste.map((calc, i) => {
                  const cat = categories.find((c) => c.slug === calc.categorySlug);
                  const c = cat
                    ? { bg: cat.color.replace("bg-", "bg-"), light: `bg-${cat.color.replace("bg-", "").replace("-500", "-50")}`, text: `text-${cat.color.replace("bg-", "").replace("-500", "-700")}` }
                    : { bg: "bg-gray-500", light: "bg-gray-50", text: "text-gray-700" };
                  return (
                    <Link
                      key={calc.slug}
                      href={`/${calc.categorySlug}/${calc.slug}`}
                      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 animate-card-enter"
                      style={{ animationDelay: `${i * 0.05}s` } as React.CSSProperties}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 ${c.bg}`} />
                      {cat && <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.light} ${c.text} mb-3`}><cat.icon className="h-4 w-4" /></div>}
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">{calc.title}</p>
                      <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">{calc.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="info" className="text-[9px] px-1.5 py-0.5">Nieuw</Badge>
                        <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-indigo-500 transition-colors ml-auto" />
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <Link href="/calculators" className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-sm transition-all duration-200">
                  Alle calculators bekijken <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Container>
          </section>
        )}

        <HowItWorks calculatorCount={calculators.length} />

        {/* ── Nieuws ── */}
        <section className="border-b border-gray-100 bg-white">
          <Container className="py-16">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-3"><BookOpen className="mr-1 inline h-3 w-3" />Financieel nieuws</Badge>
              <h2 className="text-2xl font-bold text-gray-900">Blijf op de hoogte</h2>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">Prinsjesdag, belastingplan, AOW, minimumloon en meer.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/nieuws" className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
                  <BookOpen className="h-4 w-4" /> Lees het laatste nieuws <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/feed.xml" className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 hover:border-indigo-200 hover:text-indigo-600 transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="18" r="2"/><path d="M4 11a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7v-2zm0-5a14 14 0 0 1 14 14h-2a12 12 0 0 0-12-12v-2z"/></svg>
                  RSS Feed
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* ── AdSense Zone ── */}
        <section aria-label="Advertentie" className="bg-gray-50/30 border-b border-gray-100">
          <Container className="py-8">
            <div className="mx-auto min-h-[90px] w-full max-w-[728px] rounded-xl border border-dashed border-gray-200 bg-white/60 flex items-center justify-center shadow-sm" aria-hidden="true">
              <p className="text-[10px] text-gray-300 select-none">📢 Advertentie — 728×90</p>
            </div>
          </Container>
        </section>
      </main>

      {/* ═══════ CSS: Card entrance animation ═══════ */}
      <style>{`.animate-card-enter { animation: card-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }`}</style>
    </>
  );
}
