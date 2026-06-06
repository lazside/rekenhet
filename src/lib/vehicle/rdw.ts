/**
 * RDW Open Data API Client
 *
 * Fetches vehicle specifications from the official Dutch RDW API.
 * Results are cached in-memory for 24 hours to prevent throttling.
 *
 * Endpoints:
 *   Basiskenmerken: m9d7-ebf2
 *   Brandstof:      8ys7-d773
 *   APK Keuringen:  vkij-7mwc
 */

interface RdwVehicleData {
  kenteken: string;
  merk: string;
  handelsbenaming: string;
  massa_ledig_voertuig: number;
  catalogusprijs: number;
  brandstof_omschrijving: string;
  co2_uitstoot_gecombineerd: number;
  datum_eerste_toelating: string;
  zuinigheidslabel: string;
  apkVervaldatum?: string;
}

// ─── Cache ────────────────────────────────────────────────────

const cache = new Map<string, { data: RdwVehicleData; expiresAt: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function sanitizePlate(plate: string): string {
  return plate.replace(/[-.\s]/g, "").toUpperCase();
}

// ─── RDW API Endpoints ────────────────────────────────────────

const RDW_SPECS = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";   // Gekentekende voertuigen (Basiskenmerken)
const RDW_FUEL  = "https://opendata.rdw.nl/resource/8ys7-d773.json";   // Brandstof (Uitstoot, verbruik)
const RDW_APK   = "https://opendata.rdw.nl/resource/vkij-7mwc.json";   // Keuringen (Vervaldatums APK)

export async function fetchVehicleData(rawPlate: string): Promise<{
  data: RdwVehicleData | null;
  error?: string;
  source: "cache" | "api";
}> {
  const plate = sanitizePlate(rawPlate);
  if (!plate || plate.length < 4 || plate.length > 8) {
    return { data: null, error: "Ongeldig kentekenformaat — voer een Nederlands kenteken in (bv. AB-12-CD).", source: "cache" };
  }

  // Check cache
  const cached = cache.get(plate);
  if (cached && Date.now() < cached.expiresAt) {
    return { data: cached.data, source: "cache" };
  }

  try {
    const [specsRes, fuelRes, apkRes] = await Promise.allSettled([
      fetch(`${RDW_SPECS}?kenteken=${plate}`, { signal: AbortSignal.timeout(6000) }),
      fetch(`${RDW_FUEL}?kenteken=${plate}`,  { signal: AbortSignal.timeout(6000) }),
      fetch(`${RDW_APK}?kenteken=${plate}`,   { signal: AbortSignal.timeout(6000) }),
    ]);

    // SPECS is required — fail if unavailable
    if (specsRes.status !== "fulfilled" || !specsRes.value.ok) {
      return { data: null, error: "RDW-database niet bereikbaar — probeer het later opnieuw.", source: "api" };
    }

    const specsJson = await specsRes.value.json();
    if (!specsJson || specsJson.length === 0) {
      return { data: null, error: `Kenteken "${plate}" niet gevonden in de RDW-database.`, source: "api" };
    }

    const spec = specsJson[0];

    // Fuel is optional — fall back to spec data
    let fuel: Record<string, unknown> = {};
    if (fuelRes.status === "fulfilled" && fuelRes.value.ok) {
      const fuelJson = await fuelRes.value.json();
      fuel = fuelJson && fuelJson.length > 0 ? fuelJson[0] : {};
    }

    // APK is optional
    let apkVervaldatum: string | undefined;
    if (apkRes.status === "fulfilled" && apkRes.value.ok) {
      const apkJson = await apkRes.value.json();
      if (apkJson && apkJson.length > 0) {
        apkVervaldatum = apkJson[0]?.vervaldatum_apk_dt || apkJson[0]?.vervaldatum_apk || undefined;
      }
    }

    const result: RdwVehicleData = {
      kenteken: plate,
      merk: spec?.merk || "Onbekend",
      handelsbenaming: spec?.handelsbenaming || spec?.merk || "",
      massa_ledig_voertuig: parseInt(spec?.massa_ledig_voertuig || spec?.massa_rijklaar || "0", 10),
      catalogusprijs: parseInt(spec?.catalogusprijs || "0", 10),
      brandstof_omschrijving: (fuel?.brandstof_omschrijving as string) || spec?.brandstof_omschrijving || "Onbekend",
      co2_uitstoot_gecombineerd: parseFloat(String(fuel?.co2_uitstoot_gecombineerd || spec?.co2_uitstoot_gecombineerd || "0")),
      datum_eerste_toelating: spec?.datum_eerste_toelating || "",
      zuinigheidslabel: spec?.zuinigheidslabel || "",
      apkVervaldatum,
    };

    cache.set(plate, { data: result, expiresAt: Date.now() + CACHE_TTL_MS });

    return { data: result, source: "api" };
  } catch (err: unknown) {
    const e = err as Error & { cause?: Error };
    const msg = e?.message || String(e);
    const name = e?.name || "";

    if (name === "TimeoutError" || name === "AbortError" || msg.includes("timeout") || msg.includes("abort")) {
      return { data: null, error: "De RDW-database reageert niet op tijd — probeer het opnieuw.", source: "api" };
    }
    if (msg.includes("fetch failed") || msg.includes("ENOTFOUND") || msg.includes("ECONNREFUSED")) {
      return { data: null, error: "Kan geen verbinding maken met de RDW-database — controleer je internetverbinding.", source: "api" };
    }
    if (msg.includes("rate") || msg.includes("429")) {
      return { data: null, error: "Te veel verzoeken achter elkaar — wacht even en probeer opnieuw.", source: "api" };
    }
    return { data: null, error: `Fout bij ophalen voertuiggegevens: ${msg.slice(0, 80)}`, source: "api" };
  }
}
