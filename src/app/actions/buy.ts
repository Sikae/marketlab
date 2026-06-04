"use server";

import { revalidatePath } from "next/cache";
import { parseFakeDollarsToCents } from "@/lib/fake-money";
import {
  type BuyActionState,
  buyMarketSchema,
  mapBuyRpcError,
} from "@/lib/markets/buy-validation";
import { getCurrentUser } from "@/lib/profile/queries";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function formField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function buyMarket(
  _prevState: BuyActionState,
  formData: FormData,
): Promise<BuyActionState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Sign in to buy shares with fake money." };
  }

  const parsed = buyMarketSchema.safeParse({
    market_id: formField(formData, "market_id"),
    side: formField(formData, "side"),
    amount: formField(formData, "amount"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid buy details.",
    };
  }

  const amountParsed = parseFakeDollarsToCents(parsed.data.amount);
  if (!amountParsed.ok) {
    return { error: amountParsed.error };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("buy_market_shares", {
    p_market_id: parsed.data.market_id,
    p_side: parsed.data.side,
    p_amount_cents: amountParsed.cents,
  });

  if (error) {
    return { error: mapBuyRpcError(error.message) };
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    return { error: "Buy failed. Please try again." };
  }

  revalidatePath(`/markets/${parsed.data.market_id}`);
  revalidatePath("/", "layout");

  return {
    success: {
      balanceCents: Number(row.balance_cents),
      yesSharesCents: Number(row.yes_shares_cents),
      noSharesCents: Number(row.no_shares_cents),
      investedCents: Number(row.invested_cents),
    },
  };
}
