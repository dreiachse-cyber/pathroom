import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const publicRoot = fileURLToPath(new URL("../public/", import.meta.url));

test("the machine-readable Batch 011 scale report matches release limits", async () => {
  const report = JSON.parse(
    await readFile(`${publicRoot}/catalog-scale-report.json`, "utf8"),
  );
  assert.equal(report.schemaVersion, 1);
  assert.equal(report.release, "Batch 011");
  assert.deepEqual(
    [report.catalog.total, report.catalog.tabler, report.catalog.originals],
    [464, 120, 344],
  );
  assert.equal(report.catalog.catalogOrderDigest, "c522bc80a0ee75e7d2fb90253e4aa31b618b7aa06428f4f6fc2c80d9825fa4a9");
  assert.equal(report.catalog.reservedSlugs.published.length, 464);
  assert.deepEqual(report.catalog.reservedSlugs.retired, []);
  assert.deepEqual(report.catalog.reservedSlugs.planned, []);
  assert.ok(report.searchBenchmark.medianMilliseconds < 100);
  assert.ok(report.productionBundle.javascriptGzipBytes <= 150_000);

});

test("the durable retired and planned slug ledger has a stable schema", async () => {
  const ledger = JSON.parse(
    await readFile(`${publicRoot}/reserved-slugs.json`, "utf8"),
  );
  assert.equal(ledger.schemaVersion, 1);
  assert.ok(Array.isArray(ledger.retired));
  assert.ok(Array.isArray(ledger.planned));
});
