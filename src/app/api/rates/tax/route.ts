/**
 * GET /api/rates/tax
 *
 * Public endpoint for fetching current Dutch tax rates.
 *
 * Response:
 *   200 {
 *     data: TaxRates,
 *     source: "cache" | "api" | "fallback",
 *     fetchedAt: string,
 *     ageMs: number
 *   }
 *   500 { error: string }
 *
 * Cache headers:
 *   Cache-Control: public, max-age=300, stale-while-revalidate=3600
 *   (5-minute CDN cache, 1-hour stale revalidation)
 *
 * Usage from frontend:
 *   const res = await fetch('/api/rates/tax');
 *   const { data } = await res.json();
 *   // data.brackets, data.heffingskortingen, etc.
 */
import { NextResponse } from "next/server";
import { fetchTaxRates } from "@/lib/rates";

export const dynamic = "force-dynamic"; // No static generation — always fresh

export async function GET() {
  try {
    const result = await fetchTaxRates();

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
        "X-Data-Source": result.source,
        "X-Data-Age-Ms": String(result.ageMs),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch tax rates";
    console.error("[RATES API ERROR]", message);

    return NextResponse.json(
      { error: "Kon belastingtarieven niet ophalen", detail: message },
      { status: 500 }
    );
  }
}
