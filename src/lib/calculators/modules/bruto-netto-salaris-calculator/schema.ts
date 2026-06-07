import { z } from "zod";

/**
 * Zod validation schema for Bruto Netto calculator inputs.
 */
export const BrutoNettoSchema = z.object({
  brutoJaar: z.number().min(0, "Bruto jaarsalaris mag niet negatief zijn").max(9_999_999, "Maximaal €9.999.999"),
  vakantiegeldInbegrepen: z.boolean(),
  bijtellingPercentage: z.number().min(0).max(22),
  catalogusWaarde: z.number().min(0).optional().default(0),
  eigenBijdrage: z.number().min(0).optional().default(0),
  algemeneHeffingskorting: z.boolean(),
  arbeidskorting: z.boolean(),
});

export type BrutoNettoSchemaType = z.infer<typeof BrutoNettoSchema>;
