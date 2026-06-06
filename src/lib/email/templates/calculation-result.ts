/**
 * Calculation Result — Email HTML Template
 *
 * Generates a clean, responsive HTML email matching the
 * Rekenhet.nl brand (blue + white theme, system font).
 *
 * Used by the /api/share-calculation endpoint to email
 * users their calculation results.
 */
import { SITE_NAME, SITE_URL } from "@/lib/seo/title-builder";

export interface CalculationData {
  calculatorName: string;
  calculatorUrl: string;
  categoryName: string;
  inputs: { label: string; value: string }[];
  results: { label: string; value: string; type?: string }[];
  generatedAt: string;
}

/**
 * Build the full HTML email body for a calculation result.
 * Returns a complete HTML document string.
 */
export function buildCalculationEmailHtml(data: CalculationData): string {
  const { calculatorName, calculatorUrl, categoryName, inputs, results, generatedAt } = data;

  const resultRows = results
    .map(
      (r) => `
    <tr>
      <td style="padding: 8px 16px; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280;">${escapeHtml(r.label)}</td>
      <td style="padding: 8px 16px; border-bottom: 1px solid #f3f4f6; font-size: 13px; font-weight: 600; color: ${getResultColor(r.type)}; text-align: right; font-variant-numeric: tabular-nums;">
        ${escapeHtml(r.value)}
      </td>
    </tr>`
    )
    .join("");

  const inputRows = inputs
    .map(
      (i) => `
    <tr>
      <td style="padding: 6px 12px; border-bottom: 1px solid #f9fafb; font-size: 12px; color: #9ca3af;">${escapeHtml(i.label)}</td>
      <td style="padding: 6px 12px; border-bottom: 1px solid #f9fafb; font-size: 12px; color: #374151; text-align: right;">${escapeHtml(i.value)}</td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jouw berekening — ${escapeHtml(calculatorName)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width: 520px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 12px 12px 0 0; padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                ${escapeHtml(calculatorName)}
              </h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #93c5fd;">
                ${escapeHtml(categoryName)} — ${escapeHtml(generatedAt)}
              </p>
            </td>
          </tr>

          <!-- Results -->
          <tr>
            <td style="background: #ffffff; padding: 24px 32px;">
              <h2 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #111827; text-transform: uppercase; letter-spacing: 0.05em;">
                Jouw resultaat
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border-radius: 8px;">
                ${resultRows}
              </table>
            </td>
          </tr>

          <!-- Input summary -->
          <tr>
            <td style="background: #ffffff; padding: 0 32px 24px;">
              <h3 style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">
                Ingevoerde gegevens
              </h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${inputRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background: #ffffff; padding: 0 32px 32px; border-radius: 0 0 12px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${escapeHtml(calculatorUrl)}"
                       style="display: inline-block; padding: 12px 28px; background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                      Open calculator op ${escapeHtml(SITE_NAME)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                Deze berekening is een indicatie. Er kunnen geen rechten aan worden ontleend.<br />
                &copy; ${new Date().getFullYear()} ${escapeHtml(SITE_NAME)}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Helpers ──────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getResultColor(type?: string): string {
  switch (type) {
    case "success":
      return "#059669";
    case "warning":
      return "#d97706";
    case "info":
      return "#2563eb";
    case "highlight":
      return "#111827";
    default:
      return "#374151";
  }
}
