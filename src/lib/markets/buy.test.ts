import { describe, expect, it } from "vitest";
import { isMarketBuyable } from "./buy";

const futureClose = "2099-06-15T18:00:00.000Z";
const pastClose = "2020-06-15T18:00:00.000Z";
const now = new Date("2026-06-04T12:00:00.000Z");

describe("isMarketBuyable", () => {
  it("returns true only for open markets before close date", () => {
    expect(isMarketBuyable("open", futureClose, now)).toBe(true);
    expect(isMarketBuyable("open", pastClose, now)).toBe(false);
    expect(isMarketBuyable("closed", futureClose, now)).toBe(false);
    expect(isMarketBuyable("resolved_yes", futureClose, now)).toBe(false);
    expect(isMarketBuyable("resolved_no", futureClose, now)).toBe(false);
  });
});
