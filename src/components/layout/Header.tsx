"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Menu, X, Search, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const SearchDialog = dynamic(() => import("@/components/search/SearchDialog").then((m) => m.SearchDialog), {
  ssr: false,
  loading: () => null,
});
import { categories } from "@/data/categories";

// ─── Categorie kleuren voor icon badges ───────────────────────

const CAT_COLORS: Record<string, string> = {
  "werk-en-inkomen": "bg-emerald-100 text-emerald-700",
  ondernemen: "bg-blue-100 text-blue-700",
  "geld-en-verzekeringen": "bg-violet-100 text-violet-700",
  gezondheid: "bg-rose-100 text-rose-700",
  wiskunde: "bg-amber-100 text-amber-700",
  "auto-vervoer": "bg-sky-100 text-sky-700",
  algemeen: "bg-slate-100 text-slate-700",
  hypotheek: "bg-indigo-100 text-indigo-700",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Alle calculators" },
  { href: "/updates", label: "Wetgeving" },
  { href: "/nieuws", label: "Nieuws" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const triggerSearch = useCallback(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold text-gray-900 shrink-0 group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Calculator className="h-4 w-4" aria-hidden="true" />
            </div>
            <span>
              Reken<span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">het</span>
              <span className="text-gray-400 font-normal">.nl</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Hoofdnavigatie">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive("categories")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Categorieën
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", dropdownOpen && "rotate-180")} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-1 z-20 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg animate-fade-in"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="grid grid-cols-1 gap-0.5">
                    {categories.map((cat) => {
                      const colorClass = CAT_COLORS[cat.slug] || "bg-gray-100 text-gray-700";
                      return (
                        <Link
                          key={cat.slug}
                          href={`/${cat.slug}`}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${colorClass}`}>
                            <cat.icon className="h-3.5 w-3.5" />
                          </span>
                          {cat.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right side: Search (desktop) */}
          <div className="hidden lg:flex items-center ml-auto">
            <div className="w-[260px]">
              <SearchDialog />
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={triggerSearch}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Zoeken"
            >
              <Search className="h-5 w-5" />
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile navigation panel */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-200 ease-in-out border-t border-gray-100",
          mobileOpen ? "max-h-[600px]" : "max-h-0"
        )}
      >
        <Container className="pb-4 pt-2 space-y-1">
          <nav className="flex flex-col gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile category links */}
            <div className="mt-2 pt-3 border-t border-gray-100">
              <p className="px-3 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Categorieën
              </p>
              <div className="grid grid-cols-2 gap-0.5">
                {categories.map((cat) => {
                  const colorClass = CAT_COLORS[cat.slug] || "bg-gray-100 text-gray-700";
                  return (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${colorClass}`}>
                        <cat.icon className="h-3 w-3" />
                      </span>
                      {cat.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
