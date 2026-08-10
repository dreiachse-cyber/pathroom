import { createHash } from "node:crypto";
import { lstat, realpath } from "node:fs/promises";
import path from "node:path";

export const ICON_VISUAL_QA_SCHEMA_VERSION = 2;
export const ICON_VISUAL_QA_ALGORITHM = "pathroom-dct64-content-ssim-v1";
export const ICON_VISUAL_QA_SIZES = Object.freeze([16, 24, 32]);
export const ICON_VISUAL_QA_RASTER_SIZE = 32;
export const ICON_VISUAL_QA_THRESHOLDS = Object.freeze({
  phashDistanceMax: 6,
  contentSsimMin: 0.92,
  semanticJaccardMin: 0.75,
});
export const ICON_VISUAL_QA_TRANSFORMS = Object.freeze([
  "identity",
  "rotate-90",
  "rotate-180",
  "rotate-270",
  "mirror-x",
  "mirror-y",
  "mirror-diagonal",
  "mirror-antidiagonal",
]);

const bitCounts = Object.freeze([0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]);

export function rgbaToInkAlpha(rgba, width, height) {
  assertSquareDimensions(width, height);
  if (rgba.length !== width * height * 4) {
    throw new Error(`RGBA length ${rgba.length} does not match ${width}x${height}`);
  }

  const alpha = new Float64Array(width * height);
  for (let source = 3, target = 0; source < rgba.length; source += 4, target += 1) {
    alpha[target] = rgba[source] / 255;
  }
  return alpha;
}

export function transformSquare(values, size, transform) {
  assertSquareBuffer(values, size);
  if (!ICON_VISUAL_QA_TRANSFORMS.includes(transform)) {
    throw new Error(`unknown visual QA transform: ${transform}`);
  }

  const output = new Float64Array(values.length);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const [sourceX, sourceY] = sourceCoordinate(x, y, size, transform);
      output[y * size + x] = values[sourceY * size + sourceX];
    }
  }
  return output;
}

export function perceptualHash(values, size, hashSize = 8) {
  assertSquareBuffer(values, size);
  if (!Number.isInteger(hashSize) || hashSize < 2 || hashSize > size) {
    throw new Error(`invalid perceptual hash size: ${hashSize}`);
  }

  const cosines = buildCosineTable(size, hashSize);
  const coefficients = [];
  for (let verticalFrequency = 0; verticalFrequency < hashSize; verticalFrequency += 1) {
    for (let horizontalFrequency = 0; horizontalFrequency < hashSize; horizontalFrequency += 1) {
      let sum = 0;
      for (let y = 0; y < size; y += 1) {
        const verticalCosine = cosines[verticalFrequency][y];
        for (let x = 0; x < size; x += 1) {
          sum += values[y * size + x]
            * cosines[horizontalFrequency][x]
            * verticalCosine;
        }
      }
      coefficients.push(sum);
    }
  }

  const acMedian = median(coefficients.slice(1));
  let bits = 0n;
  for (const coefficient of coefficients) {
    bits = (bits << 1n) | (coefficient > acMedian ? 1n : 0n);
  }

  const hexLength = Math.ceil(coefficients.length / 4);
  return bits.toString(16).padStart(hexLength, "0");
}

export function hammingDistance(firstHash, secondHash) {
  if (firstHash.length !== secondHash.length) {
    throw new Error("perceptual hashes must have the same length");
  }

  let distance = 0;
  for (let index = 0; index < firstHash.length; index += 1) {
    const first = Number.parseInt(firstHash[index], 16);
    const second = Number.parseInt(secondHash[index], 16);
    if (!Number.isInteger(first) || !Number.isInteger(second)) {
      throw new Error("perceptual hashes must be hexadecimal");
    }
    distance += bitCounts[first ^ second];
  }
  return distance;
}

export function contentSsim(first, second, size) {
  assertSquareBuffer(first, size);
  assertSquareBuffer(second, size);

  const bounds = unionInkBounds(first, second, size);
  if (!bounds) return 1;

  let firstSum = 0;
  let secondSum = 0;
  let firstSquaredSum = 0;
  let secondSquaredSum = 0;
  let productSum = 0;
  let count = 0;

  for (let y = bounds.top; y <= bounds.bottom; y += 1) {
    for (let x = bounds.left; x <= bounds.right; x += 1) {
      const index = y * size + x;
      const firstValue = first[index];
      const secondValue = second[index];
      firstSum += firstValue;
      secondSum += secondValue;
      firstSquaredSum += firstValue * firstValue;
      secondSquaredSum += secondValue * secondValue;
      productSum += firstValue * secondValue;
      count += 1;
    }
  }

  const firstMean = firstSum / count;
  const secondMean = secondSum / count;
  const divisor = Math.max(1, count - 1);
  const firstVariance = Math.max(0, (firstSquaredSum - count * firstMean * firstMean) / divisor);
  const secondVariance = Math.max(0, (secondSquaredSum - count * secondMean * secondMean) / divisor);
  const covariance = (productSum - count * firstMean * secondMean) / divisor;
  const luminanceConstant = 0.01 ** 2;
  const structureConstant = 0.03 ** 2;
  const numerator = (2 * firstMean * secondMean + luminanceConstant)
    * (2 * covariance + structureConstant);
  const denominator = (firstMean ** 2 + secondMean ** 2 + luminanceConstant)
    * (firstVariance + secondVariance + structureConstant);

  if (denominator === 0) return firstMean === secondMean ? 1 : 0;
  return Math.max(-1, Math.min(1, numerator / denominator));
}

export function semanticTokens(item) {
  const tokens = new Set();
  const values = [item.slug, item.name, item.nameJa, ...(item.tags || [])];
  for (const value of values) {
    const normalized = normalizeText(value);
    if (!normalized) continue;
    tokens.add(normalized);
    for (const token of normalized.split(/[^\p{L}\p{N}]+/u)) {
      if (token) tokens.add(token);
    }
  }
  return tokens;
}

export function jaccardSimilarity(first, second) {
  if (!(first instanceof Set) || !(second instanceof Set)) {
    throw new Error("Jaccard inputs must be sets");
  }
  const union = new Set([...first, ...second]);
  if (union.size === 0) return 1;
  let intersection = 0;
  for (const value of first) {
    if (second.has(value)) intersection += 1;
  }
  return intersection / union.size;
}

export function sameJapaneseName(first, second) {
  const firstName = normalizeText(first.nameJa);
  const secondName = normalizeText(second.nameJa);
  return firstName.length > 0 && firstName === secondName;
}

export function buildRasterRecord(item, alpha, size = ICON_VISUAL_QA_RASTER_SIZE) {
  assertSquareBuffer(alpha, size);
  const transforms = {};
  for (const transform of ICON_VISUAL_QA_TRANSFORMS) {
    const transformedAlpha = transform === "identity"
      ? new Float64Array(alpha)
      : transformSquare(alpha, size, transform);
    transforms[transform] = {
      alpha: transformedAlpha,
      phash: perceptualHash(transformedAlpha, size),
    };
  }
  return {
    item,
    alpha: transforms.identity.alpha,
    phash: transforms.identity.phash,
    transforms,
    tokens: semanticTokens(item),
  };
}

export function compareRasterRecords(target, candidate, thresholds = ICON_VISUAL_QA_THRESHOLDS) {
  let minimumPHashDistance = Number.POSITIVE_INFINITY;
  let pHashTransform = "identity";
  let maximumContentSsim = Number.NEGATIVE_INFINITY;
  let ssimTransform = "identity";

  for (const transform of ICON_VISUAL_QA_TRANSFORMS) {
    const candidateTransform = candidate.transforms[transform];
    const distance = hammingDistance(target.phash, candidateTransform.phash);
    const ssim = contentSsim(
      target.alpha,
      candidateTransform.alpha,
      ICON_VISUAL_QA_RASTER_SIZE,
    );
    if (distance < minimumPHashDistance
      || (distance === minimumPHashDistance && transform === "identity")) {
      minimumPHashDistance = distance;
      pHashTransform = transform;
    }
    if (ssim > maximumContentSsim
      || (ssim === maximumContentSsim && transform === "identity")) {
      maximumContentSsim = ssim;
      ssimTransform = transform;
    }
  }

  const semanticJaccard = jaccardSimilarity(target.tokens, candidate.tokens);
  const identicalJapaneseName = sameJapaneseName(target.item, candidate.item);
  const reasons = [];
  if (minimumPHashDistance <= thresholds.phashDistanceMax) reasons.push("phash");
  if (maximumContentSsim >= thresholds.contentSsimMin) reasons.push("content-ssim");
  if (semanticJaccard >= thresholds.semanticJaccardMin) reasons.push("semantic-jaccard");
  if (identicalJapaneseName) reasons.push("identical-japanese-name");

  const rankScore = ((64 - minimumPHashDistance) / 64) * 0.55
    + Math.max(0, maximumContentSsim) * 0.45;

  return {
    candidateSlug: candidate.item.slug,
    candidateName: candidate.item.name,
    candidateNameJa: candidate.item.nameJa,
    candidateBatch: candidate.item.batch || null,
    candidateCollection: candidate.item.collection,
    minimumPHashDistance,
    pHashTransform,
    maximumContentSsim,
    ssimTransform,
    semanticJaccard,
    identicalJapaneseName,
    rankScore,
    reasons,
  };
}

export function pairKey(firstSlug, secondSlug) {
  return [firstSlug, secondSlug].sort().join("::");
}

export function buildRenderDigest(renderedTargets) {
  const hash = createHash("sha256");
  for (const target of renderedTargets) {
    hash.update(target.slug, "utf8");
    hash.update("\0");
    for (const size of ICON_VISUAL_QA_SIZES) {
      const pixels = target.renders[size]?.pixels;
      if (!pixels) throw new Error(`${target.slug} is missing its ${size}px render`);
      hash.update(String(size), "utf8");
      hash.update("\0");
      hash.update(pixels);
    }
  }
  return hash.digest("hex");
}

export function buildApprovalDigest(report) {
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    throw new Error("visual QA report must be an object");
  }
  const { approvalDigest: _ignoredApprovalDigest, ...approvalRecord } = report;
  return createHash("sha256")
    .update(canonicalJson(approvalRecord), "utf8")
    .digest("hex");
}

export function resolvePathInside(rootDirectory, candidatePath, label = "path") {
  if (typeof rootDirectory !== "string" || rootDirectory.trim() === "") {
    throw new Error(`${label} root must be a non-empty string`);
  }
  if (typeof candidatePath !== "string" || candidatePath.trim() === "") {
    throw new Error(`${label} must be a non-empty string`);
  }

  const root = path.resolve(rootDirectory);
  const candidate = path.resolve(root, candidatePath);
  const relative = path.relative(root, candidate);
  if (relative === ""
    || relative === ".."
    || relative.startsWith(`..${path.sep}`)
    || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay below ${root}`);
  }
  return candidate;
}

export async function assertSafeRecursiveRemovalPath(rootDirectory, targetPath) {
  const root = path.resolve(rootDirectory);
  const target = resolvePathInside(root, targetPath, "visual QA removal target");
  const rootRealPath = await realpath(root);
  const relative = path.relative(root, target);
  let cursor = root;

  for (const segment of relative.split(path.sep)) {
    cursor = path.join(cursor, segment);
    let stats;
    try {
      stats = await lstat(cursor);
    } catch (error) {
      if (error?.code === "ENOENT") break;
      throw error;
    }

    if (stats.isSymbolicLink()) {
      throw new Error(`visual QA removal target crosses a symbolic link: ${cursor}`);
    }
    if (cursor !== target && !stats.isDirectory()) {
      throw new Error(`visual QA removal ancestor is not a directory: ${cursor}`);
    }

    const cursorRealPath = await realpath(cursor);
    resolvePathInside(rootRealPath, cursorRealPath, "visual QA removal real path");
  }

  return target;
}

export function validateReview(review, report) {
  const errors = [];
  if (!review || typeof review !== "object") return ["review JSON is missing"];
  if (!report || typeof report !== "object") return ["visual QA report is missing"];
  if (report.schemaVersion !== ICON_VISUAL_QA_SCHEMA_VERSION) {
    errors.push(`report schemaVersion must be ${ICON_VISUAL_QA_SCHEMA_VERSION}`);
  }
  if (report.algorithm !== ICON_VISUAL_QA_ALGORITHM) {
    errors.push(`report algorithm must be ${ICON_VISUAL_QA_ALGORITHM}`);
  }
  let expectedApprovalDigest;
  try {
    expectedApprovalDigest = buildApprovalDigest(report);
    if (report.approvalDigest !== expectedApprovalDigest) {
      errors.push("report approvalDigest does not match its current QA contract");
    }
  } catch (error) {
    errors.push(`report approvalDigest could not be calculated: ${error.message}`);
  }
  if (review.schemaVersion !== ICON_VISUAL_QA_SCHEMA_VERSION) {
    errors.push(`review schemaVersion must be ${ICON_VISUAL_QA_SCHEMA_VERSION}`);
  }
  if (review.algorithm !== report.algorithm) {
    errors.push(`review algorithm must be ${report.algorithm}`);
  }
  if (review.batch !== report.batch) errors.push(`review batch must be ${report.batch}`);
  if (review.renderDigest !== report.renderDigest) {
    errors.push("review renderDigest does not match the current 16/24/32px renders");
  }
  if (review.approvalDigest !== report.approvalDigest
    || review.approvalDigest !== expectedApprovalDigest) {
    errors.push("review approvalDigest does not match the current visual QA report");
  }

  const expectedIcons = new Set(report.icons.map((icon) => icon.slug));
  const iconReviews = new Map();
  for (const iconReview of review.icons || []) {
    if (!iconReview || typeof iconReview.slug !== "string") {
      errors.push("review contains an invalid icon entry");
      continue;
    }
    if (iconReviews.has(iconReview.slug)) errors.push(`duplicate icon review: ${iconReview.slug}`);
    iconReviews.set(iconReview.slug, iconReview);
  }
  for (const slug of expectedIcons) {
    const iconReview = iconReviews.get(slug);
    if (!iconReview) errors.push(`missing 16/24/32px review: ${slug}`);
    else if (iconReview.decision !== "pass") errors.push(`small-size review is not pass: ${slug}`);
  }
  for (const slug of iconReviews.keys()) {
    if (!expectedIcons.has(slug)) errors.push(`stale icon review: ${slug}`);
  }

  const expectedPairs = new Map(report.flags.map((flag) => [flag.key, flag]));
  const pairReviews = new Map();
  for (const pairReview of review.pairs || []) {
    if (!pairReview || typeof pairReview.key !== "string") {
      errors.push("review contains an invalid pair entry");
      continue;
    }
    if (pairReviews.has(pairReview.key)) errors.push(`duplicate pair review: ${pairReview.key}`);
    pairReviews.set(pairReview.key, pairReview);
  }
  for (const [key, flag] of expectedPairs) {
    const pairReview = pairReviews.get(key);
    if (!pairReview) errors.push(`missing near-duplicate review: ${key}`);
    else if (pairReview.decision !== "accept-distinct") {
      errors.push(`near-duplicate review is not accept-distinct: ${key}`);
    } else if (typeof pairReview.rationale !== "string" || pairReview.rationale.trim().length < 8) {
      errors.push(`near-duplicate review needs a rationale of at least 8 characters: ${key}`);
    }
    if (pairReview && pairReview.firstSlug !== flag.firstSlug) {
      errors.push(`near-duplicate firstSlug is stale: ${key}`);
    }
    if (pairReview && pairReview.secondSlug !== flag.secondSlug) {
      errors.push(`near-duplicate secondSlug is stale: ${key}`);
    }
    if (pairReview && !sameStringArray(pairReview.reasons, flag.reasons)) {
      errors.push(`near-duplicate reasons are stale: ${key}`);
    }
  }
  for (const key of pairReviews.keys()) {
    if (!expectedPairs.has(key)) errors.push(`stale near-duplicate review: ${key}`);
  }

  return errors;
}

export function buildReviewTemplate(report) {
  return {
    schemaVersion: ICON_VISUAL_QA_SCHEMA_VERSION,
    algorithm: ICON_VISUAL_QA_ALGORITHM,
    batch: report.batch,
    renderDigest: report.renderDigest,
    approvalDigest: report.approvalDigest,
    icons: report.icons.map(({ slug }) => ({
      slug,
      decision: "pending",
      note: "Review the target and its three nearest existing shapes at 16px, 24px, and 32px.",
    })),
    pairs: report.flags.map(({ key, firstSlug, secondSlug, reasons }) => ({
      key,
      firstSlug,
      secondSlug,
      reasons,
      decision: "pending",
      rationale: "",
    })),
  };
}

function sourceCoordinate(x, y, size, transform) {
  const last = size - 1;
  switch (transform) {
    case "identity": return [x, y];
    case "rotate-90": return [y, last - x];
    case "rotate-180": return [last - x, last - y];
    case "rotate-270": return [last - y, x];
    case "mirror-x": return [last - x, y];
    case "mirror-y": return [x, last - y];
    case "mirror-diagonal": return [y, x];
    case "mirror-antidiagonal": return [last - y, last - x];
    default: throw new Error(`unknown visual QA transform: ${transform}`);
  }
}

function unionInkBounds(first, second, size) {
  let left = size;
  let top = size;
  let right = -1;
  let bottom = -1;
  const inkThreshold = 1 / 255;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = y * size + x;
      if (first[index] > inkThreshold || second[index] > inkThreshold) {
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (right === -1) return null;
  return {
    left: Math.max(0, left - 1),
    top: Math.max(0, top - 1),
    right: Math.min(size - 1, right + 1),
    bottom: Math.min(size - 1, bottom + 1),
  };
}

function buildCosineTable(size, hashSize) {
  return Array.from({ length: hashSize }, (_, frequency) =>
    Array.from({ length: size }, (_, coordinate) =>
      Math.cos(((2 * coordinate + 1) * frequency * Math.PI) / (2 * size))),
  );
}

function median(values) {
  if (values.length === 0) throw new Error("median requires at least one value");
  const sorted = [...values].sort((first, second) => first - second);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function normalizeText(value) {
  return typeof value === "string"
    ? value.normalize("NFKC").trim().toLocaleLowerCase("en-US")
    : "";
}

function canonicalJson(value) {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("approval record contains a non-finite number");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }
  throw new Error(`approval record contains unsupported ${typeof value}`);
}

function sameStringArray(first, second) {
  return Array.isArray(first)
    && Array.isArray(second)
    && first.length === second.length
    && first.every((value, index) => typeof value === "string" && value === second[index]);
}

function assertSquareDimensions(width, height) {
  if (!Number.isInteger(width) || width <= 0 || width !== height) {
    throw new Error(`visual QA raster must be square, received ${width}x${height}`);
  }
}

function assertSquareBuffer(values, size) {
  assertSquareDimensions(size, size);
  if (!values || values.length !== size * size) {
    throw new Error(`visual QA buffer length must be ${size * size}`);
  }
}
