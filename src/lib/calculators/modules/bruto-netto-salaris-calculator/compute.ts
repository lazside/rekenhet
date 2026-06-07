/**
 * Bruto Netto — rekenkern.
 *
 * Re-exporteert uit de gedeelde tax engine.
 * Zodra alle calculators modulair zijn, verhuist de engine hierheen.
 */
export {
  calculateNetSalary,
  calculateIncomeTax,
  calculateAlgemeneHeffingskorting,
  calculateArbeidskorting,
  calculateLeaseautoImpact,
  berekenUurloonProjecties,
} from "../../bruto-netto-2026";

export type {
  BrutoNettoInput,
  BrutoNettoBreakdown,
  HeffingskortingTrace,
  LeaseautoImpact,
  UurloonProjectie,
} from "../../bruto-netto-2026";
