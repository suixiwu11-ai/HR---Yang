# 新 Session 开发提示词（复制整段发给 Agent）

> 将下方 **「复制块」** 全文粘贴到新的 Cursor Chat。  
> 文档索引：[README.md](./README.md) | **PRD v1.3** | UX 北极星：https://warm-squirrel-e57666.netlify.app/

---

## 复制块（从这里开始复制）

```markdown
## STRIDE 开发接续
作品集 **某大模型公司战略人效核算台 / STRIDE**。**中文回复**。

**单一事实来源**：`docs/02-requirements/PRD-v1.3.md`（对齐 business-narrative；架构见 PRD 附录 A + `architecture-v2.1.md`）。

**UX 北极星**：https://warm-squirrel-e57666.netlify.app/ — 四 Tab（总览/成本/组织/薪酬绩效）+ 右侧 Chat-to-BI + 调薪沙盘。
**勿把** `mockups/stride-home-executive.html` 当首页（仅 `/executive` 经营摘要参考）。

**先读**：`docs/README.md` → `business-narrative.md` → `PRD-v1.3.md`（含附录 A）→ `architecture-v2.1.md` → **`ui-design-digital-v1.md`** → `allocation-default.json`、`metrics-dictionary.csv` → `.cursor/skills/minimax-strategic-workforce/SKILL.md`

**栈**：Next.js 14 + TS + SQLite；ECharts；MD+PDF；无 RBAC；默认 `?view=hrbp` 或路由 `/`。

**MVP 必做**：
- HR 工作台四 Tab + TCOW/Rev/FTE/Labor Cost%/编制达成
- `POST /api/copilot/ask`（规则+白名单指标，≥12 标准问法）
- `POST /api/forecast/scenario`（编制增量、主投权重调整）
- 向导1–3 + CalcEngine + W1–W5 + Demo 种子
- `/executive` 精简摘要（非营销 Hero）

**领域**：C1–C7、P1–P6、RF01–RF09、X10；双通道硬隔离。

**顺序**：①Next+schema ②HR KPI API ③四 Tab UI ④Copilot ⑤Forecast ⑥wizard/calculate ⑦executive/report ⑧demo seed
```

---

## 复制块（到这里结束复制）

---

| 字段 | 值 |
|------|-----|
| 更新日期 | 2026-05-16 |
| PRD | `docs/02-requirements/PRD-v1.3.md` |
| UX | Netlify HRBP 原型 |
