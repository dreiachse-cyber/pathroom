import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import { createServer } from "vite";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const outputPath = fileURLToPath(
  new URL("../public/catalog-scale-report.json", import.meta.url),
);
const packagedOutputPath = fileURLToPath(
  new URL("../dist/client/catalog-scale-report.json", import.meta.url),
);
const reservationPath = fileURLToPath(
  new URL("../public/reserved-slugs.json", import.meta.url),
);
const samples = 500;
const server = await createServer({
  root: siteRoot,
  configFile: false,
  server: { middlewareMode: true, hmr: false },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
});

try {
  const { catalog } = await server.ssrLoadModule("/src/catalog.jsx");
  const { filterCatalog } = await server.ssrLoadModule("/src/search.js");
  const reservations = JSON.parse(await readFile(reservationPath, "utf8"));
  const publishedSlugs = catalog.map((item) => item.slug);
  const retiredSlugs = reservations.retired ?? [];
  const plannedSlugs = reservations.planned ?? [];
  const allReservedSlugs = [...publishedSlugs, ...retiredSlugs, ...plannedSlugs];
  if (new Set(allReservedSlugs).size !== allReservedSlugs.length) {
    throw new Error("Published, retired, and planned slug reservations must be unique");
  }
  const categoryCounts = Object.fromEntries(
    [...new Set(catalog.map((item) => item.category))]
      .sort()
      .map((category) => [
        category,
        catalog.filter((item) => item.category === category).length,
      ]),
  );
  const originalsCategoryCounts = Object.fromEntries(
    Object.keys(categoryCounts).map((category) => [
      category,
      catalog.filter(
        (item) =>
          item.category === category &&
          item.collection === "pathroom-originals",
      ).length,
    ]),
  );
  const batchCounts = Object.fromEntries(
    [...new Set(catalog.map((item) => item.batch).filter(Boolean))]
      .sort()
      .map((batch) => [
        batch,
        catalog.filter((item) => item.batch === batch).length,
      ]),
  );
  const queries = ["file", "人物", "message", "time", "originals"];
  const timings = [];
  for (let index = 0; index < samples; index += 1) {
    const start = performance.now();
    filterCatalog(catalog, { query: queries[index % queries.length] });
    timings.push(performance.now() - start);
  }
  timings.sort((a, b) => a - b);

  const assetFiles = await readFile(
    fileURLToPath(new URL("../dist/client/index.html", import.meta.url)),
    "utf8",
  ).catch(() => "");
  const jsMatch = assetFiles.match(/src="[^"]*\/assets\/([^"]+\.js)"/);
  const jsBytes = jsMatch
    ? await readFile(
        fileURLToPath(
          new URL(`../dist/client/assets/${jsMatch[1]}`, import.meta.url),
        ),
      ).catch(() => null)
    : null;
  if (!jsBytes) {
    throw new Error("Run a production build before generating the scale report");
  }

  const report = {
    schemaVersion: 1,
    release: "Batch 011",
    catalog: {
      total: catalog.length,
      tabler: catalog.filter((item) => item.collection === "tabler").length,
      originals: catalog.filter(
        (item) => item.collection === "pathroom-originals",
      ).length,
      categoryCounts,
      originalsCategoryCounts,
      batchCounts,
      catalogOrderDigest: createHash("sha256")
        .update(catalog.map((item) => item.slug).join("\n"))
        .digest("hex"),
      reservedSlugs: {
        published: publishedSlugs,
        retired: retiredSlugs,
        planned: plannedSlugs,
      },
    },
    searchBenchmark: {
      samples,
      catalogSize: catalog.length,
      medianMilliseconds: Number(timings[Math.floor(samples / 2)].toFixed(4)),
      maximumMilliseconds: Number(timings.at(-1).toFixed(4)),
    },
    productionBundle: jsBytes
      ? {
          javascriptBytes: jsBytes.length,
          javascriptGzipBytes: gzipSync(jsBytes).length,
        }
      : null,
  };

  const serializedReport = `${JSON.stringify(report, null, 2)}\n`;
  await writeFile(outputPath, serializedReport, "utf8");
  await writeFile(packagedOutputPath, serializedReport, "utf8");
  console.log(
    `Wrote catalog scale report: ${report.catalog.total} icons, median search ${report.searchBenchmark.medianMilliseconds} ms`,
  );
} finally {
  await server.close();
}
