"use client";

import { useState } from "react";
import { Home, Users, Euro, PiggyBank, Info, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareToolbar } from "@/components/share/ShareToolbar";

// ─── 2026 Huurtoeslag parameters (Belastingdienst / RVO) ──────

const KWALITEITSKORTINGSGRENS = 300.69;
const AFTOPPINGSGRENS_1P = 652.07;
const AFTOPPINGSGRENS_2P = 698.75;
const MAXIMALE_HUURGRENS = 879.66;

const DREMPELPCT_ALLEENSTAAND = 0.153;
const DREMPELPCT_MEERPERSOONS = 0.130;

const TOESLAG_PERCENTAGE = 0.65;
const MAX_TOESLAG_1P = 4188;    // jaarbedrag bij aftoppingsgrens
const MAX_TOESLAG_2P = 4446;

const VERMOGENSGRENS_ALLEEN = 63285;
const VERMOGENSGRENS_MEER = 126570;

// ─── Types ─────────────────────────────────────────────────────

type LeeftijdGroep = "onder23" | "23ofouder";
type Huishouden = "alleenstaand" | "meerpersoons" | "medebewoner";

interface HuurtoeslagResult {
  /** Berekende jaarlijkse huurtoeslag */
  toeslagPerJaar: number;
  toeslagPerMaand: number;
  /** Deel van de huur dat de overheid vergoedt */
  basishuurPerMaand: number;
  drempelhuurPerMaand: number;
  rekenhuurPerMaand: number;
  /** Toeslag als percentage van de basishuur */
  dekkingsPercentage: number;
  /** In aanmerking? */
  eligible: boolean;
  /** Reden bij niet in aanmerking */
  reden?: string;
  /** Maximale mogelijke toeslag */
  maxMogelijk: number;
}

// ─── Berekening ──────────────────────────────────────────────

function berekenHuurtoeslag(
  kaleHuur: number,
  serviceKosten: number,
  inkomen: number,
  leeftijdGroep: LeeftijdGroep,
  huishouden: Huishouden,
  vermogen: number,
  medebewonerBijdrage: number,
): HuurtoeslagResult {
  // 1. Rekenhuur
  const rekenhuur = Math.round((kaleHuur + serviceKosten) * 100) / 100;

  // 2. Leeftijdscheck (onder 23: lagere kwaliteitskortingsgrens)
  const kwalGrens = leeftijdGroep === "onder23"
    ? Math.min(KWALITEITSKORTINGSGRENS, 292.52)
    : KWALITEITSKORTINGSGRENS;

  // 3. Maximale huurgrens check
  if (rekenhuur > MAXIMALE_HUURGRENS) {
    return {
      toeslagPerJaar: 0,
      toeslagPerMaand: 0,
      basishuurPerMaand: 0,
      drempelhuurPerMaand: 0,
      rekenhuurPerMaand: rekenhuur,
      dekkingsPercentage: 0,
      eligible: false,
      reden: `Uw rekenhuur (€${rekenhuur.toFixed(2)}) is hoger dan de maximale huurgrens van €${MAXIMALE_HUURGRENS}. U komt niet in aanmerking voor huurtoeslag.`,
      maxMogelijk: 0,
    };
  }

  // 4. Vermogenstoets
  const vermogensGrens = huishouden === "alleenstaand" || huishouden === "medebewoner"
    ? VERMOGENSGRENS_ALLEEN
    : VERMOGENSGRENS_MEER;
  if (vermogen > vermogensGrens) {
    return {
      toeslagPerJaar: 0,
      toeslagPerMaand: 0,
      basishuurPerMaand: 0,
      drempelhuurPerMaand: 0,
      rekenhuurPerMaand: rekenhuur,
      dekkingsPercentage: 0,
      eligible: false,
      reden: `Uw vermogen (€${vermogen.toLocaleString("nl-NL")}) is hoger dan de vermogensgrens van €${vermogensGrens.toLocaleString("nl-NL")}.`,
      maxMogelijk: 0,
    };
  }

  // 5. Drempelhuur (inkomensafhankelijk)
  let drempelPct: number;
  if (leeftijdGroep === "onder23") {
    drempelPct = 0.122; // lager voor <23
  } else if (huishouden === "alleenstaand") {
    drempelPct = DREMPELPCT_ALLEENSTAAND;
  } else {
    drempelPct = DREMPELPCT_MEERPERSOONS;
  }

  // Medebewoners: bijdrage verlaagt de drempelhuur
  const nettoInkomen = huishouden === "medebewoner"
    ? Math.max(0, inkomen - medebewonerBijdrage)
    : inkomen;

  const drempelhuurPerMaand = Math.round(nettoInkomen * drempelPct * 100 / 12) / 100;

  // 6. Basishuur = rekenhuur - drempelhuur
  let basishuur = Math.max(0, rekenhuur - drempelhuurPerMaand);

  // 7. Aftoppingsgrens (max rekenhuur waarover toeslag wordt berekend)
  const aftoppingsgrens = huishouden === "alleenstaand" || huishouden === "medebewoner"
    ? AFTOPPINGSGRENS_1P
    : AFTOPPINGSGRENS_2P;

  // Basishuur mag de aftoppingsgrens niet overschrijden (na correctie)
  const maxBasishuur = Math.max(0, aftoppingsgrens - drempelhuurPerMaand);
  const effectieveBasishuur = Math.min(basishuur, maxBasishuur);

  // 8. Kwaliteitskortingscorrectie (voor rekenhuur boven kwaliteitskortingsgrens)
  let toeslagOver;
  if (rekenhuur <= kwalGrens) {
    // Volledige basishuur wordt vergoed
    toeslagOver = effectieveBasishuur;
  } else {
    // Alleen het deel tot de aftoppingsgrens
    toeslagOver = Math.max(0, aftoppingsgrens - drempelhuurPerMaand);
  }

  // 9. Toeslag = 65% van de toeslaggrondslag
  const toeslagPerMaandRuw = toeslagOver * TOESLAG_PERCENTAGE;
  const toeslagPerJaar = Math.round(toeslagPerMaandRuw * 12);
  const toeslagPerMaand = Math.round(toeslagPerMaandRuw);

  // 10. Maximum bepaling (wat zou maximaal kunnen)
  const maxBasishuurMogelijk = Math.max(0, Math.min(rekenhuur, aftoppingsgrens) - drempelhuurPerMaand);
  const maxMogelijk = Math.round(Math.max(0, maxBasishuurMogelijk * TOESLAG_PERCENTAGE) * 12);

  return {
    toeslagPerJaar,
    toeslagPerMaand,
    basishuurPerMaand: Math.round(effectieveBasishuur * 100) / 100,
    drempelhuurPerMaand: Math.round(drempelhuurPerMaand * 100) / 100,
    rekenhuurPerMaand: rekenhuur,
    dekkingsPercentage: Math.round(TOESLAG_PERCENTAGE * 100),
    eligible: toeslagPerJaar > 0,
    maxMogelijk,
  };
}

// ─── Formatteringen ──────────────────────────────────────────

function formatEur(bedrag: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(bedrag);
}

// ─── Component ────────────────────────────────────────────────

export default function HuurtoeslagCalculator() {
  const [kaleHuur, setKaleHuur] = useState(750);
  const [serviceKosten, setServiceKosten] = useState(25);
  const [inkomen, setInkomen] = useState(32000);
  const [leeftijd, setLeeftijd] = useState<LeeftijdGroep>("23ofouder");
  const [huishouden, setHuishouden] = useState<Huishouden>("alleenstaand");
  const [vermogen, setVermogen] = useState(20000);
  const [medebewonerBijdrage, setMedebewonerBijdrage] = useState(0);

  const result = berekenHuurtoeslag(
    kaleHuur, serviceKosten, inkomen,
    leeftijd, huishouden, vermogen, medebewonerBijdrage
  );

  return (
    <div className="space-y-6">
      {/* ─── Input ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 dark:text-white">
          <Home className="h-4 w-4 text-teal-500" />
          Huurtoeslag 2026
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 -mt-2">
          Bereken je huurtoeslag op basis van je werkelijke situatie
        </p>

        <div className="grid grid-cols-2 gap-3">
          {/* Kale huur */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">
              Kale huur (€/mnd)
            </label>
            <input type="number" value={kaleHuur} onChange={(e) => setKaleHuur(parseFloat(e.target.value) || 0)} min={0} max={1200} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 [appearance:textfield]" />
          </div>

          {/* Servicekosten */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">
              Servicekosten (€/mnd)
            </label>
            <input type="number" value={serviceKosten} onChange={(e) => setServiceKosten(parseFloat(e.target.value) || 0)} min={0} max={500} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 [appearance:textfield]" />
          </div>

          {/* Inkomen */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">
              Toetsingsinkomen (€/jr)
            </label>
            <input type="number" value={inkomen} onChange={(e) => setInkomen(parseFloat(e.target.value) || 0)} min={0} max={200000} step={500} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 [appearance:textfield]" />
          </div>

          {/* Vermogen */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">
              Vermogen Box 3 (€)
            </label>
            <input type="number" value={vermogen} onChange={(e) => setVermogen(parseFloat(e.target.value) || 0)} min={0} max={500000} step={1000} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 [appearance:textfield]" />
          </div>

          {/* Leeftijd */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Leeftijd</label>
            <select value={leeftijd} onChange={(e) => setLeeftijd(e.target.value as LeeftijdGroep)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
              <option value="23ofouder">23 jaar of ouder</option>
              <option value="onder23">Jonger dan 23 jaar</option>
            </select>
          </div>

          {/* Huishouden */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Huishouden</label>
            <select value={huishouden} onChange={(e) => setHuishouden(e.target.value as Huishouden)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
              <option value="alleenstaand">Alleenstaand</option>
              <option value="meerpersoons">Meerpersoonshuishouden</option>
              <option value="medebewoner">Medebewoner / Student</option>
            </select>
          </div>

          {/* Medebewonerbijdrage (alleen zichtbaar bij medebewoner) */}
          {huishouden === "medebewoner" && (
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-medium text-gray-500 dark:text-slate-400">
                Maandelijkse bijdrage aan hoofdhuurder (€)
              </label>
              <input type="number" value={medebewonerBijdrage} onChange={(e) => setMedebewonerBijdrage(parseFloat(e.target.value) || 0)} min={0} max={1000} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 [appearance:textfield]" />
            </div>
          )}
        </div>
      </div>

      {/* ─── Results ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-teal-500" />
          Jouw huurtoeslag
        </h3>

        {result.eligible ? (
          <>
            {/* Hoofdresultaat */}
            <div className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-700 p-5 text-white text-center shadow-sm mb-4">
              <p className="text-xs text-teal-200">Huurtoeslag per maand</p>
              <p className="text-3xl font-bold tabular-nums mt-1">
                {formatEur(result.toeslagPerMaand)}
              </p>
              <p className="text-xs text-teal-200 mt-2">
                {formatEur(result.toeslagPerJaar)} per jaar
              </p>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 p-3 text-center border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
                <p className="text-[10px] text-gray-500 dark:text-slate-400">Rekenhuur</p>
                <p className="text-sm font-bold text-gray-700 dark:text-slate-200 tabular-nums">{formatEur(result.rekenhuurPerMaand)}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 text-center border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
                <p className="text-[10px] text-gray-500 dark:text-slate-400">Drempelhuur</p>
                <p className="text-sm font-bold text-gray-700 dark:text-slate-200 tabular-nums">{formatEur(result.drempelhuurPerMaand)}</p>
              </div>
              <div className="rounded-lg bg-teal-50 p-3 text-center border border-teal-100 dark:bg-teal-900/20 dark:border-teal-900/30">
                <p className="text-[10px] text-teal-600 dark:text-teal-400">Basishuur</p>
                <p className="text-sm font-bold text-teal-700 dark:text-teal-300 tabular-nums">{formatEur(result.basishuurPerMaand)}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 text-center border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
                <p className="text-[10px] text-gray-500 dark:text-slate-400">Dekking</p>
                <p className="text-sm font-bold text-gray-700 dark:text-slate-200 tabular-nums">{result.dekkingsPercentage}%</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 dark:bg-amber-900/20 dark:border-amber-800">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Geen recht op huurtoeslag
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 leading-relaxed">
                {result.reden || "Op basis van de ingevoerde gegevens kom je niet in aanmerking voor huurtoeslag."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─── Uitleg ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 dark:text-white flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-teal-500" />
          Hoe wordt huurtoeslag berekend?
        </h3>
        <div className="space-y-2 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
          <p><strong className="text-gray-700 dark:text-slate-300">1. Rekenhuur</strong> = kale huur + servicekosten (max {formatEur(MAXIMALE_HUURGRENS)})</p>
          <p><strong className="text-gray-700 dark:text-slate-300">2. Drempelhuur</strong> = inkomensafhankelijk deel ({Math.round(DREMPELPCT_ALLEENSTAAND * 100)}% voor alleenstaand, {Math.round(DREMPELPCT_MEERPERSOONS * 100)}% voor meerpersoons)</p>
          <p><strong className="text-gray-700 dark:text-slate-300">3. Basishuur</strong> = rekenhuur − drempelhuur (dit wordt gesubsidieerd)</p>
          <p><strong className="text-gray-700 dark:text-slate-300">4. Toeslag</strong> = {TOESLAG_PERCENTAGE * 100}% van de basishuur (binnen de aftoppingsgrens)</p>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/30" role="note" aria-label="Juridische disclaimer">
        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm1 2a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 8 7Z" clipRule="evenodd" />
        </svg>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          <strong className="font-medium text-slate-600 dark:text-slate-300">Disclaimer:</strong>{" "}
          De getoonde resultaten zijn indicatieve berekeningen op basis van openbare overheidsgegevens (2026). De exacte huurtoeslag kan afwijken op basis van persoonlijke omstandigheden. Raadpleeg de Belastingdienst Toeslagen voor een definitieve berekening.
        </p>
      </div>

      {/* ── Share ── */}
      <ShareToolbar
        calculatorType="huurtoeslag"
        calculatorName="Huurtoeslag Berekenen 2026"
        categoryName="Geld & Verzekeringen"
        inputs={[
          { label: "Kale huur", value: `€${kaleHuur}` },
          { label: "Inkomen", value: `€${inkomen}` },
        ]}
        results={[
          { label: "Huurtoeslag", value: formatEur(result.toeslagPerMaand), type: "success" as const },
        ]}
      />
    </div>
  );
}
