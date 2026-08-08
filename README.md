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
pnpm build
pnpm test:sites
pnpm test:pages-base
```

GitHub Pagesでは `site/dist/client` だけを公開します。リポジトリ配下のbase pathはGitHub Actionsで自動設定します。初回公開前にGitHubの **Settings → Pages → Source** を **GitHub Actions** に設定してください。

## 現在の範囲

- 検索
- カテゴリ絞り込み
- 並び替え
- URLへの検索条件保存
- SVGファイルの保存
- SVGコードのコピー
- 保存・コピーのフィードバック
- レスポンシブ表示

掲載中の120アイコンはTabler Icons v3.46.0由来で、PATHROOMの独自アイコンではありません。Tabler IconsはMIT Licenseの条件で配布しています。初期表示は48件です。PATHROOM Originalsは、現在のカタログを残したまま今後追加する予定です。著作権表示と第三者ライセンスの全文は `THIRD_PARTY_NOTICES.md` を参照してください。
