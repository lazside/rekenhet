"use client";

import { useState, useRef, useEffect, useCallback } from"react";
import { Search, ArrowRight, X } from"lucide-react";
import { cn } from"@/lib/utils";
import searchIndex from"@/data/search-index.json";

interface SearchEntry {
 title: string;
 slug: string;
 keywords: string[];
 category: string;
}

/**
 * Client-side instant search with keyboard navigation.
 *
 * - Reads from a static JSON index (~45 entries, <4KB)
 * - Filters on input (title + keywords, case-insensitive)
 * - ↓↑ arrows to navigate, Enter to select, Escape to close
 * - Floating dropdown overlay
 * - No external API dependencies
 * - INP < 50ms: pure JS, no debounce needed for this dataset size
 */
export function HeroSearch() {
 const [query, setQuery] = useState("");
 const [results, setResults] = useState<SearchEntry[]>([]);
 const [activeIndex, setActiveIndex] = useState(-1);
 const [isOpen, setIsOpen] = useState(false);
 const inputRef = useRef<HTMLInputElement>(null);
 const listRef = useRef<HTMLUListElement>(null);

 // Filter search index on input change
 const handleInputChange = useCallback((value: string) => {
 setQuery(value);
 setActiveIndex(-1);

 const trimmed = value.trim().toLowerCase();
 if (trimmed.length === 0) {
 setResults([]);
 setIsOpen(false);
 return;
 }

 const matches = (searchIndex as SearchEntry[]).filter((entry) => {
 const titleMatch = entry.title.toLowerCase().includes(trimmed);
 const keywordMatch = entry.keywords.some((kw) =>
 kw.toLowerCase().includes(trimmed)
 );
 return titleMatch || keywordMatch;
 });

 setResults(matches.slice(0, 10));
 setIsOpen(matches.length > 0);
 }, []);

 // Navigate to result
 const navigateTo = useCallback((slug: string) => {
 window.location.href = slug;
 }, []);

 // Keyboard navigation
 const handleKeyDown = useCallback(
 (e: React.KeyboardEvent<HTMLInputElement>) => {
 if (!isOpen || results.length === 0) {
 if (e.key ==="Escape") {
 inputRef.current?.blur();
 }
 return;
 }

 switch (e.key) {
 case"ArrowDown":
 e.preventDefault();
 setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
 break;
 case"ArrowUp":
 e.preventDefault();
 setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
 break;
 case"Enter":
 e.preventDefault();
 if (activeIndex >= 0 && activeIndex < results.length) {
 navigateTo(results[activeIndex].slug);
 }
 break;
 case"Escape":
 e.preventDefault();
 setIsOpen(false);
 inputRef.current?.blur();
 break;
 }
 },
 [isOpen, results, activeIndex, navigateTo]
 );

 // Scroll active item into view
 useEffect(() => {
 if (activeIndex >= 0 && listRef.current) {
 const item = listRef.current.children[activeIndex] as HTMLElement;
 item?.scrollIntoView({ block:"nearest" });
 }
 }, [activeIndex]);

 // Close on blur (with delay for click)
 const handleBlur = useCallback(() => {
 setTimeout(() => setIsOpen(false), 150);
 }, []);

 return (
 <div className="relative">
 <div className="relative">
 <Search
 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
 aria-hidden="true"
 />
 <input
 ref={inputRef}
 type="search"
 value={query}
 onChange={(e) => handleInputChange(e.target.value)}
 onKeyDown={handleKeyDown}
 onFocus={() => {
 if (query.trim().length > 0) {
 // Re-filter on refocus in case index was stale
 const trimmed = query.trim().toLowerCase();
 const matches = (searchIndex as SearchEntry[]).filter((entry) =>
 entry.title.toLowerCase().includes(trimmed) ||
 entry.keywords.some((kw) => kw.toLowerCase().includes(trimmed))
 );
 setResults(matches.slice(0, 10));
 setIsOpen(matches.length > 0);
 }
 }}
 onBlur={handleBlur}
 placeholder="Zoek een calculator..."
 className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-10 pr-4 text-sm text-gray-900 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.04)] transition-all placeholder:text-gray-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:shadow-[0_4px_12px_-2px_rgb(79_70_229_/_0.1)]"
 aria-label="Zoek een calculator"
 aria-expanded={isOpen}
 aria-autocomplete="list"
 aria-controls="search-results-list"
 role="combobox"
 autoComplete="off"
 />

 {/* Clear button — appears when input has text */}
 {query.length > 0 && (
 <button
 type="button"
 onClick={() => {
 setQuery("");
 setResults([]);
 setIsOpen(false);
 inputRef.current?.focus();
 }}
 className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors :bg-slate-800 :text-slate-300"
 aria-label="Zoekopdracht wissen"
 >
 <X className="h-3.5 w-3.5" />
 </button>
 )}
 </div>

 {/* Dropdown */}
 {isOpen && results.length > 0 && (
 <ul
 ref={listRef}
 id="search-results-list"
 role="listbox"
 aria-label="Zoekresultaten"
 className={cn(
"absolute left-0 right-0 top-full mt-2 z-50",
"max-h-[320px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg",
"",
"animate-fade-in"
 )}
 >
 {results.map((entry, i) => (
 <li
 key={entry.slug}
 role="option"
 aria-selected={i === activeIndex}
 onMouseDown={() => navigateTo(entry.slug)}
 onMouseEnter={() => setActiveIndex(i)}
 className={cn(
"flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
 i === activeIndex
 ?"bg-blue-50 text-blue-700"
 :"text-gray-700",
 i < results.length - 1 &&"border-b border-gray-100"
 )}
 >
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium truncate">{entry.title}</p>
 <p className="text-[11px] text-gray-400 truncate">
 {entry.category}
 </p>
 </div>
 <ArrowRight
 className={cn(
"h-3.5 w-3.5 shrink-0 transition-opacity",
 i === activeIndex ?"opacity-100 text-blue-500" :"opacity-0"
 )}
 />
 </li>
 ))}
 </ul>
 )}

 {/* No results */}
 {isOpen && query.trim().length > 0 && results.length === 0 && (
 <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-gray-200 bg-white p-4 text-center text-sm text-gray-400 shadow-lg animate-fade-in">
 Geen calculators gevonden voor &quot;{query.trim()}&quot;
 </div>
 )}
 </div>
 );
}
