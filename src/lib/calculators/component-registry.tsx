import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Calculator Component Registry
 *
 * Maps calculator slugs to their React components.
 * Components are lazy-loaded for optimal bundle size.
 */
type CalculatorComponent = ComponentType<Record<string, never>>;

const registry = new Map<string, () => Promise<{ default: CalculatorComponent }>>();

// ─── Register Calculators ──────────────────────────────────────

registry.set(
  "bruto-netto-salaris-calculator",
  () => import("@/lib/calculators/modules/bruto-netto-salaris-calculator/ui")
);

registry.set(
  "btw-calculator",
  () => import("@/components/calculator/BtwCalculator")
);

registry.set(
  "bmi-calculator",
  () => import("@/components/calculator/BmiCalculator")
);

registry.set(
  "procenten-calculator",
  () => import("@/components/calculator/ProcentenCalculator")
);

registry.set(
  "lengte-omrekenen",
  () => import("@/components/units/OmrekenenHub")
);

registry.set(
  "gewicht-omrekenen",
  () => import("@/components/units/OmrekenenHub")
);

registry.set(
  "oppervlakte-omrekenen",
  () => import("@/components/units/OmrekenenHub")
);

registry.set(
  "auto-motor-omrekenen",
  () => import("@/components/units/OmrekenenHub")
);

registry.set(
  "energie-omrekenen",
  () => import("@/components/units/OmrekenenHub")
);

registry.set(
  "koken-omrekenen",
  () => import("@/components/units/OmrekenenHub")
);

registry.set(
  "data-omrekenen",
  () => import("@/components/units/OmrekenenHub")
);

registry.set("ritkosten-berekenen", () => import("@/components/calculator/TripCostCalculator"));
registry.set("snelheidsboete-calculator", () => import("@/components/calculator/SpeedingFineCalculator"));
registry.set("uurtarief-berekenen", () => import("@/components/calculator/UurtariefCalculator"));
registry.set("btw-incl-excl", () => import("@/components/calculator/BtwSimpleCalculator"));
registry.set("parttime-factor", () => import("@/components/calculator/ParttimeCalculator"));
registry.set("maximale-hypotheek", () => import("@/components/calculator/MaxMortgageCalculator"));
registry.set("annuiteiten-lasten", () => import("@/components/calculator/AnnuityCalculator"));
registry.set("netto-vakantiegeld", () => import("@/components/calculator/NetVakantiegeldCalculator"));
registry.set("compound-interest", () => import("@/components/calculator/CompoundInterestCalculator"));
registry.set("kenteken-check", () => import("@/components/calculator/KentekenCheckWrapper"));
registry.set("gemeentelijke-belastingen", () => import("@/components/tax/PostcodeTaxWizard"));
registry.set("zonnepanelen-opbrengst", () => import("@/components/solar/SolarCalculator"));
registry.set("thuiswerken-vs-kantoor", () => import("@/components/commute/CommuteComparison"));
registry.set("box3-berekenen", () => import("@/components/calculator/Box3Calculator"));
registry.set("dividend-berekenen", () => import("@/components/calculator/DividendCalculator"));
registry.set("fire-berekenen", () => import("@/components/calculator/FireCalculator"));
registry.set("kinderbijslag-berekenen", () => import("@/components/calculator/KinderbijslagCalculator"));
registry.set("kinderbijslag", () => import("@/components/calculator/KinderbijslagCalculator"));
registry.set("erfenis-schenking-aow", () => import("@/components/calculator/ErfenisAowCalculator"));
registry.set("schenkbelasting", () => import("@/components/calculator/SchenkbelastingCalculator"));
registry.set("aow-leeftijd", () => import("@/components/calculator/AowCalculator"));
registry.set("kinderalimentatie", () => import("@/components/calculator/AlimentatieCalculator"));
registry.set("isde-subsidie", () => import("@/components/calculator/IsdeSubsidieCalculator"));
registry.set("extra-aflossen", () => import("@/components/calculator/PaydownCalculator"));
registry.set("kwadratische-vergelijking", () => import("@/components/calculator/KwadratischCalculator"));
registry.set("oppervlakte-berekenen", () => import("@/components/calculator/OppervlakteCalculator"));
registry.set("caloriebehoefte", () => import("@/components/calculator/CalorieCalculator"));
registry.set("hartslagzones", () => import("@/components/calculator/HartslagCalculator"));
registry.set("zwangerschap", () => import("@/components/calculator/ZwangerschapCalculator"));
registry.set("winst-verlies", () => import("@/components/calculator/WinstVerliesCalculator"));
registry.set("zzp-tarief", () => import("@/components/calculator/ZzpTariefCalculator"));
registry.set("ideaal-gewicht", () => import("@/components/calculator/IdeaalGewichtCalculator"));
registry.set("investeringsaftrek", () => import("@/components/calculator/InvesteringsaftrekCalculator"));
registry.set("omzetbelasting", () => import("@/components/calculator/OmzetbelastingCalculator"));
registry.set("vakantiedagen", () => import("@/components/calculator/VakantiedagenCalculator"));
registry.set("ontslagvergoeding", () => import("@/components/calculator/OntslagvergoedingCalculator"));
registry.set("inflatie-calculator", () => import("@/components/calculator/InflatieCalculator"));
registry.set("worteltrekken", () => import("@/components/calculator/CalculatorHub"));
registry.set("machtsverheffen", () => import("@/components/calculator/CalculatorHub"));
registry.set("breuk-vereenvoudigen", () => import("@/components/calculator/CalculatorHub"));
registry.set("decimaal-naar-breuk", () => import("@/components/calculator/CalculatorHub"));
registry.set("kgv-berekenen", () => import("@/components/calculator/CalculatorHub"));
registry.set("ggd-berekenen", () => import("@/components/calculator/CalculatorHub"));
registry.set("richtingscoefficient", () => import("@/components/calculator/CalculatorHub"));
registry.set("afstand-tussen-punten", () => import("@/components/calculator/CalculatorHub"));
registry.set("driehoek-oppervlakte", () => import("@/components/calculator/CalculatorHub"));
registry.set("cirkel-berekenen", () => import("@/components/calculator/CalculatorHub"));
registry.set("leeftijd-berekenen", () => import("@/components/calculator/CalculatorHub"));
registry.set("datum-verschil", () => import("@/components/calculator/CalculatorHub"));
registry.set("datum-optellen", () => import("@/components/calculator/CalculatorHub"));
registry.set("weeknummer", () => import("@/components/calculator/CalculatorHub"));
registry.set("tijdrekenen", () => import("@/components/calculator/CalculatorHub"));
registry.set("schrikkeljaar", () => import("@/components/calculator/CalculatorHub"));
registry.set("dagen-tot-datum", () => import("@/components/calculator/CalculatorHub"));
registry.set("werkdagen-tellen", () => import("@/components/calculator/CalculatorHub"));
registry.set("bloeddruk", () => import("@/components/calculator/CalculatorHub"));
registry.set("lichaamsvet-percentage", () => import("@/components/calculator/CalculatorHub"));
registry.set("waterbehoefte", () => import("@/components/calculator/CalculatorHub"));
registry.set("hardlooppace", () => import("@/components/calculator/CalculatorHub"));
registry.set("wandeltempo", () => import("@/components/calculator/CalculatorHub"));
registry.set("ideale-lengte-kind", () => import("@/components/calculator/CalculatorHub"));
registry.set("calorie-verbruik-activiteit", () => import("@/components/calculator/CalculatorHub"));
registry.set("fietsvermogen", () => import("@/components/calculator/CalculatorHub"));
registry.set("overuren", () => import("@/components/calculator/CalculatorHub"));
registry.set("reiskosten-woonwerk", () => import("@/components/calculator/CalculatorHub"));
registry.set("thuiswerkvergoeding", () => import("@/components/calculator/CalculatorHub"));
registry.set("eindejaarsuitkering", () => import("@/components/calculator/CalculatorHub"));
registry.set("dertiende-maand", () => import("@/components/calculator/CalculatorHub"));
registry.set("bonus-netto", () => import("@/components/calculator/CalculatorHub"));
registry.set("ziektewet-uitkering", () => import("@/components/calculator/CalculatorHub"));
registry.set("ww-uitkering", () => import("@/components/calculator/CalculatorHub"));
registry.set("break-even-analyse", () => import("@/components/calculator/CalculatorHub"));
registry.set("costplus-prijs", () => import("@/components/calculator/CalculatorHub"));
registry.set("krediettermijn", () => import("@/components/calculator/CalculatorHub"));
registry.set("btw-privegebruik", () => import("@/components/calculator/CalculatorHub"));
registry.set("autokosten-bijtelling", () => import("@/components/calculator/CalculatorHub"));
registry.set("vof-winstverdeling", () => import("@/components/calculator/CalculatorHub"));
registry.set("uurtarief-kostprijs", () => import("@/components/calculator/CalculatorHub"));
registry.set("spaardoel-berekenen", () => import("@/components/calculator/CalculatorHub"));
registry.set("lineaire-aflossing", () => import("@/components/calculator/CalculatorHub"));
registry.set("studieschuld-terugbetalen", () => import("@/components/calculator/CalculatorHub"));
registry.set("eigen-risico-zorg", () => import("@/components/calculator/CalculatorHub"));
registry.set("verhuiskosten", () => import("@/components/calculator/CalculatorHub"));
registry.set("overwaarde-berekenen", () => import("@/components/calculator/CalculatorHub"));
registry.set("huurverhoging", () => import("@/components/calculator/CalculatorHub"));
registry.set("enkelvoudige-interest", () => import("@/components/calculator/CalculatorHub"));
registry.set("vermogensbelasting-box3", () => import("@/components/calculator/CalculatorHub"));
registry.set("huurtoeslag", () => import("@/components/calculator/HuurtoeslagCalculator"));
registry.set("energielabel-berekenen", () => import("@/components/calculator/EnergielabelCalculator"));
registry.set("zelfstandigenaftrek-berekenen", () => import("@/components/calculator/ZelfstandigenaftrekCalculator"));

// ─── Resolver ──────────────────────────────────────────────────

/**
 * Get a lazy-loaded calculator component by slug.
 * Returns null if no component is registered for this slug.
 */
export function getCalculatorComponent(
  slug: string
): CalculatorComponent | null {
  const loader = registry.get(slug);
  if (!loader) return null;

  const DynamicComponent = dynamic(loader, {
    loading: () => (
      <div className="flex items-center justify-center py-16 text-gray-400">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    ),
  });

  return DynamicComponent;
}

/**
 * Check if a calculator has a registered component.
 */
export function hasCalculatorComponent(slug: string): boolean {
  return registry.has(slug);
}
