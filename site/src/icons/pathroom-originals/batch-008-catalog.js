const createdAt = "2026-08-13";
const batch = "008";

const entries = [
  ["shopping-basket", "Shopping Basket", "買い物かご", "commerce", ["shopping", "basket", "groceries", "買い物", "かご", "コマース"]],
  ["gift-card", "Gift Card", "ギフトカード", "commerce", ["gift", "card", "credit", "ギフト", "カード", "コマース"]],
  ["contactless-payment", "Contactless Payment", "タッチ決済", "commerce", ["contactless", "payment", "tap", "タッチ決済", "非接触", "コマース"]],
  ["split-payment", "Split Payment", "分割支払い", "commerce", ["split", "payment", "shared", "分割", "支払い", "コマース"]],
  ["price-comparison", "Price Comparison", "価格比較", "commerce", ["price", "comparison", "tags", "価格", "比較", "コマース"]],
  ["inventory-shelf", "Inventory Shelf", "在庫棚", "commerce", ["inventory", "shelf", "stock", "在庫", "棚", "コマース"]],
  ["tax-document", "Tax Document", "税務書類", "commerce", ["tax", "document", "percentage", "税金", "書類", "コマース"]],
  ["currency-exchange", "Currency Exchange", "通貨両替", "commerce", ["currency", "exchange", "coins", "通貨", "両替", "コマース"]],
  ["queued-item", "Queued Item", "処理待ち", "status", ["queued", "item", "waiting", "処理待ち", "キュー", "ステータス"]],
  ["processing-stage", "Processing Stage", "処理中", "status", ["processing", "stage", "workflow", "処理中", "工程", "ステータス"]],
  ["sync-conflict", "Sync Conflict", "同期競合", "status", ["sync", "conflict", "collision", "同期", "競合", "ステータス"]],
  ["needs-attention", "Needs Attention", "要対応", "status", ["attention", "required", "document", "要対応", "注意", "ステータス"]],
  ["escalated-issue", "Escalated Issue", "エスカレーション済み", "status", ["escalated", "issue", "priority", "エスカレーション", "問題", "ステータス"]],
  ["validation-failed", "Validation Failed", "検証失敗", "status", ["validation", "failed", "error", "検証", "失敗", "ステータス"]],
  ["dependency-waiting", "Dependency Waiting", "依存待ち", "status", ["dependency", "waiting", "blocked", "依存関係", "待機", "ステータス"]],
  ["archived-state", "Archived State", "アーカイブ済み", "status", ["archived", "state", "stored", "アーカイブ", "保管", "ステータス"]],
  ["context-menu", "Context Menu", "コンテキストメニュー", "ui", ["context menu", "actions", "popup", "コンテキストメニュー", "操作", "UI"]],
  ["tooltip-popup", "Tooltip Popup", "ツールチップ", "ui", ["tooltip", "popup", "hint", "ツールチップ", "補足", "UI"]],
  ["bottom-sheet", "Bottom Sheet", "ボトムシート", "ui", ["bottom sheet", "drawer", "overlay", "ボトムシート", "ドロワー", "UI"]],
  ["marquee-select", "Marquee Select", "範囲選択ツール", "ui", ["marquee", "selection", "cursor", "範囲選択", "カーソル", "UI"]],
  ["floating-action-button", "Floating Action Button", "フローティング操作ボタン", "ui", ["floating", "action button", "add", "フローティング", "操作ボタン", "UI"]],
  ["chip-input", "Chip Input", "チップ入力欄", "ui", ["chip", "input", "token", "チップ", "入力欄", "UI"]],
  ["skeleton-loader", "Skeleton Loader", "スケルトンローダー", "ui", ["skeleton", "loading", "placeholder", "スケルトン", "読み込み", "UI"]],
  ["scrollable-panel", "Scrollable Panel", "スクロールパネル", "ui", ["scroll", "panel", "content", "スクロール", "パネル", "UI"]],
  ["jump-to-start", "Jump to Start", "先頭へ移動", "arrows", ["jump", "start", "boundary", "先頭", "移動", "矢印"], "jump-boundary"],
  ["jump-to-end", "Jump to End", "末尾へ移動", "arrows", ["jump", "end", "boundary", "末尾", "移動", "矢印"], "jump-boundary"],
  ["spread-vertical", "Spread Vertical", "縦方向に広げる", "arrows", ["spread", "vertical", "expand", "拡張", "縦", "矢印"], "axis-spacing"],
  ["compress-horizontal", "Compress Horizontal", "横方向に圧縮", "arrows", ["compress", "horizontal", "collapse", "圧縮", "横", "矢印"], "axis-spacing"],
  ["fork-left", "Fork Left", "左へ分岐", "arrows", ["fork", "branch", "left", "分岐", "左", "矢印"], "directional-fork"],
  ["fork-right", "Fork Right", "右へ分岐", "arrows", ["fork", "branch", "right", "分岐", "右", "矢印"], "directional-fork"],
  ["zigzag-rise", "Zigzag Rise", "ジグザグ上昇", "arrows", ["zigzag", "rise", "trend", "ジグザグ", "上昇", "矢印"], "zigzag-trend"],
  ["zigzag-fall", "Zigzag Fall", "ジグザグ下降", "arrows", ["zigzag", "fall", "trend", "ジグザグ", "下降", "矢印"], "zigzag-trend"],
];

export const batch008Catalog = Object.freeze(
  entries.map(([slug, name, nameJa, category, tags, family]) =>
    Object.freeze({ slug, name, nameJa, category, tags: Object.freeze([...tags]), createdAt, batch, ...(family ? { family } : {}) }),
  ),
);
