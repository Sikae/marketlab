import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatCloseDate, formatMarketStatus } from "@/lib/markets/format";
import type { MarketListItem } from "@/lib/markets/types";
import { cn } from "@/lib/utils";

function statusBadgeClass(status: string): string {
  switch (status) {
    case "open":
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
    case "closed":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
    case "resolved_yes":
      return "bg-sky-500/10 text-sky-700 dark:text-sky-400";
    case "resolved_no":
      return "bg-violet-500/10 text-violet-700 dark:text-violet-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function MarketCard({ market }: { market: MarketListItem }) {
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
        {market.description ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {market.description}
          </p>
        ) : null}
      </div>
      <div className="mt-auto flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Closes</span>{" "}
          {formatCloseDate(market.close_date)}
        </p>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/markets/${market.id}`}>View details</Link>
        </Button>
      </div>
    </article>
  );
}
