import Link from "next/link";

import { Button } from "@/components/ui/button";

export function MarketBuySignIn() {
  return (
    <section
      aria-label="Buy"
      className="rounded-xl border border-border bg-card p-5 text-sm"
    >
      <h2 className="font-semibold">Buy</h2>
      <p className="mt-2 text-muted-foreground">
        Sign in to trade on this market. Trading uses fake workshop money only.
      </p>
      <Button asChild className="mt-4">
        <Link href="/login">Sign in</Link>
      </Button>
    </section>
  );
}
