import { describe, expect, it } from "vitest";
import { isMarketBuyable } from "./buy";

describe("isMarketBuyable", () => {
  it("returns true only for open markets", () => {
    expect(isMarketBuyable("open")).toBe(true);
    expect(isMarketBuyable("closed")).toBe(false);
    expect(isMarketBuyable("resolved_yes")).toBe(false);
    expect(isMarketBuyable("resolved_no")).toBe(false);
  });
});
