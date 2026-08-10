# PATHROOM Originals 第1バッチ 引き継ぎ

作成日: 2026-08-09
対象: Luna 5.6 / 実装担当 / QA担当
作業リポジトリ: リポジトリルート（`.`）
推奨ブランチ: `codex/pathroom-originals-batch-001`

## 新スレッドへの貼り付け文

```text
作業リポジトリのルートに移動し、`docs/luna_originals_batch_001_handoff.md`を最初から最後まで読んでください。現行コードと作業ツリーを確認し、文書の順序・制約・完了条件に従ってPATHROOM Originals第1バッチを実装してください。Originals SVG素材の権利条件は本文の決定済み条件を使用し、個別の許可が出るまではstage・commit・push・merge・公開をしないでください。
```

## Lunaへの依頼

既存のTabler Icons 120件を残したまま、Luna制作の独自SVGコレクション「PATHROOM Originals」を24件追加する。

アイコンを単純追記してはいけない。現状は画面表示と保存SVGの著作権コメントがTabler固定なので、最初にコレクションとライセンスをデータ駆動化し、その後にOriginalsを8件ずつ3回に分けて制作・検査する。

ローカル実装、テスト、ビジュアルQAまで行う。stage、commit、push、merge、GitHub Pages公開は、それぞれご主人からそのスレッドで明示的な依頼があるまで行わない。決定済みの権利条件はGit操作の許可を兼ねない。

## 最初に確認すること

1. この文書と `site/AGENTS.md` を最後まで読む。
2. `git status --short --branch` で既存変更を確認し、ユーザーの変更を上書きしない。
3. 現行実装は `site/` 配下の **React 19 + Vite 6** である。`docs/site-design.md` に残るAstro、外部SVG、JSON metadata構成は将来案であり、今回の実装基準ではない。
4. PATHROOM Originalsには、次の決定済み権利条件を使う。
   - ライセンス対象: 今回追加するPATHROOM OriginalsのSVG素材
   - 権利者表記: `Copyright (c) 2026 PATHROOM`
   - ライセンス: MIT License
   - 商用利用、改変、再配布、アイコン単体での販売: 可
   - Webサイトやアプリなどで通常利用する際の表示上のクレジット: 任意
   - 素材の全部または一部を再配布する場合（アイコン単体での販売を含む）: 上記著作権表示とMIT License本文を同梱

## 現状

- 公開サイト: `https://dreiachse-cyber.github.io/pathroom/`
- 公開リポジトリ: `https://github.com/dreiachse-cyber/pathroom`
- 基準commit: `d3a25626f67e4cd9f11cfe04d0cff257ec02f81b`
- 既存カタログ: Tabler Icons v3.46.0由来の120件
- 現在の内訳: `ui: 58`、`arrows: 26`、`files: 18`、`media: 18`
- 初期表示: 48件
- 既存機能: 日本語・英語検索、カテゴリ、並び替え、URL状態保存、SVG保存、SVGコードコピー、レスポンシブ表示
- Pagesは`main`へのpushまたはGitHub上でのmerge直後にGitHub Actionsから自動公開される。`main`反映の許可は実質的に公開許可を含むため、公開前はfeature branchに留める。
- 現行workflowはfeature branch pushやPull Requestでは起動しない。feature branch段階ではローカル検証が唯一の自動ゲートになる。

## 絶対条件

- 既存Tabler 120件を削除、置換、改変しない。
- 現在の最初の48件と標準順を変えない。Originalsは既存120件の後ろへ追加する。
- Tablerのgeometry、他アイコンライブラリ、ロゴ、第三者作品をトレース、変形、近似コピーしない。
- TablerはTablerの著作権表示、OriginalsはOriginalsの著作権表示を使う。混在させない。
- サイトの白・グラファイト・コバルト、カード寸法、6列デスクトップ密度、保存を主操作とする階層を維持する。
- 新しいruntime依存関係は原則追加しない。React、React DOM、Viteで実装する。
- APIキー、生成用秘密情報、未検品素材をリポジトリ、`public/`、`dist/`へ入れない。
- `git add .`、`git add -A`、force push、hard resetを使わない。

## 先に直す権利表記

現状の `site/src/App.jsx` は次の点がTabler固定である。

- 紹介文: `{catalog.length} icons from Tabler Icons · MIT`
- フッター: 掲載中の全件をTablerとして説明
- `serializeIconSvg()`: 全SVGへTablerのMITコメントを挿入

Originals追加前に、最低限次のデータ構造へ拡張する。

```js
{
  slug,
  name,
  nameJa,
  category,
  collection: "tabler" | "pathroom-originals",
  Icon,
  tags,
  createdAt
}
```

ライセンス情報は各アイコンへ全文を重複させず、`site/src/catalog.jsx`または専用モジュールのコレクション定義へまとめる。

```js
export const collections = {
  tabler: {
    label: "Tabler Icons",
    licenseName: "MIT",
    publicLicenseUrl:
      "https://dreiachse-cyber.github.io/pathroom/THIRD_PARTY_NOTICES.txt",
    svgComment:
      "Tabler Icons v3.46.0 | MIT | Copyright (c) 2020-2026 Paweł Kuna",
  },
  "pathroom-originals": {
    label: "PATHROOM Originals",
    licenseName: "MIT",
    publicLicenseUrl:
      "https://dreiachse-cyber.github.io/pathroom/PATHROOM_ORIGINALS_LICENSE.txt",
    svgComment:
      "PATHROOM Original | MIT | Copyright (c) 2026 PATHROOM",
  },
};
```

`serializeIconSvg()`は`item.collection`からコメントを選び、必ず`License: <publicLicenseUrl>`を同じXMLコメントへ含める。コメントへ入るライセンス名、権利者表記、URLは制御文字、XMLコメントで禁止される`--`、末尾の`-`を拒否する。保存とコピーは必ず同じシリアライズ関数を使い続ける。

決定済みのMIT Licenseと上記利用条件を、日英で明瞭に記載した次の文書を追加する。

- ルート: `PATHROOM_ORIGINALS_LICENSE.md`
- 公開用: `site/public/PATHROOM_ORIGINALS_LICENSE.txt`
- フッター: Tabler第三者noticeとOriginals licenseを別リンクで表示
- README: Tabler 120件とOriginals 24件の由来を分けて記載
- `site/src/App.jsx`末尾の「Originalsは今後追加予定」を、現在の件数と由来が分かる文言へ更新
- `site/AGENTS.md`の将来予定を、既存TablerとOriginalsを別コレクションとして維持する決定へ更新
- `THIRD_PARTY_NOTICES.md`末尾の将来予定を、Originals専用ライセンスへの案内へ更新

`THIRD_PARTY_NOTICES.md`と`site/public/THIRD_PARTY_NOTICES.txt`は第三者noticeとして維持し、Originalsのライセンス本文へ流用しない。

## コレクション表示

大きな再設計は行わず、次の最小変更にする。

- 既存カテゴリ列の末尾へ`Originals`タブを追加する。
- `categories`へURLフィルター用の`originals`を登録し、`categoryIds`の検証対象へ含める。
- `filterCatalog()`は`category === "originals"`の場合だけ`item.collection === "pathroom-originals"`で判定し、それ以外は現行どおり`item.category`で判定する。
- `?category=originals`の直接表示、再読み込み、戻る・進むで24件へ復元されるテストを追加する。
- Originalのカードだけに小さな`PATHROOM`バッジを表示する。
- カテゴリ自体は引き続き`ui`、`arrows`、`files`、`media`のどれかを保持する。
- 紹介文は固定文言をやめ、`120 Tabler · MIT + 24 PATHROOM Originals · MIT`のように件数とライセンスをコレクション別に生成する。
- 検索対象へコレクション名、`original`、`オリジナル`を含める。
- 既存の検索URL、戻る・進む、新着順、初期48件、さらに表示を壊さない。
- 320pxでタブ、カード、保存・コード操作が横にはみ出さないことを確認する。

## Originalsの実装場所

既存のTabler importへgeometryを混在させず、次のように分離する。

```text
site/src/icons/pathroom-originals/
  createOriginalIcon.jsx
  batch-001-ui.jsx
  batch-001-arrows.jsx
  batch-001-files.jsx
  batch-001-media.jsx
  index.js
```

現行の`icon()` helperは末尾引数`collection = "tabler"`を追加し、既存120行は無変更でも実データ上`tabler`になるようにする。Originalsは必ず末尾引数へ`"pathroom-originals"`を明示する。実カタログ検査で、Tabler 120件とOriginals 24件のcollection件数を固定確認する。

コンポーネントは現行の`<Icon size={50} stroke={2} />`契約へ合わせる。

```jsx
export function IconPathroomExample({ size = 24, stroke = 2, ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 独自の検査済みgeometryのみ */}
    </svg>
  );
}
```

`createOriginalIcon.jsx`を置く場合はAPIを次に固定し、カテゴリ別ファイルから利用する。

```jsx
export function createOriginalIcon(displayName, geometry) {
  function OriginalIcon({ size = 24, stroke = 2, ...props }) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {geometry}
      </svg>
    );
  }

  OriginalIcon.displayName = displayName;
  return OriginalIcon;
}
```

## SVG制作規格

- キャンバス: `24 × 24`
- `viewBox`: `0 0 24 24`
- 様式: outline、単色
- 色: `currentColor`
- `fill`: `none`
- 基準線幅: `2`
- 線端・結合: `round`
- 基本余白: 2px相当
- 座標: 原則整数または0.5単位
- 1アイコン1用途
- 原則6 primitives以下。意味に必要な場合だけ8以下まで許可
- 1つの`path`の`d`は320文字以下
- pathは原則absolute commandを使い、描画座標と制御点を`0`から`24`へ収める
- 16px、24px、32pxで判別できる単純なシルエットにする

許可要素は`svg`、`path`、`circle`、`ellipse`、`rect`、`line`、`polyline`、`polygon`、必要最小限の`g`だけとする。

次は禁止する。

- `script`、`style`、`foreignObject`、`image`
- 外部URL、`href`、`xlink:href`、data URL
- `onload`などのイベント属性
- `filter`、`mask`、`clipPath`、`defs`
- `id`、不要な`transform`
- 固定色、gradient、埋め込みフォント、`text`
- 固定`title`
- ブランドロゴ、文字商標、既存ライブラリのpath流用

### PATHROOMらしさ

- Tablerと並べても線幅と余白は馴染ませる。
- geometryはゼロから設計し、輪郭を一筆で説明できるくらい簡潔にする。
- 1つの主輪郭と1〜3個の意味補助を基本にする。
- 開口部や余白を意識し、黒い塊や細かな装飾を作らない。
- 単なる既存アイコンの回転・反転・記号追加を新作として数えない。
- 同じカテゴリ内で角の丸み、端点、視覚的重心を揃える。

## 第1バッチ24件

一度に24件を盲目的に作らず、表の上から8件ずつ制作、検査、画面確認してから次へ進む。

| # | slug | English | 日本語 | category | 検索タグ例 |
|---:|---|---|---|---|---|
| 1 | `sparkles` | Sparkles | きらめき | `ui` | magic, shine, AI, 装飾 |
| 2 | `layers` | Layers | レイヤー | `ui` | stack, arrange, 重なり, 階層 |
| 3 | `drag-handle` | Drag Handle | ドラッグハンドル | `ui` | move, reorder, つかむ, 並べ替え |
| 4 | `command-key` | Command Key | コマンドキー | `ui` | shortcut, keyboard, 操作, キー |
| 5 | `contrast` | Contrast | コントラスト | `ui` | theme, brightness, 明暗, 表示 |
| 6 | `focus-frame` | Focus Frame | フォーカス枠 | `ui` | target, scan, 選択, 注目 |
| 7 | `move-all` | Move All | 全方向へ移動 | `arrows` | drag, direction, 移動, 四方向 |
| 8 | `turn-left` | Turn Left | 左折 | `arrows` | direction, corner, 左, 曲がる |
| 9 | `turn-right` | Turn Right | 右折 | `arrows` | direction, corner, 右, 曲がる |
| 10 | `route` | Route | 経路 | `arrows` | navigation, path, 道順, 移動 |
| 11 | `branch` | Branch | 分岐 | `arrows` | split, flow, 分かれる, 経路 |
| 12 | `merge` | Merge | 合流 | `arrows` | join, flow, まとまる, 経路 |
| 13 | `document-check` | Document Check | 確認済み文書 | `files` | approved, done, 文書, 完了 |
| 14 | `document-search` | Document Search | 文書検索 | `files` | find, inspect, 文書, 探す |
| 15 | `folder-lock` | Folder Lock | ロック付きフォルダ | `files` | secure, private, フォルダ, 保護 |
| 16 | `inbox` | Inbox | 受信箱 | `files` | receive, tray, 受信, 書類 |
| 17 | `package` | Package | パッケージ | `files` | box, delivery, 荷物, 配布 |
| 18 | `cloud-sync` | Cloud Sync | クラウド同期 | `files` | online, refresh, 同期, 保存 |
| 19 | `waveform` | Waveform | 波形 | `media` | audio, sound, 音声, 波 |
| 20 | `podcast` | Podcast | ポッドキャスト | `media` | broadcast, voice, 配信, 音声 |
| 21 | `subtitles` | Subtitles | 字幕 | `media` | captions, text, テロップ, 動画 |
| 22 | `picture-in-picture` | Picture in Picture | ピクチャーインピクチャー | `media` | player, window, 小窓, 動画 |
| 23 | `repeat` | Repeat | リピート | `media` | loop, replay, 繰り返し, 再生 |
| 24 | `shuffle` | Shuffle | シャッフル | `media` | random, mix, ランダム, 再生 |

`createdAt`は実際の採用日を`YYYY-MM-DD`で入れる。slugと正規化した英語名は既存120件を含めて一意にする。Originalsのexport registry keyと`displayName`もOriginals内で一意にする。

## 検査を追加する

現行`site/tests/catalog.test.mjs`は検索関数へ渡すダミーデータだけを検査しており、実カタログの重複は検査していない。次を追加し、`site/package.json`の`pnpm test`へ含める。

### `catalog-integrity.test.mjs`

- ViteのSSR module loaderで実際の`site/src/catalog.jsx`を読み込む。
- 必須フィールド、slugのkebab-case、英語名、日付、タグを検査する。
- slugと正規化した英語名の重複を拒否する。
- `Icon`が描画可能なcomponentであることを検査し、Originalsはregistry keyと`displayName`の重複も拒否する。Tabler側で共通のgeneric function nameが返る場合、それを一意性キーに使わない。
- categoryが`ui`、`arrows`、`files`、`media`のいずれかであることを検査する。
- collectionが定義済みであることを検査する。
- 合計144件、Tabler 120件、Originals 24件を検査する。

### `svg-integrity.test.mjs`

- Vite SSR + `react-dom/server`でOriginals全件を24pxとしてrenderする。
- `xmlns`、width 24、height 24、`viewBox`、`currentColor`、`fill="none"`、stroke 2、round cap/joinを検査する。
- 許可要素と、要素ごとの属性allowlistを定義し、未知の要素・属性、禁止要素、イベント属性、外部参照、空SVGを拒否する。
- primitivesは8以下、各pathの`d`は320文字以下とする。absolute pathの座標・制御点と各図形の境界が`0`から`24`内、基本描画が`2`から`22`内に収まることを検査し、光学調整の例外は理由を記録する。
- 全144件をrenderし、外側`svg`属性、空のbounding path、属性順、空白を除いてgeometryを正規化し、SHA-256の完全重複を拒否する。
- componentから生成したSVGへTabler固有のcopyrightが入っていないことを検査する。

### ライセンスとexportのテスト

- `site/tests/public-assets.test.mjs`へOriginalsの公開ライセンス文書と必須文言を追加する。
- SVGコメント生成をDOM処理から分離した純粋関数としてテストする。
- Tabler 1件にはTabler notice、Originals 1件にはOriginals noticeだけが入ることを検査する。
- noticeの各フィールドに制御文字、`--`、末尾`-`がある場合はexportを拒否するテストを追加する。
- ブラウザの`DOMParser`で生成したTabler／Originals各1件を`image/svg+xml`としてparseし、`parsererror`が0件であることをQA証跡へ残す。
- 保存とコピーが同じSVG文字列を使う設計を維持する。

## 目視QA

各8件と最終24件で`?category=originals&sort=name`を表示し、次を確認する。

- 16px相当でも意味を見分けられる。
- 24件の線幅、余白、角、重心が揃っている。
- TablerまたはOriginals同士でシルエットが近すぎない。
- PATHROOMバッジが主役のアイコンや操作ボタンを邪魔しない。
- 保存ボタンが主操作、コードボタンが補助操作に見える。
- 320px、390px、1440pxで横overflow、文字衝突、カード崩れがない。
- キーボードだけで検索、Originalsタブ、保存、コピーへ到達できる。
- Tabler 1件とOriginals 1件を実際に保存し、SVG本体、ファイル名、license commentを確認する。
- 日本語名、英語名、タグ、`Originals`検索が動く。

16px、24px、32pxの比較は、未commitの一時QA表示で同じ24件を3サイズ横並びにし、同一倍率のコンタクトシートを保存して確認する。確認後、一時QAコードは削除する。geometry hashの証跡には、正規化規則、比較対象144件、重複0件、SHA-256を使ったことを完了報告へ記載する。

QA画像を残す場合は、既存4枚を無条件で上書きせず、次へ保存する。

```text
docs/qa/originals-batch-001-desktop.jpg
docs/qa/originals-batch-001-mobile.jpg
docs/qa/originals-batch-001-contact-sheet.jpg
```

必要なら`.gitignore`のQA許可リストへ、確認済み画像だけを明示的に追加する。

## 検証コマンド

この引き継ぎ文書が未追跡で残っている状態は想定内であり、ユーザーの既存変更として保持する。開始時に`?? docs/luna_originals_batch_001_handoff.md`だけが表示される場合は削除・上書きせず、そのままfeature branchへ持ち越す。それ以外の変更がある場合は内容を確認し、勝手にstage、commit、退避、破棄しない。

ブランチが未作成の場合:

```powershell
# 作業リポジトリのルートから実行
git status --short --branch
git switch main
git pull --ff-only
git switch -c codex/pathroom-originals-batch-001
```

実装後:

```powershell
Set-Location "site"
pnpm install --frozen-lockfile
pnpm test

$env:VITE_BASE_PATH = "/pathroom/"
pnpm build
pnpm test:sites
pnpm test:pages-base
Remove-Item Env:VITE_BASE_PATH

Set-Location ".."
git diff --check
git diff --stat
git status --short
```

依存関係を追加していない場合、`site/pnpm-lock.yaml`を変更しない。

feature branchのpushだけではPages workflowは動かない。公開許可後に`main`へ反映した場合は、Actionsのbuildとdeployが両方successになるまで完了扱いにしない。

## 公開許可後の確認

この節は、ご主人から`main`反映と公開の明示許可が出た場合だけ実行する。

1. `main`へ反映するとPagesが自動公開されることを、操作前にご主人へ明示する。
2. GitHub Actionsの`Deploy PATHROOM to GitHub Pages`でbuildとdeployの両方がsuccessになるまで監視する。
3. `https://dreiachse-cyber.github.io/pathroom/`がHTTP 200で開くことを確認する。
4. CSSとJSが`/pathroom/assets/...`から正常に読み込まれることを確認する。
5. `https://dreiachse-cyber.github.io/pathroom/PATHROOM_ORIGINALS_LICENSE.txt`がHTTP 200で、確定した本文を返すことを確認する。
6. 公開版の`Originals`タブで24件が表示され、日本語・英語・タグ検索が動くことを確認する。
7. 公開版でTablerとOriginalsを各1件保存・コピーし、コレクション別の正しい権利コメントだけが入ることを確認する。

## 変更禁止・要注意

アイコン追加だけを理由に次を変更しない。

- `.github/workflows/pages.yml`
- `site/.openai/hosting.json`
- `site/worker/index.js`
- `site/scripts/prepare-sites-build.mjs`
- `site/tests/sites-worker.test.mjs`
- `site/vite.config.mjs`のPages base対応
- `docs/references/pathroom-selected-home.png`

次をcommitしない。

- `site/node_modules/`
- `site/dist/`
- `site/.vite/`
- `site/qa/`
- APIキー、token、秘密情報
- 未採用の生成候補や一時ダウンロード

## 完了条件

- 既存Tabler 120件がそのまま残り、Originals 24件を合わせて144件になる。
- 最初の48件と標準順が公開版から変わらない。
- `?category=originals`で24件だけ表示できる。
- OriginalカードだけがPATHROOM由来と分かる。
- TablerとOriginalsの件数、画面表示、ライセンスリンクが一致する。
- `App.jsx`、`README.md`、`site/AGENTS.md`、`THIRD_PARTY_NOTICES.md`に「Originalsは今後追加予定」という公開前の文言が残らない。
- Tablerの保存・コピーSVGにはTabler noticeだけが入る。
- Originalsの保存・コピーSVGには確定したOriginals noticeだけが入る。
- 24件がSVG規格、安全性、重複、自動テスト、目視QAを通る。
- 日本語、英語、タグ、カテゴリ、Originals検索と新着順が動く。
- 320pxから1440pxまで主要操作とフォーカス表示が壊れない。
- `pnpm test`、Pages base付きbuild、`test:sites`、`test:pages-base`、`git diff --check`が成功する。
- build成果物に秘密情報、未検品SVG、誤った権利表記が含まれない。
- 変更ファイルと検証結果を報告し、stage、commit、push、merge、公開はそれぞれご主人の確認を待つ。
- 公開許可が出た場合は、Actionsのbuild・deploy成功と公開版のライセンス・検索・保存・コピー確認まで完了する。

## 完了報告に含めるもの

- 追加した24件の一覧
- コレクション／ライセンス分離の実装要約
- 変更ファイル一覧
- 自動テストとbuild結果
- 320px、390px、1440pxのQA結果
- TablerとOriginals各1件の保存SVGコメント確認結果
- 未解決事項
- commit SHA（commitした場合のみ）

## 確定事項と残課題

- PATHROOM Originals SVG素材は`Copyright (c) 2026 PATHROOM`、MIT Licenseで確定済み。商用利用・改変・再配布・単体販売は可、通常利用時の表示上のクレジットは任意、再配布時は著作権表示とMIT本文を同梱する。
- 第1バッチの24件と命名はこの文書で提案済み。明確な意味重複や権利上の懸念が見つかった場合は、勝手に代替せず候補と理由をご主人へ提示する。
