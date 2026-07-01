"use client";

import { useState, useCallback } from "react";
import {
  Mail,
  FileDown,
  Link as LinkIcon,
  Check,
  Loader2,
  Share2,
  X,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatEUR } from "@/lib/utils";

// ─── Props ─────────────────────────────────────────────────────

interface ShareToolbarProps {
  /** Calculator identifier for API calls */
  calculatorType: string;
  calculatorName: string;
  categoryName: string;
  /** Current calculation values */
  inputs: { label: string; value: string }[];
  results: { label: string; value: string; type?: string }[];
}

// ─── ShareEmailModal ───────────────────────────────────────────

function ShareEmailModal({
  open,
  onClose,
  calculatorType,
  calculatorName,
  categoryName,
  inputs,
  results,
}: ShareToolbarProps & { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("sending");
      setErrorMsg("");

      try {
        const res = await fetch("/api/share-calculation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            calculatorType,
            calculatorName,
            categoryName,
            inputs,
            results,
            marketingConsent: consent,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.error || "Er is iets misgegaan");
          setStatus("error");
          return;
        }

        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setEmail("");
        }, 2000);
      } catch {
        setErrorMsg("Kon de server niet bereiken");
        setStatus("error");
      }
    },
    [email, consent, calculatorType, calculatorName, categoryName, inputs, results, onClose]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Berekening delen via e-mail"
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-semibold text-gray-900">E-mail resultaat</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Sluiten"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center py-6 text-emerald-600">
            <Check className="h-10 w-10 mb-2" />
            <p className="text-sm font-medium">Verstuurd naar {email}</p>
            <p className="text-xs text-gray-500 mt-1">Controleer je inbox</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="share-email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mailadres
              </label>
              <input
                id="share-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                Ik wil op de hoogte blijven van nieuwe calculators en tips.
                (optioneel)
              </span>
            </label>

            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {status === "sending" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {status === "sending" ? "Bezig met versturen..." : "Verstuur resultaat"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── ShareToolbar ──────────────────────────────────────────────

export function ShareToolbar({
  calculatorType,
  calculatorName,
  categoryName,
  inputs,
  results,
}: ShareToolbarProps) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [pdfStatus, setPdfStatus] = useState<"idle" | "loading">("idle");

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
      // Telemetry
      fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calculatorId: calculatorType, action: "calculated" }),
      }).catch(() => {});
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  }, [calculatorType]);

  const handlePdfDownload = useCallback(async () => {
    setPdfStatus("loading");
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorName,
          categoryName,
          generatedAt: new Date().toLocaleDateString("nl-NL", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          inputs,
          results,
        }),
      });

      if (!res.ok) throw new Error("PDF generatie mislukt");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rekenhet-${calculatorType}-rapportage.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
    }
    setPdfStatus("idle");
  }, [calculatorName, categoryName, inputs, results, calculatorType]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400 font-medium mr-1">Delen:</span>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
            copyStatus === "copied"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
          aria-label="Link kopiëren"
        >
          {copyStatus === "copied" ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <LinkIcon className="h-3.5 w-3.5" />
          )}
          {copyStatus === "copied" ? "Gekopieerd!" : "Link kopiëren"}
        </button>

        {/* Email share */}
        <button
          onClick={() => setEmailOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-all"
          aria-label="Resultaat e-mailen"
        >
          <Mail className="h-3.5 w-3.5" />
          E-mail
        </button>

        {/* PDF download */}
        <button
          onClick={handlePdfDownload}
          disabled={pdfStatus === "loading"}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-all"
          aria-label="PDF downloaden"
        >
          {pdfStatus === "loading" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FileDown className="h-3.5 w-3.5" />
          )}
          {pdfStatus === "loading" ? "Bezig..." : "PDF"}
        </button>
      </div>

      {/* Email modal */}
      <ShareEmailModal
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        calculatorType={calculatorType}
        calculatorName={calculatorName}
        categoryName={categoryName}
        inputs={inputs}
        results={results}
      />
    </>
  );
}

export type { ShareToolbarProps };
