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

test("keeps featured order and sorts by name or newest", () => {
  assert.equal(sortCatalog(items, "featured")[0].name, "Arrow Up");
  assert.equal(sortCatalog([...items].reverse(), "name")[0].name, "Arrow Up");
  assert.equal(sortCatalog(items, "newest")[0].name, "Search");
});
