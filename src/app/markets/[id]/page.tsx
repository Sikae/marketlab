import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketDetailContent } from "@/components/marketlab/market-detail-content";
import { Button } from "@/components/ui/button";
import { loadMarketBuyContext } from "@/lib/markets/buy-context";
import { resolveCurrentYesPercent } from "@/lib/markets/price-history";
import { getMarketById } from "@/lib/markets/queries";
import {
  getMarketYesPriceHistory,
  getMarketYesProbability,
} from "@/lib/markets/yes-price-queries";

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const market = await getMarketById(id);

  if (!market) {
    notFound();
  }

  const [buyContext, priceHistory, latestYesPercent] = await Promise.all([
    loadMarketBuyContext(market.id),
    getMarketYesPriceHistory(market.id),
    getMarketYesProbability(market.id),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href="/markets">← Back to markets</Link>
      </Button>
      <MarketDetailContent
        market={market}
        buyContext={buyContext}
        priceHistory={priceHistory}
        latestYesPercent={resolveCurrentYesPercent(
          market,
          priceHistory,
          latestYesPercent,
        )}
      />
    </div>
  );
}
