import Link from "next/link";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarketDetailContent } from "@/components/marketlab/market-detail-content";
import { Button } from "@/components/ui/button";
import {
  WORKSHOP_CURRENT_YES_PERCENT,
  WORKSHOP_MARKET_ID,
} from "@/lib/markets/price-history";
import type { MarketListItem } from "@/lib/markets/types";

const openMarket: MarketListItem = {
  id: WORKSHOP_MARKET_ID,
  title: "Will it rain tomorrow?",
  description: "A fictional weather market for the workshop.",
  status: "open",
  close_date: "2026-06-15T18:00:00.000Z",
};

const signedOutBuy = {
  isSignedIn: false,
  balanceCents: 0,
  position: null,
};

/** Mirrors the detail page shell (back link + content) for stable UI tests. */
function MarketDetailPageShell({ market }: { market: MarketListItem }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href="/markets">← Back to markets</Link>
      </Button>
      <MarketDetailContent market={market} buyContext={signedOutBuy} />
    </div>
  );
}

describe("Market detail page UI", () => {
  it("renders back link, chart, and current Yes chance", () => {
    const html = renderToStaticMarkup(
      <MarketDetailPageShell market={openMarket} />,
    );

    expect(html).toContain('href="/markets"');
    expect(html).toContain("← Back to markets");
    expect(html).toContain("Will it rain tomorrow?");
    expect(html).toContain(`${WORKSHOP_CURRENT_YES_PERCENT}%`);
    expect(html).toContain("Chance of Yes");
    expect(html).toContain("<svg");
  });

  it("shows buying unavailable for closed markets", () => {
    const html = renderToStaticMarkup(
      <MarketDetailPageShell market={{ ...openMarket, status: "closed" }} />,
    );

    expect(html).toContain("Buying unavailable");
    expect(html).not.toContain("Sign in to trade");
  });
});
