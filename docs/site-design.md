# SVGアイコン配布サイト 設計書

- 文書版: 0.1
- 作成日: 2026-08-09
- 公開先: GitHub Pages
- サイト名: PATHROOM
- 選択ビジュアル: `docs/references/pathroom-selected-home.png`
- 状態: 選択案1のローカルプロトタイプ実装・QA完了

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
| サイト生成 | Astro + TypeScriptの静的出力 | 個別アイコンページを静的生成しつつ、検索部分だけを軽く動かせる |
| トップページ | 検索・一覧を兼ねる | ランディングページを挟まず、最短でアイコンを取得できる |
| URL | 静的ページ + クエリパラメータ | GitHub Pagesで履歴ルーティングの404を避け、検索状態も共有できる |
| 一覧プレビュー | 外部SVGを`img`で表示 | 大量のSVGを最初からインラインDOMへ展開しない |
| 詳細プレビュー | 検査済みSVGのみインライン表示 | 色やサイズを試せるようにしつつ、安全性を保つ |
| 検索 | ビルド時生成JSONをブラウザ内で検索 | 実行時APIやデータベースを不要にする |
| 初期アイコン様式 | 暫定で24pxアウトライン、単色、`currentColor` | 量産時に統一しやすく、Web実装で扱いやすい。パイロット前に最終確認する |
| 生成処理 | ローカルまたは非公開CI | Luna/APIキーや未検品SVGを公開サイトへ持ち込まない |
| 一括配布 | 将来はGitHub Releases | Pagesの容量・帯域を圧迫せず、版ごとのZIPを配布できる |

Astroの採用は設計上の推奨であり、実装開始前に最終確認する。ReactだけのSPAでも主要機能は作れるが、個別ページ、共有URL、検索流入、404対策を考えると静的ページ生成の方が素直である。

## 3. MVPの範囲

### MVPに含める

- アイコン一覧
- 日本語・英語のキーワード検索
- カテゴリ、名前順・新着順の絞り込み
- 検索条件を保持する共有可能なURL
- SVGコードのコピー
- `.svg`ファイルのダウンロード
- アイコンごとの静的な詳細ページ
- sitemap、robots、ページごとの基本メタデータ
- 色と表示サイズのプレビュー変更
- ライセンスページ
- About／アイコン仕様ページ
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

「人気順」は計測基盤がなければ根拠を持てないため、MVPでは扱わない。お気に入りはコア導線の検証後に追加し、追加する場合の初期版は`localStorage`だけで完結させる。

## 4. 公開規模

| 段階 | アイコン数 | 目的 |
| --- | ---: | --- |
| パイロット | 24個 | 作風、SVG規格、検査、サイト表示の一連の流れを検証する |
| MVP公開 | 144個 | 検索・カテゴリ・詳細・コピー・保存を実用レベルで確認する |
| 拡張1 | 500個 | 生成、重複検出、レビュー運用を安定させる |
| 拡張2 | 2,000個 | インデックス分割や一覧仮想化の必要性を計測する |

初期カテゴリは8分類を想定する。

1. インターフェース
2. 矢印・方向
3. ファイル・フォルダ
4. メディア
5. コミュニケーション
6. 人物・アカウント
7. デバイス
8. ステータス・通知

## 5. 主要ユーザーフロー

### フローA: 名前が分かっている

1. トップページの検索欄へ「search」「虫眼鏡」などを入力する
2. 候補を一覧で比較する
3. カードの「SVGをコピー」を押す
4. `aria-live`と画面上の表示でコピー成功を確認する

### フローB: 用途から探す

1. カテゴリまたは用途タグを選ぶ
2. 一覧を見比べる
3. 個別ページを開き、背景色、アイコン色、表示サイズを試す
4. SVGをダウンロードする

### フローC: URLを共有する

1. 検索・カテゴリを指定する
2. URLへ`q`や`category`が反映される
3. URLを共有すると同じ検索状態が復元される

### フローD: 個別アイコンへ直接訪問する

1. 検索エンジンまたは共有リンクから`/icons/{slug}/`へ入る
2. アイコン、説明、ライセンス要約、コピー／保存操作を確認する
3. 全一覧へ戻る

## 6. 情報設計とURL

| URL | 役割 |
| --- | --- |
| `/` | サイト紹介、検索、フィルター、アイコン一覧 |
| `/icons/{slug}/` | 共有・検索流入向けの個別アイコンページ |
| `/license/` | アイコンとサイトコードのライセンス説明 |
| `/about/` | 制作方針、SVG仕様、更新方法、問い合わせ先 |
| `/404.html` | 存在しないページから一覧へ戻す |

カテゴリ別の独立ページはMVPでは作らず、`/?category=arrows`のようなフィルターURLで代用する。検索流入やカテゴリ数が増えた段階で`/categories/{slug}/`を静的生成する。

検索状態には次のクエリを使う。

```text
/?q=arrow&category=arrows&style=outline&sort=name
```

- `q`: 検索語
- `category`: カテゴリslug
- `style`: `outline`などの様式
- `sort`: `featured`（省略時）、`name`、`newest`

ページ番号は固定URLにせず、初期48件と「さらに表示」で扱う。ブラウザの戻る操作では検索条件とスクロール位置を可能な範囲で復元する。

`style`は将来の拡張を見越してURLとデータへ持たせるが、公開スタイルが1種類しかない間はフィルターUIを表示しない。

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
4. 「144件中48件」のような結果件数と並び順
5. アイコンカードグリッド
6. 「さらに表示」
7. ライセンス要約とフッター

大きな装飾ヒーローは置かず、最初の画面内で検索欄と複数のアイコンを確認できる高さに抑える。

### 7.3 アイコンカード

カードに表示する内容は次の通り。

- アイコンプレビュー
- 英語名
- 日本語名
- コピー
- 個別ページへのリンク

カテゴリやタグをすべてカードへ表示すると比較しづらくなるため、詳細画面へ回す。コピー操作はホバー時だけに隠さず、キーボードフォーカス時とタッチ端末でも常に到達可能にする。

推奨グリッドは`minmax(136px, 1fr)`を基準にし、モバイル2列、タブレット4列前後、デスクトップ6〜8列を目安とする。

### 7.4 個別ページ（MVP）

- 大型プレビュー
- 背景の明暗切り替え
- アイコン色
- 表示サイズ
- SVGコピー
- SVGダウンロード
- コード表示
- 英語名、日本語名、説明、カテゴリ、タグ、更新日
- ライセンスの短い要約と詳細ページへのリンク
- 固有の`title`と`description`
- canonical URL
- パンくず
- 実装例
- 一覧へ戻る導線

色、背景、サイズの操作には「プレビューのみ」と明記する。コピー／ダウンロードされるSVGは検査済みの原本であり、プレビュー変更を反映しない。線幅変更や変換済みコードの生成は、品質と予測可能性を確認してから追加する。

### 7.5 クイック詳細ダイアログ（将来）

一覧から離れずに確認する需要が見えた場合、個別ページの中核コンポーネントを再利用して追加する。

- デスクトップでは中央ダイアログ、モバイルではほぼ全画面のシートにする
- ダイアログを開いてもURLは変更しない
- 「固有URLを開く」操作だけが個別ページへ遷移する
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

SVG本体とメタデータは分離し、同じカテゴリとslugで対応させる。

```text
catalog/
  icons/
    arrows/
      arrow-up.svg
  metadata/
    arrows/
      arrow-up.json
```

メタデータ例:

```json
{
  "$schema": "../../../schemas/icon.schema.json",
  "slug": "arrow-up",
  "name": "Arrow Up",
  "nameJa": "上向き矢印",
  "aliases": ["up", "upload", "上", "上昇"],
  "description": "上方向を示す矢印",
  "category": "arrows",
  "tags": ["direction", "navigation"],
  "style": "outline",
  "viewBox": "0 0 24 24",
  "strokeWidth": 2,
  "file": "catalog/icons/arrows/arrow-up.svg",
  "version": "1.0.0",
  "createdAt": "2026-08-09",
  "updatedAt": "2026-08-09"
}
```

`fileSize`、要素数、正規化ハッシュなど、機械で確定できる値は手書きせず、検索インデックス生成時に付加する。

## 11. 検索設計

ビルド時にすべてのメタデータを集約し、公開用の軽量な`catalog.json`を生成する。

検索対象:

1. 英語名
2. 日本語名
3. aliases
4. tags
5. category
6. description

正規化:

- Unicode NFKC
- 英字を小文字化
- 前後空白と連続空白の整理
- 記号区切りを空白へ統一
- 日本語と英語の代表的な別名はメタデータで補う

優先順位は完全一致、前方一致、名前の部分一致、別名、タグ、説明の順にする。MVPでは外部検索ライブラリを必須にせず、件数と応答時間を計測してから導入する。

検索結果が0件の場合は、入力を失わずに次を表示する。

- フィルター解除
- 近いカテゴリ
- アイコン追加要望への導線（導入する場合）

## 12. 推奨リポジトリ構成

```text
.
├─ .github/
│  └─ workflows/
│     ├─ validate.yml
│     └─ pages.yml
├─ catalog/
│  ├─ icons/
│  └─ metadata/
├─ docs/
│  └─ site-design.md
├─ public/
│  └─ static/
├─ schemas/
│  └─ icon.schema.json
├─ scripts/
│  ├─ build-catalog.ts
│  ├─ validate-icons.ts
│  ├─ optimize-icons.ts
│  └─ render-contact-sheet.ts
├─ src/
│  ├─ components/
│  ├─ generated/
│  ├─ layouts/
│  ├─ pages/
│  │  ├─ icons/[slug].astro
│  │  ├─ index.astro
│  │  ├─ about.astro
│  │  ├─ license.astro
│  │  └─ 404.astro
│  └─ styles/
├─ astro.config.mjs
├─ package.json
├─ README.md
└─ tsconfig.json
```

`src/generated/`はスクリプトから再生成できる成果物にし、直接編集しない。公開用SVGはビルド時に最適化・検査済みのものだけを`dist/icons/`へコピーする。

## 13. Lunaを使う生成・検品フロー

```text
アイコン候補リスト
  → Lunaで20〜40個ずつ生成
  → JSON Schema検査
  → SVG安全性・構文検査
  → 規格検査と最適化
  → 重複検査
  → PNGコンタクトシート生成
  → 目視選別
  → catalogへ採用
  → サイトビルド
```

### 生成時に固定するもの

- SVG規格全文
- カテゴリごとの候補名と意味
- 参考となる合格済みアイコン数点
- 出力JSONのSchema
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
- SVGO後にも`viewBox`と意味が保たれる
- 正規化SVGハッシュが既存アイコンと重複しない
- メタデータがJSON Schemaへ適合する

### 目視検査

- 16px、24px、32pxで判別できる
- 線の太さと角の処理が他のアイコンと揃っている
- 視覚的な重心が中央にある
- 同カテゴリ内で意味が重複していない
- 一般的な記号の意味を誤解させない
- 左右反転や回転で済む派生が不必要に増えていない

自動検査に通ったことをデザイン品質の合格とは見なさない。パイロットでは全件、MVP以降は新規バッチごとにコンタクトシートで確認する。

## 14. GitHub Pages公開設計

### base path

プロジェクトサイトは通常、次の形になる。

```text
https://{owner}.github.io/{repository}/
```

そのため、`/assets/app.js`や`/icons/home.svg`のようなドメインルート固定URLは使わない。Astroの`site`と`base`、または共通URLヘルパーを経由し、次の形態をビルド設定だけで切り替えられるようにする。

- GitHub Pages: `/{repository}/`
- 対象プロジェクトへ直接設定したカスタムドメイン: `/`
- ユーザー／Organizationサイトのカスタムドメインを継承するプロジェクト: `/{repository}/`

### GitHub Actions

1. 依存関係を固定してインストール
2. Schema、SVG、リンク、型、アクセシビリティの検査
3. カタログと静的ページを生成
4. `dist/`をPages artifactとしてアップロード
5. `github-pages` environmentへデプロイ

checkoutを行うジョブには`contents: read`を、公開ジョブにはGitHub Pages公式手順に合わせて`pages: write`と`id-token: write`を与える。公開ジョブはbuildジョブを`needs`で参照し、`github-pages` environmentを使う。生成用のOpenAI APIキーは公開ジョブへ渡さない。

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

MVPでは上限へ近づかない見込みだが、`dist/`の容量をCIで記録する。大量のZIPや版別アーカイブはPagesへ複製せず、GitHub Releasesへ分離する。GitHub Pagesはオンライン事業、EC、商取引を主目的とするサイトや商用SaaSのホスト用途には使わない。有料販売を主要機能にする場合は公開基盤を見直す。

## 15. 性能設計

- 初期表示は48件を上限にする
- 一覧SVGは`img`と`loading="lazy"`を使う
- 外部SVGの`currentColor`は親ページから継承されないため、一覧のプレビュー面は常に十分な明暗差が出る固定背景にする
- 最初から全SVGをインライン化しない
- 検索インデックスはSVGパスを含めず、メタデータだけにする
- 一覧追加は「さらに表示」を基本とする
- 画像の読み込み中にもカード寸法を確保し、レイアウト移動を防ぐ
- JavaScriptの初期転送量はgzip後150KB以下を目標にする
- 1,000個時点で検索入力から結果更新まで100ms以内を目標にする
- 2,000個を超える前にカテゴリ別インデックス分割と仮想化を再評価する

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

- ブラウザからLunaやOpenAI APIを直接呼ばない
- APIキー、生成プロンプトの秘密情報、未公開素材を`public/`や`dist/`へ含めない
- SVGは許可リスト方式で検査し、未知の要素・属性を拒否する
- 検査前のSVGを`innerHTML`へ挿入しない
- ダウンロード対象もプレビュー対象と同じ検査済みファイルを使う
- 外部スクリプトを最小限にし、可能なら依存なしで開始する
- 公開前にサイトコードとアイコン素材のライセンスを別々に明記する

ライセンスは公開前の必須決定事項とする。商用利用、改変、再配布、クレジット、アイコン単体の再販売可否を曖昧にしない。PATHROOM Originalsは`Copyright (c) 2026 PATHROOM`、MIT Licenseで、商用利用・改変・単体販売を許可し、通常利用時の表示上のクレジットは任意、再配布時は著作権表示とMIT本文を同梱する条件で決定した。

## 18. CI品質ゲート

Pull Requestまたは公開前に次を必須化する。

```text
format
  → typecheck
  → metadata schema
  → svg security/spec validation
  → duplicate detection
  → unit tests
  → static build
  → internal link check
  → accessibility smoke test
```

デプロイはこれらがすべて成功した場合だけ実行する。生成SVGの目視確認は機械化せず、採用フラグまたはレビュー済みバッチ単位で管理する。

## 19. フェーズ計画

### Phase 0: 設計確定

- サイト名
- ビジュアル方向
- アイコンのライセンス（Tabler IconsとPATHROOM OriginalsはいずれもMITで決定。由来とnoticeは分離）
- コードのライセンス
- 初期カテゴリ
- GitHubリポジトリ名と将来のドメイン

### Phase 1: パイロット

- Astro静的サイトの骨格
- SVG規格とJSON Schema
- 24アイコン
- 検査スクリプト
- 一覧、検索、コピー、保存
- GitHub Pagesのテスト公開

### Phase 2: MVP

- 100個以上、目標144アイコン
- 個別ページとプレビュー操作
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

## 20. MVP完了条件

- 検査済みSVGを100個以上掲載し、目標144個へ到達している
- 英語名、日本語名、別名、タグの各検索ケースが通る
- NFKC、英字の大小文字、前後空白、複数語、0件、未知のクエリ値を含む検索テストが通る
- 検索状態をURLで再現でき、ブラウザの戻る／進む操作でも条件が復元される
- 全アイコンでコピーと保存が成功する
- 色・背景・サイズのプレビューを変更しても、コピー／保存されるSVGが検査済みの原本と一致する
- 個別ページを直接開いても404にならない
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

現在の実装は、Tabler Icons由来の120件とPATHROOM Originals 24件の計144件を掲載している。最初の48件と標準順を維持し、増分表示は48件、96件、144件の順に展開する。

## 22. GitHub公式資料

- [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
