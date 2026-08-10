import assert from "node:assert/strict";
import test from "node:test";
import {
  filterCatalog,
  normalizeSearch,
  sortCatalog,
} from "../src/search.js";

const items = [
  {
    name: "Arrow Up",
    nameJa: "上向き矢印",
    category: "arrows",
    tags: ["upload", "方向"],
    createdAt: "2026-08-08",
  },
  {
    name: "Search",
    nameJa: "検索",
    category: "ui",
    tags: ["find", "虫眼鏡"],
    createdAt: "2026-08-09",
  },
];

test("normalizes width, case, separators, and whitespace", () => {
  assert.equal(normalizeSearch("  ＡＲＲＯＷ_UP  "), "arrow up");
});

test("searches English, Japanese, tags, and multiple terms", () => {
  assert.equal(filterCatalog(items, { query: "SEARCH" }).length, 1);
  assert.equal(filterCatalog(items, { query: "虫眼鏡" }).length, 1);
  assert.equal(filterCatalog(items, { query: "arrow 方向" }).length, 1);
});

test("filters categories and returns an empty result safely", () => {
  assert.equal(filterCatalog(items, { category: "ui" }).length, 1);
  assert.equal(filterCatalog(items, { query: "unknown" }).length, 0);
});

test("filters Originals by collection and searches collection terms", () => {
  const originals = {
    name: "Sparkles",
    nameJa: "きらめき",
    category: "ui",
    collection: "pathroom-originals",
    tags: ["magic"],
    createdAt: "2026-08-09",
  };

  assert.equal(filterCatalog([...items, originals], { category: "originals" }).length, 1);
  assert.equal(filterCatalog([originals], { query: "Originals" }).length, 1);
  assert.equal(filterCatalog([originals], { query: "オリジナル" }).length, 1);
});

test("searches Batch 003 style categories in English and Japanese", () => {
  const batch003Items = [
    {
      name: "Text Field",
      nameJa: "テキスト入力欄",
      category: "ui",
      collection: "pathroom-originals",
      tags: ["input", "UI"],
      createdAt: "2026-08-10",
      batch: "003",
    },
    {
      name: "Indent Increase",
      nameJa: "インデントを増やす",
      category: "arrows",
      collection: "pathroom-originals",
      tags: ["indent", "矢印"],
      createdAt: "2026-08-10",
      batch: "003",
    },
    {
      name: "Code File",
      nameJa: "コードファイル",
      category: "files",
      collection: "pathroom-originals",
      tags: ["code", "ファイル"],
      createdAt: "2026-08-10",
      batch: "003",
    },
    {
      name: "Vinyl Record",
      nameJa: "レコード盤",
      category: "media",
      collection: "pathroom-originals",
      tags: ["vinyl", "メディア"],
      createdAt: "2026-08-10",
      batch: "003",
    },
  ];

  const expectations = new Map([
    ["ui", "UI"],
    ["arrows", "矢印"],
    ["files", "ファイル"],
    ["media", "メディア"],
  ]);

  for (const [category, japaneseQuery] of expectations) {
    assert.equal(
      filterCatalog(batch003Items, { query: category }).length,
      1,
      category,
    );
    assert.equal(
      filterCatalog(batch003Items, { query: japaneseQuery }).length,
      1,
      japaneseQuery,
    );
  }
});

test("keeps featured order and sorts by name or newest", () => {
  assert.equal(sortCatalog(items, "featured")[0].name, "Arrow Up");
  assert.equal(sortCatalog([...items].reverse(), "name")[0].name, "Arrow Up");
  assert.equal(sortCatalog(items, "newest")[0].name, "Search");
});
