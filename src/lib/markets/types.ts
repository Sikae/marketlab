import type { Database } from "@/lib/supabase/database.types";

type MarketRow = Database["public"]["Tables"]["markets"]["Row"];

export type MarketListItem = Pick<
  MarketRow,
  "id" | "title" | "description" | "status" | "close_date"
>;

export type MarketStatus = MarketRow["status"];
