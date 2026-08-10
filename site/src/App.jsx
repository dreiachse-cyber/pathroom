import { useEffect, useMemo, useRef, useState } from "react";
import {
  IconCheck,
  IconDownload,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import { catalog, categories, collections } from "./catalog.jsx";
import { filterCatalog, sortCatalog } from "./search.js";
import { serializeSvgMarkup } from "./svg.js";

const PAGE_SIZE = 48;
const GITHUB_REPOSITORY_URL = "https://github.com/dreiachse-cyber/pathroom";
const categoryIds = new Set(categories.map((category) => category.id));
const collectionCounts = catalog.reduce(
  (counts, item) => ({
    ...counts,
    [item.collection]: (counts[item.collection] || 0) + 1,
  }),
  {},
);

function catalogSummary() {
  return `${collectionCounts.tabler} Tabler · ${collections.tabler.licenseName} + ${collectionCounts["pathroom-originals"]} PATHROOM Originals · ${collections["pathroom-originals"].licenseName}`;
}

function readCatalogState() {
  if (typeof window === "undefined") {
    return { query: "", category: "all", sort: "featured" };
  }

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "all";
  const requestedSort = params.get("sort");
  const sort = ["name", "newest"].includes(requestedSort)
    ? requestedSort
    : "featured";

  return {
    query: params.get("q") || "",
    category: categoryIds.has(category) ? category : "all",
    sort,
  };
}

export function App() {
  const initialState = useMemo(readCatalogState, []);
  const [query, setQuery] = useState(initialState.query);
  const [category, setCategory] = useState(initialState.category);
  const [sort, setSort] = useState(initialState.sort);
  const [selectedSlug, setSelectedSlug] = useState("search");
  const [copiedSlug, setCopiedSlug] = useState("");
  const [savedSlug, setSavedSlug] = useState("");
  const [actionStatus, setActionStatus] = useState("");
  const [actionError, setActionError] = useState("");
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);
  const searchRef = useRef(null);
  const categoryTabsRef = useRef(null);
  const activeCategoryRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  const allResults = useMemo(() => {
    const filtered = filterCatalog(catalog, { query, category });
    return sortCatalog(filtered, sort);
  }, [category, query, sort]);

  const results = allResults.slice(0, visibleLimit);

  useEffect(() => {
    setVisibleLimit(PAGE_SIZE);
  }, [category, query, sort]);

  useEffect(() => {
    const tabs = categoryTabsRef.current;
    const activeTab = activeCategoryRef.current;

    if (!tabs || !activeTab) return;

    const alignActiveTab = () => {
      const activeStart = activeTab.offsetLeft;
      const activeEnd = activeStart + activeTab.offsetWidth;
      const visibleStart = tabs.scrollLeft;
      const visibleEnd = visibleStart + tabs.clientWidth;

      if (activeStart < visibleStart || activeEnd > visibleEnd) {
        tabs.scrollTo({
          left: Math.max(
            0,
            activeStart - (tabs.clientWidth - activeTab.offsetWidth) / 2,
          ),
          behavior: "auto",
        });
      }
    };

    const frame = window.requestAnimationFrame(alignActiveTab);
    window.addEventListener("resize", alignActiveTab);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", alignActiveTab);
    };
  }, [category]);

  useEffect(() => {
    const handlePopState = () => {
      const next = readCatalogState();
      setQuery(next.query);
      setCategory(next.category);
      setSort(next.sort);
    };

    const handleShortcut = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape" && document.activeElement === searchRef.current) {
        const current = readCatalogState();
        setQuery("");
        writeCatalogUrl({ ...current, query: "" }, false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleShortcut);
      window.clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  function updateCatalogState(next, { push = false } = {}) {
    const current = readCatalogState();
    const merged = { ...current, ...next };
    const unchanged =
      merged.query === current.query &&
      merged.category === current.category &&
      merged.sort === current.sort;

    if (unchanged) return;

    setQuery(merged.query);
    setCategory(merged.category);
    setSort(merged.sort);
    writeCatalogUrl(merged, push);
  }

  async function copyIcon(item) {
    try {
      await writeClipboard(serializeIconSvg(item));
      showActionSuccess(item, "copy");
    } catch {
      showActionError(
        `${item.name}のSVGコードをコピーできなかった。もう一度試してください。`,
      );
    }
  }

  function saveIcon(item) {
    try {
      triggerSvgDownload(serializeIconSvg(item), `${item.slug}.svg`);
      showActionSuccess(item, "save");
    } catch {
      showActionError(
        `${item.name}のSVGを保存できなかった。もう一度試してください。`,
      );
    }
  }

  function showActionSuccess(item, action) {
    setSelectedSlug(item.slug);
    setCopiedSlug(action === "copy" ? item.slug : "");
    setSavedSlug(action === "save" ? item.slug : "");
    setActionStatus(
      action === "copy"
        ? `${item.name}のSVGコードをコピーした`
        : `${item.name}のSVGの保存を開始した`,
    );
    setActionError("");
    window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(() => {
      setCopiedSlug("");
      setSavedSlug("");
    }, 1800);
  }

  function showActionError(message) {
    setCopiedSlug("");
    setSavedSlug("");
    setActionStatus("");
    setActionError(message);
  }

  return (
    <div className="pathroom-app">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PATHROOM トップ">
          PATHROOM
        </a>
        <nav className="header-nav" aria-label="サイト案内">
          <a href="#about">About</a>
          <a href="#license">ライセンス</a>
          <a href={GITHUB_REPOSITORY_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main id="top" className="catalog-page">
        <section className="catalog-intro" aria-labelledby="catalog-heading">
          <h1 id="catalog-heading">使えるSVGを、すぐ見つける。</h1>
          <p>{catalogSummary()}</p>
        </section>

        <section className="catalog-tools" aria-label="アイコン検索と絞り込み">
          <label className="search-box">
            <span className="sr-only">アイコンを検索</span>
            <IconSearch aria-hidden="true" size={34} stroke={2} />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) =>
                updateCatalogState({ query: event.target.value })
              }
              placeholder="アイコンを検索"
              autoComplete="off"
            />
          </label>

          <div
            ref={categoryTabsRef}
            className="category-tabs"
            role="group"
            aria-label="カテゴリ"
          >
            {categories.map((item) => (
              <button
                key={item.id}
                ref={category === item.id ? activeCategoryRef : null}
                className={category === item.id ? "is-active" : ""}
                type="button"
                aria-pressed={category === item.id}
                onClick={() =>
                  updateCatalogState({ category: item.id }, { push: true })
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <section className="catalog-results" aria-labelledby="result-count">
          <div className="results-bar">
            <p id="result-count" aria-live="polite">
              {catalog.length}件中{results.length}件
            </p>
            <label className="sort-control">
              <span className="sr-only">並び順</span>
              <select
                value={sort}
                onChange={(event) =>
                  updateCatalogState(
                    { sort: event.target.value },
                    { push: true },
                  )
                }
              >
                <option value="featured">標準順</option>
                <option value="name">名前順</option>
                <option value="newest">新着順</option>
              </select>
            </label>
          </div>

          {allResults.length > 0 ? (
            <>
              <div className="icon-grid">
                {results.map((item) => (
                  <IconCard
                    key={item.slug}
                    item={item}
                    isSelected={selectedSlug === item.slug}
                    isCopied={copiedSlug === item.slug}
                    isSaved={savedSlug === item.slug}
                    onSelect={() => setSelectedSlug(item.slug)}
                    onSave={() => saveIcon(item)}
                    onCopy={() => copyIcon(item)}
                  />
                ))}
              </div>
              {allResults.length > PAGE_SIZE ? (
                <div className="load-more-row">
                  <button
                    type="button"
                    aria-disabled={results.length >= allResults.length}
                    onClick={() => {
                      if (results.length < allResults.length) {
                        setVisibleLimit((current) => current + PAGE_SIZE);
                      }
                    }}
                  >
                    {results.length < allResults.length
                      ? "さらに表示"
                      : `${allResults.length}件すべて表示済み`}
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="empty-state" role="status">
              <p>一致するアイコンが見つからなかった。</p>
              <button
                type="button"
                onClick={() => {
                  updateCatalogState(
                    { query: "", category: "all" },
                    { push: true },
                  );
                }}
              >
                検索条件をクリア
              </button>
            </div>
          )}
        </section>

        <footer className="site-footer">
          <section id="about">
            <h2>About</h2>
            <p>
              日本語と英語で探せるSVGアイコンカタログ。「SVG保存」はファイルとして保存し、コードボタンはHTMLへ貼れるSVGコードをコピーする。
            </p>
          </section>
          <section id="license">
            <h2>ライセンス</h2>
            <p>
              Tabler Icons由来の{collectionCounts.tabler}件はMIT Licenseの条件で利用できる。
              <a href={`${import.meta.env.BASE_URL}THIRD_PARTY_NOTICES.txt`}>
                第三者ライセンス全文
              </a>
              。PATHROOM Originalsの{collectionCounts["pathroom-originals"]}件もMIT
              Licenseで、商用利用・改変・アイコン単体販売ができ、通常利用時の表示上のクレジットは任意。素材を再配布する場合は著作権表示とMIT本文の同梱が必要。
              <a
                href={`${import.meta.env.BASE_URL}PATHROOM_ORIGINALS_LICENSE.txt`}
              >
                Originalsライセンス全文
              </a>
              を確認できる。
            </p>
          </section>
          <section id="github">
            <h2>GitHub</h2>
            <p>
              <a
                href={GITHUB_REPOSITORY_URL}
                target="_blank"
                rel="noreferrer"
              >
                ソースコードと更新履歴を見る
              </a>
            </p>
          </section>
          <p className="third-party-note">
            Tabler IconsとPATHROOM Originalsは、由来とライセンス表示を分けた別コレクションとして掲載している。
          </p>
        </footer>
      </main>

      <div className="sr-only" role="status" aria-live="polite">
        {actionStatus}
      </div>

      {actionError ? (
        <div className="action-error" role="alert">
          <span>{actionError}</span>
          <button type="button" onClick={() => setActionError("")}>
            閉じる
          </button>
        </div>
      ) : null}
    </div>
  );
}

function IconCard({
  item,
  isSelected,
  isCopied,
  isSaved,
  onSelect,
  onSave,
  onCopy,
}) {
  const Icon = item.Icon;

  return (
    <article
      className={`icon-card${isSelected ? " is-selected" : ""}${item.collection === "pathroom-originals" ? " has-collection-badge" : ""}`}
      data-icon-slug={item.slug}
      onPointerDown={onSelect}
      onFocus={onSelect}
    >
      {item.collection === "pathroom-originals" ? (
        <span className="collection-badge">PATHROOM</span>
      ) : null}
      <div className="icon-preview" aria-hidden="true">
        <Icon size={50} stroke={2} />
      </div>
      <h2>{item.name}</h2>
      <p>{item.nameJa}</p>
      <div className="card-actions">
        <button
          className="save-button"
          type="button"
          aria-label={`${item.name}をSVGファイルとして保存`}
          onClick={onSave}
        >
          {isSaved ? (
            <IconCheck aria-hidden="true" size={16} stroke={2} />
          ) : (
            <IconDownload aria-hidden="true" size={16} stroke={2} />
          )}
          <span>{isSaved ? "保存開始" : "SVG保存"}</span>
        </button>
        <button
          className="copy-button"
          type="button"
          aria-label={`${item.name}のSVGコードをコピー`}
          title="SVGコードをコピー"
          onClick={onCopy}
        >
          {isCopied ? (
            <IconCheck aria-hidden="true" size={16} stroke={2} />
          ) : (
            <IconFileText aria-hidden="true" size={16} stroke={2} />
          )}
          <span>{isCopied ? "済み" : "コード"}</span>
        </button>
      </div>
    </article>
  );
}

function serializeIconSvg(item) {
  const sourceSvg = document.querySelector(
    `[data-icon-slug="${item.slug}"] .icon-preview svg`,
  );

  if (!sourceSvg) {
    throw new Error(`SVG source not found: ${item.slug}`);
  }

  const clone = sourceSvg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "24");
  clone.setAttribute("height", "24");
  clone.setAttribute("stroke", "currentColor");
  clone.removeAttribute("class");
  clone.removeAttribute("aria-hidden");
  clone.removeAttribute("focusable");

  return serializeSvgMarkup(clone.outerHTML, item);
}

function triggerSvgDownload(svgText, filename) {
  const blob = new Blob([svgText], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);

  try {
    link.click();
  } finally {
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

async function writeClipboard(text) {
  let clipboardError;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      clipboardError = error;
    }
  }

  const textarea = document.createElement("textarea");
  const previousFocus = document.activeElement;
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.focus();
  textarea.select();

  try {
    const copied = document.execCommand("copy");
    if (!copied) {
      throw clipboardError || new Error("Clipboard copy failed");
    }
  } finally {
    textarea.remove();
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }
}

function writeCatalogUrl({ query, category, sort }, push) {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  query ? params.set("q", query) : params.delete("q");
  category !== "all"
    ? params.set("category", category)
    : params.delete("category");
  sort !== "featured" ? params.set("sort", sort) : params.delete("sort");

  const nextUrl = `${url.pathname}${params.size ? `?${params}` : ""}${url.hash}`;
  const method = push ? "pushState" : "replaceState";
  window.history[method]({}, "", nextUrl);
}
