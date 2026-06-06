"use client";

import { Calendar, GitCommit, ArrowRight, Sparkles, Bug, Euro, Zap, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────

interface UpdateEntry {
  date: string;
  version: string;
  title: string;
  type: "Fiscale Wijziging" | "Bugfix" | "Nieuwe Calculator" | "Optimalisatie";
  calculators: { slug: string; name: string }[];
  description: string;
}

interface UpdatesTimelineProps {
  updates: UpdateEntry[];
}

// ─── Icon mapping ──────────────────────────────────────────────

const TYPE_STYLES: Record<string, { icon: typeof Sparkles; color: string; bg: string; border: string; dot: string }> = {
  "Nieuwe Calculator": {
    icon: Sparkles,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  "Fiscale Wijziging": {
    icon: Euro,
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  Bugfix: {
    icon: Bug,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  Optimalisatie: {
    icon: Zap,
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
};

// ─── Component ─────────────────────────────────────────────────

export function UpdatesTimeline({ updates }: UpdatesTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

      <div className="space-y-8">
        {updates.map((entry, i) => {
          const style = TYPE_STYLES[entry.type] || TYPE_STYLES["Optimalisatie"];
          const Icon = style.icon;
          const date = new Date(entry.date + "T00:00:00Z");
          const formatted = date.toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <div key={i} className="relative md:pl-14 group">
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-3 top-1.5 hidden md:flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white shadow-sm",
                  style.bg, style.border
                )}
              >
                <div className={cn("h-2.5 w-2.5 rounded-full", style.dot)} />
              </div>

              {/* Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg md:hidden", style.bg)}>
                      <Icon className={cn("h-4 w-4", style.color)} />
                    </span>
                    <div>
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold", style.bg, style.color, style.border, "border")}>
                        <Icon className="h-3 w-3" />
                        {entry.type}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-900 mt-1">{entry.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={entry.date}>{formatted}</time>
                    <span className="text-gray-300">|</span>
                    <GitCommit className="h-3.5 w-3.5" />
                    <span>v{entry.version}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="text-sm text-gray-600 leading-relaxed mb-3 prose prose-sm max-w-none">
                  <SimpleMarkdown text={entry.description} />
                </div>

                {/* Affected calculators */}
                {entry.calculators.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                    <Package className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    {entry.calculators.map((calc) => {
                      const category = calc.slug.includes("btw")
                        ? "ondernemen"
                        : calc.slug.includes("bmi")
                          ? "gezondheid"
                          : calc.slug.includes("procenten")
                            ? "wiskunde"
                            : "werk-en-inkomen";
                      return (
                        <Link
                          key={calc.slug}
                          href={`/${category}/${calc.slug}`}
                          className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          {calc.name}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Simple Markdown renderer ─────────────────────────────────

function SimpleMarkdown({ text }: { text: string }) {
  const html = text
    .split("\n")
    .map((line) => {
      if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
      if (line.startsWith("**") && line.endsWith("**")) return `<strong>${line.slice(2, -2)}</strong>`;
      return line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/`(.+?)`/g, "<code class='bg-gray-100 px-1 rounded text-blue-700'>$1</code>");
    })
    .map((line) => {
      if (line.startsWith("<li>")) return line;
      if (line.startsWith("<strong>")) return `<p>${line}</p>`;
      return line ? `<p>${line}</p>` : "<br/>";
    })
    .join("");

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
