import assert from "node:assert/strict";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import {
  ICON_VISUAL_QA_ALGORITHM,
  ICON_VISUAL_QA_SCHEMA_VERSION,
  ICON_VISUAL_QA_TRANSFORMS,
  assertSafeRecursiveRemovalPath,
  buildApprovalDigest,
  buildRenderDigest,
  contentSsim,
  hammingDistance,
  jaccardSimilarity,
  perceptualHash,
  rgbaToInkAlpha,
  resolvePathInside,
  semanticTokens,
  transformSquare,
  validateReview,
} from "../scripts/icon-visual-qa-lib.mjs";

test.before(async () => {
  const wasmUrl = import.meta.resolve("@resvg/resvg-wasm/index_bg.wasm");
  await initWasm(await readFile(fileURLToPath(wasmUrl)));
});

test("resvg WASM produces non-empty deterministic 16/24/32px RGBA renders", () => {
  for (const size of [16, 24, 32]) {
    const first = renderFixture(size);
    const second = renderFixture(size);
    assert.equal(first.pixels.length, size * size * 4);
    assert.ok(rgbaToInkAlpha(first.pixels, size, size).some((value) => value > 0));
    assert.ok(first.png.length > 50);
    assert.deepEqual(first.pixels, second.pixels, `${size}px RGBA render drifted`);
    assert.deepEqual(first.png, second.png, `${size}px PNG render drifted`);
  }
});

test("D4 transforms match expected coordinates and group inverses", () => {
  const source = Float64Array.from({ length: 16 }, (_, index) => index);
  const expected = {
    identity: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "rotate-90": [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
    "rotate-180": [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    "rotate-270": [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
    "mirror-x": [3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8, 15, 14, 13, 12],
    "mirror-y": [12, 13, 14, 15, 8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3],
    "mirror-diagonal": [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15],
    "mirror-antidiagonal": [15, 11, 7, 3, 14, 10, 6, 2, 13, 9, 5, 1, 12, 8, 4, 0],
  };
  const outputs = new Set();
  for (const transform of ICON_VISUAL_QA_TRANSFORMS) {
    const transformed = transformSquare(source, 4, transform);
    assert.deepEqual([...transformed], expected[transform], transform);
    outputs.add([...transformed].join(","));
  }
  assert.equal(outputs.size, ICON_VISUAL_QA_TRANSFORMS.length);

  let rotated = source;
  for (let index = 0; index < 4; index += 1) {
    rotated = transformSquare(rotated, 4, "rotate-90");
  }
  assert.deepEqual([...rotated], [...source]);
  assert.deepEqual(
    [...transformSquare(transformSquare(source, 4, "mirror-x"), 4, "mirror-x")],
    [...source],
  );
  assert.deepEqual(
    [...transformSquare(
      transformSquare(source, 4, "rotate-90"),
      4,
      "rotate-270",
    )],
    [...source],
  );
  for (const mirror of ["mirror-x", "mirror-y", "mirror-diagonal", "mirror-antidiagonal"]) {
    assert.deepEqual(
      [...transformSquare(transformSquare(source, 4, mirror), 4, mirror)],
      [...source],
      mirror,
    );
  }
});

test("DCT perceptual hashes and Hamming distance are deterministic", () => {
  const first = new Float64Array(32 * 32);
  const shifted = new Float64Array(32 * 32);
  for (let y = 7; y < 25; y += 1) {
    first[y * 32 + 10] = 1;
    shifted[y * 32 + 12] = 1;
  }

  const firstHash = perceptualHash(first, 32);
  const repeatedHash = perceptualHash(first, 32);
  const shiftedHash = perceptualHash(shifted, 32);
  assert.match(firstHash, /^[0-9a-f]{16}$/);
  assert.equal(firstHash, repeatedHash);
  assert.equal(hammingDistance(firstHash, repeatedHash), 0);
  assert.ok(hammingDistance(firstHash, shiftedHash) > 0);
  assert.equal(
    hammingDistance(firstHash, shiftedHash),
    hammingDistance(shiftedHash, firstHash),
  );
});

test("content SSIM is symmetric, bounded, and distinguishes different ink", () => {
  const first = new Float64Array(16 * 16);
  const second = new Float64Array(16 * 16);
  for (let index = 3; index < 13; index += 1) {
    first[index * 16 + 5] = 1;
    second[5 * 16 + index] = 1;
  }

  assert.equal(contentSsim(first, first, 16), 1);
  const different = contentSsim(first, second, 16);
  assert.ok(different < 0.92);
  assert.ok(different >= -1 && different <= 1);
  assert.equal(different, contentSsim(second, first, 16));
});

test("semantic token Jaccard includes bilingual names and tags", () => {
  const first = semanticTokens({
    slug: "arrow-corner",
    name: "Arrow Corner",
    nameJa: "角矢印",
    tags: ["direction", "方向"],
  });
  const second = semanticTokens({
    slug: "arrow-turn",
    name: "Arrow Turn",
    nameJa: "曲がる矢印",
    tags: ["direction", "方向"],
  });
  assert.ok(first.has("角矢印"));
  assert.ok(second.has("arrow"));
  assert.ok(jaccardSimilarity(first, second) > 0);
  assert.equal(jaccardSimilarity(first, first), 1);
});

test("render digest is deterministic and covers every icon and size slot", () => {
  const records = makeRenderRecords();
  const digest = buildRenderDigest(records);
  assert.match(digest, /^[0-9a-f]{64}$/);
  assert.equal(buildRenderDigest(makeRenderRecords()), digest);

  for (let recordIndex = 0; recordIndex < records.length; recordIndex += 1) {
    for (const size of [16, 24, 32]) {
      const changed = makeRenderRecords();
      changed[recordIndex].renders[size].pixels[0] ^= 0xff;
      assert.notEqual(
        buildRenderDigest(changed),
        digest,
        `${changed[recordIndex].slug} ${size}px was not covered by the digest`,
      );
    }
  }
});

test("approval digest fixes renderer, thresholds, target metadata, top3 metrics, and flags", () => {
  const report = makeReport();
  const digest = buildApprovalDigest(report);
  assert.equal(digest, report.approvalDigest);

  const mutations = [
    (changed) => { changed.renderer = "different-renderer"; },
    (changed) => { changed.thresholds.phashDistanceMax = 7; },
    (changed) => { changed.icons[0].nameJa = "変更済み"; },
    (changed) => { changed.icons[0].tags.push("changed-tag"); },
    (changed) => { changed.icons[0].nearest[0].maximumContentSsim = 0.95; },
    (changed) => { changed.flags[0].reasons = ["content-ssim"]; },
  ];
  for (const mutate of mutations) {
    const changed = structuredClone(report);
    delete changed.approvalDigest;
    mutate(changed);
    assert.notEqual(buildApprovalDigest(changed), digest);
  }
});

test("path containment follows OS case semantics and blocks symlink ancestors", async (context) => {
  const scratchRoot = await mkdtemp(path.join(os.tmpdir(), "pathroom-icon-qa-"));
  const siteRoot = path.join(scratchRoot, "site");
  const safeTarget = path.join(siteRoot, "artifacts", "icon-qa", "batch-003");
  const outside = path.join(scratchRoot, "outside");
  await mkdir(siteRoot, { recursive: true });
  await mkdir(outside, { recursive: true });

  try {
    assert.equal(
      resolvePathInside(siteRoot, "artifacts/icon-qa/batch-003"),
      safeTarget,
    );
    assert.throws(() => resolvePathInside(siteRoot, siteRoot), /must stay below/);
    assert.throws(() => resolvePathInside(siteRoot, "../outside"), /must stay below/);
    assert.throws(() => resolvePathInside(siteRoot, outside), /must stay below/);
    if (process.platform !== "win32") {
      assert.throws(
        () => resolvePathInside(siteRoot, path.join(scratchRoot, "SITE", "batch-003")),
        /must stay below/,
      );
    }
    assert.equal(await assertSafeRecursiveRemovalPath(siteRoot, safeTarget), safeTarget);

    const linkedArtifacts = path.join(siteRoot, "artifacts");
    try {
      await symlink(outside, linkedArtifacts, process.platform === "win32" ? "junction" : "dir");
      await assert.rejects(
        assertSafeRecursiveRemovalPath(siteRoot, path.join(linkedArtifacts, "batch-003")),
        /symbolic link/,
      );
    } catch (error) {
      if (error?.code !== "EPERM") throw error;
      context.diagnostic("symlink assertion skipped because the host denied symlink creation");
    }
  } finally {
    await rm(scratchRoot, { recursive: true, force: true });
  }
});

test("review validation rejects stale digests, pending icons, and stale flag contracts", () => {
  const report = makeReport();
  const pending = {
    schemaVersion: ICON_VISUAL_QA_SCHEMA_VERSION,
    algorithm: ICON_VISUAL_QA_ALGORITHM,
    batch: "003",
    renderDigest: "stale",
    approvalDigest: "stale",
    icons: [{ slug: "target-icon", decision: "pending" }],
    pairs: [],
  };
  assert.match(validateReview(pending, report).join("\n"), /renderDigest/);
  assert.match(validateReview(pending, report).join("\n"), /not pass/);
  assert.match(validateReview(pending, report).join("\n"), /missing near-duplicate/);
  assert.match(validateReview(pending, report).join("\n"), /approvalDigest/);

  const accepted = {
    ...pending,
    renderDigest: report.renderDigest,
    approvalDigest: report.approvalDigest,
    icons: [{ slug: "target-icon", decision: "pass" }],
    pairs: [{
      key: "existing-icon::target-icon",
      firstSlug: "target-icon",
      secondSlug: "existing-icon",
      reasons: ["phash"],
      decision: "accept-distinct",
      rationale: "Different semantic purpose and readable silhouette.",
    }],
  };
  assert.deepEqual(validateReview(accepted, report), []);

  const changedReport = structuredClone(report);
  changedReport.flags[0].reasons = ["content-ssim"];
  changedReport.approvalDigest = buildApprovalDigest(changedReport);
  const staleErrors = validateReview(accepted, changedReport).join("\n");
  assert.match(staleErrors, /approvalDigest/);
  assert.match(staleErrors, /reasons are stale/);
});

function renderFixture(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#111318" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 L10 18 L20 6"/></svg>`;
  const renderer = new Resvg(svg, { fitTo: { mode: "original" } });
  const image = renderer.render();
  try {
    assert.equal(image.width, size);
    assert.equal(image.height, size);
    return {
      pixels: Buffer.from(image.pixels),
      png: Buffer.from(image.asPng()),
    };
  } finally {
    image.free();
    renderer.free();
  }
}

function makeRenderRecords() {
  return ["target-icon", "neighbor-one", "flag-only"].map((slug, slugIndex) => ({
    slug,
    renders: Object.fromEntries([16, 24, 32].map((size, sizeIndex) => [
      size,
      { pixels: Buffer.from([slugIndex + 1, sizeIndex + 1, size, 255]) },
    ])),
  }));
}

function makeReport() {
  const report = {
    schemaVersion: ICON_VISUAL_QA_SCHEMA_VERSION,
    algorithm: ICON_VISUAL_QA_ALGORITHM,
    renderer: "@resvg/resvg-wasm@2.6.2",
    batch: "003",
    sizes: [16, 24, 32],
    rasterSize: 32,
    transforms: [...ICON_VISUAL_QA_TRANSFORMS],
    thresholds: {
      phashDistanceMax: 6,
      contentSsimMin: 0.92,
      semanticJaccardMin: 0.75,
    },
    catalogCount: 2,
    baselineCount: 1,
    targetCount: 1,
    catalogOrderDigest: "catalog-order",
    renderDigest: "current-render",
    icons: [{
      slug: "target-icon",
      name: "Target Icon",
      nameJa: "対象アイコン",
      category: "ui",
      collection: "pathroom-originals",
      batch: "003",
      createdAt: "2026-08-10",
      tags: ["target", "対象"],
      family: null,
      assets: {
        16: "assets/target-icon-16.png",
        24: "assets/target-icon-24.png",
        32: "assets/target-icon-32.png",
      },
      nearest: [{
        candidateSlug: "existing-icon",
        candidateName: "Existing Icon",
        candidateNameJa: "既存アイコン",
        candidateBatch: null,
        candidateCollection: "tabler",
        minimumPHashDistance: 6,
        pHashTransform: "identity",
        maximumContentSsim: 0.7,
        ssimTransform: "identity",
        semanticJaccard: 0.1,
        rankScore: 0.5,
        reasons: ["phash"],
        assets: {
          16: "assets/existing-icon-16.png",
          24: "assets/existing-icon-24.png",
          32: "assets/existing-icon-32.png",
        },
      }],
    }],
    flags: [{
      key: "existing-icon::target-icon",
      firstSlug: "target-icon",
      firstName: "Target Icon",
      firstNameJa: "対象アイコン",
      firstCategory: "ui",
      firstCollection: "pathroom-originals",
      secondSlug: "existing-icon",
      secondName: "Existing Icon",
      secondNameJa: "既存アイコン",
      secondCategory: "ui",
      secondCollection: "tabler",
      reasons: ["phash"],
      minimumPHashDistance: 6,
      pHashTransform: "identity",
      maximumContentSsim: 0.7,
      ssimTransform: "identity",
      semanticJaccard: 0.1,
      firstAssets: {
        16: "assets/target-icon-16.png",
        24: "assets/target-icon-24.png",
        32: "assets/target-icon-32.png",
      },
      secondAssets: {
        16: "assets/existing-icon-16.png",
        24: "assets/existing-icon-24.png",
        32: "assets/existing-icon-32.png",
      },
    }],
  };
  report.approvalDigest = buildApprovalDigest(report);
  return report;
}
