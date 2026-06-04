import type { MarketListItem } from "@/lib/markets/types";

export type PositionWithMarket = {
  positionId: string;
  marketId: string;
  yesSharesCents: number;
  noSharesCents: number;
  investedCents: number;
  market: Pick<MarketListItem, "id" | "title" | "status" | "close_date">;
};
