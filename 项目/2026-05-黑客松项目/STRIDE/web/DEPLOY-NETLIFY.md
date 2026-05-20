# 部署到 Netlify（已关联 GitHub）

仓库：https://github.com/suixiwu11-ai/HR---Yang

## 一、Netlify 控制台设置

进入站点 → **Site configuration** → **Build & deploy** → **Build settings**：

| 项 | 填写 |
|----|------|
| **Base directory** | `项目/2026-05-黑客松项目/STRIDE/web` |
| **Build command** | `npm run build`（或留空，读 `netlify.toml`） |
| **Publish directory** | 留空或 `.next`（由 `@netlify/plugin-nextjs` 处理） |
| **Node version** | 20 |

保存后 **Trigger deploy** → **Deploy site**。

## 二、环境变量（Site configuration → Environment variables）

在 Netlify 添加（**不要**写进 Git）：

| 变量名 | 值 |
|--------|-----|
| `LLM_PROVIDER` | `qwen` |
| `LLM_API_KEY` | 你的百炼 Key |
| `LLM_BASE_URL` | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| `LLM_MODEL` | `qwen3.5-plus` |

保存后需 **重新部署** 才生效。

## 三、首次访问必做

Netlify 上 SQLite 在 **`/tmp`**，冷启动后可能为空：

1. 打开站点 → 顶栏 **数据**
2. 点 **加载演示数据**
3. 回工作台 **重新核算**

同一时段内导入/导出可用；**长期持久化**仍建议用 ECS（见 `DEPLOY.md`）。

## 四、和 GitHub Pages 的区别

| | GitHub Pages | Netlify（本配置） |
|---|--------------|-------------------|
| 静态 PRD/原型 | ✅ `docs/` | 需另开站点或继续 Pages |
| **完整 STRIDE 程序** | ❌ | ✅ Next + API |

可 **Pages 继续放文档**，**Netlify 专门跑 `web/`**。

## 五、常见问题

| 问题 | 处理 |
|------|------|
| Build 找不到 package.json | 检查 Base directory 路径是否含 `STRIDE/web` |
| better-sqlite3 编译失败 | Node 20；Build 日志里看 npm install 是否成功 |
| Copilot 无回复 | 检查环境变量是否配置并重新 deploy |
| 数据丢了 | Netlify 无状态，再点「加载演示数据」 |

## 六、自定义域名（可选）

Netlify → Domain management → 添加域名 → 按提示配 DNS。
