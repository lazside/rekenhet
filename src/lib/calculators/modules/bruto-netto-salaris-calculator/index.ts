/**
 * Bruto Netto Salaris Calculator — Modulaire module.
 *
 * Alle 6 bestanden in deze directory vormen samen één calculator.
 * - meta.ts   → CalculatorMeta (SEO, routing)
 * - schema.ts → Zod-validatie
 * - compute.ts → Rekenkern
 * - faqs.ts   → FAQPage JSON-LD data
 * - ui.tsx    → React component ("use client")
 */

export { META } from "./meta";
export type { BrutoNettoMeta } from "./meta";
export { BrutoNettoSchema } from "./schema";
export type { BrutoNettoSchemaType } from "./schema";
export {
  calculateNetSalary,
  calculateIncomeTax,
  calculateAlgemeneHeffingskorting,
  calculateArbeidskorting,
  calculateLeaseautoImpact,
  berekenUurloonProjecties,
} from "./compute";
export type {
  BrutoNettoInput,
  BrutoNettoBreakdown,
  HeffingskortingTrace,
  LeaseautoImpact,
  UurloonProjectie,
} from "./compute";
export { FAQs } from "./faqs";
export { default as BrutoNettoCalculator } from "./ui";
