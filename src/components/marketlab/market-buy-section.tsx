import { MarketBuyForm } from "@/components/marketlab/market-buy-form";
import { MarketBuySignIn } from "@/components/marketlab/market-buy-sign-in";
import { MarketBuyUnavailable } from "@/components/marketlab/market-buy-unavailable";
import { isMarketBuyable } from "@/lib/markets/buy";
import type { MarketBuyContext } from "@/lib/markets/buy-context";
import type { MarketListItem } from "@/lib/markets/types";

export type { MarketBuyContext } from "@/lib/markets/buy-context";

export function MarketBuySection({
  market,
  buyContext,
}: {
  market: MarketListItem;
  buyContext: MarketBuyContext;
}) {
  const buyable = isMarketBuyable(market.status, market.close_date);
  const expired =
    market.status === "open" &&
    !isMarketBuyable(market.status, market.close_date);

  if (!buyable) {
    return <MarketBuyUnavailable status={market.status} expired={expired} />;
  }

  if (!buyContext.isSignedIn) {
    return <MarketBuySignIn />;
  }

  return (
    <MarketBuyForm
      marketId={market.id}
      balanceCents={buyContext.balanceCents}
      position={buyContext.position}
    />
  );
}
