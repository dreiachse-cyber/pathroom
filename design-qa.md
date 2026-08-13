# PATHROOM design QA

この文書のスクリーンショットとブラウザ操作証跡は、初回公開時の144件版を基準としている。Batch 002以降の量産版については末尾の自動受け入れ追補を参照する。

## 対象

- source visual truth: `docs/references/pathroom-selected-home.png`
- implementation screenshot: `docs/qa/implementation-desktop-public.jpg`
- full-view comparison: `docs/qa/comparison-desktop-public.jpg`
- focused comparison: `docs/qa/comparison-cards-public.jpg`
- mobile evidence: `docs/qa/implementation-mobile-public.jpg`
- verified local URL: `http://127.0.0.1:4173/`
- state: queryなし、カテゴリ「すべて」、並び順「標準順」、初期48件、Searchカード選択

## Viewport normalization

- 参照画像は1487×1058px。
- 実装画像は1440×1024 CSS px、DPR 1で撮影した。
- 両者のアスペクト比はほぼ同一で、比較ページでは各パネルを同幅へ比例縮小した。
- 実装のレイアウト幅は縦スクロールバーを除く1425pxで、横スクロールはない。

## Full-view comparison

`docs/qa/comparison-desktop-public.jpg`で、ヘッダー、見出し、出典表示、検索、タブ、件数、並び順、6列グリッドを同じ比較画像上で確認した。

| Element | Reference target | Implementation |
| --- | ---: | ---: |
| Header height | 約65px | 66px |
| Main horizontal inset | 約37px | 36px |
| Search height | 約74px | 74px |
| Desktop columns | 6 | 6 |
| Card height | 約196〜199px | 198px |
| Card corner radius | 約9〜10px | 10px |

フォント、余白、罫線、白地、グラファイト文字、コバルトの選択状態は参照の視覚文法を維持している。公開版で必要になったTabler出典行は、既存の件数サブタイトルと同じタイポグラフィへ収めた。

## Focused comparison

`docs/qa/comparison-cards-public.jpg`で、選択カード、アイコンの視覚重量、英日ラベル、操作行、カード境界を拡大比較した。保存とコードコピーを同じ36pxの操作行へ収めたため、198pxのカード高と行間は変わっていない。

## Findings

- 未解決のP0、P1、P2はない。
- [fixed P2 / responsiveness] 320px幅で`body`の`min-width: 320px`と縦スクロールバーが干渉し、15pxの横方向超過が発生した。`min-width: 0`へ変更し、`scrollWidth === clientWidth`を再確認した。
- [fixed P2 / action layout] 320px幅では保存とコードのラベルが同じ操作行で競合した。360px以下では保存アイコンとコードラベルを非表示にし、保存65px・コード35pxの双方で`scrollWidth === clientWidth`を確認した。accessible nameは省略していない。
- [fixed P2 / accessibility] 失敗文言がpolite statusとalertで二重読み上げされる状態だった。失敗時はpolite statusを空にし、可視`role="alert"`だけで通知するようにした。
- [fixed P1 / legal disclosure] 公開成果物に第三者ライセンス全文が含まれていなかった。`site/public/THIRD_PARTY_NOTICES.txt`を追加し、Tabler、React、React DOM、Scheduler、Vite、Inter、Noto Sans JPの著作権表示とライセンス全文を公開成果物へ含めた。
- [fixed P2 / interaction clarity] コピーだけだった操作を、主操作「SVG保存」と補助操作「コード」へ整理した。補助buttonのaccessible nameとtitleは「SVGコードをコピー」とした。
- [fixed P1 / responsive navigation] 320px・375pxの`?category=originals`直接表示や履歴復元で選択タブが画面外に残る状態を、カテゴリ変更時に横スクロール領域だけを自動調整して解消した。

## Accepted P3 differences

- 参照はコピー操作だけを描いているが、公開版ではユーザーの主用途に合わせて同じ操作行へSVG保存を追加した。カード高、列数、白地中心の密度は維持している。
- この撮影時点の144件のうち120件はMITのTabler Iconsで、個々のglyphは参照画像と完全同一ではない。残る24件のPATHROOM Originalsとは、画面上の出典とライセンスを分けている。
- 参照画像の既定表示「名前順」はカードの提示順と整合しないため、実装ではその提示順を「標準順」と明示した。

## Interaction QA

- SVG保存: Searchの主buttonから`search.svg`を実際にダウンロードし、SVG本文、24×24、`currentColor`、Tablerの著作権表示と恒久的なライセンス全文URLを確認した。
- コードコピー: Searchの補助buttonが「済み」へ遷移し、live statusが「SearchのSVGコードをコピーした」となり、可視エラーが0件であることを確認した。
- 日本語タグ検索: `虫眼鏡` → Search 1件。
- 英語検索 + カテゴリ: `arrow` + `arrows` → 26件。
- 履歴とURL: 検索はreplace、カテゴリと並び順はpushし、popstateで復元する。
- 増分表示: 48 → 96 → 144件、最終buttonは「144件すべて表示済み」となりfocusを保持する。
- キーボード: `/`で検索へfocus、`Escape`で検索語とURLをクリアする。
- 第三者ライセンス: footerのbase-aware linkがローカルでは`/THIRD_PARTY_NOTICES.txt`、Pages buildでは`/pathroom/THIRD_PARTY_NOTICES.txt`へ解決する。

## Responsive QA

| Requested width | Layout width | Columns | Horizontal overflow |
| ---: | ---: | ---: | --- |
| 320px | 305px | 2 | none |
| 390px | 375px | 2 | none |
| 540px | 525px | 2 | none |
| 760px | 745px | 3 | none |
| 1120px | 1105px | 4 | none |
| 1440px | 1425px | 6 | none |

## Required fidelity surfaces

- Fonts and typography: Inter Variable + Noto Sans JP Variable、見出し・ブランド・本文のウェイト階層を維持。ボタン文字は13pxだが36pxの操作高と明確なaccessible nameを持つ。
- Spacing and layout rhythm: 36pxの左右inset、74px検索欄、76px結果バー、198pxカード、6/4/3/2列の既存リズムを維持。
- Colors and visual tokens: 白地、`#111318`、`#6c737d`、`#0645dc`、薄い罫線の対応を維持。保存を青、コードをneutral grayとして操作階層を付けた。
- Image quality and asset fidelity: 表示資産はすべてライブラリ由来の実SVGで、CSS描画や代替glyphはない。スクリーンショットはDPR 1で比較した。
- Copy and content: 保存とコードコピーの用途、Tabler由来、MIT、非オリジナル、将来のOriginals追加を公開文言で区別した。

## Build and runtime QA

- catalog/public-assets tests: 5 passed。
- Sites worker/package tests: 4 passed。
- GitHub Pages base-path assertion: 2 asset URLs passed for `/pathroom/`。
- production build: passed、6222 modules transformed。
- generated JS: 76.99kB gzip。
- browser console: warning 0、error 0。Vite接続debugとReact DevTools案内infoのみ。

## Comparison history

1. Initial implementation: shortcut hint、card height、weights、copy icon、focus、sorting、URL history、Clipboard fallback、144件pagingを修正した。
2. Previous final: full-viewとfocused comparisonで未解決P0/P1/P2なしを確認した。
3. Public release pass: SVG保存、補助コードコピー、Tabler出典、第三者ライセンス全文を追加して再撮影した。
4. Public release responsive pass: 320pxの横方向超過とカード操作ラベルの競合を修正し、6 breakpointすべてでoverflowなしを再確認した。
5. Final accessibility/license pass: 失敗通知の二重読み上げを解消し、React系runtimeとVite由来runtimeのMIT表示を公開noticeへ追加した。

final result: passed

## Batch 002 automated acceptance addendum

- 公開対象: 120 Tabler Icons + 56 PATHROOM Originals = 176件。
- 新規カテゴリ: コマース、コミュニケーション、データ、デバイスを各8件。
- 既存144件の標準順はSHA-256 snapshotで固定し、初期48件を含め変更なし。
- 176件すべてでslug・英語名が一意。56 Originalsではregistry key・displayNameも一意。
- 176件すべてで正規化geometry hashが一意。
- 56 Originalsすべてで24×24、`currentColor`、stroke 2、round cap/join、要素・属性allowlist、path構文、描画境界、primitive上限、XML整形式、ライセンスコメントを検証済み。
- 通常テスト: 23/23 passed。
- Sites worker/package tests: 4/4 passed。
- GitHub Pages base `/pathroom/`: 2 asset URLs passed。
- production build: passed、6235 modules transformed、generated JS 84.10kB gzip。
- 小サイズでの誤読リスクを静的セマンティック監査し、Pen Tablet、Room Speaker、Data Stream、Language Bubbles、Conversation Swap、Message Pin、Private Channelの7件を再設計した。
- Batch 002ではレイアウトとCSSを変更していない。新しいブラウザスクリーンショット証跡は作成していない。16/24/32pxの近似比較artifactはBatch 003から必須化する。

Batch 002 result: automated release gates passed

## Batch 003 automated acceptance addendum

- 公開対象: 120 Tabler Icons + 88 PATHROOM Originals = 208件。
- 新規Originals: UI、矢印、ファイル、メディアを各8件、計32件。
- 既存144件・176件の標準順をSHA-256 snapshotで保持し、208件版digest `8ba93f58aa80bcf9c3d5f19032986dcb7f5d87935cc1b61745c20571d472c54c`を追加した。
- 208件すべてでslug・英語名・日本語名・正規化geometryが一意。88 Originalsではregistry key・displayNameも一意。
- 88 Originalsすべてで24×24、`currentColor`、stroke 2、round cap/join、要素・属性allowlist、path構文、描画境界、primitive上限、XML整形式、ライセンスコメントを検証済み。
- 新規32件を16px、24px、32pxでrenderし、既存176件から各3近傍を比較するartifactを生成。PNG 282枚、artifact全287ファイル。
- pHash、content SSIM、名前・タグJaccard、回転・反転を比較し、閾値flagは3件。3件ともpHash距離6だけが反応し、SSIM 0.6570〜0.7353で、署名・盾など用途を分ける造形を理由付きで受け入れた。
- 全target・top3近傍・近似flag両端の3サイズrender digest `56194b9d8f866fb0d4ada8401e809e1ff21898f71b2296f58bbc9affb9a8a913`をreview JSONへ固定した。
- renderer、閾値、target metadata、top3関係とmetrics、flag内容をapproval digest `3e80a5df018b7ecc7e24cc51d25a3b4a2de06e442d0e1ba80533faffe8e8adea`へ固定し、geometryまたは判定契約の変更時は承認を失効させる。
- 通常テスト: 36/36 passed。
- Sites worker/package tests: 4/4 passed。
- GitHub Pages base `/pathroom/`: 2 asset URLs passed。
- production build: passed、6241 modules transformed、generated JS 87.50kB gzip。
- Batch 003ではレイアウトとCSSを変更していない。比較artifactはCIで生成・30日保存し、公開リポジトリにはreview判断だけを収録する。

Batch 003 result: automated release gates passed

## Batch 004 automated acceptance addendum

- 公開対象: 120 Tabler Icons + 120 PATHROOM Originals = 240件。
- 新規Originals: データ、コマース、地図、時間を各8件、計32件。
- semantic categoryとOriginals collectionを独立したフィルターへ分離し、デスクトップは全カテゴリのタブ、760px以下はコンパクトなselectを使う。旧`?category=originals`は後方互換として維持する。
- 既存144件・176件・208件の標準順をSHA-256 snapshotで保持し、240件版digest `fd0058975e343f8b3ca94a06f84a5c6e36c65b6f032e621221ae98c0a1e9d1d6`を追加した。
- 240件すべてでslug・英語名・日本語名・正規化geometryが一意。120 Originalsではregistry key・displayNameも一意。
- 120 Originalsすべてで24×24、`currentColor`、stroke 2、round cap/join、要素・属性allowlist、path構文、描画境界、primitive上限、XML整形式、ライセンスコメントを検証済み。
- 新規32件を16px、24px、32pxでrenderし、既存208件から各3近傍を比較するartifactを生成。PNG 300枚、artifact全305ファイル、manifest 304 entries。
- pHash、content SSIM、名前・タグJaccard、回転・反転の閾値flagは0件。最初のサイズ別レビューで細部密度を指摘した10件を簡略化し、再レビュー後は32件すべてで残存P0・P1・P2なし。
- 全target・top3近傍の3サイズrender digest `c76b0cf84b6c4519ed1fa7164e6bc154fdbf17b46eff41b8a325f51332350563`をreview JSONへ固定した。
- renderer、閾値、target metadata、top3関係とmetrics、flag内容をapproval digest `04344ec5929f79ecc47dad674a94aa13f3f19e942b4f48da84480d77e1ed64fd`へ固定した。
- 通常テスト: 42/42 passed。
- Sites worker/package tests: 4/4 passed。
- GitHub Pages base `/pathroom/`: 2 asset URLs passed。
- production build: passed、6247 modules transformed、generated JS 91.45kB gzip。
- Batch 004ではフィルター構造を変更したため、URL復元、popstate、desktop tabs、mobile select、collection paging resetをsource-contract testsへ追加した。新しいブラウザ操作スクリーンショットは作成せず、SVG raster artifactと自動検査を公開ゲートにした。

Batch 004 result: automated release gates passed

## Batch 005 automated acceptance addendum

- 公開対象: 120 Tabler Icons + 152 PATHROOM Originals = 272件。
- 新規Originals: コミュニケーション、人物、デバイス、ステータスを各8件、計32件。人物とステータスを有効化し、12カテゴリすべてがカタログへ揃った。
- 既存144件・176件・208件・240件の標準順をSHA-256 snapshotで保持し、272件版digest `19c22da895ea07a67ab3449a1992ec68a30a4b422efa67c06d8aaabe186529a0`を追加した。
- 272件すべてでslug・英語名・日本語名・正規化geometryが一意。152 Originalsではregistry key・displayNameも一意。
- 152 Originalsすべてで24×24、`currentColor`、stroke 2、round cap/join、要素・属性allowlist、path構文、描画境界、primitive上限、XML整形式、ライセンスコメントを検証済み。
- 新規32件を16px、24px、32pxでrenderし、既存240件から各3近傍を比較するartifactを生成。PNG 297枚、artifact全302ファイル、manifest 301 entries。
- pHash、content SSIM、名前・タグJaccard、回転・反転の閾値flagは0件。初回のサイズ別レビューで線の接触や密度を指摘した12件を簡略化し、再レビュー後は32件すべてで残存P0・P1・P2なし。
- 全target・top3近傍の3サイズrender digest `8bba60b96fc92249ecbf9d78a44cdb6fdd5f22c15aaa2ef961eeed3c7ddc9f76`をreview JSONへ固定した。
- renderer、閾値、target metadata、top3関係とmetrics、flag内容をapproval digest `e1dd66b74fcd7e6cc1ad58bb0a4886a61653dccda994ee275c84324cbab6444f`へ固定した。
- 英名・日本語名・タグに加えてslug自体を検索対象へ含め、32件すべてのslug検索と人物・ステータスのURL状態を回帰検査した。
- 通常テスト: 52/52 passed。
- icon visual QA: 32/32 passed、reviewed similarity flags 0件。
- Sites worker/package tests: 4/4 passed。
- GitHub Pages base `/pathroom/`: 2 asset URLsとSteam promotion画像3件 passed。
- production build: passed、6254 modules transformed、generated JS 95.81kB gzip。
- Batch 005ではカタログとカテゴリ選択肢だけを拡張し、既存レイアウト、SVG保存・コピー、ライセンス、AdSense、下部Steam promotionの契約を維持した。

Batch 005 result: automated release gates passed
