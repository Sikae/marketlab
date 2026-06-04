import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthFieldGroup({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

export function AuthEmailField({ defaultValue }: { defaultValue?: string }) {
  return (
    <AuthFieldGroup id="email" label="Email">
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        defaultValue={defaultValue}
      />
    </AuthFieldGroup>
  );
}

export function AuthPasswordField() {
  return (
    <AuthFieldGroup id="password" label="Password">
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        minLength={6}
      />
    </AuthFieldGroup>
  );
}

export function AuthSignUpPasswordField() {
  return (
    <AuthFieldGroup id="password" label="Password">
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
      />
    </AuthFieldGroup>
  );
}

export function AuthNameFields() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AuthFieldGroup id="first_name" label="First name">
        <Input
          id="first_name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
      </AuthFieldGroup>
      <AuthFieldGroup id="last_name" label="Last name">
        <Input
          id="last_name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
      </AuthFieldGroup>
    </div>
  );
}

export function AuthSubmitButton({
  children,
  pending,
}: {
  children: ReactNode;
  pending?: boolean;
}) {
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {children}
    </Button>
  );
}

export function AuthMessage({
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
