"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getConsent, setConsent, type ConsentDecision } from "@/lib/cookies/consent";

/**
 * Cookie Consent Banner (GDPR/AVG compliant)
 *
 * Blocks AdSense scripts until the user explicitly accepts.
 * Features:
 *   - No external dependencies
 *   - localStorage persistence
 *   - Accept / Weigeren buttons
 *   - Links to Privacybeleid & Cookieverklaring
 *   - Animated slide-up on first visit
 *   - Accessible (aria-live, role, keyboard)
 */
export function CookieConsentBanner() {
  const [decision, setDecision] = useState<ConsentDecision>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check existing consent after mount (hydration safety)
    const existing = getConsent();
    setDecision(existing);
    if (!existing) {
      // Small delay so the banner doesn't flash on fast navigations
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    setDecision("accepted");
    setVisible(false);
    // Reload AdSense by dispatching a custom event
    window.dispatchEvent(new CustomEvent("rekenhet-consent-granted"));
  };

  const handleReject = () => {
    setConsent("rejected");
    setDecision("rejected");
    setVisible(false);
  };

  // Don't render anything if decision has been made
  if (decision !== null) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie toestemming"
      aria-live="polite"
    >
      <div className="mx-auto max-w-3xl px-4 pb-4">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl p-5 md:p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-indigo-600">
              <Cookie className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Deze website gebruikt cookies
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Rekenhet.nl gebruikt cookies van Google (AdSense) om advertenties
                te tonen en het gebruik van de site te analyseren. Door op
                &quot;Accepteren&quot; te klikken, geef je toestemming voor het
                plaatsen van deze cookies. Je kunt ook weigeren. Lees meer in ons{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-600 hover:text-indigo-700 underline"
                  onClick={() => setVisible(false)}
                >
                  privacybeleid
                </Link>{" "}
                en onze{" "}
                <Link
                  href="/cookies"
                  className="text-indigo-600 hover:text-indigo-700 underline"
                  onClick={() => setVisible(false)}
                >
                  cookieverklaring
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2 ml-2">
              <button
                onClick={handleReject}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Weigeren
              </button>
              <button
                onClick={handleAccept}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
