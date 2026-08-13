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
let batch004CatalogModule;
let batch004RegistryModule;
let batch005CatalogModule;
let batch005RegistryModule;
let batch006CatalogModule;
let batch006RegistryModule;
let batch007CatalogModule;
let batch007RegistryModule;
let batch008CatalogModule;
let batch008RegistryModule;
let batch009CatalogModule;
let batch009RegistryModule;
let batch010CatalogModule;
let batch010RegistryModule;
let batch011CatalogModule;
let batch011RegistryModule;
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
  batch004CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-004-catalog.js",
  );
  batch004RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-004-registry.js",
  );
  batch005CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-005-catalog.js",
  );
  batch005RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-005-registry.js",
  );
  batch006CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-006-catalog.js",
  );
  batch006RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-006-registry.js",
  );
  batch007CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-007-catalog.js",
  );
  batch007RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-007-registry.js",
  );
  batch008CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-008-catalog.js",
  );
  batch008RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-008-registry.js",
  );
  batch009CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-009-catalog.js",
  );
  batch009RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-009-registry.js",
  );
  batch010CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-010-catalog.js",
  );
  batch010RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-010-registry.js",
  );
  batch011CatalogModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-011-catalog.js",
  );
  batch011RegistryModule = await viteServer.ssrLoadModule(
    "/src/icons/pathroom-originals/batch-011-registry.js",
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
    "people",
    "data",
    "devices",
    "status",
    "maps",
    "time",
  ]);
  const slugs = new Set();
  const normalizedNames = new Set();

  assert.equal(catalog.length, 464);
  assert.equal(catalog.filter((item) => item.collection === "tabler").length, 120);
  assert.equal(
    catalog.filter((item) => item.collection === "pathroom-originals").length,
    344,
  );
  assert.equal(originalsCatalog.length, 344);
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
      "people",
      "data",
      "devices",
      "status",
      "maps",
      "time",
    ],
  );

  const batch002Items = originalsCatalog.filter((item) => item.batch === "002");
  for (const category of ["commerce", "communication", "data", "devices"]) {
    const items = batch002Items.filter((item) => item.category === category);
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

  const batch004Items = originalsCatalog.filter((item) => item.batch === "004");
  assert.equal(batch004Items.length, 32);
  for (const category of ["data", "commerce", "maps", "time"]) {
    const items = batch004Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 004 items`);
    assert.ok(
      items.every((item) => item.createdAt === "2026-08-10"),
      `${category} must belong to Batch 004`,
    );
    assert.ok(
      items.every((item) => Object.isFrozen(item.tags)),
      `${category} tags must be frozen Batch 004 metadata`,
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

  const batch005Items = originalsCatalog.filter((item) => item.batch === "005");
  assert.equal(batch005Items.length, 32);
  for (const category of ["communication", "people", "devices", "status"]) {
    const items = batch005Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 005 items`);
    assert.ok(
      items.every((item) => item.createdAt === "2026-08-13"),
      `${category} must belong to Batch 005`,
    );
    assert.ok(
      items.every((item) => Object.isFrozen(item.tags)),
      `${category} tags must be frozen Batch 005 metadata`,
    );
  }

  const batch006Items = originalsCatalog.filter((item) => item.batch === "006");
  assert.equal(batch006Items.length, 32);
  for (const category of ["people", "status", "maps", "time"]) {
    const items = batch006Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 006 items`);
    assert.ok(items.every((item) => item.createdAt === "2026-08-13"));
    assert.ok(items.every((item) => Object.isFrozen(item.tags)));
  }

  const batch007Items = originalsCatalog.filter((item) => item.batch === "007");
  assert.equal(batch007Items.length, 32);
  for (const category of ["ui", "arrows", "files", "media"]) {
    const items = batch007Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 007 items`);
    assert.ok(items.every((item) => item.createdAt === "2026-08-13"));
    assert.ok(items.every((item) => Object.isFrozen(item.tags)));
  }

  const batch008Items = originalsCatalog.filter((item) => item.batch === "008");
  assert.equal(batch008Items.length, 32);
  for (const category of ["commerce", "status", "ui", "arrows"]) {
    const items = batch008Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 008 items`);
    assert.ok(items.every((item) => item.createdAt === "2026-08-13"));
    assert.ok(items.every((item) => Object.isFrozen(item.tags)));
  }

  const batch009Items = originalsCatalog.filter((item) => item.batch === "009");
  assert.equal(batch009Items.length, 32);
  for (const category of ["data", "devices", "people", "maps"]) {
    const items = batch009Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 009 items`);
    assert.ok(items.every((item) => item.createdAt === "2026-08-13"));
    assert.ok(items.every((item) => Object.isFrozen(item.tags)));
  }

  const batch010Items = originalsCatalog.filter((item) => item.batch === "010");
  assert.equal(batch010Items.length, 32);
  for (const category of ["commerce", "time", "files", "media"]) {
    const items = batch010Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 010 items`);
    assert.ok(items.every((item) => item.createdAt === "2026-08-13"));
    assert.ok(items.every((item) => Object.isFrozen(item.tags)));
  }

  const batch011Items = originalsCatalog.filter((item) => item.batch === "011");
  assert.equal(batch011Items.length, 32);
  for (const category of ["communication", "people", "files", "time"]) {
    const items = batch011Items.filter((item) => item.category === category);
    assert.equal(items.length, 8, `${category} must contain 8 Batch 011 items`);
    assert.ok(items.every((item) => item.createdAt === "2026-08-13"));
    assert.ok(items.every((item) => Object.isFrozen(item.tags)));
  }

  const batchCounts = originalsCatalog.reduce((counts, item) => {
    assert.match(item.batch, /^\d{3}$/, `${item.slug} has an invalid batch`);
    counts[item.batch] = (counts[item.batch] || 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(batchCounts, {
    "001": 24,
    "002": 32,
    "003": 32,
    "004": 32,
    "005": 32,
    "006": 32,
    "007": 32,
    "008": 32,
    "009": 32,
    "010": 32,
    "011": 32,
  });

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
    .update(
      catalogModule.catalog
        .slice(0, 208)
        .map((item) => item.slug)
        .join("\n"),
    )
    .digest("hex");

  assert.equal(
    digest,
    "8ba93f58aa80bcf9c3d5f19032986dcb7f5d87935cc1b61745c20571d472c54c",
  );
});

test("the Batch 004 240-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(
      catalogModule.catalog
        .slice(0, 240)
        .map((item) => item.slug)
        .join("\n"),
    )
    .digest("hex");

  assert.equal(
    catalogModule.catalog.slice(0, 240).length,
    240,
    "Batch 004 release must contain exactly 240 items",
  );
  assert.equal(
    digest,
    "fd0058975e343f8b3ca94a06f84a5c6e36c65b6f032e621221ae98c0a1e9d1d6",
  );
});

test("the Batch 005 272-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(catalogModule.catalog.slice(0, 272).map((item) => item.slug).join("\n"))
    .digest("hex");

  assert.equal(catalogModule.catalog.slice(0, 272).length, 272);
  assert.equal(
    digest,
    "19c22da895ea07a67ab3449a1992ec68a30a4b422efa67c06d8aaabe186529a0",
  );
});

test("the Batch 006 304-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(catalogModule.catalog.slice(0, 304).map((item) => item.slug).join("\n"))
    .digest("hex");

  assert.equal(catalogModule.catalog.slice(0, 304).length, 304);
  assert.equal(
    digest,
    "7fee2b83e2c2d46024a50da617bd8b014d7dc82a5f9367c03c012d58e82b6a49",
  );
});

test("the Batch 007 336-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(catalogModule.catalog.slice(0, 336).map((item) => item.slug).join("\n"))
    .digest("hex");

  assert.equal(catalogModule.catalog.slice(0, 336).length, 336);
  assert.equal(
    digest,
    "77cc018846bada4feefd24f7e69b92bd25dadd85f19a5a2ddba0a7907ef18207",
  );
});

test("the Batch 008 368-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(catalogModule.catalog.slice(0, 368).map((item) => item.slug).join("\n"))
    .digest("hex");
  assert.equal(catalogModule.catalog.slice(0, 368).length, 368);
  assert.equal(digest, "bbee58bb37c4a10f1af05f1ec8dbcd3e78c1c01c7b42c61279fe095e8550a7cb");
});

test("the Batch 009 400-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(catalogModule.catalog.slice(0, 400).map((item) => item.slug).join("\n"))
    .digest("hex");
  assert.equal(catalogModule.catalog.slice(0, 400).length, 400);
  assert.equal(digest, "21ee0364b72597120661ccb48d6f6e4b84181e971d3b034145a3481f028b7043");
});

test("the Batch 010 432-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(catalogModule.catalog.slice(0, 432).map((item) => item.slug).join("\n"))
    .digest("hex");
  assert.equal(catalogModule.catalog.slice(0, 432).length, 432);
  assert.equal(digest, "92aadf35ed4ecc547c1a1387b399a0e4cd4e937e74595407645904578d2d9eb2");
});

test("the Batch 011 464-item release order is frozen for future batches", () => {
  const digest = createHash("sha256")
    .update(catalogModule.catalog.slice(0, 464).map((item) => item.slug).join("\n"))
    .digest("hex");
  assert.equal(catalogModule.catalog.slice(0, 464).length, 464);
  assert.equal(digest, "c522bc80a0ee75e7d2fb90253e4aa31b618b7aa06428f4f6fc2c80d9825fa4a9");
});

test("Batch 002 categories are discoverable with bilingual search terms", () => {
  const batch002Items = catalogModule.catalog.filter(
    (item) => item.batch === "002",
  );
  const { filterCatalog } = searchModule;
  const expectations = new Map([
    ["commerce", "コマース"],
    ["communication", "コミュニケーション"],
    ["data", "データ"],
    ["devices", "デバイス"],
  ]);

  for (const [category, query] of expectations) {
    assert.equal(filterCatalog(batch002Items, { category }).length, 8, category);
    assert.equal(
      filterCatalog(batch002Items, { category, query }).length,
      8,
      query,
    );
  }
});

test("Batch 004 categories are discoverable with bilingual search terms", () => {
  const { filterCatalog } = searchModule;
  const batch004Items = catalogModule.catalog.filter(
    (item) => item.batch === "004",
  );
  const expectations = new Map([
    ["data", "データ"],
    ["commerce", "コマース"],
    ["maps", "地図"],
    ["time", "時間"],
  ]);

  assert.equal(batch004Items.length, 32);
  for (const [category, japaneseQuery] of expectations) {
    assert.equal(
      filterCatalog(batch004Items, { category }).length,
      8,
      category,
    );
    assert.equal(
      filterCatalog(batch004Items, {
        category,
        collection: "originals",
        query: japaneseQuery,
      }).length,
      8,
      japaneseQuery,
    );
  }

  for (const item of batch004Items) {
    for (const query of [item.name, item.nameJa, item.slug]) {
      assert.equal(
        filterCatalog(batch004Items, {
          category: item.category,
          collection: "originals",
          query,
        }).some((match) => match.slug === item.slug),
        true,
        `${item.slug} must be searchable with ${query}`,
      );
    }
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

test("Batch 005 categories and every new slug are discoverable", () => {
  const { filterCatalog } = searchModule;
  const batch005Items = catalogModule.catalog.filter(
    (item) => item.batch === "005",
  );
  const expectations = new Map([
    ["communication", "コミュニケーション"],
    ["people", "人物"],
    ["devices", "デバイス"],
    ["status", "ステータス"],
  ]);

  assert.equal(batch005Items.length, 32);
  for (const [category, japaneseQuery] of expectations) {
    assert.equal(filterCatalog(batch005Items, { category }).length, 8);
    assert.equal(
      filterCatalog(batch005Items, {
        category,
        collection: "originals",
        query: japaneseQuery,
      }).length,
      8,
    );
  }

  for (const item of batch005Items) {
    for (const query of [item.slug, item.name, item.nameJa]) {
      assert.equal(
        filterCatalog(batch005Items, {
          category: item.category,
          collection: "originals",
          query,
        }).some((match) => match.slug === item.slug),
        true,
        `${item.slug} must be searchable with ${query}`,
      );
    }
  }
});

test("Batch 006 categories and every new slug are discoverable", () => {
  const { filterCatalog } = searchModule;
  const items = catalogModule.catalog.filter((item) => item.batch === "006");
  const expectations = new Map([
    ["people", "人物"],
    ["status", "ステータス"],
    ["maps", "地図"],
    ["time", "時間"],
  ]);

  assert.equal(items.length, 32);
  for (const [category, query] of expectations) {
    assert.equal(filterCatalog(items, { category }).length, 8);
    assert.equal(filterCatalog(items, { category, query }).length, 8);
  }
  for (const item of items) {
    for (const query of [item.slug, item.name, item.nameJa]) {
      assert.equal(
        filterCatalog(items, {
          category: item.category,
          collection: "originals",
          query,
        }).some((match) => match.slug === item.slug),
        true,
      );
    }
  }
});

test("Batch 007 categories and every new slug are discoverable", () => {
  const { filterCatalog } = searchModule;
  const items = catalogModule.catalog.filter((item) => item.batch === "007");
  const expectations = new Map([
    ["ui", "UI"],
    ["arrows", "矢印"],
    ["files", null],
    ["media", null],
  ]);

  assert.equal(items.length, 32);
  for (const [category, query] of expectations) {
    assert.equal(filterCatalog(items, { category }).length, 8);
    if (query) assert.equal(filterCatalog(items, { category, query }).length, 8);
  }
  for (const item of items) {
    for (const query of [item.slug, item.name, item.nameJa]) {
      assert.equal(
        filterCatalog(items, {
          category: item.category,
          collection: "originals",
          query,
        }).some((match) => match.slug === item.slug),
        true,
        `${item.slug} must be searchable with ${query}`,
      );
    }
  }
});

test("Batch 008 categories and every new slug are discoverable", () => {
  const { filterCatalog } = searchModule;
  const items = catalogModule.catalog.filter((item) => item.batch === "008");
  assert.equal(items.length, 32);
  for (const category of ["commerce", "status", "ui", "arrows"]) {
    assert.equal(filterCatalog(items, { category }).length, 8);
  }
  for (const item of items) {
    for (const query of [item.slug, item.name, item.nameJa]) {
      assert.equal(filterCatalog(items, { category: item.category, collection: "originals", query }).some((match) => match.slug === item.slug), true);
    }
  }
});

test("Batch 009 categories and every new slug are discoverable", () => {
  const { filterCatalog } = searchModule;
  const items = catalogModule.catalog.filter((item) => item.batch === "009");
  assert.equal(items.length, 32);
  for (const category of ["data", "devices", "people", "maps"]) {
    assert.equal(filterCatalog(items, { category }).length, 8);
  }
  for (const item of items) {
    for (const query of [item.slug, item.name, item.nameJa]) {
      assert.equal(filterCatalog(items, { category: item.category, collection: "originals", query }).some((match) => match.slug === item.slug), true);
    }
  }
});

test("Batch 010 categories and every new slug are discoverable", () => {
  const { filterCatalog } = searchModule;
  const items = catalogModule.catalog.filter((item) => item.batch === "010");
  assert.equal(items.length, 32);
  for (const category of ["commerce", "time", "files", "media"]) {
    assert.equal(filterCatalog(items, { category }).length, 8);
  }
  for (const item of items) {
    for (const query of [item.slug, item.name, item.nameJa]) {
      assert.equal(filterCatalog(items, { category: item.category, collection: "originals", query }).some((match) => match.slug === item.slug), true);
    }
  }
});

test("Batch 011 categories and every new slug are discoverable", () => {
  const { filterCatalog } = searchModule;
  const items = catalogModule.catalog.filter((item) => item.batch === "011");
  assert.equal(items.length, 32);
  for (const category of ["communication", "people", "files", "time"]) {
    assert.equal(filterCatalog(items, { category }).length, 8);
  }
  for (const item of items) {
    for (const query of [item.slug, item.name, item.nameJa]) {
      assert.equal(
        filterCatalog(items, {
          category: item.category,
          collection: "originals",
          query,
        }).some((match) => match.slug === item.slug),
        true,
        `${item.slug} must be searchable with ${query}`,
      );
    }
  }
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

test("Batch 004 manifest and registry are frozen, aligned, and unique", () => {
  const { batch004Catalog } = batch004CatalogModule;
  const { batch004Icons } = batch004RegistryModule;
  const registryKeys = Object.keys(batch004Icons);
  const registryIcons = Object.values(batch004Icons);
  const displayNames = registryIcons.map((Icon) => Icon.displayName);

  assert.equal(batch004Catalog.length, 32);
  assert.equal(registryKeys.length, 32);
  assert.ok(Object.isFrozen(batch004Catalog));
  assert.ok(Object.isFrozen(batch004Icons));
  assert.ok(
    batch004Catalog.every(
      (item) => Object.isFrozen(item) && Object.isFrozen(item.tags),
    ),
    "Batch 004 manifest metadata must be deeply frozen",
  );
  assert.deepEqual(
    registryKeys,
    batch004Catalog.map((item) => item.slug),
  );
  assert.equal(new Set(registryKeys).size, 32);
  assert.equal(new Set(batch004Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch004Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(registryIcons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(
    displayNames.every(
      (displayName) =>
        typeof displayName === "string" &&
        /^IconPathroom[A-Za-z0-9]+$/.test(displayName),
    ),
    "Batch 004 icon display names must be explicit Pathroom names",
  );
});

test("Batch 005 manifest and registry are frozen, aligned, and unique", () => {
  const { batch005Catalog } = batch005CatalogModule;
  const { batch005Icons } = batch005RegistryModule;
  const registryKeys = Object.keys(batch005Icons);
  const registryIcons = Object.values(batch005Icons);
  const displayNames = registryIcons.map((Icon) => Icon.displayName);

  assert.equal(batch005Catalog.length, 32);
  assert.equal(registryKeys.length, 32);
  assert.ok(Object.isFrozen(batch005Catalog));
  assert.ok(Object.isFrozen(batch005Icons));
  assert.ok(
    batch005Catalog.every(
      (item) => Object.isFrozen(item) && Object.isFrozen(item.tags),
    ),
  );
  assert.deepEqual(registryKeys, batch005Catalog.map((item) => item.slug));
  assert.equal(new Set(registryKeys).size, 32);
  assert.equal(new Set(batch005Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch005Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(registryIcons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(
    displayNames.every(
      (displayName) =>
        typeof displayName === "string" &&
        /^IconPathroom[A-Za-z0-9]+$/.test(displayName),
    ),
  );
});

test("Batch 006 manifest and registry are frozen, aligned, and unique", () => {
  const { batch006Catalog } = batch006CatalogModule;
  const { batch006Icons } = batch006RegistryModule;
  const keys = Object.keys(batch006Icons);
  const icons = Object.values(batch006Icons);
  const displayNames = icons.map((Icon) => Icon.displayName);

  assert.equal(batch006Catalog.length, 32);
  assert.equal(keys.length, 32);
  assert.ok(Object.isFrozen(batch006Catalog));
  assert.ok(Object.isFrozen(batch006Icons));
  assert.ok(batch006Catalog.every((item) => Object.isFrozen(item) && Object.isFrozen(item.tags)));
  assert.deepEqual(keys, batch006Catalog.map((item) => item.slug));
  assert.equal(new Set(keys).size, 32);
  assert.equal(new Set(batch006Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch006Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(icons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(displayNames.every((name) => /^IconPathroom[A-Za-z0-9]+$/.test(name)));
});

test("Batch 007 manifest and registry are frozen, aligned, and unique", () => {
  const { batch007Catalog } = batch007CatalogModule;
  const { batch007Icons } = batch007RegistryModule;
  const keys = Object.keys(batch007Icons);
  const icons = Object.values(batch007Icons);
  const displayNames = icons.map((Icon) => Icon.displayName);

  assert.equal(batch007Catalog.length, 32);
  assert.equal(keys.length, 32);
  assert.ok(Object.isFrozen(batch007Catalog));
  assert.ok(Object.isFrozen(batch007Icons));
  assert.ok(batch007Catalog.every((item) => Object.isFrozen(item) && Object.isFrozen(item.tags)));
  assert.deepEqual(keys, batch007Catalog.map((item) => item.slug));
  assert.equal(new Set(keys).size, 32);
  assert.equal(new Set(batch007Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch007Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(icons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(displayNames.every((name) => /^IconPathroom[A-Za-z0-9]+$/.test(name)));
});

test("Batch 008 manifest and registry are frozen, aligned, and unique", () => {
  const { batch008Catalog } = batch008CatalogModule;
  const { batch008Icons } = batch008RegistryModule;
  const keys = Object.keys(batch008Icons);
  const icons = Object.values(batch008Icons);
  const displayNames = icons.map((Icon) => Icon.displayName);
  assert.equal(batch008Catalog.length, 32);
  assert.equal(keys.length, 32);
  assert.ok(Object.isFrozen(batch008Catalog));
  assert.ok(Object.isFrozen(batch008Icons));
  assert.ok(batch008Catalog.every((item) => Object.isFrozen(item) && Object.isFrozen(item.tags)));
  assert.deepEqual(keys, batch008Catalog.map((item) => item.slug));
  assert.equal(new Set(keys).size, 32);
  assert.equal(new Set(batch008Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch008Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(icons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(displayNames.every((name) => /^IconPathroom[A-Za-z0-9]+$/.test(name)));
});

test("Batch 009 manifest and registry are frozen, aligned, and unique", () => {
  const { batch009Catalog } = batch009CatalogModule;
  const { batch009Icons } = batch009RegistryModule;
  const keys = Object.keys(batch009Icons);
  const icons = Object.values(batch009Icons);
  const displayNames = icons.map((Icon) => Icon.displayName);
  assert.equal(batch009Catalog.length, 32);
  assert.equal(keys.length, 32);
  assert.ok(Object.isFrozen(batch009Catalog));
  assert.ok(Object.isFrozen(batch009Icons));
  assert.ok(batch009Catalog.every((item) => Object.isFrozen(item) && Object.isFrozen(item.tags)));
  assert.deepEqual(keys, batch009Catalog.map((item) => item.slug));
  assert.equal(new Set(keys).size, 32);
  assert.equal(new Set(batch009Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch009Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(icons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(displayNames.every((name) => /^IconPathroom[A-Za-z0-9]+$/.test(name)));
});

test("Batch 010 manifest and registry are frozen, aligned, and unique", () => {
  const { batch010Catalog } = batch010CatalogModule;
  const { batch010Icons } = batch010RegistryModule;
  const keys = Object.keys(batch010Icons);
  const icons = Object.values(batch010Icons);
  const displayNames = icons.map((Icon) => Icon.displayName);
  assert.equal(batch010Catalog.length, 32);
  assert.equal(keys.length, 32);
  assert.ok(Object.isFrozen(batch010Catalog));
  assert.ok(Object.isFrozen(batch010Icons));
  assert.ok(batch010Catalog.every((item) => Object.isFrozen(item) && Object.isFrozen(item.tags)));
  assert.deepEqual(keys, batch010Catalog.map((item) => item.slug));
  assert.equal(new Set(keys).size, 32);
  assert.equal(new Set(batch010Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch010Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(icons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(displayNames.every((name) => /^IconPathroom[A-Za-z0-9]+$/.test(name)));
});

test("Batch 011 manifest and registry are frozen, aligned, and unique", () => {
  const { batch011Catalog } = batch011CatalogModule;
  const { batch011Icons } = batch011RegistryModule;
  const keys = Object.keys(batch011Icons);
  const icons = Object.values(batch011Icons);
  const displayNames = icons.map((Icon) => Icon.displayName);
  assert.equal(batch011Catalog.length, 32);
  assert.equal(keys.length, 32);
  assert.ok(Object.isFrozen(batch011Catalog));
  assert.ok(Object.isFrozen(batch011Icons));
  assert.ok(batch011Catalog.every((item) => Object.isFrozen(item) && Object.isFrozen(item.tags)));
  assert.deepEqual(keys, batch011Catalog.map((item) => item.slug));
  assert.equal(new Set(keys).size, 32);
  assert.equal(new Set(batch011Catalog.map((item) => item.name)).size, 32);
  assert.equal(new Set(batch011Catalog.map((item) => item.nameJa)).size, 32);
  assert.equal(new Set(icons).size, 32);
  assert.equal(new Set(displayNames).size, 32);
  assert.ok(displayNames.every((name) => /^IconPathroom[A-Za-z0-9]+$/.test(name)));
});

test("Original registry keys and display names are unique", () => {
  const { catalog } = awaitCatalogModule();
  const { pathroomOriginalIcons } = originalsModule;
  const originalItems = catalog.filter(
    (item) => item.collection === "pathroom-originals",
  );
  const registryKeys = Object.keys(pathroomOriginalIcons);
  const displayNames = originalItems.map((item) => item.Icon.displayName);

  assert.equal(registryKeys.length, 344);
  assert.deepEqual(
    new Set(originalItems.map((item) => item.slug)),
    new Set(registryKeys),
  );
  assert.equal(new Set(displayNames).size, 344);
});

function awaitCatalogModule() {
  return catalogModule;
}
