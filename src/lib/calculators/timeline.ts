/**
 * Investment & Depreciation Timeline Engine
 *
 * Models:
 *   - Linear asset depreciation (vehicles, equipment)
 *   - Cumulative cost savings (solar, renovation)
 *   - Remaining equity value over time
 */

export interface TimelineYear {
  year: number;
  /** Original asset value at purchase */
  originalValue: number;
  /** Current depreciated value */
  depreciatedValue: number;
  /** Cumulative depreciation so far */
  cumulativeDepreciation: number;
  /** Accumulated running costs */
  runningCosts: number;
  /** Cumulative savings (if applicable) */
  cumulativeSavings: number;
  /** Net position: (depreciatedValue + savings) - runningCosts */
  netPosition: number;
}

/**
 * Calculate linear depreciation over a given lifespan.
 * 
 * @param purchasePrice - Initial cost of the asset
 * @param residualValue - Value at end of life (e.g., 20% of purchase)
 * @param lifespanYears - How many years until fully depreciated
 * @param annualRunningCost - Yearly cost (insurance, tax, maintenance)
 * @param annualSavings - Yearly savings/income from the asset (e.g., energy savings)
 * @param horizon - How many years to model (default 10)
 */
export function calculateTimeline(
  purchasePrice: number,
  residualValue: number,
  lifespanYears: number,
  annualRunningCost: number,
  annualSavings: number = 0,
  horizon: number = 10
): TimelineYear[] {
  const years: TimelineYear[] = [];
  const annualDepreciation = (purchasePrice - residualValue) / lifespanYears;

  for (let y = 1; y <= horizon; y++) {
    const depreciationThisYear = y <= lifespanYears ? annualDepreciation : 0;
    const currentValue = Math.max(residualValue, purchasePrice - depreciationThisYear * y);
    const cumulativeDep = purchasePrice - currentValue;
    const runningCosts = annualRunningCost * y;
    const cumulativeSavings = annualSavings * y;
    const netPosition = currentValue + cumulativeSavings - runningCosts;

    years.push({
      year: y,
      originalValue: purchasePrice,
      depreciatedValue: Math.round(currentValue),
      cumulativeDepreciation: Math.round(cumulativeDep),
      runningCosts: Math.round(runningCosts),
      cumulativeSavings: Math.round(cumulativeSavings),
      netPosition: Math.round(netPosition),
    });
  }

  return years;
}

/**
 * Quick vehicle depreciation (common Dutch rule: ~20% first year, then ~15% annually).
 */
export function calculateVehicleDepreciation(
  catalogusPrijs: number,
  annualRunningCost: number,
  annualSavings: number = 0,
  horizon: number = 10
): TimelineYear[] {
  // First year: 20% loss, then 15% per year on remaining value
  const years: TimelineYear[] = [];
  let currentValue = catalogusPrijs;

  for (let y = 1; y <= horizon; y++) {
    const depRate = y === 1 ? 0.2 : 0.15;
    const depreciationThisYear = Math.round(currentValue * depRate);
    currentValue = Math.round(Math.max(catalogusPrijs * 0.1, currentValue - depreciationThisYear));

    const runningCosts = annualRunningCost * y;
    const cumulativeSavings = annualSavings * y;
    const netPosition = currentValue + cumulativeSavings - runningCosts;

    years.push({
      year: y,
      originalValue: catalogusPrijs,
      depreciatedValue: currentValue,
      cumulativeDepreciation: catalogusPrijs - currentValue,
      runningCosts,
      cumulativeSavings,
      netPosition,
    });
  }

  return years;
}
