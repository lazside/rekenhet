"use client";

import { cn } from "@/lib/utils";
import { Tooltip } from "./Tooltip";

interface ResultRowProps {
  label: string;
  value: string;
  type?: "default" | "success" | "warning" | "info" | "highlight";
  tooltip?: string;
}

/**
 * ResultRow — key-value display row for calculator results
 *
 * Styled variants:
 *   default  → white, neutral
 *   success  → green gradient
 *   warning  → amber gradient
 *   info     → blue gradient
 *   highlight → gray, bold
 */
export function ResultRow({ label, value, type = "default", tooltip }: ResultRowProps) {
  return (
    <div
      className={cn("flex items-center justify-between rounded-xl px-5 py-3.5 transition-all", {
        "bg-white border border-gray-100": type === "default",
        "bg-gradient-to-r from-emerald-50 to-white border border-emerald-100": type === "success",
        "bg-gradient-to-r from-amber-50 to-white border border-amber-100": type === "warning",
        "bg-gradient-to-r from-blue-50 to-white border border-blue-100": type === "info",
        "bg-gradient-to-r from-gray-100 to-white border border-gray-200 font-semibold": type === "highlight",
      })}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <span
        className={cn("text-sm font-bold tabular-nums tracking-tight", {
          "text-gray-900": type === "default" || type === "highlight",
          "text-emerald-700": type === "success",
          "text-amber-700": type === "warning",
          "text-indigo-700": type === "info",
        })}
      >
        {value}
      </span>
    </div>
  );
}
