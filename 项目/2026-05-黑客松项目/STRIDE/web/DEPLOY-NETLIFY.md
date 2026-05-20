# 部署到 Netlify（已关联 GitHub）

仓库：https://github.com/suixiwu11-ai/HR---Yang

## 一、Netlify 控制台设置（404 多半是这里没配对）

进入站点 → **Site configuration** → **Build & deploy** → **Build settings**：

| 项 | 填写 |
|----|------|
| **Base directory** | `项目/2026-05-黑客松项目/STRIDE/web` |
| **Build command** | `npm ci && npm run build` |
| **Publish directory** | **留空**（交给插件）或 `.next` |
| **Node version** | 20 |

仓库**根目录**已添加 `netlify.toml`（含 `base = .../STRIDE/web`）。  
若 UI 里 Base directory **留空**，也会用根目录配置文件。

保存后 **Clear cache and deploy site**（清缓存重新部署）。

### 出现 “Page not found” 时检查

1. **Deploy log** 是否绿色 Published？若 Build failed，先修 log。  
2. log 里是否有 `Installing @netlify/plugin-nextjs`、`Next.js`？没有则说明目录错了。  
3. 是否误把 **Publish** 指到仓库根目录的 `docs/`（那是 GitHub Pages，不是本程序）。  
4. 访问的是 **Production 的 `xxx.netlify.app` 根路径 `/`**，不是旧 deploy 预览链接。  
5. 仍 404 → 建议改 **阿里云 ECS**（国内、不用买域名），见 `DEPLOY.md`。

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
