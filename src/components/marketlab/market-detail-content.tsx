import { MarketBuyPlaceholder } from "@/components/marketlab/market-buy-placeholder";
import { MarketOutcomes } from "@/components/marketlab/market-outcomes";
import { MarketYesChart } from "@/components/marketlab/market-yes-chart";
import { formatCloseDate, formatMarketStatus } from "@/lib/markets/format";
import {
  buildMockYesHistory,
  getCurrentYesProbability,
} from "@/lib/markets/price-history";
import type { MarketListItem } from "@/lib/markets/types";

export function MarketDetailContent({ market }: { market: MarketListItem }) {
  const history = buildMockYesHistory(market.id);
  const currentYesPercent = getCurrentYesProbability(history);

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          {formatMarketStatus(market.status)}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {market.title}
        </h1>
        {market.description ? (
          <p className="text-muted-foreground">{market.description}</p>
        ) : null}
      </header>

      <MarketYesChart points={history} currentYesPercent={currentYesPercent} />

      <dl className="grid gap-4 rounded-xl border border-border bg-card p-5 text-sm">
        <div className="flex flex-col gap-1">
          <dt className="font-medium text-muted-foreground">Status</dt>
          <dd>{formatMarketStatus(market.status)}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-medium text-muted-foreground">Close date</dt>
          <dd>{formatCloseDate(market.close_date)}</dd>
        </div>
      </dl>

      <MarketOutcomes currentYesPercent={currentYesPercent} />

      <MarketBuyPlaceholder status={market.status} />
    </article>
  );
}
