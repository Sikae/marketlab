import { formatYesProbability } from "@/lib/markets/price-history";

export function MarketOutcomes({
  currentYesPercent,
}: {
  currentYesPercent: number;
}) {
  const noPercent = 100 - currentYesPercent;

  return (
    <section
      aria-label="Outcomes"
      className="rounded-xl border border-border bg-card p-5 text-sm"
    >
      <h2 className="font-semibold">Outcomes</h2>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 rounded-lg border border-border bg-muted/30 p-4">
          <dt className="font-medium text-emerald-700 dark:text-emerald-400">
            Yes
          </dt>
          <dd className="text-2xl font-semibold tabular-nums">
            {formatYesProbability(currentYesPercent)}
          </dd>
        </div>
        <div className="flex flex-col gap-1 rounded-lg border border-border bg-muted/30 p-4">
          <dt className="font-medium text-violet-700 dark:text-violet-400">
            No
          </dt>
          <dd className="text-2xl font-semibold tabular-nums">
            {formatYesProbability(noPercent)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
