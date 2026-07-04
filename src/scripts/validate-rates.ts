/**
 * Validatie: Belastingtarieven — Consistentie Check
 *
 * Controleert of alle belastingtarieven in het project consistent zijn
 * over de verschillende bestanden heen.
 *
 * Gebruik: npx tsx src/scripts/validate-rates.ts
 */

import { CONFIG_2025, CONFIG_2026 } from "../lib/calculators/tax-comparison";

const TAX_RATES_2026 = {
  brackets: [
    { min: 0, max: 40018, rate: 35.82 },
    { min: 40018, max: 76817, rate: 37.48 },
    { min: 76817, max: Infinity, rate: 49.50 },
  ],
  ahk: { max: 3070, phaseOutStart: 24928, phaseOutRate: 6.595 },
  ak: { max: 5598, phaseOutStart: 40018, phaseOutRate: 6.51 },
};

const TAX_RATES_2025 = {
  brackets: [
    { min: 0, max: 38441, rate: 35.82 },
    { min: 38441, max: 76817, rate: 37.48 },
    { min: 76817, max: Infinity, rate: 49.50 },
  ],
  ahk: { max: 3068, phaseOutStart: 24821, phaseOutRate: 6.595 },
  ak: { max: 5599, phaseOutStart: 39958, phaseOutRate: 6.51 },
};

let errors = 0;

function check(label: string, expected: number, actual: number, source: string) {
  if (Math.abs(expected - actual) > 0.001) {
    console.log(`  ❌ [RATE] ${label}: verwacht ${expected}, maar ${source} heeft ${actual}`);
    errors++;
  }
}

function checkInt(label: string, expected: number, actual: number, source: string) {
  if (expected !== actual) {
    console.log(`  ❌ [RATE] ${label}: verwacht ${expected}, maar ${source} heeft ${actual}`);
    errors++;
  }
}

console.log("\n🔢 Belastingtarieven — Consistentie Check\n");

// ── 1. Check 2026 brackets (bruto-netto-2026.ts vs tax-comparison.ts) ──
console.log("📊 2026 Belastingschijven:");

for (let i = 0; i < TAX_RATES_2026.brackets.length; i++) {
  const expected = TAX_RATES_2026.brackets[i];
  const actual = CONFIG_2026.brackets[i];
  check(`2026 schijf ${i + 1} min`, expected.min, actual.min, "tax-comparison.ts");
  check(`2026 schijf ${i + 1} max`, expected.max === Infinity ? Infinity : expected.max, actual.max, "tax-comparison.ts");
  check(`2026 schijf ${i + 1} rate`, expected.rate, actual.rate, "tax-comparison.ts");
}

// ── 2. Check 2025 brackets ──
console.log("\n📊 2025 Belastingschijven:");
for (let i = 0; i < TAX_RATES_2025.brackets.length; i++) {
  const expected = TAX_RATES_2025.brackets[i];
  const actual = CONFIG_2025.brackets[i];
  check(`2025 schijf ${i + 1} min`, expected.min, actual.min, "tax-comparison.ts");
  check(`2025 schijf ${i + 1} max`, expected.max === Infinity ? Infinity : expected.max, actual.max, "tax-comparison.ts");
  check(`2025 schijf ${i + 1} rate`, expected.rate, actual.rate, "tax-comparison.ts");
}

// ── 3. Check heffingskortingen ──
console.log("\n📊 Algemene heffingskorting 2026:");
checkInt("AHK max", 3070, CONFIG_2026.algemeneHK.max, "tax-comparison.ts");
checkInt("AHK phaseOutStart", 24928, CONFIG_2026.algemeneHK.phaseOutStart, "tax-comparison.ts");
check("AHK phaseOutRate", 6.595, CONFIG_2026.algemeneHK.phaseOutRate, "tax-comparison.ts");

console.log("\n📊 Arbeidskorting 2026:");
checkInt("AK max", 5598, CONFIG_2026.arbeidskorting.max, "tax-comparison.ts");
checkInt("AK phaseOutStart", 40018, CONFIG_2026.arbeidskorting.phaseOutStart, "tax-comparison.ts");
check("AK phaseOutRate", 6.51, CONFIG_2026.arbeidskorting.phaseOutRate, "tax-comparison.ts");

console.log("\n📊 Algemene heffingskorting 2025:");
checkInt("AHK max", 3068, CONFIG_2025.algemeneHK.max, "tax-comparison.ts");
checkInt("AHK phaseOutStart", 24821, CONFIG_2025.algemeneHK.phaseOutStart, "tax-comparison.ts");

console.log("\n📊 Arbeidskorting 2025:");
checkInt("AK max", 5599, CONFIG_2025.arbeidskorting.max, "tax-comparison.ts");
checkInt("AK phaseOutStart", 39958, CONFIG_2025.arbeidskorting.phaseOutStart, "tax-comparison.ts");

// ── Summary ──
console.log("");
if (errors > 0) {
  console.log(`  ❌ ${errors} inconsistentie(s) gevonden — tarieven wijken af tussen bestanden!\n`);
} else {
  console.log("  ✅ Alle tarieven consistent tussen bruto-netto-2026.ts en tax-comparison.ts\n");
}
