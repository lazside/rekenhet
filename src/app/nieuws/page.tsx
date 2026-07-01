import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { SITE_NAME } from "@/lib/seo/title-builder";
import { getAllNews, getNewsCategories } from "@/data/news";

export const metadata: Metadata = {
  title: `Financieel Nieuws & Blogs — ${SITE_NAME}`,
  description:
    "Blijf op de hoogte van het laatste financiële nieuws. Prinsjesdag, belastingplan, AOW, minimumloon, toeslagen en meer. Met gratis calculators.",
  alternates: {
    canonical: "https://www.rekenhet.nl/nieuws",
  },
  openGraph: {
    title: `Financieel Nieuws & Blogs — ${SITE_NAME}`,
    description: "Blijf op de hoogte van het laatste financiële nieuws.",
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NieuwsOverviewPage() {
  const articles = getAllNews();
  const categories = getNewsCategories();

  return (
    <Container className="py-8 md:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
            <Newspaper className="h-5 w-5 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Financieel Nieuws
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Blijf op de hoogte van de laatste wijzigingen in belastingen, toeslagen, 
          AOW, minimumloon en meer. Onze artikelen zijn geschreven door financiële 
          experts en gekoppeld aan onze gratis calculators.
        </p>

        {/* Categorie badges */}
        <div className="flex flex-wrap gap-2 mt-5">
          {categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 border border-indigo-100"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Artikelen grid */}
      {articles.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Nog geen nieuwsartikelen.</p>
          <p className="text-sm mt-2">Kom binnenkort terug voor het laatste financiële nieuws.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.slug}>
              <Link href={`/nieuws/${article.slug}`} className="group block h-full">
                <Card className="h-full transition-all group-hover:shadow-md group-hover:border-indigo-200">
                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Category tag + date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-600">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2">
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
                      {article.description}
                    </p>

                    {/* Read more */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-sm font-medium text-indigo-600">
                      Lees artikel
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* SEO tekst onderaan */}
      <section className="mt-12 rounded-xl bg-gray-50 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          Waarom financieel nieuws volgen?
        </h2>
        <div className="text-sm text-gray-600 leading-relaxed space-y-3">
          <p>
            Financiële regelgeving verandert continu. Door het nieuws te volgen, 
            blijf je op de hoogte van wijzigingen die jouw portemonnee raken. 
            Of het nu gaat om belastingtarieven, toeslagen of het minimumloon — 
            wij leggen het helder uit en koppelen elk artikel aan een calculator 
            waarmee je direct kunt berekenen wat het voor jou betekent.
          </p>
          <p>
            Al onze artikelen worden geschreven op basis van officiële bronnen 
            zoals de <strong>Belastingdienst</strong>, het <strong>CBS</strong>, 
            de <strong>Rijksoverheid</strong> en de <strong>SVB</strong>.
          </p>
        </div>
      </section>
    </Container>
  );
}
