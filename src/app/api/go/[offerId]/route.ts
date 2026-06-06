/**
 * GET /api/go/[offerId]
 *
 * Click tracking redirect for affiliate offers.
 * 
 * Flow:
 *   1. User clicks an offer card → href="/go/boekhouden-beste"
 *   2. This endpoint logs the click (telemetry)
 *   3. Redirects 302 to the actual affiliate URL
 *   4. Browser navigates to the partner site (referrer masked)
 *
 * This provides:
 *   ✅ Click tracking without client-side scripts
 *   ✅ No referrer leakage (we redirect, so the target sees our domain)
 *   ✅ Telemetry logging (can be correlated with conversion data)
 *   ✅ Link cloaking (affiliate URLs aren't exposed in the page HTML)
 */
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getOfferById } from "@/lib/affiliate/lookup";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ offerId: string }> }
) {
  const { offerId } = await params;
  const offer = getOfferById(offerId);

  if (!offer) {
    // Invalid offer ID → redirect to homepage
    redirect("/");
  }

  // Log the click (async, fire-and-forget)
  console.log(
    JSON.stringify({
      t: "affiliate_click",
      ts: new Date().toISOString(),
      offerId: offer.id,
      offerName: offer.name,
    })
  );

  // Redirect to the affiliate URL
  // The rel="noopener noreferrer" is handled by the redirect — the
  // target site sees our domain as the referrer, not the user's previous page.
  redirect(offer.url);
}
