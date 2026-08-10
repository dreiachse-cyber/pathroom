import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appUrl = new URL("../src/App.jsx", import.meta.url);
const stylesUrl = new URL("../src/styles.css", import.meta.url);

test("category and collection URL state are restored independently", async () => {
  const source = await readFile(appUrl, "utf8");

  assert.match(source, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(source, /const requestedCategory = params\.get\("category"\)/);
  assert.match(source, /const requestedCollection = params\.get\("collection"\)/);
  assert.match(source, /const isLegacyOriginalsLink = requestedCategory === "originals"/);
  assert.match(source, /category: categoryIds\.has\(category\) \? category : "all"/);
  assert.match(source, /collection: collectionIds\.has\(collection\) \? collection : "all"/);
  assert.match(source, /const handlePopState = \(\) => \{[\s\S]*?const next = readCatalogState\(\);[\s\S]*?setQuery\(next\.query\);[\s\S]*?setCategory\(next\.category\);[\s\S]*?setCollection\(next\.collection\);[\s\S]*?setSort\(next\.sort\);/);
  assert.match(source, /window\.addEventListener\("popstate", handlePopState\)/);
  assert.match(source, /window\.removeEventListener\("popstate", handlePopState\)/);
  assert.match(source, /params\.set\("category", category\)/);
  assert.match(source, /params\.set\("collection", collection\)/);
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

test("desktop category tabs and the mobile compact select share semantic options", async () => {
  const [source, styles] = await Promise.all([
    readFile(appUrl, "utf8"),
    readFile(stylesUrl, "utf8"),
  ]);

  assert.match(source, /categories\.filter\([\s\S]*?category\.id !== "originals"/);
  assert.match(source, /className="collection-filter"[\s\S]*?aria-label="コレクション"/);
  assert.match(source, /className="category-tabs"[\s\S]*?semanticCategories\.map/);
  assert.match(source, /className="category-select"[\s\S]*?<select[\s\S]*?semanticCategories\.map/);
  assert.match(styles, /\.category-select \{\s*display: none;/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.category-tabs \{\s*display: none;[\s\S]*?\.category-select \{\s*display: flex;/);
});

test("every catalog state change resets paging, including collection", async () => {
  const source = await readFile(appUrl, "utf8");

  assert.match(source, /setVisibleLimit\(PAGE_SIZE\);\s*\}, \[category, collection, query, sort\]\)/);
  assert.match(source, /merged\.collection === current\.collection/);
  assert.match(source, /setCollection\(merged\.collection\)/);
});

test("the floating Steam promotion is base-aware, dismissible, and accessible", async () => {
  const [source, styles] = await Promise.all([
    readFile(appUrl, "utf8"),
    readFile(stylesUrl, "utf8"),
  ]);

  assert.match(source, /className="floating-steam-ad" aria-label="プロモーション"/);
  assert.match(source, /aria-label="プロモーションを閉じる"/);
  assert.match(source, /href=\{STEAM_STORE_URL\}/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.match(
    source,
    /src=\{`\$\{import\.meta\.env\.BASE_URL\}promos\/youtou-pixel\/\$\{steamPromoImage\.fileName\}`\}/,
  );
  assert.match(source, /width="1600"[\s\S]*?height="320"/);
  assert.match(source, /fetchPriority="low"/);
  assert.match(source, /persistSteamPromoDismissal\(\)/);
  assert.match(source, /has-floating-steam-ad/);

  assert.match(styles, /\.floating-steam-ad \{[\s\S]*?position: fixed;/);
  assert.match(styles, /aspect-ratio: 5 \/ 1;/);
  assert.match(styles, /env\(safe-area-inset-bottom\)/);
  assert.match(
    styles,
    /\.pathroom-app\.has-floating-steam-ad \.action-error \{[\s\S]*?bottom:/,
  );
  assert.match(styles, /@media print[\s\S]*?\.floating-steam-ad \{[\s\S]*?display: none/);
});
