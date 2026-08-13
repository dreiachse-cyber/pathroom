import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import {
  ICON_VISUAL_QA_ALGORITHM,
  ICON_VISUAL_QA_RASTER_SIZE,
  ICON_VISUAL_QA_SCHEMA_VERSION,
  ICON_VISUAL_QA_SIZES,
  ICON_VISUAL_QA_THRESHOLDS,
  ICON_VISUAL_QA_TRANSFORMS,
  assertSafeRecursiveRemovalPath,
  buildApprovalDigest,
  buildRasterRecord,
  buildRenderDigest,
  buildReviewTemplate,
  compareRasterRecords,
  pairKey,
  rgbaToInkAlpha,
  resolvePathInside,
  validateReview,
} from "./icon-visual-qa-lib.mjs";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const artifactRoot = path.resolve(siteRoot, "artifacts", "icon-qa");
const reviewRoot = path.resolve(siteRoot, "icon-qa", "reviews");
const rendererIdentity = "@resvg/resvg-wasm@2.6.2";
const options = parseArguments(process.argv.slice(2));
const outputDirectory = resolveOutputDirectory(options.outputDirectory);
const reviewPath = resolveReviewPath(options.reviewPath);
let viteServer;

try {
  await initializeRenderer();
  viteServer = await createServer({
    root: siteRoot,
    configFile: false,
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { noDiscovery: true },
    appType: "custom",
  });

  const { catalog } = await viteServer.ssrLoadModule("/src/catalog.jsx");
  const targets = catalog.filter(
    (item) => item.collection === "pathroom-originals" && item.batch === options.batch,
  );
  const baseline = catalog.filter((item) => !targets.includes(item));

  assert.equal(
    targets.length,
    options.expectedNew,
    `Batch ${options.batch} must contain ${options.expectedNew} icons`,
  );
  assert.equal(
    baseline.length,
    options.expectedBaseline,
    `Batch ${options.batch} comparison baseline must contain ${options.expectedBaseline} icons`,
  );
  assert.equal(
    catalog.length,
    options.expectedNew + options.expectedBaseline,
    "visual QA target and baseline must cover the complete catalog",
  );

  const metricRenders = new Map();
  const rasterRecords = new Map();
  for (const item of catalog) {
    const rendered = renderItem(item, ICON_VISUAL_QA_RASTER_SIZE);
    metricRenders.set(item.slug, rendered);
    rasterRecords.set(
      item.slug,
      buildRasterRecord(item, rendered.alpha, ICON_VISUAL_QA_RASTER_SIZE),
    );
  }

  const comparisonsByTarget = new Map();
  const flags = new Map();
  for (const target of targets) {
    const targetRecord = rasterRecords.get(target.slug);
    const comparisons = baseline.map((candidate) => {
      const comparison = compareRasterRecords(
        targetRecord,
        rasterRecords.get(candidate.slug),
      );
      if (comparison.reasons.length > 0) {
        addFlag(flags, target, candidate, comparison);
      }
      return comparison;
    });
    comparisons.sort(compareByRank);
    comparisonsByTarget.set(target.slug, comparisons);
  }

  for (let firstIndex = 0; firstIndex < targets.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < targets.length; secondIndex += 1) {
      const first = targets[firstIndex];
      const second = targets[secondIndex];
      const comparison = compareRasterRecords(
        rasterRecords.get(first.slug),
        rasterRecords.get(second.slug),
      );
      if (comparison.reasons.length > 0) addFlag(flags, first, second, comparison);
    }
  }
  const sortedFlags = [...flags.values()].sort(compareFlags);

  const itemsBySlug = new Map(catalog.map((item) => [item.slug, item]));
  const artifactItems = new Map();
  for (const target of targets) {
    artifactItems.set(target.slug, target);
    for (const neighbor of comparisonsByTarget.get(target.slug).slice(0, 3)) {
      artifactItems.set(neighbor.candidateSlug, itemsBySlug.get(neighbor.candidateSlug));
    }
  }
  for (const flag of sortedFlags) {
    artifactItems.set(flag.firstSlug, itemsBySlug.get(flag.firstSlug));
    artifactItems.set(flag.secondSlug, itemsBySlug.get(flag.secondSlug));
  }

  const artifactRenders = new Map();
  for (const item of artifactItems.values()) {
    const renders = {};
    for (const size of ICON_VISUAL_QA_SIZES) {
      renders[size] = size === ICON_VISUAL_QA_RASTER_SIZE
        ? metricRenders.get(item.slug)
        : renderItem(item, size);
    }
    artifactRenders.set(item.slug, renders);
  }

  const reviewedSlugs = new Set();
  for (const target of targets) {
    reviewedSlugs.add(target.slug);
    for (const neighbor of comparisonsByTarget.get(target.slug).slice(0, 3)) {
      reviewedSlugs.add(neighbor.candidateSlug);
    }
  }
  for (const flag of sortedFlags) {
    reviewedSlugs.add(flag.firstSlug);
    reviewedSlugs.add(flag.secondSlug);
  }
  const reviewedRenders = [...reviewedSlugs].map((slug) => ({
    slug,
    renders: artifactRenders.get(slug),
  }));
  const renderDigest = buildRenderDigest(reviewedRenders);
  const report = buildReport({
    catalog,
    targets,
    baseline,
    comparisonsByTarget,
    flags: sortedFlags,
    renderDigest,
  });
  report.approvalDigest = buildApprovalDigest(report);

  await assertSafeRecursiveRemovalPath(siteRoot, outputDirectory);
  await recreateOutputDirectory(outputDirectory);
  await writeArtifactAssets(outputDirectory, artifactRenders);
  const reviewTemplate = buildReviewTemplate(report);
  await writeJson(path.join(outputDirectory, "report.json"), report);
  await writeJson(path.join(outputDirectory, "review-template.json"), reviewTemplate);
  await writeFile(
    path.join(outputDirectory, "summary.md"),
    buildMarkdownSummary(report),
    "utf8",
  );
  await writeFile(
    path.join(outputDirectory, "comparison.html"),
    buildComparisonHtml(report),
    "utf8",
  );
  await writeArtifactManifest(outputDirectory);

  const review = await readJsonIfPresent(reviewPath);
  const reviewErrors = validateReview(review, report);
  if (reviewErrors.length > 0) {
    process.stderr.write(
      `Batch ${options.batch} visual QA is not approved:\n${reviewErrors.map((error) => `- ${error}`).join("\n")}\n`,
    );
    process.exitCode = 1;
  } else {
    process.stdout.write(
      `Batch ${options.batch} visual QA passed: ${targets.length} icons, ${report.flags.length} reviewed similarity flags.\n`,
    );
  }
} catch (error) {
  process.stderr.write(`${error?.stack || error}\n`);
  process.exitCode = 1;
} finally {
  await viteServer?.close();
}

function parseArguments(args) {
  const parsed = {
    batch: "003",
    expectedNew: 32,
    expectedBaseline: 176,
    outputDirectory: null,
    reviewPath: null,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    const [key, inlineValue] = argument.split("=", 2);
    const value = inlineValue ?? args[index + 1];
    if (!argument.startsWith("--")) throw new Error(`unknown argument: ${argument}`);
    if (inlineValue === undefined) index += 1;

    if (key === "--batch") parsed.batch = String(value).padStart(3, "0");
    else if (key === "--expected-new") parsed.expectedNew = parsePositiveInteger(value, key);
    else if (key === "--expected-baseline") parsed.expectedBaseline = parsePositiveInteger(value, key);
    else if (key === "--out") parsed.outputDirectory = value;
    else if (key === "--review") parsed.reviewPath = value;
    else throw new Error(`unknown argument: ${key}`);
  }

  if (!/^\d{3}$/.test(parsed.batch)) throw new Error(`invalid batch: ${parsed.batch}`);
  parsed.outputDirectory ??= `artifacts/icon-qa/batch-${parsed.batch}`;
  parsed.reviewPath ??= `icon-qa/reviews/batch-${parsed.batch}.json`;
  return parsed;
}

async function initializeRenderer() {
  const wasmUrl = import.meta.resolve("@resvg/resvg-wasm/index_bg.wasm");
  await initWasm(await readFile(fileURLToPath(wasmUrl)));
}

function renderItem(item, size) {
  const svg = renderToStaticMarkup(
    React.createElement(item.Icon, {
      size,
      stroke: 2,
      color: "#111318",
      "aria-hidden": "true",
    }),
  );
  const renderer = new Resvg(svg, {
    fitTo: { mode: "original" },
    background: "rgba(255, 255, 255, 0)",
  });
  const image = renderer.render();
  try {
    assert.equal(image.width, size, `${item.slug} rendered at an unexpected width`);
    assert.equal(image.height, size, `${item.slug} rendered at an unexpected height`);
    const pixels = Buffer.from(image.pixels);
    const png = Buffer.from(image.asPng());
    const alpha = rgbaToInkAlpha(pixels, size, size);
    assert.ok(alpha.some((value) => value > 0), `${item.slug} rendered empty at ${size}px`);
    return { pixels, png, alpha };
  } finally {
    image.free();
    renderer.free();
  }
}

function addFlag(flags, first, second, comparison) {
  const key = pairKey(first.slug, second.slug);
  flags.set(key, {
    key,
    firstSlug: first.slug,
    firstName: first.name,
    firstNameJa: first.nameJa,
    firstCategory: first.category,
    firstCollection: first.collection,
    secondSlug: second.slug,
    secondName: second.name,
    secondNameJa: second.nameJa,
    secondCategory: second.category,
    secondCollection: second.collection,
    reasons: [...comparison.reasons],
    minimumPHashDistance: comparison.minimumPHashDistance,
    pHashTransform: comparison.pHashTransform,
    maximumContentSsim: roundMetric(comparison.maximumContentSsim),
    ssimTransform: comparison.ssimTransform,
    semanticJaccard: roundMetric(comparison.semanticJaccard),
  });
}

function buildReport({ catalog, targets, baseline, comparisonsByTarget, flags, renderDigest }) {
  const catalogOrderDigest = createHash("sha256")
    .update(catalog.map((item) => item.slug).join("\n"), "utf8")
    .digest("hex");

  return {
    schemaVersion: ICON_VISUAL_QA_SCHEMA_VERSION,
    algorithm: ICON_VISUAL_QA_ALGORITHM,
    renderer: rendererIdentity,
    batch: options.batch,
    sizes: [...ICON_VISUAL_QA_SIZES],
    rasterSize: ICON_VISUAL_QA_RASTER_SIZE,
    transforms: [...ICON_VISUAL_QA_TRANSFORMS],
    thresholds: { ...ICON_VISUAL_QA_THRESHOLDS },
    catalogCount: catalog.length,
    baselineCount: baseline.length,
    targetCount: targets.length,
    catalogOrderDigest,
    renderDigest,
    icons: targets.map((item) => ({
      slug: item.slug,
      name: item.name,
      nameJa: item.nameJa,
      category: item.category,
      collection: item.collection,
      batch: item.batch || null,
      createdAt: item.createdAt,
      tags: [...(item.tags || [])],
      family: item.family || null,
      assets: Object.fromEntries(
        ICON_VISUAL_QA_SIZES.map((size) => [size, `assets/${item.slug}-${size}.png`]),
      ),
      nearest: comparisonsByTarget.get(item.slug).slice(0, 3).map((comparison) => ({
        ...serializeComparison(comparison),
        assets: Object.fromEntries(
          ICON_VISUAL_QA_SIZES.map((size) => [
            size,
            `assets/${comparison.candidateSlug}-${size}.png`,
          ]),
        ),
      })),
    })),
    flags: flags.map((flag) => ({
      ...flag,
      firstAssets: assetPaths(flag.firstSlug),
      secondAssets: assetPaths(flag.secondSlug),
    })),
  };
}

function assetPaths(slug) {
  return Object.fromEntries(
    ICON_VISUAL_QA_SIZES.map((size) => [size, `assets/${slug}-${size}.png`]),
  );
}

function serializeComparison(comparison) {
  return {
    candidateSlug: comparison.candidateSlug,
    candidateName: comparison.candidateName,
    candidateNameJa: comparison.candidateNameJa,
    candidateBatch: comparison.candidateBatch,
    candidateCollection: comparison.candidateCollection,
    minimumPHashDistance: comparison.minimumPHashDistance,
    pHashTransform: comparison.pHashTransform,
    maximumContentSsim: roundMetric(comparison.maximumContentSsim),
    ssimTransform: comparison.ssimTransform,
    semanticJaccard: roundMetric(comparison.semanticJaccard),
    rankScore: roundMetric(comparison.rankScore),
    reasons: [...comparison.reasons],
  };
}

async function writeArtifactAssets(directory, artifactRenders) {
  const assetsDirectory = path.join(directory, "assets");
  await mkdir(assetsDirectory, { recursive: true });
  for (const [slug, renders] of artifactRenders) {
    assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `unsafe asset slug: ${slug}`);
    for (const size of ICON_VISUAL_QA_SIZES) {
      await writeFile(path.join(assetsDirectory, `${slug}-${size}.png`), renders[size].png);
    }
  }
}

function buildComparisonHtml(report) {
  const flagSections = report.flags.length === 0
    ? `<section><h2>Threshold flags</h2><p class="flags">No threshold flags require review.</p></section>`
    : report.flags.map((flag, flagIndex) => {
      const rows = [
        {
          role: "Flag pair A",
          slug: flag.firstSlug,
          name: flag.firstName,
          nameJa: flag.firstNameJa,
          assets: flag.firstAssets,
        },
        {
          role: "Flag pair B",
          slug: flag.secondSlug,
          name: flag.secondName,
          nameJa: flag.secondNameJa,
          assets: flag.secondAssets,
        },
      ];
      const tableRows = rows.map((row) => `
      <tr>
        <th scope="row"><span class="role">${escapeHtml(row.role)}</span>${escapeHtml(row.name)}<small>${escapeHtml(row.nameJa)} · ${escapeHtml(row.slug)}</small></th>
        ${ICON_VISUAL_QA_SIZES.map((size) => renderSizeCell(row.assets[size], row.name, size)).join("")}
        <td class="metrics">${escapeHtml(flag.reasons.join(", "))}</td>
      </tr>`).join("");
      return `
      <section id="flag-${flagIndex + 1}">
        <h2>Flag ${String(flagIndex + 1).padStart(2, "0")}: ${escapeHtml(flag.key)}</h2>
        <table>
          <thead><tr><th>Icon</th><th>16px</th><th>24px</th><th>32px</th><th>Reasons</th></tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
        <p class="flags">pHash ${flag.minimumPHashDistance} (${escapeHtml(flag.pHashTransform)}); content SSIM ${flag.maximumContentSsim.toFixed(4)} (${escapeHtml(flag.ssimTransform)}); semantic Jaccard ${flag.semanticJaccard.toFixed(4)}</p>
      </section>`;
    }).join("");
  const sections = report.icons.map((icon, iconIndex) => {
    const rows = [
      {
        role: "Batch target",
        slug: icon.slug,
        name: icon.name,
        nameJa: icon.nameJa,
        assets: icon.assets,
        metrics: `Current Batch ${report.batch} icon`,
      },
      ...icon.nearest.map((neighbor, index) => ({
        role: `Existing neighbor ${index + 1}`,
        slug: neighbor.candidateSlug,
        name: neighbor.candidateName,
        nameJa: neighbor.candidateNameJa,
        assets: neighbor.assets,
        metrics: `pHash ${neighbor.minimumPHashDistance} (${neighbor.pHashTransform}); content SSIM ${neighbor.maximumContentSsim.toFixed(4)} (${neighbor.ssimTransform})`,
      })),
    ];
    const tableRows = rows.map((row) => `
      <tr>
        <th scope="row"><span class="role">${escapeHtml(row.role)}</span>${escapeHtml(row.name)}<small>${escapeHtml(row.nameJa)} · ${escapeHtml(row.slug)}</small></th>
        ${ICON_VISUAL_QA_SIZES.map((size) => renderSizeCell(row.assets[size], row.name, size)).join("")}
        <td class="metrics">${escapeHtml(row.metrics)}</td>
      </tr>`).join("");
    const iconFlags = report.flags.filter(
      (flag) => flag.firstSlug === icon.slug || flag.secondSlug === icon.slug,
    );

    return `
      <section id="${escapeHtml(icon.slug)}">
        <h2>${String(iconIndex + 1).padStart(2, "0")}. ${escapeHtml(icon.name)} <small>${escapeHtml(icon.nameJa)} · ${escapeHtml(icon.category)}</small></h2>
        <table>
          <thead><tr><th>Icon</th><th>16px</th><th>24px</th><th>32px</th><th>Nearest-shape metrics</th></tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
        <p class="flags">${iconFlags.length === 0
          ? "No threshold flags for this target."
          : `${iconFlags.length} review flag(s): ${iconFlags.map((flag) => `${flag.key} [${flag.reasons.join(", ")}]`).join("; ")}`}</p>
      </section>`;
  }).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PATHROOM Batch ${escapeHtml(report.batch)} icon visual QA</title>
  <style>
    :root { color: #111318; background: #f4f6fa; font-family: Inter, "Noto Sans JP", system-ui, sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 28px; }
    main { width: min(1440px, 100%); margin: 0 auto; }
    header, section { background: #fff; border: 1px solid #dfe3eb; border-radius: 10px; }
    header { padding: 24px; margin-bottom: 20px; }
    h1, h2, p { margin-top: 0; }
    h1 { margin-bottom: 8px; font-size: 24px; }
    h2 { margin-bottom: 16px; font-size: 18px; }
    h1 small, h2 small { color: #68717d; font-size: 13px; font-weight: 500; }
    section { padding: 20px; margin: 14px 0; break-inside: avoid; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    th, td { padding: 10px; border-top: 1px solid #e7eaf0; text-align: left; vertical-align: middle; }
    thead th { border-top: 0; color: #68717d; font-size: 12px; }
    tbody th { width: 250px; font-size: 14px; }
    tbody th small, .role { display: block; }
    tbody th small { margin-top: 3px; color: #68717d; font-size: 11px; font-weight: 400; }
    .role { color: #0645dc; font-size: 10px; letter-spacing: .04em; text-transform: uppercase; }
    .size-cell { width: 150px; }
    .preview { display: inline-grid; place-items: center; margin-right: 10px; border: 1px solid #dfe3eb; background: #fff; vertical-align: middle; }
    .preview.native { width: 42px; height: 42px; }
    .preview.zoom { width: 66px; height: 66px; background-image: linear-gradient(45deg, #f3f5f8 25%, transparent 25%), linear-gradient(-45deg, #f3f5f8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f5f8 75%), linear-gradient(-45deg, transparent 75%, #f3f5f8 75%); background-size: 8px 8px; background-position: 0 0, 0 4px, 4px -4px, -4px 0; }
    .preview.zoom img { image-rendering: pixelated; }
    .metrics, .flags { color: #58616d; font-size: 11px; line-height: 1.5; }
    .flags { margin: 14px 0 0; }
    @media (max-width: 900px) { body { padding: 12px; } section { overflow-x: auto; } table { min-width: 980px; } }
  </style>
</head>
<body>
<main>
  <header>
    <h1>PATHROOM Batch ${escapeHtml(report.batch)} visual QA <small>${report.targetCount} targets / ${report.baselineCount} existing icons</small></h1>
    <p>Each target is shown at native 16px, 24px, and 32px next to its three nearest pre-existing shapes. The enlarged panes use nearest-neighbor scaling so individual raster pixels remain visible.</p>
    <p>Algorithm: ${escapeHtml(report.algorithm)} · pHash ≤ ${report.thresholds.phashDistanceMax} · content SSIM ≥ ${report.thresholds.contentSsimMin} · semantic Jaccard ≥ ${report.thresholds.semanticJaccardMin} · render digest ${escapeHtml(report.renderDigest)} · approval digest ${escapeHtml(report.approvalDigest)}</p>
  </header>
  ${flagSections}
  ${sections}
</main>
</body>
</html>
`;
}

function renderSizeCell(asset, name, size) {
  const source = escapeHtml(asset);
  const alt = escapeHtml(`${name} at ${size}px`);
  const zoomSize = size * 2;
  return `<td class="size-cell"><span class="preview native"><img src="${source}" width="${size}" height="${size}" alt="${alt}"></span><span class="preview zoom" aria-hidden="true"><img src="${source}" width="${zoomSize}" height="${zoomSize}" alt=""></span></td>`;
}

function buildMarkdownSummary(report) {
  const lines = [
    `# PATHROOM Batch ${report.batch} visual QA`,
    "",
    `- Targets: ${report.targetCount}`,
    `- Existing comparison set: ${report.baselineCount}`,
    `- Sizes: ${report.sizes.join(" / ")}px`,
    `- Render digest: \`${report.renderDigest}\``,
    `- Approval digest: \`${report.approvalDigest}\``,
    `- Similarity flags requiring review: ${report.flags.length}`,
    "",
    "| Target | Nearest existing shapes |",
    "| --- | --- |",
  ];
  for (const icon of report.icons) {
    lines.push(`| ${icon.name} (\`${icon.slug}\`) | ${icon.nearest.map((neighbor) => `${neighbor.candidateName} (pHash ${neighbor.minimumPHashDistance}, SSIM ${neighbor.maximumContentSsim.toFixed(4)})`).join("<br>")} |`);
  }
  lines.push("", "Open `comparison.html` from the same artifact for the complete native-size review.", "");
  return lines.join("\n");
}

async function writeArtifactManifest(directory) {
  const relativeFiles = ["comparison.html", "report.json", "review-template.json", "summary.md"];
  const report = JSON.parse(await readFile(path.join(directory, "report.json"), "utf8"));
  const assetFiles = new Set();
  for (const icon of report.icons) {
    Object.values(icon.assets).forEach((asset) => assetFiles.add(asset));
    for (const neighbor of icon.nearest) {
      Object.values(neighbor.assets).forEach((asset) => assetFiles.add(asset));
    }
  }
  for (const flag of report.flags) {
    Object.values(flag.firstAssets).forEach((asset) => assetFiles.add(asset));
    Object.values(flag.secondAssets).forEach((asset) => assetFiles.add(asset));
  }
  relativeFiles.push(...[...assetFiles].sort());

  const files = [];
  for (const relativePath of relativeFiles) {
    const contents = await readFile(path.join(directory, relativePath));
    files.push({
      path: relativePath.replaceAll("\\", "/"),
      bytes: contents.length,
      sha256: createHash("sha256").update(contents).digest("hex"),
    });
  }
  await writeJson(path.join(directory, "artifact-manifest.json"), {
    schemaVersion: 1,
    batch: report.batch,
    renderDigest: report.renderDigest,
    files,
  });
}

async function recreateOutputDirectory(directory) {
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
}

async function readJsonIfPresent(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw new Error(`could not read review JSON at ${filePath}: ${error.message}`);
  }
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function resolveInsideSite(relativePath) {
  return resolvePathInside(siteRoot, relativePath, "visual QA path");
}

function resolveOutputDirectory(relativePath) {
  const resolved = resolveInsideSite(relativePath);
  return resolvePathInside(artifactRoot, resolved, "visual QA output");
}

function resolveReviewPath(relativePath) {
  const resolved = resolveInsideSite(relativePath);
  return resolvePathInside(reviewRoot, resolved, "visual QA review");
}

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${name} must be positive`);
  return number;
}

function compareByRank(first, second) {
  return second.rankScore - first.rankScore
    || first.minimumPHashDistance - second.minimumPHashDistance
    || first.candidateSlug.localeCompare(second.candidateSlug);
}

function compareFlags(first, second) {
  return first.firstSlug.localeCompare(second.firstSlug)
    || first.secondSlug.localeCompare(second.secondSlug);
}

function roundMetric(value) {
  return Number(value.toFixed(6));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
