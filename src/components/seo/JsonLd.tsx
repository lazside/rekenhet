import type { FaqItem } from "@/types";
import type { CalculatorMeta } from "@/data/calculators";
import {
  websiteSchema,
  softwareApplicationSchema,
  webApplicationSchema,
  faqPageSchema,
  breadcrumbListSchema,
  organizationSchema,
  webpageSchema,
  homePageSchemas,
  calculatorPageSchemas,
} from "@/lib/seo/jsonld";

// ─── JSON-LD Script Renderer ────────────────────────────────────

interface JsonLdScriptProps {
  data: Record<string, unknown>;
}

/**
 * Renders a single JSON-LD script tag.
 */
function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Page-level Components ───────────────────────────────────────

/**
 * Homepage JSON-LD bundle.
 * Injects WebSite (with SearchAction), Organization.
 */
export function HomePageJsonLd() {
  const schemas = homePageSchemas();
  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLdScript key={`home-ld-${i}`} data={schema} />
      ))}
    </>
  );
}

/**
 * Calculator page JSON-LD bundle.
 * Injects BreadcrumbList + WebApplication + optional FAQPage.
 */
export function CalculatorPageJsonLd({
  calculator,
  categorySlug,
  faqs,
  breadcrumbs,
}: {
  calculator: CalculatorMeta;
  categorySlug: string;
  faqs?: FaqItem[];
  breadcrumbs: { name: string; item: string }[];
}) {
  const schemas = calculatorPageSchemas(
    calculator,
    categorySlug,
    breadcrumbs,
    faqs
  );
  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLdScript key={`calc-ld-${i}`} data={schema} />
      ))}
    </>
  );
}

/**
 * Generic single-schema JSON-LD component.
 * Use for custom pages (calculators list, category list, 404, etc.)
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <JsonLdScript data={data} />;
}
