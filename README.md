# @jobbit/kit

TypeScript SDK for Jobbit managed services. Generated apps should use this package instead of hand-rolling service clients, OAuth URLs, upload calls, or analytics snippets.

## Install from Git

```bash
npm install git+https://github.com/Jobbit-uk/jobbit-kit.git
```

## Managed Env

JBC injects service credentials at preview/deploy time:

```env
JOBBIT_PUBLIC_URL=https://my-app.apps.jobbit.uk
APP_URL=https://my-app.apps.jobbit.uk
NEXT_PUBLIC_APP_URL=https://my-app.apps.jobbit.uk

OPENAI_BASE_URL=https://ai-router.jobbit.uk/v1
OPENAI_API_KEY=managed

JBOAUTH_BASE_URL=https://oauth.jobbit.uk
JBOAUTH_API_KEY=managed

MAIL_BASE_URL=https://mail.jobbit.uk
MAIL_API_KEY=managed

JBS3_BASE_URL=https://s3.jobbit.uk
JBS3_API_KEY=managed

NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT=https://analytics.jobbit.uk
NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID=site_xxx
NEXT_PUBLIC_JOBBIT_APP_ID=app_xxx
NEXT_PUBLIC_JOBBIT_APP_TIER=free

NEXT_PUBLIC_JOBBIT_BADGE_ENABLED=true
NEXT_PUBLIC_JOBBIT_BADGE_VARIANT=free-host
NEXT_PUBLIC_JOBBIT_APP_URL=https://my-app.apps.jobbit.uk
NEXT_PUBLIC_JOBBIT_FREE_HOST_EXPIRES_AT=2026-06-05T12:00:00Z
```

Never expose server keys to browser code. Browser modules only use `NEXT_PUBLIC_*`.

## Next.js OAuth

```ts
// app/api/auth/oauth/login/route.ts
import { createOAuthStartHandler } from "@jobbit/kit/next";

export const GET = createOAuthStartHandler({
  successPath: "/api/auth/oauth/callback",
  cancelPath: "/login"
});
```

```ts
// app/api/auth/oauth/callback/route.ts
import { exchangeOAuthCallback } from "@jobbit/kit/next";

export async function GET(request: Request) {
  const { user, jwt } = await exchangeOAuthCallback(request);
  // Create your app session cookie here.
  return Response.redirect(new URL("/dashboard", request.url));
}
```

`@jobbit/kit/next` never uses localhost as the source of truth for public URLs. Set `JOBBIT_PUBLIC_URL` or let JBC provide forwarded headers.

## Mail

```ts
import { createMailClient } from "@jobbit/kit/server/mail";
import { createEmailVerificationUrl } from "@jobbit/kit/next";

const mail = createMailClient();
const verifyUrl = createEmailVerificationUrl("token_123");

const sent = await mail.sendMessage({
  to: "user@example.com",
  subject: "Verify your email",
  html: `<a href="${verifyUrl}">Verify email</a>`,
  text: `Verify your email: ${verifyUrl}`
});

const status = await mail.getMessage(sent.id);
```

By default, Jobbit Kit sends the managed `MAIL_FROM` value injected by JBC. Pass `from` only when you need to override the managed sender for a verified app domain.

## Storage

Upload files from a backend route so `JBS3_API_KEY` never reaches the browser.

```ts
// app/api/upload/route.ts
import { uploadRequestFile } from "@jobbit/kit/next";

export async function POST(request: Request) {
  const file = await uploadRequestFile(request, { visibility: "public" });
  return Response.json(file);
}
```

```ts
import { createStorageClient } from "@jobbit/kit/server/storage";

const storage = createStorageClient();
const files = await storage.listFiles({ visibility: "public" });
const usage = await storage.getUsage();
```

## AI Router

```ts
import { createAiClient } from "@jobbit/kit/server/ai";

const ai = createAiClient();

const completion = await ai.chatCompletions({
  model: "gpt-4.1-mini",
  messages: [{ role: "user", content: "Write a short welcome message." }]
});

const imageModels = await ai.listImageModels();

const image = await ai.imageGenerations({
  model: imageModels.data[0]?.id,
  prompt: "a clean product icon"
});

const voices = await ai.listAudioVoices({ model: "openai/gpt-4o-mini-tts" });

const wav = await ai.audioSpeech({
  model: "openai/gpt-4o-mini-tts",
  input: "Welcome to Jobbit.",
  voice: String(voices.voices[0] ?? "alloy"),
  response_format: "wav"
});

const transcript = await ai.audioTranscriptions({
  model: "openai/whisper-1",
  input_audio: { data: "base64-audio", format: "wav" }
});
```

Discovery helpers are available for capability-aware apps:

```ts
await ai.listModels({ output: "text" });
await ai.listAudioModels({ kind: "tts" });
await ai.listAudioModels({ kind: "stt" });
await ai.listAudioVoices({ model: "openai/gpt-4o-mini-tts" });
await ai.listImageModels();
```

For non-standard OpenAI-compatible routes, use `ai.get()`, `ai.post()`, or `ai.raw()` instead of hand-rolling headers.

## Analytics and Badge

```tsx
import { JobbitAnalytics, JobbitBadge } from "@jobbit/kit/react";

export function Providers() {
  return (
    <>
      <JobbitAnalytics />
      <JobbitBadge />
    </>
  );
}
```

For plain browser apps:

```ts
import { initJobbitAnalytics, mountJobbitBadge } from "@jobbit/kit/browser";

const analytics = initJobbitAnalytics();
analytics.track("signup_started", { source: "hero" });
mountJobbitBadge();
```

For plain HTML/static apps without a bundler, include the global browser bundle and expose the same public env on `window.__JOBBIT_ENV__`:

```html
<script>
  window.__JOBBIT_ENV__ = {
    NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT: "https://analytics.jobbit.uk",
    NEXT_PUBLIC_JOBBIT_ANALYTICS_SITE_ID: "site_xxx",
    NEXT_PUBLIC_JOBBIT_APP_ID: "app_xxx",
    NEXT_PUBLIC_JOBBIT_APP_TIER: "free",
    NEXT_PUBLIC_JOBBIT_BADGE_ENABLED: "true",
    NEXT_PUBLIC_JOBBIT_FREE_HOST_EXPIRES_AT: "2026-06-05T12:00:00Z"
  };
</script>
<script src="/jobbit-kit.browser.global.js"></script>
<script>
  const jobbit = JobbitKit.init();
  jobbit.analytics?.track("app_loaded", { source: "static_html" });
</script>
```

You can also auto-start it:

```html
<script>
  window.JobbitKitConfig = { autoInit: true };
</script>
<script src="/jobbit-kit.browser.global.js"></script>
```

Analytics loads the official tracker script from `NEXT_PUBLIC_JOBBIT_ANALYTICS_ENDPOINT + "/t.js"` and buffers custom `track()` calls until it is ready.

The `free-host` badge is a top app banner styled like the old Jobbit proxy banner: Jobbit wordmark, free-host expiry copy, upgrade pills, and CTA. It only renders when `NEXT_PUBLIC_JOBBIT_BADGE_ENABLED=true` and `NEXT_PUBLIC_JOBBIT_APP_TIER=free`.
