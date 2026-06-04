import type { ReactNode } from "react";

export function AuthPageCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {children}
      </section>
    </div>
  );
}
