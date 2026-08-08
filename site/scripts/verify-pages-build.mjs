import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const expectedBase = process.env.VITE_BASE_PATH || "/";
const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
const assetUrls = [...html.matchAll(/(?:src|href)="([^"]+\.(?:css|js))"/g)].map(
  (match) => match[1],
);

assert.ok(assetUrls.length > 0, "built index must reference CSS or JS assets");

for (const assetUrl of assetUrls) {
  assert.ok(
    assetUrl.startsWith(expectedBase),
    `expected ${assetUrl} to start with GitHub Pages base ${expectedBase}`,
  );
}

console.log(`Verified ${assetUrls.length} asset URLs against base ${expectedBase}`);
