const createdAt = "2026-08-13";
const batch = "007";

const entries = [
  ["modal-window", "Modal Window", "モーダルウィンドウ", "ui", ["modal", "dialog", "overlay", "モーダル", "ダイアログ", "UI"]],
  ["segmented-control", "Segmented Control", "セグメント切替", "ui", ["segmented", "control", "switch", "セグメント", "切り替え", "UI"]],
  ["range-selector", "Range Selector", "範囲選択", "ui", ["range", "slider", "selection", "範囲", "スライダー", "UI"]],
  ["dropdown-field", "Dropdown Field", "ドロップダウン欄", "ui", ["dropdown", "select", "field", "ドロップダウン", "選択欄", "UI"]],
  ["split-pane-horizontal", "Horizontal Split Pane", "水平分割ペイン", "ui", ["split pane", "horizontal", "layout", "分割ペイン", "水平", "UI"]],
  ["stepper-control", "Stepper Control", "数値ステッパー", "ui", ["stepper", "number", "increment", "ステッパー", "数値入力", "UI"]],
  ["tree-view", "Tree View", "ツリー表示", "ui", ["tree", "hierarchy", "navigation", "ツリー", "階層", "UI"]],
  ["breadcrumb-trail", "Breadcrumb Trail", "パンくずリスト", "ui", ["breadcrumb", "trail", "navigation", "パンくず", "階層", "UI"]],
  ["u-turn-left", "U Turn Left", "左Uターン", "arrows", ["u-turn", "left", "reverse", "Uターン", "左", "矢印"], "u-turn"],
  ["u-turn-right", "U Turn Right", "右Uターン", "arrows", ["u-turn", "right", "reverse", "Uターン", "右", "矢印"], "u-turn"],
  ["lane-change-left", "Lane Change Left", "左レーンへ移動", "arrows", ["lane", "change", "left", "レーン変更", "左", "矢印"], "lane-change"],
  ["lane-change-right", "Lane Change Right", "右レーンへ移動", "arrows", ["lane", "change", "right", "レーン変更", "右", "矢印"], "lane-change"],
  ["reorder-up", "Reorder Up", "上へ並べ替え", "arrows", ["reorder", "up", "move", "並べ替え", "上", "矢印"], "item-reorder"],
  ["reorder-down", "Reorder Down", "下へ並べ替え", "arrows", ["reorder", "down", "move", "並べ替え", "下", "矢印"], "item-reorder"],
  ["bring-forward", "Bring Forward", "前面へ移動", "arrows", ["layer", "forward", "arrange", "レイヤー", "前面", "矢印"], "layer-order"],
  ["send-backward", "Send Backward", "背面へ移動", "arrows", ["layer", "backward", "arrange", "レイヤー", "背面", "矢印"], "layer-order"],
  ["document-template", "Document Template", "文書テンプレート", "files", ["document", "template", "layout", "文書", "テンプレート", "ファイル"]],
  ["folder-tree", "Folder Tree", "フォルダツリー", "files", ["folder", "tree", "hierarchy", "フォルダ", "階層", "ファイル"]],
  ["file-restore", "File Restore", "ファイル復元", "files", ["file", "restore", "recovery", "ファイル", "復元", "履歴"]],
  ["folder-transfer", "Folder Transfer", "フォルダ転送", "files", ["folder", "transfer", "move", "フォルダ", "転送", "移動"]],
  ["file-broken", "Broken File", "破損ファイル", "files", ["file", "broken", "corrupt", "ファイル", "破損", "エラー"]],
  ["document-bookmark", "Bookmarked Document", "しおり付き文書", "files", ["document", "bookmark", "saved", "文書", "しおり", "保存"]],
  ["file-binary", "Binary File", "バイナリファイル", "files", ["file", "binary", "code", "ファイル", "バイナリ", "データ"]],
  ["folder-stack", "Folder Stack", "フォルダスタック", "files", ["folder", "stack", "multiple", "フォルダ", "重なり", "複数"]],
  ["playback-speed", "Playback Speed", "再生速度", "media", ["playback", "speed", "player", "再生", "速度", "メディア"]],
  ["storyboard", "Storyboard", "ストーリーボード", "media", ["storyboard", "frames", "planning", "絵コンテ", "フレーム", "映像"]],
  ["video-chapters", "Video Chapters", "動画チャプター", "media", ["video", "chapters", "navigation", "動画", "チャプター", "メディア"]],
  ["camera-timer", "Camera Timer", "カメラタイマー", "media", ["camera", "timer", "photo", "カメラ", "タイマー", "撮影"]],
  ["panorama-view", "Panorama View", "パノラマ表示", "media", ["panorama", "wide", "photo", "パノラマ", "広角", "画像"]],
  ["media-cast", "Media Cast", "メディアキャスト", "media", ["cast", "screen", "stream", "キャスト", "画面", "配信"]],
  ["audiobook", "Audiobook", "オーディオブック", "media", ["audiobook", "book", "listen", "オーディオブック", "読書", "音声"]],
  ["clip-marker", "Clip Marker", "クリップマーカー", "media", ["clip", "marker", "timeline", "クリップ", "マーカー", "編集"]],
];

export const batch007Catalog = Object.freeze(
  entries.map(([slug, name, nameJa, category, tags, family]) =>
    Object.freeze({
      slug,
      name,
      nameJa,
      category,
      tags: Object.freeze([...tags]),
      createdAt,
      batch,
      ...(family ? { family } : {}),
    }),
  ),
);
