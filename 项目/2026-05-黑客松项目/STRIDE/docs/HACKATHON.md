# 黑客松阅读路径 · STRIDE

> **目标**：48 小时内能 **讲清故事、做出 Demo、答辩不跑偏**。  
> **主 PRD**：[PRD-v1.2.md](./02-requirements/PRD-v1.2.md) · **全量清单**：[MANIFEST.md](./MANIFEST.md)

---

## Tier 0 · 5 分钟（人人必读）

| # | 文档 | 你要带走什么 |
|---|------|----------------|
| 1 | 本文 | 读什么、不读什么 |
| 2 | [business-narrative.md](./00-background/business-narrative.md) | HRBP 为什么需要这个台子 |
| 3 | [PRD-v1.2.md](./02-requirements/PRD-v1.2.md) §1–§5 | 做什么：四 Tab、Copilot、预测、Executive 子页 |
| 4 | [Netlify 原型](https://warm-squirrel-e57666.netlify.app/) | **UX 长什么样**（比 markdown 重要） |
| 5 | [demo-seed-plan.md](./04-demo/demo-seed-plan.md) | Demo 演哪三季、亮哪条预警 |

**电梯句（中文）**  
「HRBP 的人力洞察工作台：TCOW、编制、组织信号能看能问能算；战略分摊和 CEO 一页纸 **同源**，不是投资者 PPT。」

---

## Tier 1 · 开发 MVP（写代码）

| # | 文档 | 用途 |
|---|------|------|
| 1 | [SESSION-HANDOFF.md](./SESSION-HANDOFF.md) | 复制给 Cursor / 队友 |
| 2 | [architecture-v2.1.md](./03-architecture/architecture-v2.1.md) | 模块、API、数据流 |
| 3 | [ui-design-digital-v1.md](./03-architecture/ui-design-digital-v1.md) | 亮色 UI、组件约定 |
| 4 | [allocation-default.json](./02-requirements/allocation-default.json) | 分摊种子 |
| 5 | [metrics-dictionary.csv](./02-requirements/metrics-dictionary.csv) | 指标 code |
| 6 | `../web/README.md` | 本地启动 |

**MVP 砍 scope 时保留**  
HR 四 Tab（可静态）→ 1 条 Copilot 问数 → 1 个 forecast 情景 → 一季种子数据 → `/executive` 半屏摘要。

**可砍**  
10x 全模块、W6–W11、德勤文档、六线专访全文、PDF 导出（MD 即可）。

---

## Tier 2 · 答辩加深（有时间再读）

| 文档 | 用途 |
|------|------|
| [strategic-context.md](./00-background/strategic-context.md) | C1–C7、P1–P6、公式 |
| [interview-synthesis.md](./01-discovery/interview-synthesis.md) | 冲突裁决（含 C11 HR 首页） |
| [interviews-executives.md §1 HRBP](./01-discovery/interviews-executives.md) | R-HRBP-* 需求出处 |
| [mockups/stride-home-digital.html](../mockups/stride-home-digital.html) | 亮色数字化稿 |

---

## Tier 3 · 归档（黑客松可不读）

见 [99-archive/README.md](./99-archive/README.md)（德勤建议、superseded PRD、旧路径 stub）。

---

## 文档树（逻辑分层）

```text
docs/
├── HACKATHON.md          ← 你在这里
├── MANIFEST.md           ← 全文件索引 + tier 标签
├── README.md             ← 完整索引与版本表
├── SESSION-HANDOFF.md
│
├── 00-background/        # WHY · HRBP 叙事 / 战略上下文
├── 01-discovery/         # 访谈证据（背景材料）
├── 02-requirements/      # WHAT · PRD v1.2 + 数据工件
├── 03-architecture/      # HOW · 架构 + UI + 埋点
├── 04-demo/              # DEMO · 种子与演示脚本
└── 99-archive/           # 可选 · 非赛题核心
```

---

## 与远程仓库协作

```bash
git clone https://github.com/Frankli9986/HR-hackathon-2026-05.git
cd HR-hackathon-2026-05/项目/2026-05-黑客松项目/STRIDE
# 先读 docs/HACKATHON.md，再 cd web && npm i && npm run dev
```

更新文档后：在 `STRIDE/` 目录 `git add docs/` → `git commit` → `git push`。

---

**更新**：2026-05-16 · 对齐 PRD v1.2
