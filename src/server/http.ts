import { JobbitApiError } from "../shared/errors";

export type FetchLike = typeof fetch;

export async function parseResponse<T>(response: Response, service: string): Promise<T> {
  const text = await response.text();
  let payload: unknown = undefined;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }
  if (!response.ok) {
    const detail =
      payload && typeof payload === "object" && "detail" in payload
        ? (payload as { detail: unknown }).detail
        : payload;
    throw new JobbitApiError(`${service} request failed with ${response.status}`, response.status, detail);
  }
  return (payload ?? {}) as T;
}

export function bearerHeaders(apiKey: string, extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  headers.set("Authorization", `Bearer ${apiKey}`);
  return headers;
}

export function queryUrl(base: string, params?: Record<string, string | number | boolean | undefined | null>): URL {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}
