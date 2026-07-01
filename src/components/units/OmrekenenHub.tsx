
"use client";

import Link from "next/link";
import { Ruler, Weight, Square, Zap, Cpu, Flame, CookingPot, HardDrive, ArrowRight } from "lucide-react";

const CATEGORIES: Record<string, { icon: typeof Ruler; name: string; pairs: [string, string, string][] }> = {
  "lengte-omrekenen": {
    icon: Ruler,
    name: "Lengte",
    pairs: [
      ["mm", "cm", "Vierkante millimeters naar centimeters"],
      ["cm", "m", "Centimeters naar meters"],
      ["m", "km", "Meters naar kilometers"],
      ["cm", "inch", "Centimeters naar inches"],
      ["m", "ft", "Meters naar feet"],
      ["km", "mile", "Kilometers naar mijlen"],
    ],
  },
  "gewicht-omrekenen": {
    icon: Weight,
    name: "Gewicht",
    pairs: [
      ["mg", "g", "Milligrammen naar grammen"],
      ["g", "kg", "Grammen naar kilogrammen"],
      ["kg", "pond", "Kilogrammen naar ponden"],
      ["kg", "lbs", "Kilogrammen naar pounds"],
      ["g", "ons", "Grammen naar ons"],
      ["ounce", "g", "Ounces naar grammen"],
    ],
  },
  "oppervlakte-omrekenen": {
    icon: Square,
    name: "Oppervlakte",
    pairs: [
      ["mm2", "cm2", "Vierkante mm naar cm"],
      ["cm2", "m2", "Vierkante cm naar meters"],
      ["m2", "km2", "Vierkante meters naar kilometers"],
      ["m2", "ha", "Vierkante meters naar hectaren"],
      ["ha", "km2", "Hectaren naar vierkante kilometers"],
      ["are", "m2", "Aren naar vierkante meters"],
    ],
  },
  "auto-motor-omrekenen": {
    icon: Zap,
    name: "Auto & Motor",
    pairs: [
      ["kW", "pk", "Kilowatt naar pk"],
      ["pk", "kW", "Pk naar kilowatt"],
      ["Nm", "ft-lbs", "Newtonmeter naar foot-pound"],
      ["bar", "psi", "Bar naar PSI"],
      ["psi", "bar", "PSI naar bar"],
    ],
  },
  "energie-omrekenen": {
    icon: Zap,
    name: "Energie",
    pairs: [
      ["J", "kJ", "Joule naar kilojoule"],
      ["kWh", "J", "Kilowattuur naar joule"],
      ["BTU", "kWh", "BTU naar kWh"],
      ["cal", "J", "Calorie naar joule"],
      ["W", "kW-elec", "Watt naar kilowatt"],
    ],
  },
  "koken-omrekenen": {
    icon: CookingPot,
    name: "Koken & Bakken",
    pairs: [
      ["ml", "l", "Milliliter naar liter"],
      ["ml", "fl_oz", "Milliliter naar fluid ounce"],
      ["ml", "cups", "Milliliter naar cups"],
      ["tbsp", "ml", "Eetlepels naar milliliter"],
      ["tsp", "ml", "Theelepels naar milliliter"],
      ["g-water", "g-bloem", "Water naar bloem (gram)"],
    ],
  },
  "data-omrekenen": {
    icon: HardDrive,
    name: "Data",
    pairs: [
      ["MB", "GB", "Megabyte naar gigabyte"],
      ["GB", "TB", "Gigabyte naar terabyte"],
      ["Mb", "MB", "Megabit naar megabyte"],
      ["GB", "Mb", "Gigabyte naar megabit"],
    ],
  },
};

import { usePathname } from "next/navigation";

export default function OmrekenenHub() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "lengte-omrekenen";
  const cat = CATEGORIES[slug] || CATEGORIES["lengte-omrekenen"];
  if (!cat) {
    const allLinks = Object.values(CATEGORIES).flatMap((c) => c.pairs);
    return (
      <div className="space-y-6">
        {Object.entries(CATEGORIES).map(([key, val]) => (
          <div key={key} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <val.icon className="h-5 w-5 text-indigo-600" />
              <h2 className="text-sm font-semibold text-gray-900">{val.name} omrekenen</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {val.pairs.map(([from, to]) => (
                <Link
                  key={`${from}-${to}`}
                  href={`/omrekenen/${from}-naar-${to}`}
                  className="rounded-lg bg-gray-50 px-3 py-2.5 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-indigo-700 transition-colors text-center border border-transparent hover:border-blue-100"
                >
                  {from} → {to}
                </Link>
              ))}
            </div>
            <Link
              href={`/omrekenen/${val.pairs[0][0]}-naar-${val.pairs[0][1]}`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Alle {val.name.toLowerCase()} omrekeningen <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <cat.icon className="h-5 w-5 text-indigo-600" />
          <h2 className="text-sm font-semibold text-gray-900">{cat.name} omrekenen</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Kies een omrekening uit de lijst of gebruik een van de populaire opties hieronder.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {cat.pairs.map(([from, to, label]) => (
            <Link
              key={`${from}-${to}`}
              href={`/omrekenen/${from}-naar-${to}`}
              className="rounded-lg bg-gray-50 px-3 py-3 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-indigo-700 transition-colors text-center border border-transparent hover:border-blue-100"
              title={label}
            >
              <span className="text-sm font-semibold">{from} → {to}</span>
              <br />
              <span className="text-[10px] text-gray-400">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
