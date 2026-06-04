import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { MarketListItem } from "@/lib/markets/types";
import { MarketBuySection } from "./market-buy-section";
import { MarketBuySignIn } from "./market-buy-sign-in";
import { MarketBuyUnavailable } from "./market-buy-unavailable";

const openMarket: MarketListItem = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  title: "Test market",
  description: "",
  status: "open",
  close_date: "2099-06-15T18:00:00.000Z",
};

const signedOutContext = {
  isSignedIn: false,
  balanceCents: 0,
  position: null,
};

const signedInContext = {
  isSignedIn: true,
  balanceCents: 10000,
  position: null,
};

describe("MarketBuySignIn", () => {
  it("shows sign-in prompt for open markets", () => {
    const html = renderToStaticMarkup(<MarketBuySignIn />);
    expect(html).toContain("Sign in to trade");
    expect(html).toContain('href="/login"');
  });
});

describe("MarketBuyUnavailable", () => {
  it("shows buying unavailable for closed markets", () => {
    const html = renderToStaticMarkup(<MarketBuyUnavailable status="closed" />);
    expect(html).toContain("Buying unavailable");
    expect(html).toContain("closed");
  });
});

describe("MarketBuySection", () => {
  it("shows sign-in when buyable and signed out", () => {
    const html = renderToStaticMarkup(
      <MarketBuySection market={openMarket} buyContext={signedOutContext} />,
    );
    expect(html).toContain("Sign in to trade");
  });

  it("shows buy form when signed in", () => {
    const html = renderToStaticMarkup(
      <MarketBuySection market={openMarket} buyContext={signedInContext} />,
    );
    expect(html).toContain("Buy shares");
    expect(html).toContain("$100.00 fake");
  });

  it("shows buying unavailable for closed markets", () => {
    const html = renderToStaticMarkup(
      <MarketBuySection
        market={{ ...openMarket, status: "closed" }}
        buyContext={signedInContext}
      />,
    );
    expect(html).toContain("Buying unavailable");
    expect(html).not.toContain("Buy shares");
  });
});
