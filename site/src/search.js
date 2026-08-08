export function normalizeSearch(value = "") {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ja")
    .replace(/[\s_-]+/g, " ")
    .trim();
}

export function filterCatalog(items, { query = "", category = "all" } = {}) {
  const normalizedQuery = normalizeSearch(query);
  const terms = normalizedQuery.split(" ").filter(Boolean);

  return items.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (terms.length === 0) return true;

    const haystack = normalizeSearch(
      [item.name, item.nameJa, item.category, ...item.tags].join(" "),
    );

    return terms.every((term) => haystack.includes(term));
  });
}

export function sortCatalog(items, sort = "featured") {
  const next = [...items];

  if (sort === "name") {
    return next.sort((a, b) =>
      a.name.localeCompare(b.name, "en", {
        numeric: true,
        sensitivity: "base",
      }),
    );
  }

  if (sort === "newest") {
    return next.sort(
      (a, b) =>
        b.createdAt.localeCompare(a.createdAt) ||
        a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
    );
  }

  return next;
}
