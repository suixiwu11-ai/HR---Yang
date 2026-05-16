# 跨访谈综合 — 主题、冲突与产品裁决

> **输入**：[interviews-executives.md](./interviews-executives.md) · [interviews-product-lines.md](./interviews-product-lines.md) · [interviews-10x-program.md](./interviews-10x-program.md)  
> **输出到 PRD**：[PRD-v1.1.md](../02-requirements/PRD-v1.1.md) · **架构**：[architecture-v2.1.md](../03-architecture/architecture-v2.1.md)

---

## 1. 跨角色主题（Executive + PL）

| 主题 | 描述 | 主要来源 | 产品启示 |
|------|------|----------|----------|
| **T1 分摊战争** | 70% P6 入口 + 二次分摊 | P1–P6, HRBP | 向导 2 矩阵校验、audit、默认模板 |
| **T2 披露 vs proxy** | CFO 要披露，PL 要 proxy，P3 要降敏 | CFO, P3, P5 | 双通道硬隔离 + 水印 |
| **T3 模型-产品不同频** | W4 横跨 P2/P4/P6 | CPO, PL | linkage 表 + CPO 卡 |
| **T4 探索 vs 收割** | grow / explore 预警严度不同 | CPO, P3 | stage 驱动 WarningEngine |
| **T5 裁编叙事风险** | CEO 不要末位，HRBP 要详版 | CEO, HRBP | 视图切换，无鉴权分 Shell |
| **T6 收入归因三类** | ToB / C 端 / 中台无收入 | P5, P6, CFO | P6 不算收入人效；P5 分栏 |
| **T7 10x 只取不交** | Handoff 无采纳登记 | 10x, P5/P2 | D3a/D3b 拆分；采纳 UI + `source:10x-*` |
| **T8 10x vs P6 分摊** | 10x 人力进中台黑洞 | 10x, P6, HRBP | **50% P6 + 50% 绑定 PL**，与 70% 规则分列 |
| **T9 双边协作义务** | 各 RF 须支撑并消费 10x | 10x, CPO | 协作义务表 + 协作分修正人效 |
| **T10 垂直研究空心化** | 论文多、产品链接少 | 10x, CEO | W6–W8；Executive **10x 杠杆系数** |

产品线侧六主题详见 [interviews-product-lines.md §7](./interviews-product-lines.md#跨产品线综合cross-pl-synthesis)。10x 详见 [interviews-10x-program.md](./interviews-10x-program.md)。

---

## 2. 冲突矩阵与 v1.1 裁决（单一事实来源）

| # | 冲突 | 方 A | 方 B | **v1.1 裁决** |
|---|------|------|------|----------------|
| C1 | 岗位排名是否展示 | HRBP 要详版排名 | CEO 不要对外末位 | **Executive 隐藏**；`?view=hrbp` 保留 |
| C2 | 探索期预警 | P3 要宽松 | CFO 要统一杠杆口径 | **stage 配置驱动**规则集；P3 默认 explore 降敏 |
| C3 | 主投权重谁定 | CPO 共定模板 | HRBP 录入 | CPO **预设模板** + HRBP 调整 **audit** |
| C4 | P6 70% 分摊 | 各 PL 嫌高估/低估 | P6 要可见 | **70% 默认** + 二次分摊可视化 + audit |
| C5 | ToB vs C 端 | P5 要隔离 | 业务想合并 | UI **硬分栏** |
| C6 | P6 收入人效 | 部分 HRBP 要全表 | P6 无收入 | **P6 行不算收入人效** |
| C7 | 鉴权与视图 | 严格 RBAC | 作品集快 Demo | **MVP 无登录**；Executive/CPO/HRBP **ViewToggle** |
| C8 | 10x 是否第七产品线 | 10x 要独立 PL | CPO/架构 | **X10 横切 Program**，可选 **C7** 主投能力 |
| C9 | 10x 考核是否含采纳 | 10x 只要交付 | PL/各 RF | **D3 = D3a 交接 + D3b 被采纳**；各 RF **协作分** |
| C10 | 探索期 PL 无 10x 采纳 | P3 科研向 | 10x | P3 采纳 N 可为 0，须纪要 + W11 降敏 |
| C11 | Executive 营销首页 vs HR 工作台 | 资本叙事 mockup | Netlify HR 原型 | **默认 HR 四 Tab**；Executive 仅 `/executive`（PRD v1.2） |

---

## 3. 需求优先级（跨访谈汇总）

| 优先级 | 需求簇 | 来源 |
|--------|--------|------|
| **P0** | 分摊矩阵 + P6 70% 入口 + audit | T1, R-P6-01, R-HRBP-01 |
| **P0** | 双通道 + DisclosedMetrics + 来源分级 | CFO, R-CFO-01/02 |
| **P0** | QuarterConfig 快照不可覆盖 | CPO, 架构 |
| **P1** | stage 规则集 + P3 降敏 | R-P3-01, R-CPO-02 |
| **P1** | linkage + W4 | R-P2-03, R-P4-01, R-CPO-04 |
| **P1** | Executive 免责 + 无末位 + 水印 | R-CEO-01/03, R-CFO-04 |
| **P2** | 算力备注系数 | R-P4-02（可 V1.1 后置） |
| **P2** | JD 计数助手、情景模拟 | PRD V1 |
| **P1（v1.2）** | 10x Tab、Handoff/采纳登记、W6–W11 | R-X10-01～04 |
| **P1（v1.2）** | 协作义务表 + 协作分修正 | collaboration-10x-obligations |
| **P2（v1.2）** | Fellowship 4 月里程碑模板 | 10x-team-assessment-framework |

---

## 4. 关键洞察（给评审者）

1. **政治问题优先于公式**：无透明分摊，任何 ROI 数字都会被质疑（T1）。  
2. **角色不是权限组，是叙事滤镜**：同一 CalcEngine，三张 Shell（T5、C7）。  
3. **证据层是信任底座**：无 SourceEvidence 的披露字段不进 Executive（CFO + 架构原则 1）。  
4. **探索期是产品伦理**：P3 专访明确「买期权」— 预警文案须写「非裁编依据」（R-P3-04）。  
5. **10x 成功 = 被采纳**：仅计 10x 人头会鼓励影子项目；**杠杆系数** 与 **D3b** 把闭环交给产线（T7、T10）。

---

## 5. 开放问题 backlog

| 问题 | 建议裁决方 | 状态 |
|------|------------|------|
| Talkie/星野 FTE 是否拆子维度 | CPO | MVP 合并 P1 |
| UGC 审核人力归 C3 或 C6 | CPO | Open |
| 海螺 to-B 试用归 P5 还是 P2 | CPO | Open |
| Audio explore→grow 切换规则 | CPO 每季门禁 | Open |
| GPU 成本是否进 disclosed | CFO | MVP 仅备注系数 |
| 无限 Token 是否进 disclosed 成本 | CFO | Open（10x 专访） |
| C7 多领域并行时权重上限 | CEO/CPO | Open |
| 各 RF 最低采纳 N 是否按季可调 | CPO | 默认见协作义务表 |

---

**文档状态**：COMPLETE — 冲突裁决以本表为准（含 C8–C10），PRD 仅引用不重复展开。
