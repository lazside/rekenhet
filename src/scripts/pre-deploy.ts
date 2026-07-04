/**
 * Pre-deploy Check — All-in-One
 *
 * Voert alle validaties uit vóór een livegang:
 *   1. TypeScript type check (tsc --noEmit)
 *   2. Consistentie check (calculator registry vs components)
 *   3. Belastingtarief consistentie
 *
 * Gebruik: npx tsx src/scripts/pre-deploy.ts
 * Of via npm: npm run pre-deploy
 */

import { execSync } from "child_process";

let exitCode = 0;

function run(label: string, command: string) {
  console.log(`\n═══════════════════════════════════════════════`);
  console.log(`  🔍 ${label}`);
  console.log(`  $ ${command}`);
  console.log(`═══════════════════════════════════════════════\n`);

  try {
    const output = execSync(command, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 120_000, // 2 min per stap
    });
    // Toon alleen errors/warnings
    const lines = output.split("\n").filter(
      (l) => l.includes("❌") || l.includes("⚠️") || l.includes("✅") || l.includes("error") || l.includes("Error")
    );
    if (lines.length > 0) {
      console.log(lines.join("\n"));
    }
    console.log(`  ✅ ${label} — geslaagd`);
  } catch (err: any) {
    console.error(`  ❌ ${label} — MISLUKT`);
    console.error(err.stderr || err.stdout || err.message);
    exitCode = 1;
  }
}

console.log(`
╔══════════════════════════════════════════╗
║     🚀 Rekenhet.nl — Pre-deploy Check   ║
╚══════════════════════════════════════════╝
`);

// ── Stap 1: TypeScript ──
run("TypeScript type check", "npx tsc --noEmit");

// ── Stap 2: Build (snelle check) ──
run("Next.js build (verbose)", "npx next build 2>&1 | tail -10");

// ── Stap 3: Calculator consistentie ──
run("Calculator consistency", "npx tsx src/scripts/check-consistency.ts");

// ── Stap 4: Belastingtarieven ──
run("Tax rate consistency", "npx tsx src/scripts/validate-rates.ts");

// ── Samenvatting ──
console.log(`
╔══════════════════════════════════════════╗
║     🏁 Pre-deploy Check — Voltooid       ║
╚══════════════════════════════════════════╝
`);
if (exitCode === 0) {
  console.log("  ✅ Alle checks geslaagd — klaar voor livegang!\n");
} else {
  console.log("  ❌ Een of meerdere checks mislukt — los de fouten op.\n");
}

process.exit(exitCode);
