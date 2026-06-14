import { notFound, permanentRedirect } from "next/navigation";
import { getContentPage, getAllContentSlugs } from "@/content";
import { getCalculatorUrl } from "@/lib/seo/title-builder";

interface Props {
  params: Promise<{ topic: string }>;
}

/**
 * Static generation — pre-render all redirect pages at build time.
 */
export async function generateStaticParams() {
  return getAllContentSlugs().map((topic) => ({ topic }));
}

/**
 * 301 permanent redirect from SEO content page to the actual calculator page.
 *
 * The calculator page at /[category]/[slug] now shows all SEO content
 * (intro, FAQs, conclusion) so the separate /calculators/[topic] route
 * is no longer needed.
 */
export default async function ContentPageRedirect({ params }: Props) {
  const { topic } = await params;
  const page = getContentPage(topic);

  if (!page) {
    notFound();
  }

  const calculatorUrl = getCalculatorUrl(
    page.calculator.categorySlug,
    page.calculator.componentSlug,
  );

  permanentRedirect(calculatorUrl);
}
