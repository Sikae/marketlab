import { describe, expect, it } from "vitest";

import { getSignUpResult } from "./validation";

describe("getSignUpResult", () => {
  it("returns signed_in when session is present", () => {
    expect(getSignUpResult({ session: {}, user: {} })).toBe("signed_in");
  });

  it("returns confirm_email when user exists without session", () => {
    expect(getSignUpResult({ session: null, user: { id: "1" } })).toEqual({
      status: "confirm_email",
    });
  });

  it("returns error when neither session nor user", () => {
    expect(getSignUpResult({ session: null, user: null })).toEqual({
      error: "Sign up failed. Please try again.",
    });
  });
});
