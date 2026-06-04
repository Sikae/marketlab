"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signUp } from "@/app/actions/auth";
import {
  AuthEmailField,
  AuthMessage,
  AuthNameFields,
  AuthSignUpPasswordField,
  AuthSubmitButton,
} from "@/components/marketlab/auth-form-fields";
import type { AuthActionState } from "@/lib/auth/validation";

const initialState: AuthActionState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <AuthNameFields />
      <AuthEmailField />
      <AuthSignUpPasswordField />
      {state.error ? (
        <AuthMessage variant="error">{state.error}</AuthMessage>
      ) : null}
      {state.status === "confirm_email" ? (
        <AuthMessage variant="success">
          Check your email to confirm your account before signing in.
        </AuthMessage>
      ) : null}
      <AuthSubmitButton pending={pending}>Sign up</AuthSubmitButton>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
