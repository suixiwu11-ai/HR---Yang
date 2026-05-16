# 产品线负责人专访 — 完整纪要（6 轮）

> **方法**：`interview-script`（Mom Test 结构）+ `summarize-interview`（结构化纪要）  
> **对象**：P1–P6 产品线负责人分身（基于公开信息与行业推演，非真实录音）  
> **日期**：2026-05-16（重做版，替代 PRD v1.0 §3.5–3.10 缩写快照）  
> **映射**：战略能力 C1–C6 | 产品线 P1–P6 | 岗位族 8 类  
> **索引**：[docs/README.md](../README.md) · **PRD**：[02-requirements/PRD-v1.1.md](../02-requirements/PRD-v1.1.md) · **综合**：[interview-synthesis.md](./interview-synthesis.md)

---

## 目录

1. [P1 星野 / Talkie](#p1-星野--talkie)
2. [P2 海螺 AI](#p2-海螺-ai)
3. [P3 Audio / 语音](#p3-audio--语音)
4. [P4 视频 / Hailuo](#p4-视频--hailuo)
5. [P5 开放平台 / API](#p5-开放平台--api)
6. [P6 基础模型与中台](#p6-基础模型与中台)
7. [跨产品线综合（Cross-PL Synthesis）](#跨产品线综合cross-pl-synthesis)

---

## P1 星野 / Talkie

**专访对象**：P1 负责人分身 · 「星野/Talkie」C 端 AI 陪伴与 UGC 社区  
**能力主绑**：C3 AI 原生产品 · C5 全球化与增长 · C2 多模态生成（辅助）

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | 上季度你最硬的 2 个目标是什么？和 Talkie 海外版如何分工？ | Context |
| Current | 编制争议最近一次怎么收场？谁拍板？ | Pain |
| Pain | 内容与算法抢人时，你用什么数字说服 CPO？ | Pain |
| Success | 下季度你认为「人效合格」的 3 个可核对信号？ | Success |
| Constraint | 哪些数你敢写进汇报，哪些绝对不能碰？ | Constraint |
| Wrap | 你希望 HRBP 季度卡上必须出现的一行字？ | Success |

### 纪要 — summarize-interview

#### Context
- **范围**：P1 星野（国内）+ Talkie（海外）统一汇报；C 端订阅/内购与社区 UGC 为核心商业模式。
- **季度语境**：2025 下半年起 stage 默认 **grow**（收割验证期），但部分区域仍带 explore 特征（新语言包、新角色玩法）。
- **战略对齐**：公司叙事「AI 原生 C 端 + 全球化」；P1 承担 C3 产品化与 C5 海外增长的显性指标。
- **组织**：内容与 IP、增长、产品编制显性归属 P1；算法/工程大量依赖 P6 分摊。

#### Top 3 pains
1. **内容与算法争资源**：活动/角色上线节奏由内容驱动，但推理与模型迭代排期在中台；「有人无模型」「有模型无内容」双输频发。
2. **指标口径战争**：业务用 MAU/时长，CPO 看付费与留存，CFO 只认分产品收入——三方会议常各说各话。
3. **分摊不透明**：工程/算法 70% 默认落 P6 后，P1 真实负担被低估，导致「砍内容岗」建议与体感不符。

#### Success criteria
- 分产品/分区域 **收入与付费用户** 可对接披露或财报附注（disclosed 优先）。
- **Major 版本 + 大型活动** 数按季可审计（proxy，附官网/应用商店 changelog）。
- 主投能力 **C3/C5 ROI** 不低于公司中位数，或 stage=grow 下给出「投入↑合理」的备注链。

#### Decisions / mandates
- **M-P1-01**：P1 不得单独用 DAU 做编制否决依据；grow 期以付费转化与 ARPPU 代理为主。
- **M-P1-02**：内容岗默认 **100% 分摊至 P1**（R-P1-02），除非 CPO 书面调整并 audit。
- **M-P1-03**：Talkie 与星野 在核算台可 **子维度** 展示，但 MVP 合并为 P1 一条产品线。

#### Metrics trust vs distrust

| 信任（Trust） | 不信任（Distrust） |
|---------------|-------------------|
| 分产品收入、海外收入占比（披露） | 内部精确 MAU（无 HRIS 时不报） |
| 应用商店版本记录、重大活动公告（proxy） | 单人效排名 / 末位岗位榜 |
| 付费率、订阅相关的第三方行业对标（proxy+备注） | 把 P6 分摊后投入当作「P1 编制过少」 |

#### Requirements（R-IDs）→ 能力映射

| ID | 需求 | C1–C6 |
|----|------|-------|
| R-P1-01 | 分产品 MAU/收入/付费字段，source_type 必填 | C3, C5 |
| R-P1-02 | 内容岗默认分摊 100%→P1，矩阵行锁定可 override+audit | C3 |
| R-P1-03 | stage=grow 时 W1 触发需同时看付费 proxy 趋势 | C3, C5 |
| R-P1-04 | 与 P6 依赖备注：模型版本→活动排期（linkage） | C1, C2 |
| R-P1-05 | 产品线视图展示 C3/C5/C2 权重模板（默认 0.5/0.3/0.2） | C3, C5, C2 |

#### Quotes（可选）
> 「我可以接受人效低一季，不能接受活动季被算法排期架空。」  
> 「别拿 MAU 砍内容——那是增长团队的虚荣表，付费才是收割。」

#### Assumptions [assumption]
- [assumption] Talkie 与星野 合并 FTE 录入，按 60/40 手动拆分可选（V1）。
- [assumption] 2025Q2–Q4 公开新闻可支撑 major 版本计数 proxy。

#### Open questions
- 分产品收入若年报仅合并「AI 原生应用」，是否允许 **假设拆分比例** 并强制 assumption 水印？
- UGC 审核合规人力是否算 C6 还是 C3？需 CPO 裁决一次。

#### 能力权重建议（录入模板）
`C3:0.50 | C5:0.30 | C2:0.20` — 岗位优先：内容、增长、产品

---

## P2 海螺 AI

**专访对象**：P2 负责人分身 · 多模态生成旗舰应用（文/图/音混合创作）  
**能力主绑**：C2 多模态生成 · C3 AI 原生产品 · C1 基础模型（轻绑）

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | 海螺与星野在能力上的边界谁定？ | Context |
| Pain | 「生成质量」上次怎么量化进 OKR？ | Pain |
| Pain | 与中台分摊 70% 争议最近一次？ | Pain |
| Success | 下季度你会用哪 3 个 proxy 证明 C2 变强？ | Success |
| Constraint | 工程岗里多少算推理成本，多少算产品？ | Constraint |

### 纪要 — summarize-interview

#### Context
- **范围**：P2 海螺 AI — 公司多模态 to-C 旗舰，与 P1 差异化（创作工具 vs 陪伴社区）。
- **季度语境**：stage **grow**；与 P4 视频、P6 模型发布强耦合。
- **战略对齐**：年报「多模态」叙事的主战场；C2 指标集默认展开。

#### Top 3 pains
1. **生成质量难量化**：主观评测、合作案例、功能数 proxy 混用，难以与 CFO 杠杆表对话。
2. **工程与算法中台分摊争议**：P2 认为 70% P6 默认值低估前线交付；P6 认为 P2 占用训练与推理峰值。
3. **产品发布与模型发布不同频**：W4「有模型无 major」在海螺高频出现，背锅方不清。

#### Success criteria
- 每季 **≥N 个 major 多模态功能**（可配置 N，默认 2，proxy）。
- **生成相关合作/评测条目** 1–5 分制或条目数（proxy，附来源）。
- C2 能力 ROI ≥ 公司中位数，或备注说明「基础设施季」。

#### Decisions / mandates
- **M-P2-01**：P2 为 C2 指标字典的 **默认展开产品线**（R-P2-01）。
- **M-P2-02**：中台分摊支持 **一键 70% P6** 再二次分摊（R-P2-02），调整需 audit。
- **M-P2-03**：质量 proxy 不得冒充披露收入；Executive 仅展示趋势与能力卡。

#### Metrics trust vs distrust

| 信任 | 不信任 |
|------|--------|
| 功能发布、版本说明、合作新闻（proxy） | 无来源的「用户满意度」 |
| 分产品收入（若披露拆分） | 用下载量替代付费 |
| P6 模型发布日历（linkage） | 单岗人效末位 |

#### Requirements（R-IDs）

| ID | 需求 | C1–C6 |
|----|------|-------|
| R-P2-01 | C2 指标集在 P2 视图默认展开 | C2 |
| R-P2-02 | 分摊向导：一键 70%→P6 + 二次矩阵 | C1, C2 |
| R-P2-03 | W4 联动 P6 模型发布表 | C1, C2 |
| R-P2-04 | 质量 proxy 模板（评测条目/合作数） | C2 |
| R-P2-05 | 工程岗拆分标签：推理成本 vs 产品交付（备注字段） | C2, C6 |

#### Quotes
> 「质量分不是虚荣，但没有 changelog 的质量分我不认。」  
> 「模型晚两周，海螺不是 lazy，是 blocked——台账上要看得见。」

#### Assumptions
- [assumption] major 功能定义：跨模态链路变更或计费档位变化算 major。
- [assumption] P2 与 P4 共享部分工程岗，默认按 50/50 可调。

#### Open questions
- 推理 GPU 成本是否未来接入 disclosed 成本项，还是永为 assumption？
- 海螺 to-B 试用是否划入 P5？需 CPO 定界。

#### 能力权重建议
`C2:0.50 | C3:0.40 | C1:0.10` — 岗位：算法、工程、产品、设计

---

## P3 Audio / 语音

**专访对象**：P3 负责人分身 · 语音合成/克隆/实时对话（含独立 App 与能力输出）  
**能力主绑**：C2 多模态生成（音频轨）· C1 基础模型（语音底座）

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | Audio 与海螺语音能力如何切分？ | Context |
| Pain | 探索期被 W1 误伤最近一次？ | Pain |
| Success | 什么信号证明「值得再加人」？ | Success |
| Constraint | 收入披露粒度不够时你怎么汇报？ | Constraint |

### 纪要 — summarize-interview

#### Context
- **范围**：P3 Audio/语音 — 独立产品线 stage 默认 **explore**。
- **季度语境**：收入披露常粗粒度；不宜与 P1 同标准「收割」。
- **战略对齐**：技术验证 + 能力外溢至 P1/P2/P4；C2 音频向指标为主。

#### Top 3 pains
1. **收入披露粒度粗**：难以做产品线级杠杆；CFO 合并口径下 P3 易被误判为「低效」。
2. **探索期不宜砍编**：W1「投入↑产出↓」在实验季误触发，打击士气。
3. **与海螺/星野能力边界模糊**：语音能力重复建设争议，分摊扯皮。

#### Success criteria
- **Audio major 发布**（模型/音色/实时对话里程碑）按季计数。
- **技术评测条目**（benchmark、盲测、第三方报道 proxy）。
- stage=explore 时，预警以 **备注 + 低敏感 W1** 为主，不自动红色裁编导向。

#### Decisions / mandates
- **M-P3-01**：P3 默认 stage=**explore**，W1/W2 规则集降敏（R-P3-01）。
- **M-P3-02**：不得用公司级 HCE 直接评价 P3 单人效。
- **M-P3-03**：探索期最低 FTE 保护为 **假设** 字段，需 CPO 勾选确认。

#### Metrics trust vs distrust

| 信任 | 不信任 |
|------|--------|
| 产品发布公告、技术博客、评测新闻 | 分产品收入（若未披露则标 assumption） |
| Major 发布计数（proxy） | 与 P1 比 DAU |
| 能力外溢至其他 PL 的 linkage 备注 | 探索期 strict W1 |

#### Requirements（R-IDs）

| ID | 需求 | C1–C6 |
|----|------|-------|
| R-P3-01 | stage=explore → WarningEngine 降敏配置 | C2 |
| R-P3-02 | 收入缺失时强制 assumption + 水印 | C4（若 to-B 试点） |
| R-P3-03 | 能力外溢 linkage 至 P1/P2/P4 | C2, C1 |
| R-P3-04 | HRBP 详版标注「探索期非裁编依据」文案 | C6 |

#### Quotes
> 「我们这一季在买期权，不是交收割报表。」  
> 「别用星野的付费表审判 Audio——披露都没拆开。」

#### Assumptions
- [assumption] P3 FTE 全公司占比 <8%，segment 分析 n<5 时不展示排名。
- [assumption] 2025 公开信息中 Audio 独立收入不可得，proxy 为主。

#### Open questions
- Audio 何时从 explore→grow？由 CPO 每季门禁还是自动规则？
- 语音合规（深度伪造）人力是否单列 C6？

#### 能力权重建议
`C2:0.70 | C1:0.30` — 预警：探索期关闭 W1 严格模式（配置项）

---

## P4 视频 / Hailuo

**专访对象**：P4 负责人分身 · 视频生成与 Hailuo 品牌（含与海螺协同）  
**能力主绑**：C2 多模态生成 · C3 AI 原生产品

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | Hailuo 品牌与海螺、MiniMax 视频如何统一对外？ | Context |
| Pain | 算力成本藏在工程岗最近一次怎么发现？ | Pain |
| Success | 视频模型版本与产品 major 如何对齐？ | Success |

### 纪要 — summarize-interview

#### Context
- **范围**：P4 视频/Hailuo — 长短视频生成、编辑链路；与 P2 海螺强协同、与 P6 视频模型版本绑定。
- **季度语境**：stage **grow**；算力密集，投入波动大。
- **战略对齐**：多模态战略的第二战场；依赖 C1 视频底座。

#### Top 3 pains
1. **算力与推理成本隐含在工程岗**：FTE 不变但 GPU 消耗季季不同，人效指数失真。
2. **依赖模型版本**：P6 延期直接拖 P4 major，责任归因困难。
3. **品牌与产品矩阵复杂**：Hailuo 新闻、功能、模型版本三条线，proxy 易重复计数。

#### Success criteria
- **视频模型版本发布**（semver 或对外代号）按季可核对。
- **Hailuo 相关功能/新闻** proxy 集，去重规则在指标字典定义。
- P4–P6 dependency linkage 在预警与报告中 **一键展开**。

#### Decisions / mandates
- **M-P4-01**：工程岗必填 **算力密集备注**（可选 assumption 系数 1.0–1.3）。
- **M-P4-02**：W4 扩展：视频模型发布≥1 且 P4 major=0 时触发 CPO 卡。
- **M-P4-03**：与 P2 共享工程分摊默认 50/50，可 audit 调整。

#### Metrics trust vs distrust

| 信任 | 不信任 |
|------|--------|
| 模型版本发布公告 | 无版本的「功能数」堆砌 |
| 去重后的 major 功能定义 | 把市场声量当产出 |
| P6 linkage 时间线 | 单季 GPU 成本精确到岗（若无数据） |

#### Requirements（R-IDs）

| ID | 需求 | C1–C6 |
|----|------|-------|
| R-P4-01 | dependency linkage → P6/C1 | C1, C2 |
| R-P4-02 | 算力备注字段进入投入公式（可选系数） | C2, C6 |
| R-P4-03 | Hailuo proxy 去重规则（字典级） | C2, C3 |
| R-P4-04 | 与 P2 分摊模板预设 | C2 |

#### Quotes
> 「工程表上 80 人，GPU 账单像 120 人——不备注就是瞎算。」  
> 「模型没发不算我们懒，linkage 要给 CPO 看。」

#### Assumptions
- [assumption] MVP 不算真实 GPU 账单，仅用备注系数模拟。
- [assumption] Hailuo 与海螺在对外新闻中需人工去重一次/季。

#### Open questions
- 视频 to-B 是否归 P5？部分 API 计费混在 P5。
- 国际版视频是否与 C5 权重挂钩单独加权？

#### 能力权重建议
`C2:0.55 | C3:0.35 | C1:0.10`

---

## P5 开放平台 / API

**专访对象**：P5 负责人分身 · 开发者平台、API 计费、企业合作  
**能力主绑**：C4 平台与商业化 · C1 基础模型（API 载体）· C6 合规（合同）

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | ToB 收入与 C 端在财报里怎么拆？ | Context |
| Pain | CFO 质疑「混在一起」最近一次？ | Pain |
| Success | 下季度 API 生态健康的 3 个信号？ | Success |
| Constraint | 披露通道优先展示什么？ | Constraint |

### 纪要 — summarize-interview

#### Context
- **范围**：P5 开放平台/API — 开发者生态、企业客户、计费与文档。
- **季度语境**：stage **grow**；商业化叙事关键，但披露常合并。
- **战略对齐**：C4 主绑；与 P6 模型能力定价强相关。

#### Top 3 pains
1. **ToB 收入与 C 端混合**：被 CFO 质疑时，PL 负责人无法自证 API 人效。
2. **商务与工程双高**：客户交付与平台工程争抢同批工程分摊。
3. **ARR/用量 proxy 缺乏统一**：各客户合同保密，只能用文档更新、案例数 proxy。

#### Success criteria
- **API 文档/计费策略更新** 按季版本化（proxy）。
- **企业合作案例/标杆** 可计数（附新闻或官网）。
- 披露通道优先 **ARR/API 相关表述**（有则 disclosed，无则 assumption+水印）。

#### Decisions / mandates
- **M-P5-01**：P5 视图 **披露通道优先**（R-P5-01），与 C 端 proxy 物理分栏。
- **M-P5-02**：商务岗默认分摊 P5；客户成功可部分 C6。
- **M-P5-03**：不得用 C 端 MAU 评价 P5。

#### Metrics trust vs distrust

| 信任 | 不信任 |
|------|--------|
| 年报中 to-B/开放平台表述（若有） | 用公司总收入代 P5 |
| 文档 changelog、定价页版本 | 销售口述 pipeline |
| 合作案例新闻（proxy） | C 端 DAU |

#### Requirements（R-IDs）

| ID | 需求 | C1–C6 |
|----|------|-------|
| R-P5-01 | 披露通道优先 ARR/API 字段 | C4 |
| R-P5-02 | ToB 与 C 端指标 UI 硬隔离 | C4, C3 |
| R-P5-03 | 商务/工程分摊模板 | C4, C1 |
| R-P5-04 | W5 杠杆表支持「收入占比 vs 投入占比」P5 行 | C4 |

#### Quotes
> 「把星野的 DAU 放进 API 汇报，CFO 会直接摔文件。」  
> 「文档发版就是交付——没 changelog 就不算季度产出。」

#### Assumptions
- [assumption] 2025 年报若未拆 API 收入，使用 15–25% assumption 区间并强制水印。
- [assumption] 企业案例数上限每季 20 条，防刷 proxy。

#### Open questions
- 私有化部署人力是否 100% P5 还是拆 P6？
- 海外云市场伙伴是否算 C5 而非 C4？

#### 能力权重建议
`C4:0.60 | C1:0.30 | C6:0.10` — 岗位：商务、工程、产品

---

## P6 基础模型与中台

**专访对象**：P6 负责人分身 · 基础模型、推理、训练平台、共享工程  
**能力主绑**：C1 基础模型与推理 · C2 多模态生成（赋能）· C6 组织与合规底座（平台）

### 访谈脚本（节选）

| 区块 | 问题 | 目的 |
|------|------|------|
| Context | 中台服务哪些 PL 的 SLA 怎么排？ | Context |
| Pain | 「被各线低估」最近一次例子？ | Pain |
| Success | 模型发布与 benchmark 下季门槛？ | Success |
| Constraint | 为何不做收入人效？ | Constraint |

### 纪要 — summarize-interview

#### Context
- **范围**：P6 基础模型与中台 — 训练/推理/平台工程；默认承接 **70% 工程+算法** 分摊入口。
- **季度语境**：stage **grow**（赋能期）；**无独立分产品收入**。
- **战略对齐**：C1/C2 公司级底座；产出以发布、benchmark、赋能 linkage 衡量。

#### Top 3 pains
1. **投入被各产品线低估**：前台只看到「分摊来的数字」，看不到峰值与基建季。
2. **收入人效不适用**：CFO 杠杆表若强行套 P6 会得出荒谬结论。
3. **二次分摊复杂**：70% 落 P6 后如何公平摊回 P1–P5，缺少透明工具。

#### Success criteria
- **模型发布次数**（大版本/中版本定义在字典）。
- **Benchmark 条目**（公开榜单、内部评测 proxy）。
- **赋能 linkage**：每条发布关联 ≥1 个下游 PL major（可配置）。

#### Decisions / mandates
- **M-P6-01**：默认 **70% 工程+算法投入落 P6**，再二次分摊（R-P6-01）。
- **M-P6-02**：P6 **不计算收入人效**；展示能力 ROI 与赋能指数（R-P6-02）。
- **M-P6-03**：P6 触发 W2 时用 **公司级能力 ROI**，不与 PL 混排。

#### Metrics trust vs distrust

| 信任 | 不信任 |
|------|--------|
| 模型发布说明、技术报告、榜单 | 分产品收入（无） |
| Benchmark proxy（有来源） | 前台产品线单人效排名 |
| 下游 linkage 确认（CPO 勾选） | 用总员工数粗算 P6 效率 |

#### Requirements（R-IDs）

| ID | 需求 | C1–C6 |
|----|------|-------|
| R-P6-01 | 默认 70% 投入落 P6 + 二次分摊矩阵向导 | C1, C2 |
| R-P6-02 | P6 隐藏「收入人效」；展示赋能/发布指标 | C1 |
| R-P6-03 | 发布→PL linkage 表驱动 W4 | C1, C2 |
| R-P6-04 | Executive 展示「主投能力 ROI」不含 P6 收入杠杆 | C1 |
| R-P6-05 | audit_log 记录二次分摊变更 | C6 |

#### Quotes
> 「我们不是利润中心，是税率中心——别用收入除我们。」  
> 「70% 不是甩锅，是默认入口，二次分摊必须可视化。」

#### Assumptions
- [assumption] 70% 为 Demo 默认，真实公司可 60–80% 配置。
- [assumption] benchmark 条目每季 5–15 条上限。

#### Open questions
- 安全合规算 C6 全局还是 P6 平台？
- 开源社区运营 FTE 归 P5 还是 P6？

#### 能力权重建议
`C1:0.55 | C2:0.35 | C6:0.10` — 岗位：算法、工程为主

---

## 跨产品线综合（Cross-PL Synthesis）

### 主题（Themes）

| 主题 | 描述 | 涉及 PL | 产品启示 |
|------|------|---------|----------|
| **T1 分摊战争** | 70% P6 入口 + 二次分摊是全场最大政治问题 | P1–P6 | 向导 2 必须矩阵校验、audit、一键模板 |
| **T2 披露 vs proxy 分裂** | CFO 要披露，PL 要 proxy 产出，探索期要降敏 | P3,P5,P6 | 双通道硬隔离 + assumption 水印 |
| **T3 模型-产品不同频** | W4 类问题横跨 P2/P4/P6 | P2,P4,P6 | linkage 表 + CPO 卡，非单纯 W1 |
| **T4 探索 vs 收割** | grow 与 explore 不能用同一预警严度 | P1 vs P3 | stage 驱动 WarningEngine 规则集 |
| **T5 质量难量化** | C2 依赖 proxy 集而非单一 KPI | P2,P3,P4 | 指标字典 + 来源证据层 |
| **T6 收入归因** | ToB/C/中台无收入三类逻辑 | P5,P6,P3 | PL 视图禁用错误分母 |

### 冲突（Conflicts）与 v1.1 产品裁决

| 冲突 | 方 A | 方 B | **裁决（App）** |
|------|------|------|-----------------|
| C1 | P1/P2 要更多前台编制显性 | P6 要 70% 入口可见 | 默认 70%→P6 + **二次分摊可视化** + audit |
| C2 | P3 探索期降 W1 | CFO 统一杠杆口径 | **stage 配置驱动**规则集；P3 默认 explore 降敏 |
| C3 | P5 披露通道独立 | 业务想合并看增长 | UI **硬分栏** ToB vs C 端 |
| C4 | P6 不做收入人效 | 部分 HRBP 想全表排序 | P6 行隐藏收入人效；Executive **无岗位末位** |
| C5 | P2/P4 算力成本 | MVP 无 GPU 账单 | **备注系数** 字段，标注 assumption |
| C6 | 内容 100% P1 | 中台 claim 共享 | **默认矩阵** 内容→P1，可 override+audit |

### 跨 PL 需求汇总（优先级）

| 优先级 | R-ID 簇 | 说明 |
|--------|---------|------|
| P0 | R-P6-01/02, R-P2-02, 分摊矩阵校验 | 无此无信任 |
| P0 | R-P5-01, R-P1-01, 双通道 | CFO/PL 共存 |
| P1 | R-P3-01, stage 规则 | 探索期误伤 |
| P1 | R-P4-01, R-P2-03, linkage | 模型-产品同步 |
| P2 | R-P4-02 算力备注 | 可后置 V1.1 |

### 对核算台的产品决策（MVP）

1. **六 PL 统一骨架**：Context 卡 + 能力权重模板 + stage + 专属 R-ID 勾选清单。  
2. **Executive**：能力 ROI、杠杆、单条决策建议；**隐藏**岗位末位与 P6 收入人效。  
3. **HRBP / CPO 视图切换**（无登录）：详版、排名、分摊 audit、linkage 表。  
4. **Demo 种子**：2025Q2–Q4 三季，预填披露字段 + 各 PL proxy 占位 + 默认分摊矩阵。  
5. **报告**：Markdown + PDF 双导出；assumption_ratio>30% 水印。

---

**文档状态**：COMPLETE — 产品线需求单一事实来源；PRD 仅索引不重复正文。
