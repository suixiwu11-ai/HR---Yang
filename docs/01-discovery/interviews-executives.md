# 高管与 HRBP 专访 — 完整纪要（4 轮）

> **方法**：`interview-script`（Mom Test 结构）+ `summarize-interview`  
> **对象**：HRBP、CPO、CEO、CFO 分身（基于公开信息与行业推演，**非真实录音**）  
> **日期**：2026-05-16（从 PRD v1.0 §3.1–3.4 扩展为全文归档）  
> **产品线专访**：见 [interviews-product-lines.md](./interviews-product-lines.md)  
> **跨访谈综合**：见 [interview-synthesis.md](./interview-synthesis.md)

---

## 目录

1. [HRBP 分身](#1-hrbp-分身)
2. [CPO 分身](#2-cpo-分身)
3. [CEO 分身](#3-ceo-分身)
4. [CFO 分身](#4-cfo-分身)

---

## 1. HRBP 分身

**专访对象**：集团 HRBP 分身 · 战略编制与业务对齐接口  
**汇报关系**：服务 CPO/CEO 季度叙事，对接 6 产品线编制争议

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | 上季度编制争议最激烈的是哪条产品线？最后谁拍板？ | Context |
| Pain | JD 里写「算法 60%」和年报 C 端叙事对不上时，你怎么解释？ | Pain |
| Pain | 业务说「人不够」、财务说「人效低」——你手头有什么中立数字？ | Pain |
| Success | 下季度向 CPO 汇报「主投能力 ROI」需要哪 3 个字段？ | Success |
| Constraint | 没有 HRIS 时，哪些数可以 proxy，哪些绝对不能编？ | Constraint |
| Wrap | 你希望核算台季度卡上 **必须出现的一行字** 是什么？ | Success |

### 纪要 — summarize-interview

#### Context
- **范围**：全公司 8 岗位族 × 6 产品线分摊；季度战略权重由 CPO 模板 + HRBP 录入调整（需 audit）。
- **季度语境**：2025 下半年多条线处于 **grow**，P3 Audio 为 **explore**；编制讨论集中在 P1 内容岗、P6 中台分摊、P2/P4 模型-产品不同频。
- **工具现状**：Excel + 会议纪要；无统一「能力 ROI」口径；来源分级混乱。

#### Top 3 pains
1. **编制与战略对不齐**：招聘 JD 算法占比 vs 年报「C 端 + 海外」叙事冲突，业务质疑 HR「不懂战略」。
2. **与业务争口径**：产品线用 DAU/功能数，HR 用 FTE；会议常沦为「人不够」vs「人效低」各说各话。
3. **无 HRIS 也要能交差**：必须接受 proxy + 披露混合，但要有 **source_type** 与证据链，否则不敢进 Executive。

#### Success criteria
- **主投能力 ROI** 可按季汇报，且 100% 挂载 C1–C6。
- **编制建议可落到岗位族**（非仅产品线总额）。
- **≥2 季度趋势** 对比，避免单点精确假象。

#### Decisions / mandates
- **M-HRBP-01**：核算台必须提供 **能力 × 岗位 × 产品线** 三维矩阵（R-HRBP-01）。
- **M-HRBP-02**：来源三级：`disclosed` > `proxy` > `assumption`，强制备注（R-HRBP-02）。
- **M-HRBP-03**：HRBP 详版 **保留岗位排名**；Executive **隐藏末位**（与 CEO 冲突裁决见 synthesis）。

#### Requirements（R-IDs）

| ID | 需求 | 能力/对象 |
|----|------|-----------|
| R-HRBP-01 | 能力×岗位×产品线矩阵视图 | C1–C6, RF01–RF08, P1–P6 |
| R-HRBP-02 | source_type 三级 + 来源附录 | 证据层 |
| R-HRBP-03 | 季度趋势对比（≥2 季） | QuarterConfig 快照 |

#### Quotes
> 「我不是要砍人计算器，我要的是能跟业务 **同一套坐标系** 吵架的工具。」  
> 「没有来源分级的表，我不敢拿去 CEO 会议室。」

#### Assumptions
- [assumption] MVP FTE 为 HRBP 手工录入，不接 HRIS。
- [assumption] 岗位排名仅在 `?view=hrbp` 展示。

#### Open questions
- UGC 审核合规人力归 C3 还是 C6？（与 P1 专访交叉，待 CPO 裁决）

---

## 2. CPO 分身

**专访对象**：首席产品官分身 · 6 产品线 stage 与产出门禁  
**能力主绑**：C3 产品化、C2 多模态体验、跨线 linkage

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | 六条线里谁还在 explore，谁必须 harvest？依据是什么？ | Context |
| Pain | 「产品+设计+内容」人效和收入/留存对不上时你怎么判断？ | Pain |
| Pain | 模型发布和产品 major 不同频最近一次怎么处理的？ | Pain |
| Success | 下季度各 PL 的 **门禁** 你会看哪 3 个信号？ | Success |
| Constraint | 探索期产品线能否用同一套红色预警？ | Constraint |

### 纪要 — summarize-interview

#### Context
- **范围**：P1–P6 产品线负责人虚线汇报；战略权重模板共定。
- **反对项**：单纯「砍人计算器」；探索期（尤其 P3）不能单看 DAU 或收入人效。

#### Top 3 pains
1. **产品线「产品+设计+内容」人效与收入/留存不匹配**：grow 线应用付费与 major 版本，explore 线用技术里程碑。
2. **模型发布 vs 产品发布不同频**：P2 海螺、P4 视频高频「有模型无 major」，责任不清。
3. **反对砍人导向**：需要 **stage 驱动** 的规则集，而非统一红色 W1。

#### Success criteria
- 下季 **门禁**：major 版本数、实验/发布数（可配置）。
- **依赖备注**：模型延期 → 海螺/视频 linkage 可见（W4 扩展）。
- **权重变更** 全量 audit_log。

#### Decisions / mandates
- **M-CPO-01**：每条 PL 配置 `stage: explore|grow|harvest`（R-CPO-02）。
- **M-CPO-02**：CPO 预设战略权重模板，HRBP 调整需 audit（R-CPO-03）。
- **M-CPO-03**：W4「模型≥1 且 PL major=0」进 CPO 视图（R-CPO-04）。

#### Requirements（R-IDs）

| ID | 需求 | 说明 |
|----|------|------|
| R-CPO-01 | 产品线视图 | stage、能力权重、PL 专属指标 |
| R-CPO-02 | stage 配置驱动 WarningEngine | explore 降敏 |
| R-CPO-03 | 权重变更 audit_log | 不可静默改历史 |
| R-CPO-04 | W4 产品滞后预警 | 联动 P6 发布表 |

#### Quotes
> 「探索期不是懒人期，是不能用收割季的红灯吓跑人。」  
> 「模型晚两周，前台不是 lazy——台账上要看得见。」

---

## 3. CEO 分身

**专访对象**：CEO 分身 · 战略聚焦与组织健康叙事  
**汇报物**：Executive 一页纸、单条季度决策建议

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | 对外叙事里今年最重要的三个战略词？ | Context |
| Pain | 董事会问「人效」时你最缺什么数字？ | Pain |
| Success | 一页纸里你愿意看的 **最多几条** 结论？ | Success |
| Constraint | 哪些展示会伤害组织士气或误读为裁员？ | Constraint |

### 纪要 — summarize-interview

#### Context
- **战略聚焦**：多模态 + C 端全球 + 商业化（与年报公开叙事一致）。
- **组织健康**：关键岗到位、主投能力 ROI 趋势，而非岗位末位榜。

#### Top 3 pains
1. **战略聚焦叙事难量化**：需要 **能力 ROI 趋势** 而非单点人头。
2. **杠杆故事但不能冒充官方人效**：必须用披露校验，高假设须水印。
3. **组织健康**：关心关键岗是否支撑主投能力，反对「末位排名」外泄。

#### Success criteria
- **主投能力 ROI 趋势**（≥2 季）。
- **单条季度决策建议**（非清单式裁编）。
- **免责声明固定展示**（R-CEO-03）。

#### Decisions / mandates
- **M-CEO-01**：Executive 报告 **无岗位末位排名**（R-CEO-01）。
- **M-CEO-02**：趋势优先于单点精确（R-CEO-02）。
- **M-CEO-03**：固定免责声明（见 [project-background.md](../00-background/project-background.md)）。

#### Requirements（R-IDs）

| ID | 需求 |
|----|------|
| R-CEO-01 | ExecutiveShell：能力 ROI、杠杆、1 条决策；隐藏排名与 P6 收入人效 |
| R-CEO-02 | 趋势图默认开启 |
| R-CEO-03 | 免责声明组件不可关闭 |

#### Quotes
> 「我要的是 **下一步战略押注** 的建议，不是裁员名单。」

---

## 4. CFO 分身

**专访对象**：CFO 分身 · 披露校验与杠杆口径  
**能力主绑**：C4 商业化披露、公司级 HCE

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | 年报里你会强制 HR 对齐的 3 个披露字段？ | Context |
| Pain | 岗位系数被当成薪酬时你怎么反应？ | Pain |
| Success | 「收入增速 vs 员工数增速」你希望怎么可视化？ | Success |
| Constraint | 假设占比多少以上必须水印？ | Constraint |

### 纪要 — summarize-interview

#### Context
- **必须用披露数校验**：分产品收入、海外占比、员工成本等。
- **岗位系数 ≠ 薪酬**；HCE 仅 **公司级**，不得与岗位人效指数混谈。

#### Top 3 pains
1. **口径混用**：业务 proxy 与年报数字在同一页对比会误导董事会。
2. **假设占比高**：无水印的推演报告风险高。
3. **杠杆误读**：收入占比↑ 投入占比↓ 需 W5 预警，但探索期 PL 需降敏。

#### Success criteria
- **收入增速 vs 员工数增速** 可对照。
- **收入占比 vs 投入占比** 杠杆表。
- **assumption_ratio > 30%** 报告封面水印（R-CFO-04）。

#### Decisions / mandates
- **M-CFO-01**：DisclosedMetrics 独立模块（R-CFO-01）。
- **M-CFO-02**：双通道 UI 硬隔离（R-CFO-02）。
- **M-CFO-03**：W5 负向杠杆预警（R-CFO-03）。

#### Requirements（R-IDs）

| ID | 需求 |
|----|------|
| R-CFO-01 | DisclosedMetrics：收入、海外占比、员工成本等 |
| R-CFO-02 | 披露通道与代理通道分栏 |
| R-CFO-03 | W5 杠杆预警规则 |
| R-CFO-04 | assumption_ratio>30% 水印 |

#### Quotes
> 「岗位系数是建模假设，不是工资单。」  
> 「没有披露来源的数字，别进我一页纸。」

---

**文档状态**：COMPLETE — 高管层需求 R-HRBP / R-CPO / R-CEO / R-CFO 的单一事实来源。
