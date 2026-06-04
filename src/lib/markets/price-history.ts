import type { MarketListItem } from "@/lib/markets/types";

export type ChartRange = "1D" | "1W" | "ALL";

export type MarketYesPricePoint = {
  recorded_at: string;
  yes_probability: number;
};

const RANGE_MS: Record<Exclude<ChartRange, "ALL">, number> = {
  "1D": 24 * 60 * 60 * 1000,
  "1W": 7 * 24 * 60 * 60 * 1000,
};

export function getCurrentYesProbability(
  points: MarketYesPricePoint[],
): number {
  if (points.length === 0) {
    return 50;
  }
  return points[points.length - 1].yes_probability;
}

export function resolveCurrentYesPercent(
  market: Pick<MarketListItem, "status">,
  points: MarketYesPricePoint[],
  latestFromDb?: number,
): number {
  if (market.status === "resolved_yes") {
    return 100;
  }
  if (market.status === "resolved_no") {
    return 0;
  }
  if (latestFromDb !== undefined) {
    return latestFromDb;
  }
  return getCurrentYesProbability(points);
}

export function formatYesProbability(percent: number): string {
  return `${Math.round(percent)}%`;
}

export function filterYesHistoryByRange(
  points: MarketYesPricePoint[],
  range: ChartRange,
): MarketYesPricePoint[] {
  if (range === "ALL" || points.length === 0) {
    return points;
  }

  const lastTime = new Date(points[points.length - 1].recorded_at).getTime();
  const cutoff = lastTime - RANGE_MS[range];

  const filtered = points.filter(
    (point) => new Date(point.recorded_at).getTime() >= cutoff,
  );

  return filtered.length > 0 ? filtered : [points[points.length - 1]];
}
