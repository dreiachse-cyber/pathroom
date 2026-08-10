import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
let viteServer;
let catalogModule;
let svgModule;

const allowedAttributes = {
  svg: new Set([
    "xmlns",
    "width",
    "height",
    "viewBox",
    "fill",
    "stroke",
    "stroke-width",
    "stroke-linecap",
    "stroke-linejoin",
  ]),
  path: new Set(["d"]),
  circle: new Set(["cx", "cy", "r"]),
  ellipse: new Set(["cx", "cy", "rx", "ry"]),
  rect: new Set(["x", "y", "width", "height", "rx", "ry"]),
  line: new Set(["x1", "y1", "x2", "y2"]),
  polyline: new Set(["points"]),
  polygon: new Set(["points"]),
  g: new Set(),
};
const primitiveNames = new Set([
  "path",
  "circle",
  "ellipse",
  "rect",
  "line",
  "polyline",
  "polygon",
]);
const pathCommandArity = new Map(
  Object.entries({
    A: 7,
    C: 6,
    H: 1,
    L: 2,
    M: 2,
    Q: 4,
    S: 4,
    T: 2,
    V: 1,
    Z: 0,
  }).flatMap(([command, arity]) => [
    [command, arity],
    [command.toLowerCase(), arity],
  ]),
);
const numericAttributeNames = new Set([
  "cx",
  "cy",
  "height",
  "r",
  "rx",
  "ry",
  "width",
  "x",
  "x1",
  "x2",
  "y",
  "y1",
  "y2",
]);

test.before(async () => {
  viteServer = await createServer({
    root: siteRoot,
    configFile: false,
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { noDiscovery: true },
    appType: "custom",
  });
  catalogModule = await viteServer.ssrLoadModule("/src/catalog.jsx");
  svgModule = await viteServer.ssrLoadModule("/src/svg.js");
});

test.after(async () => {
  await viteServer?.close();
});

test("Originals render as safe 24px SVGs and all 240 geometries are unique", () => {
  const { catalog } = catalogModule;
  const hashes = new Map();

  assert.equal(catalog.length, 240);
  assert.equal(
    catalog.filter((item) => item.batch === "003").length,
    32,
  );
  assert.equal(
    catalog.filter((item) => item.batch === "004").length,
    32,
  );

  for (const item of catalog) {
    const markup = renderIcon(item);
    assert.equal(markup.includes("Paweł Kuna"), false);
    const parsed = parseSvgDocument(
      markup,
      item.collection === "pathroom-originals",
    );
    const normalizedGeometry = normalizeGeometry(parsed.elements);
    const hash = createHash("sha256")
      .update(normalizedGeometry, "utf8")
      .digest("hex");

    assert.equal(
      hashes.has(hash),
      false,
      `duplicate geometry: ${item.slug} and ${hashes.get(hash)}`,
    );
    hashes.set(hash, item.slug);

    if (item.collection === "pathroom-originals") {
      assertSvgContract(parsed, item.slug);

      const distributedMarkup = svgModule.serializeSvgMarkup(markup, item);
      const distributedDocument = parseSvgDocument(distributedMarkup, true);
      assert.equal(distributedDocument.comments.length, 1, item.slug);
      assert.match(distributedDocument.comments[0], /PATHROOM Original/);
      assertSvgContract(distributedDocument, item.slug);
    }
  }

  assert.equal(hashes.size, 240);
});

test("path data enforces commands, arity, content, and arc flags", () => {
  assert.doesNotThrow(() =>
    assertPath("M2 2 A4 4 0 0 1 10 10 Z", "valid-arc"),
  );
  assert.throws(
    () => assertPath("m2,2 l4,-4 h2 v3 c1,2 3,4 5,6 z", "relative"),
    /must start with M/,
  );

  assert.throws(() => assertPath("", "empty"), /must not be empty/);
  assert.throws(() => assertPath("M2 2 R4 4", "unknown"), /unsupported token/);
  assert.throws(() => assertPath("M2 2 L4", "arity"), /expects groups of 2/);
  assert.throws(() => assertPath("L2 2", "missing-move"), /must start with M/);
  assert.throws(
    () => assertPath("M2 2 A4 4 0 2 1 10 10", "arc-large-flag"),
    /large-arc-flag must be 0 or 1/,
  );
  assert.throws(
    () => assertPath("M2 2 A4 4 0 0 -1 10 10", "arc-sweep-flag"),
    /sweep-flag must be 0 or 1/,
  );
});

test("geometry normalization ignores path separators and primitive order", () => {
  const first = [
    element("svg"),
    element("path", { d: "M2 2 L4,4" }),
    element("circle", { cx: "8.0", cy: "8", r: "2" }),
  ];
  const equivalent = [
    element("svg"),
    element("circle", { r: "2.00", cy: "8.0", cx: "8" }),
    element("path", { d: "M 2,2   L 4 4" }),
  ];

  assert.equal(normalizeGeometry(first), normalizeGeometry(equivalent));
  assert.notEqual(
    normalizeGeometry(first),
    normalizeGeometry([...equivalent, element("line", { x1: "2", y1: "2", x2: "4", y2: "4" })]),
  );
});

test("XML-like validation rejects malformed generated SVG documents", () => {
  assert.throws(
    () => parseSvgDocument("<svg><path></svg>", false),
    /mismatched closing tag/,
  );
  assert.throws(
    () => parseSvgDocument("<svg></svg><svg></svg>", false),
    /multiple root elements/,
  );
  assert.throws(
    () => parseSvgDocument("<!-- bad--comment --><svg></svg>", false),
    /invalid XML comment/,
  );
  assert.throws(
    () => parseSvgDocument('<svg viewBox="0 0 24 24></svg>', false),
    /unterminated XML tag/,
  );
});

test("SVG notices use only the selected collection and reject unsafe comment fields", () => {
  const { catalog, collections } = catalogModule;
  const tabler = catalog.find((item) => item.collection === "tabler");
  const original = catalog.find(
    (item) => item.collection === "pathroom-originals",
  );
  const { buildSvgNotice, serializeSvgMarkup } = svgModule;

  const tablerNotice = buildSvgNotice(tabler);
  const originalNotice = buildSvgNotice(original);

  assert.match(tablerNotice, /Tabler Icons v3\.46\.0/);
  assert.match(tablerNotice, /THIRD_PARTY_NOTICES\.txt/);
  assert.doesNotMatch(tablerNotice, /PATHROOM Original/);
  assert.match(originalNotice, /PATHROOM Original/);
  assert.match(originalNotice, /PATHROOM_ORIGINALS_LICENSE\.txt/);
  assert.doesNotMatch(originalNotice, /Tabler Icons v3\.46\.0/);

  const markup = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
  assert.equal(
    serializeSvgMarkup(markup, tabler).split("\n")[1],
    markup,
  );

  const unsafeCommentCollections = {
    ...collections,
    tabler: { ...collections.tabler, svgComment: "bad--comment" },
  };
  assert.throws(
    () => buildSvgNotice(tabler, unsafeCommentCollections),
    /unsafe XML comment value/,
  );

  for (const field of ["licenseName", "copyrightHolder"]) {
    const unsafeFieldCollections = {
      ...collections,
      tabler: { ...collections.tabler, [field]: "bad--field" },
    };
    assert.throws(
      () => buildSvgNotice(tabler, unsafeFieldCollections),
      /unsafe XML comment value/,
    );
  }

  const unsafeUrlCollections = {
    ...collections,
    tabler: { ...collections.tabler, publicLicenseUrl: "https://bad-" },
  };
  assert.throws(
    () => buildSvgNotice(tabler, unsafeUrlCollections),
    /unsafe XML comment value/,
  );
});

test("all Originals serialize as well-formed SVGs with only their own notice", () => {
  const { catalog } = catalogModule;
  const { serializeSvgMarkup } = svgModule;
  const originals = catalog.filter(
    (item) => item.collection === "pathroom-originals",
  );

  assert.equal(originals.length, 120);

  for (const item of originals) {
    const serialized = serializeSvgMarkup(renderIcon(item), item);
    const commentMatch = serialized.match(/^<!-- ([\s\S]*?) -->\n/);

    assert.ok(commentMatch, `${item.slug} is missing its XML notice`);
    assert.doesNotMatch(commentMatch[1], /--/);
    assert.match(commentMatch[1], /PATHROOM Original/);
    assert.match(commentMatch[1], /Copyright \(c\) 2026 PATHROOM/);
    assert.match(commentMatch[1], /PATHROOM_ORIGINALS_LICENSE\.txt/);
    assert.doesNotMatch(commentMatch[1], /Tabler Icons|Paweł Kuna/);

    const svgMarkup = serialized.slice(commentMatch[0].length);
    const parsed = parseSvgDocument(svgMarkup, true);
    assertSvgContract(parsed, item.slug);
  }
});

function renderIcon(item) {
  return renderToStaticMarkup(
    React.createElement(item.Icon, { size: 24, stroke: 2 }),
  );
}

function parseSvgDocument(markup, strict) {
  assert.equal(typeof markup, "string");
  assert.ok(markup.length > 0, "SVG document must not be empty");

  const elements = [];
  const comments = [];
  const stack = [];
  let rootName = "";
  let rootClosed = false;
  let cursor = 0;

  while (cursor < markup.length) {
    const nextTag = markup.indexOf("<", cursor);
    if (nextTag === -1) {
      assert.equal(markup.slice(cursor).trim(), "", "text outside SVG root");
      break;
    }

    assert.equal(
      markup.slice(cursor, nextTag).trim(),
      "",
      "SVG document contains unexpected text",
    );
    cursor = nextTag;

    if (markup.startsWith("<!--", cursor)) {
      const commentEnd = markup.indexOf("-->", cursor + 4);
      assert.notEqual(commentEnd, -1, "unterminated XML comment");
      const comment = markup.slice(cursor + 4, commentEnd);
      assert.equal(
        comment.includes("--") || comment.endsWith("-"),
        false,
        "invalid XML comment",
      );
      comments.push(comment.trim());
      cursor = commentEnd + 3;
      continue;
    }

    assert.equal(
      /^<!(?:DOCTYPE|\[CDATA\[)/i.test(markup.slice(cursor)),
      false,
      "DOCTYPE and CDATA are not allowed in generated SVG",
    );
    assert.equal(
      markup.startsWith("<?", cursor),
      false,
      "processing instructions are not allowed in generated SVG",
    );

    const tagEnd = findTagEnd(markup, cursor);
    const rawTag = markup.slice(cursor, tagEnd + 1);
    cursor = tagEnd + 1;

    if (rawTag.startsWith("</")) {
      const closingMatch = rawTag.match(/^<\/([A-Za-z][A-Za-z0-9:_-]*)\s*>$/);
      assert.ok(closingMatch, `invalid closing tag: ${rawTag}`);
      const expected = stack.pop();
      assert.equal(
        closingMatch[1],
        expected,
        `mismatched closing tag: expected ${expected || "none"}, got ${closingMatch[1]}`,
      );
      if (stack.length === 0) rootClosed = true;
      continue;
    }

    const inner = rawTag.slice(1, -1);
    const selfClosing = /\/\s*$/.test(inner);
    const openingSource = selfClosing ? inner.replace(/\/\s*$/, "") : inner;
    const openingMatch = openingSource.match(
      /^([A-Za-z][A-Za-z0-9:_-]*)([\s\S]*)$/,
    );
    assert.ok(openingMatch, `invalid opening tag: ${rawTag}`);
    const name = openingMatch[1];
    const attributeSource = openingMatch[2];
    assert.ok(
      attributeSource === "" || /^\s/.test(attributeSource),
      `missing whitespace before attributes on ${name}`,
    );

    if (stack.length === 0) {
      assert.equal(rootClosed, false, "multiple root elements are not allowed");
      assert.equal(rootName, "", "multiple root elements are not allowed");
      rootName = name;
    }

    if (strict && !allowedAttributes[name]) {
      throw new Error(`unknown SVG element: ${name}`);
    }

    const attributes = parseAttributes(attributeSource, name);
    if (strict) {
      for (const attribute of attributes.keys()) {
        assert.equal(
          allowedAttributes[name].has(attribute),
          true,
          `unknown attribute ${attribute} on ${name}`,
        );
      }
    }
    elements.push({ name, attributes });

    if (!selfClosing) {
      stack.push(name);
    } else if (stack.length === 0) {
      rootClosed = true;
    }
  }

  assert.equal(stack.length, 0, `unclosed XML tag: ${stack.at(-1)}`);
  assert.equal(rootName, "svg", "root element must be svg");
  assert.equal(rootClosed, true, "SVG root was not closed");
  assert.equal(elements.filter((element) => element.name === "svg").length, 1);
  return { comments, elements };
}

function parseAttributes(source, elementName) {
  const attributes = new Map();
  const pattern = /([A-Za-z_:][A-Za-z0-9:_.-]*)\s*=\s*(["'])(.*?)\2/y;
  let cursor = 0;

  while (cursor < source.length) {
    const whitespace = /^\s+/.exec(source.slice(cursor));
    if (whitespace) cursor += whitespace[0].length;
    if (cursor >= source.length) break;

    pattern.lastIndex = cursor;
    const match = pattern.exec(source);
    assert.ok(match, `unparsed attribute source on ${elementName}`);
    assert.equal(
      attributes.has(match[1]),
      false,
      `duplicate attribute ${match[1]} on ${elementName}`,
    );
    assert.equal(
      /[<&]/.test(match[3]),
      false,
      `unescaped XML character in ${match[1]} on ${elementName}`,
    );
    attributes.set(match[1], match[3]);
    cursor = pattern.lastIndex;
  }

  return attributes;
}

function findTagEnd(markup, start) {
  let quote = "";

  for (let index = start + 1; index < markup.length; index += 1) {
    const character = markup[index];
    if (quote) {
      if (character === quote) quote = "";
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === ">") {
      return index;
    }
  }

  throw new Error("unterminated XML tag");
}

function assertSvgContract({ elements }, slug) {
  const svg = elements[0].attributes;
  assert.equal(svg.get("xmlns"), "http://www.w3.org/2000/svg", slug);
  assert.equal(svg.get("width"), "24", slug);
  assert.equal(svg.get("height"), "24", slug);
  assert.equal(svg.get("viewBox"), "0 0 24 24", slug);
  assert.equal(svg.get("fill"), "none", slug);
  assert.equal(svg.get("stroke"), "currentColor", slug);
  assert.equal(svg.get("stroke-width"), "2", slug);
  assert.equal(svg.get("stroke-linecap"), "round", slug);
  assert.equal(svg.get("stroke-linejoin"), "round", slug);

  const primitives = elements.filter((element) => primitiveNames.has(element.name));
  assert.ok(primitives.length > 0, `${slug} is empty`);
  assert.ok(primitives.length <= 8, `${slug} has too many primitives`);

  for (const element of primitives) {
    assertPrimitiveBounds(element, slug);
    if (element.name === "path") {
      assertPath(element.attributes.get("d"), slug);
    }
  }
}

function assertPrimitiveBounds({ name, attributes }, slug) {
  const number = (key) => Number(attributes.get(key));
  const assertRange = (value, label) => {
    assert.equal(Number.isFinite(value), true, `${slug} ${label} is not numeric`);
    assert.ok(value >= 2 && value <= 22, `${slug} ${label} is outside 2..22`);
  };

  if (name === "circle") {
    assertRange(number("cx") - number("r"), "circle left");
    assertRange(number("cx") + number("r"), "circle right");
    assertRange(number("cy") - number("r"), "circle top");
    assertRange(number("cy") + number("r"), "circle bottom");
  } else if (name === "ellipse") {
    assertRange(number("cx") - number("rx"), "ellipse left");
    assertRange(number("cx") + number("rx"), "ellipse right");
    assertRange(number("cy") - number("ry"), "ellipse top");
    assertRange(number("cy") + number("ry"), "ellipse bottom");
  } else if (name === "rect") {
    assertRange(number("x"), "rect left");
    assertRange(number("y"), "rect top");
    assertRange(number("x") + number("width"), "rect right");
    assertRange(number("y") + number("height"), "rect bottom");
  } else if (name === "line") {
    assertRange(number("x1"), "line x1");
    assertRange(number("y1"), "line y1");
    assertRange(number("x2"), "line x2");
    assertRange(number("y2"), "line y2");
  } else if (name === "polyline" || name === "polygon") {
    const points = extractNumbers(attributes.get("points"));
    assert.equal(points.length % 2, 0, `${slug} has invalid points`);
    points.forEach((value) => assertRange(value, `${name} point`));
  }
}

function assertPath(d, slug) {
  assert.equal(typeof d, "string");
  assert.ok(d.trim().length > 0, `${slug} path d must not be empty`);
  assert.ok(d.length <= 320, `${slug} path d is over 320 characters`);

  const segments = parsePathSegments(d, slug);
  assert.equal(segments[0].command, "M", `${slug} path must start with M`);

  for (const segment of segments) {
    assert.match(
      segment.command,
      /^[A-Z]$/,
      `${slug} path must use uppercase commands`,
    );
    validatePathSegment(segment, slug);
  }
}

function extractNumbers(value) {
  return (value.match(/-?(?:\d+(?:\.\d+)?|\.\d+)/g) || []).map(Number);
}

function normalizeGeometry(elements) {
  return elements
    .filter((element) => element.name !== "svg")
    .map((element) => {
      const attrs = [...element.attributes.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${normalizeAttribute(key, value)}`)
        .join(";");
      return `${element.name}[${attrs}]`;
    })
    .sort()
    .join("|");
}

function parsePathSegments(d, slug) {
  const tokens = tokenizePathData(d, slug);
  const segments = [];
  let command = "";
  let values = [];

  const flush = () => {
    if (!command) return;
    const arity = pathCommandArity.get(command);
    assert.notEqual(arity, undefined, `${slug} path command ${command} is not allowed`);
    if (arity === 0) {
      assert.equal(values.length, 0, `${slug} path command ${command} takes no arguments`);
    } else {
      assert.ok(values.length > 0, `${slug} path command ${command} has no arguments`);
      assert.equal(
        values.length % arity,
        0,
        `${slug} path command ${command} expects groups of ${arity} arguments`,
      );
    }
    segments.push({ command, values });
    command = "";
    values = [];
  };

  for (const token of tokens) {
    if (pathCommandArity.has(token)) {
      flush();
      command = token;
      if (pathCommandArity.get(command) === 0) flush();
    } else {
      assert.notEqual(command, "", `${slug} path starts with a number`);
      values.push(Number(token));
    }
  }
  flush();

  assert.ok(segments.length > 0, `${slug} path d must contain commands`);
  return segments;
}

function tokenizePathData(d, slug) {
  const tokens = [];
  const tokenPattern = /^(?:([AaCcHhLlMmQqSsTtVvZz])|([+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d+)?))/;
  let cursor = 0;

  while (cursor < d.length) {
    const separator = /^[\s,]+/.exec(d.slice(cursor));
    if (separator) cursor += separator[0].length;
    if (cursor >= d.length) break;

    const match = tokenPattern.exec(d.slice(cursor));
    assert.ok(match, `${slug} path contains unsupported token at ${cursor}`);
    tokens.push(match[1] || match[2]);
    cursor += match[0].length;
  }

  return tokens;
}

function validatePathSegment({ command, values }, slug) {
  const upperCommand = command.toUpperCase();
  const arity = pathCommandArity.get(command);

  for (let offset = 0; offset < values.length; offset += arity) {
    const group = values.slice(offset, offset + arity);
    group.forEach((value) =>
      assert.equal(Number.isFinite(value), true, `${slug} path value is not finite`),
    );

    if (upperCommand === "A") {
      assert.ok(group[0] >= 0, `${slug} arc rx must not be negative`);
      assert.ok(group[1] >= 0, `${slug} arc ry must not be negative`);
      assert.ok(
        group[3] === 0 || group[3] === 1,
        `${slug} arc large-arc-flag must be 0 or 1`,
      );
      assert.ok(
        group[4] === 0 || group[4] === 1,
        `${slug} arc sweep-flag must be 0 or 1`,
      );
    }

    if (command === upperCommand) {
      const coordinateValues = upperCommand === "A"
        ? [group[5], group[6]]
        : upperCommand === "H" || upperCommand === "V"
          ? group
          : group;
      coordinateValues.forEach((value) => {
        assert.ok(value >= 2 && value <= 22, `${slug} path value is outside 2..22`);
      });
    }
  }
}

function normalizeAttribute(name, value) {
  if (name === "d") {
    return tokenizePathData(value, "geometry normalization")
      .map((token) => pathCommandArity.has(token) ? token : normalizeNumber(token))
      .join(" ");
  }
  if (name === "points") {
    return extractNumbers(value).map(normalizeNumber).join(",");
  }
  if (numericAttributeNames.has(name)) {
    return normalizeNumber(value);
  }
  return value.trim().replace(/\s+/g, " ");
}

function normalizeNumber(value) {
  const number = Number(value);
  assert.equal(Number.isFinite(number), true, `invalid numeric geometry value: ${value}`);
  return Object.is(number, -0) ? "0" : String(number);
}

function element(name, attributes = {}) {
  return { name, attributes: new Map(Object.entries(attributes)) };
}
