import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  buildMockYesHistory,
  WORKSHOP_CURRENT_YES_PERCENT,
  WORKSHOP_MARKET_ID,
} from "@/lib/markets/price-history";
import { MarketYesChart } from "./market-yes-chart";

describe("MarketYesChart", () => {
  const points = buildMockYesHistory(WORKSHOP_MARKET_ID);

  it("renders hero Yes chance, range toggles, and SVG line", () => {
    const html = renderToStaticMarkup(
      <MarketYesChart
        points={points}
        currentYesPercent={WORKSHOP_CURRENT_YES_PERCENT}
      />,
    );

    expect(html).toContain("62%");
    expect(html).toContain("Chance of Yes");
    expect(html).toContain("1D");
    expect(html).toContain("1W");
    expect(html).toContain("ALL");
    expect(html).toContain("<svg");
    expect(html).toContain("stroke-primary");
  });
});
