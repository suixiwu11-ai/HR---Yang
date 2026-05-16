# 某大模型公司战略人效核算台 — 产品需求文档 v1.2

> **英文代号**：**STRIDE** — *Strategic Talent ROI & Investment Decision Engine*  
> **中文产品名**：某大模型公司战略人效核算台（对外标题不出现 MiniMax 品牌）  
> **数据主体**：MiniMax 公开信息推演；**交付定位**：长期作品集（Portfolio）  
> **免责声明**：基于公开信息的推演模型，**非**任何公司官方 HR/财务数据。  
> **v1.2 修订说明**：纠正 v1.1 / Executive 静态原型中 **资本叙事过重、HR 专业域与数字化能力偏弱** 的问题；以 [Netlify HRBP 原型](https://warm-squirrel-e57666.netlify.app/) 为 **默认体验北极星**，本地 `mockups/stride-home-executive.html` 仅作 **Executive 摘要层** 参考，不作产品首页。

**文档索引**：[docs/README.md](../README.md) · 上一版：[PRD-v1.1.md](./PRD-v1.1.md)（归档对照）

---

## 1. Overview

### 1.1 问题（HR 优先表述）

| 角色 | 核心痛点 | 现状 |
|------|----------|------|
| **HRBP** | 说不清「人力成本结构、编制达成、部门人效」与战略主投是否一致 | Excel + 会议口水战；缺 TCOW / Labor Cost% 等同屏口径 |
| **HRBP / CPO** | 分摊与能力 ROI 被业务质疑；无证据不敢进高管会 | 缺三维矩阵 + 来源分级 + 季度快照 |
| **CPO** | 模型-产品不同频、探索期被误读为低效 | 缺 stage 预警与 linkage |
| **CEO / CFO** | 需要 **一页** 披露对齐结论，而非另一套 HR 黑箱 | 仅需摘要层，且与 HR 工作台 **同源数据** |

10x 垂直研究（X10）仍为 **v1.2+ 扩展域**，不抢占 HR 工作台主路径。

→ 业务背景：[business-narrative.md](../00-background/business-narrative.md)（**HRBP 主视角** 业务为什么，与产品 IA 一致）  
→ 战略框架：[strategic-context.md](../00-background/strategic-context.md)

### 1.2 方案（一句话）

**STRIDE** = **HRBP 人力洞察与战略编制工作台**（默认首页）+ **战略能力×产品线×岗位族核算引擎** + **Insight Copilot（Chat-to-BI）** + **季度预测与情景沙盘** + **Executive 同源摘要**（子路由，非营销落地页）。

### 1.3 产品定位原则（v1.2 裁决）

| 原则 | 说明 |
|------|------|
| **HR 工作台优先** | 默认登录后（Demo 无鉴权则为默认路由）进入 **HRBP 四 Tab**，不是董事会 Hero |
| **资本叙事降级** | HCE、能力 ROI、10x 杠杆等出现在 **「经营摘要」** Tab / Executive 子视图，不占 Hero 主 KPI |
| **数字化可感知** | 用户 3 分钟内能完成一次 **自然语言问数** 与一次 **下季情景预测** |
| **同源口径** | 图表、报告、Copilot 答案均来自同一 `CalcSnapshot` + `MetricDefinition`，禁止 Copilot 幻觉指标 |
| **反模式** | 不做 GolfSpace 式「会员/俱乐部」营销壳；不把 C7 表述为「资本效率」 |

### 1.4 体验参考（单一事实来源）

| 参考物 | 用途 | 不作为 |
|--------|------|--------|
| [warm-squirrel-e57666.netlify.app](https://warm-squirrel-e57666.netlify.app/) | **默认 IA、Tab、HR 指标卡、Chat-to-BI 布局、调薪沙盘** | 真实数据或技术栈 |
| `mockups/stride-home-executive.html` | **Executive 摘要页** 视觉与信息密度参考 | 产品首页、HRBP 默认路径 |
| [architecture-v2.1.md](../03-architecture/architecture-v2.1.md) | 模块与 API | — |

### 1.5 成功标准

| 指标 | 目标 |
|------|------|
| HR 可理解性 | HRBP 用户测试：5 分钟内说出本季 **TCOW 趋势 + 2 个组织信号 + 1 条编制建议** |
| 战略可追溯 | 100% 产出指标挂载 C1–C7（C7 可选） |
| 来源可审计 | ≥80% 关键字段有 source_type + 备注 |
| **Chat-to-BI** | Demo 内置 ≥12 条标准问法，**100% 可追溯到字典/快照字段** |
| **预测** | 至少 2 类情景（编制增量、主投权重调整）输出下季 **区间 + 假设清单** |
| Demo 路径 | 15 分钟：HR 工作台 → 问数 → 情景 → 导出 HRBP 报告 → 切换 Executive 摘要 |
| 趋势 | ≥2 季度对比 |

---

## 2. 用户与需求（HR 域扩展）

### 2.1 主路径用户

| 优先级 | 角色 | 默认界面 | 核心任务 |
|--------|------|----------|----------|
| **P0** | HRBP | 人力洞察工作台 | 成本/编制/组织信号/问数/沙盘 |
| **P1** | CPO | 战略对齐 + 产品线 stage | 能力权重、W4 linkage、10x 采纳矩阵（v1.2+） |
| **P2** | Executive / CFO | 经营摘要（子页） | 披露通道、能力 ROI 摘要、单条决策、免责 |
| **P3** | 产品线负责人 | PL 人效卡（只读） | 本线投入与产出 proxy |

### 2.2 HR 专业域功能地图

对齐 Netlify 原型四 Tab，并与 STRIDE 战略核算打通：

```
HRBP 工作台（默认 /）
├── Tab1 总览 · 洞察
│   ├── KPI：TCOW、Rev/FTE、Labor Cost%、编制达成（双通道：披露优先 + proxy 备注）
│   ├── 图：营收 vs TCOW 走势（滚动窗口）
│   ├── 图：部门/产品线 Rev/FTE 对标
│   └── 侧栏：Insight Copilot（Chat-to-BI）
├── Tab2 成本 · TCOW 结构
│   ├── TCOW 结构：固定/浮动/法定/福利（Demo 比例可配）
│   └── 部门/产品线成本一览：预算偏离、关注点标签
├── Tab3 组织 · 效率信号
│   ├── 组织信号：Span、关键岗空缺、离职率、编制达成
│   ├── 调薪沙盘：滑块 → 增量 TCOW、Labor Cost% Δ（联动 CalcEngine）
│   └── 战略分摊矩阵入口（→ 向导 2）
├── Tab4 薪酬×绩效 · 一致性（聚合）
│   ├── 高绩效占比 vs 高绩效薪酬占比（部门聚合）
│   ├── 一致性表 + 策略提示；n<5 不展示个案
│   └── 水印：非绩效裁员工具
└── 全局：季度选择、证据层、假设>30% 水印
```

**与战略核算的关系**：Tab1–4 的「部门」在 Demo 中映射为 **产品线 P1–P6 + 公司级**；岗位族 RF01–RF09 在「组织」「分摊矩阵」中展开。TCOW / Labor Cost% 为 **People Analytics 层指标**，能力 ROI 为 **战略层指标**，同一快照不同视图。

### 2.3 需求 ID（新增与修订）

| ID | 需求 | 优先级 | 说明 |
|----|------|--------|------|
| R-HRBP-01 | 能力×岗位×产品线矩阵 | P0 | 保留 v1.1 |
| R-HRBP-02 | source_type 三级 + 来源附录 | P0 | 保留 |
| R-HRBP-03 | ≥2 季度趋势 | P0 | 保留 |
| **R-HRBP-04** | **HR 工作台四 Tab（默认首页）** | **P0** | 对齐 Netlify IA |
| **R-HRBP-05** | **TCOW / Rev/FTE / Labor Cost% / 编制达成 KPI** | **P0** | 字典见 metrics-dictionary |
| **R-HRBP-06** | **Insight Copilot（Chat-to-BI）** | **P0** | 见 §4.2 |
| **R-HRBP-07** | **季度预测与情景沙盘** | **P0** | 见 §4.3 |
| **R-HRBP-08** | **调薪/编制增量沙盘** | **P1** | Tab3 滑块联动 |
| R-CPO-01～04 | 产品线 stage、linkage 等 | P1 | 保留 |
| R-CEO-01～03 | 一页摘要、无末位、免责 | P1 | **降为子路由，非首页** |
| R-CFO-01～04 | 披露通道硬隔离 | P0 | 保留 |

10x：R-X10-01～04 仍为 **P1（v1.2 模块）**，不进入 HR 默认 Tab。

**冲突裁决**：仍以 [interview-synthesis.md](../01-discovery/interview-synthesis.md) 为准；新增 **C11**：「Executive 营销首页 vs HR 工作台」→ **HR 工作台默认**（本 PRD）。

---

## 3. 产品架构（摘要）

四层扩展为 **五层体验**（L1 内分 HR 工作台 / Executive 摘要）：

| 层 | 模块 |
|----|------|
| **L1a HR 工作台** | 四 Tab Shell、KPI 卡、图表、Copilot 侧栏、沙盘控件 |
| **L1b Executive 摘要** | 单屏 KPI + 一条决策 + 导出 MD/PDF |
| **L2 分析** | CalcEngine、WarningEngine、**ForecastEngine**、ReportBuilder |
| **L2b 智能** | **InsightCopilot**（Chat-to-BI）、ScenarioSandbox |
| **L3 领域** | QuarterConfig、PL、RF、Allocation、MetricDefinition、DisclosedMetrics… |
| **L4 证据** | SourceEvidence |

→ 架构详述：[architecture-v2.1.md](../03-architecture/architecture-v2.1.md)（v2.2 增补 Copilot/Forecast）

### 3.1 核算与预警（保留）

```
投入_i = FTE_i × 13周 × 系数_i × 分摊%
人效指数_i = Σ_c(产出_i,c × 战略权重_c) / 投入_i × 100
TCOW_i = Σ 投入_i（公司/部门/产品线聚合）
Labor Cost% = TCOW / 营收（披露或 proxy，分通道）
Rev/FTE = 营收 / HC
```

| 预警 | 规则 |
|------|------|
| W1–W5 | 同 v1.1（stage 降敏） |
| W6–W11 | 10x（可与 MVP 分阶段） |

### 3.2 信息架构（v1.2）

```
/                          → HRBP 工作台 Tab1 总览（默认）
/cost                      → Tab2 成本
/org                       → Tab3 组织 + 分摊/向导入口
/pay-performance           → Tab4 薪酬×绩效
/insight                   → Copilot 全屏（可选）
/scenario                  → 情景预测与沙盘
/wizard/1|2|3              → 战略配置 / 组织投入 / 产出证据
/strategic                 → 能力 ROI、产品线、预警（原「核算结果」）
/executive                 → 经营摘要（原 mockup 内容压缩至此）
/report                    → 报告导出
/settings                  → 字典、模板、Demo 种子
```

**视图切换**：顶栏 `HRBP | CPO | Executive`；**默认 HRBP**。Executive 不再使用全屏 Hero 营销文案。

### 3.3 角色可见性（修订）

| 视图 | 首屏 | 强化 | 隐藏 |
|------|------|------|------|
| **HRBP（默认）** | TCOW 四 KPI、走势、Copilot | 全矩阵、沙盘、薪酬一致性 | — |
| **CPO** | 能力 ROI、stage、linkage | 产品线对标、W4 | 个案薪酬 |
| **Executive** | 披露杠杆、主投能力摘要、1 条决策 | 10x 杠杆（可选） | 岗位末位、个案 |

---

## 4. 数字化能力（v1.2 核心增量）

### 4.1 Insight Copilot — Chat-to-BI

**定位**：面向 HRBP/CPO 的 **口径一致问答**，不是通用聊天机器人。

| 维度 | 规格 |
|------|------|
| **MVP 实现** | **规则 + 模板** 为主：意图分类 → 映射到预定义查询（SQL/CalcEngine）→ 自然语言总结 |
| **可选增强** | LLM 仅用于 **润色回答**，生成前必须命中 `allowed_metrics` 白名单 |
| **UI** | 总览 Tab 右侧固定侧栏（同 Netlify）；支持「去提问」快捷入口 |
| **标准问法（Demo ≥12）** | 例：「本季 TCOW 同比？」「哪条产品线 Labor Cost% 最高？」「编制达成最低的是谁？」「主投 C2 的能力 ROI？」「W4 影响哪条线？」 |
| **回答结构** | 结论 → 数字（带季度）→ 图表锚点 → **字段来源**（disclosed/proxy/assumption）→ 跳转链接 |
| **拒绝策略** | assumption_ratio>30% 或缺证据 → 拒绝给确定数，提示补证据或改问法 |
| **审计** | 每次问答落 `copilot_query_log`（question, intent, snapshot_id, metric_codes） |

**API（建议）**：`POST /api/copilot/ask` `{ quarter_id, question, view }` → `{ answer, citations[], chart_spec? }`

### 4.2 ForecastEngine — 预测与情景

**定位**：**透明公式** 的季度前瞻，非黑箱 ML（作品集可解释性优先）。

| 情景类型 | 输入 | 输出 |
|----------|------|------|
| **编制增量** | +N FTE × RF × 目标 PL | 下季 TCOW Δ、Labor Cost% Δ、能力投入分布 |
| **主投权重调整** | C1–C7 权重变更 | 各能力 ROI 重算、W2/W3 触发预判 |
| **营收敏感度** | 营收增速 ±X%（披露/proxy） | Rev/FTE 区间、HCE 杠杆区间 |
| **调薪沙盘** | 调薪比例 × 人群 | 增量 TCOW、Labor Cost% Δ（与 Tab3 联动） |

**输出格式**：点估计 + **乐观/基准/保守** 三档（基于假设系数 ±%），附 **假设清单** 与水印。

**API**：`POST /api/forecast/scenario` `{ quarter_id, scenario_type, params }` → `{ bands, assumptions[], warnings[] }`

### 4.3 技术栈（增补）

| 层 | 选型 |
|----|------|
| 前端 | Next.js 14, TypeScript, ECharts |
| Copilot MVP | 意图规则表 + SQLite 查询；可选 Vercel AI SDK **仅作 NLG** |
| Forecast | CalcEngine 扩展 + 假设参数 JSON |
| 后端 | Route Handlers + SQLite |
| 报告 | Markdown + PDF（HRBP 详版默认） |

---

## 5. 功能范围（重排优先级）

### MVP（v1.2 定义）

- **HRBP 工作台四 Tab**（对齐 Netlify）
- **TCOW / Rev/FTE / Labor Cost% / 编制达成** KPI + 走势与对标图
- **Insight Copilot**：≥12 标准问法 + 来源追溯
- **ForecastEngine**：编制增量 + 主投权重调整 两类情景
- 战略向导 1–3 + CalcEngine + W1–W5
- 9 岗位族分摊 + 双通道录入 + QuarterConfig 快照
- **/executive** 经营摘要（精简，无营销 Hero）
- HRBP 详版报告 MD+PDF；Demo 种子 2025Q2–Q4

### V1.2 模块（可与 MVP 并行，不阻塞 HR 首页）

- 10x Tab、Handoff/采纳、W6–W11、协作分

### V1

- 调薪沙盘完整版、JD 计数助手、Copilot LLM 意图扩展、多用户鉴权

### Out of scope

- 真实 HRIS/薪酬系统对接、个案级绩效、未经审计的 LLM 编造指标、**纯投资者关系网站式首页**

---

## 6. 指标字典（HR 层增补）

在 [metrics-dictionary.csv](./metrics-dictionary.csv) 中增补（实现时落库）：

| code | name | owner |
|------|------|-------|
| HR-TCOW | 总人力成本（推演） | HRBP |
| HR-REV-FTE | 营收/全职当量 | HRBP |
| HR-LABOR-PCT | 人力成本占营收% | HRBP / CFO |
| HR-HC-ACHIEVE | 编制达成率 | HRBP |
| HR-SPAN | 管理幅度（proxy） | HRBP |
| HR-TURNOVER | 离职率（proxy） | HRBP |
| HR-PAY-PERF-GAP | 高绩效薪酬占比偏差 | HRBP |

战略层指标（能力 ROI、X10-*）仍在同一字典，**UI 默认折叠到「战略」路由**。

---

## 7. 非功能需求

| 项 | 要求 |
|----|------|
| 性能 | Copilot 响应 <3s（规则路径） |
| 可访问性 | Tab 键盘导航；图表提供数据表切换 |
| 文案 | 默认中文 HR 术语；避免「投资组合」「会员」等金融营销词作为主文案 |
| 隐私 | 薪酬×绩效仅聚合；n<5 脱敏 |

---

## 8. 发现来源（引用）

| 类型 | 文档 |
|------|------|
| 高管/HRBP 专访 | [interviews-executives.md](../01-discovery/interviews-executives.md) |
| 六产品线专访 | [interviews-product-lines.md](../01-discovery/interviews-product-lines.md) |
| UX 裁决 | 本 PRD §1.3–1.4（Netlify 北极星） |
| v1.1 归档 | [PRD-v1.1.md](./PRD-v1.1.md) |

---

## 9. Pre-mortem（增补）

| 风险 | 缓解 |
|------|------|
| 又做成投资者 PPT | 默认路由强制 HR 工作台；PR 评审检查首屏 KPI |
| Copilot 胡说 | 白名单指标 + citation + 拒绝策略 |
| 预测不可信 | 三档区间 + 假设清单 + 水印 |
| HR 与战略「两套数」 | 单一 CalcSnapshot；UI 分视图不分数据源 |

---

**STATUS: READY_FOR_BUILD（v1.2）** — 以 HR 工作台 + Chat-to-BI + 预测为 MVP 核心；Executive 为同源摘要子页。

**下一步**：按 Netlify IA 起 Next 首页；实现 `/api/copilot/ask` 与 `/api/forecast/scenario`；将 `stride-home-executive.html` 拆为 `/executive` 组件。
