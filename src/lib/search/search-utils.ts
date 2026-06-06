/**
 * Lightweight Fuzzy Search Engine
 *
 * Scoring-based search that ranks calculators by relevance.
 * No external dependencies — ~100 lines of zero-dep JS.
 *
 * Scoring:
 *   Exact title match          → 100
 *   Title starts with query    → 90
 *   Title word starts w/ query → 80
 *   Keyword contains query     → 60
 *   Description contains query → 40
 *   Sequential char match      → 30 (fuzzy "contains letters in order")
 */

import type { CalculatorMeta } from "@/data/calculators";
import { getAllCalculators } from "@/data/calculators";
import { categories } from "@/data/categories";
import type { Category } from "@/types";

// ─── Search Result ─────────────────────────────────────────────

export interface SearchResult {
  calculator: CalculatorMeta;
  category: Category | undefined;
  score: number;
}

// ─── Scoring ──────────────────────────────────────────────────

function scoreMatch(text: string, query: string): number {
  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();

  if (!q) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 90;

  // Does any word in the text start with the query?
  const words = t.split(/\s+/);
  if (words.some((w) => w.startsWith(q))) return 80;

  // Does the full text contain the query?
  if (t.includes(q)) return 60;

  // Fuzzy sequential char match: are all query chars found in order?
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  if (qi === q.length) return 30;

  return 0;
}

/**
 * Search all calculators, returning results sorted by relevance.
 */
export function searchCalculators(query: string): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const calc of getAllCalculators()) {
    const cat = categories.find((c) => c.slug === calc.categorySlug);
    let bestScore = 0;

    // Score title (highest weight)
    bestScore = Math.max(bestScore, scoreMatch(calc.title, q));

    // Score keywords
    for (const kw of calc.keywords) {
      bestScore = Math.max(bestScore, scoreMatch(kw, q) * 0.9);
    }

    // Score description
    bestScore = Math.max(bestScore, scoreMatch(calc.description, q) * 0.7);

    // Score category
    if (cat) {
      bestScore = Math.max(bestScore, scoreMatch(cat.title, q) * 0.5);
    }

    if (bestScore > 0) {
      results.push({ calculator: calc, category: cat, score: bestScore });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

// ─── Text Highlighting ────────────────────────────────────────

export interface HighlightSegment {
  text: string;
  highlighted: boolean;
}

/**
 * Split text into highlighted/non-highlighted segments based on query.
 * Case-insensitive, matches first occurrence.
 */
export function highlightText(text: string, query: string): HighlightSegment[] {
  if (!query.trim()) return [{ text, highlighted: false }];

  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();

  const segments: HighlightSegment[] = [];
  let cursor = 0;

  const idx = t.indexOf(q);
  if (idx >= 0) {
    if (idx > cursor) {
      segments.push({ text: text.slice(cursor, idx), highlighted: false });
    }
    segments.push({ text: text.slice(idx, idx + q.length), highlighted: true });
    cursor = idx + q.length;
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), highlighted: false });
  }

  return segments;
}
