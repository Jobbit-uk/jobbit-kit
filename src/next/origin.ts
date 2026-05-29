import { JobbitConfigError } from "../shared/errors";

export interface PublicOriginOptions {
  env?: Record<string, string | undefined>;
  headers?: Headers | Record<string, string | string[] | undefined>;
}

const PUBLIC_ORIGIN_ENV_KEYS = [
  "JOBBIT_PUBLIC_URL",
  "APP_URL",
  "NEXT_PUBLIC_APP_URL",
  "NEXTAUTH_URL",
  "AUTH_URL",
  "SITE_URL",
  "PUBLIC_URL"
] as const;

function headerValue(headers: PublicOriginOptions["headers"], key: string): string | undefined {
  if (!headers) return undefined;
  if (headers instanceof Headers) return headers.get(key) ?? headers.get(key.toLowerCase()) ?? undefined;
  const value = headers[key] ?? headers[key.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function normalizeOrigin(value: string): string {
  let origin: URL;
  try {
    origin = new URL(value);
  } catch {
    throw new JobbitConfigError(`Invalid public origin: ${value}`);
  }
  if (origin.protocol !== "https:" && origin.protocol !== "http:") {
    throw new JobbitConfigError(`Public origin must be http(s): ${value}`);
  }
  if (["localhost", "127.0.0.1", "::1", "[::1]"].includes(origin.hostname)) {
    throw new JobbitConfigError("Public origin cannot be localhost. Set JOBBIT_PUBLIC_URL or APP_URL.");
  }
  return origin.origin;
}

export function getPublicOrigin(options: PublicOriginOptions = {}): string {
  const env = options.env ?? process.env;
  for (const key of PUBLIC_ORIGIN_ENV_KEYS) {
    const value = env[key];
    if (value?.trim()) return normalizeOrigin(value.trim());
  }

  const forwardedHost = headerValue(options.headers, "x-forwarded-host");
  if (forwardedHost) {
    const proto = headerValue(options.headers, "x-forwarded-proto") ?? "https";
    return normalizeOrigin(`${proto}://${forwardedHost.split(",")[0].trim()}`);
  }

  const host = headerValue(options.headers, "host");
  if (host) {
    const proto = headerValue(options.headers, "x-forwarded-proto") ?? "https";
    return normalizeOrigin(`${proto}://${host.split(",")[0].trim()}`);
  }

  throw new JobbitConfigError("No public origin available. Set JOBBIT_PUBLIC_URL or APP_URL.");
}

export function publicUrl(path: string, options: PublicOriginOptions = {}): string {
  const origin = getPublicOrigin(options);
  return new URL(path, `${origin}/`).toString();
}
