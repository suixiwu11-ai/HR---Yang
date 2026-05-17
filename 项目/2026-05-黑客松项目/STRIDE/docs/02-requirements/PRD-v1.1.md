# 某大模型公司战略人效核算台 — 产品需求文档 v1.1（已 supersede）

> **⚠️ 请以 [PRD-v1.3.md](./PRD-v1.3.md) 为单一事实来源**。  
> **英文代号**：**STRIDE** — *Strategic Talent ROI & Investment Decision Engine*  
> **中文产品名**：某大模型公司战略人效核算台（对外标题不出现 MiniMax 品牌）  
> **数据主体**：MiniMax 公开信息推演；**交付定位**：长期作品集（Portfolio）  
> **免责声明**：基于公开信息的推演模型，**非**任何公司官方 HR/财务数据。

**文档索引**：[docs/README.md](../README.md)

---

## 1. Overview

### 1.1 问题

MiniMax 多产品线、研发密集、已上市。HRBP 无法证明人力投入与战略能力（C1–C7）对齐；**10x 垂直研究**与产线易出现「只取不交」；高管缺乏统一口径讨论编制与产出。

→ 业务叙事详见 [00-background/business-narrative.md](../00-background/business-narrative.md)  
→ 背景详见 [00-background/project-background.md](../00-background/project-background.md)  
→ 战略框架详见 [00-background/strategic-context.md](../00-background/strategic-context.md) · [10x-team-program.md](../00-background/10x-team-program.md)

### 1.2 方案

**STRIDE** — 桌面研究版 Web + 轻量 SQLite API：战略能力 × 产品线 × 岗位族三维核算，双通道指标（披露/代理），分视图报告（Executive / CPO / HRBP）。MVP **无登录鉴权**，通过 UI 视图切换呈现不同卡片集。

### 1.3 成功标准

| 指标 | 目标 |
|------|------|
| 战略可追溯 | 100% 产出指标挂载 C1–C7（C7 可选） |
| 10x 闭环可演示 | Demo 含 Handoff/采纳占位 + Executive 杠杆系数 |
| 来源可审计 | ≥80% 关键字段有 source_type + 备注 |
| Demo | 15 分钟完成战略→填数→结论 |
| 趋势 | ≥2 季度对比 |

---

## 2. 发现与需求来源（引用，不重复正文）

| 类型 | 文档 |
|------|------|
| 高管/HRBP 专访 | [01-discovery/interviews-executives.md](../01-discovery/interviews-executives.md) |
| 六产品线专访 | [01-discovery/interviews-product-lines.md](../01-discovery/interviews-product-lines.md) |
| 跨访谈裁决 | [01-discovery/interview-synthesis.md](../01-discovery/interview-synthesis.md) |
| 10x Program 专访 | [01-discovery/interviews-10x-program.md](../01-discovery/interviews-10x-program.md) |
| 10x 考核框架 | [02-requirements/10x-team-assessment-framework.md](./10x-team-assessment-framework.md) |
| 10x 协作义务 | [02-requirements/collaboration-10x-obligations.md](./collaboration-10x-obligations.md) |
| 用户交付决策 | [02-requirements/user-decisions.md](./user-decisions.md) |

### 2.1 干系人地图（摘要）

| 象限 | 角色 | 沟通物 |
|------|------|--------|
| 高权力×高兴趣 | CEO, CPO, CFO, HRBP | 季度评审 |
| 高权力×中兴趣 | 6 产品线负责人 | PL 人效卡 |
| 低权力×高兴趣 | 数据/财报分析 | 披露字段校验 |

### 2.2 需求 ID 索引（按角色）

| 角色 | R-ID 前缀 | 全文位置 |
|------|-----------|----------|
| HRBP | R-HRBP-01～03 | [interviews-executives.md §1](../01-discovery/interviews-executives.md#1-hrbp-分身) |
| CPO | R-CPO-01～04 | [interviews-executives.md §2](../01-discovery/interviews-executives.md#2-cpo-分身) |
| CEO | R-CEO-01～03 | [interviews-executives.md §3](../01-discovery/interviews-executives.md#3-ceo-分身) |
| CFO | R-CFO-01～04 | [interviews-executives.md §4](../01-discovery/interviews-executives.md#4-cfo-分身) |
| P1–P6 | R-P1～R-P6 | [interviews-product-lines.md](../01-discovery/interviews-product-lines.md) |

**冲突与 v1.1 裁决**：仅以 [interview-synthesis.md §2](../01-discovery/interview-synthesis.md#2-冲突矩阵与-v11-裁决单一事实来源) 为准。

---

## 3. 产品架构（摘要）

四层：**L1 体验 Shell** → **L2 分析**（Calc / Warning / Report）→ **L3 领域** → **L4 证据**。

→ 完整架构、API、Mermaid：[03-architecture/architecture-v2.1.md](../03-architecture/architecture-v2.1.md)  
→ 埋点：[03-architecture/event-tracking-plan.md](../03-architecture/event-tracking-plan.md)

### 3.1 核算与预警（摘要）

```
投入_i = FTE_i × 13周 × 系数_i × 分摊%
人效指数_i = Σ_c(产出_i,c × 战略权重_c) / 投入_i × 100
能力ROI_c = Σ产出_c / Σ投入_c
```

| 预警 | 规则 |
|------|------|
| W1 | 投入 QoQ↑>10% 且产出 QoQ↓（explore 降敏） |
| W2 | 主投能力 ROI < 公司中位数 |
| W3 | 岗位投入占比 vs 战略权重偏离>15pp |
| W4 | 模型发布≥1 且产品线 major=0 |
| W5 | 收入占比↑ 投入占比↓ 负向杠杆 |
| W6–W11 | 10x 空心/无采纳/协作不达标等（**v1.2**；见 [10x-team-assessment-framework.md](./10x-team-assessment-framework.md)） |

**协作分（v1.2，MVP 可占位）**：`人效指数_修正 = 人效指数 × (0.85 + 0.15 × 协作分)`，RF08 不适用。公式与义务见 [collaboration-10x-obligations.md](./collaboration-10x-obligations.md)。

**10x 杠杆系数（Executive）**：`当季全公司 10x 被采纳条目数 / 当季 10x 总投入`。

### 3.2 信息架构（文字）

```
Home / 季度总览
├── 向导：1 战略配置（含可选 C7）→ 2 组织投入（9 岗位族）→ 3 产出与证据
├── 核算结果：能力 ROI | 产品线 | 岗位族(HRBP) | 10x(v1.2) | 预警
├── 报告：Executive 一页（含 10x 杠杆）| HRBP 详版（含协作义务附录）
└── 设置：指标字典 | 模板恢复 | Demo 种子
```

### 3.3 角色视图（无鉴权）

| 视图 | 可见 | 隐藏 |
|------|------|------|
| Executive | 能力 ROI、杠杆、**10x 杠杆系数**、单条决策、免责声明 | 岗位末位、P6 收入人效 |
| CPO | 产品线 stage、W4、linkage、权重模板 | 裁编导向文案 |
| HRBP | 全矩阵、岗位排名、来源附录、audit | — |

切换：顶栏 `ViewToggle` + `?view=executive|cpo|hrbp`

### 3.4 技术栈（已确认）

| 层 | 选型 |
|----|------|
| 前端 | Next.js 14 App Router, TypeScript, ECharts |
| 后端 | Route Handlers + SQLite（`better-sqlite3` / Drizzle） |
| 持久化 | `data/stride.db`；QuarterConfig 快照版本化 |
| 报告 | Markdown + PDF |
| 鉴权 | **MVP 无** |

---

## 4. 功能范围

### MVP

- 战略配置 + SQLite 快照 API
- 9 岗位族（含 RF09 10x）+ 分摊矩阵（[allocation-default.json](./allocation-default.json)）；X10 50/50 分摊规则文档化
- 指标字典（[metrics-dictionary.csv](./metrics-dictionary.csv)）+ 双通道录入
- 核算 + W1–W5（stage 规则集）
- Executive / CPO / HRBP 视图切换
- 报告 Markdown + PDF
- Demo 种子 2025Q2–Q4（[demo-seed-plan.md](../04-demo/demo-seed-plan.md)）

### V1.2（10x 扩展，可与 MVP 分阶段）

- **10x Tab**：领域 Pod、Handoff 列表、采纳登记（`handoff_id` + `source:10x-*`）
- **WarningEngine W6–W11**
- **协作义务表** UI + 协作分计入 CalcEngine
- **CPO 视图**：10x × PL 采纳矩阵

### V1

- JD 计数助手、情景模拟、多用户/真实鉴权（若二期需要）

### Out of scope

- HRIS、薪酬、绩效、多租户、真实 LLM 指标生成

---

## 5. 数据工件

| 文件 | 说明 |
|------|------|
| [metrics-dictionary.csv](./metrics-dictionary.csv) | 指标字典（含 X10、10x 协作行） |
| [allocation-default.json](./allocation-default.json) | Demo 默认分摊、C7、RF09、X10、协作矩阵 |
| [10x-team-assessment-framework.md](./10x-team-assessment-framework.md) | 10x D1–D4、W6–W11 |
| [collaboration-10x-obligations.md](./collaboration-10x-obligations.md) | 各 RF 支撑/采纳最低 N |

六 PL 指标信任/不信任：见 [interviews-product-lines.md](../01-discovery/interviews-product-lines.md) 各节表格。

---

## 6. Pre-mortem 缓解（摘要）

| 风险 | 缓解 |
|------|------|
| 数据不可信 | 证据层 + 来源分级 |
| 被误解为裁员工具 | Executive 隐藏排名 + 文案 |
| 口径混用 | 双通道硬隔离 |
| 历史不可比 | QuarterConfig 快照版本化 |

---

## 7. 用户确认项

见 [user-decisions.md](./user-decisions.md)（6 项已关闭）。

---

## 8. 专访完成度

| 范围 | 状态 | 文档 |
|------|------|------|
| 高管 4 轮 | COMPLETE | [interviews-executives.md](../01-discovery/interviews-executives.md) |
| 产品线 6 轮 | COMPLETE | [interviews-product-lines.md](../01-discovery/interviews-product-lines.md) |
| 10x Program | COMPLETE | [interviews-10x-program.md](../01-discovery/interviews-10x-program.md) |

v1.0 PRD 内缩写快照 **已废弃**，勿作唯一需求来源。

---

## 9. Skills 安装清单

| # | Skill | 路径 |
|---|-------|------|
| 1 | product-manager-skills | `.agents/skills/product-manager-skills` |
| 2 | create-prd | `.cursor/skills/create-prd` |
| 3 | interview-script | `.cursor/skills/interview-script` |
| 4 | summarize-interview | `.cursor/skills/summarize-interview` |
| 5 | metric-definition | `.cursor/skills/metric-definition` |
| 6 | product-metrics | `.cursor/skills/product-metrics` |
| 7 | stakeholder-map | `.cursor/skills/stakeholder-map` |
| 8 | people-analytics | `.cursor/skills/people-analytics` |
| 9 | pre-mortem | `.cursor/skills/pre-mortem` |
| 10 | minimax-strategic-workforce | `.cursor/skills/minimax-strategic-workforce` |

辅助：`ai-feature-definition`、`event-tracking-plan`（见 `.cursor/skills/README.md`）。

---

**STATUS: READY_FOR_BUILD** — PRD v1.1（含 v1.2 10x 说明）、架构 v2.1、专访（含 10x）、业务叙事、分摊/字典已就绪。

**下一步**：Next.js + SQLite 骨架；`POST /api/demo/seed`（含 10x 占位）；MVP 先 W1–W5，v1.2 接 10x Tab 与 W6–W11。
