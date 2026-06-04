import { describe, expect, it } from "vitest";

import { formatCloseDate, formatMarketStatus } from "./format";

describe("formatMarketStatus", () => {
  it("maps known statuses to readable labels", () => {
    expect(formatMarketStatus("open")).toBe("Open");
    expect(formatMarketStatus("closed")).toBe("Closed");
    expect(formatMarketStatus("resolved_yes")).toBe("Resolved Yes");
    expect(formatMarketStatus("resolved_no")).toBe("Resolved No");
  });

  it("returns unknown status as-is", () => {
    expect(formatMarketStatus("pending")).toBe("pending");
  });
});

describe("formatCloseDate", () => {
  it("formats a valid ISO date", () => {
    const formatted = formatCloseDate("2026-06-15T18:00:00.000Z");
    expect(formatted).toMatch(/Jun/);
    expect(formatted).toMatch(/2026/);
  });

  it("returns the input when the date is invalid", () => {
    expect(formatCloseDate("not-a-date")).toBe("not-a-date");
  });
});
