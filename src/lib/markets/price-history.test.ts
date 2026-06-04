import { describe, expect, it } from "vitest";
import {
  buildMockYesHistory,
  filterYesHistoryByRange,
  formatYesProbability,
  getCurrentYesProbability,
  MOCK_HISTORY_REFERENCE_DATE,
  WORKSHOP_CURRENT_YES_PERCENT,
  WORKSHOP_MARKET_ID,
} from "./price-history";

describe("buildMockYesHistory", () => {
  it("returns a deterministic series for the same market id", () => {
    const a = buildMockYesHistory(WORKSHOP_MARKET_ID);
    const b = buildMockYesHistory(WORKSHOP_MARKET_ID);

    expect(a).toEqual(b);
    expect(a).toHaveLength(60);
  });

  it("produces a stable current Yes chance for the workshop fixture", () => {
    const points = buildMockYesHistory(WORKSHOP_MARKET_ID, {
      referenceDate: MOCK_HISTORY_REFERENCE_DATE,
    });

    expect(getCurrentYesProbability(points)).toBe(WORKSHOP_CURRENT_YES_PERCENT);
    expect(formatYesProbability(getCurrentYesProbability(points))).toBe("62%");
  });

  it("ends at the reference date", () => {
    const points = buildMockYesHistory(WORKSHOP_MARKET_ID, {
      referenceDate: MOCK_HISTORY_REFERENCE_DATE,
    });

    expect(points[points.length - 1].recorded_at).toBe(
      MOCK_HISTORY_REFERENCE_DATE.toISOString(),
    );
  });
});

describe("filterYesHistoryByRange", () => {
  const points = buildMockYesHistory(WORKSHOP_MARKET_ID, {
    referenceDate: MOCK_HISTORY_REFERENCE_DATE,
  });

  it("returns all points for ALL", () => {
    expect(filterYesHistoryByRange(points, "ALL")).toHaveLength(60);
  });

  it("narrows points for 1W and 1D", () => {
    const oneWeek = filterYesHistoryByRange(points, "1W");
    const oneDay = filterYesHistoryByRange(points, "1D");

    expect(oneWeek.length).toBeGreaterThan(oneDay.length);
    expect(oneDay.length).toBeGreaterThan(0);
    expect(oneWeek.length).toBeLessThan(points.length);
  });
});

describe("getCurrentYesProbability", () => {
  it("returns 0 for an empty series", () => {
    expect(getCurrentYesProbability([])).toBe(0);
  });
});
