import Link from "next/link";
import type { Metadata } from "next";
import {
  Calculator, ArrowRight, Sparkles, Heart, BookOpen, Search, PenLine, BarChart3,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/data/categories";
import { getAllCalculators } from "@/data/calculators";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/title-builder";
import { HeroSearch } from "@/components/home/HeroSearch";

export const metadata: Metadata = buildMetadata({
  title: "Online Calculators Berekenen | Rekenhet.nl",
  description: "Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en meer. Snel, betrouwbaar en up-to-date met 2026-tarieven.",
  path: "/",
  keywords: [
    "online calculator", "gratis rekenen", "rekenhet",
    "btw berekenen", "salaris berekenen", "hypotheek berekenen",
    "bmi berekenen", "procenten berekenen", "belasting 2026",
  ],
});

// ─── Featured high-volume calculators for the popular grid ────

const POPULAR_SLUGS = [
  "bruto-netto-salaris-calculator",
  "btw-calculator",
  "zelfstandigenaftrek-berekenen",
  "energielabel-berekenen",
  "bmi-calculator",
  "maximale-hypotheek",
];

function getPopularCalculators() {
  const all = getAllCalculators();
  return POPULAR_SLUGS.map((slug) => all.find((c) => c.slug === slug)).filter(Boolean) as ReturnType<typeof getAllCalculators>;
}

// ─── Nieuwste calculators (last 4 from registry) ─────────────

function getNewestCalculators() {
  const all = getAllCalculators();
  return all.slice(-4).reverse();
}

// ─── Color mapping for category badges ───────────────────────

function getBadgeClass(color: string): string {
  const map: Record<string, string> = {
    "bg-emerald-500": "bg-emerald-100 text-emerald-700",
    "bg-blue-500": "bg-blue-100 text-blue-700",
    "bg-violet-500": "bg-violet-100 text-violet-700",
    "bg-rose-500": "bg-rose-100 text-rose-700",
    "bg-amber-500": "bg-amber-100 text-amber-700",
    "bg-slate-500": "bg-slate-100 text-slate-700",
    "bg-indigo-500": "bg-indigo-100 text-indigo-700",
  };
  return map[color] || "bg-gray-100 text-gray-700";
}

// ─── Page ────────────────────────────────────────────────────

export default function HomePage() {
  const calculators = getAllCalculators();
  const popular = getPopularCalculators();
  const nieuwste = getNewestCalculators();

  return (
    <>
      <HomePageJsonLd />

      {/* ═══════ HERO ═══════ */}
      <header>
        <section className="border-b border-gray-100 bg-gradient-to-b from-indigo-50/60 via-white to-white bg-grid-pattern">
          <Container className="py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-4">
                <Sparkles className="mr-1 inline h-3 w-3" />
                {calculators.length} gratis online tools — 2026
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Slim, Snel & Nauwkeurig
                <span className="text-amber-500"> Berekenen</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                BTW, salaris, hypotheek, BMI en meer. Al onze calculators zijn gratis,
                direct en up-to-date met de 2026-tarieven.
              </p>
              <div className="mx-auto mt-8 max-w-lg">
                <HeroSearch />
              </div>
            </div>
          </Container>
        </section>
      </header>

      {/* ═══════ MAIN ═══════ */}
      <main>

        {/* ── Trust Stats ── */}
        <section className="border-y border-gray-100 bg-gray-50/50">
          <Container className="py-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { value: calculators.length, label: "Calculators", icon: Calculator },
                { value: categories.length, label: "Categorieën", icon: BookOpen },
                { value: "2026", label: "Actuele tarieven", icon: Sparkles },
                { value: "100%", label: "Gratis te gebruiken", icon: Heart },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="mx-auto mb-1 h-5 w-5 text-indigo-500" />
                  <p className="text-xl font-bold tabular-nums text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Category Grid (alle 8 categorieën) ── */}
        <section className="border-b border-gray-100">
          <Container className="py-16">
            <h2 className="text-2xl font-bold text-gray-900">Alle categorieën</h2>
            <p className="mt-2 text-sm text-gray-500">Kies een onderwerp om te beginnen</p>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((cat) => {
                const count = calculators.filter((c) => c.categorySlug === cat.slug).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${cat.color} text-white`}>
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

        {/* ── Nieuwste Calculators (programmatisch) ── */}
        {nieuwste.length > 0 && (
          <section className="border-b border-gray-100 bg-gradient-to-r from-indigo-50/40 to-amber-50/20">
            <Container className="py-12">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                <h2 className="text-2xl font-bold text-gray-900">Nieuwste calculators</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {nieuwste.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.categorySlug}/${calc.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-400" />
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {calc.title}
                    </p>
                    <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                        Nieuw
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-indigo-500 transition-colors ml-auto" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/calculators"
                  className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Alle calculators bekijken
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* ── Populaire Calculators ── */}
        <section className="border-b border-gray-100">
          <Container className="py-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Populaire calculators</h2>
                <p className="mt-1 text-sm text-gray-500">Meest gebruikte rekentools</p>
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
              {popular.map((calc, i) => {
                const cat = categories.find((c) => c.slug === calc.categorySlug);
                const isFirst = i === 0;
                return (
                  <Link
                    key={calc.slug}
                    href={`/${calc.categorySlug}/${calc.slug}`}
                    className={`group flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                      isFirst
                        ? "sm:col-span-2 border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white hover:border-indigo-300"
                        : "border-gray-200 hover:border-indigo-200"
                    }`}
                  >
                    {cat && (
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${cat.color} text-white transition-transform duration-200 group-hover:scale-110`}>
                        <cat.icon className="h-5 w-5" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold transition-colors ${
                        isFirst ? "text-indigo-900 group-hover:text-indigo-700" : "text-gray-900 group-hover:text-indigo-600"
                      }`}>
                        {calc.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{calc.description}</p>
                    </div>
                    <ArrowRight className={`h-4 w-4 shrink-0 transition-colors ${
                      isFirst ? "text-indigo-400 group-hover:text-indigo-600" : "text-gray-300 group-hover:text-indigo-500"
                    }`} />
                  </Link>
                );
              })}
            </div>
            <div className="mt-5 text-center sm:hidden">
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

        {/* ── How It Works met icon cards ── */}
        <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50/30 to-white">
          <Container className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Hoe werkt Rekenhet.nl?</h2>
              <p className="mt-2 text-sm text-gray-500">In drie eenvoudige stappen</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
              {[
                {
                  step: "1",
                  icon: Search,
                  title: "Kies een calculator",
                  desc: "Blader door 77+ gratis calculators of gebruik de zoekfunctie om snel te vinden wat je nodig hebt.",
                },
                {
                  step: "2",
                  icon: PenLine,
                  title: "Vul je gegevens in",
                  desc: "Voer je persoonlijke situatie in — de calculator werkt met de actuele 2026-tarieven en -regels.",
                },
                {
                  step: "3",
                  icon: BarChart3,
                  title: "Zie direct het resultaat",
                  desc: "Het resultaat verschijnt direct. Pas invoer aan voor verschillende scenario's. Geen registratie nodig.",
                },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.step}
                    className="group relative rounded-xl border border-gray-200 bg-white p-6 text-center shadow-[0_1px_3px_0_rgb(0_0_0_/_0.04)] transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgb(0_0_0_/_0.08)] hover:-translate-y-1"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-amber-50 text-indigo-600 transition-transform duration-200 group-hover:scale-110">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Stap {item.step}</p>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                Al onze tools zijn 100% gratis, up-to-date met 2026 en werken op elk apparaat.
              </p>
            </div>
          </Container>
        </section>

        {/* ── CLS-safe AdSense Zone ── */}
        <section aria-label="Advertentie" className="bg-gray-50/30">
          <Container className="py-6">
            <div
              className="mx-auto min-h-[90px] w-full max-w-[728px] rounded-lg border border-dashed border-gray-200 bg-white/50 flex items-center justify-center"
              aria-hidden="true"
            >
              <p className="text-[10px] text-gray-300 select-none">Advertentie — 728×90</p>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
