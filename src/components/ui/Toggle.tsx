"use client";

import { cn } from "@/lib/utils";
import { Tooltip } from "./Tooltip";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  tooltip?: string;
  id: string;
}

/**
 * Toggle switch — accessible on/off control
 *
 * Uses role="switch" for screen readers. Shows optional tooltip.
 */
export function Toggle({ label, checked, onChange, tooltip, id }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer select-none">
          {label}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          checked ? "bg-indigo-600" : "bg-gray-300"
        )}
      >
        <span
          className={cn(
            "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[18px]" : "translate-x-[3px]"
          )}
        />
      </button>
    </div>
  );
}
