import Link from "next/link";

import { Button } from "@/components/ui/button";

export function PositionsSignIn() {
  return (
    <section
      aria-label="Sign in required"
      className="rounded-xl border border-border bg-card p-6 text-sm"
    >
      <h2 className="text-lg font-semibold">Sign in to view positions</h2>
      <p className="mt-2 text-muted-foreground">
        Your Yes/No holdings appear here after you sign in and buy shares on
        open markets.
      </p>
      <Button asChild className="mt-4">
        <Link href="/login">Sign in</Link>
      </Button>
    </section>
  );
}
