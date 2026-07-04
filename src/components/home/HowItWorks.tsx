import { Search, PenLine, BarChart3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

interface HowItWorksProps {
  calculatorCount: number;
}

const STEPS = [
  {
    step: "1",
    icon: Search,
    title: "Kies een calculator",
    desc: (n: number) => `Blader door ${n}+ gratis calculators of gebruik de zoekfunctie.`,
  },
  {
    step: "2",
    icon: PenLine,
    title: "Vul je gegevens in",
    desc: () => "De calculator werkt met actuele 2026-tarieven, heffingskortingen en wettelijke regels.",
  },
  {
    step: "3",
    icon: BarChart3,
    title: "Zie direct het resultaat",
    desc: () => "Het resultaat verschijnt direct. Pas aan voor scenario's. Deel of download als PDF.",
  },
];

/**
 * HowItWorks — three-step explainer cards
 */
export function HowItWorks({ calculatorCount }: HowItWorksProps) {
  return (
    <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50/40 to-white">
      <Container className="py-16">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">Zo werkt het</Badge>
          <h2 className="text-2xl font-bold text-gray-900">Drie eenvoudige stappen</h2>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Geen registratie, geen installatie. Gewoon direct rekenen.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
          {STEPS.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="group relative rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 animate-card-enter"
                style={{ animationDelay: `${i * 0.05}s` } as React.CSSProperties}
              >
                <div className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 shadow-sm">
                  {item.step}
                </div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-amber-50 text-indigo-600 transition-transform duration-200 group-hover:scale-110">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc(calculatorCount)}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Al onze tools zijn 100% gratis, up-to-date met 2026 en werken op elk apparaat.
          </p>
        </div>
      </Container>
    </section>
  );
}
