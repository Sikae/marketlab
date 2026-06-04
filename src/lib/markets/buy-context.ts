import type { PositionSummary } from "@/lib/markets/buy-validation";
import { getPositionForMarket } from "@/lib/positions/queries";
import { getCurrentProfile, getCurrentUser } from "@/lib/profile/queries";

export type MarketBuyContext = {
  isSignedIn: boolean;
  balanceCents: number;
  position: PositionSummary | null;
};

export async function loadMarketBuyContext(
  marketId: string,
): Promise<MarketBuyContext> {
  const user = await getCurrentUser();
  if (!user) {
    return { isSignedIn: false, balanceCents: 0, position: null };
  }

  const profile = await getCurrentProfile(user.id);
  const position = await getPositionForMarket(user.id, marketId);

  return {
    isSignedIn: true,
    balanceCents: profile?.balance_cents ?? 0,
    position,
  };
}
