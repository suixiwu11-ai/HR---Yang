# STRIDE · 战略人效核算台

> **某大模型公司战略人效核算台**（公开信息推演 Demo）  
> 个人作品仓库：[suixiwu11-ai/HR---Yang](https://github.com/suixiwu11-ai/HR---Yang)

---

## 这是什么

面向 **HRBP** 的季度人力洞察工作台：**TCOW / Rev/FTE / Labor Cost% / 编制达成** 同屏，叠加战略能力×产品线×岗位族核算，并带 **Chat-to-BI** 与 **情景预测**。

| 模块 | 路径 |
|------|------|
| **完整文档索引** | [`docs/README.md`](docs/README.md) |
| **Next.js 应用** | [`web/`](web/) |
| **HTML 原型** | [`mockups/`](mockups/) |
| **UX 北极星** | [Netlify HRBP 原型](https://warm-squirrel-e57666.netlify.app/) |

---

## 快速开始

### 读文档

1. [`docs/00-background/business-narrative.md`](docs/00-background/business-narrative.md)  
2. [`docs/02-requirements/PRD-v1.3.md`](docs/02-requirements/PRD-v1.3.md)  
3. [`docs/03-architecture/architecture-v2.1.md`](docs/03-architecture/architecture-v2.1.md)

### 跑前端

```bash
cd web
npm install
npm run dev
```

### 看文档 HTML（无环境）

本地：[`mockups/index.html`](mockups/index.html)（业务背景 · PRD · 原型）

**在线（GitHub Pages）**：https://suixiwu11-ai.github.io/HR---Yang/  
维护说明：[`docs/GITHUB-PAGES.md`](docs/GITHUB-PAGES.md)

---

## 目录结构

```text
STRIDE/
├── README.md           # 本文件
├── docs/               # 结构化文档（见 docs/README.md）
├── mockups/            # HTML 原型
└── web/                # Next.js 14
```

---

## 免责声明

全部指标基于 **公开信息推演**，非任何公司官方 HR/财务数据。
