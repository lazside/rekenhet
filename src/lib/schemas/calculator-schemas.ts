import { z } from "zod";

// ─── Core Input Schemas ───────────────────────────────────────────

export const numberField = (min = 0, max = 1_000_000_000) =>
  z.coerce
    .number()
    .finite()
    .min(min, { message: `Minimaal ${min}` })
    .max(max, { message: `Maximaal ${max}` });

export const positiveNumber = (max = 1_000_000_000) =>
  numberField(0, max);

export const percentField = () =>
  z.coerce
    .number()
    .min(0, { message: "Minimaal 0%" })
    .max(1000, { message: "Maximaal 1000%" });

export const yearField = (min = 1900, max = 2100) =>
  z.coerce
    .number()
    .int()
    .min(min, { message: `Minimaal ${min}` })
    .max(max, { message: `Maximaal ${max}` });

export const textField = (maxLength = 255) =>
  z.string().max(maxLength).optional();

// ─── Calculator-specific Schemas ──────────────────────────────────

export const BtwCalculatorSchema = z.object({
  bedrag: positiveNumber(99_999_999),
  btwTarief: z.enum(["21", "9", "0"]),
  berekenWijze: z.enum(["exclusief", "inclusief"]),
});

export const BrutoNettoSalarisSchema = z.object({
  brutoJaarSalaris: positiveNumber(99_999_999),
  leeftijd: yearField(16, 99),
  vakantietoeslag: z.boolean().default(true),
  dertiendeMaand: z.boolean().default(false),
});

export type BtwCalculatorInput = z.infer<typeof BtwCalculatorSchema>;
export type BrutoNettoSalarisInput = z.infer<typeof BrutoNettoSalarisSchema>;
