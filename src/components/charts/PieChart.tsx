
import { useId } from "react";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────

export interface PieSegment {
  label: string;
  value: number;
  color: string;
  /** Optional lighter variant for the gradient stop */
  colorLight?: string;
}

interface CalculationPieChartProps {
  segments: PieSegment[];
  /** Size in pixels (default: 160) */
  size?: number;
  /** Inner radius ratio (0-1). 0 = pizza, 0.6 = donut */
  innerRadiusRatio?: number;
  className?: string;
  /** Optional: highlight result value shown in the center */
  centerValue?: string;
  centerLabel?: string;
}

// ─── Chart ─────────────────────────────────────────────────────

/**
 * Animated SVG pie/donut chart.
 *
 * Zero dependencies — pure SVG rendered with CSS transitions.
 * Each segment animates smoothly when values change.
 * Fully accessible with ARIA labels and proper role attributes.
 */
export function CalculationPieChart({
  segments,
  size = 160,
  innerRadiusRatio = 0.6,
  className,
  centerValue,
  centerLabel,
}: CalculationPieChartProps) {
  const uid = useId();
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
  if (total <= 0) return null;

  const radius = size / 2 - 4; // stroke width margin
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = radius * (1 - innerRadiusRatio) * 2;

  let offset = 0;
  const arcs = segments.map((seg) => {
    const pct = seg.value / total;
    const len = pct * circumference;
    const arc = {
      ...seg,
      pct,
      dashArray: `${len} ${circumference - len}`,
      dashOffset: -offset,
    };
    offset += len;
    return arc;
  });

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        role="img"
        aria-label="Cirkeldiagram met verdeling"
      >
        <defs>
          {segments.map((seg, i) => (
            <linearGradient
              key={i}
              id={`${uid}-grad-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={seg.colorLight || seg.color} />
              <stop offset="100%" stopColor={seg.color} />
            </linearGradient>
          ))}
        </defs>

        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${uid}-grad-${i})`}
            strokeWidth={strokeWidth}
            strokeDasharray={arc.dashArray}
            strokeDashoffset={arc.dashOffset}
            className="transition-all duration-500 ease-out"
            style={{
              strokeLinecap: "round" as const,
            }}
          />
        ))}
      </svg>

      {/* Center text */}
      {centerValue && (
        <div
          className="absolute flex flex-col items-center justify-center pointer-events-none"
          style={{ width: size, height: size, marginTop: -size }}
        >
          <span className="text-lg font-bold text-gray-900 tabular-nums leading-none">
            {centerValue}
          </span>
          {centerLabel && (
            <span className="text-[10px] text-gray-500 mt-0.5">{centerLabel}</span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {arcs.map((arc, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: arc.color }}
            />
            <span className="text-xs text-gray-600">
              {arc.label}{" "}
              <span className="text-gray-400 tabular-nums">
                ({(arc.pct * 100).toFixed(0)}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
