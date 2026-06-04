import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatFakeBalance, formatFakeShares } from "@/lib/fake-money";
import {
  formatCloseDate,
  formatMarketStatus,
  statusBadgeClass,
} from "@/lib/markets/format";
import type { PositionWithMarket } from "@/lib/positions/types";
import { cn } from "@/lib/utils";

export function PositionCard({ position }: { position: PositionWithMarket }) {
  const { market } = position;

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-lg font-semibold leading-snug">{market.title}</h2>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
              statusBadgeClass(market.status),
            )}
          >
            {formatMarketStatus(market.status)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Closes</span>{" "}
          {formatCloseDate(market.close_date)}
        </p>
      </div>

      <dl className="grid gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Yes shares</dt>
          <dd className="font-medium tabular-nums">
            {formatFakeShares(position.yesSharesCents)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">No shares</dt>
          <dd className="font-medium tabular-nums">
            {formatFakeShares(position.noSharesCents)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Invested</dt>
          <dd className="font-medium tabular-nums">
            {formatFakeBalance(position.investedCents)}
          </dd>
        </div>
      </dl>

      <Button variant="outline" className="mt-auto w-full" asChild>
        <Link href={`/markets/${market.id}`}>View market</Link>
      </Button>
    </article>
  );
}
