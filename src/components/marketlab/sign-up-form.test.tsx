import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useActionState: () => [
      { status: "confirm_email" as const },
      vi.fn(),
      false,
    ],
  };
});

vi.mock("@/app/actions/auth", () => ({
  signUp: vi.fn(),
}));

import { SignUpForm } from "./sign-up-form";

describe("SignUpForm", () => {
  it("shows check your email state after signup without session", () => {
    const html = renderToStaticMarkup(<SignUpForm />);

    expect(html).toContain("Check your email");
    expect(html).toContain("confirm your account");
  });
});
