import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllNews, getNewsArticle } from "@/data/news";
import { SITE_URL } from "@/lib/seo/title-builder";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllNews().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `${SITE_URL}/nieuws/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      locale: "nl_NL",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NieuwsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const allArticles = getAllNews();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  // JSON-LD article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Rekenhet.nl",
    },
    publisher: {
      "@type": "Organization",
      name: "Rekenhet.nl",
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <Container className="py-6 md:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Kruimelpad">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/nieuws" className="hover:text-gray-700">Nieuws</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-900 font-medium" aria-current="page">
            {article.title.slice(0, 50)}...
          </span>
        </nav>

        <div className="max-w-3xl mx-auto">
          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 border border-indigo-100">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(article.date)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {article.description}
            </p>
          </header>

          {/* Article content */}
          <article className="prose prose-gray max-w-none">
            {article.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-gray-700 leading-relaxed mb-5 text-base"
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="font-semibold text-gray-900">$1</strong>'
                  ),
                }}
              />
            ))}
          </article>

          {/* Related calculators */}
          {article.relatedCalculators.length > 0 && (
            <section className="mt-10 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Bereken het zelf
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {article.relatedCalculators.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.categorySlug}/${calc.slug}`}
                    className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:shadow-sm border border-gray-200 transition-all"
                  >
                    <ArrowRight className="h-4 w-4 text-indigo-500 shrink-0" />
                    {calc.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Sources */}
          {article.sources.length > 0 && (
            <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Bronnen
              </h2>
              <ul className="space-y-2">
                {article.sources.map((source, i) => (
                  <li key={i}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
                    >
                      {source.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Lees ook
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((a) => (
                  <Link key={a.slug} href={`/nieuws/${a.slug}`} className="group">
                    <Card className="h-full transition-all group-hover:shadow-sm group-hover:border-indigo-200">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-medium text-indigo-500 uppercase tracking-wider">
                          {a.category}
                        </span>
                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mt-1 leading-snug line-clamp-2">
                          {a.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                          {a.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </>
  );
}
