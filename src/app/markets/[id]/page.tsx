import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketDetailContent } from "@/components/marketlab/market-detail-content";
import { Button } from "@/components/ui/button";
import { loadMarketBuyContext } from "@/lib/markets/buy-context";
import { getMarketById } from "@/lib/markets/queries";

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

  const buyContext = await loadMarketBuyContext(market.id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href="/markets">← Back to markets</Link>
      </Button>
      <MarketDetailContent market={market} buyContext={buyContext} />
    </div>
  );
}
