/**
 * Calculator componenten — barrel export.
 *
 * Elk component kan worden geïmporteerd via:
 *   import { BrutoNettoCalculator } from "@/components/calculator";
 *
 * Voor nieuwe calculators: voeg de export hier toe
 * nadat je het component hebt gemaakt.
 */

// Gedeelde UI primitives (gebruik deze in elke calculator)
export { InputFieldRenderer, ResultValue } from "./InputRenderer";

// Grote calculators (eigen component bestand)
export { default as BrutoNettoCalculator } from "./BrutoNettoCalculator";
export { default as EnergielabelCalculator } from "./EnergielabelCalculator";
export { default as BtwCalculator } from "./BtwCalculator";
export { default as BtwSimpleCalculator } from "./BtwSimpleCalculator";
export { default as BmiCalculator } from "./BmiCalculator";
export { default as ProcentenCalculator } from "./ProcentenCalculator";
export { default as ZelfstandigenaftrekCalculator } from "./ZelfstandigenaftrekCalculator";
export { default as MaxMortgageCalculator } from "./MaxMortgageCalculator";
export { default as AnnuityCalculator } from "./AnnuityCalculator";
export { default as HuurtoeslagCalculator } from "./HuurtoeslagCalculator";

// CalculatorHub (dekt ~30 eenvoudige calculators via calculator-configs)
export { default as CalculatorHub } from "./CalculatorHub";

// Foutafhandeling
export { CalculatorErrorBoundary } from "./CalculatorErrorBoundary";
export { CalculatorSkeleton } from "./CalculatorSkeleton";
