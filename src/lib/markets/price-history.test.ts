import { describe, expect, it } from "vitest";

import {
  filterYesHistoryByRange,
  formatYesProbability,
  getCurrentYesProbability,
  type MarketYesPricePoint,
  resolveCurrentYesPercent,
} from "./price-history";

const samplePoints: MarketYesPricePoint[] = [
  { recorded_at: "2026-06-01T12:00:00.000Z", yes_probability: 40 },
  { recorded_at: "2026-06-02T12:00:00.000Z", yes_probability: 55 },
  { recorded_at: "2026-06-04T12:00:00.000Z", yes_probability: 62 },
];

describe("getCurrentYesProbability", () => {
  it("returns the latest point probability", () => {
    expect(getCurrentYesProbability(samplePoints)).toBe(62);
  });

  it("returns 50 when there is no history", () => {
    expect(getCurrentYesProbability([])).toBe(50);
  });
});

describe("resolveCurrentYesPercent", () => {
  it("returns 100 for resolved Yes markets", () => {
    expect(
      resolveCurrentYesPercent({ status: "resolved_yes" }, samplePoints),
    ).toBe(100);
  });

  it("returns 0 for resolved No markets", () => {
    expect(
      resolveCurrentYesPercent({ status: "resolved_no" }, samplePoints),
    ).toBe(0);
  });

  it("uses history for open markets", () => {
    expect(resolveCurrentYesPercent({ status: "open" }, samplePoints)).toBe(62);
  });

  it("prefers latestFromDb for open markets when provided", () => {
    expect(resolveCurrentYesPercent({ status: "open" }, samplePoints, 97)).toBe(
      97,
    );
  });
});

describe("filterYesHistoryByRange", () => {
  it("returns all points for ALL", () => {
    expect(filterYesHistoryByRange(samplePoints, "ALL")).toHaveLength(3);
  });

  it("filters to the last day window", () => {
    const filtered = filterYesHistoryByRange(samplePoints, "1D");
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[filtered.length - 1].yes_probability).toBe(62);
  });
});

describe("formatYesProbability", () => {
  it("formats as a rounded percent string", () => {
    expect(formatYesProbability(62.4)).toBe("62%");
  });
});
