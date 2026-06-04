import { PositionsList } from "@/components/marketlab/positions-list";
import { PositionsPageIntro } from "@/components/marketlab/positions-page-intro";
import { PositionsSignIn } from "@/components/marketlab/positions-sign-in";
import { listPositionsForUser } from "@/lib/positions/queries";
import { getCurrentUser } from "@/lib/profile/queries";

export default async function PositionsPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PositionsPageIntro />
      {user ? (
        <PositionsList positions={await listPositionsForUser(user.id)} />
      ) : (
        <PositionsSignIn />
      )}
    </div>
  );
}
