import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MarketsEmptyState } from "./markets-empty-state";

describe("MarketsEmptyState", () => {
  it("renders empty state copy", () => {
    const html = renderToStaticMarkup(<MarketsEmptyState />);

    expect(html).toContain("No markets yet");
    expect(html).toContain("fake money");
  });
});
