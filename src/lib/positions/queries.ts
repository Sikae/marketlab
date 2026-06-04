import type { PositionSummary } from "@/lib/markets/buy-validation";
import type { MarketListItem } from "@/lib/markets/types";
import type { PositionWithMarket } from "@/lib/positions/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const POSITION_LIST_SELECT = `
  id,
  market_id,
  yes_shares_cents,
  no_shares_cents,
  invested_cents,
  markets ( id, title, status, close_date )
` as const;

type EmbeddedMarket = Pick<
  MarketListItem,
  "id" | "title" | "status" | "close_date"
>;

function normalizeEmbeddedMarket(
  market: EmbeddedMarket | EmbeddedMarket[] | null,
): EmbeddedMarket | null {
  if (!market) {
    return null;
  }
  return Array.isArray(market) ? (market[0] ?? null) : market;
}

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

/** Owner-scoped via RLS; userId must come from server auth, not the client. */
export async function listPositionsForUser(
  userId: string,
): Promise<PositionWithMarket[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("positions")
    .select(POSITION_LIST_SELECT)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("listPositionsForUser:", error.message);
    return [];
  }

  const positions: PositionWithMarket[] = [];

  for (const row of data ?? []) {
    const market = normalizeEmbeddedMarket(row.markets);
    if (!market) {
      console.error(
        "listPositionsForUser: missing market for position",
        row.id,
      );
      continue;
    }

    positions.push({
      positionId: row.id,
      marketId: row.market_id,
      yesSharesCents: row.yes_shares_cents,
      noSharesCents: row.no_shares_cents,
      investedCents: row.invested_cents,
      market: {
        id: market.id,
        title: market.title,
        status: market.status,
        close_date: market.close_date,
      },
    });
  }

  return positions;
}
