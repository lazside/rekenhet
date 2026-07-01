import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Calculator, ChevronRight } from "lucide-react";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacybeleid" },
  { href: "/cookies", label: "Cookieverklaring" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const INFO_LINKS = [
  { href: "/over-ons", label: "Over Rekenhet" },
  { href: "/updates", label: "Updates & Wetgeving" },
  { href: "/contact", label: "Contact & Vragen" },
  { href: "/veelgestelde-vragen", label: "Veelgestelde vragen" },
];

export function Footer() {
  const calculators = getAllCalculators();
  const popular = calculators.filter((c) => c.featured).slice(0, 10);
  const calcLinks = calculators.map((c) => ({
    href: `/${c.categorySlug}/${c.slug}`,
    label: c.title,
    category: c.categorySlug,
  }));

  // Group calcLinks by category for display
  const catGroups = categories
    .map((cat) => ({
      ...cat,
      calcs: calcLinks.filter((c) => c.category === cat.slug).slice(0, 5),
    }))
    .filter((g) => g.calcs.length > 0);

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-base font-bold text-gray-900 mb-3">
                <Calculator className="h-5 w-5 text-indigo-600" />
                <span>Reken<span className="text-indigo-600">het</span><span className="text-gray-400 font-normal">.nl</span></span>
              </Link>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid en wiskunde.
                Snel, betrouwbaar en up-to-date met de laatste wetgeving.
              </p>
              <div className="flex flex-wrap gap-2">
                {INFO_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categorieën met calculators */}
            {catGroups.slice(0, 3).map((g) => (
              <div key={g.slug}>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">{g.title}</h3>
                <ul className="space-y-1.5">
                  {g.calcs.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={`/${g.slug}`} className="inline-flex items-center gap-0.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 mt-1">
                      Alle {g.title.toLowerCase()} <ChevronRight className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
            {catGroups.length > 3 && (
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Overig</h3>
                <ul className="space-y-1.5">
                  {catGroups.slice(3).map((g) => (
                    <li key={g.slug}>
                      <Link href={`/${g.slug}`} className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-gray-400">
            &copy; {new Date().getFullYear()} Rekenhet.nl — Alle rechten voorbehouden.
          </p>
          <div className="flex gap-4">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-[10px] text-gray-400 hover:text-gray-600">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
