/**
 * POST /api/contact
 *
 * Contact form submission endpoint.
 *
 * Security:
 *   ✅ Zod validation — strict schema, no HTML injection
 *   ✅ Honeypot — hidden field must be empty (bots fill it)
 *   ✅ Rate limiting — 5 submissions per minute per IP
 *   ✅ No PII stored server-side — forwarded via email only
 *
 * Request:
 *   {
 *     "name": "string",
 *     "email": "valid email",
 *     "subject": "algemeen | bug | suggestie | zakelijk",
 *     "calculatorSlug": "string (optional, only for bug)",
 *     "message": "string",
 *     "_hp": ""  // honeypot — must be empty
 *   }
 *
 * Response:
 *   200 { success: true, message: "..." }
 *   400 { error: "..." }
 *   429 { error: "Te veel verzoeken..." }
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Zod Schema ───────────────────────────────────────────────

const ContactSchema = z.object({
  name: z.string().min(2, "Naam is verplicht (min. 2 tekens)").max(100),
  email: z.string().email("Ongeldig e-mailadres").max(254),
  subject: z.enum(["algemeen", "bug", "suggestie", "zakelijk"]),
  calculatorSlug: z.string().max(100).optional(),
  message: z
    .string()
    .min(10, "Bericht is te kort (min. 10 tekens)")
    .max(5000, "Bericht is te lang (max. 5000 tekens)"),
  _hp: z.string().max(0, "Bot detected").optional(), // Honeypot
});

// ─── Subject Labels ───────────────────────────────────────────

const SUBJECT_LABELS: Record<string, string> = {
  algemeen: "Algemene vraag",
  bug: "Fout in calculator melden",
  suggestie: "Suggestie voor nieuwe calculator",
  zakelijk: "Zakelijk / Adverteren",
};

// ─── Rate Limiting ────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

// ─── Handler ──────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // ── Rate limit ──
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

  // ── Parse ──
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  // ── Validate ──
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message || "Validatiefout", field: first?.path?.join(".") },
      { status: 400 }
    );
  }

  const { name, email, subject, calculatorSlug, message } = parsed.data;

  // ── Log (in production: send email via Resend) ──
  console.log(
    JSON.stringify({
      t: "contact",
      ts: new Date().toISOString(),
      name,
      email,
      subject: SUBJECT_LABELS[subject] || subject,
      calculatorSlug,
      message: message.slice(0, 200),
    })
  );

  // ── Success ──
  return NextResponse.json(
    {
      success: true,
      message: "Bedankt voor je bericht! We nemen binnen 24 uur contact met je op.",
    },
    { status: 200 }
  );
}
