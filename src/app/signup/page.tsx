import { redirect } from "next/navigation";

import { AuthPageCard } from "@/components/marketlab/auth-page-card";
import { SignUpForm } from "@/components/marketlab/sign-up-form";
import { getCurrentUser } from "@/lib/profile/queries";

export default async function SignUpPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/markets");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <AuthPageCard
        title="Sign up"
        description="Create a workshop account. You start with $100.00 fake money."
      >
        <SignUpForm />
      </AuthPageCard>
    </div>
  );
}
