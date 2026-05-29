export interface AnalyticsOptions {
  endpoint?: string;
  siteId?: string;
  appId?: string;
  respectDnt?: boolean;
}

export interface TrackEventOptions {
  name?: string;
  props?: Record<string, unknown>;
}

type QueuedEvent = [string, Record<string, unknown> | undefined];

declare global {
  interface Window {
    jba?: {
      track?: (name: string, props?: Record<string, unknown>) => void;
      setRoute?: (route: string) => void;
    };
    __jobbitAnalyticsQueue?: QueuedEvent[];
  }
}

const SCRIPT_ATTR = "data-jobbit-analytics";

function publicEnv(key: string): string | undefined {
  const direct: Record<string, string | undefined> = {
    NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT:
      typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT : undefined,
    NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID:
      typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID : undefined,
    NEXT_PUBLIC_JOBBIT_APP_ID: typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_APP_ID : undefined
  };
  const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return direct[key] ?? env?.[key];
}

function flushQueue() {
  const queue = window.__jobbitAnalyticsQueue ?? [];
  if (!window.jba?.track || queue.length === 0) return;
  window.__jobbitAnalyticsQueue = [];
  for (const [name, props] of queue) {
    window.jba.track(name, props);
  }
}

function queueOrTrack(name: string, props?: Record<string, unknown>) {
  if (window.jba?.track) {
    window.jba.track(name, props);
    return;
  }
  window.__jobbitAnalyticsQueue = window.__jobbitAnalyticsQueue ?? [];
  window.__jobbitAnalyticsQueue.push([name, props]);
}

export function initJobbitAnalytics(options: AnalyticsOptions = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { track: () => undefined, pageview: () => undefined, setRoute: () => undefined };
  }

  const endpoint = (options.endpoint ?? publicEnv("NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT"))?.replace(/\/+$/, "");
  const siteId = options.siteId ?? publicEnv("NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID");
  const appId = options.appId ?? publicEnv("NEXT_PUBLIC_JOBBIT_APP_ID");
  if (!endpoint || !siteId) {
    return { track: () => undefined, pageview: () => undefined, setRoute: () => undefined };
  }

  let script = document.querySelector<HTMLScriptElement>(`script[${SCRIPT_ATTR}="true"]`);
  if (!script) {
    script = document.createElement("script");
    script.defer = true;
    script.src = `${endpoint}/t.js`;
    script.setAttribute(SCRIPT_ATTR, "true");
    script.setAttribute("data-site", siteId);
    script.setAttribute("data-endpoint", `${endpoint}/c`);
    if (appId) script.setAttribute("data-app", appId);
    if (options.respectDnt === false) script.setAttribute("data-respect-dnt", "false");
    script.addEventListener("load", flushQueue, { once: true });
    document.head.appendChild(script);
  } else {
    flushQueue();
  }

  function track(event: string | TrackEventOptions, props?: Record<string, unknown>) {
    if (typeof event === "string") {
      queueOrTrack(event, props);
    } else if (event.name) {
      queueOrTrack(event.name, event.props);
    }
  }

  function pageview() {
    track("pageview");
  }

  function setRoute(route: string) {
    if (window.jba?.setRoute) {
      window.jba.setRoute(route);
    }
  }

  return { track, pageview, setRoute };
}
