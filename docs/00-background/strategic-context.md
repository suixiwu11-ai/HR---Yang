# 战略上下文 — 能力、产品线与人效动机

> **关联**：[business-narrative.md](./business-narrative.md) · [10x-team-program.md](./10x-team-program.md) · [project-background.md](./project-background.md) | [interview-synthesis.md](../01-discovery/interview-synthesis.md) | 领域 Skill [minimax-strategic-workforce](../../.cursor/skills/minimax-strategic-workforce/SKILL.md)

---

## 1. 为何做人效核算台（问题陈述）

MiniMax 类公司面临：

1. **战略与编制脱节**：招聘 JD、业务「要人」与年报叙事（C 端全球、多模态、商业化）缺少统一坐标系。  
2. **口径战争**：业务用 DAU/功能数，CPO 看产品与 stage，CFO 只认披露收入与员工成本——HRBP 无法在中立工具里交差。  
3. **中台分摊政治**：工程/算法默认 **70% 经 P6 入口** 再二次分摊，各产品线对「真实负担」体感差异极大。  
4. **无 HRIS 也要叙事**：作品集与季度复盘需要 **可追溯、可审计** 的推演，而非 Excel 黑箱。  
5. **10x 与产线脱节**：垂直产业研究若只算 10x 人头、不算 **被采纳**，会鼓励「只取不交」。

**STRIDE 的回答**：先解决 HRBP 的 **TCOW / 编制 / 组织信号** 同屏洞察，再叠加 **战略能力 ROI + 双通道 + X10 协作**；Executive 仅为同源摘要。业务叙事（HRBP 主视角）见 [business-narrative.md](./business-narrative.md)。

---

## 2. 战略能力 C1–C7（单一事实来源）

| ID | 名称 | 典型产出 proxy | 主要绑定产品线 |
|----|------|----------------|----------------|
| **C1** | 基础模型与推理 | 模型发布、benchmark、推理平台 | P6、P2/P4 轻绑 |
| **C2** | 多模态生成 | major 功能、评测条目、合作案例 | P2、P3、P4、P6 |
| **C3** | AI 原生产品 | 应用版本、付费/留存 proxy | P1、P2、P4 |
| **C4** | 平台与商业化 | API 文档版本、企业案例、ARR 表述 | P5 |
| **C5** | 全球化与增长 | 海外收入占比、区域增长 proxy | P1（Talkie） |
| **C6** | 组织与合规底座 | 合规人力、平台治理、audit | P6、P5 部分 |
| **C7** | 垂直产业 10×（可选主投） | 领域 benchmark、工作流 Demo、Handoff 被采纳 | **X10** 横切；绑定 P5/P2/P6 等 |

**C7** 为季度可选主投能力（与 C1–C6 并列配置权重），**不是第七产品线**。详见 [10x-team-program.md](./10x-team-program.md)。

权重按 **季度 QuarterConfig 快照** 配置，历史不可原地覆盖（架构要求）。

---

## 3. 产品线 P1–P6 与 stage

| ID | 名称 | 默认 stage | 主绑能力 | 收入人效 |
|----|------|------------|----------|----------|
| **P1** | 星野 / Talkie | grow | C3, C5, C2 | 适用（分产品/付费 proxy） |
| **P2** | 海螺 AI | grow | C2, C3, C1 | 适用 |
| **P3** | Audio / 语音 | **explore** | C2, C1 | 披露粗粒度时 assumption |
| **P4** | 视频 / Hailuo | grow | C2, C3, C1 | 适用；算力备注可选 |
| **P5** | 开放平台 / API | grow | C4, C1, C6 | ToB 披露通道优先 |
| **P6** | 基础模型与中台 | grow | C1, C2, C6 | **不计算收入人效** |

**stage 语义**：`explore` | `grow` | `harvest` — 驱动 **WarningEngine** 规则严度（探索期降敏 W1 等）。详见 [interviews-product-lines.md](../01-discovery/interviews-product-lines.md)。

---

## 4. 岗位族（9 类）与成本系数

| ID | 岗位族 | Demo 成本系数 |
|----|--------|---------------|
| RF01 | 算法与研究 | 1.35 |
| RF02 | 工程与基础设施 | 1.15 |
| RF03 | 产品 | 1.00 |
| RF04 | 体验与 UI 设计 | 0.95 |
| RF05 | 内容与 IP 运营 | 0.90 |
| RF06 | 增长与市场 | 0.95 |
| RF07 | 商务与客户 | 1.05 |
| RF08 | 职能支撑 | 0.85 |
| **RF09** | **10x 产业研究（全职）** | **1.40** |

默认分摊矩阵与能力权重见 [allocation-default.json](../02-requirements/allocation-default.json)。**内容岗 → P1** 行锁定（min 85%）来自 P1 专访裁决。

### 4.1 10x Program（X10）— 非 P7

| 项 | 规则 |
|----|------|
| 定位 | 横切 **Program X10**，绑定 **领域 Pod**（金融、工业软件、芯片等），非独立产品线 |
| 人力分摊 | **50% P6 + 50% 绑定 PL**（与 RF01/RF02 的 **70% P6 入口** 分列展示，避免「中台黑洞」） |
| 双边闭环 | RF09 考核 **D3b 被采纳**；RF01–RF07、PL 负责人须 **支撑 + 采纳**（见 [collaboration-10x-obligations.md](../02-requirements/collaboration-10x-obligations.md)） |
| 人效修正 | `人效指数_修正 = 人效指数 × (0.85 + 0.15 × 协作分)`（RF08 不适用） |

---

## 5. 核心核算公式（摘要）

完整公式与治理见 [people-analytics Skill](../../.cursor/skills/people-analytics/SKILL.md) 与 [architecture-v2.1.md](../03-architecture/architecture-v2.1.md)。

```
投入_i = FTE_i × 13周 × 系数_i × 分摊%
人效指数_i = Σ_c(产出_i,c × 战略权重_c) / 投入_i × 100
能力 ROI_c = Σ产出_c / Σ投入_c
产品线人效_p = 产出代理_p / Σ投入_→p
公司 HCE = 披露收入 / 披露员工成本（仅 CFO/Executive 杠杆，≠ 岗位人效指数）
```

---

## 6. 双通道数据（战略级设计）

| 通道 | 数据实体 | 用途 |
|------|----------|------|
| **披露通道** | DisclosedMetrics | Executive 杠杆、HCE、收入增速 vs 员工数 |
| **代理通道** | MetricObservation + SourceEvidence | 能力 ROI、产品线 proxy、HRBP 详版 |

两通道在 UI **硬分栏**，禁止混用（CFO 与 P5 专访强制要求）。

---

## 7. 干系人地图（摘要）

| 象限 | 角色 | 主要沟通物 |
|------|------|------------|
| 高权力 × 高兴趣 | CEO, CPO, CFO, HRBP | 季度评审、Executive/详版报告 |
| 高权力 × 中兴趣 | 6 产品线负责人 | PL 人效卡、stage 与 linkage |
| 低权力 × 高兴趣 | 数据/财报分析 | 披露字段校验 |

专访全文：[interviews-executives.md](../01-discovery/interviews-executives.md) · [interviews-product-lines.md](../01-discovery/interviews-product-lines.md) · [interviews-10x-program.md](../01-discovery/interviews-10x-program.md)
