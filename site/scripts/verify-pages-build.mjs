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

const steamPromoFiles = [
  "floating-01-snow-keyart-v2-1600x320.png",
  "floating-02-crimson-blade-v2-1600x320.png",
  "floating-03-yokai-night-v2-1600x320.png",
];

for (const fileName of steamPromoFiles) {
  await readFile(
    new URL(
      `../dist/client/promos/youtou-pixel/${fileName}`,
      import.meta.url,
    ),
  );
}

console.log(
  `Verified ${assetUrls.length} asset URLs against base ${expectedBase} and ${steamPromoFiles.length} Steam promotion images`,
);
