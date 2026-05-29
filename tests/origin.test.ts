import { describe, expect, it } from "vitest";
import { getPublicOrigin, publicUrl } from "../src/next";

describe("public origin", () => {
  it("uses managed public env first", () => {
    expect(getPublicOrigin({ env: { JOBBIT_PUBLIC_URL: "https://demo.apps.jobbit.uk" } })).toBe(
      "https://demo.apps.jobbit.uk"
    );
  });

  it("uses forwarded headers when env is not present", () => {
    expect(
      getPublicOrigin({
        env: {},
        headers: {
          "x-forwarded-host": "preview.jobbit.uk",
          "x-forwarded-proto": "https"
        }
      })
    ).toBe("https://preview.jobbit.uk");
  });

  it("rejects localhost as a public origin", () => {
    expect(() => getPublicOrigin({ env: { APP_URL: "http://localhost:3000" } })).toThrow(/localhost/);
  });

  it("builds absolute URLs from public origin", () => {
    expect(publicUrl("/verify?token=abc", { env: { APP_URL: "https://app.example.com" } })).toBe(
      "https://app.example.com/verify?token=abc"
    );
  });
});
