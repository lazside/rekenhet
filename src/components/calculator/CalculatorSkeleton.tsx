
import { cn } from "@/lib/utils";

/**
 * Calculator loading skeleton.
 * Shows pulsing placeholders that match the calculator form layout.
 */
export function CalculatorSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6 animate-pulse", className)} aria-hidden="true">
      {/* Input section skeleton */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <div className="h-5 w-32 rounded bg-gray-200" />
        <div className="h-12 w-full rounded-lg bg-gray-100" />
        <div className="space-y-3">
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded-lg bg-gray-100" />
            <div className="h-10 rounded-lg bg-gray-100" />
            <div className="h-10 rounded-lg bg-gray-100" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-10 flex-1 rounded-lg bg-gray-100" />
            <div className="h-10 flex-1 rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>

      {/* Results section skeleton */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <div className="h-5 w-28 rounded bg-gray-200" />
        <div className="h-12 w-full rounded-lg bg-gray-50" />
        <div className="h-12 w-full rounded-lg bg-gray-50" />
        <div className="h-12 w-full rounded-lg bg-gray-50" />
      </div>
    </div>
  );
}
