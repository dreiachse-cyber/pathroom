export function normalizeSearch(value = "") {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ja")
    .replace(/[\s_-]+/g, " ")
    .trim();
}

export function filterCatalog(
  items,
  { query = "", category = "all", collection = "all" } = {},
) {
  const normalizedQuery = normalizeSearch(query);
  const terms = normalizedQuery.split(" ").filter(Boolean);
  const isLegacyOriginalsFilter = category === "originals";
  const semanticCategory = isLegacyOriginalsFilter ? "all" : category;
  const requestedCollection =
    collection === "pathroom-originals" ? "originals" : collection;
  const effectiveCollection =
    isLegacyOriginalsFilter && requestedCollection === "all"
      ? "originals"
      : requestedCollection;

  return items.filter((item) => {
    if (semanticCategory !== "all" && item.category !== semanticCategory) {
      return false;
    }
    if (
      effectiveCollection !== "all" &&
      item.collection !==
        (effectiveCollection === "originals"
          ? "pathroom-originals"
          : effectiveCollection)
    ) {
      return false;
    }
    if (terms.length === 0) return true;

    const haystack = normalizeSearch(
      [
        item.slug,
        item.name,
        item.nameJa,
        item.category,
        item.collection,
        item.collection === "pathroom-originals"
          ? "PATHROOM Originals original オリジナル"
          : "Tabler Icons tabler",
        ...item.tags,
      ].join(" "),
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
