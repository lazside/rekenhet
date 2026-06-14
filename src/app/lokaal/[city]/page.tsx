import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import PostcodeTaxWizard from "@/components/tax/PostcodeTaxWizard";
import citiesData from "@/data/cities.json";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────

interface CityEntry {
  slug: string;
  name: string;
  province: string;
  postcodePrefix: string;
}

const cities = citiesData as CityEntry[];

// ─── Static params ────────────────────────────────────────────

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const entry = cities.find((c) => c.slug === city);
  if (!entry) return {};

  const cityName = entry.name;
  const province = entry.province;

  return {
    title: `Gemeentelijke Belastingen ${cityName} 2026 — Bereken Je Woonlasten | Rekenhet.nl`,
    description: `Woont u in ${cityName}? Bereken direct de exacte OZB, afvalstoffenheffing en rioolheffing voor jouw postcode in ${cityName} (${province}). 100% actueel voor 2026.`,
    openGraph: {
      title: `Gemeentelijke Belastingen ${cityName} 2026`,
      description: `Bereken de OZB, afvalstoffenheffing en rioolheffing in ${cityName}.`,
      locale: "nl_NL",
    },
    alternates: {
      canonical: `https://www.rekenhet.nl/lokaal/${city}`,
    },
  };
}

// ─── Component ────────────────────────────────────────────────

function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function LokaalCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const entry = cities.find((c) => c.slug === city);
  if (!entry) notFound();

  const cityName = entry.name;
  const province = entry.province;

  const randomNumbers = (prefix: string): string => {
    const rest = String(Math.floor(Math.random() * 900) + 100);
    return `${prefix}${rest}`;
  };
  const samplePostcode = randomNumbers(entry.postcodePrefix);

  return (
    <>
      {/* ═══ BREADCRUMBS ═══ */}
      <div className="border-b border-gray-100 bg-gray-50/50">
        <Container className="py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-400" aria-label="Kruimelpad">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/gemeentelijke-belastingen" className="hover:text-gray-600 transition-colors">Gemeentelijke Belastingen</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-600 font-medium">{cityName}</span>
          </nav>
        </Container>
      </div>

      {/* ═══ MAIN ═══ */}
      <Container className="py-8 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Gemeentelijke Belastingen {cityName} 2026
          </h1>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            Bereken direct de OZB, afvalstoffenheffing en rioolheffing voor jouw woning in{" "}
            <strong>{cityName}</strong>. Vul je postcode in en ontdek exact wat je betaalt.
          </p>

          {/* City badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700 border border-indigo-100">
            <MapPin className="h-4 w-4" />
            {cityName}, {province}
            <span className="text-blue-400 mx-1">·</span>
            <span className="text-indigo-500">Postcodes: {entry.postcodePrefix}**</span>
          </div>
        </div>

        {/* ═══ WIZARD ═══ */}
        <div className="mt-8">
          <PostcodeTaxWizard initialPostcode={samplePostcode} />
        </div>

        {/* ═══ Local SEO text ═══ */}
        <div className="mt-12 space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Belastingen in {cityName}</h2>
            <div className="mt-3 space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                De gemeentelijke belastingen in {cityName} bestaan uit drie onderdelen: de
                Onroerendezaakbelasting (OZB), de afvalstoffenheffing en de rioolheffing. De hoogte
                hiervan verschilt per gemeente en wordt jaarlijks vastgesteld door de gemeenteraad
                van {province === entry.province ? cityName : `${cityName} (${province})`}.
              </p>
              <p>
                De OZB wordt berekend als een percentage van de WOZ-waarde van je woning.
                De afvalstoffenheffing en rioolheffing zijn vaste bedragen per huishouden,
                die verschillen voor alleenstaanden en meerpersoonshuishoudens.
              </p>
            </div>
          </section>

          {/* Gerelateerde steden */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Gerelateerde plaatsen in {province}</h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cities
                .filter((c) => c.province === province && c.slug !== city)
                .slice(0, 12)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/lokaal/${c.slug}`}
                    className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <ArrowRight className="h-3 w-3 shrink-0" />
                    {c.name}
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
