import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const formPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "market-buy-form.tsx",
);

const forbidden = ["@/lib/supabase/server", "next/headers", "cookies()"];

describe("market-buy-form import boundary", () => {
  it("does not import server-only modules", () => {
    const source = readFileSync(formPath, "utf8");
    for (const pattern of forbidden) {
      expect(source).not.toContain(pattern);
    }
  });
});
