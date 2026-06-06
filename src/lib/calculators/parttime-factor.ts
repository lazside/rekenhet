export function parttimeFactor(fulltimeSalary: number, hoursFull: number, hoursPart: number) {
  const factor = hoursPart / hoursFull; return { factor: Math.round(factor * 100) / 100, pct: Math.round(factor * 100), parttimeSalary: Math.round(fulltimeSalary * factor * 100) / 100 };
}
