import Link from"next/link";
import type { Metadata } from"next";
import {
 Calculator,
 ArrowRight,
 TrendingUp,
 Car,
 Home,
 Percent,
 Heart,
 PiggyBank,
 Receipt,
 Baby,
 Sparkles,
 BookOpen,
 type LucideIcon,
} from"lucide-react";
import { Container } from"@/components/ui/Container";
import { Badge } from"@/components/ui/Badge";
import { categories } from"@/data/categories";
import { getAllCalculators } from"@/data/calculators";
import { HomePageJsonLd } from"@/components/seo/JsonLd";
import { buildHomeMetadata } from"@/lib/seo/title-builder";
import { HeroSearch } from"@/components/home/HeroSearch";
import updatesData from"@/data/updates.json";

export const metadata: Metadata = buildHomeMetadata();

// ─── Hub Categories (4 flagship spokes) ────────────────────────

interface HubCategory {
 title: string;
 emoji: string;
 description: string;
 accent: string;
 icon: LucideIcon;
 href: string;
 calcCount: number;
}

const hubCategories: HubCategory[] = [
 {
 title:"Werk & ZZP",
 emoji:"💼",
 description:"Salaris, uurtarief, vakantiegeld, ontslagvergoeding en meer",
 accent:"emerald",
 icon: TrendingUp,
 href:"/werk-en-inkomen",
 calcCount: 14,
 },
 {
 title:"Auto & RDW",
 emoji:"🚗",
 description:"Kenteken check, wegenbelasting, ritkosten, snelheidsboetes",
 accent:"blue",
 icon: Car,
 href:"/auto-vervoer",
 calcCount: 4,
 },
 {
 title:"Hypotheek & Huis",
 emoji:"🏠",
 description:"Maximale hypotheek, maandlasten, extra aflossen, subsidies",
 accent:"indigo",
 icon: Home,
 href:"/geld-en-verzekeringen",
 calcCount: 22,
 },
 {
 title:"Wiskunde & Omrekenen",
 emoji:"🧮",
 description:"Procenten, eenheden, oppervlakte, data, energie, koken",
 accent:"slate",
 icon: Percent,
 href:"/wiskunde",
 calcCount: 13,
 },
];

const accentMap: Record<string, { bg: string; badge: string }> = {
 emerald: { bg:"bg-emerald-500", badge:"bg-emerald-100 text-emerald-700" },
 blue: { bg:"bg-blue-500", badge:"bg-blue-100 text-blue-700" },
 indigo: { bg:"bg-indigo-500", badge:"bg-indigo-100 text-indigo-700" },
 slate: { bg:"bg-slate-500", badge:"bg-slate-100 text-slate-700" },
};

// ─── Popular Tools ─────────────────────────────────────────────

interface PopularTool {
 title: string;
 description: string;
 icon: LucideIcon;
 iconBg: string;
 href: string;
}

const popularTools: PopularTool[] = [
 { title:"Bruto / Netto Salaris", description:"Bereken je netto maandloon", icon: Calculator, iconBg:"bg-emerald-100 text-emerald-600", href:"/werk-en-inkomen/bruto-netto-salaris-calculator" },
 { title:"BTW Calculator", description:"Incl. / excl. BTW met 21%, 9% of 0%", icon: Receipt, iconBg:"bg-blue-100 text-blue-600", href:"/ondernemen/btw-calculator" },
 { title:"BMI Calculator", description:"Body Mass Index + gezond advies", icon: Heart, iconBg:"bg-rose-100 text-rose-600", href:"/gezondheid/bmi-calculator" },
 { title:"Maximale Hypotheek", description:"Wat kun je maximaal lenen?", icon: Home, iconBg:"bg-indigo-100 text-indigo-600", href:"/geld-en-verzekeringen/maximale-hypotheek" },
 { title:"Zwangerschap", description:"Uitgerekende datum + week", icon: Baby, iconBg:"bg-pink-100 text-pink-600", href:"/gezondheid/zwangerschap" },
 { title:"Caloriebehoefte", description:"BMR, onderhoud, afvallen", icon: PiggyBank, iconBg:"bg-orange-100 text-orange-600", href:"/gezondheid/caloriebehoefte" },
];

// ─── Page ──────────────────────────────────────────────────────

export default function HomePage() {
 return (
 <>
 <HomePageJsonLd />

 {/* ═══════ HERO ═══════ */}
 <header>
 <section className="border-b border-gray-100 bg-gradient-to-b from-blue-50/50 to-white">
 <Container className="py-16 md:py-24">
 <div className="mx-auto max-w-2xl text-center">
 <Badge variant="info" className="mb-4">
 <Sparkles className="mr-1 inline h-3 w-3" />
 Gratis online tools — 2026
 </Badge>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
 Slim, Snel & Nauwkeurig
 <span className="text-blue-600"> Berekenen</span>
 </h1>
 <p className="mt-4 text-lg text-gray-600">
 Reken eenvoudig BTW, salaris, hypotheek, BMI en meer.
 Al onze calculators zijn gratis, direct en up-to-date met 2026-tarieven.
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
 { value: getAllCalculators().length, label:"Calculators", icon: Calculator },
 { value: categories.length, label:"Categorieën", icon: BookOpen },
 { value:"2026", label:"Actuele tarieven", icon: Sparkles },
 { value:"100%", label:"Gratis te gebruiken", icon: Heart },
 ].map((stat, i) => (
 <div key={i} className="text-center">
 <stat.icon className="mx-auto mb-1 h-5 w-5 text-blue-500" />
 <p className="text-xl font-bold tabular-nums text-gray-900">
 {stat.value}
 </p>
 <p className="text-xs text-gray-500">{stat.label}</p>
 </div>
 ))}
 </div>
 </Container>
 </section>

 {/* ── Core Category Grid (4 flagships) ── */}
 <section className="border-b border-gray-100">
 <Container className="py-16">
 <h2 className="text-2xl font-bold text-gray-900">
 Kies een categorie
 </h2>
 <p className="mt-2 text-sm text-gray-500">
 Ontdek alle calculators per onderwerp
 </p>
 <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
 {hubCategories.map((hub) => {
 const a = accentMap[hub.accent];
 const Icon = hub.icon;
 return (
 <Link
 key={hub.title}
 href={hub.href}
 className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg :border-slate-600"
 >
 {/* Emoji icon */}
 <span className="mb-3 block text-3xl transition-transform duration-300 group-hover:scale-110">
 {hub.emoji}
 </span>

 {/* Gradient accent line */}
 <div className={`absolute top-0 left-0 right-0 h-1 ${a.bg} transition-all duration-300 group-hover:h-1.5`} />

 <h3 className="text-base font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 :text-blue-400">
 {hub.title}
 </h3>
 <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
 {hub.description}
 </p>

 {/* Calculator count + arrow */}
 <div className="mt-4 flex items-center justify-between">
 <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${a.badge} `}>
 {hub.calcCount} calculators
 </span>
 <ArrowRight className="h-4 w-4 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500 :text-blue-400" />
 </div>
 </Link>
 );
 })}
 </div>
 </Container>
 </section>

 {/* ── Nieuwste Calculators ── */}
 <section className="border-b border-gray-100 bg-gradient-to-r from-indigo-50/40 to-blue-50/40">
 <Container className="py-12">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h2 className="text-2xl font-bold text-gray-900">
 <Sparkles className="inline h-6 w-6 text-indigo-500 mr-1.5 -mt-0.5" />
 Nieuwste Calculators
 </h2>
 <p className="mt-1 text-sm text-gray-500">
 Recent toegevoegde en vernieuwde rekentools
 </p>
 </div>
 <Link
 href="/updates"
 className="hidden items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors sm:flex"
 >
 Bekijk alle updates
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>

 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {updatesData.updates
 .filter((u: { type: string }) => u.type === "Nieuwe Calculator")
 .slice(0, 3)
 .map((update: { date: string; title: string; calculators: { slug: string; name: string }[] }) => (
 <Link
 key={update.title}
 href={`/${update.calculators[0]?.slug ? (() => {
 const calc = getAllCalculators().find((c: { slug: string }) => c.slug === update.calculators[0].slug);
 return calc ? `${calc.categorySlug}/${calc.slug}` : `calculators/${update.calculators[0].slug}`;
 })() : "/calculators"}`}
 className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
 >
 {/* Top accent bar */}
 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />

 <div className="flex items-start gap-3">
 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
 <Sparkles className="h-5 w-5" />
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
 {new Date(update.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
 </p>
 <p className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
 {update.title}
 </p>
 <p className="mt-1 text-xs text-gray-500">
 {update.calculators.map((c) => c.name).join(", ")}
 </p>
 </div>
 <ArrowRight className="h-4 w-4 shrink-0 mt-2 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-500" />
 </div>
 </Link>
 ))}
 </div>

 {/* Mobile link */}
 <div className="mt-5 text-center sm:hidden">
 <Link
 href="/updates"
 className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
 >
 Bekijk alle updates
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </Container>
 </section>

 {/* ── Populaire Calculators (full width) ── */}
 <section className="border-b border-gray-100">
 <Container className="py-16">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h2 className="text-2xl font-bold text-gray-900">
 Populaire Calculators
 </h2>
 <p className="mt-1 text-sm text-gray-500">
 Meest gebruikte tools
 </p>
 </div>
 <Link
 href="/calculators"
 className="hidden items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors sm:flex"
 >
 Alle calculators
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>

 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
 {popularTools.map((tool) => {
 const Icon = tool.icon;
 return (
 <Link
 key={tool.title}
 href={tool.href}
 className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5"
 >
 <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tool.iconBg} transition-transform duration-200 group-hover:scale-110`}>
 <Icon className="h-5 w-5" />
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
 {tool.title}
 </p>
 <p className="text-xs text-gray-500 truncate">
 {tool.description}
 </p>
 </div>
 <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500" />
 </Link>
 );
 })}
 </div>

 {/* Mobile"All calculators" link */}
 <div className="mt-5 text-center sm:hidden">
 <Link
 href="/calculators"
 className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
 >
 Alle calculators bekijken
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </Container>
 </section>

 {/* ── Trust / How It Works ── */}
 <section className="border-b border-gray-100">
 <Container className="py-16">
 <div className="rounded-2xl bg-gray-50 p-8 md:p-12">
 <div className="mx-auto max-w-2xl text-center">
 <Calculator className="mx-auto mb-4 h-10 w-10 text-blue-600" />
 <h2 className="text-2xl font-bold text-gray-900">
 Hoe werkt Rekenhet.nl?
 </h2>
 <p className="mt-3 leading-relaxed text-gray-600">
 Vul eenvoudig je gegevens in en ontvang direct het resultaat.
 Al onze calculators zijn gratis, vereisen geen registratie en
 werken op elk apparaat. Perfect voor snelle berekeningen voor
 werk, studie of persoonlijke financiën.
 </p>
 </div>
 </div>
 </Container>
 </section>

 {/* ── CLS-safe AdSense Placeholder (728×90) ── */}
 <section aria-label="Advertentie" className="bg-gray-50/30">
 <Container className="py-6">
 <div
 className="mx-auto min-h-[90px] w-full max-w-[728px] rounded-lg border border-dashed border-gray-200 bg-white/50 flex items-center justify-center"
 aria-hidden="true"
 >
 <p className="text-[10px] text-gray-300 select-none">
 Advertentie — 728×90
 </p>
 </div>
 </Container>
 </section>
 </main>
 </>
 );
}
