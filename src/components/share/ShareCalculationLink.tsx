"use client";

import { useState, useCallback } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildShareUrl, CalculatorShareState } from "@/lib/share/share-url";

interface ShareCalculationLinkProps {
  /** Calculator slug for the URL path */
  calculatorSlug: string;
  /** Current calculator state to encode */
  state: CalculatorShareState;
  /** Optional class name */
  className?: string;
}

/**
 * "Deel deze berekening" button.
 * Generates a shareable URL with encoded calculator state and copies to clipboard.
 * Shows animated "Gekopieerd!" feedback on success.
 */
export function ShareCalculationLink({
  calculatorSlug,
  state,
  className,
}: ShareCalculationLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(() => {
    const url = buildShareUrl(calculatorSlug, state);
    if (!url) return;

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [calculatorSlug, state]);

  return (
    <button
      onClick={handleShare}
      aria-label={copied ? "Gekopieerd!" : "Deel deze berekening"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all",
        copied
          ? "bg-emerald-100 text-emerald-700"
          : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-indigo-600",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 animate-slide-up" />
          Gekopieerd!
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" />
          Deel deze berekening
        </>
      )}
    </button>
  );
}
