
import { Calculator, Layers, Calendar, TrendingUp } from "lucide-react";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";

const TOTAL_CALCULATORS = getAllCalculators().length;
const TOTAL_CATEGORIES = categories.length;

/**
 * Platform stats widget for sidebar and homepage.
 * Shows live counts from the registries — zero maintenance.
 */
export function CalculatorStats({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${compact ? "" : ""}`}>
      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-indigo-600" />
        Rekenhet.nl in cijfers
      </h3>
      <div className={`grid ${compact ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
        <StatCard icon={Calculator} value={TOTAL_CALCULATORS} label="Calculators" compact={compact} />
        <StatCard icon={Layers} value={TOTAL_CATEGORIES} label="Categorieën" compact={compact} />
        <StatCard icon={Calendar} value="2026" label="Actuele cijfers" compact={compact} />
        <StatCard icon={TrendingUp} value="Gratis" label="Altijd gratis" compact={compact} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, compact }: { icon: typeof Calculator; value: string | number; label: string; compact: boolean }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 text-center">
      <Icon className="h-4 w-4 text-blue-500 mx-auto mb-1" />
      <p className="text-base font-bold text-gray-900 tabular-nums">{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  );
}
