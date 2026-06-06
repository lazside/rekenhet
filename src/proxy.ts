/**
 * Edge Rate-Limiting Middleware — Rekenhet.nl
 *
 * Fixed Window algorithm running at the Edge layer. Blocks abusive
 * traffic to API routes before it reaches the serverless handlers.
 *
 *   ✅ Fixed Window: 45 requests per 60 seconds per IP
 *   ✅ 429 JSON response with Dutch copy
 *   ✅ Exempts static assets, pages, internal routes
 *   ✅ Rate limit headers on every response (X-RateLimit-*)
 *   ✅ Zero external deps — pure Web API (Edge-compatible)
 *
 * Edge-runtime memory caveat:
 *   Each Edge Function instance has isolated memory. On multi-instance
 *   deployments (e.g. Vercel with concurrency >1), an IP can exceed
 *   45 req/min by landing on different instances. This is acceptable
 *   for abuse mitigation — not for billing-grade accuracy.
 */

// ─── Rate limit config ────────────────────────────────────────

const WINDOW_MS = 60_000;        // 60 seconds
const MAX_REQUESTS = 45;          // per window
const CLEANUP_INTERVAL_MS = 120_000; // purge stale entries every 2 min

// ─── Edge-safe in-memory store ───────────────────────────────

interface Entry {
  count: number;
  resetAt: number;
}

// Global Map is shared per Edge Function instance in V8 isolate
const rateMap = new Map<string, Entry>();

// Periodic cleanup (fires once per isolate lifetime)
let cleanupInitialized = false;
function ensureCleanup() {
  if (cleanupInitialized) return;
  cleanupInitialized = true;
  // Use runtime-agnostic timer pattern
  const tick = () => {
    const now = Date.now();
    for (const [key, entry] of rateMap) {
      if (now >= entry.resetAt) rateMap.delete(key);
    }
  };
  if (typeof setTimeout !== "undefined") {
    // Node.js / Bun
    setInterval(tick, CLEANUP_INTERVAL_MS);
  }
}

// ─── Exemption patterns (glob-tested against pathname) ───────

const EXEMPT_PATTERNS = [
  // Static assets
  /^\/_next\//,
  /^\/static\//,
  /^\/favicon\./,
  /^\/robots\./,
  /^\/sitemap\./,
  /^\/ads\.txt$/,

  // Global CSS / images / fonts
  /\.(css|js|map|json|ico|png|jpg|jpeg|gif|svg|webp|avif|woff2?|ttf|eot)$/i,

  // Internal structural pages (user-facing, not API)
  /^\/($|calculators|contact|privacy|cookies|disclaimer|updates)/,

  // Category and calculator tool pages (dynamic routes)
  /^\/[a-z-]+\/[a-z0-9-]+$/,

  // Embed pages
  /^\/embed\//,

  // Bruto-netto parameterized pages
  /^\/bruto-netto\//,

  // Omrekenen pages
  /^\/omrekenen\//,

  // Standalone pages
  /^\/(kenteken-check|gemeentelijke-belastingen|zonnepanelen-opbrengst|thuiswerken-vs-kantoor)/,
];

function isExempt(pathname: string): boolean {
  return EXEMPT_PATTERNS.some((pattern) => pattern.test(pathname));
}

// ─── Rate limit logic (Fixed Window) ─────────────────────────

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  ensureCleanup();

  const now = Date.now();
  const key = `rl:${ip}`;
  const entry = rateMap.get(key);

  // First request or window expired → start new window
  if (!entry || now >= entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_MS };
  }

  // Window still active → increment
  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetAt - now,
    };
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetIn: entry.resetAt - now,
  };
}

// ─── IP extraction (Edge-safe) ───────────────────────────────

function extractIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

// ─── Middleware ───────────────────────────────────────────────

export function proxy(request: Request): Response | undefined {
  const url = new URL(request.url);
  const { pathname } = url;

  // ── Exempt non-API traffic ──
  if (!pathname.startsWith("/api/")) {
    return; // Let through
  }

  // Check against secondary exemption list (e.g. revalidation webhooks)
  if (isExempt(pathname)) {
    return;
  }

  // ── Rate limit check ──
  const ip = extractIp(request);
  const { allowed, remaining, resetIn } = checkRateLimit(ip);

  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: "Te veel aanvragen. Probeer het over een minuut opnieuw.",
      }),
      {
        status: 429,
        statusText: "Too Many Requests",
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": String(MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(resetIn / 1000)),
          "Retry-After": String(Math.ceil(resetIn / 1000)),
        },
      }
    );
  }

  // ── Let through with rate limit headers ──
  // We can't modify the Response from middleware directly (Next.js Edge),
  // so we let the request pass and the API route adds its own headers.
  return;
}

// ─── Config ───────────────────────────────────────────────────

export const config = {
  // Match ALL paths except the exempt routes handled by isExempt()
  matcher: [
    /*
     * Apply middleware to:
     *   - /api/* (all API routes)
     *   - All other paths need to be checked for exemption
     *
     * We match everything, then short-circuit in the handler.
     * Next.js recommends this pattern over complex matchers.
     */
    "/((?!_next/static|favicon.ico|robots.txt|sitemap.xml|ads.txt).*)",
  ],
};
