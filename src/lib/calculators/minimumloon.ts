/**
 * Minimumloon Calculator — 2026
 *
 * Wettelijk minimumloon per uur per leeftijdscategorie.
 * Vanaf 2024 is er geen vast minimummaandloon meer; het maandloon
 * wordt berekend op basis van het wettelijk minimumuurloon.
 *
 * ─── Minimumuurloon 2026 (per 1 juli 2026) ───
 *   21 jaar en ouder: €14,99
 *   20 jaar: €11,99  (80%)
 *   19 jaar: €8,99   (60%)
 *   18 jaar: €7,50   (50%)
 *   17 jaar: €5,92   (39,5%)
 *   16 jaar: €5,17   (34,5%)
 *   15 jaar: €4,50   (30%)
 *
 * Van 1 jan t/m 30 jun 2026 was het minimumloon €14,71/uur (21+).
 */

// ─── Types ──────────────────────────────────────────────────────

export interface MinimumloonInput {
  leeftijd: number;
  urenPerWeek: number;
  /** Periode: 1e halfjaar (jan-jun) of 2e halfjaar (jul-dec) */
  periode: "eerste" | "tweede";
}

export interface MinimumloonUitslag {
  uurloon: number;
  maandloonBruto: number;
  jaarBruto: number;
  /** Indicatie netto per maand (simplified) */
  nettoMaand: number;
  leeftijdLabel: string;
  leeftijdskorting: number;
  bron: string;
}

// ─── Minimumloon per leeftijd (percentage van 21+) ────────────

const LEEFTIJD_TABEL: Record<number, { pct: number; label: string }> = {
  21: { pct: 100, label: "21 jaar of ouder" },
  20: { pct: 80, label: "20 jaar" },
  19: { pct: 60, label: "19 jaar" },
  18: { pct: 50, label: "18 jaar" },
  17: { pct: 39.5, label: "17 jaar" },
  16: { pct: 34.5, label: "16 jaar" },
  15: { pct: 30, label: "15 jaar" },
};

const MINIMUM_UREN_21 = {
  eerste: 14.71,   // jan-jun 2026
  tweede: 14.99,   // jul-dec 2026
} as const;

// ─── Weken per maand (gemiddeld) ──────────────────────────────

const WEKEN_PER_MAAND = 52 / 12; // ~4,33

// ─── Compute ────────────────────────────────────────────────────

export function berekenMinimumloon(input: MinimumloonInput): MinimumloonUitslag {
  const { leeftijd, urenPerWeek, periode } = input;

  // Leeftijd normaliseren: minimum 15, maximum 21+
  const normLeeftijd = Math.max(15, Math.min(21, leeftijd));
  const leeftijdEntry = LEEFTIJD_TABEL[normLeeftijd] || LEEFTIJD_TABEL[21];

  const basisUurloon = MINIMUM_UREN_21[periode];
  const uurloon = basisUurloon * (leeftijdEntry.pct / 100);

  const wekenPerJaar = 52;
  const maandloon = uurloon * urenPerWeek * WEKEN_PER_MAAND;
  const jaarBruto = uurloon * urenPerWeek * wekenPerJaar;

  // Netto schatting: simpele vuistregel ~78% gemiddeld voor minimumloon
  // (lage inkomens hebben recht op volledige heffingskortingen)
  const nettoMaand = Math.round(maandloon * 0.78 * 100) / 100;

  return {
    uurloon: Math.round(uurloon * 100) / 100,
    maandloonBruto: Math.round(maandloon * 100) / 100,
    jaarBruto: Math.round(jaarBruto * 100) / 100,
    nettoMaand,
    leeftijdLabel: leeftijdEntry.label,
    leeftijdskorting: 100 - leeftijdEntry.pct,
    bron: `Wettelijk minimumloon ${periode === "eerste" ? "1e helft" : "2e helft"} 2026 — Rijksoverheid.nl`,
  };
}
