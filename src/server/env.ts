import { JobbitConfigError } from "../shared/errors";

export type EnvSource = Record<string, string | undefined>;

export function readEnv(key: string, env: EnvSource = process.env): string | undefined {
  const value = env[key];
  return value && value.trim() ? value.trim() : undefined;
}

export function requireEnv(key: string, env?: EnvSource): string {
  const value = readEnv(key, env);
  if (!value) {
    throw new JobbitConfigError(`${key} is required. Jobbit managed env was not injected.`);
  }
  return value;
}

export function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}
