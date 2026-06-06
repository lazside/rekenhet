/**
 * verify-routes.js — Standalone URL validation script
 *
 * Parses the Rekenhet.nl sitemap XML and checks every URL for
 * HTTP status < 400. Reports broken or redirected routes.
 *
 * Usage:
 *   node scripts/verify-routes.js                          ← fetch live sitemap
 *   SITEMAP_URL=http://localhost:3000/sitemap.xml node ...  ← local dev server
 *   CONCURRENCY=20 node ...                                 ← tune parallelism
 *
 * Exit code: 0 if all OK, 1 if any route is broken.
 * CI-ready: wire into GitHub Actions, pre-deploy hooks, or npm test.
 */

const http = require("http");
const https = require("https");

// ─── Config ───────────────────────────────────────────────────

const SITEMAP_URL =
  process.env.SITEMAP_URL || "https://rekenhet.nl/sitemap.xml";
const CONCURRENCY = Math.min(parseInt(process.env.CONCURRENCY || "10", 10), 50);
const TIMEOUT_MS = 15_000;          // per-request timeout
const MAX_REDIRECTS = 3;

// ─── Stats ────────────────────────────────────────────────────

const stats = { total: 0, ok: 0, skipped: 0, failed: 0, redirected: 0 };
const failures: { url: string; status: number; msg: string }[] = [];

// ─── HTTP fetch helper (HEAD with GET fallback) ────────────────

function fetchUrl(
  url: string,
  method: "HEAD" | "GET",
  redirectCount = 0
): Promise<{ status: number; finalUrl: string }> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === "https:" ? https : http;
    const req = mod.request(
      url,
      {
        method,
        headers: {
          "User-Agent": "Rekenhet-Verify/1.0 (+https://rekenhet.nl)",
          Accept: "text/html,application/xhtml+xml,application/xml",
        },
        timeout: TIMEOUT_MS,
        // Follow redirects manually to track them
        rejectUnauthorized: false,
      },
      (res) => {
        const status = res.statusCode || 500;
        const location = res.headers.location;

        // Handle redirect (up to MAX_REDIRECTS)
        if (status >= 300 && status < 400 && location && redirectCount < MAX_REDIRECTS) {
          res.resume();
          const redirectUrl = location.startsWith("http")
            ? location
            : new URL(location, url).href;
          fetchUrl(redirectUrl, "HEAD", redirectCount + 1)
            .then((r) => resolve({ ...r, status }))
            .catch(reject);
          return;
        }

        // HEAD often returns 405 (Method Not Allowed) on SSG pages.
        // If HEAD fails, try GET with a small range to avoid downloading the full page.
        res.resume();

        if (status === 405 && method === "HEAD") {
          // Retry with GET + Range: bytes=0-0
          fetchUrl(url, "GET", redirectCount)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (status === 206 && method === "GET") {
          // Partial content via Range header — that's a success for our purposes
          resolve({ status: 200, finalUrl: url });
          return;
        }

        resolve({ status, finalUrl: url });
      }
    );

    req.on("error", (err: Error) =>
      reject(new Error(`${url}: ${err.message}`))
    );
    req.on("timeout", () => {
      req.destroy();
      reject(new Error(`${url}: timeout after ${TIMEOUT_MS}ms`));
    });

    // For GET with range header
    if (method === "GET") {
      req.setHeader("Range", "bytes=0-0");
    }

    req.end();
  });
}

// ─── Sitemap XML parser ──────────────────────────────────────

function parseSitemap(xml: string): string[] {
  const urls: string[] = [];
  // Simple regex-based XML parser (no deps needed)
  const locRegex = /<loc>([^<]+)<\/loc>/gi;
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(xml)) !== null) {
    const loc = match[1].trim();
    if (loc) urls.push(loc);
  }
  return urls;
}

// ─── Fetch sitemap ────────────────────────────────────────────

function fetchSitemap(sitemapUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(sitemapUrl);
    const mod = parsed.protocol === "https:" ? https : http;

    mod.get(
      sitemapUrl,
      {
        headers: {
          "User-Agent": "Rekenhet-Verify/1.0 (+https://rekenhet.nl)",
          Accept: "application/xml, text/xml",
        },
        timeout: TIMEOUT_MS,
      },
      (res) => {
        if ((res.statusCode || 500) >= 400) {
          reject(
            new Error(
              `Sitemap returned ${res.statusCode} for ${sitemapUrl}`
            )
          );
          return;
        }
        let data = "";
        res.on("data", (chunk: string) => (data += chunk));
        res.on("end", () => resolve(data));
      }
    ).on("error", reject);
  });
}

// ─── Verifier ─────────────────────────────────────────────────

async function verifyUrl(url: string): Promise<void> {
  const label = url.replace("https://rekenhet.nl", "");

  try {
    const { status, finalUrl } = await fetchUrl(url, "HEAD");

    if (status >= 400) {
      stats.failed++;
      const msg =
        status === 405
          ? "HEAD not allowed (retried with GET)"
          : `HTTP ${status}`;
      failures.push({ url, status, msg });
      console.log(`  ❌ ${status} ${label} — ${msg}`);
    } else if (status >= 300) {
      stats.redirected++;
      console.log(`  ↪ ${status} ${label} → ${finalUrl.replace("https://rekenhet.nl", "")}`);
    } else {
      stats.ok++;
    }
  } catch (err: any) {
    stats.failed++;
    const msg = err?.message || String(err);
    failures.push({ url, status: 0, msg });
    console.log(`  ❌ ERROR ${label} — ${msg}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();
  console.log("\n╔════════════════════════════════════════════════╗");
  console.log("║   Rekenhet.nl — Route Verification Script    ║");
  console.log("╚════════════════════════════════════════════════╝\n");

  // 1. Fetch sitemap
  console.log(`○ Fetching sitemap: ${SITEMAP_URL}`);
  let xml: string;
  try {
    xml = await fetchSitemap(SITEMAP_URL);
  } catch (err: any) {
    console.error(`\n✖ Failed to fetch sitemap: ${err.message}`);
    console.log("  Make sure the server is running, or set SITEMAP_URL.");
    process.exit(1);
  }

  // 2. Parse URLs
  const allUrls = parseSitemap(xml);
  if (allUrls.length === 0) {
    console.error("\n✖ No URLs found in sitemap. Check the XML format.");
    process.exit(1);
  }
  console.log(`○ Parsed ${allUrls.length} URLs from sitemap\n`);

  // 3. Filter out external / non-200 expected
  const internalUrls = allUrls.filter((u) => u.includes("rekenhet.nl"));
  stats.skipped = allUrls.length - internalUrls.length;
  stats.total = internalUrls.length;

  // 4. Verify URLs with concurrency limit
  let completed = 0;
  const queue = [...internalUrls];

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift()!;
      await verifyUrl(url);
      completed++;
      if (completed % 50 === 0 || completed === stats.total) {
        const pct = ((completed / stats.total) * 100).toFixed(0);
        console.log(`  [${completed}/${stats.total} (${pct}%)]`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, () => worker())
  );

  // 5. Report
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("\n╔════════════════════════════════════════════════╗");
  console.log("║                 VERIFICATION REPORT           ║");
  console.log("╚════════════════════════════════════════════════╝");
  console.log(`  Total URLs : ${stats.total}`);
  console.log(`  OK         : ${stats.ok}`);
  console.log(`  Redirected : ${stats.redirected}`);
  console.log(`  Skipped    : ${stats.skipped}`);
  console.log(`  ❌ Failed   : ${stats.failed}`);
  console.log(`  Time       : ${elapsed}s`);

  if (failures.length > 0) {
    console.log("\n── Broken Routes ──");
    for (const f of failures) {
      const path = f.url.replace("https://rekenhet.nl", "");
      console.log(`  ❌ ${f.status} ${path} — ${f.msg}`);
    }

    if (failures.length > 5) {
      console.log(`\n  (${failures.length - 5} more failures not shown — check full log)`);
    }

    console.log("\n✖ Verification FAILED. Fix broken routes before deploying.\n");
    process.exit(1);
  }

  console.log("\n✓ All routes verified successfully. Ready for deployment.\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("\n✖ Script error:", err.message);
  process.exit(1);
});
