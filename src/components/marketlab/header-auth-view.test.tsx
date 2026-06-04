import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  HeaderAuthSignedIn,
  HeaderAuthSignedOut,
  HeaderAuthView,
} from "./header-auth-view";

const mockUser = {
  id: "user-1",
  email: "trader@example.com",
} as import("@supabase/supabase-js").User;

describe("HeaderAuthSignedOut", () => {
  it("shows sign-in and sign-up actions", () => {
    const html = renderToStaticMarkup(<HeaderAuthSignedOut />);

    expect(html).toContain('href="/login"');
    expect(html).toContain('href="/signup"');
    expect(html).toContain("Sign in");
    expect(html).toContain("Sign up");
    expect(html).not.toContain("Sign out");
    expect(html).not.toContain("fake");
  });
});

describe("HeaderAuthSignedIn", () => {
  it("shows fake balance and sign-out", () => {
    const html = renderToStaticMarkup(
      <HeaderAuthSignedIn
        user={mockUser}
        profile={{
          balance_cents: 10000,
          first_name: "Ada",
          last_name: "Lovelace",
        }}
      />,
    );

    expect(html).toContain("$100.00 fake");
    expect(html).toContain("10000 fake cents");
    expect(html).toContain("Sign out");
    expect(html).not.toContain('href="/login"');
    expect(html).not.toContain('href="/signup"');
  });

  it("handles missing profile state", () => {
    const html = renderToStaticMarkup(
      <HeaderAuthSignedIn user={mockUser} profile={null} />,
    );

    expect(html).toContain("Balance unavailable");
    expect(html).toContain("Sign out");
    expect(html).not.toContain("fake");
  });
});

describe("HeaderAuthView", () => {
  it("renders signed-out state without balance", () => {
    const html = renderToStaticMarkup(
      <HeaderAuthView user={null} profile={null} />,
    );

    expect(html).toContain("Sign in");
    expect(html).not.toContain("Sign out");
  });

  it("renders signed-in state with balance", () => {
    const html = renderToStaticMarkup(
      <HeaderAuthView
        user={mockUser}
        profile={{
          balance_cents: 500,
          first_name: "Test",
          last_name: "User",
        }}
      />,
    );

    expect(html).toContain("$5.00 fake");
    expect(html).toContain("Sign out");
    expect(html).not.toContain("Sign up");
  });
});
