import { formatMarketStatus } from "@/lib/markets/format";
import type { MarketStatus } from "@/lib/markets/types";

export function MarketBuyUnavailable({
  status,
  expired,
}: {
  status: MarketStatus;
  expired?: boolean;
}) {
  return (
    <section
      aria-label="Buy"
      className="rounded-xl border border-border bg-card p-5 text-sm"
    >
      <h2 className="font-semibold">Buy</h2>
      <p className="mt-2 font-medium">Buying unavailable</p>
      <p className="mt-1 text-muted-foreground">
        {expired ? (
          <>
            This market has passed its close date and no longer accepts
            fake-money trades.
          </>
        ) : (
          <>
            This market is {formatMarketStatus(status).toLowerCase()} and no
            longer accepts trades.
          </>
        )}
      </p>
    </section>
  );
}
