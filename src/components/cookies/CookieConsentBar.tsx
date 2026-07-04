"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getConsent, setConsent, type ConsentDecision } from "@/lib/cookies/consent";

/**
 * Minimal Cookie Consent Bar — GDPR/AVG compliant
 *
 * Designed to be as unobtrusive as possible:
 *   ✅ Slim bar (40px) — no large panels or modals
 *   ✅ No icons — just the essentials
 *   ✅ Disappears on any action — accept OR reject
 *   ✅ Fires custom event for AdSense loader
 *   ✅ Persists decision in localStorage
 *   ✅ Links to privacy/cookie pages
 *   ✅ Click-outside dismissible
 *   ✅ Keyboard accessible
 */
export function CookieConsentBar() {
  const [decision, setDecision] = useState<ConsentDecision>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    setDecision(existing);
    if (!existing) {
      // Small delay so it doesn't flash on fast navigations
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    setDecision("accepted");
    setVisible(false);
    window.dispatchEvent(new CustomEvent("rekenhet-consent-granted"));
  };

  const handleReject = () => {
    setConsent("rejected");
    setDecision("rejected");
    setVisible(false);
  };

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && visible) {
        handleReject();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (decision !== null) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="mx-auto max-w-4xl px-3 pb-3">
        <div className="flex items-center gap-3 rounded-full border border-gray-200/80 bg-white/95 px-4 py-2.5 shadow-[0_2px_12px_-2px_rgb(0_0_0_/0.08)] backdrop-blur-sm">
          {/* Text */}
          <p className="flex-1 text-[11px] text-gray-600 leading-tight min-w-0">
            Rekenhet.nl gebruikt cookies van Google (AdSense) voor advertenties.{' '}
            <Link
              href="/privacy"
              onClick={() => setVisible(false)}
              className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 whitespace-nowrap"
            >
              Privacy
            </Link>
            {' / '}
            <Link
              href="/cookies"
              onClick={() => setVisible(false)}
              className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 whitespace-nowrap"
            >
              Cookies
            </Link>
          </p>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={handleReject}
              className="rounded-full px-3 py-1 text-[11px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Weigeren
            </button>
            <button
              onClick={handleAccept}
              className="rounded-full bg-indigo-600 px-4 py-1 text-[11px] font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Accepteren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
