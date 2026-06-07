/**
 * PDF Report Generator — Rekenhet.nl Premium Rapportage
 *
 * Uses pdf-lib (pure JS, zero native deps, serverless-safe).
 * Generates professional multi-section PDF reports with:
 *   - Cover page with branded header
 *   - Summary hero card
 *   - Input overview table
 *   - Color-coded results with visual bars
 *   - Bracket/schijf breakdown
 *   - Disclaimer + footer
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { PDFFont, PDFPage } from "pdf-lib";

// ─── Brand Colors ─────────────────────────────────────────────

const BLUE = rgb(0.11, 0.33, 0.87);
const BLUE_DARK = rgb(0.06, 0.20, 0.55);
const BLUE_LIGHT = rgb(0.73, 0.85, 0.98);
const WHITE = rgb(1, 1, 1);
const GRAY_100 = rgb(0.95, 0.95, 0.96);
const GRAY_200 = rgb(0.88, 0.88, 0.89);
const GRAY_300 = rgb(0.74, 0.74, 0.75);
const GRAY_400 = rgb(0.58, 0.58, 0.59);
const GRAY_500 = rgb(0.43, 0.44, 0.45);
const GRAY_600 = rgb(0.32, 0.33, 0.34);
const GRAY_900 = rgb(0.08, 0.09, 0.10);
const EMERALD = rgb(0.02, 0.59, 0.41);
const EMERALD_LIGHT = rgb(0.88, 0.97, 0.92);
const AMBER = rgb(0.85, 0.47, 0.03);
const AMBER_LIGHT = rgb(1, 0.97, 0.90);
const ROSE = rgb(0.82, 0.22, 0.35);
const ROSE_LIGHT = rgb(1, 0.94, 0.95);

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

  const A4_W = 595.28;
  const A4_H = 841.89;
  const MARGIN = 50;
  const CW = A4_W - MARGIN * 2; // content width

  // ─── Page 1: Cover ─────────────────────────────────────────
  const cover = doc.addPage([A4_W, A4_H]);
  drawCover(cover, data, fontBold, font, fontItalic);

  // ─── Page 2: Content ───────────────────────────────────────
  const page = doc.addPage([A4_W, A4_H]);
  const { width, height } = page.getSize();
  const rh = 24; // row height
  let y = height - MARGIN;

  // ── Page header ──
  drawPageHeader(page, data, fontBold, font);

  y = height - 130;

  // ── Summary Hero Card ──
  const heroResult = data.results.find((r) => r.type === "success" || r.type === "highlight") || data.results[0];
  y = drawHeroCard(page, heroResult, y, fontBold, font, fontItalic, CW, MARGIN);
  y -= 20;

  // ── Inputs Section ──
  y = drawSection(page, "Ingevoerde gegevens", y, fontBold);
  y -= 6;
  y = drawTable(page, ["Parameter", "Waarde"], data.inputs.map(i => [i.label, i.value]), CW, y, MARGIN, rh, font, fontBold);
  y -= 18;

  // ── Results Section ──
  y = drawSection(page, "Resultaten", y, fontBold);
  y -= 6;

  // Split results into main vs secondary
  const mainResults = data.results.filter(r => r.type === "success" || r.type === "highlight" || r.type === "warning");
  const infoResults = data.results.filter(r => r.type === "info" || r.type === "default" || !r.type);

  y = drawResultsTable(page, mainResults, CW, y, MARGIN, rh, font, fontBold);
  if (infoResults.length > 0) {
    y -= 4;
    y = drawResultsTable(page, infoResults, CW, y, MARGIN, rh, font, fontBold);
  }
  y -= 18;

  // ── Visual summary bar (netto vs belasting) ──
  if (data.results.length >= 2) {
    y = drawSummaryBar(page, data.results, y, fontBold, font, CW, MARGIN);
    y -= 10;
  }

  // ── Disclaimer ──
  y = Math.min(y, 160);
  drawDisclaimer(page, y, fontItalic, font, CW, MARGIN, fontBold);

  // ── Footer ──
  drawFooter(page, data, font, A4_W, A4_H);

  return await doc.save();
}

// ═══════════════════════════════════════════════════════════════
//  COVER PAGE
// ═══════════════════════════════════════════════════════════════

function drawCover(
  page: PDFPage,
  data: PdfReportData,
  fBold: PDFFont,
  f: PDFFont,
  fItalic: PDFFont
) {
  const { width, height } = page.getSize();
  const cx = width / 2;

  // Full background block top half
  page.drawRectangle({ x: 0, y: height * 0.45, width, height: height * 0.55, color: BLUE });

  // Accent stripe
  page.drawRectangle({ x: 0, y: height * 0.45 - 4, width, height: 4, color: BLUE_DARK });

  // Logo area — stylized "R" mark
  page.drawCircle({ x: cx, y: height * 0.72, size: 40, color: WHITE });
  page.drawText("R", {
    x: cx - 15, y: height * 0.72 - 14, size: 32, font: fBold, color: BLUE,
  });

  // Title
  page.drawText("Rekenhet.nl", {
    x: cx - fBold.widthOfTextAtSize("Rekenhet.nl", 28) / 2,
    y: height * 0.62, size: 28, font: fBold, color: WHITE,
  });

  // Calculator name
  page.drawText(s(data.calculatorName), {
    x: cx - f.widthOfTextAtSize(s(data.calculatorName), 14) / 2,
    y: height * 0.57, size: 14, font: f, color: BLUE_LIGHT,
  });

  // Bottom section — info
  page.drawText("Rapportage", {
    x: cx - fBold.widthOfTextAtSize("Rapportage", 22) / 2,
    y: height * 0.36, size: 22, font: fBold, color: GRAY_900,
  });

  // Decorative line
  page.drawRectangle({ x: cx - 40, y: height * 0.34, width: 80, height: 2.5, color: BLUE });

  // Metadata
  const metaLines = [
    `Categorie: ${s(data.categoryName || "")}`,
    `Gegenereerd op: ${s(data.generatedAt)}`,
    `${data.inputs.length} ingevoerde waarden`,
  ];
  metaLines.forEach((line, i) => {
    page.drawText(line, {
      x: cx - f.widthOfTextAtSize(line, 10) / 2,
      y: height * 0.30 - i * 16, size: 10, font: f, color: GRAY_500,
    });
  });

  // Footer
  page.drawText("© rekenhet.nl — Gratis online calculators", {
    x: cx - f.widthOfTextAtSize("© rekenhet.nl — Gratis online calculators", 8) / 2,
    y: 40, size: 8, font: fItalic, color: GRAY_400,
  });
}

// ═══════════════════════════════════════════════════════════════
//  PAGE HEADER
// ═══════════════════════════════════════════════════════════════

function drawPageHeader(
  page: PDFPage,
  data: PdfReportData,
  fBold: PDFFont,
  f: PDFFont
) {
  const { width, height } = page.getSize();

  // Top bar
  page.drawRectangle({ x: 0, y: height - 50, width, height: 50, color: BLUE });

  // Brand
  page.drawText("Rekenhet.nl", { x: 50, y: height - 34, size: 14, font: fBold, color: WHITE });

  // Calculator name right-aligned
  const calcLabel = s(data.calculatorName);
  page.drawText(calcLabel, {
    x: width - 50 - f.widthOfTextAtSize(calcLabel, 9),
    y: height - 34, size: 9, font: f, color: BLUE_LIGHT,
  });

  // Bottom border line
  page.drawRectangle({ x: 0, y: height - 52, width, height: 2, color: BLUE_DARK });
}

// ═══════════════════════════════════════════════════════════════
//  HERO CARD
// ═══════════════════════════════════════════════════════════════

function drawHeroCard(
  page: PDFPage,
  result: { label: string; value: string },
  y: number,
  fBold: PDFFont,
  f: PDFFont,
  fItalic: PDFFont,
  cw: number,
  mx: number
): number {
  const h = 72;

  // Gradient effect via layered rectangles
  page.drawRectangle({ x: mx, y: y - h, width: cw, height: h, color: BLUE });
  page.drawRectangle({ x: mx + cw - 100, y: y - h, width: 100, height: h, color: BLUE_DARK, opacity: 0.15 });

  // Label
  page.drawText(s(result.label), {
    x: mx + 20, y: y - 24, size: 11, font: f, color: BLUE_LIGHT,
  });

  // Value — big and bold
  const valueText = s(result.value);
  page.drawText(valueText, {
    x: mx + 20, y: y - 58, size: 26, font: fBold, color: WHITE,
  });

  return y - h - 10;
}

// ═══════════════════════════════════════════════════════════════
//  SUMMARY BAR (visual horizontal bar)
// ═══════════════════════════════════════════════════════════════

function drawSummaryBar(
  page: PDFPage,
  results: { label: string; value: string; type?: string }[],
  y: number,
  fBold: PDFFont,
  f: PDFFont,
  cw: number,
  mx: number
): number {
  const barH = 32;
  const gap = 4;
  const barY = y - 16;

  // Title
  page.drawText("Verdeling", {
    x: mx, y: y, size: 11, font: fBold, color: GRAY_600,
  });

  // Try to find netto and loonheffing-like entries
  const netto = results.find(r => r.label.toLowerCase().includes("netto") && !r.label.toLowerCase().includes("bruto"));
  const belasting = results.find(r => r.label.toLowerCase().includes("belasting") || r.label.toLowerCase().includes("premie"));

  if (!netto || !belasting) return y - 30;

  // Try to parse numeric values for the bar
  const nettoVal = parseEuro(netto.value);
  const belastingVal = parseEuro(belasting.value);

  if (!nettoVal || !belastingVal || nettoVal + belastingVal <= 0) return y - 30;

  const total = nettoVal + belastingVal;
  const netPct = (nettoVal / total) * cw;
  const taxPct = (belastingVal / total) * cw;

  // Netto bar segment
  page.drawRectangle({ x: mx, y: barY - barH, width: netPct, height: barH, color: EMERALD });
  page.drawText(`Netto (${((nettoVal / total) * 100).toFixed(0)}%)`, {
    x: mx + 6, y: barY - barH + 10, size: 8, font: fBold, color: WHITE,
    maxWidth: netPct - 12,
  });

  // Tax bar segment
  page.drawRectangle({ x: mx + netPct + gap, y: barY - barH, width: Math.max(taxPct - gap, 0), height: barH, color: ROSE });
  page.drawText(`Loonheffing`, {
    x: mx + netPct + gap + 6, y: barY - barH + 10, size: 8, font: fBold, color: WHITE,
    maxWidth: Math.max(taxPct - gap - 12, 20),
  });

  // Legend
  const legendY = barY - barH - 18;
  page.drawCircle({ x: mx + 4, y: legendY + 3, size: 4, color: EMERALD });
  page.drawText(`Netto: ${netto.value}`, { x: mx + 12, y: legendY - 2, size: 8, font: f, color: GRAY_600 });
  page.drawCircle({ x: mx + 120, y: legendY + 3, size: 4, color: ROSE });
  page.drawText(`Loonheffing: ${belasting.value}`, { x: mx + 128, y: legendY - 2, size: 8, font: f, color: GRAY_600 });

  return barY - barH - 30;
}

// ═══════════════════════════════════════════════════════════════
//  DRAW SECTION HEADER
// ═══════════════════════════════════════════════════════════════

function drawSection(page: PDFPage, title: string, y: number, fBold: PDFFont): number {
  page.drawText(title, { x: 50, y, size: 14, font: fBold, color: BLUE });
  page.drawRectangle({ x: 50, y: y - 3, width: 50, height: 2.5, color: BLUE });
  return y - 22;
}

// ═══════════════════════════════════════════════════════════════
//  DRAW TABLE (generic)
// ═══════════════════════════════════════════════════════════════

function drawTable(
  page: PDFPage,
  headers: string[],
  rows: string[][],
  cw: number,
  y: number,
  x: number,
  rh: number,
  f: PDFFont,
  fBold: PDFFont
): number {
  const col1W = cw * 0.55;
  const col2W = cw * 0.40;

  // Header row
  page.drawRectangle({ x, y: y - rh, width: cw, height: rh, color: BLUE });
  page.drawText(headers[0], { x: x + 10, y: y - rh + 7, size: 9, font: fBold, color: WHITE });
  page.drawText(headers[1], { x: x + col1W + 10, y: y - rh + 7, size: 9, font: fBold, color: WHITE });
  y -= rh;

  // Data rows
  for (let i = 0; i < rows.length; i++) {
    const bg = i % 2 === 0 ? GRAY_100 : WHITE;
    page.drawRectangle({ x, y: y - rh, width: cw, height: rh, color: bg });
    page.drawRectangle({ x, y: y - 1, width: cw, height: 0.5, color: GRAY_200 });

    page.drawText(rows[i][0], { x: x + 10, y: y - rh + 7, size: 9, font: f, color: GRAY_600, maxWidth: col1W - 14 });
    page.drawText(rows[i][1], { x: x + col1W + 10, y: y - rh + 7, size: 9, font: fBold, color: GRAY_900, maxWidth: col2W - 14 });
    y -= rh;
  }

  return y;
}

// ═══════════════════════════════════════════════════════════════
//  DRAW RESULTS TABLE (color-coded)
// ═══════════════════════════════════════════════════════════════

function drawResultsTable(
  page: PDFPage,
  rows: { label: string; value: string; type?: string }[],
  cw: number,
  y: number,
  x: number,
  rh: number,
  f: PDFFont,
  fBold: PDFFont
): number {
  const col1W = cw * 0.55;
  const col2W = cw * 0.40;

  // Header
  page.drawRectangle({ x, y: y - rh, width: cw, height: rh, color: BLUE });
  page.drawText("Omschrijving", { x: x + 10, y: y - rh + 7, size: 9, font: fBold, color: WHITE });
  page.drawText("Bedrag", { x: x + col1W + 10, y: y - rh + 7, size: 9, font: fBold, color: WHITE });
  y -= rh;

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const isMain = r.type === "success" || r.type === "highlight";
    const isWarning = r.type === "warning";
    const isInfo = r.type === "info";

    let bg = i % 2 === 0 ? GRAY_100 : WHITE;
    let valColor = GRAY_900;

    if (isMain) { bg = EMERALD_LIGHT; valColor = EMERALD; }
    else if (isWarning) { bg = ROSE_LIGHT; valColor = ROSE; }
    else if (isInfo) { bg = BLUE_LIGHT; valColor = BLUE; }

    page.drawRectangle({ x, y: y - rh, width: cw, height: rh, color: bg });
    page.drawRectangle({ x, y: y - 1, width: cw, height: 0.5, color: GRAY_200 });

    page.drawText(r.label, { x: x + 10, y: y - rh + 7, size: 9, font: isMain ? fBold : f, color: GRAY_600, maxWidth: col1W - 14 });
    page.drawText(r.value, { x: x + col1W + 10, y: y - rh + 7, size: 9, font: fBold, color: valColor, maxWidth: col2W - 14 });
    y -= rh;
  }

  return y;
}

// ═══════════════════════════════════════════════════════════════
//  DISCLAIMER
// ═══════════════════════════════════════════════════════════════

function drawDisclaimer(
  page: PDFPage,
  y: number,
  fItalic: PDFFont,
  f: PDFFont,
  cw: number,
  mx: number,
  fBold: PDFFont
) {
  const dh = 55;

  // Background box
  page.drawRectangle({ x: mx, y, width: cw, height: dh, color: AMBER_LIGHT });
  page.drawRectangle({ x: mx, y, width: 3, height: dh, color: AMBER });

  // Title
  page.drawText("Disclaimer", {
    x: mx + 12, y: y + dh - 15, size: 9, font: fBold, color: AMBER,
  });

  // Text
  page.drawText(
    "Deze berekening is een indicatie op basis van de ingevoerde gegevens en de meest " +
    "actuele wet- en regelgeving. Er kunnen geen rechten worden ontleend aan de uitkomsten. " +
    "Raadpleeg een gekwalificeerde adviseur voor definitief financieel of fiscaal advies.",
    {
      x: mx + 12, y: y + dh - 32, size: 7.5, font: fItalic, color: GRAY_500,
      maxWidth: cw - 24, lineHeight: 11,
    }
  );
}

// ═══════════════════════════════════════════════════════════════
//  FOOTER
// ═══════════════════════════════════════════════════════════════

function drawFooter(
  page: PDFPage,
  data: PdfReportData,
  f: PDFFont,
  pageW: number,
  pageH: number
) {
  const footerY = 28;

  // Thin line
  page.drawRectangle({ x: 50, y: footerY + 14, width: pageW - 100, height: 0.5, color: GRAY_300 });

  // Left
  page.drawText("© Rekenhet.nl", { x: 50, y: footerY, size: 7, font: f, color: GRAY_400 });

  // Right
  const dateStr = `Gegenereerd: ${s(data.generatedAt)}`;
  page.drawText(dateStr, {
    x: pageW - 50 - f.widthOfTextAtSize(dateStr, 7),
    y: footerY, size: 7, font: f, color: GRAY_400,
  });
}

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════

/** Sanitize text for WinAnsi PDF encoding */
function s(text: string): string {
  return text
    .replace(/€/g, "\u20AC") // Keep EUR sign (WinAnsi supports it)
    .replace(/[–—]/g, "-")
    .replace(/["'']/g, "'")
    .replace(/["""]/g, '"');
}

/** Try to parse a Euro-formatted string back to a number */
function parseEuro(value: string): number | null {
  const cleaned = value
    .replace(/[€\s]/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".")
    .replace(/[^0-9.\-]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : Math.abs(num);
}
