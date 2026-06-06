/**
 * Analytics Provider Proxy
 *
 * Forwards telemetry events to a privacy-friendly analytics provider
 * (Plausible or Umami) from the server side.
 *
 * This bypasses ad-blockers that would otherwise block client-side
 * analytics scripts.
 *
 * If no provider is configured, events are logged to stdout.
 */

// ─── Configuration ─────────────────────────────────────────────

const CONFIG = {
  plausible: {
    url: process.env.PLAUSIBLE_URL || "",
    domain: process.env.PLAUSIBLE_DOMAIN || "",
  },
  umami: {
    url: process.env.UMAMI_URL || "",
    websiteId: process.env.UMAMI_WEBSITE_ID || "",
    apiKey: process.env.UMAMI_API_KEY || "",
  },
} as const;

type Provider = "plausible" | "umami" | "stdout";

function detectProvider(): Provider {
  if (CONFIG.plausible.url && CONFIG.plausible.domain) return "plausible";
  if (CONFIG.umami.url && CONFIG.umami.websiteId) return "umami";
  return "stdout";
}

// ─── Telemetry Event ───────────────────────────────────────────

export interface TelemetryEvent {
  /** Which calculator was used (e.g., "bruto-netto-salaris-calculator") */
  calculatorId: string;
  /** What the user did */
  action: "calculated" | "pdf_download" | "email_shared" | "search" | "page_view";
  /** Optional: additional anonymous context (no PII allowed) */
  metadata?: Record<string, string | number | boolean>;
}

// ─── Provider Dispatch ─────────────────────────────────────────

/**
 * Fire a telemetry event to the configured analytics provider.
 *
 * This runs asynchronously (fire-and-forget) so it does NOT block
 * the HTTP response. The caller should use `waitUntil` or similar
 * to keep the lambda alive long enough for the request to complete.
 *
 * Returns the provider that was used.
 */
export async function sendTelemetry(event: TelemetryEvent): Promise<Provider> {
  const provider = detectProvider();

  switch (provider) {
    case "plausible":
      return sendToPlausible(event);
    case "umami":
      return sendToUmami(event);
    case "stdout":
      return logToStdout(event);
  }
}

// ─── Plausible ─────────────────────────────────────────────────

async function sendToPlausible(event: TelemetryEvent): Promise<Provider> {
  try {
    const body = {
      domain: CONFIG.plausible.domain,
      name: event.action,
      url: `${CONFIG.plausible.domain}/${event.calculatorId}`,
      props: {
        calculatorId: event.calculatorId,
        ...(event.metadata || {}),
      },
    };

    const response = await fetch(`${CONFIG.plausible.url}/api/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn(`[TELEMETRY] Plausible returned ${response.status}`);
    }
  } catch (err) {
    console.warn("[TELEMETRY] Plausible error:", err instanceof Error ? err.message : "unknown");
  }

  return "plausible";
}

// ─── Umami ─────────────────────────────────────────────────────

async function sendToUmami(event: TelemetryEvent): Promise<Provider> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "Rekenhet.nl-Server/1.0",
    };
    if (CONFIG.umami.apiKey) {
      headers["Authorization"] = `Bearer ${CONFIG.umami.apiKey}`;
    }

    const body = {
      type: "event",
      payload: {
        website: CONFIG.umami.websiteId,
        event: event.action,
        url: `/${event.calculatorId}`,
        referrer: "",
        hostname: "rekenhet.nl",
        language: "",
        screen: "",
        ...(event.metadata ? { data: event.metadata } : {}),
      },
    };

    const response = await fetch(`${CONFIG.umami.url}/api/send`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn(`[TELEMETRY] Umami returned ${response.status}`);
    }
  } catch (err) {
    console.warn("[TELEMETRY] Umami error:", err instanceof Error ? err.message : "unknown");
  }

  return "umami";
}

// ─── Stdout Fallback ───────────────────────────────────────────

async function logToStdout(event: TelemetryEvent): Promise<Provider> {
  console.log(
    JSON.stringify({
      t: "telemetry",
      ts: new Date().toISOString(),
      ...event,
    })
  );
  return "stdout";
}
