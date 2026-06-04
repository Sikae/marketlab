import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/markets",
}));

vi.mock("@/components/marketlab/theme-toggle", () => ({
  ThemeToggle: () => <button type="button" aria-label="Switch to dark mode" />,
}));

import { Header } from "./header";

describe("Header", () => {
  it("renders app name, markets nav, and theme toggle", () => {
    const html = renderToStaticMarkup(<Header />);

    expect(html).toContain("MarketLab");
    expect(html).toContain('href="/markets"');
    expect(html).toContain("Markets");
    expect(html).toContain('aria-label="Switch to dark mode"');
    expect(html).toContain('data-slot="header-auth"');
  });
});
