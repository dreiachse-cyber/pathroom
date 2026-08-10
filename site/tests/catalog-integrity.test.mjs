import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createServer } from "vite";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
let viteServer;
let catalogModule;
let originalsModule;
let batch003CatalogModule;
let batch003RegistryModule;
let searchModule;

test.before(async () => {
  viteServer = await createServer({
    root: siteRoot,
    configFile: false,
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { noDiscovery: true },
    appType: "custom",
  });
  catalogModule = await viteServer.ssrLoadModule("/src/catalog.jsx");
  originalsModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/index.js",
  );
  batch003CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-003-catalog.js",
  );
  batch003RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-003-registry.js",
  );
  searchModule = await viteServer.ssrLoadModule("/src/search.js");
});

test.after(async () => {
  await viteServer?.close();
});

test("the real catalog has the required shape and fixed collection counts", () => {
  const { catalog, categories, collections, originalsCatalog } = catalogModule;
  const allowedCategories = new Set([
    "ui",
    "arrows",
    "files",
    "media",
    "commerce",
    "communication",
    "data",
    "devices",
  ]);
  const slugs = new Set();
  const normalizedNames = new Set();

  assert.equal(catalog.length, 208);
  assert.equal(catalog.filter((item) => item.collection === "tabler").length, 120);
  assert.equal(
    catalog.filter((item) => item.collection === "pathroom-originals").length,
    88,
  );
  assert.equal(originalsCatalog.length, 88);
  assert.deepEqual(
    categories.map((category) => category.id),
    [
      "all",
      "ui",
      "arrows",
      "files",
      "media",
      "commerce",
      "communication",
      "data",
      "devices",
      "originals",
    ],
  );

  for (const category of ["commerce", "communication", "data", "devices"]) {
    const items = catalog.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain exactly 8 items`);
    assert.ok(
      items.every((item) => item.createdAt === "2026-08-10"),
      `${category} must belong to Batch 002`,
    );
    assert.ok(
      items.every((item) => Object.isFrozen(item.tags)),
      `${category} tags must be frozen batch metadata`,
    );
  }

  const batch003Items = originalsCatalog.filter((item) => item.batch === "003");
  assert.equal(batch003Items.length, 32);
  for (const category of ["ui", "arrows", "files", "media"]) {
    const items = batch003Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 003 items`);
    assert.ok(
      items.every((item) => item.createdAt === "2026-08-10"),
      `${category} must belong to Batch 003`,
    );
    assert.ok(
      items.every((item) => Object.isFrozen(item.tags)),
      `${category} tags must be frozen Batch 003 metadata`,
    );
  }

  const batchCounts = originalsCatalog.reduce((counts, item) => {
    assert.match(item.batch, /^\d{3}$/, `${item.slug} has an invalid batch`);
    counts[item.batch] = (counts[item.batch] || 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(batchCounts, { "001": 24, "002": 32, "003": 32 });

  const familyItems = originalsCatalog.filter(
    (item) => item.family === "indent-control",
  );
  assert.equal(familyItems.length, 2);
  assert.deepEqual(
    familyItems.map((item) => item.slug),
    ["indent-increase", "indent-decrease"],
  );
  assert.ok(familyItems.every((item) => item.batch === "003"));

  for (const item of catalog) {
    assert.equal(typeof item.slug, "string");
    assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(typeof item.name, "string");
    assert.match(item.name, /^[A-Za-z0-9]+(?:[A-Za-z0-9 ]*[A-Za-z0-9])?$/);
    assert.equal(typeof item.nameJa, "string");
    assert.ok(item.nameJa.length > 0);
    assert.ok(allowedCategories.has(item.category));
    assert.ok(collections[item.collection]);
    assert.ok(Array.isArray(item.tags) && item.tags.length > 0);
    assert.match(item.createdAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(Number.isNaN(Date.parse(item.createdAt)), false);

    assert.equal(slugs.has(item.slug), false, `duplicate slug: ${item.slug}`);
    slugs.add(item.slug);

    const normalizedName = item.name.toLocaleLowerCase("en").replace(/[^a-z0-9]+/g, " ").trim();
    assert.equal(
      normalizedNames.has(normalizedName),
      false,
      `duplicate English name: ${item.name}`,
    );
    normalizedNames.add(normalizedName);

    assert.ok(
      typeof item.Icon === "function" ||
        (typeof item.Icon === "object" && item.Icon !== null),
      `not renderable: ${item.slug}`,
    );
    assert.doesNotThrow(() =>
      renderToStaticMarkup(
        React.createElement(item.Icon, { size: 24, stroke: 2 }),
      ),
    );
  }
});

test("the first 48 featured items remain unchanged", () => {
  const expected = [
    "search",
    "arrow-up",
    "folder",
    "bell",
    "user",
    "download",
    "home",
    "settings",
    "mail",
    "calendar",
    "trash",
    "edit",
    "star",
    "heart",
    "check-circle",
    "info-circle",
    "menu",
    "close",
    "arrow-down",
    "arrow-left",
    "arrow-right",
    "upload",
    "file",
    "bookmark",
    "clock",
    "plus",
    "external-link",
    "link",
    "eye",
    "lock",
    "unlock",
    "camera",
    "photo",
    "music",
    "play",
    "pause",
    "volume",
    "mute",
    "cloud",
    "sun",
    "moon",
    "map-pin",
    "phone",
    "message",
    "send",
    "share",
    "refresh",
    "filter",
  ];

  assert.deepEqual(
    catalogModule.catalog.slice(0, 48).map((item) => item.slug),
    expected,
  );
});

test("the complete 144-item public baseline remains unchanged", () => {
  const digest = createHash("sha256")
    .update(
      catalogModule.catalog
        .slice(0, 144)
        .map((item) => item.slug)
        .join("\n"),
    )
    .digest("hex");

  assert.equal(
    digest,
    "76142ae798654fc3adb74f8c5d09d5a2d074339d813ca2323bc141669ea4b17c",
  );
});

test("the Batch 002 176-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(
      catalogModule.catalog
        .slice(0, 176)
        .map((item) => item.slug)
        .join("\n"),
    )
    .digest("hex");

  assert.equal(
    digest,
    "f5714faa89e23b84a8f66ccbf64d9510ed06efa201c59f169bbfb32fde37305b",
  );
});

test("the Batch 003 208-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(catalogModule.catalog.map((item) => item.slug).join("\n"))
    .digest("hex");

  assert.equal(
    catalogModule.catalog.length,
    208,
    "Batch 003 release must contain exactly 208 items",
  );
  assert.equal(
    digest,
    "8ba93f58aa80bcf9c3d5f19032986dcb7f5d87935cc1b61745c20571d472c54c",
  );
});

test("Batch 002 categories are discoverable with bilingual search terms", () => {
  const { catalog } = catalogModule;
  const { filterCatalog } = searchModule;
  const expectations = new Map([
    ["commerce", "コマース"],
    ["communication", "コミュニケーション"],
    ["data", "データ"],
    ["devices", "デバイス"],
  ]);

  for (const [category, query] of expectations) {
    assert.equal(filterCatalog(catalog, { category }).length, 8, category);
    assert.equal(filterCatalog(catalog, { category, query }).length, 8, query);
  }
});

test("Batch 003 categories are discoverable with bilingual search terms", () => {
  const { catalog } = catalogModule;
  const { filterCatalog } = searchModule;
  const batch003Items = catalog.filter((item) => item.batch === "003");

  assert.equal(batch003Items.length, 32);
  for (const category of ["ui", "arrows", "files", "media"]) {
    assert.equal(
      filterCatalog(batch003Items, { category }).length,
      8,
      category,
    );
    assert.equal(
      filterCatalog(batch003Items, { category, query: category }).length,
      8,
      `${category} English search`,
    );
  }

  for (const item of batch003Items) {
    assert.equal(
      filterCatalog(batch003Items, {
        category: item.category,
        query: item.name,
      }).some((match) => match.slug === item.slug),
      true,
      `${item.slug} English name search`,
    );
    assert.equal(
      filterCatalog(batch003Items, {
        category: item.category,
        query: item.nameJa,
      }).some((match) => match.slug === item.slug),
      true,
      `${item.slug} Japanese name search`,
    );
  }

  assert.equal(
    filterCatalog(batch003Items, { query: "file-shield" }).some(
      (item) => item.slug === "file-shield",
    ),
    true,
    "compound slug terms must remain searchable through metadata",
  );
});

test("Batch 003 manifest and registry are frozen, aligned, and unique", () => {
  const { batch003Catalog } = batch003CatalogModule;
  const { batch003Icons } = batch003RegistryModule;
  const registryKeys = Object.keys(batch003Icons);
  const registryIcons = Object.values(batch003Icons);
  const displayNames = registryIcons.map((Icon) => Icon.displayName);

  assert.equal(batch003Catalog.length, 32);
  assert.equal(registryKeys.length, 32);
  assert.ok(Object.isFrozen(batch003Catalog));
  assert.ok(Object.isFrozen(batch003Icons));
  assert.ok(
    batch003Catalog.every(
      (item) => Object.isFrozen(item) && Object.isFrozen(item.tags),
    ),
    "Batch 003 manifest metadata must be deeply frozen",
  );
  assert.deepEqual(
    registryKeys,
    batch003Catalog.map((item) => item.slug),
  );
  assert.equal(new Set(registryKeys).size, 32);
  assert.equal(new Set(batch003Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch003Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(registryIcons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(
    displayNames.every(
      (displayName) =>
        typeof displayName === "string" &&
        /^IconPathroom[A-Za-z0-9]+$/.test(displayName),
    ),
    "Batch 003 icon display names must be explicit Pathroom names",
  );
});

test("Original registry keys and display names are unique", () => {
  const { catalog } = awaitCatalogModule();
  const { pathroomOriginalIcons } = originalsModule;
  const originalItems = catalog.filter(
    (item) => item.collection === "pathroom-originals",
  );
  const registryKeys = Object.keys(pathroomOriginalIcons);
  const displayNames = originalItems.map((item) => item.Icon.displayName);

  assert.equal(registryKeys.length, 88);
  assert.deepEqual(
    new Set(originalItems.map((item) => item.slug)),
    new Set(registryKeys),
  );
  assert.equal(new Set(displayNames).size, 88);
});

function awaitCatalogModule() {
  return catalogModule;
}
