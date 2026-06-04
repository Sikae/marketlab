"use client";

import { useActionState, useEffect, useRef } from "react";

import { buyMarket } from "@/app/actions/buy";
import {
  BuyAmountField,
  BuyMessage,
  BuySideField,
  BuySubmitButton,
} from "@/components/marketlab/market-buy-form-fields";
import { formatFakeBalance, formatFakeShares } from "@/lib/fake-money";
import type {
  BuyActionState,
  BuySuccessState,
  PositionSummary,
} from "@/lib/markets/buy-validation";

const initialState: BuyActionState = {};

function displayPosition(
  position: PositionSummary | null,
  success: BuyActionState["success"],
): PositionSummary {
  if (success) {
    return {
      yesSharesCents: success.yesSharesCents,
      noSharesCents: success.noSharesCents,
      investedCents: success.investedCents,
    };
  }
  return (
    position ?? {
      yesSharesCents: 0,
      noSharesCents: 0,
      investedCents: 0,
    }
  );
}

export function MarketBuyForm({
  marketId,
  balanceCents,
  position,
  onBuySuccess,
}: {
  marketId: string;
  balanceCents: number;
  position: PositionSummary | null;
  onBuySuccess?: (success: BuySuccessState) => void;
}) {
  const [state, formAction, pending] = useActionState(buyMarket, initialState);
  const lastSuccessRef = useRef<BuySuccessState | undefined>(undefined);

  useEffect(() => {
    if (!state.success || state.success === lastSuccessRef.current) {
      return;
    }
    lastSuccessRef.current = state.success;
    onBuySuccess?.(state.success);
  }, [state.success, onBuySuccess]);

  const balance = state.success?.balanceCents ?? balanceCents;
  const currentPosition = displayPosition(position, state.success);

  return (
    <section
      aria-label="Buy"
      className="rounded-xl border border-border bg-card p-5 text-sm"
    >
      <h2 className="font-semibold">Buy</h2>
      <p className="mt-2 text-muted-foreground">
        Choose Yes or No and enter fake workshop dollars. This is practice money
        only.
      </p>

      <dl className="mt-4 grid gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Available balance</dt>
          <dd className="font-medium tabular-nums" role="status">
            {formatFakeBalance(balance)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Your Yes shares</dt>
          <dd className="font-medium tabular-nums">
            {formatFakeShares(currentPosition.yesSharesCents)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Your No shares</dt>
          <dd className="font-medium tabular-nums">
            {formatFakeShares(currentPosition.noSharesCents)}
          </dd>
        </div>
      </dl>

      <form action={formAction} className="mt-4 flex flex-col gap-4">
        <input type="hidden" name="market_id" value={marketId} />
        <BuySideField defaultSide="yes" />
        <BuyAmountField />
        {state.error ? (
          <BuyMessage variant="error">{state.error}</BuyMessage>
        ) : null}
        {state.success ? (
          <BuyMessage variant="success">
            Buy complete. Your fake balance and position are updated above.
          </BuyMessage>
        ) : null}
        <BuySubmitButton pending={pending} />
      </form>
    </section>
  );
}
