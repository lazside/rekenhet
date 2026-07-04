import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SITE_NAME } from "@/lib/seo/title-builder";
import { getAllNews } from "@/data/news";
import {
  ArrowRight, Calendar, FileText, Scale, Euro,
  TrendingUp, Gavel, Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Updates & Wetgeving — Belangrijke Wijzigingen 2026 | ${SITE_NAME}`,
  description:
    "Blijf op de hoogte van alle belangrijke wetswijzigingen: belastingplan, minimumloon, AOW, toeslagen, hypotheekregels en meer. Actueel en overzichtelijk.",
  alternates: {
    canonical: "https://www.rekenhet.nl/updates",
  },
  openGraph: {
    title: `Updates & Wetgeving 2026 — ${SITE_NAME}`,
    description: "Alle belangrijke wetswijzigingen op een rij: belastingen, minimumloon, AOW, toeslagen.",
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("nl-NL", {
    year: "numeric", month: "long", day: "numeric",
  });
}

// ─── Law change categories ─────────────────────────────────────

interface WetUpdate {
  icon: typeof Scale;
  title: string;
  summary: string;
  details: string[];
  date: string;
  slug: string;
  category: string;
}

const WET_UPDATES: WetUpdate[] = [
  {
    icon: Euro,
    title: "Minimumloon 2026 — Twee Indexaties",
    summary: "Het minimumloon stijgt per 1 januari naar €14,71 en per 1 juli naar €14,99 per uur.",
    details: [
      "Per 1 januari 2026: €14,71 per uur (was €13,68 per juli 2025)",
      "Per 1 juli 2026: €14,99 per uur (+1,9% extra indexatie)",
      "Jeugdminimumlonen schalen mee: 80% (20jr), 60% (19jr), 50% (18jr), etc.",
    ],
    date: "2026-07-01",
    slug: "/werk-en-inkomen/minimumloon-2026",
    category: "Werk & Inkomen",
  },
  {
    icon: TrendingUp,
    title: "Belastingplan 2026 — Belangrijkste Wijzigingen",
    summary: "Eerste schijf verbreed, AOW-premie verlaagd, heffingskortingen aangepast.",
    details: [
      "Eerste schijf verbreed van €38.441 naar €40.018 — meer inkomen in laagste tarief",
      "Premies volksverzekeringen gedaald van 27,65% naar 26,54% (AOW-premieverlaging)",
      "Algemene heffingskorting: max €3.070 (was €3.068), faseringsgrens naar €24.928",
      "Arbeidskorting: max €5.598 (was €5.599), faseringsgrens naar €40.018",
    ],
    date: "2026-01-01",
    slug: "/werk-en-inkomen/belastingjaar-vergelijken",
    category: "Werk & Inkomen",
  },
  {
    icon: Scale,
    title: "Zelfstandigenaftrek — Gedaald naar €1.200",
    summary: "De zelfstandigenaftrek is gehalveerd van €2.470 (2025) naar €1.200 (2026).",
    details: [
      "Zelfstandigenaftrek: €1.200 (was €2.470 in 2025 — een daling van 51%)",
      "Startersaftrek: €2.123 (ongewijzigd)",
      "MKB-winstvrijstelling: 12,7% (ongewijzigd)",
      "Voor AOW-gerechtigden: 50% van de zelfstandigenaftrek (€600)",
    ],
    date: "2026-01-01",
    slug: "/ondernemen/zelfstandigenaftrek-berekenen",
    category: "Ondernemen",
  },
  {
    icon: Gavel,
    title: "Box 3 — Forfaitaire Rendementen 2026",
    summary: "Spaarders 1,52%, beleggers 6,04%, heffingsvrij vermogen €57.000 (alleenstaand).",
    details: [
      "Fictief rendement sparen: 1,52% (ongewijzigd t.o.v. 2025)",
      "Fictief rendement beleggen: 6,04% (ongewijzigd)",
      "Heffingsvrij vermogen: €57.000 (alleenstaand) / €114.000 (samen)",
      "Belastingtarief: 36% over het fictief rendement",
      "Schulden: drempel €3.700, daarboven aftrekbaar van rendementsgrondslag",
    ],
    date: "2026-01-01",
    slug: "/geld-en-verzekeringen/box3-berekenen",
    category: "Geld & Verzekeringen",
  },
  {
    icon: Euro,
    title: "Huurtoeslag 2026 — Grenzen & Bedragen",
    summary: "Maximale huurgrens €879,66, vermogensgrens €63.285 (alleenstaand).",
    details: [
      "Maximale huurgrens: €879,66 per maand",
      "Aftoppingsgrens 1-persoons: €652,07",
      "Aftoppingsgrens meerpersoons: €698,75",
      "Vermogensgrens: €63.285 (alleenstaand) / €126.570 (samen)",
      "Toeslagpercentage: 65% van de basishuur",
    ],
    date: "2026-01-01",
    slug: "/geld-en-verzekeringen/huurtoeslag",
    category: "Geld & Verzekeringen",
  },
  {
    icon: FileText,
    title: "Jaarruimte 2026 — Pensioenbeleggen",
    summary: "Maximale jaarruimte €35.589, reserveringsruimte €42.753.",
    details: [
      "Premiegrondslag: salaris (max €137.800) − AOW-franchise €17.545",
      "Jaarruimte: 30% van premiegrondslag − factor A",
      "Maximum jaarruimte: €35.589",
      "Reserveringsruimte (10 jaar terug): max €42.753",
    ],
    date: "2026-01-01",
    slug: "/geld-en-verzekeringen/jaarruimte-berekenen",
    category: "Geld & Verzekeringen",
  },
  {
    icon: Calendar,
    title: "AOW-leeftijd 2026 — 67 Jaar en 3 Maanden",
    summary: "De AOW-leeftijd blijft in 2026 67 jaar en 3 maanden. Daarna stijgt hij verder.",
    details: [
      "AOW-leeftijd 2024-2028: 67 jaar en 0-3 maanden",
      "Vanaf 2028: gekoppeld aan levensverwachting",
      "Maximaal AOW-pensioenbedrag 2026: alleenstaand ~€1.500+/mnd",
      "Geboren voor 1960? Check je persoonlijke AOW-leeftijd",
    ],
    date: "2026-01-01",
    slug: "/geld-en-verzekeringen/aow-leeftijd",
    category: "Geld & Verzekeringen",
  },
  {
    icon: TrendingUp,
    title: "Energielabel & Hypotheek 2026",
    summary: "Tot €50.000 extra hypotheek mogelijk bij energielabel A+++ of beter.",
    details: [
      "Energielabel A: tot €25.000 extra leencapaciteit",
      "Energielabel A+++: tot €50.000 extra",
      "106%-LTV mogelijk bij verduurzaming",
      "Duurzaamheidsbudget voor isolatie, warmtepomp, zonnepanelen",
    ],
    date: "2026-01-01",
    slug: "/hypotheek/energielabel-berekenen",
    category: "Hypotheek & Wonen",
  },
];

// ═══════════════════════════════════════════════════════════════

export default function UpdatesPage() {
  const nieuwsArtikelen = getAllNews();

  return (
    <Container className="py-10 md:py-16">
      {/* ─── Header ─── */}
      <div className="mb-10 max-w-2xl">
        <Badge variant="warning" className="mb-3">
          <Sparkles className="mr-1 inline h-3 w-3" />
          2026
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Updates & Wetgeving
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          Alle belangrijke wetswijzigingen, tarieven en regels voor 2026 op een rij.
          Elk onderwerp linkt direct naar de bijbehorende calculator.
        </p>
      </div>

      {/* ─── Wetgeving Updates ─── */}
      <div className="space-y-4 mb-16">
        {WET_UPDATES.map((update, i) => {
          const IconComponent = update.icon;
          return (
            <div
              key={update.slug}
              className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition-transform group-hover:scale-110">
                  <IconComponent className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {update.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">{update.summary}</p>
                    </div>
                    <span className="hidden sm:inline-flex shrink-0 items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-600 whitespace-nowrap">
                      {formatDate(update.date)}
                    </span>
                  </div>

                  {/* Details */}
                  <ul className="mt-3 space-y-1">
                    {update.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <div className="mt-3">
                    <Link
                      href={update.slug}
                      className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      Bereken met de {update.category.toLowerCase()} calculator
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Nieuwsartikelen ─── */}
      {nieuwsArtikelen.length > 0 && (
        <section className="border-t border-gray-100 pt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Lees meer in ons nieuwsblog</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-lg">
              Uitgebreide artikelen over de belangrijkste wijzigingen.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nieuwsArtikelen.map((article) => (
              <Link
                key={article.slug}
                href={`/nieuws/${article.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="info" className="text-[9px] px-1.5 py-0.5">
                    {article.category}
                  </Badge>
                  <span className="text-[10px] text-gray-400">{formatDate(article.date)}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </p>
                <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-indigo-600">
                  Lees verder
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── Disclaimer ─── */}
      <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50/50 p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">Let op:</strong> De informatie op deze pagina is een samenvatting
          van openbare overheidsinformatie. Het Belastingplan 2026 is definitief vastgesteld, maar individuele
          omstandigheden kunnen tot afwijkingen leiden. Raadpleeg een belastingadviseur voor persoonlijk advies.
        </p>
      </div>
    </Container>
  );
}
