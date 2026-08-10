import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createServer } from "vite";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
let viteServer;
let catalogModule;
let originalsModule;

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
});

test.after(async () => {
  await viteServer?.close();
});

test("the real catalog has the required shape and fixed collection counts", () => {
  const { catalog, collections, originalsCatalog } = catalogModule;
  const allowedCategories = new Set(["ui", "arrows", "files", "media"]);
  const slugs = new Set();
  const normalizedNames = new Set();

  assert.equal(catalog.length, 144);
  assert.equal(catalog.filter((item) => item.collection === "tabler").length, 120);
  assert.equal(
    catalog.filter((item) => item.collection === "pathroom-originals").length,
    24,
  );
  assert.equal(originalsCatalog.length, 24);

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

test("Original registry keys and display names are unique", () => {
  const { catalog } = awaitCatalogModule();
  const { pathroomOriginalIcons } = originalsModule;
  const originalItems = catalog.filter(
    (item) => item.collection === "pathroom-originals",
  );
  const registryKeys = Object.keys(pathroomOriginalIcons);
  const displayNames = originalItems.map((item) => item.Icon.displayName);

  assert.equal(registryKeys.length, 24);
  assert.deepEqual(
    new Set(originalItems.map((item) => item.slug)),
    new Set(registryKeys),
  );
  assert.equal(new Set(displayNames).size, 24);
});

function awaitCatalogModule() {
  return catalogModule;
}
