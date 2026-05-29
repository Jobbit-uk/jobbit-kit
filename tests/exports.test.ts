import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

describe("export boundaries", () => {
  it("browser and react modules do not import server modules", () => {
    for (const file of ["src/browser/index.ts", "src/browser/analytics.ts", "src/browser/badge.ts", "src/react/index.tsx"]) {
      const source = readFileSync(join(root, file), "utf8");
      expect(source).not.toContain("../server");
      expect(source).not.toContain("./server");
    }
  });
});
