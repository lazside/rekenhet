/**
 * CalculatorMeta voor deze calculator.
 * Importeer dit in src/data/calculators.ts en voeg toe aan registry[].
 *
 * import { META as mijnCalcMeta } from "@/lib/calculators/modules/mijn-calculator/meta";
 * // in registry: mijnCalcMeta,
 */
export const META = {
  slug: "mijn-calculator",             // TODO: unieke slug
  categorySlug: "algemeen",            // TODO: categorie slug
  title: "Mijn Calculator",            // TODO: titel
  description:
    "TODO: Beschrijving van de calculator voor SEO en weergave.",
  metaTitle:
    "TODO: SEO Title Tag | Rekenhet.nl",
  metaDescription:
    "TODO: SEO meta description met zoekwoorden.",
  keywords: [
    "TODO", "zoekwoord1", "zoekwoord2",
  ],
  featured: true,
  relatedSlugs: [],
};
