"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdZoneMobileAnchor } from "@/components/ads/AdSenseBanner";
import { CookieConsentBanner } from "@/components/cookies/CookieConsentBanner";
import { hasConsent, getConsent } from "@/lib/cookies/consent";

const ADSENSE_ID =
  process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-xxxxxxxxxxxxxx";

/**
 * Dynamically load the AdSense script.
 * Only fires when user consent has been granted (either
 * from previous session via localStorage or from banner click).
 */
function useAdSenseLoader() {
  const loaded = useRef(false);

  useEffect(() => {
    // Load immediately if consent was given in a previous session
    if (hasConsent()) {
      loadAdSense();
      return;
    }

    // Listen for the consent-granted custom event
    function onConsent() {
      loadAdSense();
    }

    window.addEventListener("rekenhet-consent-granted", onConsent);
    return () =>
      window.removeEventListener("rekenhet-consent-granted", onConsent);
  }, []);

  function loadAdSense() {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
}

/**
 * Client-side layout wrapper.
 *
 * GDPR-compliant:
 *   - AdSense script is NOT loaded on initial page load
 *   - Cookie consent banner shows until user accepts or rejects
 *   - On accept: AdSense script is dynamically injected
 *   - On reject: AdSense never loads
 *   - On revisit with stored consent: AdSense loads immediately
 */
export function RootLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  // Activate the AdSense loader hook
  useAdSenseLoader();

  return (
    <>
      {/* NOTE: AdSense script is NOT loaded here statically.
          It loads dynamically only after user consent via
          the useAdSenseLoader hook. */}

      <Header />
      <main className="min-h-[calc(100vh-4rem-20rem)] pb-[120px] md:pb-0">
        {children}
      </main>
      <Footer />

      {/* Cookie Consent Banner — blocks AdSense until user acts */}
      <CookieConsentBanner />

      {/* Zone C: Mobile sticky anchor footer */}
      <AdZoneMobileAnchor />
    </>
  );
}
