import type { User } from "@supabase/supabase-js";
import Link from "next/link";

import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  formatFakeBalance,
  formatFakeBalanceAriaLabel,
} from "@/lib/profile/format";
import type { ProfileSummary } from "@/lib/profile/queries";

export function HeaderAuthSignedOut() {
  return (
    <>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login">Sign in</Link>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link href="/signup">Sign up</Link>
      </Button>
    </>
  );
}

export function HeaderAuthSignedIn({
  profile,
}: {
  user: User;
  profile: ProfileSummary | null;
}) {
  return (
    <>
      {profile ? (
        <span
          className="hidden text-sm text-muted-foreground sm:inline"
          role="status"
          aria-label={formatFakeBalanceAriaLabel(profile.balance_cents)}
        >
          {formatFakeBalance(profile.balance_cents)}
        </span>
      ) : (
        <span className="hidden text-sm text-muted-foreground sm:inline">
          Balance unavailable
        </span>
      )}
      <form action={signOut}>
        <Button type="submit" variant="outline" size="sm">
          Sign out
        </Button>
      </form>
    </>
  );
}

export function HeaderAuthView({
  user,
  profile,
}: {
  user: User | null;
  profile: ProfileSummary | null;
}) {
  if (!user) {
    return <HeaderAuthSignedOut />;
  }

  return <HeaderAuthSignedIn user={user} profile={profile} />;
}

export function HeaderAuthFallback() {
  return (
    <span className="text-sm text-muted-foreground" aria-hidden="true">
      …
    </span>
  );
}
