"use client";

import Link from "next/link";
import { Calculator, Menu, X, Search, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search/SearchDialog";
import { categories } from "@/data/categories";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Alle calculators" },
];

const categoryLinks = categories.map((cat) => ({
  href: `/${cat.slug}`,
  label: cat.title,
}));

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const triggerSearch = useCallback(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }));
  }, []);

  // Close dropdown on outside click (avoids z-index interception issues)
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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/80">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 shrink-0 dark:text-white"
          >
            <Calculator className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <span>
              Reken<span className="text-blue-600">het</span>
              <span className="text-gray-400 font-normal dark:text-slate-500">.nl</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Categorieën
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", dropdownOpen && "rotate-180")} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-0 z-20 w-56 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900 animate-fade-in"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                    {categoryLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
              )}
            </div>
          </nav>

          {/* Right side: Search (desktop) */}
          <div className="hidden md:flex items-center ml-auto">
            <div className="w-[260px]">
              <SearchDialog />
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={triggerSearch}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
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
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile navigation panel */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 ease-in-out",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <Container className="pb-4 space-y-1">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile category links */}
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-800">
              <p className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider dark:text-slate-500">
                Categorieën
              </p>
              {categoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
