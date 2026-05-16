# Demo 种子数据计划 — 2025Q2–Q4

> **决策依据**：[user-decisions.md](../02-requirements/user-decisions.md) #3  
> **API**：[architecture-v2.1.md §5](../03-architecture/architecture-v2.1.md#5-api-边界sqlite-轻后端) `POST /api/demo/seed`（幂等）  
> **默认矩阵**：[allocation-default.json](../02-requirements/allocation-default.json)

---

## 1. 目标

在 **无 HRIS** 前提下，让评审者 **15 分钟内** 完成：

1. 打开默认季（2025Q3）  
2. 查看已填披露 + proxy  
3. 运行核算 → 看到能力 ROI、预警、分视图报告  
4. 切换 2025Q4 演示 QoQ 与 W1/W4/W5（及可选 W8 10x 演示）  
5. Executive 查看 **10x 杠杆系数** 与 Q4 **采纳占位**  

---

## 2. 季度分工

| 季度 | 目的 | 预填摘要 |
|------|------|----------|
| **2025Q2** | 趋势起点 | DisclosedMetrics：总收入增速、员工成本、海外占比（disclosed + 证据 URL）；公司级 HCE；6 能力战略权重模板 |
| **2025Q3** | **向导默认季** | Q2 全部 + 各 PL `stage`；MetricObservation proxy（major 版本数、模型发布、API 文档版本、benchmark 条目）；9 岗位族 FTE **假设**（含 RF09）+ 默认分摊矩阵 |
| **2025Q4** | QoQ / 预警演示 | Q3 全部 + **故意触发 1–2 条** W1/W4/W5 示例（备注标明 Demo）；**可选 W8**（Handoff 有、采纳=0）；上季 CalcSnapshot 供 WarningEngine |

---

## 3. 字段清单（按实体）

### 3.1 DisclosedMetrics（披露通道）

| 字段 | 2025Q2 | 2025Q3 | 2025Q4 | source_type |
|------|--------|--------|--------|-------------|
| 总收入同比增速 | ✓ | ✓ | ✓（可调演示 W5） | disclosed |
| 员工成本同比增速 | ✓ | ✓ | ✓ | disclosed |
| 海外收入占比 | ✓ | ✓ | ✓ | disclosed |
| 公司 HCE（收入/员工成本） | ✓ | ✓ | ✓ | disclosed |
| 分产品收入（若可得） | 部分 | ✓ | ✓ | disclosed / assumption |

每条须挂 **SourceEvidence**：年报/招股书 URL、页码、摘录备注。

### 3.2 QuarterConfig / ProductLine

| 字段 | 说明 |
|------|------|
| `quarter_id` | 2025Q2, 2025Q3, 2025Q4 |
| `primary_capabilities` | 公司级主投能力列表 |
| `capability_weights` | C1–C7 权重（快照；C7 默认 5%） |
| `stage` per PL | 见 [architecture-v2.1 §6](../03-architecture/architecture-v2.1.md#6-产品线默认-stagedemo-2025q3) |
| `snapshot_id` | 每季独立，不可覆盖 |

### 3.3 RoleFamily + Allocation

| 字段 | 说明 |
|------|------|
| RF01–RF09 FTE | 假设人数，总和≈公开员工量级比例；**RF09 ≈4%** 公司 FTE（X10） |
| `allocation_matrix_percent` | 自 [allocation-default.json](../02-requirements/allocation-default.json) 导入（含 RF09） |
| `p6_hub_default_percent` | 70（可配置 60–80）；与 RF09 **50/50** 分列展示 |
| `domain_pods` | POD-FIN/POD-IND/POD-CHIP 占位 |
| `company_capability_weights` | 含 **C7** 默认 5% |
| `locks.RF05_P1` | 内容岗 ≥85% → P1 |

### 3.4 MetricObservation（代理通道，按 PL 摘要）

| PL | proxy 示例 | 2025Q4 演示备注 |
|----|------------|-----------------|
| P1 | major 版本、付费 proxy | 可选 W1 降敏演示 |
| P2 | C2 major、评测条目 | W4：模型有、major=0 |
| P3 | Audio major、benchmark | explore 降敏 |
| P4 | 视频模型版本、Hailuo 新闻去重 | linkage → P6 |
| P5 | API 文档版本、企业案例数 | 披露分栏 |
| P6 | 模型发布、benchmark、linkage | 无收入人效 |

### 3.5 CalcSnapshot / Warnings

| 季度 | 预期 |
|------|------|
| Q2 | 基线 snapshot，无预警或仅 informational |
| Q3 | 完整核算，warning_count 低 |
| Q4 | 至少 1× W1 或 W4，1× W5（杠杆演示）；可选 1× **W8**（10x） |

### 3.6 Program10x / Handoff / Adoption（X10 占位）

| 实体 | 2025Q3 | 2025Q4 演示 |
|------|--------|-------------|
| `Program10x` | X10 启用；3 个 domain_pod | 同左 |
| `HandoffPackage` | 2 条（POD-FIN、POD-IND）status=accepted | +1 条 POD-CHIP pending |
| `HandoffAdoption` | Q3：各 RF 合计 **3** 条登记 | Q4：**1** 条 Handoff 完成但 **0** 采纳 → 触发 W8 |
| `10x_leverage` | 基线 | Q4 投入↑、采纳↓ → 配合 W10 叙事（v1.2） |
| `collaboration_score` | RF02 全达标；RF03 支撑 90% | RF03 采纳=0 → 协作分降、人效修正演示 |

每条采纳须 `handoff_id` + `source:10x-handoff-{id}` + 备注（Demo）。

---

## 4. 加载与恢复

| 操作 | 行为 |
|------|------|
| 首次启动 / `POST /api/demo/seed` | 写入三季；已存在则幂等跳过或可选 `reset=true` |
| 设置页「恢复 Demo」 | 调用同上 API |
| assumption_ratio | 全局计算；>30% 时报告封面水印 |

---

## 5. 公开数据来源（标注用）

- 港交所年报、招股书摘要  
- 官网新闻、产品 changelog、应用商店版本记录  
- **禁止** 声称内部编制精度或未公开薪酬

---

## 6. 实现检查清单

- [ ] `scripts/seed-demo.ts` 读取 JSON + CSV 路径 `docs/02-requirements/`  
- [ ] 种子后 `GET /api/quarters` 返回 3 条  
- [ ] 2025Q3 为 UI 默认选中季  
- [ ] Q4 核算后 `warnings` 非空  
- [ ] Executive 报告 assumption 水印可测  
- [ ] 种子含 RF09 + C7 权重 + 至少 2 条 Handoff、3 条采纳（Q3）  
- [ ] Q4 可选 W8；Executive 展示 `10x_leverage`  

---

**文档状态**：PLAN — 待开发实现种子脚本（含 10x 占位）。
