import type { MarketYesPricePoint } from "@/lib/markets/price-history";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getMarketYesPriceHistory(
  marketId: string,
): Promise<MarketYesPricePoint[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("market_yes_prices")
    .select("recorded_at, yes_probability")
    .eq("market_id", marketId)
    .order("recorded_at", { ascending: true });

  if (error) {
    console.error("getMarketYesPriceHistory:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    recorded_at: row.recorded_at,
    yes_probability: row.yes_probability,
  }));
}

export async function getMarketYesProbability(
  marketId: string,
): Promise<number> {
  if (!isSupabaseConfigured) {
    return 50;
  }

  const supabase = await createServerSupabaseClient();
  const { data: latest, error: latestError } = await supabase
    .from("market_yes_prices")
    .select("yes_probability")
    .eq("market_id", marketId)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latestError && latest) {
    return latest.yes_probability;
  }

  const { data: probability, error: rpcError } = await supabase.rpc(
    "market_yes_probability",
    { p_market_id: marketId },
  );

  if (rpcError) {
    console.error("getMarketYesProbability:", rpcError.message);
    return 50;
  }

  return typeof probability === "number" ? probability : 50;
}
