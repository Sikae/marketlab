import { describe, expect, it } from "vitest";
import { buyMarketSchema, mapBuyRpcError } from "./buy-validation";

describe("buyMarketSchema", () => {
  it("accepts valid buy input", () => {
    const result = buyMarketSchema.safeParse({
      market_id: "550e8400-e29b-41d4-a716-446655440000",
      side: "yes",
      amount: "1.50",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid side and market id", () => {
    expect(
      buyMarketSchema.safeParse({
        market_id: "not-a-uuid",
        side: "maybe",
        amount: "1",
      }).success,
    ).toBe(false);
  });
});

describe("mapBuyRpcError", () => {
  it("maps known rpc errors", () => {
    expect(mapBuyRpcError("insufficient_balance")).toContain(
      "enough fake balance",
    );
    expect(mapBuyRpcError("market_not_buyable")).toContain("not open");
    expect(mapBuyRpcError("profile_not_found")).toContain("profile");
  });
});
