# STRIDE Web · 本地开发

**改 Netlify 环境变量后必须 Clear cache and deploy；本地必须同步 `.env.local`。**

## 环境变量

1. 复制 `.env.local.example`（或 `.env.example`）为 **`.env.local`**（勿提交 Git）。
2. 填入 DeepSeek `LLM_API_KEY` 等，与 Netlify 控制台保持一致。
3. 修改后 **重启** `npm run dev`。

## 验证 Copilot / LLM

- 开发环境：`GET http://localhost:3000/api/copilot/ask` 返回 `llmEnabled`；`NODE_ENV=development` 时另含 `debug`（provider、baseUrlHost、model、hasApiKey，**不含** Key 明文或后缀）。
- 页面上 Copilot 旁出现 **LLM** 徽章表示 Key 已加载。

## 与线上区别

| | localhost | Netlify |
|---|-----------|---------|
| 读 Key | `.env.local` | Site → Environment variables |
| 改 Key 后 | 重启 dev | Clear cache and deploy |

详见 [DEPLOY-NETLIFY.md](./DEPLOY-NETLIFY.md)。
