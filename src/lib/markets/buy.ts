import type { MarketStatus } from "@/lib/markets/types";

export function isMarketBuyable(
  status: MarketStatus,
  closeDate: string,
  now: Date = new Date(),
): boolean {
  return status === "open" && new Date(closeDate) > now;
}
