# 项目交付物清单（按阶段）

> **项目**：HR×AI 公益黑客松 2026-05 · 团队参赛仓库  
> **产品子项目**：**STRIDE**（某大模型公司战略人效核算台 / 人力洞察工作台）  
> **主仓库**：https://github.com/Frankli9986/HR-hackathon-2026-05  
> **统计截止**：2026-05-16  
> **路径根**：仓库根目录为 `HR-hackathon-2026-05/`，下文路径均相对于仓库根。

---

## 状态图例

| 状态 | 含义 |
|------|------|
| **已完成** | 已入库、可评审/可演示 |
| **进行中** | 已有骨架或初稿，未达 PRD MVP |
| **计划中** | 文档已定义范围，实现未开始 |
| **已归档** | 历史或参考，非当前主路径 |
| **仅本地** | 未纳入 Git，协作用 |

---

## 总览

| 阶段 | 交付物数量（约） | 阶段目标 |
|------|------------------|----------|
| 0 团队启动与协作 | 12+ | 协作机制、分工、上下文 |
| 1 业务场景探索 | 4 | 赛题方向、行业场景模板 |
| 2 用户发现（访谈） | 5 | 需求证据、冲突裁决 |
| 3 业务与战略背景 | 4 | 行业—企业—HR 叙事与领域模型 |
| 4 需求与数据模型 | 8 | PRD、指标、分摊、10x 规则 |
| 5 架构与体验设计 | 3 | 技术架构、UI 规范、埋点 |
| 6 Demo 与数据 | 1 | 种子数据与演示脚本计划 |
| 7 体验原型（HTML） | 6 | 可浏览器打开的静态稿 |
| 8 工程实现 | 1 套（骨架） | Next.js + SQLite（待对齐 PRD） |
| 9 索引与交接 | 5 | 阅读路径、清单、Handoff |
| 10 归档参考 | 4 | 旧版 PRD、德勤建议等 |
| 11 演示与路演 | 0/4 | 5/23 前待完成 |
| **外部参考** | 1 | 早期 HRBP UX 原型（Netlify） |

---

## 阶段 0：团队启动与协作基座

**时间**：2026-05-09 ~ 05-12  
**目标**：建立 AI 原生协作工作区与团队共识。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| 仓库总 README（含 STRIDE 入口） | [README.md](../../README.md) | 索引 | 已完成 |
| 协作指南 | [AGENTS.md](../../AGENTS.md) | 流程 | 已完成 |
| 协作指南（中文版） | [协作指南.md](../../协作指南.md) | 流程 | 已完成 |
| 待办看板 | [上下文/待办.md](../../上下文/待办.md) | 协作 | 已完成 |
| 决策记录 | [上下文/决策.md](../../上下文/决策.md) | 协作 | 已完成 |
| 会话日志 | [上下文/会话日志.md](../../上下文/会话日志.md) | 协作 | 已完成 |
| 知识图谱 | [上下文/知识图谱.md](../../上下文/知识图谱.md) | 协作 | 已完成 |
| AI 画像 | [上下文/AI画像.md](../../上下文/AI画像.md) | 协作 | 已完成 |
| 上下文说明 | [上下文/README.md](../../上下文/README.md) | 索引 | 已完成 |
| 成员与分工 | [团队/成员与分工.md](../../团队/成员与分工.md) | 组织 | 已完成 |
| 协作约定 | [团队/协作约定.md](../../团队/协作约定.md) | 组织 | 已完成 |
| 活动规则与日程摘要 | [共享知识/活动规则与日程.md](../../共享知识/活动规则与日程.md) | 外部摘要 | 已完成 |
| 人效分析讨论纪要（原始） | `上下文/人效分析群里分享.txt` | 参考 | **仅本地** |

---

## 阶段 1：业务场景探索

**时间**：2026-05-12 ~ 05-16  
**目标**：明确赛题方向；并行探索通用场景与 STRIDE 推演场景。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| 黑客松项目总览 | [项目/2026-05-黑客松项目/README.md](./README.md) | 索引 | 已完成 |
| 业务场景文档模板 | [业务场景文档-模板.md](./业务场景文档-模板.md) | 模板 | 已完成 |
| 广告营销行业场景初稿 | [业务场景-广告营销.md](./业务场景-广告营销.md) | 场景 | 进行中 |
| 脑暴问题清单（15 题） | [脑暴问题清单.md](./脑暴问题清单.md) | 发现 | 已完成 |

> **说明**：赛题主线为「任务包 / 任务域 × 高价值任务」；**STRIDE** 子项目采用上市大模型公司公开信息推演的 **HRBP 人力洞察 + 战略编制** 场景，见阶段 2–8。

---

## 阶段 2：用户发现（访谈与综合）

**时间**：2026-05-16  
**目标**：结构化访谈 → 主题与冲突裁决 → 需求 ID。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| 高管 / HRBP 专访（4 轮） | [STRIDE/docs/01-discovery/interviews-executives.md](./STRIDE/docs/01-discovery/interviews-executives.md) | 访谈 | 已完成 |
| 六产品线专访（P1–P6） | [STRIDE/docs/01-discovery/interviews-product-lines.md](./STRIDE/docs/01-discovery/interviews-product-lines.md) | 访谈 | 已完成 |
| 10x Program 专访 | [STRIDE/docs/01-discovery/interviews-10x-program.md](./STRIDE/docs/01-discovery/interviews-10x-program.md) | 访谈 | 已完成 |
| 跨访谈综合（主题 T1–T10、裁决 C1–C11） | [STRIDE/docs/01-discovery/interview-synthesis.md](./STRIDE/docs/01-discovery/interview-synthesis.md) | 综合 | 已完成 |
| 旧路径重定向 stub | [STRIDE/docs/interviews-product-lines.md](./STRIDE/docs/interviews-product-lines.md) | 链接 | 已归档 |

---

## 阶段 3：业务与战略背景

**时间**：2026-05-16  
**目标**：行业—企业—HR 叙事；战略能力 / 产品线 / 岗位族坐标系。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| **业务背景（含方法论章）** | [STRIDE/docs/00-background/business-narrative.md](./STRIDE/docs/00-background/business-narrative.md) | 叙事 | 已完成 · v3.1 |
| 项目背景与桌面研究约束 | [STRIDE/docs/00-background/project-background.md](./STRIDE/docs/00-background/project-background.md) | 约束 | 已完成 |
| 战略上下文（C1–C7、P1–P6、公式） | [STRIDE/docs/00-background/strategic-context.md](./STRIDE/docs/00-background/strategic-context.md) | 领域模型 | 已完成 |
| 10x 横切项目说明 | [STRIDE/docs/00-background/10x-team-program.md](./STRIDE/docs/00-background/10x-team-program.md) | 专题 | 已完成 |
| 业务叙事 HTML 导读 | [STRIDE/mockups/stride-business-narrative.html](./STRIDE/mockups/stride-business-narrative.html) | 原型 | 已完成 |

---

## 阶段 4：需求与领域数据模型

**时间**：2026-05-16  
**目标**：PRD、用户决策、指标字典、分摊默认、10x 考核与协作义务。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| **产品需求文档（主）** | [STRIDE/docs/02-requirements/PRD-v1.2.md](./STRIDE/docs/02-requirements/PRD-v1.2.md) | PRD | 已完成 |
| PRD v1.1 | [STRIDE/docs/02-requirements/PRD-v1.1.md](./STRIDE/docs/02-requirements/PRD-v1.1.md) | PRD | 已归档 |
| 用户交付决策（6 项） | [STRIDE/docs/02-requirements/user-decisions.md](./STRIDE/docs/02-requirements/user-decisions.md) | 决策 | 已完成 |
| 指标字典 | [STRIDE/docs/02-requirements/metrics-dictionary.csv](./STRIDE/docs/02-requirements/metrics-dictionary.csv) | 数据 | 已完成（骨架+HR/X10 行） |
| 默认分摊与协作矩阵 | [STRIDE/docs/02-requirements/allocation-default.json](./STRIDE/docs/02-requirements/allocation-default.json) | 数据 | 已完成 |
| 10x 考核框架（D1–D4、W6–W11） | [STRIDE/docs/02-requirements/10x-team-assessment-framework.md](./STRIDE/docs/02-requirements/10x-team-assessment-framework.md) | 规则 | 已完成 |
| 10x 双向协作义务表 | [STRIDE/docs/02-requirements/collaboration-10x-obligations.md](./STRIDE/docs/02-requirements/collaboration-10x-obligations.md) | 规则 | 已完成 |
| PRD HTML 导读 | [STRIDE/mockups/stride-prd.html](./STRIDE/mockups/stride-prd.html) | 原型 | 已完成 |
| PRD 旧路径 stub | [STRIDE/docs/PRD-MiniMax-Strategic-Workforce-v1.0.md](./STRIDE/docs/PRD-MiniMax-Strategic-Workforce-v1.0.md) | 链接 | 已归档 |

---

## 阶段 5：架构、体验与埋点

**时间**：2026-05-16  
**目标**：四层/五层架构、API 边界、亮色数字化 UI、埋点计划。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| 产品架构 v2.1（含 Copilot / Forecast API） | [STRIDE/docs/03-architecture/architecture-v2.1.md](./STRIDE/docs/03-architecture/architecture-v2.1.md) | 架构 | 已完成 |
| UI 设计规范（数字化亮色 v1） | [STRIDE/docs/03-architecture/ui-design-digital-v1.md](./STRIDE/docs/03-architecture/ui-design-digital-v1.md) | UX | 已完成 |
| MVP 埋点计划 | [STRIDE/docs/03-architecture/event-tracking-plan.md](./STRIDE/docs/03-architecture/event-tracking-plan.md) | 埋点 | 已完成 |
| 架构旧路径 stub | [STRIDE/docs/architecture-v2.md](./STRIDE/docs/architecture-v2.md) | 链接 | 已归档 |

---

## 阶段 6：Demo 与种子数据

**时间**：2026-05-16（计划）~ 05-22（实现）  
**目标**：2025Q2–Q4 三季演示数据、`POST /api/demo/seed` 幂等加载。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| Demo 种子数据计划 | [STRIDE/docs/04-demo/demo-seed-plan.md](./STRIDE/docs/04-demo/demo-seed-plan.md) | 计划 | 已完成 |
| SQLite 库 `data/stride.db` | `STRIDE/web/data/stride.db` | 数据 | 计划中 |
| 种子脚本 `scripts/seed-demo.ts` | `STRIDE/web/scripts/seed-demo.ts` | 代码 | 计划中 |
| API `POST /api/demo/seed` | 见架构文档 §5 | API | 计划中 |

---

## 阶段 7：体验原型（静态 HTML）

**时间**：2026-05-16  
**目标**：无环境可演示的 UI 与文档导读。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| 原型导航首页 | [STRIDE/mockups/index.html](./STRIDE/mockups/index.html) | HTML | 已完成 |
| HR 数字化首页稿 | [STRIDE/mockups/stride-home-digital.html](./STRIDE/mockups/stride-home-digital.html) | HTML | 已完成 |
| Executive 摘要页稿（非默认首页） | [STRIDE/mockups/stride-home-executive.html](./STRIDE/mockups/stride-home-executive.html) | HTML | 已完成 |
| 共享样式 | [STRIDE/mockups/stride-doc-shared.css](./STRIDE/mockups/stride-doc-shared.css) | CSS | 已完成 |
| **UX 北极星（外部）** | https://warm-squirrel-e57666.netlify.app/ | 在线原型 | 参考 |

---

## 阶段 8：工程实现（STRIDE Web）

**时间**：2026-05-16 ~ 05-22（目标）  
**目标**：Next.js 14 + SQLite；HR 四 Tab；Copilot；Forecast；向导与核算。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| 子项目 README | [STRIDE/README.md](./STRIDE/README.md) | 索引 | 已完成 |
| Web 应用说明 | [STRIDE/web/README.md](./STRIDE/web/README.md) | 索引 | 已完成 |
| Next.js 工程骨架 | [STRIDE/web/](./STRIDE/web/)（`package.json`、`src/app/*` 等） | 代码 | **进行中**（仍为 create-next-app 默认页） |
| HR 工作台四 Tab | `STRIDE/web/src/…` | 前端 | 计划中 |
| SQLite Schema / 迁移 | `STRIDE/web/…` | 后端 | 计划中 |
| Route Handlers（quarters、calculate、copilot、forecast） | 见 [architecture-v2.1.md](./STRIDE/docs/03-architecture/architecture-v2.1.md) | API | 计划中 |
| 报告导出 MD / PDF | PRD §5 | 功能 | 计划中 |

**PRD MVP 最小可演示集**（开发优先级）：HR 四 Tab（可静态）→ 1 条 Copilot 问数 → 1 个 forecast 情景 → 一季种子 → `/executive` 半屏摘要。

---

## 阶段 9：索引、清单与开发交接

**时间**：2026-05-16  
**目标**：降低协作与 Agent 接续成本。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| STRIDE 文档总索引 | [STRIDE/docs/README.md](./STRIDE/docs/README.md) | 索引 | 已完成 |
| 黑客松 5 分钟阅读路径 | [STRIDE/docs/HACKATHON.md](./STRIDE/docs/HACKATHON.md) | 索引 | 已完成 |
| 全文件 Manifest（Tier 标签） | [STRIDE/docs/MANIFEST.md](./STRIDE/docs/MANIFEST.md) | 索引 | 已完成 |
| Agent 开发 Handoff 提示词 | [STRIDE/docs/SESSION-HANDOFF.md](./STRIDE/docs/SESSION-HANDOFF.md) | 交接 | 已完成 |
| **本交付物清单** | [DELIVERABLES.md](./DELIVERABLES.md) | 索引 | 已完成 |

---

## 阶段 10：归档与参考

**时间**：—  
**目标**：保留历史版本与非赛题材料，不干扰主路径。

| 交付物 | 路径 | 类型 | 状态 |
|--------|------|------|------|
| 归档说明 | [STRIDE/docs/99-archive/README.md](./STRIDE/docs/99-archive/README.md) | 索引 | 已完成 |
| 德勤中国人效产品化建议 | [STRIDE/docs/99-archive/advisory/deloitte-china-strategic-workforce-product-recommendation.md](./STRIDE/docs/99-archive/advisory/deloitte-china-strategic-workforce-product-recommendation.md) | 参考 | 已归档 |

---

## 阶段 11：演示与路演（待交付）

**时间**：截止 **2026-05-23**  
**目标**：线上线下原型展示。

| 交付物 | 路径 / 说明 | 类型 | 状态 |
|--------|-------------|------|------|
| 可运行 Demo | STRIDE Web 或 Netlify/Vercel 部署 | 演示 | 计划中 |
| 答辩 PPT | 待团队上传 | 演示 | 计划中 |
| 路演稿 | 待团队上传 | 演示 | 计划中 |
| 排练记录 | 待团队记录 | 流程 | 计划中 |

---

## 按角色快速索引

| 角色 | 优先阅读 / 使用 |
|------|-----------------|
| **评委 / 访客** | [business-narrative.md](./STRIDE/docs/00-background/business-narrative.md) → [mockups/index.html](./STRIDE/mockups/index.html) → [PRD-v1.2.md](./STRIDE/docs/02-requirements/PRD-v1.2.md) |
| **HRBP / 业务** | [business-narrative.md](./STRIDE/docs/00-background/business-narrative.md) · [Netlify 原型](https://warm-squirrel-e57666.netlify.app/) |
| **产品** | [PRD-v1.2.md](./STRIDE/docs/02-requirements/PRD-v1.2.md) · [interview-synthesis.md](./STRIDE/docs/01-discovery/interview-synthesis.md) |
| **开发** | [HACKATHON.md](./STRIDE/docs/HACKATHON.md) · [architecture-v2.1.md](./STRIDE/docs/03-architecture/architecture-v2.1.md) · [SESSION-HANDOFF.md](./STRIDE/docs/SESSION-HANDOFF.md) |
| **项目经理** | 本文件 · [项目/README.md](./README.md) · [上下文/待办.md](../../上下文/待办.md) |

---

## 维护说明

- 新增交付物时：更新对应阶段表格，并递增 **统计截止** 日期。  
- 完成阶段 8 / 11 项后，将状态由「计划中/进行中」改为「已完成」。  
- STRIDE 单一技术事实来源仍以 [PRD-v1.2.md](./STRIDE/docs/02-requirements/PRD-v1.2.md) 为准；本清单仅做 **_inventory**，不替代 PRD 范围定义。

---

**文档版本**：v1.0 · 2026-05-16
