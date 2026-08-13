# PATHROOM

日本語と英語で検索し、SVGファイルの保存とSVGコードのコピーができる公開アイコンカタログです。

選択したデザイン基準は `docs/references/pathroom-selected-home.png`、詳細設計は `docs/site-design.md` にあります。

## ローカル実行

```powershell
cd site
pnpm install --frozen-lockfile
pnpm dev
```

## 検証

```powershell
cd site
pnpm test
pnpm qa:icons
$env:VITE_BASE_PATH = "/pathroom/"
pnpm build
pnpm report:scale
pnpm test:sites
pnpm test:pages-base
```

GitHub Pagesでは `site/dist/client` だけを公開します。リポジトリ配下のbase pathはGitHub Actionsで自動設定します。初回公開前にGitHubの **Settings → Pages → Source** を **GitHub Actions** に設定してください。

## 現在の範囲

- 検索
- semantic categoryとOriginals collectionの独立した絞り込み
- 並び替え
- URLへの検索条件保存
- SVGファイルの保存
- SVGコードのコピー
- 保存・コピーのフィードバック
- レスポンシブ表示

公開準備中の実装版は、Tabler Icons v3.46.0由来の120アイコンとPATHROOM Originalsの独自制作物344アイコン、合計464件です。Batch 006〜011ではOriginalsを32件ずつ、計192件追加しました。現在公開中のGitHub PagesはBatch 005の272件で、464件版はまだデプロイしていません。Tabler IconsはMIT Licenseの条件で配布し、PATHROOM Originalsも [`PATHROOM_ORIGINALS_LICENSE.md`](PATHROOM_ORIGINALS_LICENSE.md) のMIT Licenseで配布しています。初期表示は48件です。第三者ソフトウェアとフォントの著作権表示・ライセンス全文は `THIRD_PARTY_NOTICES.md` を参照してください。

カテゴリ・バッチ件数、予約済みslug、release digest、検索ベンチマーク、production JavaScript容量は [`site/public/catalog-scale-report.json`](site/public/catalog-scale-report.json) に機械可読形式で固定しています。

1,000件（Tabler Icons 120件 + PATHROOM Originals 880件）までのカテゴリ配分、バッチ順、品質ゲートは [`docs/pathroom-1000-roadmap.md`](docs/pathroom-1000-roadmap.md) にまとめています。
