import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/theme-provider", () => ({
  useTheme: () => ({
    theme: "system",
    resolvedTheme: "light" as const,
    setTheme: vi.fn(),
  }),
}));

import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  it("renders a theme toggle button", () => {
    const html = renderToStaticMarkup(<ThemeToggle />);

    expect(html).toContain('type="button"');
    expect(html).toContain("Switch to dark mode");
  });
});
