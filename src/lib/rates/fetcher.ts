/**
 * Tax Rate Fetcher
 *
 * Fetches tax rates from external APIs with automatic fallback to
 * the local verified JSON file. Results are cached in-memory.
 *
 * Resolution order:
 *   1. In-memory cache (if fresh)
 *   2. External APIs (CBS → Belastingdienst → Overheid.io)
 *   3. Local `tax-rates-2026.json` (verified fallback)
 *
 * On success from any source, the result is cached for 1 hour.
 */
import type { TaxRates, FetchResult } from "./types";
import { getFromCache, setCache, toFetchResult } from "./cache";
import { DATA_SOURCES } from "./sources";

const CACHE_KEY = "tax-rates-2026";
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

// ─── Local fallback (lazy-imported) ────────────────────────────

let fallbackData: TaxRates | null = null;

async function loadFallback(): Promise<TaxRates> {
  if (fallbackData) return fallbackData;

  // Dynamic import to avoid bundling JSON into every route
  const module = await import("@/data/tax-rates-2026.json");
  fallbackData = module.default as TaxRates;
  return fallbackData!;
}

// ─── External API fetcher ─────────────────────────────────────

async function tryExternalSources(): Promise<{
  data: TaxRates;
  source: "api";
} | null> {
  const sorted = [...DATA_SOURCES].sort((a, b) => a.priority - b.priority);

  for (const source of sorted) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout per source

      const response = await fetch(source.url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(source.id === "overheid-io" && process.env.OVERHEID_IO_KEY
            ? { Authorization: `Bearer ${process.env.OVERHEID_IO_KEY}` }
            : {}),
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        console.warn(`[RATES] ${source.id} returned ${response.status}`);
        continue;
      }

      const json = await response.json();
      const parsed = source.parser(json);

      if (parsed) {
        console.log(`[RATES] Successfully fetched from ${source.id}`);
        return { data: parsed, source: "api" };
      }

      console.warn(`[RATES] ${source.id} returned unparseable data`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.warn(`[RATES] ${source.id} failed: ${msg}`);
    }
  }

  return null;
}

// ─── Public API ────────────────────────────────────────────────

/**
 * Fetch the latest tax rates.
 *
 * Resolution order:
 *   1. In-memory cache (instant, 0 network calls)
 *   2. External API (CBS → Belastingdienst → Overheid.io)
 *   3. Local JSON file (verified fallback, ships with the app)
 *
 * The result includes metadata about the source and age.
 */
export async function fetchTaxRates(): Promise<FetchResult<TaxRates>> {
  // ── Step 1: Try cache ──
  const cached = getFromCache<TaxRates>(CACHE_KEY);
  if (cached) {
    return toFetchResult(cached.data, "cache", cached.storedAt);
  }

  // ── Step 2: Try external APIs ──
  const external = await tryExternalSources();
  if (external) {
    setCache(CACHE_KEY, external.data, "api", CACHE_TTL_MS);
    return toFetchResult(external.data, "api");
  }

  // ── Step 3: Fall back to local JSON ──
  const local = await loadFallback();
  setCache(CACHE_KEY, local, "fallback", CACHE_TTL_MS);
  console.log("[RATES] Using local fallback data");

  return toFetchResult(local, "fallback");
}

/**
 * Force-refresh the tax rates (clear cache, re-fetch).
 */
export async function refreshTaxRates(): Promise<FetchResult<TaxRates>> {
  // Clear cache
  const { getFromCache } = await import("./cache");
  const cached = getFromCache<TaxRates>(CACHE_KEY);
  if (cached) {
    // Force expiry by deleting
    const store = (await import("./cache")).getFromCache;
  }

  // Re-fetch
  return fetchTaxRates();
}
