
import { useId } from "react";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────

export interface DataPoint {
  label: string;
  value: number;
}

interface CalculationLineChartProps {
  data: DataPoint[];
  /** Chart dimensions */
  width?: number;
  height?: number;
  className?: string;
  /** Axis labels */
  xLabel?: string;
  yLabel?: string;
  /** Line color */
  lineColor?: string;
  /** Gradient under the line */
  gradientFrom?: string;
  gradientTo?: string;
  /** Format Y-axis values */
  formatY?: (v: number) => string;
  /** Format tooltip values */
  formatTooltip?: (v: number) => string;
  /** Highlight the latest value */
  showLatestValue?: boolean;
}

// ─── Chart ─────────────────────────────────────────────────────

/**
 * Animated SVG line chart for financial / amortization data.
 *
 * Zero dependencies — pure SVG with CSS transitions.
 * Features:
 *   - Animated path drawing (stroke-dashoffset animation)
 *   - Area gradient fill under the line
 *   - Y-axis grid lines with formatted labels
 *   - X-axis labels (auto-skipped if too many)
 *   - Tooltip on the latest data point
 *   - ARIA labels for accessibility
 *   - Smooth cubic bezier interpolation
 */
export function CalculationLineChart({
  data,
  width = 320,
  height = 200,
  className,
  xLabel,
  yLabel,
  lineColor = "#2563eb",
  gradientFrom = "#2563eb",
  gradientTo = "#eff6ff",
  formatY = (v) => `€${(v / 1000).toFixed(0)}k`,
  formatTooltip = (v) => `€${v.toLocaleString("nl-NL")}`,
  showLatestValue = true,
}: CalculationLineChartProps) {
  const uid = useId();

  if (!data || data.length < 2) return null;

  const pad = { top: 16, right: 16, bottom: 32, left: 48 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const values = data.map((d) => d.value);
  const minY = 0;
  const maxY = Math.max(...values) * 1.1 || 1;
  const rangeY = maxY - minY || 1;

  // Generate path (cubic bezier for smooth curves)
  const points = data.map((d, i) => ({
    x: pad.left + (i / Math.max(data.length - 1, 1)) * chartW,
    y: pad.top + chartH - ((d.value - minY) / rangeY) * chartH,
  }));

  // Build SVG path with cubic bezier
  let pathD = "";
  let areaD = "";
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      pathD += `M ${points[i].x} ${points[i].y}`;
      areaD = `M ${points[i].x} ${points[i].y}`;
    } else {
      const prev = points[i - 1];
      const cx1 = prev.x + (points[i].x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (points[i].x - prev.x) / 2;
      const cy2 = points[i].y;
      pathD += ` C ${cx1},${cy1} ${cx2},${cy2} ${points[i].x},${points[i].y}`;
      areaD += ` C ${cx1},${cy1} ${cx2},${cy2} ${points[i].x},${points[i].y}`;
    }
  }
  areaD += ` L ${points[points.length - 1].x} ${pad.top + chartH} L ${points[0].x} ${pad.top + chartH} Z`;

  // Path length for animation
  const pathLength = points.reduce((acc, p, i) => {
    if (i === 0) return 0;
    const prev = points[i - 1];
    return acc + Math.sqrt((p.x - prev.x) ** 2 + (p.y - prev.y) ** 2);
  }, 0);

  // Y-axis ticks
  const yTicks = 5;
  const yStep = rangeY / yTicks;

  // X-axis labels (skip if more than 12)
  const skipLabel = data.length > 12 ? Math.ceil(data.length / 8) : 1;

  return (
    <div className={cn("relative", className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Lijndiagram${xLabel ? ` — ${xLabel}` : ""}${yLabel ? `, ${yLabel}` : ""}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`${uid}-area`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.2} />
            <stop offset="100%" stopColor={gradientTo} stopOpacity={0.02} />
          </linearGradient>
          <filter id={`${uid}-shadow`}>
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity={0.15} />
          </filter>
        </defs>

        {/* Y-axis grid lines */}
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const yVal = minY + yStep * i;
          const yPos = pad.top + chartH - ((yVal - minY) / rangeY) * chartH;
          return (
            <g key={i}>
              <line
                x1={pad.left}
                y1={yPos}
                x2={pad.left + chartW}
                y2={yPos}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={pad.left - 8}
                y={yPos + 4}
                textAnchor="end"
                className="fill-gray-400 text-[9px]"
              >
                {formatY(Math.round(yVal))}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path
          d={areaD}
          fill={`url(#${uid}-area)`}
          className="transition-all duration-500"
        />

        {/* Data line */}
        <path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: 0,
          }}
          className="transition-all duration-700 ease-out"
          filter={`url(#${uid}-shadow)`}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === points.length - 1 ? 3.5 : 2}
            fill={i === points.length - 1 ? lineColor : "#fff"}
            stroke={lineColor}
            strokeWidth={2}
            className="transition-all duration-300"
          />
        ))}

        {/* X-axis labels */}
        {data.map((d, i) =>
          i % skipLabel === 0 || i === data.length - 1 ? (
            <text
              key={i}
              x={points[i].x}
              y={height - 8}
              textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}
              className="fill-gray-400 text-[8px]"
            >
              {d.label}
            </text>
          ) : null
        )}

        {/* Axis labels */}
        {yLabel && (
          <text
            x={12}
            y={height / 2}
            textAnchor="middle"
            transform={`rotate(-90, 12, ${height / 2})`}
            className="fill-gray-400 text-[9px]"
          >
            {yLabel}
          </text>
        )}
        {xLabel && (
          <text
            x={width / 2}
            y={height - 2}
            textAnchor="middle"
            className="fill-gray-400 text-[9px]"
          >
            {xLabel}
          </text>
        )}
      </svg>

      {/* Latest value tooltip */}
      {showLatestValue && data.length > 0 && (
        <div className="absolute -top-1 right-0 rounded-lg bg-blue-50 border border-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700 shadow-sm tabular-nums">
          {formatTooltip(data[data.length - 1].value)}
        </div>
      )}
    </div>
  );
}
