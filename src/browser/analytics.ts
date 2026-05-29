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

const SESSION_KEY = "jba_s";
const VISITOR_KEY = "jba_v";
const SESSION_TTL = 30 * 60 * 1000;

function publicEnv(key: string): string | undefined {
  const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.[key];
}

function randomId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
}

function storageGet(key: string): string | undefined {
  try {
    return localStorage.getItem(key) ?? undefined;
  } catch {
    return undefined;
  }
}

function storageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignored
  }
}

function getVisitorId(): string {
  const existing = storageGet(VISITOR_KEY);
  if (existing) return existing;
  const id = randomId();
  storageSet(VISITOR_KEY, id);
  return id;
}

function getSessionId(): string {
  const raw = storageGet(SESSION_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { id: string; t: number };
      if (Date.now() - parsed.t < SESSION_TTL) {
        storageSet(SESSION_KEY, JSON.stringify({ id: parsed.id, t: Date.now() }));
        return parsed.id;
      }
    } catch {
      // ignored
    }
  }
  const id = randomId();
  storageSet(SESSION_KEY, JSON.stringify({ id, t: Date.now() }));
  return id;
}

function timezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    return "";
  }
}

export function initJobbitAnalytics(options: AnalyticsOptions = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { track: () => undefined, pageview: () => undefined };
  }

  const endpoint = options.endpoint ?? publicEnv("NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT");
  const siteId = options.siteId ?? publicEnv("NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID");
  const appId = options.appId ?? publicEnv("NEXT_PUBLIC_JOBBIT_APP_ID");
  if (!endpoint || !siteId) {
    return { track: () => undefined, pageview: () => undefined };
  }
  const windowDnt = (window as Window & { doNotTrack?: string }).doNotTrack;
  if (options.respectDnt !== false && (navigator.doNotTrack === "1" || windowDnt === "1")) {
    return { track: () => undefined, pageview: () => undefined };
  }

  const collectUrl = `${endpoint.replace(/\/+$/, "")}/c`;

  function send(type: string, extra: Record<string, unknown> = {}) {
    const params = new URLSearchParams(location.search);
    const body = {
      site_id: siteId,
      app_id: appId,
      session_id: getSessionId(),
      visitor_id: getVisitorId(),
      url: location.href,
      path: location.pathname,
      referrer: document.referrer,
      title: document.title,
      language: navigator.language,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      timezone: timezone(),
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_term: params.get("utm_term") ?? "",
      utm_content: params.get("utm_content") ?? "",
      type,
      ...extra
    };
    const json = JSON.stringify(body);
    if (navigator.sendBeacon) {
      const ok = navigator.sendBeacon(collectUrl, new Blob([json], { type: "application/json" }));
      if (ok) return;
    }
    void fetch(collectUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: json,
      keepalive: true,
      credentials: "omit"
    }).catch(() => undefined);
  }

  function pageview() {
    send("pageview");
  }

  function track(event: string | TrackEventOptions, props?: Record<string, unknown>) {
    if (typeof event === "string") {
      send("event", { event_name: event, props: props ?? null });
    } else if (event.name) {
      send("event", { event_name: event.name, props: event.props ?? null });
    }
  }

  pageview();
  return { track, pageview };
}
