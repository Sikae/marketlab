import Link from "next/link";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: () => {} }),
}));

import { MarketDetailContent } from "@/components/marketlab/market-detail-content";
import { Button } from "@/components/ui/button";
import type { MarketYesPricePoint } from "@/lib/markets/price-history";
import type { MarketListItem } from "@/lib/markets/types";

const openMarket: MarketListItem = {
  id: "11111111-1111-1111-1111-111111111111",
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

const priceHistory: MarketYesPricePoint[] = [
  { recorded_at: "2026-06-04T12:00:00.000Z", yes_probability: 62 },
];

/** Mirrors the detail page shell (back link + content) for stable UI tests. */
function MarketDetailPageShell({ market }: { market: MarketListItem }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href="/markets">← Back to markets</Link>
      </Button>
      <MarketDetailContent
        market={market}
        buyContext={signedOutBuy}
        priceHistory={priceHistory}
        latestYesPercent={62}
      />
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
    expect(html).toContain("62%");
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
