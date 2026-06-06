export function maxMortgage(income: number, partnerIncome: number, rente: number, looptijd: number) {
  const maxFactor = 4.5; const totalIncome = income + partnerIncome * 0.9;
  const maxLoan = totalIncome * maxFactor;
  const r = rente / 100 / 12; const n = looptijd * 12;
  const maandLast = maxLoan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return { maxHypotheek: Math.round(maxLoan), maandlasten: Math.round(maandLast), maxFactor };
}
