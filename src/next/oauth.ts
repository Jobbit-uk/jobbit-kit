import { createOAuthClient, type ExchangeCodeResult } from "../server/oauth";
import { getPublicOrigin, publicUrl } from "./origin";

export interface OAuthStartHandlerOptions {
  provider?: "google" | string;
  successPath?: string;
  cancelPath?: string;
  redirect?: boolean;
}

export function createOAuthStartHandler(options: OAuthStartHandlerOptions = {}) {
  return async function start(request: Request): Promise<Response> {
    const origin = getPublicOrigin({ headers: request.headers });
    const successUrl = publicUrl(options.successPath ?? "/api/auth/oauth/callback", {
      env: {
        JOBBIT_PUBLIC_URL: origin
      }
    });
    const cancelUrl = options.cancelPath
      ? publicUrl(options.cancelPath, { env: { JOBBIT_PUBLIC_URL: origin } })
      : undefined;
    const result = await createOAuthClient().startLogin({
      provider: options.provider ?? "google",
      successUrl,
      cancelUrl
    });
    if (options.redirect === false) {
      return Response.json(result);
    }
    return Response.redirect(result.authorization_url, 303);
  };
}

export async function exchangeOAuthCallback(request: Request): Promise<ExchangeCodeResult> {
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  if (error) throw new Error(`OAuth failed: ${error}`);
  const code = url.searchParams.get("code");
  if (!code) throw new Error("OAuth callback is missing code");
  return createOAuthClient().exchangeCode({ code });
}
