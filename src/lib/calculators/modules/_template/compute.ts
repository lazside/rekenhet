/**
 * TODO: Plaats hier de pure rekenlogica.
 *
 * Elke functie moet:
 *   - Pure input → output zijn (geen side effects)
 *   - Alleen afhankelijk zijn van eigen parameters
 *   - getallen afronden met Math.round()
 */

export interface MijnCalculatorInput {
  // TODO: input types
  voorbeeld: number;
}

export interface MijnCalculatorResult {
  // TODO: output types
  uitkomst: number;
}

export function berekenMijnCalculator(input: MijnCalculatorInput): MijnCalculatorResult {
  const { voorbeeld } = input;

  // TODO: rekenlogica
  const uitkomst = voorbeeld * 1;

  return {
    uitkomst: Math.round(uitkomst * 100) / 100,
  };
}
