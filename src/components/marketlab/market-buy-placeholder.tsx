import { isMarketBuyable } from "@/lib/markets/buy";
import { formatMarketStatus } from "@/lib/markets/format";
import type { MarketStatus } from "@/lib/markets/types";

export function MarketBuyPlaceholder({ status }: { status: MarketStatus }) {
  if (isMarketBuyable(status)) {
    return (
      <section
        aria-label="Buy"
        className="rounded-xl border border-border bg-card p-5 text-sm"
      >
        <h2 className="font-semibold">Buy</h2>
        <p className="mt-2 text-muted-foreground">
          Sign in to trade on this market. Trading uses fake workshop money
          only.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Buy"
      className="rounded-xl border border-border bg-card p-5 text-sm"
    >
      <h2 className="font-semibold">Buy</h2>
      <p className="mt-2 font-medium">Buying unavailable</p>
      <p className="mt-1 text-muted-foreground">
        This market is {formatMarketStatus(status).toLowerCase()} and no longer
        accepts trades.
      </p>
    </section>
  );
}
