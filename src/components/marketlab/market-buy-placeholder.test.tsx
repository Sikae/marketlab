import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarketBuyPlaceholder } from "./market-buy-placeholder";

describe("MarketBuyPlaceholder", () => {
  it("shows sign-in placeholder for open markets", () => {
    const html = renderToStaticMarkup(<MarketBuyPlaceholder status="open" />);

    expect(html).toContain("Sign in to trade");
    expect(html).not.toContain("Buying unavailable");
  });

  it("shows buying unavailable for closed markets", () => {
    const html = renderToStaticMarkup(<MarketBuyPlaceholder status="closed" />);

    expect(html).toContain("Buying unavailable");
    expect(html).toContain("closed");
    expect(html).not.toContain("Sign in to trade");
  });
});
