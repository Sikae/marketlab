import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { MarketListItem } from "@/lib/markets/types";
import { MarketsList } from "./markets-list";

const sampleMarket: MarketListItem = {
  id: "11111111-1111-1111-1111-111111111111",
  title: "Sample market",
  description: "Description",
  status: "open",
  close_date: "2026-06-15T18:00:00.000Z",
};

describe("MarketsList", () => {
  it("renders a list of market cards", () => {
    const html = renderToStaticMarkup(
      <MarketsList
        markets={[
          sampleMarket,
          {
            ...sampleMarket,
            id: "22222222-2222-2222-2222-222222222222",
            title: "Second",
          },
        ]}
      />,
    );

    expect(html).toContain("Sample market");
    expect(html).toContain("Second");
    expect(html).not.toContain("No markets yet");
  });

  it("renders empty state when there are no markets", () => {
    const html = renderToStaticMarkup(<MarketsList markets={[]} />);

    expect(html).toContain("No markets yet");
  });
});
