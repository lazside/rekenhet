/**
 * In-Memory Cache Layer
 *
 * Serverless-safe: uses a module-level Map with TTL expiry.
 * On Vercel/Next.js, this persists across requests in the same
 * serverless instance (though not across instances).
 *
 * For production with multiple instances, pair with Vercel Data Cache
 * or use `next: { revalidate }` in fetch options alongside this.
 */
import type { TaxRates, FetchResult } from "./types";

// ─── Cache Entry ───────────────────────────────────────────────

interface CacheEntry<T> {
  data: T;
  source: "cache" | "api" | "fallback";
  storedAt: number;
  ttlMs: number;
}

// ─── In-Memory Store ──────────────────────────────────────────

const store = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL_MS = 1000 * 60 * 60; // 1 hour

// ─── Public API ────────────────────────────────────────────────

/**
 * Get a cached value. Returns null if missing or expired.
 */
export function getFromCache<T>(key: string): CacheEntry<T> | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;

  const age = Date.now() - entry.storedAt;
  if (age > entry.ttlMs) {
    store.delete(key);
    return null;
  }

  return entry;
}

/**
 * Store a value in the cache.
 */
export function setCache<T>(
  key: string,
  data: T,
  source: "api" | "fallback",
  ttlMs: number = DEFAULT_TTL_MS
): void {
  store.set(key, {
    data,
    source,
    storedAt: Date.now(),
    ttlMs,
  });
}

/**
 * Build a FetchResult wrapper from cache or fresh data.
 */
export function toFetchResult<T>(
  data: T,
  source: "cache" | "api" | "fallback",
  storedAt?: number
): FetchResult<T> {
  return {
    data,
    source,
    fetchedAt: new Date().toISOString(),
    ageMs: storedAt ? Date.now() - storedAt : 0,
  };
}
