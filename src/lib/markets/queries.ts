import type { MarketListItem } from "@/lib/markets/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const MARKET_LIST_COLUMNS =
  "id, title, description, status, close_date" as const;

export async function listMarkets(): Promise<MarketListItem[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("markets")
    .select(MARKET_LIST_COLUMNS)
    .order("close_date", { ascending: true });

  if (error) {
    console.error("listMarkets:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getMarketById(
  id: string,
): Promise<MarketListItem | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("markets")
    .select(MARKET_LIST_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getMarketById:", error.message);
    return null;
  }

  return data;
}
