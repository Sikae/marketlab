import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { MarketYesPricePoint } from "@/lib/markets/price-history";
import { MarketYesChart } from "./market-yes-chart";

const points: MarketYesPricePoint[] = [
  { recorded_at: "2026-06-01T12:00:00.000Z", yes_probability: 40 },
  { recorded_at: "2026-06-04T12:00:00.000Z", yes_probability: 62 },
];

describe("MarketYesChart", () => {
  it("renders hero Yes chance, range toggles, and SVG line", () => {
    const html = renderToStaticMarkup(
      <MarketYesChart points={points} currentYesPercent={62} />,
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
