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
    expect(node?.tagName).toBe("DIV");
    expect(node?.dataset.jobbitBadge).toBe("true");
    expect(node?.textContent).toContain("Made by");
    expect(node?.textContent).toContain("jobbit");
    expect(node?.textContent).toContain("Free host expires");
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("loads the official analytics tracker once and queues events", () => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";

    const analytics = initJobbitAnalytics({
      endpoint: "https://analytics.jobbit.uk",
      siteId: "site_1",
      appId: "app_1",
      respectDnt: false
    });
    analytics.track("signup", { plan: "free" });
    initJobbitAnalytics({ endpoint: "https://analytics.jobbit.uk", siteId: "site_1" });

    const scripts = document.querySelectorAll<HTMLScriptElement>('script[data-jobbit-analytics="true"]');
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toBe("https://analytics.jobbit.uk/t.js");
    expect(scripts[0].getAttribute("data-site")).toBe("site_1");
    expect(scripts[0].getAttribute("data-app")).toBe("app_1");
    expect(window.__jobbitAnalyticsQueue).toEqual([["signup", { plan: "free" }]]);
  });
});
