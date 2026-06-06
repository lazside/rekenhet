/**
 * Email Library — central export.
 */
export { sendEmail } from "./send";
export { subscribeToNewsletter } from "./newsletter";
export { buildCalculationEmailHtml } from "./templates/calculation-result";
export type { CalculationData } from "./templates/calculation-result";
