import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarketsList } from "@/components/marketlab/markets-list";
import { MarketsPageIntro } from "@/components/marketlab/markets-page-intro";

describe("Markets page UI", () => {
  it("renders intro without hero or template images", () => {
    const html = renderToStaticMarkup(
      <>
        <MarketsPageIntro />
        <MarketsList markets={[]} />
      </>,
    );

    expect(html).toContain("Browse fictional Yes/No markets using fake money.");
    expect(html).not.toContain("quito.png");
    expect(html).not.toContain("hero2-bg.webp");
    expect(html).not.toContain("Cursor Quito");
  });
});
