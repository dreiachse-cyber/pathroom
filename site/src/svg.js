import { collections } from "./catalog.jsx";

const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f-\u009f]/;

export function assertSafeXmlCommentField(value, fieldName = "value") {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${fieldName} must be a non-empty string`);
  }

  if (
    CONTROL_CHARACTER_PATTERN.test(value) ||
    value.includes("--") ||
    value.endsWith("-")
  ) {
    throw new Error(`${fieldName} contains an unsafe XML comment value`);
  }

  return value;
}

export function buildSvgNotice(item, collectionDefinitions = collections) {
  const collection = collectionDefinitions[item.collection];

  if (!collection) {
    throw new Error(`Unknown icon collection: ${item.collection}`);
  }

  assertSafeXmlCommentField(collection.licenseName, "licenseName");
  assertSafeXmlCommentField(collection.copyrightHolder, "copyrightHolder");
  assertSafeXmlCommentField(collection.svgComment, "svgComment");
  assertSafeXmlCommentField(collection.publicLicenseUrl, "publicLicenseUrl");

  return `<!-- ${collection.svgComment} | License: ${collection.publicLicenseUrl} -->`;
}

export function serializeSvgMarkup(svgMarkup, item, collectionDefinitions) {
  if (typeof svgMarkup !== "string" || svgMarkup.length === 0) {
    throw new Error("SVG markup must be a non-empty string");
  }

  return `${buildSvgNotice(item, collectionDefinitions)}\n${svgMarkup}`;
}
