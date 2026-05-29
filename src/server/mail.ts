import { requireEnv, trimTrailingSlash, type EnvSource } from "./env";
import { bearerHeaders, parseResponse, type FetchLike } from "./http";

export interface MailClientOptions {
  baseUrl?: string;
  apiKey?: string;
  env?: EnvSource;
  fetch?: FetchLike;
}

export interface SendMessageInput {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  headers?: Record<string, string>;
}

export interface SendMessageResult {
  id: string;
  status: string;
  provider_message_id?: string | null;
}

export function createMailClient(options: MailClientOptions = {}) {
  const baseUrl = trimTrailingSlash(options.baseUrl ?? requireEnv("MAIL_BASE_URL", options.env));
  const apiKey = options.apiKey ?? requireEnv("MAIL_API_KEY", options.env);
  const fetchImpl = options.fetch ?? fetch;

  return {
    async sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
      const headers = bearerHeaders(apiKey, { "content-type": "application/json" });
      const response = await fetchImpl(`${baseUrl}/v1/messages`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          to: input.to,
          subject: input.subject,
          text: input.text,
          html: input.html,
          headers: input.headers ?? {}
        })
      });
      return parseResponse<SendMessageResult>(response, "jobbit-mail");
    }
  };
}

export const jobbitMail = createMailClient;
