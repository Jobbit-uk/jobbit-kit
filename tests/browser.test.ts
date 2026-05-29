import { describe, expect, it, vi } from "vitest";
import { initJobbitAnalytics, mountJobbitBadge, shouldShowJobbitBadge } from "../src/browser";

describe("browser helpers", () => {
  it("shows badge only for enabled free apps", () => {
    expect(shouldShowJobbitBadge({ enabled: true, tier: "free" })).toBe(true);
    expect(shouldShowJobbitBadge({ enabled: true, tier: "starter" })).toBe(false);
    expect(shouldShowJobbitBadge({ enabled: false, tier: "free" })).toBe(false);
  });

  it("mounts a badge without iframe or wrapper tricks", () => {
    document.body.innerHTML = "";
    const node = mountJobbitBadge({ enabled: true, tier: "free", appUrl: "https://jobbit.uk" });
    expect(node?.tagName).toBe("A");
    expect(node?.dataset.jobbitBadge).toBe("true");
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("sends analytics pageview to /c", () => {
    const fetch = vi.fn(async () => new Response("{}", { status: 202 })) as ReturnType<typeof vi.fn> &
      ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>);
    vi.stubGlobal("fetch", fetch);
    Object.defineProperty(window.navigator, "sendBeacon", {
      value: undefined,
      configurable: true
    });

    initJobbitAnalytics({
      endpoint: "https://analytics.jobbit.uk",
      siteId: "site_1",
      appId: "app_1",
      respectDnt: false
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(String(fetch.mock.calls[0]?.[0])).toBe("https://analytics.jobbit.uk/c");
  });
});
