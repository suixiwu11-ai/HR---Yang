# HR Hackathon 2026-05 · STRIDE

> **某大模型公司战略人效核算台**（公开信息推演 Demo）  
> 仓库：[github.com/suixiwu11-ai/HR-hackathon-2026-05](https://github.com/suixiwu11-ai/HR-hackathon-2026-05)

---

## 这是什么

面向 **HRBP** 的季度人力洞察工作台：**TCOW / Rev/FTE / Labor Cost% / 编制达成** 同屏，叠加战略能力×产品线×岗位族核算，并带 **Chat-to-BI** 与 **情景预测**（作品集 / 黑客松）。

| 模块 | 路径 |
|------|------|
| **文档（从这里读）** | [`docs/HACKATHON.md`](docs/HACKATHON.md) ← 黑客松 5 分钟路径 |
| **完整文档索引** | [`docs/README.md`](docs/README.md) |
| **Next.js 应用** | [`web/`](web/) |
| **HTML 原型** | [`mockups/`](mockups/) |
| **UX 北极星** | [Netlify HRBP 原型](https://warm-squirrel-e57666.netlify.app/) |

---

## 快速开始

### 读文档（评委 / 队友）

1. [`docs/HACKATHON.md`](docs/HACKATHON.md)  
2. [`docs/00-background/business-narrative.md`](docs/00-background/business-narrative.md)  
3. [`docs/02-requirements/PRD-v1.2.md`](docs/02-requirements/PRD-v1.2.md)

### 跑前端（开发者）

```bash
cd web
npm install
npm run dev
```

浏览器打开 http://localhost:3000

### 看原型（无环境）

本地打开 [`mockups/index.html`](mockups/index.html) 或 [`mockups/stride-home-digital.html`](mockups/stride-home-digital.html)

---

## 仓库结构

```text
├── README.md                 # 本文件（仓库入口）
├── docs/
│   ├── HACKATHON.md          # 黑客松必读 / 文档分层
│   ├── MANIFEST.md           # 全量文档清单与 tier
│   ├── SESSION-HANDOFF.md    # Agent 接续提示词
│   ├── 00-background/        # 业务与战略上下文
│   ├── 01-discovery/         # 专访与访谈综合
│   ├── 02-requirements/      # PRD、指标、分摊 JSON/CSV
│   ├── 03-architecture/      # 架构、UI 规范、埋点
│   ├── 04-demo/              # Demo 种子计划
│   └── 99-archive/           # 可选阅读（德勤建议等）
├── mockups/                  # 静态 HTML 原型
└── web/                      # Next.js 14 应用
```

---

## 免责声明

全部指标基于 **公开信息推演**，非任何公司官方 HR/财务数据。高假设占比须带水印；Executive 视图不展示岗位末位排名。

---

**团队仓库** · HR Hackathon 2026-05
