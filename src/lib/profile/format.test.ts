import { describe, expect, it } from "vitest";

import { formatFakeBalance, formatFakeBalanceAriaLabel } from "./format";

describe("formatFakeBalance", () => {
  it("formats cents as fake dollars", () => {
    expect(formatFakeBalance(10000)).toBe("$100.00 fake");
    expect(formatFakeBalance(0)).toBe("$0.00 fake");
    expect(formatFakeBalance(125)).toBe("$1.25 fake");
  });
});

describe("formatFakeBalanceAriaLabel", () => {
  it("includes cents and formatted balance", () => {
    expect(formatFakeBalanceAriaLabel(10000)).toBe(
      "10000 fake cents ($100.00 fake)",
    );
  });
});
