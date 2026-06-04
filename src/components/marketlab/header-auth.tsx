import {
  HeaderAuthFallback,
  HeaderAuthView,
} from "@/components/marketlab/header-auth-view";
import { getCurrentProfile, getCurrentUser } from "@/lib/profile/queries";

export { HeaderAuthFallback };

export async function HeaderAuth() {
  const user = await getCurrentUser();
  const profile = user ? await getCurrentProfile(user.id) : null;

  return (
    <div className="flex items-center gap-2" data-slot="header-auth">
      <HeaderAuthView user={user} profile={profile} />
    </div>
  );
}
