import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { MarketListItem } from "@/lib/markets/types";
import { MarketCard } from "./market-card";

const sampleMarket: MarketListItem = {
  id: "11111111-1111-1111-1111-111111111111",
  title: "Will it rain tomorrow?",
  description: "A fictional weather market for the workshop.",
  status: "open",
  close_date: "2026-06-15T18:00:00.000Z",
};

describe("MarketCard", () => {
  it("renders title, description, status, close date, and details link", () => {
    const html = renderToStaticMarkup(<MarketCard market={sampleMarket} />);

    expect(html).toContain("Will it rain tomorrow?");
    expect(html).toContain("A fictional weather market for the workshop.");
    expect(html).toContain("Open");
    expect(html).toContain("Closes");
    expect(html).toContain("View details");
    expect(html).toContain("/markets/11111111-1111-1111-1111-111111111111");
  });
});
