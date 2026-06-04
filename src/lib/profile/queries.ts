import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ProfileSummary = {
  balance_cents: number;
  first_name: string;
  last_name: string;
};

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile(
  userId: string,
): Promise<ProfileSummary | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("balance_cents, first_name, last_name")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}
