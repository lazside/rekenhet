/**
 * Content Page Registry — Index
 *
 * Import all content page files to register them.
 * Then export the lookup functions.
 */
import "./pages/bruto-netto-salaris-2026";
import "./pages/vakantiegeld-berekenen";
import "./pages/parttime-salaris-berekenen";
import "./pages/zwangerschap";
import "./pages/ideaal-gewicht";
import "./pages/investeringsaftrek";
import "./pages/omzetbelasting";
import "./pages/vakantiedagen";
import "./pages/ontslagvergoeding";
import "./pages/inflatie-calculator";
import "./pages/winst-verlies";
import "./pages/huurtoeslag";

export {
  registerPages,
  getContentPage,
  getAllContentSlugs,
  getAllContentPages,
} from "./types";
export type { SeoContentPage } from "./types";
