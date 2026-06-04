/** Shared workshop fixture market id (see market-card.test.tsx). */
export const WORKSHOP_MARKET_ID = "11111111-1111-1111-1111-111111111111";

/** Stable current Yes % for WORKSHOP_MARKET_ID with the fixed reference date. */
export const WORKSHOP_CURRENT_YES_PERCENT = 62;

export type ChartRange = "1D" | "1W" | "ALL";

export type MarketYesPricePoint = {
  recorded_at: string;
  yes_probability: number;
};

const POINT_COUNT = 60;
const WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

/** Fixed end time for deterministic series in app and tests. */
export const MOCK_HISTORY_REFERENCE_DATE = new Date("2026-06-04T12:00:00.000Z");

const RANGE_MS: Record<Exclude<ChartRange, "ALL">, number> = {
  "1D": 24 * 60 * 60 * 1000,
  "1W": 7 * 24 * 60 * 60 * 1000,
};

function hashMarketId(marketId: string): number {
  let h = 0;
  for (let i = 0; i < marketId.length; i++) {
    h = (Math.imul(31, h) + marketId.charCodeAt(i)) >>> 0;
  }
  return h || 1;
}

function mulberry32(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clampProbability(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function buildMockYesHistory(
  marketId: string,
  options?: { referenceDate?: Date },
): MarketYesPricePoint[] {
  const end = options?.referenceDate ?? MOCK_HISTORY_REFERENCE_DATE;
  const startMs = end.getTime() - WINDOW_MS;
  const endMs = end.getTime();
  const rand = mulberry32(hashMarketId(marketId));
  const points: MarketYesPricePoint[] = [];
  let prob = 40 + rand() * 20;

  const endPercent = clampProbability(30 + (hashMarketId(marketId) % 56));

  for (let i = 0; i < POINT_COUNT; i++) {
    const t = startMs + (i / (POINT_COUNT - 1)) * (endMs - startMs);
    prob += (rand() - 0.5) * 8;
    prob = Math.max(5, Math.min(95, prob));
    points.push({
      recorded_at: new Date(t).toISOString(),
      yes_probability: clampProbability(prob),
    });
  }

  points[points.length - 1].yes_probability = endPercent;

  return points;
}

export function getCurrentYesProbability(
  points: MarketYesPricePoint[],
): number {
  if (points.length === 0) {
    return 0;
  }
  return points[points.length - 1].yes_probability;
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
