const createdAt = "2026-08-13";
const batch = "006";

const entries = [
  ["person-reading", "Person Reading", "読書する人物", "people", ["person", "reading", "book", "人物", "読書", "本"]],
  ["person-running", "Person Running", "走る人物", "people", ["person", "running", "motion", "人物", "走る", "運動"]],
  ["person-carrying-box", "Person Carrying Box", "箱を運ぶ人物", "people", ["person", "carrying", "box", "人物", "運搬", "荷物"]],
  ["person-celebrating", "Person Celebrating", "喜ぶ人物", "people", ["person", "celebrating", "success", "人物", "祝福", "成功"]],
  ["parent-and-child", "Parent and Child", "親子", "people", ["parent", "child", "family", "親子", "家族", "人物"]],
  ["medical-worker", "Medical Worker", "医療従事者", "people", ["medical", "worker", "healthcare", "医療", "従事者", "人物"]],
  ["hard-hat-worker", "Hard Hat Worker", "ヘルメット作業員", "people", ["worker", "hard hat", "construction", "作業員", "ヘルメット", "人物"]],
  ["wheelchair-user", "Wheelchair User", "車椅子利用者", "people", ["wheelchair", "user", "accessibility", "車椅子", "利用者", "人物"]],
  ["draft-item", "Draft Item", "下書き", "status", ["draft", "item", "editing", "下書き", "編集中", "ステータス"]],
  ["under-review", "Under Review", "レビュー中", "status", ["review", "inspection", "pending", "レビュー中", "確認", "ステータス"]],
  ["approval-granted", "Approval Granted", "承認済み", "status", ["approval", "granted", "accepted", "承認済み", "許可", "ステータス"], "approval-outcome"],
  ["approval-denied", "Approval Denied", "承認却下", "status", ["approval", "denied", "rejected", "承認却下", "拒否", "ステータス"], "approval-outcome"],
  ["workflow-paused", "Workflow Paused", "作業一時停止", "status", ["workflow", "paused", "hold", "作業", "一時停止", "ステータス"]],
  ["cancelled-item", "Cancelled Item", "キャンセル済み", "status", ["cancelled", "item", "stopped", "キャンセル済み", "中止", "ステータス"]],
  ["access-expired", "Access Expired", "アクセス期限切れ", "status", ["access", "expired", "timeout", "アクセス", "期限切れ", "ステータス"]],
  ["verified-release", "Verified Release", "検証済みリリース", "status", ["verified", "release", "approved", "検証済み", "リリース", "ステータス"]],
  ["location-cluster", "Location Cluster", "位置クラスター", "maps", ["location", "cluster", "multiple pins", "位置", "クラスター", "地図"]],
  ["indoor-floor-plan", "Indoor Floor Plan", "屋内フロア図", "maps", ["indoor", "floor plan", "rooms", "屋内", "間取り", "地図"]],
  ["river-crossing", "River Crossing", "河川横断", "maps", ["river", "crossing", "bridge", "河川", "横断", "地図"]],
  ["elevation-profile", "Elevation Profile", "標高プロファイル", "maps", ["elevation", "profile", "terrain", "標高", "地形", "地図"]],
  ["geofence-radius", "Geofence Radius", "ジオフェンス範囲", "maps", ["geofence", "radius", "location", "ジオフェンス", "範囲", "地図"]],
  ["trail-signpost", "Trail Signpost", "登山道標識", "maps", ["trail", "signpost", "direction", "登山道", "道標", "地図"]],
  ["grid-coordinates", "Grid Coordinates", "グリッド座標", "maps", ["grid", "coordinates", "reference", "グリッド", "座標", "地図"]],
  ["ferry-route", "Ferry Route", "フェリー航路", "maps", ["ferry", "route", "waterway", "フェリー", "航路", "地図"]],
  ["countdown-ring", "Countdown Ring", "カウントダウンリング", "time", ["countdown", "ring", "timer", "カウントダウン", "残り時間", "時間"]],
  ["work-shift", "Work Shift", "勤務シフト", "time", ["work", "shift", "schedule", "勤務", "シフト", "時間"]],
  ["date-range", "Date Range", "日付範囲", "time", ["date", "range", "calendar", "日付", "期間", "時間"]],
  ["recurring-schedule", "Recurring Schedule", "繰り返し予定", "time", ["recurring", "schedule", "calendar", "繰り返し", "予定", "時間"]],
  ["focus-timer", "Focus Timer", "集中タイマー", "time", ["focus", "timer", "pomodoro", "集中", "タイマー", "時間"]],
  ["deadline-flag", "Deadline Flag", "締切フラグ", "time", ["deadline", "flag", "due date", "締切", "期限", "時間"]],
  ["time-allocation", "Time Allocation", "時間配分", "time", ["time", "allocation", "portion", "時間", "配分", "割合"]],
  ["clock-sync", "Clock Sync", "時計同期", "time", ["clock", "sync", "refresh", "時計", "同期", "時間"]],
];

export const batch006Catalog = Object.freeze(
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
