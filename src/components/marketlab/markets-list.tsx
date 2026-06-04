import { MarketCard } from "@/components/marketlab/market-card";
import { MarketsEmptyState } from "@/components/marketlab/markets-empty-state";
import type { MarketListItem } from "@/lib/markets/types";

export function MarketsList({ markets }: { markets: MarketListItem[] }) {
  if (markets.length === 0) {
    return <MarketsEmptyState />;
  }

  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {markets.map((market) => (
        <li key={market.id}>
          <MarketCard market={market} />
        </li>
      ))}
    </ul>
  );
}
