import { requireEnv, trimTrailingSlash, type EnvSource } from "./env";
import { bearerHeaders, parseResponse, type FetchLike } from "./http";

export interface OAuthClientOptions {
  baseUrl?: string;
  apiKey?: string;
  env?: EnvSource;
  fetch?: FetchLike;
}

export interface StartLoginInput {
  provider?: "google" | string;
  successUrl: string;
  cancelUrl?: string;
}

export interface StartLoginResult {
  provider: string;
  authorization_url: string;
  state: string;
  expires_at: string;
}

export interface ExchangeCodeInput {
  code: string;
}

export interface ExchangeCodeResult {
  user: {
    id: string;
    app_id: string;
    provider: string;
    provider_user_id: string;
    email: string;
    email_verified: boolean;
    name?: string | null;
    avatar_url?: string | null;
  };
  jwt: string;
}

export function createOAuthClient(options: OAuthClientOptions = {}) {
  const baseUrl = trimTrailingSlash(options.baseUrl ?? requireEnv("JBOAUTH_BASE_URL", options.env));
  const apiKey = options.apiKey ?? requireEnv("JBOAUTH_API_KEY", options.env);
  const fetchImpl = options.fetch ?? fetch;

  return {
    async startLogin(input: StartLoginInput): Promise<StartLoginResult> {
      const response = await fetchImpl(`${baseUrl}/v1/login/start`, {
        method: "POST",
        headers: bearerHeaders(apiKey, { "content-type": "application/json" }),
        body: JSON.stringify({
          provider: input.provider ?? "google",
          success_url: input.successUrl,
          cancel_url: input.cancelUrl
        })
      });
      return parseResponse<StartLoginResult>(response, "jobbit-oauth");
    },

    async exchangeCode(input: ExchangeCodeInput): Promise<ExchangeCodeResult> {
      const response = await fetchImpl(`${baseUrl}/v1/login/exchange`, {
        method: "POST",
        headers: bearerHeaders(apiKey, { "content-type": "application/json" }),
        body: JSON.stringify({ code: input.code })
      });
      return parseResponse<ExchangeCodeResult>(response, "jobbit-oauth");
    }
  };
}

export const jobbitOAuth = createOAuthClient;
