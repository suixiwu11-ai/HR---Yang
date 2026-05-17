# GitHub Pages 部署（队友 / 评委一键访问）

访客打开链接 **无需 GitHub 登录**、无需仓库权限。  
前提：仓库为 **Public**（公开），并已按下列步骤开启 Pages。

---

## 1. 推送代码到 GitHub

```bash
cd "项目/2026-05-黑客松项目/STRIDE"

git init
git add mockups/ .github/workflows/deploy-pages.yml .gitignore
git add docs/ README.md
git commit -m "docs: add static HTML for GitHub Pages"

git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

> 若仓库已存在，只需 `git push` 即可触发自动部署。

---

## 2. 开启 GitHub Pages

1. 打开 GitHub 仓库 → **Settings** → **Pages**
2. **Build and deployment** → **Source** 选 **GitHub Actions**
3. 推送后等待 **Actions** 里 `Deploy docs to GitHub Pages` 跑绿（约 1–2 分钟）

---

## 3. 分享链接

部署成功后地址一般为：

```text
https://<你的用户名>.github.io/<仓库名>/
```

| 页面 | 路径 |
|------|------|
| 首页（自动跳转） | `/` |
| 业务背景 | `/stride-business-narrative.html` |
| PRD | `/stride-prd.html` |

**示例**（仓库名 `stride`、用户 `acme`）：

- `https://acme.github.io/stride/`
- `https://acme.github.io/stride/stride-prd.html`

把第一条发给队友或评委即可。

---

## 4. 发布内容说明

| 会发布 | 不会发布 |
|--------|----------|
| `mockups/index.html` | `web/node_modules` |
| `stride-business-narrative.html` | 本地 `.env` |
| `stride-prd.html` | `*.db` |
| `stride-doc-shared.css` | UI 原型（未放入部署目录则不上线） |

工作流只上传 **`mockups/`** 文件夹，不会把整个 monorepo 暴露到 Pages。

---

## 5. 常见问题

| 问题 | 处理 |
|------|------|
| 404 | 确认 Actions 已成功；Settings → Pages 显示 green |
| 要登录才能看 | 仓库是否为 **Private**；免费方案请改为 **Public** |
| 样式丢失 | 确认 `stride-doc-shared.css` 与 HTML 同目录已提交 |
| 改完不更新 | 等 1–2 分钟或 Actions 里 Re-run workflow |

---

## 6. 私有仓库

若必须 Private：个人账号可在 Settings 里为私有库开 Pages（访问仍 **公开、免登录**），组织私有库可能需付费套餐。黑客松/作品集建议直接用 **Public** 仓库。
