import { MarketsList } from "@/components/marketlab/markets-list";
import { MarketsPageIntro } from "@/components/marketlab/markets-page-intro";
import { listMarkets } from "@/lib/markets/queries";

export default async function MarketsPage() {
  const markets = await listMarkets();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <MarketsPageIntro />
      <MarketsList markets={markets} />
    </div>
  );
}
