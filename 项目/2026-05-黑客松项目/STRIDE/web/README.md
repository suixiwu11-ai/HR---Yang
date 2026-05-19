# STRIDE Web · Next.js + SQLite

可运行演示程序：真实 SQLite 存储、JSON 导入/导出、MD/HTML 报告下载、10× Lite。

## 服务器部署（阿里云 ECS · 方案 B）

见 [DEPLOY.md](./DEPLOY.md)：ECS + Ubuntu 22.04 + 安全组放行 22/80，SSH 后执行 `scripts/deploy/bootstrap.sh`。

## Copilot 大模型（可选）

1. 复制 `.env.example` 为 `.env.local`
2. 填入 `LLM_API_KEY`（**不要**提交到 GitHub）
3. 默认按 **DeepSeek** 兼容接口；其他厂商改 `LLM_BASE_URL` / `LLM_MODEL`
4. 重启 `npm run dev`，侧栏 Copilot 显示 **LLM** 徽标即已启用

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
