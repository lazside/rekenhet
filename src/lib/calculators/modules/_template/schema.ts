import { z } from "zod";

/**
 * TODO: Definieer de Zod-schema's voor input validatie.
 * Gebruik dit als client-side validatie in de UI en server-side in API routes.
 */
export const MijnCalculatorSchema = z.object({
  // TODO: voeg velden toe
  voorbeeld: z.number().min(0, "Mag niet negatief zijn").max(999999),
});

export type MijnCalculatorSchemaType = z.infer<typeof MijnCalculatorSchema>;
