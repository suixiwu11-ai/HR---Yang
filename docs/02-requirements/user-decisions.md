# 用户确认交付决策（已关闭）

> **日期**：2026-05-16  
> **状态**：已关闭，纳入 PRD v1.1 与实现约束  
> **关联**：[PRD-v1.1.md](./PRD-v1.1.md) · [project-background.md](../00-background/project-background.md)

---

## 决策清单

| # | 问题 | **决定** | 实现影响 |
|---|------|----------|----------|
| **1** | 交付场景 | **B — 长期作品集（Portfolio）** | 非一次性 Hackathon；重视文档、Demo 可重复、视觉完整度 |
| **2** | 技术形态 | **B — Web + 轻后端 SQLite API** | Next.js Route Handlers + `data/stride.db`；非纯 localStorage |
| **3** | Demo 种子 | **是 — 预填 2025Q2–Q4 三季** | `POST /api/demo/seed` 幂等；见 [demo-seed-plan.md](../04-demo/demo-seed-plan.md) |
| **4** | 报告导出 | **C — Markdown 与 PDF 均纳入 MVP** | ReportBuilder 双格式 |
| **5** | 角色权限 | **UI 分视图，MVP 无严格鉴权/RBAC** | ViewToggle + `?view=executive\|cpo\|hrbp`；无登录 |
| **6** | 产品名称 | 中文：**某大模型公司战略人效核算台**；英文默认：**STRIDE** | 对外标题不出现 MiniMax；备选 LENS / FORGE 见 PRD |

---

## 英文代号选型（#6 附录）

| 代号 | 全称 | 备注 |
|------|------|------|
| **STRIDE** ✓（默认） | Strategic Talent ROI & Investment Decision Engine | 强调战略步进、ROI、投资决策叙事 |
| LENS | Leadership Efficiency Narrative System | 偏高管叙事，略弱「核算」 |
| FORGE | Framework for Organizational Resource & Growth Efficiency | 偏组织锻造 |

---

## 变更流程

若用户后续调整上述决策，须同步更新：

1. 本文件  
2. [PRD-v1.1.md](./PRD-v1.1.md)  
3. [architecture-v2.1.md](../03-architecture/architecture-v2.1.md)（若涉及技术边界）  
4. [docs/README.md](../README.md) 版本表

---

**无需再向用户重复确认以上 6 项，除非明确要求变更。**
