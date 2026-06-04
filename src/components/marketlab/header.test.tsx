import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/markets",
}));

vi.mock("@/components/marketlab/theme-toggle", () => ({
  ThemeToggle: () => <button type="button" aria-label="Switch to dark mode" />,
}));

vi.mock("@/components/marketlab/header-auth", () => ({
  HeaderAuth: () => (
    <div data-slot="header-auth">
      <a href="/login">Sign in</a>
    </div>
  ),
  HeaderAuthFallback: () => <span>…</span>,
}));

import { Header } from "./header";

describe("Header", () => {
  it("renders app name, markets nav, auth slot, and theme toggle", () => {
    const html = renderToStaticMarkup(<Header />);

    expect(html).toContain("MarketLab");
    expect(html).toContain('href="/markets"');
    expect(html).toContain("Markets");
    expect(html).toContain("My Positions");
    expect(html).toContain('href="/positions"');
    expect(html).toContain('aria-label="Switch to dark mode"');
    expect(html).toContain('data-slot="header-auth"');
    expect(html).toContain("Sign in");
  });
});
