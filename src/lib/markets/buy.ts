import type { MarketStatus } from "@/lib/markets/types";

export function isMarketBuyable(status: MarketStatus): boolean {
  return status === "open";
}
