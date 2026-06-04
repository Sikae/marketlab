import { describe, expect, it } from "vitest";
import { parseFakeDollarsToCents } from "./fake-money";

describe("parseFakeDollarsToCents", () => {
  it("parses whole dollars", () => {
    expect(parseFakeDollarsToCents("1")).toEqual({ ok: true, cents: 100 });
    expect(parseFakeDollarsToCents("10")).toEqual({ ok: true, cents: 1000 });
  });

  it("parses one and two decimal places", () => {
    expect(parseFakeDollarsToCents("1.5")).toEqual({ ok: true, cents: 150 });
    expect(parseFakeDollarsToCents("10.00")).toEqual({ ok: true, cents: 1000 });
    expect(parseFakeDollarsToCents("  1.50  ")).toEqual({
      ok: true,
      cents: 150,
    });
  });

  it("rejects empty, zero, and more than two decimal places", () => {
    expect(parseFakeDollarsToCents("")).toMatchObject({ ok: false });
    expect(parseFakeDollarsToCents("0")).toMatchObject({ ok: false });
    expect(parseFakeDollarsToCents("0.00")).toMatchObject({ ok: false });
    expect(parseFakeDollarsToCents("1.234")).toMatchObject({ ok: false });
    expect(parseFakeDollarsToCents("1.001")).toMatchObject({ ok: false });
  });

  it("rejects non-numeric input", () => {
    expect(parseFakeDollarsToCents("abc")).toMatchObject({ ok: false });
    expect(parseFakeDollarsToCents("-1")).toMatchObject({ ok: false });
    expect(parseFakeDollarsToCents("1.")).toMatchObject({ ok: false });
  });
});
