import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { formatCloseDate, formatMarketStatus } from "@/lib/markets/format";
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href="/markets">← Back to markets</Link>
      </Button>
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
      </article>
    </div>
  );
}
