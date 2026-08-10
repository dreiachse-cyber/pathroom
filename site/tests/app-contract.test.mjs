import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appUrl = new URL("../src/App.jsx", import.meta.url);

test("catalog URL state is restored on direct load and popstate", async () => {
  const source = await readFile(appUrl, "utf8");

  assert.match(source, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(source, /category: categoryIds\.has\(category\) \? category : "all"/);
  assert.match(source, /const handlePopState = \(\) => \{[\s\S]*?const next = readCatalogState\(\);[\s\S]*?setQuery\(next\.query\);[\s\S]*?setCategory\(next\.category\);[\s\S]*?setSort\(next\.sort\);/);
  assert.match(source, /window\.addEventListener\("popstate", handlePopState\)/);
  assert.match(source, /window\.removeEventListener\("popstate", handlePopState\)/);
});

test("save and copy use the same SVG serialization path", async () => {
  const source = await readFile(appUrl, "utf8");

  assert.match(source, /writeClipboard\(serializeIconSvg\(item\)\)/);
  assert.match(
    source,
    /triggerSvgDownload\(serializeIconSvg\(item\), `\$\{item\.slug\}\.svg`\)/,
  );
  assert.match(source, /return serializeSvgMarkup\(clone\.outerHTML, item\)/);
});

test("the active category stays visible when category or viewport changes", async () => {
  const source = await readFile(appUrl, "utf8");

  assert.match(source, /ref=\{categoryTabsRef\}/);
  assert.match(source, /ref=\{category === item\.id \? activeCategoryRef : null\}/);
  assert.match(source, /tabs\.scrollTo\(\{/);
  assert.match(source, /window\.addEventListener\("resize", alignActiveTab\)/);
  assert.match(source, /window\.removeEventListener\("resize", alignActiveTab\)/);
});
