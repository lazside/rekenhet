"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Command, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  searchCalculators,
  highlightText,
  type SearchResult,
} from "@/lib/search/search-utils";
import type { HighlightSegment } from "@/lib/search/search-utils";

// ─── Highlighted Text Renderer ─────────────────────────────────

function HighlightedText({
  segments,
  className,
}: {
  segments: HighlightSegment[];
  className?: string;
}) {
  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.highlighted ? (
          <mark
            key={i}
            className="bg-yellow-200/70 text-inherit rounded-sm px-0.5"
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  );
}

// ─── SearchDialog ──────────────────────────────────────────────

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // ── Keyboard shortcut: '/' or Cmd+K ──
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Only open if not already in an input/textarea
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (open && e.key === "Escape") {
        setOpen(false);
        return;
      }

      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      // '/' to open search (when not in an input)
      if (!open && !isInput && e.key === "/") {
        e.preventDefault();
        setOpen(true);
        return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      // Small delay to allow dialog animation
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Lock body scroll when open (mobile)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ── Search results ──
  const results = useMemo(() => searchCalculators(query), [query]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups = new Map<string, SearchResult[]>();
    for (const r of results) {
      const key = r.category?.slug || "overig";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(r);
    }
    return groups;
  }, [results]);

  // ── Navigation ──
  const totalResults = results.length;

  const navigate = useCallback(
    (direction: "up" | "down") => {
      if (direction === "down") {
        setSelectedIndex((prev) => Math.min(prev + 1, totalResults - 1));
      } else {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    },
    [totalResults]
  );

  // Keyboard navigation in the input
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        navigate("down");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        navigate("up");
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        const r = results[selectedIndex];
        router.push(`/${r.calculator.categorySlug}/${r.calculator.slug}`);
        setOpen(false);
      }
    },
    [navigate, results, selectedIndex, router]
  );

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (item) {
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Search trigger — for the header */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors"
        aria-label="Open zoeken (/)"
        title="Zoeken  ( / of  ⌘K)"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Zoeken...</span>
        <kbd className="ml-auto hidden lg:inline-flex items-center gap-0.5 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Zoek een calculator"
        >
          <div
            ref={dialogRef}
            className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Zoek een calculator..."
                className="flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                aria-label="Zoekterm"
                autoComplete="off"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="shrink-0 rounded-md p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  aria-label="Zoekterm wissen"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              id="search-results"
              className="max-h-[50vh] overflow-y-auto"
              role="listbox"
              aria-label="Zoekresultaten"
            >
              {query && results.length === 0 && (
                <div className="flex flex-col items-center py-12 text-gray-400">
                  <Search className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">Geen calculators gevonden</p>
                  <p className="text-xs mt-1">Probeer een andere zoekterm</p>
                </div>
              )}

              {!query && (
                <div className="flex flex-col items-center py-12 text-gray-400">
                  <Search className="h-8 w-8 mb-2 opacity-30" />
                  <p className="text-sm">Type om te zoeken</p>
                  <p className="text-xs mt-1">
                    Of gebruik de pijltjestoetsen om te navigeren
                  </p>
                </div>
              )}

              {/* Grouped results */}
              {query &&
                Array.from(groupedResults.entries()).map(
                  ([categorySlug, items]) => {
                    const cat = items[0]?.category;
                    let globalIndex = results.findIndex(
                      (r) =>
                        r.calculator.slug === items[0]?.calculator.slug
                    );
                    return (
                      <div key={categorySlug}>
                        {/* Category header */}
                        {cat && (
                          <div className="sticky top-0 bg-gray-50/95 backdrop-blur px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                            {cat.title}
                          </div>
                        )}

                        {/* Results in this category */}
                        {items.map((item) => {
                          const idx = globalIndex++;
                          const isSelected = idx === selectedIndex;

                          return (
                            <button
                              key={item.calculator.slug}
                              data-index={idx}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                router.push(
                                  `/${item.calculator.categorySlug}/${item.calculator.slug}`
                                );
                                setOpen(false);
                              }}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={cn(
                                "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors border-b border-gray-50 last:border-0",
                                isSelected
                                  ? "bg-blue-50"
                                  : "hover:bg-gray-50"
                              )}
                            >
                              {cat && (
                                <div
                                  className={cn(
                                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white text-xs font-bold",
                                    cat.color
                                  )}
                                >
                                  {cat.title.charAt(0)}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900">
                                  <HighlightedText
                                    segments={highlightText(
                                      item.calculator.title,
                                      query
                                    )}
                                  />
                                </div>
                                <div className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                                  <HighlightedText
                                    segments={highlightText(
                                      item.calculator.description,
                                      query
                                    )}
                                  />
                                </div>
                              </div>
                              <ArrowRight
                                className={cn(
                                  "h-4 w-4 shrink-0 self-center transition-opacity",
                                  isSelected
                                    ? "text-blue-500 opacity-100"
                                    : "text-gray-300 opacity-0"
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>
                    );
                  }
                )}

              {/* Results count */}
              {results.length > 0 && (
                <div className="sticky bottom-0 border-t border-gray-100 bg-gray-50/95 backdrop-blur px-4 py-2 text-center text-[10px] text-gray-400">
                  {results.length} resultaat{results.length !== 1 ? "en" : ""}
                  {" — "}↑↓ navigeer, Enter selecteer
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
