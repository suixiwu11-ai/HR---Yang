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
| `LLM_PROVIDER` | `deepseek` |
| `LLM_API_KEY` | 你的 [DeepSeek API Key](https://platform.deepseek.com/api_keys) |
| `LLM_BASE_URL` | `https://api.deepseek.com` |
| `LLM_MODEL` | `deepseek-chat`（可选 `deepseek-reasoner`） |

**DeepSeek 地址说明（与[官方文档](https://api-docs.deepseek.com/zh-cn/)一致）**

- 官方 `base_url` 为 **`https://api.deepseek.com`**，完整请求路径为 `POST /chat/completions`（示例：`curl https://api.deepseek.com/chat/completions`）。
- STRIDE 在 `src/lib/llm.ts` 里会把 `LLM_BASE_URL` 与 **`/chat/completions`** 拼接，因此环境变量里**不要**再写 `/v1`。
- 若你按 OpenAI SDK 习惯填了 `https://api.deepseek.com/v1`，程序会**自动去掉末尾 `/v1`**，仍能打到正确地址；Netlify 上推荐只填官方形式，避免混淆。

通义千问（可选）：`LLM_PROVIDER=qwen`，`LLM_BASE_URL` 用 `https://dashscope.aliyuncs.com/compatible-mode/v1`；Netlify 海外可试 `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`，`LLM_MODEL=qwen-plus`。

变量值**不要加引号**（`"https://..."` 会导致 `fetch failed`）。从 `.env` 导入后请 **Clear cache and deploy**。

保存后需 **重新部署** 才生效。

### 从 .env 文件批量导入（推荐）

仓库内已提供模板（路径均在 `STRIDE/web/`）：

| 文件 | 说明 |
|------|------|
| `env.netlify.example` | 仅占位符，**可提交** Git |
| `env.netlify` | 本地填写用，**已加入 .gitignore**，勿提交含真实 Key 的版本 |

**步骤：**

1. 复制 `env.netlify.example` 为 `env.netlify`（若尚无 `env.netlify`）。
2. 编辑 `env.netlify`，将 `LLM_API_KEY=your-deepseek-api-key-here` 改为你的 DeepSeek Key（也可先导入占位符，再在 Netlify UI 里改 Key）。
3. Netlify 站点 → **Site configuration** → **Environment variables** → **Import from a .env file**（或 **Import from .env**）。
4. 选择本地的 `env.netlify` 上传/粘贴内容并确认导入。
5. **Clear cache and deploy site**（清缓存重新部署），Copilot 等 LLM 功能才会读到新变量。

**注意：** 切勿把填好真实 `LLM_API_KEY` 的 `env.netlify` 提交到 GitHub。Node 版本已在根目录 `netlify.toml` 的 `[build.environment]` 中配置，无需通过 env 导入。

## 三、数据库持久化（推荐 Turso）

未配置 Turso 时，SQLite 在 **`/tmp`**，冷启动后数据会丢。

**推荐**：按 **`DEPLOY-TURSO.md`** 配置 `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`，数据保存在云端。

### 首次访问必做（无论是否 Turso）

1. 打开站点 → 顶栏 **数据**
2. 点 **加载演示数据**
3. 回工作台 **重新核算**

配置 Turso 后，导入/导出/核算结果会**长期保留**；未配置时同一时段内仍可用，冷启动后需重新加载演示数据。

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
| Copilot 无回复 / `fetch failed` | 检查 [DeepSeek Key](https://platform.deepseek.com/api_keys) 与 `LLM_BASE_URL`（无引号）；用通义时海外 Netlify 可改 **intl** 域名；开发环境看 `GET /api/copilot/ask` 的 `debug` |
| 数据丢了 | 配置 Turso（见 DEPLOY-TURSO.md）；否则再点「加载演示数据」 |

## 六、自定义域名（可选）

Netlify → Domain management → 添加域名 → 按提示配 DNS。
