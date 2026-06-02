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

export function publicEnv(key: string): string | undefined {
  const runtimeEnv = (globalThis as unknown as { process?: { env?: JobbitPublicEnv } }).process?.env;
  const windowEnv = typeof window !== "undefined" ? window.__JOBBIT_ENV__ : undefined;
  return knownBuildEnv[key] ?? runtimeEnv?.[key] ?? windowEnv?.[key];
}
