import { redirect } from "next/navigation";

import { AuthPageCard } from "@/components/marketlab/auth-page-card";
import { SignInForm } from "@/components/marketlab/sign-in-form";
import { getCurrentUser } from "@/lib/profile/queries";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/markets");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <AuthPageCard
        title="Sign in"
        description="Use your workshop account to trade with fake money."
      >
        <SignInForm />
      </AuthPageCard>
    </div>
  );
}
