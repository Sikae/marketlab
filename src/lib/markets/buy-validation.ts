import { z } from "zod";

export type PositionSummary = {
  yesSharesCents: number;
  noSharesCents: number;
  investedCents: number;
};

export type BuySuccessState = {
  balanceCents: number;
  yesSharesCents: number;
  noSharesCents: number;
  investedCents: number;
  yesProbability: number;
};

export type BuyActionState = {
  error?: string;
  success?: BuySuccessState;
};

export const buySideSchema = z.enum(["yes", "no"], {
  error: "Choose Yes or No.",
});

export const buyMarketSchema = z.object({
  market_id: z.uuid("Invalid market."),
  side: buySideSchema,
  amount: z.string().trim().min(1, "Enter a fake dollar amount."),
});

export function mapBuyRpcError(message: string): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("not_authenticated") ||
    normalized.includes("sign in")
  ) {
    return "Sign in to buy shares with fake money.";
  }
  if (normalized.includes("insufficient_balance")) {
    return "You do not have enough fake balance for this buy.";
  }
  if (normalized.includes("market_not_buyable")) {
    return "This market is not open for fake-money trades.";
  }
  if (normalized.includes("market_not_found")) {
    return "This market was not found.";
  }
  if (normalized.includes("invalid_amount")) {
    return "Enter a positive fake dollar amount.";
  }
  if (normalized.includes("invalid_side")) {
    return "Choose Yes or No.";
  }
  if (normalized.includes("profile_not_found")) {
    return "Your profile was not found. Try signing out and back in.";
  }

  return "Buy failed. Please try again.";
}
