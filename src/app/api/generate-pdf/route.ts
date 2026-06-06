/**
 * POST /api/generate-pdf
 *
 * Generates a professional PDF report of a user's calculation.
 * Streams the PDF back as a binary download.
 *
 * Request body (JSON):
 *   {
 *     "calculatorName": "Bruto Netto Salaris Calculator",
 *     "categoryName": "Werk & Inkomen",
 *     "generatedAt": "1 juni 2026 om 14:30",
 *     "inputs": [{ "label": "Bruto jaarsalaris", "value": "€ 50.000" }, ...],
 *     "results": [{ "label": "Netto per maand", "value": "€ 3.150", "type": "success" }, ...]
 *   }
 *
 * Response:
 *   200 — Binary PDF stream
 *   400 — Validation error
 *   500 — Server error
 *
 * Headers:
 *   Content-Type: application/pdf
 *   Content-Disposition: attachment; filename="rekenhet-rapportage.pdf"
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateReportPdf } from "@/lib/pdf";

export const runtime = "nodejs";

// ─── Zod Validation ───────────────────────────────────────────

const PdfInputSchema = z.object({
  calculatorName: z.string().min(1, "Calculatornaam is verplicht").max(200),
  categoryName: z.string().max(100).optional().default(""),
  generatedAt: z.string().max(100).optional(),
  inputs: z
    .array(z.object({ label: z.string().min(1).max(200), value: z.string().min(1).max(200) }))
    .min(1, "Minstens één invoerveld is verplicht")
    .max(50),
  results: z
    .array(
      z.object({
        label: z.string().min(1).max(200),
        value: z.string().min(1).max(200),
        type: z.enum(["default", "success", "warning", "info", "highlight"]).optional(),
      })
    )
    .min(1, "Minstens één resultaat is verplicht")
    .max(50),
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
  if (entry.count >= 5) return false; // 5 PDFs per minute per IP
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

  // ── Parse body ──
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  // ── Validate ──
  const parsed = PdfInputSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: firstError?.message || "Validatiefout",
        field: firstError?.path.join(".") || undefined,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    // Generate PDF buffer
    const pdfBuffer = await generateReportPdf({
      calculatorName: data.calculatorName,
      categoryName: data.categoryName,
      generatedAt: data.generatedAt || new Date().toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      inputs: data.inputs,
      results: data.results,
    });

    // Stream back as binary download
    const sanitizedName = data.calculatorName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="rekenhet-${sanitizedName}-rapportage.pdf"`,
        "Content-Length": String(pdfBuffer.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "PDF generatie mislukt";
    console.error("[PDF ERROR]", message);
    return NextResponse.json(
      { error: "Kon PDF niet genereren. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}
