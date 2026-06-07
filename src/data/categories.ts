import {
  Calculator,
  Percent,
  Scale,
  Heart,
  TrendingUp,
  PiggyBank,
  Home,
  Car,
  Calculator as CalcIcon,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "werk-en-inkomen",
    title: "Werk & Inkomen",
    description: "Bereken salaris, toeslagen, verlof en meer",
    icon: TrendingUp as LucideIcon,
    color: "bg-emerald-500",
  },
  {
    slug: "ondernemen",
    title: "Ondernemen",
    description: "BTW, winst, marges en zakelijke berekeningen",
    icon: Calculator as LucideIcon,
    color: "bg-blue-500",
  },
  {
    slug: "geld-en-verzekeringen",
    title: "Geld & Verzekeringen",
    description: "Rente, hypotheek, leningen, verzekeringen",
    icon: PiggyBank as LucideIcon,
    color: "bg-violet-500",
  },
  {
    slug: "gezondheid",
    title: "Gezondheid",
    description: "BMI, calorieën, hartslag, gezondheidsdata",
    icon: Heart as LucideIcon,
    color: "bg-rose-500",
  },
  {
    slug: "wiskunde",
    title: "Wiskunde",
    description: "Rekenen, procenten, eenheden, formules",
    icon: Percent as LucideIcon,
    color: "bg-amber-500",
  },
  {
    slug: "auto-vervoer",
    title: "Auto & Vervoer",
    description: "Kenteken, wegenbelasting, ritkosten, boetes",
    icon: Car as LucideIcon,
    color: "bg-blue-500",
  },
  {
    slug: "algemeen",
    title: "Algemeen",
    description: "Datum, tijd, leeftijd, dagelijkse tools",
    icon: CalcIcon as LucideIcon,
    color: "bg-slate-500",
  },
  {
    slug: "hypotheek",
    title: "Hypotheek & Wonen",
    description: "Maximale hypotheek, energielabel, maandlasten en duurzaamheidsleningen",
    icon: Home as LucideIcon,
    color: "bg-indigo-500",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
