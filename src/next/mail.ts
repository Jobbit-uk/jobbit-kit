import { publicUrl, type PublicOriginOptions } from "./origin";

export function createEmailActionUrl(path: string, options: PublicOriginOptions = {}): string {
  return publicUrl(path, options);
}

export function createEmailVerificationUrl(token: string, options: PublicOriginOptions = {}): string {
  const url = new URL(createEmailActionUrl("/verify", options));
  url.searchParams.set("token", token);
  return url.toString();
}

export function createPasswordResetUrl(token: string, options: PublicOriginOptions = {}): string {
  const url = new URL(createEmailActionUrl("/reset-password", options));
  url.searchParams.set("token", token);
  return url.toString();
}
