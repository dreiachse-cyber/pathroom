import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

test("the packaged scale report exactly matches the public release report", async () => {
  const publicReport = JSON.parse(
    await readFile(
      fileURLToPath(new URL("../public/catalog-scale-report.json", import.meta.url)),
      "utf8",
    ),
  );
  const packagedReport = JSON.parse(
    await readFile(
      fileURLToPath(new URL("../dist/client/catalog-scale-report.json", import.meta.url)),
      "utf8",
    ),
  );
  assert.deepEqual(packagedReport, publicReport);
});
