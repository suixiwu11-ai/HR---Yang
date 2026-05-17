# STRIDE 文档站 · GitHub Pages 开启说明（约 2 分钟）

团队链接：`https://frankli9986.github.io/HR-hackathon-2026-05/`

**源码位置**：`项目/2026-05-黑客松项目/STRIDE/mockups/`（编辑这里）  
**发布副本**：仓库根目录 `docs/`（由工作流自动同步，也可用于分支部署）

---

## 1. 仓库可见性

若仓库为 **Private（私有）**，免费账号下外人通常 **无法打开** Pages。

- **推荐**：Settings → General → Change visibility → **Public**
- 若必须私有：需 GitHub Pro，并将 Pages 可见性设为 Public

---

## 2. 开启 Pages（二选一）

### 方式 A · GitHub Actions（推荐）

1. 打开 https://github.com/Frankli9986/HR-hackathon-2026-05/settings/pages  
2. **Build and deployment → Source** 选 **GitHub Actions**  
3. 打开 **Actions** → **Deploy STRIDE HTML docs** → **Run workflow**  
4. 约 1–2 分钟后访问：https://frankli9986.github.io/HR-hackathon-2026-05/

工作流在仓库根：`.github/workflows/deploy-stride-docs.yml`（**不是** `STRIDE/.github/workflows/`，子目录工作流 GitHub 不会执行）。

### 方式 B · 分支部署

1. Settings → Pages → Source：**Deploy from a branch**  
2. Branch：`main`，文件夹：**`/docs`** → Save  
3. 等待 1–3 分钟访问同上链接  

推送 `mockups/` 后，`Sync STRIDE docs for Pages` 会自动更新根目录 `docs/`。

---

## 3. 常用直达链接

| 页面 | 路径 |
|------|------|
| 首页 | `/` |
| 业务背景 | `/business-narrative.html` |
| PRD | `/prd.html` |
| 工作台原型 | `/prototype/workbench.html` |

---

## 4. 仍打不开？

| 现象 | 处理 |
|------|------|
| 404 | 确认 Pages 已开启；Actions 是否绿色成功 |
| 要登录 | 仓库是否 Private |
| 改了 mockups 没更新 | Actions 里 Re-run **Deploy STRIDE HTML docs**；或等 sync 工作流更新 `docs/` |
| 样式丢失 | 确认 `stride-doc-shared.css` 已提交在 mockups 目录 |

---

## 5. 维护约定

- **只改** `项目/.../STRIDE/mockups/`，不要手改 `docs/`（会被 sync 覆盖）  
- 详细说明见 [`项目/2026-05-黑客松项目/STRIDE/docs/GITHUB-PAGES.md`](../项目/2026-05-黑客松项目/STRIDE/docs/GITHUB-PAGES.md)
