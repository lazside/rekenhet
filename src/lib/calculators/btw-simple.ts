export function calculateBtw(bedrag: number, tarief: number, isInclusief: boolean) {
  if (isInclusief) { const excl = bedrag / (1 + tarief / 100); return { bedrag, btw: Math.round((bedrag - excl) * 100) / 100, exclusief: Math.round(excl * 100) / 100, inclusief: bedrag }; }
  const btw = bedrag * (tarief / 100); return { bedrag, btw: Math.round(btw * 100) / 100, exclusief: bedrag, inclusief: Math.round((bedrag + btw) * 100) / 100 };
}
