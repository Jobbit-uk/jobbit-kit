export type JobbitPublicEnv = Record<string, string | undefined>;

const knownBuildEnv: JobbitPublicEnv = {
  NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT:
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT : undefined,
  NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID:
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID : undefined,
  NEXT_PUBLIC_JOBBIT_APP_ID: typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_APP_ID : undefined,
  NEXT_PUBLIC_JOBBIT_BADGE_ENABLED:
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_BADGE_ENABLED : undefined,
  NEXT_PUBLIC_JOBBIT_APP_TIER:
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_APP_TIER : undefined,
  NEXT_PUBLIC_JOBBIT_APP_URL: typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_APP_URL : undefined,
  NEXT_PUBLIC_JOBBIT_BADGE_VARIANT:
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_BADGE_VARIANT : undefined,
  NEXT_PUBLIC_JOBBIT_FREE_HOST_EXPIRES_AT:
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOBBIT_FREE_HOST_EXPIRES_AT : undefined
};

declare global {
  interface Window {
    __JOBBIT_ENV__?: JobbitPublicEnv;
  }
}

let triedRuntimeEnvLoad = false;

function loadRuntimeWindowEnv(): JobbitPublicEnv | undefined {
  if (typeof window === "undefined") return undefined;
  if (window.__JOBBIT_ENV__) return window.__JOBBIT_ENV__;
  if (triedRuntimeEnvLoad || typeof XMLHttpRequest === "undefined") return undefined;

  triedRuntimeEnvLoad = true;
  try {
    const request = new XMLHttpRequest();
    request.open("GET", "/__jobbit/env.json", false);
    request.send(null);
    if (request.status >= 200 && request.status < 300 && request.responseText) {
      window.__JOBBIT_ENV__ = JSON.parse(request.responseText) as JobbitPublicEnv;
    }
  } catch {
    // Runtime env is best-effort; build-time env remains a fallback.
  }
  return window.__JOBBIT_ENV__;
}

export function __resetJobbitRuntimeEnvForTests() {
  triedRuntimeEnvLoad = false;
}

export function publicEnv(key: string): string | undefined {
  const runtimeEnv = (globalThis as unknown as { process?: { env?: JobbitPublicEnv } }).process?.env;
  const windowEnv = loadRuntimeWindowEnv();
  return windowEnv?.[key] ?? knownBuildEnv[key] ?? runtimeEnv?.[key];
}
