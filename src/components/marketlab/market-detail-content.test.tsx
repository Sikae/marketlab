import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  WORKSHOP_CURRENT_YES_PERCENT,
  WORKSHOP_MARKET_ID,
} from "@/lib/markets/price-history";
import type { MarketListItem } from "@/lib/markets/types";
import { MarketDetailContent } from "./market-detail-content";

const openMarket: MarketListItem = {
  id: WORKSHOP_MARKET_ID,
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

describe("MarketDetailContent", () => {
  it("renders chart, current Yes chance, and market info for open markets", () => {
    const html = renderToStaticMarkup(
      <MarketDetailContent market={openMarket} buyContext={signedOutBuy} />,
    );

    expect(html).toContain("Will it rain tomorrow?");
    expect(html).toContain("Open");
    expect(html).toContain("Close date");
    expect(html).toContain("Chance of Yes");
    expect(html).toContain(`${WORKSHOP_CURRENT_YES_PERCENT}%`);
    expect(html).toContain("1D");
    expect(html).toContain("1W");
    expect(html).toContain("ALL");
    expect(html).toContain("<svg");
    expect(html).toContain("Sign in to trade");
    expect(html).not.toContain("Buying unavailable");
  });

  it("shows buying unavailable for closed markets", () => {
    const html = renderToStaticMarkup(
      <MarketDetailContent market={closedMarket} buyContext={signedOutBuy} />,
    );

    expect(html).toContain("Buying unavailable");
    expect(html).not.toContain("Sign in to trade");
  });
});
