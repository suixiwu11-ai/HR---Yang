# 项目背景 — STRIDE 作品集与桌面研究约束

> **关联**：[business-narrative.md](./business-narrative.md) · [strategic-context.md](./strategic-context.md) | [PRD v1.2](../02-requirements/PRD-v1.2.md) | [用户决策](../02-requirements/user-decisions.md)

---

## 1. 项目定位

| 维度 | 说明 |
|------|------|
| **交付场景** | **长期作品集（Portfolio）**，非一次性黑客松 Demo（用户已确认，见 [user-decisions.md](../02-requirements/user-decisions.md)） |
| **产品形态** | Web 应用 + 轻量 **SQLite API**（Next.js Route Handlers 同仓） |
| **数据性质** | **桌面研究（Desktop Research）**：港交所披露、招股书摘要、官网新闻与产品 changelog；**不接入** 真实 HRIS、薪酬、绩效系统 |
| **公司主体** | 以 **MiniMax** 公开信息为推演原型；对外中文标题 **不出现** MiniMax 品牌，英文代号 **STRIDE** |

---

## 2. 为何选择 MiniMax 作为推演主体

1. **多产品线 + 研发密集**：C 端（星野/Talkie、海螺）、多模态（视频/Hailuo）、语音、API、中台并存，天然适合「能力 × 产品线 × 岗位」三维核算叙事。  
2. **已上市、披露可审计**：便于 CFO 视角的 **披露通道**（分产品收入、海外占比、员工成本等）与公开证据链。  
3. **战略叙事清晰**：年报与公开材料中「多模态 + C 端全球 + 商业化」可与 C1–C6 能力框架对齐；2026 起公开 **10x Team** 垂直产业叙事可扩展为 **C7 + X10**。  
4. **作品集辨识度**：人效/战略编制是 HR Tech + People Analytics 交叉题，能展示 PM 全流程（发现 → PRD → 架构 → 可运行 Demo）。  
5. **业务叙事完整**：见 [business-narrative.md](./business-narrative.md)（HRBP 视角：TCOW/编制/问数/预测 + 战略层叠加）。

---

## 3. 桌面研究约束（必须遵守）

| 约束 | 产品含义 |
|------|----------|
| **无内部编制精度** | FTE、分摊比例为 **假设或代理**，须 `source_type` + 备注；`assumption_ratio > 30%` 时报告水印 |
| **披露优先** | 能对接年报的字段走 **DisclosedMetrics**；不得用 proxy 冒充披露数进 Executive 报告 |
| **无 PII** | Demo 与埋点均不含真实员工姓名；segment 分析 **n < 5** 不展示排名 |
| **非裁员工具** | 文案与 Executive 视图 **隐藏岗位末位排名**；探索期产品线降敏预警 |
| **证据层** | 关键字段需 **SourceEvidence**（url、页码、类型、置信度）方可进入高管一页纸 |

**公开数据来源示例**：港交所年报/招股书摘要、官网新闻、应用商店与产品 changelog（不声称内部 HR 系统精度）。

---

## 4. 方法栈（Skills）

本项目 PRD 与发现阶段使用 Cursor Agent Skills 协作完成，清单见 [PRD § Skills](../02-requirements/PRD-v1.1.md#9-skills-安装清单) 与 [`.cursor/skills/README.md`](../../.cursor/skills/README.md)。

核心方法：`create-prd` · `interview-script` · `summarize-interview` · `stakeholder-map` · `metric-definition` · `people-analytics` · `pre-mortem` · `minimax-strategic-workforce`。

---

## 5. 免责声明（固定展示）

> 本产品基于 **公开信息** 构建的战略人效 **推演模型**，用于作品集展示与学习，**不代表** MiniMax 或任何第三方的官方 HR、薪酬、编制或财务数据。所有假设性输入须标注来源类型；高假设占比报告须带水印。

Executive 报告页须 **固定展示** 上述声明（需求 R-CEO-03）。

---

## 6. 文档归档说明

2026-05-16 起，全部项目文档迁入 `docs/` 分层目录；旧文件名保留 **重定向 stub**，请勿在 stub 上继续编辑正文。入口：[docs/README.md](../README.md)。
