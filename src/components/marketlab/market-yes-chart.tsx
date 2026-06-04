"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  type ChartRange,
  filterYesHistoryByRange,
  formatYesProbability,
  type MarketYesPricePoint,
} from "@/lib/markets/price-history";

const RANGES: ChartRange[] = ["1D", "1W", "ALL"];

const CHART_WIDTH = 400;
const CHART_HEIGHT = 200;
const PADDING = { top: 8, right: 8, bottom: 24, left: 36 };

function buildLinePath(points: MarketYesPricePoint[]): string {
  if (points.length === 0) {
    return "";
  }

  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const minTime = new Date(points[0].recorded_at).getTime();
  const maxTime = new Date(points[points.length - 1].recorded_at).getTime();
  const timeSpan = Math.max(maxTime - minTime, 1);

  const coords = points.map((point) => {
    const time = new Date(point.recorded_at).getTime();
    const x =
      PADDING.left +
      (points.length === 1
        ? innerWidth / 2
        : ((time - minTime) / timeSpan) * innerWidth);
    const y =
      PADDING.top + innerHeight - (point.yes_probability / 100) * innerHeight;
    return { x, y };
  });

  return coords
    .map((coord, i) =>
      i === 0
        ? `M ${coord.x.toFixed(2)} ${coord.y.toFixed(2)}`
        : `L ${coord.x.toFixed(2)} ${coord.y.toFixed(2)}`,
    )
    .join(" ");
}

export function MarketYesChart({
  points,
  currentYesPercent,
}: {
  points: MarketYesPricePoint[];
  currentYesPercent: number;
}) {
  const [range, setRange] = useState<ChartRange>("ALL");

  const visiblePoints = useMemo(
    () => filterYesHistoryByRange(points, range),
    [points, range],
  );

  const linePath = useMemo(() => buildLinePath(visiblePoints), [visiblePoints]);

  const ariaLabel = `Yes probability chart, currently ${formatYesProbability(currentYesPercent)}`;

  return (
    <section
      aria-label="Yes probability chart"
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex flex-col gap-1">
        <p className="text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl">
          {formatYesProbability(currentYesPercent)}
        </p>
        <p className="text-sm text-muted-foreground">Chance of Yes</p>
      </div>

      <div className="mt-4 flex gap-1">
        {RANGES.map((value) => (
          <Button
            key={value}
            type="button"
            variant={range === value ? "secondary" : "ghost"}
            size="sm"
            aria-pressed={range === value}
            onClick={() => setRange(value)}
          >
            {value}
          </Button>
        ))}
      </div>

      <div className="mt-4 w-full">
        <svg
          role="img"
          aria-label={ariaLabel}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-[200px] w-full text-muted-foreground"
          preserveAspectRatio="none"
        >
          <title>{ariaLabel}</title>
          {[0, 50, 100].map((tick) => {
            const y =
              PADDING.top +
              (CHART_HEIGHT - PADDING.top - PADDING.bottom) -
              (tick / 100) * (CHART_HEIGHT - PADDING.top - PADDING.bottom);
            return (
              <g key={tick}>
                <line
                  x1={PADDING.left}
                  x2={CHART_WIDTH - PADDING.right}
                  y1={y}
                  y2={y}
                  className="stroke-border"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={PADDING.left - 6}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground text-[10px]"
                >
                  {tick}%
                </text>
              </g>
            );
          })}
          {linePath ? (
            <path
              d={linePath}
              fill="none"
              className="stroke-primary"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </svg>
      </div>
    </section>
  );
}
