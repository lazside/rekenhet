export function annuity(hoofdsom: number, rentePct: number, looptijdJaren: number) {
  const r = rentePct / 100 / 12; const n = looptijdJaren * 12;
  const maandLast = hoofdsom * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totaal = maandLast * n; const rente = totaal - hoofdsom;
  return { maandlasten: Math.round(maandLast * 100) / 100, totaal: Math.round(totaal * 100) / 100, totaleRente: Math.round(rente * 100) / 100 };
}
