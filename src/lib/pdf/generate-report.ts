/**
 * PDF Report Generator — Rekenhet.nl Rapportage
 *
 * Uses pdf-lib (pure JS, zero native deps, serverless-safe).
 * Generates professional PDF reports with Rekenhet branding.
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { PDFFont, PDFPage } from "pdf-lib";

// ─── Brand Colors ─────────────────────────────────────────────

const BLUE = rgb(0.15, 0.39, 0.92);
const GRAY_50 = rgb(0.98, 0.98, 0.98);
const GRAY_200 = rgb(0.90, 0.90, 0.90);
const GRAY_400 = rgb(0.61, 0.61, 0.61);
const GRAY_600 = rgb(0.29, 0.33, 0.33);
const GRAY_900 = rgb(0.07, 0.09, 0.10);
const WHITE = rgb(1, 1, 1);
const EMERALD = rgb(0.02, 0.59, 0.41);
const AMBER = rgb(0.85, 0.47, 0.03);
const AMBER_LIGHT = rgb(1, 0.98, 0.92);

// ─── Types ────────────────────────────────────────────────────

export interface PdfReportData {
  calculatorName: string;
  categoryName: string;
  generatedAt: string;
  inputs: { label: string; value: string }[];
  results: { label: string; value: string; type?: string }[];
}

// ─── PDF Builder ──────────────────────────────────────────────

export async function generateReportPdf(data: PdfReportData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const page = doc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const margin = 50;
  const cw = width - margin * 2; // content width
  const rh = 22; // row height
  let y = height - margin;

  // ── Header ──
  page.drawRectangle({ x: 0, y: height - 120, width, height: 120, color: BLUE });
  page.drawText("Rekenhet.nl", { x: margin, y: height - 90, size: 26, font: fontBold, color: WHITE });
  page.drawText("Rapportage — " + data.calculatorName, { x: margin, y: height - 58, size: 12, font, color: rgb(0.58, 0.77, 0.99) });
  page.drawText(sanitize(data.generatedAt), { x: margin, y: height - 38, size: 9, font, color: rgb(0.75, 0.86, 0.99) });
  page.drawText(sanitize("Categorie: " + data.categoryName), { x: margin, y: height - 22, size: 9, font, color: rgb(0.75, 0.86, 0.99) });

  y = height - 150;

  // ── Inputs ──
  y = drawSection(page, "Ingevoerde gegevens", y, fontBold);
  y -= 8;
  y = drawTable(page, ["Parameter", "Waarde"], data.inputs.map(i => [i.label, sanitize(i.value)]), cw, y, margin, rh, font, fontBold);

  y -= 25;

  // ── Results ──
  y = drawSection(page, "Resultaten", y, fontBold);
  y -= 8;
  y = drawTable(page, ["Omschrijving", "Bedrag"], data.results.map(r => [r.label, sanitize(r.value)]), cw, y, margin, rh, font, fontBold, true);

  y -= 30;

  // ── Disclaimer ──
  page.drawRectangle({ x: margin, y: y - 70, width: cw, height: 70, color: AMBER_LIGHT });
  page.drawText(
    "Disclaimer: Deze berekening is een indicatie op basis van de ingevoerde gegevens. " +
    "Er kunnen geen rechten worden ontleend aan de uitkomsten. " +
    "Raadpleeg een gekwalificeerde adviseur voor definitief financieel, fiscaal of juridisch advies.",
    { x: margin + 10, y: y - 58, size: 8, font: fontItalic, color: GRAY_600, maxWidth: cw - 20, lineHeight: 13 }
  );

  // ── Footer ──
  page.drawText(`Gegenereerd door Rekenhet.nl op ${data.generatedAt}`, { x: margin, y: margin, size: 7, font, color: GRAY_400 });

  return await doc.save();
}

// ─── Helpers ──────────────────────────────────────────────────

/** Sanitize text for WinAnsi PDF encoding (replace non-standard chars) */
function sanitize(s: string): string {
  return s.replace(/[€]/g, "EUR").replace(/[–—]/g, "-").replace(/["'']/g, "'").replace(/["""]/g, '"');
}

function drawSection(page: PDFPage, title: string, y: number, f: PDFFont): number {
  page.drawText(title, { x: 50, y, size: 14, font: f, color: BLUE });
  page.drawRectangle({ x: 50, y: y - 4, width: f.widthOfTextAtSize(title, 14), height: 2, color: BLUE });
  return y - 22;
}

function drawTable(
  page: PDFPage,
  headers: string[],
  rows: string[][],
  cw: number,
  y: number,
  x: number,
  rh: number,
  f: PDFFont,
  fBold: PDFFont,
  colorCode = false
): number {
  // Header
  page.drawRectangle({ x, y: y - rh, width: cw, height: rh, color: BLUE });
  page.drawText(headers[0], { x: x + 8, y: y - rh + 6, size: 9, font: fBold, color: WHITE, maxWidth: cw * 0.6 - 12 });
  page.drawText(headers[1], { x: x + cw * 0.6 + 8, y: y - rh + 6, size: 9, font: fBold, color: WHITE, maxWidth: cw * 0.4 - 12 });
  y -= rh;

  // Rows
  for (let i = 0; i < rows.length; i++) {
    const bg = i % 2 === 0 ? GRAY_50 : WHITE;
    page.drawRectangle({ x, y: y - rh, width: cw, height: rh, color: bg });
    page.drawRectangle({ x, y: y - 1, width: cw, height: 1, color: GRAY_200 });

    page.drawText(rows[i][0], { x: x + 8, y: y - rh + 6, size: 9, font: f, color: GRAY_600, maxWidth: cw * 0.6 - 12 });
    page.drawText(rows[i][1], { x: x + cw * 0.6 + 8, y: y - rh + 6, size: 9, font: colorCode ? fBold : f, color: colorCode ? GRAY_900 : GRAY_600, maxWidth: cw * 0.4 - 12 });
    y -= rh;
  }

  return y;
}
