export {
  formatFakeBalance,
  formatFakeBalanceAriaLabel,
} from "@/lib/profile/format";

export type ParseFakeDollarsResult =
  | { ok: true; cents: number }
  | { ok: false; error: string };

const DOLLAR_INPUT_PATTERN = /^\d+(\.\d{1,2})?$/;

/**
 * Parse a fake-dollar string into integer cents without floating-point math.
 */
export function parseFakeDollarsToCents(input: string): ParseFakeDollarsResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Enter a fake dollar amount." };
  }

  if (!DOLLAR_INPUT_PATTERN.test(trimmed)) {
    return {
      ok: false,
      error: "Use a number with at most two decimal places (e.g. 1 or 1.50).",
    };
  }

  const [wholePart, fractionalPart = ""] = trimmed.split(".");
  const whole = Number.parseInt(wholePart, 10);

  if (!Number.isFinite(whole) || whole < 0) {
    return { ok: false, error: "Enter a valid fake dollar amount." };
  }

  let fractionalCents = 0;
  if (fractionalPart.length === 1) {
    fractionalCents = Number.parseInt(fractionalPart, 10) * 10;
  } else if (fractionalPart.length === 2) {
    fractionalCents = Number.parseInt(fractionalPart, 10);
  }

  const cents = whole * 100 + fractionalCents;

  if (cents <= 0) {
    return { ok: false, error: "Amount must be greater than zero." };
  }

  return { ok: true, cents };
}

/** Format share cents as fake dollars for display (same rules as balance). */
export function formatFakeShares(sharesCents: number): string {
  const dollars = sharesCents / 100;
  return `$${dollars.toFixed(2)} fake`;
}
