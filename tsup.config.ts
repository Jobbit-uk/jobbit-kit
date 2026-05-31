import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
      "server/mail": "src/server/mail.ts",
      "server/oauth": "src/server/oauth.ts",
      "server/storage": "src/server/storage.ts",
      "server/ai": "src/server/ai.ts",
      next: "src/next/index.ts",
      browser: "src/browser/index.ts",
      react: "src/react/index.tsx"
    },
    dts: true,
    format: ["esm"],
    clean: true,
    sourcemap: true,
    splitting: false,
    external: ["react", "react/jsx-runtime"]
  },
  {
    entry: {
      "jobbit-kit.browser": "src/browser/global.ts"
    },
    dts: false,
    format: ["iife"],
    globalName: "JobbitKit",
    clean: false,
    sourcemap: true,
    splitting: false,
    minify: true,
    platform: "browser"
  }
]);
