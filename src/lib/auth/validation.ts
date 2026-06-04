import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const signUpSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(100, "First name is too long."),
  last_name: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(100, "Last name is too long."),
});

export type AuthActionState = {
  error?: string;
  status?: "confirm_email";
};

export function getSignUpResult(data: {
  session: unknown;
  user: unknown;
}): AuthActionState | "signed_in" {
  if (data.session) {
    return "signed_in";
  }
  if (data.user) {
    return { status: "confirm_email" };
  }
  return { error: "Sign up failed. Please try again." };
}
