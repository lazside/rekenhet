/**
 * Cross-calculator session state engine.
 *
 * Stores key numeric results from completed calculations in sessionStorage
 * so they can be passed between distinct calculator routes via query params.
 *
 * Keys stored:
 *   - netMonthlyIncome  → used by hypotheek, annuity, vakantiegeld
 *   - grossAnnualSalary → used by uurtarief, hypotheek
 *   - brutoYearly       → alias for grossAnnualSalary
 *   - calculationType   → which calculator created this state
 */

const STORAGE_KEY = "rekenhet_calc_state";

export interface CalculatorSessionState {
  netMonthlyIncome?: number;
  grossAnnualSalary?: number;
  brutoYearly?: number;
  hourlyRate?: number;
  hoursPerWeek?: number;
  btwExcluding?: number;
  btwIncluding?: number;
  btwPercentage?: number;
  distanceKm?: number;
  mortgageAmount?: number;
  savingsAmount?: number;
  calculationType?: string;
  savedAt?: number;
}

/** Save calculation results to sessionStorage */
export function saveCalculatorState(state: CalculatorSessionState): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadCalculatorState();
    const merged: CalculatorSessionState = {
      ...existing,
      ...state,
      savedAt: Date.now(),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // sessionStorage may be full or unavailable — degrade gracefully
  }
}

/** Load stored calculator state */
export function loadCalculatorState(): CalculatorSessionState {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as CalculatorSessionState;
  } catch {
    return {};
  }
}

/** Clear stored state */
export function clearCalculatorState(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Check if state is fresh (saved within the last hour) */
export function isStateFresh(state: CalculatorSessionState): boolean {
  if (!state.savedAt) return false;
  return Date.now() - state.savedAt < 60 * 60 * 1000;
}

/**
 * Generate a query-string URL for a target calculator,
 * pre-filling fields from the stored session state.
 */
export function buildBridgeUrl(
  targetSlug: string,
  state: CalculatorSessionState
): string | null {
  const params = new URLSearchParams();

  switch (targetSlug) {
    case "maximale-hypotheek":
      if (state.grossAnnualSalary || state.netMonthlyIncome) {
        params.set("income", String(state.grossAnnualSalary || (state.netMonthlyIncome || 0) * 12));
        return `/algemeen/maximale-hypotheek?${params.toString()}`;
      }
      return null;

    case "annuiteiten-lasten":
      if (state.mortgageAmount) {
        params.set("hoofdsom", String(state.mortgageAmount));
        return `/algemeen/annuiteiten-lasten?${params.toString()}`;
      }
      return null;

    case "netto-vakantiegeld":
      if (state.grossAnnualSalary) {
        params.set("salaris", String(state.grossAnnualSalary));
        return `/werk-en-inkomen/netto-vakantiegeld?${params.toString()}`;
      }
      return null;

    case "uurtarief-berekenen":
      if (state.grossAnnualSalary) {
        params.set("salaris", String(state.grossAnnualSalary));
        return `/werk-en-inkomen/uurtarief-berekenen?${params.toString()}`;
      }
      return null;

    case "bruto-netto-salaris-calculator":
      if (state.hourlyRate && state.hoursPerWeek) {
        params.set("salaris", String(state.hourlyRate * state.hoursPerWeek * 52));
        return `/werk-en-inkomen/bruto-netto-salaris-calculator?${params.toString()}`;
      }
      return null;

    case "compound-interest":
      if (state.savingsAmount) {
        params.set("startkapitaal", String(state.savingsAmount));
        return `/geld-en-verzekeringen/compound-interest?${params.toString()}`;
      }
      return null;

    default:
      return null;
  }
}

/**
 * Get all possible bridge targets with their labels and icons
 * based on the current session state.
 */
export function getBridgeTargets(state: CalculatorSessionState): {
  slug: string;
  label: string;
  description: string;
  url: string | null;
}[] {
  const targets = [
    {
      slug: "maximale-hypotheek",
      label: "Maximale Hypotheek",
      description: "Bereken je maximale hypotheek met dit inkomen",
      url: buildBridgeUrl("maximale-hypotheek", state),
    },
    {
      slug: "netto-vakantiegeld",
      label: "Netto Vakantiegeld",
      description: "Bereken je netto vakantietoeslag",
      url: buildBridgeUrl("netto-vakantiegeld", state),
    },
    {
      slug: "uurtarief-berekenen",
      label: "Uurtarief naar Maandloon",
      description: "Zet je salaris om naar uurtarief",
      url: buildBridgeUrl("uurtarief-berekenen", state),
    },
    {
      slug: "annuiteiten-lasten",
      label: "Annuïteitenhypotheek",
      description: "Bereken maandlasten voor een hypotheek",
      url: buildBridgeUrl("annuiteiten-lasten", state),
    },
    {
      slug: "compound-interest",
      label: "Vermogensgroei",
      description: "Bereken groei van je vermogen",
      url: buildBridgeUrl("compound-interest", state),
    },
  ];

  return targets.filter((t) => t.url !== null);
}
