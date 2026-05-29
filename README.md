# @jobbit/kit

TypeScript SDK for Jobbit managed services. Generated apps should use this package instead of hand-rolling service clients, OAuth URLs, upload calls, or analytics snippets.

## Install from Git

```bash
npm install git+ssh://git@gitlab.com:ai-workspace/jobbit-kit.git
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

await mail.sendMessage({
  to: "user@example.com",
  subject: "Verify your email",
  html: `<a href="${verifyUrl}">Verify email</a>`,
  text: `Verify your email: ${verifyUrl}`
});
```

Do not pass `from`. Jobbit Mail resolves the correct sender from managed domain settings.

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
```

## AI Router

```ts
import { createAiClient } from "@jobbit/kit/server/ai";

const ai = createAiClient();

const completion = await ai.chatCompletions({
  model: "gpt-4.1-mini",
  messages: [{ role: "user", content: "Write a short welcome message." }]
});
```

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

initJobbitAnalytics();
mountJobbitBadge();
```

Badge rendering is app-level code. It does not use iframe wrappers, `?jb=1`, or proxy HTML injection.
