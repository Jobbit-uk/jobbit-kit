import { requireEnv, trimTrailingSlash, type EnvSource } from "./env";
import { bearerHeaders, parseResponse, queryUrl, type FetchLike } from "./http";

export interface AiClientOptions {
  baseUrl?: string;
  apiKey?: string;
  env?: EnvSource;
  fetch?: FetchLike;
}

export type JsonObject = Record<string, unknown>;
export type AiModelOutput = "text" | "image" | "audio" | "speech" | "transcription" | string;
export type AiModelInput = "text" | "image" | "audio" | "file" | "video" | string;
export type AudioModelKind = "tts" | "stt";

export interface AiModelInfo {
  id: string;
  name?: string;
  description?: string;
  context_length?: number | null;
  input_modalities?: string[];
  output_modalities?: string[];
  pricing?: Record<string, string | number | null | undefined>;
  audio?: Record<string, unknown>;
}

export interface AiModelListResult {
  data: AiModelInfo[];
}

export interface AudioVoicesResult {
  model: string;
  voices: unknown[];
  formats: string[];
  pcm?: Record<string, unknown> | null;
  languages?: string[] | null;
  supports_speed?: boolean;
  hint?: string;
}

export interface AudioSpeechOptions {
  response?: "auto" | "json" | "arrayBuffer" | "response";
}

export function createAiClient(options: AiClientOptions = {}) {
  const baseUrl = trimTrailingSlash(options.baseUrl ?? requireEnv("OPENAI_BASE_URL", options.env));
  const apiKey = options.apiKey ?? requireEnv("OPENAI_API_KEY", options.env);
  const fetchImpl = options.fetch ?? fetch;

  function pathUrl(path: string): string {
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  }

  async function rawRequest(path: string, init: RequestInit = {}): Promise<Response> {
    return fetchImpl(pathUrl(path), init);
  }

  async function get<T>(path: string, params?: Record<string, string | number | boolean | undefined | null>): Promise<T> {
    const response = await fetchImpl(queryUrl(pathUrl(path), params), {
      headers: bearerHeaders(apiKey)
    });
    return parseResponse<T>(response, "jobbit-ai-router");
  }

  async function post<T>(path: string, payload: JsonObject): Promise<T> {
    const response = await rawRequest(path, {
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
    async audioSpeech<T = ArrayBuffer | JsonObject>(payload: JsonObject, speechOptions: AudioSpeechOptions = {}): Promise<T> {
      const response = await rawRequest("/audio/speech", {
        method: "POST",
        headers: bearerHeaders(apiKey, { "content-type": "application/json" }),
        body: JSON.stringify(payload)
      });
      const mode = speechOptions.response ?? (payload.store ? "json" : "arrayBuffer");
      if (mode === "response") {
        if (!response.ok) await parseResponse(response, "jobbit-ai-router");
        return response as T;
      }
      if (mode === "json") {
        return parseResponse<T>(response, "jobbit-ai-router");
      }
      if (!response.ok) {
        await parseResponse(response, "jobbit-ai-router");
      }
      return response.arrayBuffer() as Promise<T>;
    },
    audioTranscriptions<T = JsonObject>(payload: JsonObject): Promise<T> {
      return post<T>("/audio/transcriptions", payload);
    },
    listModels(params: { output?: AiModelOutput; input?: AiModelInput } = {}): Promise<AiModelListResult> {
      return get<AiModelListResult>("/models", params);
    },
    listAudioModels(params: { kind?: AudioModelKind } = {}): Promise<AiModelListResult> {
      return get<AiModelListResult>("/audio/models", params);
    },
    listAudioVoices(params: { model: string }): Promise<AudioVoicesResult> {
      return get<AudioVoicesResult>("/audio/voices", params);
    },
    listImageModels(): Promise<AiModelListResult> {
      return get<AiModelListResult>("/images/models");
    },
    get,
    post,
    raw(path: string, init: RequestInit = {}): Promise<Response> {
      return rawRequest(path, {
        ...init,
        headers: bearerHeaders(apiKey, init.headers)
      });
    },
    request<T = JsonObject>(path: string, payload: JsonObject): Promise<T> {
      return post<T>(path, payload);
    }
  };
}

export const jobbitAi = createAiClient;
