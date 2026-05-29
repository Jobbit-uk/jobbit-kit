import { requireEnv, trimTrailingSlash, type EnvSource } from "./env";
import { bearerHeaders, parseResponse, type FetchLike } from "./http";

export interface AiClientOptions {
  baseUrl?: string;
  apiKey?: string;
  env?: EnvSource;
  fetch?: FetchLike;
}

export type JsonObject = Record<string, unknown>;

export function createAiClient(options: AiClientOptions = {}) {
  const baseUrl = trimTrailingSlash(options.baseUrl ?? requireEnv("OPENAI_BASE_URL", options.env));
  const apiKey = options.apiKey ?? requireEnv("OPENAI_API_KEY", options.env);
  const fetchImpl = options.fetch ?? fetch;

  async function post<T>(path: string, payload: JsonObject): Promise<T> {
    const response = await fetchImpl(`${baseUrl}${path}`, {
      method: "POST",
      headers: bearerHeaders(apiKey, { "content-type": "application/json" }),
      body: JSON.stringify(payload)
    });
    return parseResponse<T>(response, "jobbit-ai-router");
  }

  return {
    baseUrl,
    headers(extra?: HeadersInit): Headers {
      return bearerHeaders(apiKey, extra);
    },
    chatCompletions<T = JsonObject>(payload: JsonObject): Promise<T> {
      return post<T>("/chat/completions", payload);
    },
    imageGenerations<T = JsonObject>(payload: JsonObject): Promise<T> {
      return post<T>("/images/generations", payload);
    },
    audioSpeech<T = ArrayBuffer>(payload: JsonObject): Promise<T> {
      return post<T>("/audio/speech", payload);
    },
    request<T = JsonObject>(path: string, payload: JsonObject): Promise<T> {
      return post<T>(path.startsWith("/") ? path : `/${path}`, payload);
    }
  };
}

export const jobbitAi = createAiClient;
