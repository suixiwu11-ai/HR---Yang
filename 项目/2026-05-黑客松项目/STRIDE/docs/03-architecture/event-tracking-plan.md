# STRIDE — MVP 埋点计划

> **来源**：`.cursor/skills/event-tracking-plan/SKILL.md` 归档版  
> **原则**：无 PII、无真实员工姓名；与 [PRD-v1.1.md](../02-requirements/PRD-v1.1.md) 双通道/免责一致  
> **实现时机**：核心向导与核算 API 就绪后接入

---

## 1. 命名规范

- 格式：`object_action`，**snake_case**
- 示例：`quarter_saved`、`report_exported`
- 属性名：snake_case，枚举用小写

---

## 2. MVP 事件表

| 事件 | 触发时机 | 关键属性 |
|------|----------|----------|
| `quarter_created` | 新建季度或复制上季 | `quarter_id`, `copied_from` |
| `strategic_weight_set` | 保存战略能力权重 | `capability_ids[]`, `weights` |
| `allocation_saved` | 保存分摊矩阵 | `role_id`, `sum_percent`, `valid` |
| `metric_entered` | 录入单条观测 | `indicator_code`, `source_type` |
| `calc_run` | 触发核算 | `quarter_id`, `warning_count` |
| `report_exported` | 导出报告 | `template`: executive\|hrbp, `format`: md\|pdf, `assumption_ratio` |
| `view_switched` | 切换 Shell | `view`: executive\|cpo\|hrbp |
| `demo_seed_loaded` | 恢复 Demo | `quarters[]`, `reset`: boolean |

---

## 3. 属性约定

| 属性 | 说明 |
|------|------|
| `source_type` | disclosed \| proxy \| assumption |
| `assumption_ratio` | 0–1，报告级假设占比（触发水印逻辑对齐 R-CFO-04） |
| `valid` | 分摊行和是否为 100% |

---

## 4. 隐私与合规

- **禁止**：员工姓名、工号、薪酬、真实编制明细可识别信息
- **允许**：聚合 quarter_id、产品线 ID、岗位族 ID、计数类指标
- 作品集环境可用 **noop 适配器** 或控制台日志，不必接第三方分析

---

## 5. 与产品功能的映射

| 产品模块 | 事件 |
|----------|------|
| 向导 1 战略配置 | `strategic_weight_set` |
| 向导 2 组织投入 | `allocation_saved` |
| 向导 3 产出与证据 | `metric_entered` |
| 核算结果 | `calc_run` |
| 报告 | `report_exported` |
| 设置 / Demo | `demo_seed_loaded` |

---

## 6. Skill 同步

开发时仍可调用 Cursor Skill：`event-tracking-plan`。本文档为 **docs 单一事实来源**；若 Skill 与本文冲突，以本文为准并回写 Skill。
