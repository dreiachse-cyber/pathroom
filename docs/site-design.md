# SVGアイコン配布サイト 設計書

- 文書版: 0.2
- 作成日: 2026-08-09
- 公開先: GitHub Pages
- サイト名: PATHROOM
- 選択ビジュアル: `docs/references/pathroom-selected-home.png`
- 状態: React/Vite公開版のBatch 002実装・QA完了

## 1. 企画の核

### プロダクトステートメント

利用者が目的のSVGアイコンを素早く見つけ、その場でコードをコピーするか、SVGファイルとして保存できる無料アイコンライブラリを作る。

サイトは「紹介を読む場所」より「すぐ使える道具」を優先する。トップページをそのまま検索可能なアイコン一覧にし、訪問からコピーまたはダウンロードまでを30秒以内で完了できる設計にする。

### 想定利用者

- Webサイトやアプリを作る個人開発者
- バナー、資料、SNS画像などを作るデザイナー・クリエイター
- 商用利用可否やクレジット条件を短時間で確認したい利用者
- 日本語でも英語でもアイコンを検索したい利用者

### 成功条件

- 初見の利用者が検索からSVGコピーまで迷わず完了できる
- 日本語名、英語名、別名、用途タグのどれからでも検索できる
- すべての公開SVGが同一のグリッド、線幅、余白、命名規則に適合する
- 不正なSVG要素、壊れたXML、重複slugを自動検査で公開前に止められる
- GitHub Pagesのプロジェクトサイトと将来のカスタムドメインの両方でリンクが壊れない
- 100〜2,000個程度まで、基本構成を変更せず段階的に増やせる

## 2. 現時点の設計判断

| 項目 | 採用案 | 理由 |
| --- | --- | --- |
| 公開方式 | GitHub Pages + GitHub Actions | サーバー不要で、検査済みの静的成果物だけを公開できる |
| サイト生成 | React 19 + Vite 6の静的SPA | 現行の一覧・検索・保存・コピーを単一ドキュメントで軽く配信できる |
| トップページ | 検索・一覧を兼ねる | ランディングページを挟まず、最短でアイコンを取得できる |
| URL | 単一ドキュメント + クエリパラメータ | GitHub Pagesで履歴ルーティングの404を避け、検索状態も共有できる |
| 一覧プレビュー | 検査済みReact SVGコンポーネント | 表示・コピー・保存が同じgeometryを使い、内容差異を防げる |
| 詳細操作 | カード内のSVG保存 + コードコピー | 一覧の密度を維持しながら主要用途を完了できる |
| 検索 | 同梱メタデータをブラウザ内で検索 | 実行時APIやデータベースを不要にする |
| アイコン様式 | 24pxアウトライン、単色、`currentColor` | 量産時に統一しやすく、Web実装で扱いやすい |
| 制作処理 | ローカルまたは非公開CI | 制作用の秘密情報や未検品SVGを公開サイトへ持ち込まない |
| 一括配布 | 将来はGitHub Releases | Pagesの容量・帯域を圧迫せず、版ごとのZIPを配布できる |

React/Vite SPAを現行の採用構成とする。個別アイコンページや静的生成への移行は、検索流入や共有導線の実測から必要性が確認できた場合だけ別フェーズで判断し、1,000件への量産条件にはしない。

## 3. MVPの範囲

### MVPに含める

- アイコン一覧
- 日本語・英語のキーワード検索
- カテゴリ、名前順・新着順の絞り込み
- 検索条件を保持する共有可能なURL
- SVGコードのコピー
- `.svg`ファイルのダウンロード
- 単一ページの基本メタデータ
- ライセンス要約と公開notice
- About／アイコン仕様のページ内情報
- モバイル、タブレット、デスクトップ対応
- キーボード操作とスクリーンリーダー向け通知
- SVG、メタデータ、リンク、ビルドの自動検査

### MVPから外す

- 会員登録、ログイン、サーバー保存
- 人気順ランキング
- ユーザー投稿
- PNG/WebP変換
- ZIPの動的生成
- お気に入り（端末内保存を含む）
- クイック詳細ダイアログ
- ダーク表示
- 関連アイコンの自動表示
- React/Vueコンポーネント形式のコピー
- 高度な誤字補正、意味検索、AI検索
- サイト上からのアイコン生成
- 有料決済
- アイコンごとの静的な詳細ページ
- 色と表示サイズのプレビュー変更

「人気順」は計測基盤がなければ根拠を持てないため、MVPでは扱わない。お気に入りはコア導線の検証後に追加し、追加する場合の初期版は`localStorage`だけで完結させる。

## 4. 公開規模

| 段階 | アイコン数 | 目的 |
| --- | ---: | --- |
| パイロット | 24個 | 作風、SVG規格、検査、サイト表示の一連の流れを検証する |
| 初回MVP公開 | 144個 | 検索・カテゴリ・詳細・コピー・保存を実用レベルで確認する |
| Batch 002 | 176個 | 32個単位の量産・検査・公開フローを確立する |
| 拡張1 | 500個 | 生成、重複検出、レビュー運用を安定させる |
| 目標 | 1,000個 | 120 Tabler + 880 Originalsの完成カタログに到達する |
| 拡張2 | 2,000個 | インデックス分割や一覧仮想化の必要性を計測する |

最終カテゴリは12分類を上限とする。

1. インターフェース
2. 矢印・方向
3. ファイル・フォルダ
4. メディア
5. コミュニケーション
6. 人物・アカウント
7. デバイス
8. ステータス・通知
9. データ
10. コマース
11. 地図・場所
12. 時間・日付

## 5. 主要ユーザーフロー

### フローA: 名前が分かっている

1. トップページの検索欄へ「search」「虫眼鏡」などを入力する
2. 候補を一覧で比較する
3. カードの「SVGをコピー」を押す
4. `aria-live`と画面上の表示でコピー成功を確認する

### フローB: 用途から探す

1. カテゴリまたは用途タグを選ぶ
2. 一覧を見比べる
3. カードの「SVG保存」を押す
4. 保存開始のフィードバックを確認する

### フローC: URLを共有する

1. 検索・カテゴリを指定する
2. URLへ`q`や`category`が反映される
3. URLを共有すると同じ検索状態が復元される

### フローD: カテゴリへ直接訪問する

1. 共有リンクから`/?category=communication`のようなURLへ入る
2. 対応カテゴリと件数が復元される
3. 検索、保存、コピーをそのまま続ける

## 6. 情報設計とURL

| URL | 役割 |
| --- | --- |
| `/` | サイト紹介、検索、フィルター、アイコン一覧 |
| `/?q=...&category=...&sort=...` | 共有可能なカタログ状態 |
| `/THIRD_PARTY_NOTICES.txt` | Tabler Iconsと第三者ソフトウェアのnotice |
| `/PATHROOM_ORIGINALS_LICENSE.txt` | PATHROOM OriginalsのMIT本文と利用条件 |

カテゴリ別の独立ページはMVPでは作らず、`/?category=arrows`のようなフィルターURLで代用する。検索流入やカテゴリ数が増えた段階で`/categories/{slug}/`を静的生成する。

検索状態には次のクエリを使う。

```text
/?q=arrow&category=arrows&sort=name
```

- `q`: 検索語
- `category`: カテゴリslug
- `sort`: `featured`（省略時）、`name`、`newest`

ページ番号は固定URLにせず、初期48件と「さらに表示」で扱う。ブラウザの戻る操作では検索条件とスクロール位置を可能な範囲で復元する。

## 7. 画面設計

### 7.1 共通ヘッダー

- 左: サイト名／ロゴ
- 中央または下段: 全体検索
- 右: About、ライセンス、GitHub
- モバイルでは検索欄を独立した2段目へ置く
- ヘッダーは検索中も使えるよう、画面上部へ控えめに固定する

### 7.2 トップ／カタログ

上から次の順で配置する。

1. 短い価値説明と公開アイコン数
2. 大きな検索欄
3. カテゴリチップとフィルター
4. 「176件中48件」のような結果件数と並び順
5. アイコンカードグリッド
6. 「さらに表示」
7. ライセンス要約とフッター

大きな装飾ヒーローは置かず、最初の画面内で検索欄と複数のアイコンを確認できる高さに抑える。

### 7.3 アイコンカード

カードに表示する内容は次の通り。

- アイコンプレビュー
- 英語名
- 日本語名
- SVG保存
- SVGコードのコピー
- PATHROOM Originalsだけに表示するcollection badge

カテゴリやタグをすべてカードへ表示すると比較しづらくなるため、検索メタデータとして保持する。保存とコピーはホバー時だけに隠さず、キーボードフォーカス時とタッチ端末でも常に到達可能にする。

推奨グリッドは`minmax(136px, 1fr)`を基準にし、モバイル2列、タブレット4列前後、デスクトップ6〜8列を目安とする。

### 7.4 カード操作（採用済み）

- 主操作はラベル付きのSVG保存、補助操作はSVGコードのコピーにする
- 表示、保存、コピーは同じ検査済みgeometryとcollection別ライセンス情報を使う
- 成功は`aria-live="polite"`、失敗は可視の`role="alert"`で通知する
- 保存後も保存buttonへ、Clipboard fallback後もコピーbuttonへフォーカスを戻す
- 320px幅ではラベルを省略してもaccessible nameを維持する

### 7.5 クイック詳細ダイアログ（将来）

一覧から離れずに大型プレビューを確認する需要が見えた場合に追加する。

- デスクトップでは中央ダイアログ、モバイルではほぼ全画面のシートにする
- ダイアログを開いてもURLは変更しない
- 閉じたときは呼び出し元カードへフォーカスを戻す
- `Escape`、フォーカストラップ、ブラウザの戻る操作を検証する

この方式により、MVPでは検索・スクロール状態とダイアログURLを同期する複雑さを持ち込まない。

## 8. ビジュアル原則

最初の方向性は「静かな道具箱」とする。アイコン自体が主役になるよう、サイトUIの装飾は抑える。

- 背景: 白に近いニュートラル色。将来のダーク表示では真黒を避けた濃色
- テキスト: 高い可読性を持つチャコール系
- アクセント: コピー成功、選択、フォーカスで使う1色
- カード: 薄い境界線、控えめな角丸、ホバー時も大きく動かさない
- 余白: 密度は高めだが、操作領域は44px前後を確保する
- 書体: UIは可読性の高いサンセリフ、SVGコードは等幅書体
- 動き: 120〜180ms程度の短い状態変化に限定する

具体的な色、書体、ロゴは実装前のビジュアル方向選定で確定する。

## 9. SVG制作規格

### 基本仕様

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- validated geometry only -->
</svg>
```

- キャンバス: 24 × 24
- 初期様式: outline
- 色: `currentColor`
- 塗り: `none`
- 基準線幅: 2
- 線端・結合: `round`
- 基本余白: 2px相当。光学調整が必要な場合のみ例外を記録する
- 座標: 原則0.5単位または整数
- ファイル名: 小文字のkebab-case
- slug: サイト全体で一意

### 許可する要素

- `svg`
- `path`
- `circle`
- `ellipse`
- `rect`
- `line`
- `polyline`
- `polygon`
- 必要最小限の`g`

### 禁止する要素・属性

- `script`
- `style`
- `foreignObject`
- `image`
- 外部URLを参照する`href` / `xlink:href`
- `onload`などのイベント属性
- 埋め込みデータURL
- 未承認の`filter`、`mask`、`clipPath`
- slugと衝突し得る未スコープの`id`
- 不要な`transform`

装飾用SVGに固定の`title`は含めない。利用側の文脈に応じて、装飾用途なら`aria-hidden="true"`、意味を持つ用途なら可視テキストまたは適切なラベルを付ける実装例をサイトへ掲載する。

## 10. アイコンデータ

Tabler IconsはpackageのReact componentをcatalogへ登録する。PATHROOM Originalsは、geometry component、frozen metadata manifest、slug-to-component registryをバッチ単位で分離し、slugで対応させる。

```text
site/src/icons/pathroom-originals/
  createOriginalIcon.jsx
  batch-002-commerce.jsx
  batch-002-communication.jsx
  batch-002-data.jsx
  batch-002-devices.jsx
  batch-002-catalog.js
  batch-002-registry.js
  index.js
```

Batch 002のメタデータ例:

```js
{
  "slug": "checkout-bag",
  "name": "Checkout Bag",
  "nameJa": "購入バッグ",
  "category": "commerce",
  "tags": ["checkout", "purchase", "commerce", "買い物", "購入", "コマース"],
  "createdAt": "2026-08-10"
}
```

manifestの配列、各item、tags配列をfreezeする。collection、Icon component、ライセンス情報はcatalog統合時に付加し、SVGの要素数・path構文・境界・正規化hashはテスト時にgeometryから算出する。

## 11. 検索設計

`catalog.jsx`がTabler 120件とバッチ別Originals metadataを集約し、ブラウザ内で検索する。別の`catalog.json`や実行時APIは使わない。

検索対象:

1. 英語名
2. 日本語名
3. tags（別名を含む）
4. collection名と「オリジナル」の検索語

categoryは検索文字列とは別のフィルターとして扱い、`originals`だけはsemantic categoryではなくcollectionフィルターとして処理する。

正規化:

- Unicode NFKC
- 英字を小文字化
- 前後空白と連続空白の整理
- 記号区切りを空白へ統一
- 日本語と英語の代表的な別名はメタデータで補う

現行検索は、正規化した各語が英語名、日本語名、tags、collection検索語のいずれかへ部分一致するAND検索とし、標準順を維持する。完全一致の重み付けや曖昧検索は、件数と応答時間を計測してから導入する。

検索結果が0件の場合は、入力を失わずに次を表示する。

- 0件であることを示すメッセージ
- 検索語とカテゴリを一度に戻す「検索条件をクリア」

## 12. 採用済みリポジトリ構成

```text
.
├─ .github/
│  └─ workflows/
│     └─ pages.yml
├─ docs/
│  ├─ pathroom-1000-roadmap.md
│  └─ site-design.md
├─ site/
│  ├─ public/
│  ├─ scripts/
│  ├─ src/
│  │  ├─ icons/pathroom-originals/
│  │  ├─ App.jsx
│  │  ├─ catalog.jsx
│  │  ├─ search.js
│  │  └─ svg.js
│  ├─ tests/
│  ├─ worker/
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.mjs
├─ README.md
└─ design-qa.md
```

PATHROOM Originalsは`site/src/icons/pathroom-originals/`へバッチ別に置き、メタデータとregistryもバッチ単位で分割する。公開対象は`site/dist/client`だけで、Sites互換のworker成果物はGitHub Pages artifactへ含めない。

## 13. バッチ制作・検品フロー

```text
アイコン候補リスト
  → このプロジェクトスレッドで原則32個ずつ制作
  → frozen metadata contract検査
  → SVG安全性・構文検査
  → 規格・全catalog geometry重複検査
  → 静的セマンティック監査
  → catalogへ採用
  → unit / Sites / Pages base / production build
```

Batch 003以降は、静的セマンティック監査に加えて16／24／32pxの比較artifactと近似候補レビューを追加する。

### 制作時に固定するもの

- SVG規格全文
- カテゴリごとの候補名と意味
- 参考となる合格済みアイコン数点
- バッチ別metadata manifestの必須field
- 1アイコン1用途の原則
- 禁止要素と最大複雑度

### 自動検査

- XMLとして解析できる
- `viewBox`が`0 0 24 24`
- `width`と`height`が24
- `currentColor`以外の固定色がない
- 禁止要素、イベント属性、外部参照がない
- slugとファイル名が一致する
- slug、英語名が重複しない
- 描画がキャンバス外へ出ていない
- 空のSVGではない
- 要素数・パスデータ量が上限以内
- 正規化SVGハッシュが既存アイコンと重複しない
- メタデータがcatalog contractへ適合する

### 目視検査

- 16px、24px、32pxで判別できる
- 線の太さと角の処理が他のアイコンと揃っている
- 視覚的な重心が中央にある
- 同カテゴリ内で意味が重複していない
- 一般的な記号の意味を誤解させない
- 左右反転や回転で済む派生が不必要に増えていない

自動検査に通ったことをデザイン品質の合格とは見なさない。Batch 002では静的セマンティック監査で小サイズの誤読リスクを修正し、Batch 003以降は新規バッチごとに16／24／32pxの比較artifactを残す。

## 14. GitHub Pages公開設計

### base path

プロジェクトサイトは通常、次の形になる。

```text
https://{owner}.github.io/{repository}/
```

そのため、`/assets/app.js`や`/icons/home.svg`のようなドメインルート固定URLは使わない。Viteの`base`と`import.meta.env.BASE_URL`を経由し、次の形態をビルド設定だけで切り替えられるようにする。

- GitHub Pages: `/{repository}/`
- 対象プロジェクトへ直接設定したカスタムドメイン: `/`
- ユーザー／Organizationサイトのカスタムドメインを継承するプロジェクト: `/{repository}/`

### GitHub Actions

1. 依存関係を固定してインストール
2. `pnpm test`でmetadata contract、SVG安全性、重複、URL・操作contract、公開noticeを検査
3. Vite production buildとSites package testを実行
4. GitHub Pages base pathを検証
5. `site/dist/client`をPages artifactとしてアップロード
6. `github-pages` environmentへデプロイ

checkoutを行うジョブには`contents: read`を、公開ジョブにはGitHub Pages公式手順に合わせて`pages: write`と`id-token: write`を与える。公開ジョブはbuildジョブを`needs`で参照し、`github-pages` environmentを使う。公開workflowへ制作・生成用の秘密情報は渡さない。

### カスタムドメイン

- 導入時はGitHub側へ先にドメインを登録する
- TXT検証を行う
- wildcard DNSは使わない
- HTTPSを強制する
- Actions公開ではリポジトリ内の`CNAME`ファイルが無視されるため、SettingsまたはAPIで設定する
- ドメイン変更後は絶対URLを再生成する

### Pagesの運用上限

GitHub公式の現行上限を公開パイプラインのガードレールにする。

- 公開サイトは最大1GB
- ソースリポジトリも1GB以内が推奨される
- 月間帯域は100GBのsoft limit
- デプロイは10分でタイムアウト
- 公開用リポジトリへ秘密情報や有料配布前の素材を置かない

MVPでは上限へ近づかない見込みだが、500件へ到達するまでに`site/dist/client`の容量をCIで記録する。大量のZIPや版別アーカイブはPagesへ複製せず、GitHub Releasesへ分離する。GitHub Pagesはオンライン事業、EC、商取引を主目的とするサイトや商用SaaSのホスト用途には使わない。有料販売を主要機能にする場合は公開基盤を見直す。

## 15. 性能設計

- 初期表示は48件を上限にする
- 一覧は表示対象の検査済みReact SVGだけを描画し、初期48件から段階的に追加する
- 初回DOMへ176件すべてのSVGを展開しない
- 検索照合文字列へgeometryを含めず、メタデータだけを使う
- 一覧追加は「さらに表示」を基本とする
- カード寸法をCSSで確保し、追加表示時のレイアウト移動を抑える
- JavaScriptの初期転送量はgzip後150KB以下を目標にする
- 1,000個時点で検索入力から結果更新まで100ms以内を目標にする
- 750件へ到達する前にgeometryの遅延読込を実装し、一覧仮想化を再評価する

## 16. アクセシビリティ

- WCAG 2.2 AAを目標にする
- 検索欄にはプレースホルダーだけでなく可視ラベルを付ける
- フィルターは`fieldset`と`legend`または同等の関連付けを行う
- アイコンだけのボタンに明確なアクセシブルネームを付ける
- コピー成功、検索件数の変化を`aria-live`で通知する
- 色だけで選択状態を示さない
- すべての主要操作をキーボードで完了できる
- フォーカスリングを削除しない
- 44px前後のタップ領域を確保する
- `prefers-reduced-motion`に従う
- MVPのライト表示で文字と操作部品のコントラストを検査し、将来ダーク表示を追加するときは両方を再検査する

## 17. セキュリティと公開上の注意

- ブラウザから制作・生成用APIを直接呼ばない
- APIキー、生成プロンプトの秘密情報、未公開素材を`public/`や`dist/`へ含めない
- SVGは許可リスト方式で検査し、未知の要素・属性を拒否する
- 検査前のSVGを`innerHTML`へ挿入しない
- ダウンロード対象もプレビュー対象と同じ検査済みファイルを使う
- 外部スクリプトを最小限にし、可能なら依存なしで開始する
- 公開前にサイトコードとアイコン素材のライセンスを別々に明記する

ライセンスは公開前の必須決定事項とする。商用利用、改変、再配布、クレジット、アイコン単体の再販売可否を曖昧にしない。PATHROOM Originalsは`Copyright (c) 2026 PATHROOM`、MIT Licenseで、商用利用・改変・単体販売を許可し、通常利用時の表示上のクレジットは任意、再配布時は著作権表示とMIT本文を同梱する条件で決定した。

## 18. CI品質ゲート

現在のGitHub Pages workflowは次を公開前に必須化する。

```text
metadata contract
  → svg security/spec validation
  → duplicate detection
  → unit tests
  → static build
  → Sites package tests
  → GitHub Pages base-path verification
```

デプロイはこれらがすべて成功した場合だけ実行する。format、型検査、内部リンク検査、ブラウザ型アクセシビリティsmoke test、サイズ別比較artifactはBatch 003以降のCI拡張候補として管理する。

## 19. フェーズ計画

### Phase 0: 設計確定

- サイト名
- ビジュアル方向
- アイコンのライセンス（Tabler IconsとPATHROOM OriginalsはいずれもMITで決定。由来とnoticeは分離）
- コードのライセンス
- 初期カテゴリ
- GitHubリポジトリ名と将来のドメイン

### Phase 1: パイロット

- React/Vite静的SPAの骨格
- SVG規格とmetadata contract test
- 24アイコン
- 検査スクリプト
- 一覧、検索、コピー、保存
- GitHub Pagesのテスト公開

### Phase 2: MVP

- 100個以上、初回目標144アイコン
- 一覧カードでSVG保存とコードコピー
- カテゴリと並び順
- ライセンス／About
- レスポンシブ、アクセシビリティ、SEO
- コンタクトシートを使った全件レビュー

### Phase 3: 拡張

- 500個以上への増量
- ZIPをGitHub Releasesで配布
- PNG出力
- 実装形式の追加
- お気に入り
- クイック詳細ダイアログ
- ダーク表示
- 関連アイコン
- 英語UI
- カテゴリ別ページ

### Phase 4: 1,000件カタログ

- Batch 002〜027を32件、Batch 028を24件として追加
- PATHROOM Originalsを880件へ拡張
- バッチ別メタデータ、slug予約台帳、近似形状レポートを運用
- 500件前後でbundleと検索性能を計測し、750件へ到達する前にgeometryの遅延読込を実装する。一覧仮想化は750件前後で再評価する
- 詳細な配分とゲートは`pathroom-1000-roadmap.md`に従う

## 20. MVP完了条件

- 検査済みSVGを100個以上掲載し、初回MVP目標144個へ到達している
- 英語名、日本語名、別名、タグの各検索ケースが通る
- NFKC、英字の大小文字、前後空白、複数語、0件、未知のクエリ値を含む検索テストが通る
- 検索状態をURLで再現でき、ブラウザの戻る／進む操作でも条件が復元される
- 全アイコンでコピーと保存が成功する
- 表示・コピー・保存が同じ検査済みgeometryとcollection別ライセンス情報を使う
- 検索・カテゴリ・並び順を含む直接URLで状態が復元される
- GitHub Pagesのリポジトリ配下URLでアセットが壊れない
- モバイル幅320pxからデスクトップまで主要操作が使える
- Chrome、Edge、Firefox、Safariの現行・1世代前を対象に主要フローを確認する
- キーボードだけで検索、詳細確認、コピー、保存ができる
- 自動アクセシビリティ検査で重大・深刻な違反が0件である
- 固定したCI環境と1,000件のテストデータで、検索更新時間の中央値が100ms以内である
- 自動検査と静的ビルドがCIで成功する
- ライセンス条件が全ページから確認できる
- 公開成果物に秘密情報が含まれていない

## 21. 実装前に決める4点

1. サイト名: **PATHROOMで決定**
2. アイコン素材のライセンス: **Tabler IconsとPATHROOM OriginalsはいずれもMITで決定。由来とnoticeは分離**
3. 初期アイコンの見た目（アウトライン案を採用するか）
4. ビジュアル方向とアクセントカラー: **選択案1の白・グラファイト・コバルトで決定**

PATHROOM Originalsの権利者表記は`Copyright (c) 2026 PATHROOM`で決定した。商用利用・改変・単体販売可、通常利用時の表示上のクレジットは任意、再配布時は著作権表示とMIT本文の同梱が必要である。

現在の実装は、Tabler Icons由来の120件とPATHROOM Originals 56件の計176件を掲載している。最初の48件と既存144件の標準順を維持し、増分表示は48件、96件、144件、176件の順に展開する。1,000件までの詳細は`pathroom-1000-roadmap.md`を参照する。

## 22. GitHub公式資料

- [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
