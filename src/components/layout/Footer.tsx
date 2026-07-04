import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  Calculator, ChevronRight, ArrowUpRight,
  Rss, Mail, FileText,
} from "lucide-react";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";

// ─── Statische links ──────────────────────────────────────────

const INFO_LINKS = [
  { href: "/over-ons", label: "Over Rekenhet" },
  { href: "/updates", label: "Updates & Wetgeving" },
  { href: "/contact", label: "Contact & Vragen" },
  { href: "/veelgestelde-vragen", label: "Veelgestelde vragen" },
  { href: "/nieuws", label: "Nieuwsblog" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacybeleid" },
  { href: "/cookies", label: "Cookieverklaring" },
  { href: "/disclaimer", label: "Disclaimer" },
];

// ─── Categorie kleuren mapping ────────────────────────────────

const CAT_COLORS: Record<string, string> = {
  "werk-en-inkomen": "bg-emerald-100 text-emerald-700",
  ondernemen: "bg-blue-100 text-blue-700",
  "geld-en-verzekeringen": "bg-violet-100 text-violet-700",
  gezondheid: "bg-rose-100 text-rose-700",
  wiskunde: "bg-amber-100 text-amber-700",
  "auto-vervoer": "bg-sky-100 text-sky-700",
  algemeen: "bg-slate-100 text-slate-700",
  hypotheek: "bg-indigo-100 text-indigo-700",
};

// ─── Categorie-rekenmodules (alle 8 verdeeld over 2 kolommen) ─

const COLUMN_LAYOUT = [
  // Kolom 2: Werk & Inkomen + Ondernemen
  ["werk-en-inkomen", "ondernemen"],
  // Kolom 3: Geld & Hypotheek
  ["geld-en-verzekeringen", "hypotheek"],
  // Kolom 4: Gezondheid + Wiskunde + Auto + Algemeen
  ["gezondheid", "wiskunde", "auto-vervoer", "algemeen"],
];

const POPULAR_SLUGS = [
  "bruto-netto-salaris-calculator",
  "minimumloon-2026",
  "btw-calculator",
  "box3-berekenen",
  "bmi-calculator",
  "huurtoeslag",
];

export function Footer() {
  const calculators = getAllCalculators();

  const calcLinks = calculators.map((c) => ({
    href: `/${c.categorySlug}/${c.slug}`,
    label: c.title,
    category: c.categorySlug,
  }));

  // Populaire calculators
  const popularCalcs = POPULAR_SLUGS
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter(Boolean) as typeof calculators;

  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <Container>
        {/* ─── Hoofdkolommen ─── */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">

          {/* Kolom 1: Brand + Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-gray-900 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-sm">
                <Calculator className="h-3.5 w-3.5" />
              </div>
              <span>Reken<span className="text-indigo-600">het</span><span className="text-gray-400 font-normal">.nl</span></span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-xs">
              Gratis online calculators — actueel met 2026-tarieven. Snel, betrouwbaar en voor iedereen toegankelijk.
            </p>

            {/* Info links */}
            <div className="flex flex-col gap-1.5 mb-5">
              {INFO_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <ArrowUpRight className="h-3 w-3 shrink-0" />
                  {l.label}
                </Link>
              ))}
            </div>

            {/* RSS + Contact knoppen */}
            <div className="flex gap-2">
              <Link
                href="/feed.xml"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
              >
                <Rss className="h-3 w-3" />
                RSS
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
              >
                <Mail className="h-3 w-3" />
                Contact
              </Link>
            </div>
          </div>

          {/* Kolommen: Categorie-groepen */}
          {COLUMN_LAYOUT.map((group, colIdx) => (
            <div key={colIdx}>
              {group.map((catSlug, catIdx) => {
                const cat = categories.find((c) => c.slug === catSlug);
                if (!cat) return null;
                const cats = calcLinks.filter((c) => c.category === catSlug).slice(0, 5);
                const colorClass = CAT_COLORS[catSlug] || "bg-gray-100 text-gray-700";
                return (
                  <div key={catSlug} className={catIdx > 0 ? "mt-6" : ""}>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${colorClass}`}>
                        <cat.icon className="h-3 w-3" />
                      </span>
                      <h3 className="text-xs font-bold text-gray-900">{cat.title}</h3>
                    </div>
                    <ul className="space-y-1">
                      {cats.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="text-xs text-gray-500 hover:text-indigo-600 transition-colors leading-relaxed"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={`/${catSlug}`}
                          className="inline-flex items-center gap-0.5 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 mt-0.5"
                        >
                          Alle {cat.title.toLowerCase()}
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Kolom 5: Populair */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Populair</h3>
            <ul className="space-y-1.5">
              {popularCalcs.map((calc) => {
                const cat = categories.find((c) => c.slug === calc.categorySlug);
                const colorClass = cat ? CAT_COLORS[cat.slug] : "bg-gray-100 text-gray-700";
                return (
                  <li key={calc.slug}>
                    <Link
                      href={`/${calc.categorySlug}/${calc.slug}`}
                      className="flex items-center gap-2 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      {cat && (
                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${colorClass}`}>
                          <cat.icon className="h-2.5 w-2.5" />
                        </span>
                      )}
                      {calc.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Alle calculators bekijken
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* ─── Bottom bar ─── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Rekenhet.nl — Alle rechten voorbehouden.
              <span className="hidden sm:inline mx-2 text-gray-300">·</span>
              <span className="block sm:inline text-gray-400">
                Gemaakt met ❤️ in Nederland
              </span>
            </p>
            <div className="flex gap-5">
              {LEGAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
