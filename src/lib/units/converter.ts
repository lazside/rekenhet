/**
 * Unit Conversion Engine
 *
 * Resolves unit pairs (e.g., "cm-naar-m"), looks up categories,
 * and performs conversions using the factors matrix.
 */
import unitsData from "@/data/units.json";

interface UnitEntry {
  id: string;
  slug: string;
  singular: string;
  plural: string;
  factor: number;
}

interface UnitCategory {
  id: string;
  name: string;
  icon: string;
  baseUnit: string;
  units: UnitEntry[];
}

const categories: UnitCategory[] = (unitsData as { categories: UnitCategory[] }).categories;
const allUnits = categories.flatMap((c) => c.units);

/** Find a unit entry by its slug (e.g., "cm", "kg", "ha") */
export function findUnit(slug: string): UnitEntry | undefined {
  return allUnits.find((u) => u.slug === slug);
}

/** Find which category a unit belongs to */
export function findCategoryForUnit(slug: string): UnitCategory | undefined {
  return categories.find((c) => c.units.some((u) => u.slug === slug));
}

/** Parse a route pair like "cm-naar-m" → { from: "cm", to: "m" } */
export function parsePair(pair: string): { from: string; to: string } | null {
  const parts = pair.split("-naar-");
  if (parts.length !== 2) return null;
  const [from, to] = parts;
  return from && to ? { from, to } : null;
}

/** Validate that both units exist and are in the same category */
export function validatePair(
  from: string,
  to: string
): { valid: true; fromUnit: UnitEntry; toUnit: UnitEntry; category: UnitCategory } | { valid: false; reason: string } {
  const fromUnit = findUnit(from);
  const toUnit = findUnit(to);
  if (!fromUnit) return { valid: false, reason: `Onbekende eenheid: ${from}` };
  if (!toUnit) return { valid: false, reason: `Onbekende eenheid: ${to}` };
  const fromCat = findCategoryForUnit(from);
  const toCat = findCategoryForUnit(to);
  if (!fromCat || !toCat || fromCat.id !== toCat.id)
    return { valid: false, reason: `${from} en ${to} zijn niet uit dezelfde categorie` };
  return { valid: true, fromUnit, toUnit, category: fromCat };
}

/** Convert a value from one unit to another */
export function convert(value: number, fromSlug: string, toSlug: string): number {
  const from = findUnit(fromSlug);
  const to = findUnit(toSlug);
  if (!from || !to) return NaN;
  const baseValue = value * from.factor; // Convert to base unit
  return baseValue / to.factor; // Convert from base to target
}

/** Generate all valid "from-naar-to" pairs within the same category */
export function generateAllPairs(): string[] {
  const pairs: string[] = [];
  for (const cat of categories) {
    for (const from of cat.units) {
      for (const to of cat.units) {
        if (from.slug !== to.slug) {
          pairs.push(`${from.slug}-naar-${to.slug}`);
        }
      }
    }
  }
  return pairs;
}

/** Generate Dutch formula explanation text */
export function getFormulaDescription(fromUnit: UnitEntry, toUnit: UnitEntry): string {
  const fromToBase = fromUnit.factor;
  const baseToTo = 1 / toUnit.factor;
  const factor = fromToBase * baseToTo;

  if (factor === 1) return `1 ${fromUnit.singular} is gelijk aan 1 ${toUnit.singular}.`;

  if (factor < 1) {
    const divisor = Math.round(1 / factor);
    return `Om van ${fromUnit.plural} naar ${toUnit.plural} te gaan, deel je het getal door ${divisor}. Want 1 ${toUnit.singular} is ${divisor} ${fromUnit.plural}.`;
  }

  const multiplier = Math.round(factor);
  if (multiplier === factor) {
    return `Om van ${fromUnit.plural} naar ${toUnit.plural} te gaan, vermenigvuldig je het getal met ${multiplier}. Want 1 ${fromUnit.singular} is ${multiplier} ${toUnit.plural}.`;
  }

  return `1 ${fromUnit.singular} is gelijk aan ${factor.toLocaleString("nl-NL", { maximumFractionDigits: 6 })} ${toUnit.singular}. Vermenigvuldig het aantal ${fromUnit.plural} met deze factor om het aantal ${toUnit.plural} te krijgen.`;
}

export type { UnitEntry, UnitCategory };
