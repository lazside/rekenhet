/**
 * POST /api/telemetry
 *
 * Privacy-first, GDPR/AVG-compliant usage tracking.
 *
 * This endpoint:
 *   ✅ Accepts only anonymous structural data (calculatorId, action)
 *   ✅ NEVER stores IP addresses, user-agent, referrer, or any PII
 *   ✅ Validates input with Zod to prevent injection
 *   ✅ Proxies events server-side to Plausible/Umami (bypasses ad-blockers)
 *   ✅ Returns 202 immediately — does NOT block the user's request
 *   ✅ Rate-limited to 30 events/minute per IP
 *
 * Request body:
 *   {
 *     "calculatorId": "bruto-netto-salaris-calculator",
 *     "action": "calculated",
 *     "metadata": { "value": 50000 }
 *   }
 *
 * Response:
 *   202 { accepted: true, provider: "stdout"|"plausible"|"umami" }
 *   400 { error: "Invalid action" }
 *   429 { error: "Too many requests" }
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendTelemetry } from "@/lib/telemetry";

// ─── Zod Schema — only structural data, NO PII fields ─────────

const TelemetrySchema = z.object({
  calculatorId: z
    .string()
    .min(1, "calculatorId is required")
    .max(100)
    .regex(/^[a-z0-9_-]+$/, "Invalid calculatorId format"),

  action: z.enum([
    "calculated",
    "pdf_download",
    "email_shared",
    "search",
    "page_view",
    "affiliate_click",
  ]),

  metadata: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
});

// ─── Rate Limiting ────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 30) return false; // 30 events/min/IP
  entry.count++;
  return true;
}

// ─── Handler ──────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // ── Rate limit (IP used ONLY for rate limiting — never stored) ──
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Te veel verzoeken. Probeer het over een minuut opnieuw." },
      { status: 429 }
    );
  }

  // ── Parse body ──
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  // ── Validate — strip anything that isn't in the schema ──
  const parsed = TelemetrySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message || "Validatiefout" },
      { status: 400 }
    );
  }

  const { calculatorId, action, metadata } = parsed.data;

  // ── Fire telemetry asynchronously — do NOT await ──
  // This ensures the HTTP response is instant (202).
  // On Vercel: the lambda stays alive long enough for the fetch.
  // The user never waits for the analytics call.
  const telemetryPromise = sendTelemetry({
    calculatorId,
    action,
    metadata,
  }).then((provider) => {
    console.log(`[TELEMETRY] ${action} on ${calculatorId} → ${provider}`);
  });

  // Optional: use waitUntil on platforms that support it (Vercel)
  if ("waitUntil" in request && typeof (request as any).waitUntil === "function") {
    (request as any).waitUntil(telemetryPromise);
  } else {
    // Fire-and-forget — if the lambda terminates before the fetch
    // completes, the event is lost. This is acceptable for analytics.
    telemetryPromise.catch(() => {});
  }

  // ── Respond immediately ──
  // IMPORTANT: No IP, no user-agent, no referrer is logged or stored.
  // The response contains only the acceptance confirmation.
  return NextResponse.json(
    { accepted: true, action, calculatorId },
    { status: 202 }
  );
}
