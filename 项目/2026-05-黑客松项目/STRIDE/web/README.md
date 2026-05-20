# STRIDE Web · Next.js + SQLite

可运行演示程序：真实 SQLite 存储、JSON 导入/导出、MD/HTML 报告下载、10× Lite。

## 部署到 Netlify（已连 GitHub）

见 [DEPLOY-NETLIFY.md](./DEPLOY-NETLIFY.md)。**Base directory** 填：

`项目/2026-05-黑客松项目/STRIDE/web`

上线后请到 **数据** 页点 **加载演示数据**。

## 服务器部署（阿里云 ECS · 方案 B）

见 [DEPLOY.md](./DEPLOY.md)：ECS + Ubuntu 22.04 + 安全组放行 22/80，SSH 后执行 `scripts/deploy/bootstrap.sh`。

## Copilot 大模型（DeepSeek，推荐）

1. 在 [DeepSeek 开放平台](https://platform.deepseek.com/api_keys) 创建 **API Key**
2. 复制 `.env.example` → `.env.local`，填入：
   ```env
   LLM_PROVIDER=deepseek
   LLM_API_KEY=sk-xxx
   LLM_MODEL=deepseek-chat
   LLM_BASE_URL=https://api.deepseek.com
   ```
   与 [DeepSeek 官方文档](https://api-docs.deepseek.com/zh-cn/) 的 `base_url` 一致；程序会自行拼接 `/chat/completions`，勿多写 `/v1`（写了也会自动纠正）。

3. `npm run dev` 重启后，Copilot 旁显示 **LLM** 即成功

| 模型 | `LLM_MODEL` |
|------|-------------|
| 对话（默认） | `deepseek-chat` |
| 推理（可选） | `deepseek-reasoner` |

**通义千问（可选）**：`LLM_PROVIDER=qwen`，Key 见 [DashScope](https://dashscope.console.aliyun.com/)，`LLM_MODEL=qwen-plus` 或 `qwen3.5-plus`。

无 Key 时自动退回规则问数。

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:3000

**首次使用**：进入「数据与报告」→「加载演示数据」，回到工作台「执行核算」。

## 数据

| 能力 | 入口 / API |
|------|------------|
| 演示种子 | `POST /api/demo/seed` · 设置页按钮 |
| 季度参数 | `POST /api/quarters`（收入 proxy 等） |
| 导出 JSON | `GET /api/data/export?quarter=2025Q3` · 设置页 |
| 导入 JSON | `POST /api/data/import` · 设置页上传 |
| 核算 | `POST /api/quarters/{id}/calculate` |
| HR 报告 MD | `GET /api/report?quarter=&type=hrbp&format=md` |
| HR 报告 HTML | `format=html` |
| 经营摘要 | `type=executive` · 同上 md/html |

数据库文件：`data/stride.db`（自动创建）

## 页面

- `/` 工作台（KPI / Copilot / 预警 / 场景）
- `/x10` 10× Handoff 与采纳登记
- `/settings` 数据与报告（导入导出、报告下载）
