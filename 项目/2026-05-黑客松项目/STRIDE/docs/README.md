# STRIDE 文档索引 — 某大模型公司战略人效核算台

> **英文代号**：**STRIDE** — *Strategic Talent ROI & Investment Decision Engine*  
> **中文产品名**：某大模型公司战略人效核算台（对外标题不出现 MiniMax 品牌）  
> **免责声明**：全部内容基于 **公开信息推演**，非任何公司官方 HR/财务数据；仅供作品集与学习交接使用。

---

## 黑客松 · 先读这里

| 文档 | 说明 |
|------|------|
| **[HACKATHON.md](./HACKATHON.md)** | **5 分钟阅读路径**（Tier 0/1/2/3） |
| [MANIFEST.md](./MANIFEST.md) | 全文件清单与 tier 标签 |
| [STRIDE README](../README.md) | 本产品设计说明、`web/` 启动 |
| [团队仓库根 README](../../../README.md) | 黑客松团队入口 |

---

## 一句话电梯演讲

**STRIDE** 是一款面向上市大模型公司的 **战略人效核算台**：把人力投入映射到 **战略能力 C1–C7 × 产品线 P1–P6 × 9 岗位族（含 10x RF09）** 三维矩阵，并纳入横切 **10x Program（X10）** 的双向协作（支撑 + 采纳），用 **披露/代理双通道** 指标支撑 Executive、CPO、HRBP 分视图季度叙事——在 **无 HRIS、无登录鉴权** 的作品集 Demo 中，15 分钟内完成「战略配置 → 填数 → 核算 → 报告导出」。

---

## 新 Session 快速交接

完整可复制提示词：[SESSION-HANDOFF.md](./SESSION-HANDOFF.md)

## 新 Session 开场白（复制即用）

```text
我在做作品集项目 STRIDE（某大模型公司战略人效核算台）。
请先读 docs/README.md，再按角色选读路径。
领域模型见 .cursor/skills/minimax-strategic-workforce/SKILL.md。
数据均为公开信息推演，勿当作官方 HR 数据。
当前状态：PRD v1.2 + 架构 v2.1 + 文档已结构化；`web/` Next.js 待对齐 PRD MVP。
```

---

## 阅读顺序

### 开发者（实现 MVP）

| 顺序 | 文档 | 目的 |
|------|------|------|
| 1 | [02-requirements/PRD-v1.2.md](./02-requirements/PRD-v1.2.md) | 范围、HR 工作台、Chat-to-BI、预测 |
| 2 | [03-architecture/architecture-v2.1.md](./03-architecture/architecture-v2.1.md) | 四层架构、SQLite API、数据模型 |
| 2b | [03-architecture/ui-design-digital-v1.md](./03-architecture/ui-design-digital-v1.md) | 亮色数字化 UI 规范（Tailwind / 组件） |
| 3 | [02-requirements/allocation-default.json](./02-requirements/allocation-default.json) | 默认分摊矩阵 |
| 4 | [02-requirements/metrics-dictionary.csv](./02-requirements/metrics-dictionary.csv) | 指标字典骨架 |
| 5 | [04-demo/demo-seed-plan.md](./04-demo/demo-seed-plan.md) | 2025Q2–Q4 种子数据 |
| 6 | [03-architecture/event-tracking-plan.md](./03-architecture/event-tracking-plan.md) | 埋点（实现后接入） |
| 7 | `.cursor/skills/minimax-strategic-workforce/SKILL.md` | Agent 领域速查 |

### 评审者 / 作品集访客（叙事优先）

| 顺序 | 文档 | 目的 |
|------|------|------|
| 1 | [00-background/business-narrative.md](./00-background/business-narrative.md) | **HRBP 视角业务背景、痛点、数字化价值** |
| 2 | [00-background/project-background.md](./00-background/project-background.md) | 为何做、约束、选型 |
| 3 | [00-background/strategic-context.md](./00-background/strategic-context.md) | C1–C7、P1–P6、X10、人效动机 |
| 4 | [01-discovery/interview-synthesis.md](./01-discovery/interview-synthesis.md) | 跨访谈洞察与产品裁决（含 10x） |
| 5 | [02-requirements/PRD-v1.2.md](./02-requirements/PRD-v1.2.md) | 产品决策（HR 优先 + 数字化能力） |
| — | [Netlify HRBP 原型](https://warm-squirrel-e57666.netlify.app/) | **UX 北极星**（四 Tab + Chat-to-BI） |
| 6 | [00-background/10x-team-program.md](./00-background/10x-team-program.md) | 10x 横切项目定位 |
| 7 | [01-discovery/interviews-executives.md](./01-discovery/interviews-executives.md) | 高管/HRBP 专访 |
| 8 | [01-discovery/interviews-product-lines.md](./01-discovery/interviews-product-lines.md) | 六产品线专访全文 |
| 9 | [01-discovery/interviews-10x-program.md](./01-discovery/interviews-10x-program.md) | 10x Program 专访 |

---

## 文档目录树

```text
docs/
├── README.md                          ← 本文件（总索引）
├── 00-background/
│   ├── business-narrative.md          # HRBP 视角业务叙事（评审首选）
│   ├── project-background.md          # 作品集/桌面研究/MiniMax 选型
│   ├── strategic-context.md           # C1–C7、P1–P6、X10、为何做人效
│   └── 10x-team-program.md            # 10x 横切项目、领域 Pod、双边闭环
├── 01-discovery/
│   ├── interviews-executives.md       # HRBP/CPO/CEO/CFO 专访全文
│   ├── interviews-product-lines.md    # P1–P6 产品线专访全文
│   ├── interviews-10x-program.md      # 10x Program 专访
│   └── interview-synthesis.md         # 跨访谈主题、冲突、裁决（含 10x）
├── 02-requirements/
│   ├── PRD-v1.2.md                    # 主 PRD（HR 工作台 + Copilot + 预测）
│   ├── PRD-v1.1.md                    # 归档（superseded）
│   ├── user-decisions.md              # 用户确认的 6 项交付决策
│   ├── 10x-team-assessment-framework.md   # 10x 四维考核 D1–D4、协作分
│   ├── collaboration-10x-obligations.md # 各 RF 支撑/采纳义务
│   ├── metrics-dictionary.csv         # 指标字典（含 X10 / 10x 协作）
│   └── allocation-default.json        # Demo 默认分摊（含 RF09、C7、X10）
├── 03-architecture/
│   ├── architecture-v2.1.md           # 四层架构 + SQLite API
│   ├── ui-design-digital-v1.md        # UI 规范（亮色数字化 · APPROVED）
│   └── event-tracking-plan.md         # MVP 埋点计划
├── 04-demo/
│   └── demo-seed-plan.md              # 2025Q2–Q4 预填计划
├── 99-archive/                        # Tier 3：德勤建议等（黑客松可跳过）
│   ├── README.md
│   └── advisory/deloitte-china-...md
├── HACKATHON.md                       # 黑客松阅读路径
├── MANIFEST.md                        # 文档清单 + tier
└── assets/                            # 预留（Mermaid 源等）

# 旧路径重定向（勿再编辑正文）
├── PRD-MiniMax-Strategic-Workforce-v1.0.md → 02-requirements/PRD-v1.1.md
├── architecture-v2.md                      → 03-architecture/architecture-v2.1.md
```

---

## 按主题速查

| 主题 | 主文档 |
|------|--------|
| 业务叙事（评审首选） | [00-background/business-narrative.md](./00-background/business-narrative.md) |
| 背景与约束 | [00-background/project-background.md](./00-background/project-background.md) |
| 战略能力 / 产品线 / 10x | [00-background/strategic-context.md](./00-background/strategic-context.md) · [10x-team-program.md](./00-background/10x-team-program.md) |
| 10x 考核与协作义务 | [02-requirements/10x-team-assessment-framework.md](./02-requirements/10x-team-assessment-framework.md) · [collaboration-10x-obligations.md](./02-requirements/collaboration-10x-obligations.md) |
| 10x 专访 | [01-discovery/interviews-10x-program.md](./01-discovery/interviews-10x-program.md) |
| 高管专访 | [01-discovery/interviews-executives.md](./01-discovery/interviews-executives.md) |
| 产品线专访 | [01-discovery/interviews-product-lines.md](./01-discovery/interviews-product-lines.md) |
| 访谈综合 | [01-discovery/interview-synthesis.md](./01-discovery/interview-synthesis.md) |
| PRD | [02-requirements/PRD-v1.2.md](./02-requirements/PRD-v1.2.md) |
| 用户决策 | [02-requirements/user-decisions.md](./02-requirements/user-decisions.md) |
| 架构 | [03-architecture/architecture-v2.1.md](./03-architecture/architecture-v2.1.md) |
| UI 设计 / 评委导读 HTML | [mockups/index.html](../mockups/index.html) · [ui-design-digital-v1.md](./03-architecture/ui-design-digital-v1.md) |
| **UI 设计（亮色数字化）** | [03-architecture/ui-design-digital-v1.md](./03-architecture/ui-design-digital-v1.md) · 原型 [mockups/stride-home-digital.html](../mockups/stride-home-digital.html) |
| Demo 种子 | [04-demo/demo-seed-plan.md](./04-demo/demo-seed-plan.md) |
| 德勤产品化建议（归档） | [99-archive/advisory/deloitte-china-strategic-workforce-product-recommendation.md](./99-archive/advisory/deloitte-china-strategic-workforce-product-recommendation.md) |

---

## Cursor Skills 位置

| 用途 | 路径 |
|------|------|
| Skills 总览 | [`.cursor/skills/README.md`](../.cursor/skills/README.md) |
| **领域模型（必读）** | [`.cursor/skills/minimax-strategic-workforce/SKILL.md`](../.cursor/skills/minimax-strategic-workforce/SKILL.md) |
| 人效公式 | [`.cursor/skills/people-analytics/SKILL.md`](../.cursor/skills/people-analytics/SKILL.md) |
| 埋点 Skill | [`.cursor/skills/event-tracking-plan/SKILL.md`](../.cursor/skills/event-tracking-plan/SKILL.md) |
| PM 综合框架 | [`.agents/skills/product-manager-skills/SKILL.md`](../.agents/skills/product-manager-skills/SKILL.md) |

刷新 Skills：**Cursor Settings → Rules → Agent Decides**，或重启 Cursor。

---

## 版本与状态

| 工件 | 版本 | 状态 |
|------|------|------|
| PRD | **v1.2**（HR 优先 + Chat-to-BI + 预测） | READY_FOR_BUILD |
| 架构 | v2.1（含 X10 实体说明） | 与 PRD 对齐 |
| 业务叙事 / 10x 框架 | 2026-05-16 | COMPLETE |
| 六线 + 10x 专访 | 2026-05-16 | COMPLETE |
| 高管专访 | 2026-05-16 归档版 | COMPLETE |
| 指标字典 CSV | 含 X10 / 协作行 | MVP 可再扩行 |
| Demo 种子 | 2025Q2–Q4 + 10x 占位 | 待实现 `POST /api/demo/seed` |

**下一步（开发）**：Next.js 14 + SQLite 骨架；三季 Demo 种子（含 10x 采纳占位）；MVP 可先 W1–W5，v1.2 接 W6–W11 与 10x Tab。
