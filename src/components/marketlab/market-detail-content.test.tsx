import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: () => {} }),
}));

import type { MarketYesPricePoint } from "@/lib/markets/price-history";
import type { MarketListItem } from "@/lib/markets/types";
import { MarketDetailContent } from "./market-detail-content";

const marketId = "11111111-1111-1111-1111-111111111111";

const openMarket: MarketListItem = {
  id: marketId,
  title: "Will it rain tomorrow?",
  description: "A fictional weather market for the workshop.",
  status: "open",
  close_date: "2026-06-15T18:00:00.000Z",
};

const closedMarket: MarketListItem = {
  ...openMarket,
  status: "closed",
};

const signedOutBuy = {
  isSignedIn: false,
  balanceCents: 0,
  position: null,
};

const priceHistory: MarketYesPricePoint[] = [
  { recorded_at: "2026-06-01T12:00:00.000Z", yes_probability: 40 },
  { recorded_at: "2026-06-04T12:00:00.000Z", yes_probability: 62 },
];

describe("MarketDetailContent", () => {
  it("renders chart, current Yes chance, and market info for open markets", () => {
    const html = renderToStaticMarkup(
      <MarketDetailContent
        market={openMarket}
        buyContext={signedOutBuy}
        priceHistory={priceHistory}
        latestYesPercent={62}
      />,
    );

    expect(html).toContain("Will it rain tomorrow?");
    expect(html).toContain("Open");
    expect(html).toContain("Close date");
    expect(html).toContain("Chance of Yes");
    expect(html).toContain("62%");
    expect(html).toContain("1D");
    expect(html).toContain("1W");
    expect(html).toContain("ALL");
    expect(html).toContain("<svg");
    expect(html).toContain("Sign in to trade");
    expect(html).not.toContain("Buying unavailable");
  });

  it("shows buying unavailable for closed markets", () => {
    const html = renderToStaticMarkup(
      <MarketDetailContent
        market={closedMarket}
        buyContext={signedOutBuy}
        priceHistory={priceHistory}
        latestYesPercent={62}
      />,
    );

    expect(html).toContain("Buying unavailable");
    expect(html).not.toContain("Sign in to trade");
  });

  it("shows resolved Yes as 100%", () => {
    const html = renderToStaticMarkup(
      <MarketDetailContent
        market={{ ...openMarket, status: "resolved_yes" }}
        buyContext={signedOutBuy}
        priceHistory={priceHistory}
        latestYesPercent={62}
      />,
    );

    expect(html).toContain("100%");
  });
});
