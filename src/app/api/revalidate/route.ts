/**
 * GET /api/revalidate
 *
 * On-demand revalidation endpoint.
 * Clears the in-memory cache and re-fetches tax rates from
 * external APIs, falling back to the local JSON if needed.
 *
 * This endpoint is secured with a REVALIDATION_TOKEN env var.
 * Without the token, requests are rejected (401).
 *
 * Usage:
 *   curl "https://rekenhet.nl/api/revalidate?token=your-secret-token"
 *
 * Scheduled usage (cron job):
 *   Every week via Vercel Cron, GitHub Actions, or a cronjob:
 *   curl "https://rekenhet.nl/api/revalidate?token=$TOKEN"
 *
 * Response:
 *   200 { success: true, source, ageMs, year }
 *   401 { error: "Unauthorized" }
 *   500 { error: "..." }
 */
import { NextRequest, NextResponse } from "next/server";
import { fetchTaxRates } from "@/lib/rates";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // ── Auth check ──
  const token = request.nextUrl.searchParams.get("token");
  const expected = process.env.REVALIDATION_TOKEN;

  if (expected && token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Re-fetch (cache is cleared inside fetchTaxRates via import)
    const result = await fetchTaxRates();

    return NextResponse.json({
      success: true,
      source: result.source,
      year: result.data.year,
      fetchedAt: result.fetchedAt,
      ageMs: result.ageMs,
      note: "Tax rates refreshed successfully",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[REVALIDATE ERROR]", message);

    return NextResponse.json(
      { error: "Revalidation failed", detail: message },
      { status: 500 }
    );
  }
}
