import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function BuyMessage({
  variant,
  children,
}: {
  variant: "error" | "success";
  children: ReactNode;
}) {
  const className =
    variant === "error"
      ? "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
      : "rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground";

  return (
    <p role={variant === "error" ? "alert" : "status"} className={className}>
      {children}
    </p>
  );
}

export function BuySideField({ defaultSide }: { defaultSide: "yes" | "no" }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium">Side</legend>
      <div className="grid grid-cols-2 gap-2">
        {(["yes", "no"] as const).map((side) => (
          <label
            key={side}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-lg border border-input px-3 py-2 text-sm font-medium capitalize transition-colors has-checked:border-ring has-checked:bg-muted",
            )}
          >
            <input
              type="radio"
              name="side"
              value={side}
              defaultChecked={defaultSide === side}
              className="sr-only"
              required
            />
            {side}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function BuyAmountField({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="amount">Fake dollars</Label>
      <Input
        id="amount"
        name="amount"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder="e.g. 1.50"
        required
        defaultValue={defaultValue}
        aria-describedby="amount-hint"
      />
      <p id="amount-hint" className="text-xs text-muted-foreground">
        Up to two decimal places. 1 fake dollar = 100 fake cents.
      </p>
    </div>
  );
}

export function BuySubmitButton({ pending }: { pending?: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Buying…" : "Buy shares"}
    </Button>
  );
}
