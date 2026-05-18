# STRIDE Web · Next.js + SQLite

可运行演示程序：真实 SQLite 存储、JSON 导入/导出、MD/HTML 报告下载、10× Lite。

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
