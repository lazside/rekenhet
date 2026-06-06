/**
 * POST /api/share-calculation
 *
 * Emails a user their calculation results, with optional newsletter signup.
 *
 * Request body (JSON):
 *   {
 *     "email": "user@example.com",
 *     "calculatorType": "bruto-netto-salaris-calculator",
 *     "calculatorName": "Bruto Netto Salaris Calculator",
 *     "categoryName": "Werk & Inkomen",
 *     "inputs": [{ "label": "Bruto jaarsalaris", "value": "€ 50.000" }, ...],
 *     "results": [{ "label": "Netto per maand", "value": "€ 3.150", "type": "success" }, ...],
 *     "marketingConsent": false
 *   }
 *
 * Response:
 *   200 { success: true, message: "..." }
 *   400 { success: false, error: "..." }  — validation error
 *   500 { success: false, error: "..." }  — server error
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, subscribeToNewsletter, buildCalculationEmailHtml } from "@/lib/email";
import { SITE_NAME, SITE_URL } from "@/lib/seo/title-builder";

// ─── Zod Validation Schema ─────────────────────────────────────

const ResultItemSchema = z.object({
  label: z.string().min(1, "Result label is required").max(200),
  value: z.string().min(1, "Result value is required").max(200),
  type: z.enum(["default", "success", "warning", "info", "highlight"]).optional(),
});

const InputItemSchema = z.object({
  label: z.string().min(1).max(200),
  value: z.string().min(1).max(200),
});

const ShareCalculationSchema = z.object({
  email: z
    .string()
    .email("Ongeldig e-mailadres")
    .max(254, "E-mailadres is te lang"),
  calculatorType: z
    .string()
    .min(1, "Calculatortype is verplicht")
    .max(100),
  calculatorName: z
    .string()
    .min(1, "Calculatornaam is verplicht")
    .max(200),
  categoryName: z.string().max(100).optional().default(""),
  inputs: z
    .array(InputItemSchema)
    .min(1, "Minstens één invoerveld is verplicht")
    .max(50, "Maximaal 50 invoervelden toegestaan"),
  results: z
    .array(ResultItemSchema)
    .min(1, "Minstens één resultaat is verplicht")
    .max(50, "Maximaal 50 resultaten toegestaan"),
  marketingConsent: z.boolean().default(false),
});

// ─── Rate limiting (basic in-memory) ───────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 3) {
    return false; // Max 3 requests per minute per IP
  }

  entry.count++;
  return true;
}

// ─── Handler ───────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const start = Date.now();

  // ── Rate limit ──
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Te veel verzoeken. Probeer het over een minuut opnieuw." },
      { status: 429 }
    );
  }

  // ── Parse body ──
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Ongeldige JSON in aanvraag" },
      { status: 400 }
    );
  }

  // ── Validate ──
  const parsed = ShareCalculationSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      {
        success: false,
        error: firstError?.message || "Validatiefout",
        field: firstError?.path.join(".") || undefined,
      },
      { status: 400 }
    );
  }

  const { email, calculatorType, calculatorName, categoryName, inputs, results, marketingConsent } = parsed.data;

  try {
    // ── 1. Build email HTML ──
    const html = buildCalculationEmailHtml({
      calculatorName,
      calculatorUrl: `${SITE_URL}/${calculatorType}`,
      categoryName,
      inputs,
      results,
      generatedAt: new Date().toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    // ── 2. Send email ──
    const emailResult = await sendEmail({
      to: email,
      subject: `Jouw ${calculatorName} resultaat — ${SITE_NAME}`,
      html,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: "Kon de e-mail niet versturen. Probeer het later opnieuw." },
        { status: 500 }
      );
    }

    // ── 3. Newsletter subscription (if consented) ──
    let newsletterResult = { success: true };
    if (marketingConsent) {
      newsletterResult = await subscribeToNewsletter(email, {
        calculator_type: calculatorType,
        source: "share-calculation",
      });
    }

    const duration = Date.now() - start;

    return NextResponse.json({
      success: true,
      message: `Berekening verstuurd naar ${email}`,
      emailSent: true,
      newsletterSubscribed: marketingConsent && newsletterResult.success,
      durationMs: duration,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Onbekende fout";
    console.error("[SHARE-CALCULATION ERROR]", message);
    return NextResponse.json(
      { success: false, error: "Er is een fout opgetreden. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

// ─── OPTIONS for CORS preflight ────────────────────────────────

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
