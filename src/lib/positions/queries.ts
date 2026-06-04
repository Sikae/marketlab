import type { PositionSummary } from "@/lib/markets/buy-validation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function toPositionSummary(row: {
  yes_shares_cents: number;
  no_shares_cents: number;
  invested_cents: number;
}): PositionSummary {
  return {
    yesSharesCents: row.yes_shares_cents,
    noSharesCents: row.no_shares_cents,
    investedCents: row.invested_cents,
  };
}

export async function getPositionForMarket(
  userId: string,
  marketId: string,
): Promise<PositionSummary | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("positions")
    .select("yes_shares_cents, no_shares_cents, invested_cents")
    .eq("user_id", userId)
    .eq("market_id", marketId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return toPositionSummary(data);
}
