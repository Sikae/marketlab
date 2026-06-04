"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MarketBuySection } from "@/components/marketlab/market-buy-section";
import { MarketOutcomes } from "@/components/marketlab/market-outcomes";
import { MarketYesChart } from "@/components/marketlab/market-yes-chart";
import type { MarketBuyContext } from "@/lib/markets/buy-context";
import type { BuySuccessState } from "@/lib/markets/buy-validation";
import { formatCloseDate, formatMarketStatus } from "@/lib/markets/format";
import {
  type MarketYesPricePoint,
  resolveCurrentYesPercent,
} from "@/lib/markets/price-history";
import type { MarketListItem } from "@/lib/markets/types";

function appendPricePoint(
  points: MarketYesPricePoint[],
  yesProbability: number,
): MarketYesPricePoint[] {
  const last = points[points.length - 1];
  if (last?.yes_probability === yesProbability) {
    return points;
  }

  return [
    ...points,
    {
      recorded_at: new Date().toISOString(),
      yes_probability: yesProbability,
    },
  ];
}

export function MarketDetailContent({
  market,
  buyContext,
  priceHistory,
  latestYesPercent,
}: {
  market: MarketListItem;
  buyContext: MarketBuyContext;
  priceHistory: MarketYesPricePoint[];
  latestYesPercent: number;
}) {
  const router = useRouter();
  const [points, setPoints] = useState(priceHistory);
  const [currentYesPercent, setCurrentYesPercent] = useState(() =>
    resolveCurrentYesPercent(market, priceHistory, latestYesPercent),
  );

  useEffect(() => {
    setPoints(priceHistory);
    setCurrentYesPercent(
      resolveCurrentYesPercent(market, priceHistory, latestYesPercent),
    );
  }, [market, priceHistory, latestYesPercent]);

  function handleBuySuccess(success: BuySuccessState) {
    setCurrentYesPercent(success.yesProbability);
    setPoints((prev) => appendPricePoint(prev, success.yesProbability));
    router.refresh();
  }

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

      <MarketYesChart points={points} currentYesPercent={currentYesPercent} />

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

      <MarketBuySection
        market={market}
        buyContext={buyContext}
        onBuySuccess={handleBuySuccess}
      />
    </article>
  );
}
