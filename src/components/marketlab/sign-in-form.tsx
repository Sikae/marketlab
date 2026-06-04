"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signIn } from "@/app/actions/auth";
import {
  AuthEmailField,
  AuthMessage,
  AuthPasswordField,
  AuthSubmitButton,
} from "@/components/marketlab/auth-form-fields";
import type { AuthActionState } from "@/lib/auth/validation";

const initialState: AuthActionState = {};

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <AuthEmailField />
      <AuthPasswordField />
      {state.error ? (
        <AuthMessage variant="error">{state.error}</AuthMessage>
      ) : null}
      <AuthSubmitButton pending={pending}>Sign in</AuthSubmitButton>
      <p className="text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link
          href="/signup"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
