import { isSupabaseConfigured } from "@/lib/supabase/config";

export function MarketsEmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
      <h2 className="text-lg font-semibold">No markets yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Fictional Yes/No markets will show up here once they are seeded in
        Supabase. Browse and trade with fake money only.
      </p>
      {!isSupabaseConfigured ? (
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Supabase is not configured. Copy{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            .env.example
          </code>{" "}
          to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            .env.local
          </code>{" "}
          and run setup to connect your database.
        </p>
      ) : null}
    </div>
  );
}
