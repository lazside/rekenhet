"use client";

import { useState, useCallback } from "react";
import { Code2, Check, Copy, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmbedCodeGeneratorProps {
  /** Calculator slug for the embed URL */
  calculatorSlug: string;
  /** Calculator name for the modal title */
  calculatorName: string;
}

/**
 * "Code genereren" button + modal.
 * Shows an iframe snippet that website owners can copy to embed the calculator.
 */
export function EmbedCodeGenerator({
  calculatorSlug,
  calculatorName,
}: EmbedCodeGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState(480);

  const embedUrl = `https://rekenhet.nl/embed/${calculatorSlug}`;
  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="${height}" frameborder="0" style="border:none;overflow:hidden;" allowtransparency="true"></iframe>`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(iframeCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [iframeCode]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-all"
        aria-label="Embed code genereren"
      >
        <Code2 className="h-3.5 w-3.5" />
        Embed
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setOpen(false)}>
      <div
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`Embed code voor ${calculatorName}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-gray-900">Embed calculator</h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
            aria-label="Sluiten"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-3">
          Plaats de {calculatorName} direct op je eigen website met deze iframe-code:
        </p>

        {/* Preview */}
        <div className="rounded-lg border border-gray-200 overflow-hidden mb-3 bg-gray-50">
          <iframe
            src={embedUrl}
            width="100%"
            height={Math.min(height, 300)}
            style={{ border: "none", overflow: "hidden" }}
            title={`${calculatorName} — Rekenhet.nl`}
            loading="lazy"
          />
        </div>

        {/* Height selector */}
        <div className="flex items-center gap-2 mb-3">
          <label htmlFor="embed-height" className="text-xs text-gray-500 shrink-0">
            Hoogte: {height}px
          </label>
          <input
            id="embed-height"
            type="range"
            min={300}
            max={800}
            step={10}
            value={height}
            onChange={(e) => setHeight(+e.target.value)}
            className="flex-1 accent-indigo-600"
          />
        </div>

        {/* Code block */}
        <div className="relative rounded-lg bg-gray-900 p-3 overflow-x-auto mb-3">
          <pre className="text-[11px] text-green-400 font-mono leading-relaxed whitespace-pre-wrap break-all">
            {iframeCode}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
              copied
                ? "bg-emerald-100 text-emerald-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Gekopieerd!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Code kopiëren
              </>
            )}
          </button>
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Voorbeeld
          </a>
        </div>
      </div>
    </div>
  );
}
