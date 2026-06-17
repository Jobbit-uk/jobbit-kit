import { beforeEach, describe, expect, it } from "vitest";
import { initJobbitAnalytics, mountJobbitBadge, shouldShowJobbitBadge } from "../src/browser";
import { __resetJobbitRuntimeEnvForTests } from "../src/browser/env";

const OriginalXMLHttpRequest = window.XMLHttpRequest;

class EmptyRuntimeEnvXMLHttpRequest {
  status = 404;
  responseText = "";

  open() {
    // no-op
  }

  send() {
    // no-op
  }
}

describe("browser helpers", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    delete window.__JOBBIT_ENV__;
    delete window.__jobbitAnalyticsQueue;
    delete window.jba;
    delete document.documentElement.dataset.jobbitBadgeDismissed;
    __resetJobbitRuntimeEnvForTests();
    window.XMLHttpRequest = EmptyRuntimeEnvXMLHttpRequest as unknown as typeof XMLHttpRequest;
  });

  it("shows badge only for enabled free apps", () => {
    expect(shouldShowJobbitBadge({ enabled: true, tier: "free" })).toBe(true);
    expect(shouldShowJobbitBadge({ enabled: true, tier: "starter" })).toBe(false);
    expect(shouldShowJobbitBadge({ enabled: false, tier: "free" })).toBe(false);
  });

  it("mounts a badge without iframe or wrapper tricks", () => {
    const node = mountJobbitBadge({ enabled: true, tier: "free", appUrl: "https://jobbit.uk" });
    expect(node?.tagName).toBe("DIV");
    expect(node?.dataset.jobbitBadge).toBe("true");
    expect(node?.textContent).toContain("Hosted by");
    expect(node?.textContent).toContain("Free host expires");
    expect(node?.querySelector<HTMLElement>(".jb-logo")?.getAttribute("aria-label")).toBe("Jobbit");
    expect(node?.querySelector<HTMLElement>(".jb-wordmark")).toBeNull();
    expect(node?.querySelector<HTMLAnchorElement>(".jb-upgrade")?.textContent).toContain("Upgrade");
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("floats without mutating fixed app headers", () => {
    const header = document.createElement("header");
    header.style.position = "fixed";
    header.style.top = "0px";
    document.body.appendChild(header);

    const node = mountJobbitBadge({ enabled: true, tier: "free" });

    expect(node?.dataset.jobbitBadge).toBe("true");
    expect(document.documentElement.dataset.jobbitBadgeMounted).toBeUndefined();
    expect(document.body.dataset.jobbitBadgeMounted).toBeUndefined();
    expect(document.documentElement.style.getPropertyValue("--jobbit-badge-offset")).toBe("");
    expect(header.dataset.jobbitOffsetTop).toBeUndefined();
  });

  it("opens details and hides for the current session", () => {
    const node = mountJobbitBadge({ enabled: true, tier: "free" });
    const chip = node?.querySelector<HTMLButtonElement>(".jb-chip");
    const dismiss = node?.querySelector<HTMLButtonElement>(".jb-dismiss");

    chip?.click();
    expect(node?.dataset.open).toBe("true");
    expect(chip?.getAttribute("aria-expanded")).toBe("true");

    dismiss?.click();
    expect(document.querySelector("[data-jobbit-badge]")).toBeNull();
    expect(mountJobbitBadge({ enabled: true, tier: "free" })).toBeNull();
  });

  it("loads the official analytics tracker once and queues events", () => {
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

  it("reads browser env from window.__JOBBIT_ENV__ for plain HTML apps", () => {
    window.__JOBBIT_ENV__ = {
      NEXT_PUBLIC_JOBBIT_BADGE_ENABLED: "true",
      NEXT_PUBLIC_JOBBIT_APP_TIER: "free",
      NEXT_PUBLIC_JOBBIT_APP_ID: "app_static",
      NEXT_PUBLIC_JOBBIT_UPGRADE_URL: "https://wrong.example/plans",
      NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT: "https://analytics.jobbit.uk",
      NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID: "site_static"
    };

    expect(shouldShowJobbitBadge()).toBe(true);
    const badge = mountJobbitBadge();
    const analytics = initJobbitAnalytics();
    analytics.pageview();

    expect(badge?.dataset.jobbitBadge).toBe("true");
    expect(badge?.querySelector<HTMLAnchorElement>(".jb-upgrade")?.href).toBe(
      "https://jobbit.uk/deploys/app_static/plans"
    );
    expect(document.querySelector<HTMLScriptElement>('script[data-jobbit-analytics="true"]')?.src).toBe(
      "https://analytics.jobbit.uk/t.js"
    );
    expect(window.__jobbitAnalyticsQueue).toEqual([["pageview", undefined]]);
  });

  it("loads browser env from the JBC runtime env endpoint", () => {
    class MockXMLHttpRequest {
      status = 200;
      responseText = JSON.stringify({
        NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT: "https://analytics.jobbit.uk",
        NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID: "site_runtime",
        NEXT_PUBLIC_JOBBIT_APP_ID: "app_runtime"
      });
      requestedUrl = "";

      open(_method: string, url: string) {
        this.requestedUrl = url;
      }

      send() {
        expect(this.requestedUrl).toBe("/__jobbit/env.json");
      }
    }

    window.XMLHttpRequest = MockXMLHttpRequest as unknown as typeof XMLHttpRequest;
    try {
      const analytics = initJobbitAnalytics();
      analytics.pageview();

      const script = document.querySelector<HTMLScriptElement>('script[data-jobbit-analytics="true"]');
      expect(script?.src).toBe("https://analytics.jobbit.uk/t.js");
      expect(script?.getAttribute("data-site")).toBe("site_runtime");
      expect(script?.getAttribute("data-app")).toBe("app_runtime");
      expect(window.__JOBBIT_ENV__?.NEXT_PUBLIC_JOBBIT_APP_ID).toBe("app_runtime");
      expect(window.__jobbitAnalyticsQueue).toEqual([["pageview", undefined]]);
    } finally {
      window.XMLHttpRequest = OriginalXMLHttpRequest;
    }
  });
});
