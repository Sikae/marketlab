"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  type AuthActionState,
  getSignUpResult,
  signInSchema,
  signUpSchema,
} from "@/lib/auth/validation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function formField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function signIn(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formField(formData, "email"),
    password: formField(formData, "password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid sign-in details.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/markets");
}

export async function signUp(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    email: formField(formData, "email"),
    password: formField(formData, "password"),
    first_name: formField(formData, "first_name"),
    last_name: formField(formData, "last_name"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid sign-up details.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        first_name: parsed.data.first_name,
        last_name: parsed.data.last_name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  const result = getSignUpResult({
    session: data.session,
    user: data.user,
  });

  if (result === "signed_in") {
    revalidatePath("/", "layout");
    redirect("/markets");
  }

  return result;
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/markets");
}
