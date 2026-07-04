import { Calculator, BookOpen, Sparkles, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface TrustStatsProps {
  calculatorCount: number;
  categoryCount: number;
}

/**
 * TrustStats — key metrics row below the hero
 *
 * Shows: #calculators, #categories, year badge, "100% free"
 */
export function TrustStats({ calculatorCount, categoryCount }: TrustStatsProps) {
  const stats = [
    { value: calculatorCount, label: "Gratis Calculators", icon: Calculator },
    { value: categoryCount, label: "Categorieën", icon: BookOpen },
    { value: "2026", label: "Bijgewerkt tot juli 2026", icon: Sparkles },
    { value: "100%", label: "Gratis — geen registratie", icon: Heart },
  ];

  return (
    <section className="border-b border-gray-100 bg-white">
      <Container className="py-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-5 animate-card-enter"
              style={{ animationDelay: `${i * 0.05}s` } as React.CSSProperties}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 mb-2.5">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold tabular-nums text-gray-900 leading-none mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 text-center leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
