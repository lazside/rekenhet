"use client";

import { Info } from "lucide-react";

/**
 * Tooltip — hover/focus-revealed info popover
 *
 * Shows on hover and keyboard focus. Accessible via aria-label.
 */
export function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <Info
        className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help"
        tabIndex={0}
        aria-label={text}
      />
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus-within:block w-60 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg z-10 pointer-events-none"
        role="tooltip"
      >
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </span>
    </span>
  );
}
