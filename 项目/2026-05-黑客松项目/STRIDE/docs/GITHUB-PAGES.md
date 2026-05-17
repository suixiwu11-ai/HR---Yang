# GitHub Pages 部署（队友 / 评委一键访问）

访客打开链接 **无需 GitHub 登录**、无需仓库权限。  
前提：仓库为 **Public**，且已在 Settings 开启 Pages（见下）。

> **重要**：GitHub 只执行**仓库根目录**下的 `.github/workflows/`。  
> 本目录旁的 `STRIDE/.github/workflows/deploy-pages.yml` **不会运行**，请使用根目录的 `deploy-stride-docs.yml` 与 `sync-stride-docs.yml`。

---

## 1. 文件在哪里改

| 用途 | 路径 |
|------|------|
| **编辑 HTML（源）** | `项目/2026-05-黑客松项目/STRIDE/mockups/` |
| **发布副本（自动生成）** | 仓库根 `docs/` |
| **一键开启说明** | [docs/GITHUB-PAGES-开启说明.md](../../../../docs/GITHUB-PAGES-开启说明.md) |

---

## 2. 开启 GitHub Pages

1. 仓库 **Settings → Pages**  
2. **方式 A（推荐）**：Source 选 **GitHub Actions** → Actions 里运行 **Deploy STRIDE HTML docs**  
3. **方式 B**：Source 选 **Deploy from a branch** → `main` + **`/docs`**

---

## 3. 分享链接

```text
https://<GitHub用户名>.github.io/<仓库名>/
```

Frank 主仓示例：

- 首页：https://frankli9986.github.io/HR-hackathon-2026-05/
- 业务背景：`.../business-narrative.html`
- PRD：`.../prd.html`
- 原型：`.../prototype/workbench.html`

---

## 4. 工作流说明

| 工作流 | 作用 |
|--------|------|
| **Deploy STRIDE HTML docs** | 从 `mockups/` 构建并发布到 Pages（Actions 部署） |
| **Sync STRIDE docs for Pages** | 将 `mockups/` 复制到根 `docs/`（分支部署用） |

---

## 5. 常见问题

| 问题 | 处理 |
|------|------|
| 404 | Pages 未开启，或 Actions 失败 |
| 要登录才能看 | 仓库是否为 Private |
| 改完不更新 | Re-run Deploy 工作流；确认改的是 `mockups/` 不是 `docs/` |

旧版文件名 `stride-prd.html`、`stride-business-narrative.html` 仍保留在 mockups 中作归档；导航以 `prd.html`、`business-narrative.html` 为准。
