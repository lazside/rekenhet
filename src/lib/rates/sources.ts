/**
 * External Data Sources for Dutch Tax Rates
 *
 * Defines the URLs and parsing logic for each external API that
 * the fetcher will try (in order) before falling back to local JSON.
 */
import type { TaxRates } from "./types";

// ─── Source Definition ─────────────────────────────────────────

export interface DataSource {
  id: string;
  name: string;
  url: string;
  /** How to parse the response into TaxRates, or null if unsupported */
  parser: (json: unknown) => TaxRates | null;
  priority: number; // Lower = tried first
}

// ─── CBS Open Data (StatLine) ─────────────────────────────────

/**
 * CBS StatLine — Statistische data over belastingen.
 * CBS has various tables about tax revenue and rates.
 * Note: This is a generic endpoint — actual tax bracket data
 * may not be directly available as a structured API.
 */
function parseCbsResponse(json: unknown): TaxRates | null {
  // CBS returns data in a specific JSON-stat format
  // For now, return null to fall through to the local file
  // This stub can be extended when CBS exposes a stable tax-rates endpoint
  return null;
}

// ─── Belastingdienst Open Data ────────────────────────────────

/**
 * Belastingdienst — official Dutch tax authority.
 * Publishes tariff tables in various formats.
 * The actual endpoint URL would change yearly.
 */
function parseBelastingdienstResponse(json: unknown): TaxRates | null {
  // Placeholder — Belastingdienst does not currently offer
  // a stable JSON API for tax brackets.
  // This placeholder will parse the response when they do.
  return null;
}

// ─── Overheid.io ───────────────────────────────────────────────

/**
 * Overheid.io — third-party Dutch government data API.
 * Requires an API key via OVERHEID_IO_KEY env var.
 */
function parseOverheidIoResponse(json: unknown): TaxRates | null {
  try {
    const data = json as Record<string, unknown>;
    // Overheid.io returns tax data in their own format
    // TODO: Map to TaxRates when endpoint structure is known
    return null;
  } catch {
    return null;
  }
}

// ─── Registry ──────────────────────────────────────────────────

/**
 * Ordered list of external data sources.
 * The fetcher tries each one in order until one succeeds.
 */
export const DATA_SOURCES: DataSource[] = [
  {
    id: "cbs",
    name: "CBS StatLine — Belastingen",
    url: "https://opendata.cbs.nl/ODataApi/odata/83765NED/TypedDataSet",
    parser: parseCbsResponse,
    priority: 1,
  },
  {
    id: "belastingdienst",
    name: "Belastingdienst — Tarieven",
    url: "https://data.overheid.nl/api/...",
    parser: parseBelastingdienstResponse,
    priority: 2,
  },
  {
    id: "overheid-io",
    name: "Overheid.io — Belastingtarieven",
    url: "https://api.overheid.io/v1/belastingdienst/tarieven",
    parser: parseOverheidIoResponse,
    priority: 3,
  },
];
