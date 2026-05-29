export interface BadgeOptions {
  enabled?: boolean;
  tier?: string;
  appUrl?: string;
  mount?: HTMLElement;
}

function publicEnv(key: string): string | undefined {
  const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.[key];
}

function isEnabled(value?: string): boolean {
  return value === "1" || value === "true" || value === "yes";
}

export function shouldShowJobbitBadge(options: BadgeOptions = {}): boolean {
  const enabled = options.enabled ?? isEnabled(publicEnv("NEXT_PUBLIC_JOBBIT_BADGE_ENABLED"));
  const tier = options.tier ?? publicEnv("NEXT_PUBLIC_JOBBIT_APP_TIER") ?? "free";
  return Boolean(enabled && tier === "free");
}

export function mountJobbitBadge(options: BadgeOptions = {}): HTMLElement | null {
  if (typeof document === "undefined" || !shouldShowJobbitBadge(options)) return null;
  const root = options.mount ?? document.body;
  const existing = document.querySelector<HTMLElement>("[data-jobbit-badge]");
  if (existing) return existing;

  const link = document.createElement("a");
  link.dataset.jobbitBadge = "true";
  link.href = options.appUrl ?? publicEnv("NEXT_PUBLIC_JOBBIT_APP_URL") ?? "https://jobbit.uk";
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Made with Jobbit";
  Object.assign(link.style, {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    zIndex: "2147483647",
    padding: "10px 13px",
    borderRadius: "999px",
    background: "rgba(17,17,17,0.92)",
    color: "#fff",
    font: "600 13px/1.1 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    textDecoration: "none",
    boxShadow: "0 10px 30px rgba(0,0,0,0.24)",
    border: "1px solid rgba(255,255,255,0.14)"
  } satisfies Partial<CSSStyleDeclaration>);
  root.appendChild(link);
  return link;
}
