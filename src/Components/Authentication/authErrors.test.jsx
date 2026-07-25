import { describe, expect, it } from "vitest";
import { getAuthErrorMessage } from "./authErrors";

describe("getAuthErrorMessage", () => {
  it("returns friendly mapped messages for known Firebase errors", () => {
    expect(
      getAuthErrorMessage({ code: "auth/invalid-credential" })
    ).toBe("Invalid email or password.");
  });

  it("falls back to the original error message when the code is unknown", () => {
    expect(
      getAuthErrorMessage({
        code: "auth/custom-error",
        message: "Custom auth issue.",
      })
    ).toBe("Custom auth issue.");
  });

  it("returns the fallback when no error exists", () => {
    expect(getAuthErrorMessage(null, "Try again later.")).toBe(
      "Try again later."
    );
  });
});
