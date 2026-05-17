# ⚠️ 此目录下的 workflow 不会被 GitHub 执行

GitHub Actions **只识别仓库根目录**的 `.github/workflows/`。

请使用：

- `/.github/workflows/deploy-stride-docs.yml` — 发布到 GitHub Pages  
- `/.github/workflows/sync-stride-docs.yml` — 同步 mockups → 根目录 `docs/`

开启说明：仓库根 [`docs/GITHUB-PAGES-开启说明.md`](../../../../docs/GITHUB-PAGES-开启说明.md)

`deploy-pages.yml` 已弃用，保留本 README 以免误以为子目录 workflow 会生效。
