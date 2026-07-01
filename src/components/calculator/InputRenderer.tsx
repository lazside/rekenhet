"use client";

/**
 * Generic input field renderer for calculator forms.
 * Renders number, currency, percent, select, range inputs.
 */
import { cn } from "@/lib/utils";
import type { CalculatorField } from "@/types";

interface InputFieldRendererProps {
  field: CalculatorField;
  value: string | number;
  onChange: (id: string, value: string) => void;
  error?: string;
}

export function InputFieldRenderer({
  field,
  value,
  onChange,
  error,
}: InputFieldRendererProps) {
  const baseInput =
    "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all";

  const inputClasses = cn(baseInput, error && "border-red-500 focus:border-red-500 focus:ring-red-500/20");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={field.id}
        className="block text-sm font-medium text-gray-700"
      >
        {field.label}
      </label>

      <div className="relative">
        {field.type === "number" || field.type === "currency" || field.type === "percent" ? (
          <div className="relative">
            {field.prefix && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500 pointer-events-none">
                {field.prefix}
              </span>
            )}
            <input
              id={field.id}
              type="text"
              inputMode="decimal"
              step={field.step ?? "any"}
              min={field.min}
              max={field.max}
              placeholder={field.placeholder}
              className={cn(inputClasses, field.prefix && "pl-8")}
              value={value}
              onChange={(e) => onChange(field.id, e.target.value)}
            />
            {field.suffix && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500 pointer-events-none">
                {field.suffix}
              </span>
            )}
          </div>
        ) : field.type === "select" ? (
          <select
            id={field.id}
            className={inputClasses}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === "range" ? (
          <div className="space-y-1">
            <input
              id={field.id}
              type="range"
              min={field.min ?? 0}
              max={field.max ?? 100}
              step={field.step ?? 1}
              className="w-full accent-indigo-600"
              value={value}
              onChange={(e) => onChange(field.id, e.target.value)}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{field.min ?? 0}</span>
              <span>{field.max ?? 100}</span>
            </div>
          </div>
        ) : (
          <input
            id={field.id}
            type="text"
            placeholder={field.placeholder}
            className={inputClasses}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-0.5">{error}</p>
      )}
    </div>
  );
}

/**
 * Result value component with colored styling by type.
 */
interface ResultValueProps {
  label: string;
  value: string | number;
  type?: "default" | "success" | "warning" | "info" | "highlight";
}

export function ResultValue({ label, value, type = "default" }: ResultValueProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg px-4 py-3",
        {
          "bg-gray-50": type === "default",
          "bg-emerald-50 border border-emerald-100": type === "success",
          "bg-amber-50 border border-amber-100": type === "warning",
          "bg-blue-50 border border-blue-100": type === "info",
          "bg-gray-100 border border-gray-200 font-semibold": type === "highlight",
        }
      )}
    >
      <span className="text-sm text-gray-600">{label}</span>
      <span
        className={cn("text-sm font-medium tabular-nums", {
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
