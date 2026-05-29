import { describe, expect, it, vi } from "vitest";
import { createAiClient } from "../src/server/ai";
import { createMailClient } from "../src/server/mail";
import { createOAuthClient } from "../src/server/oauth";
import { createStorageClient } from "../src/server/storage";

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" }
  });
}

type FetchMock = ReturnType<typeof vi.fn> & ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>);

describe("server clients", () => {
  it("sends mail without a from field", async () => {
    const fetch = vi.fn(async () => jsonResponse({ id: "msg_1", status: "sent" })) as FetchMock;
    const client = createMailClient({ baseUrl: "https://mail.jobbit.uk", apiKey: "jbmail_x", fetch });

    await client.sendMessage({ to: "a@example.com", subject: "Hi", text: "Hello" });

    const [, init] = fetch.mock.calls[0];
    const body = JSON.parse(String(init?.body));
    expect(body.from).toBeUndefined();
    expect(body.to).toBe("a@example.com");
    expect(new Headers(init?.headers).get("authorization")).toBe("Bearer jbmail_x");
  });

  it("starts and exchanges oauth login", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ authorization_url: "https://accounts.google.com", state: "s", expires_at: "x", provider: "google" }))
      .mockResolvedValueOnce(jsonResponse({ user: { id: "u", app_id: "a", provider: "google", provider_user_id: "g", email: "a@b.c", email_verified: true }, jwt: "jwt" })) as FetchMock;
    const client = createOAuthClient({ baseUrl: "https://oauth.jobbit.uk", apiKey: "jboauth_x", fetch });

    await client.startLogin({ successUrl: "https://app.test/api/auth/callback" });
    await client.exchangeCode({ code: "code_1" });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(String(fetch.mock.calls[0][0])).toBe("https://oauth.jobbit.uk/v1/login/start");
    expect(String(fetch.mock.calls[1][0])).toBe("https://oauth.jobbit.uk/v1/login/exchange");
  });

  it("uploads files through jobbit-s3 multipart API", async () => {
    const fetch = vi.fn(async () => jsonResponse({ id: "file_1", visibility: "public", metadata: {}, status: "active" })) as FetchMock;
    const client = createStorageClient({ baseUrl: "https://s3.jobbit.uk", apiKey: "jbs3_x", fetch });

    await client.uploadFile({ file: "hello", name: "hello.txt", visibility: "public", metadata: { kind: "test" } });

    expect(String(fetch.mock.calls[0][0])).toBe("https://s3.jobbit.uk/v1/files");
    expect(fetch.mock.calls[0][1]?.body).toBeInstanceOf(FormData);
    expect(new Headers(fetch.mock.calls[0][1]?.headers).get("authorization")).toBe("Bearer jbs3_x");
  });

  it("uses openai-compatible ai-router endpoint", async () => {
    const fetch = vi.fn(async () => jsonResponse({ id: "chatcmpl_1" })) as FetchMock;
    const client = createAiClient({ baseUrl: "https://ai-router.jobbit.uk/v1", apiKey: "jbar_x", fetch });

    await client.chatCompletions({ model: "gpt-4.1-mini", messages: [] });

    expect(String(fetch.mock.calls[0][0])).toBe("https://ai-router.jobbit.uk/v1/chat/completions");
    expect(new Headers(fetch.mock.calls[0][1]?.headers).get("authorization")).toBe("Bearer jbar_x");
  });
});
