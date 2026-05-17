# STRIDE UI 设计规范 — 数字化亮色版 v1

> **状态**：`APPROVED`（视觉语言与组件规范）  
> **版本**：v1.0  
> **更新日期**：2026-05-16  
> **HTML 原型**：[mockups/stride-home-digital.html](../../mockups/stride-home-digital.html)  
> **关联 PRD**：[PRD-v1.3.md](../02-requirements/PRD-v1.3.md) · [architecture-v2.1.md](./architecture-v2.1.md)  
> **UX 北极星（IA）**：[Netlify HRBP 原型](https://warm-squirrel-e57666.netlify.app/)（四 Tab + Copilot）

---

## 1. 文档目的与适用范围

本文档固化用户已确认的 **Stripe 风格、亮色、数字化 SaaS** 视觉与组件规范，供 Next.js 14 实现时直接映射为 Design Tokens 与 UI 组件库。

| 适用范围 | 说明 |
|----------|------|
| **全局 Shell** | 顶栏、背景 mesh、字体、按钮、卡片、阴影、圆角 |
| **数据展示** | KPI 条、Bento 模块、预警列表、代码块、Dashboard 预览框 |
| **路由** | 各业务页（HR 四 Tab、`/strategic`、`/executive`、`/wizard` 等）**复用本规范**，布局按 PRD v1.2 IA 调整 |
| **不适用范围** | 深色 GolfSpace 商务风（见 §2.3）；营销式全屏 Hero 作为产品默认首页（见 §5） |

---

## 2. 设计定位

### 2.1 原则

| 原则 | 描述 |
|------|------|
| **数字化优先** | 界面像「可计算的基础设施 / 数据产品」，而非董事会会所或 HR 表格皮肤 |
| **亮色透气** | 浅灰底 `#f6f9fc`、白卡片、紫青渐变点缀；避免大面积深色 + 金绿 |
| **证据可审计** | 公式、API、来源口径在 UI 中可见（代码块、标签、脚注） |
| **角色可切换** | 顶栏 View Pills：`HRBP \| CPO \| Executive`（与 PRD 一致；原型曾用三按钮 Demo） |
| **中文主、英文辅** | 产品文案以中文为主；区块英文副标题仅用于节奏（如 “Signals that matter”），不替代功能名 |

### 2.2 与 Stripe 参考的关系

**视觉参考**：[Stripe 首页](https://stripe.com/)（mesh 渐变、大标题、产品预览、Bento、统计带、开发者区块、渐变 CTA）。

| Stripe 元素 | STRIDE 采纳 | STRIDE 改造 |
|-------------|-------------|-------------|
| 顶部浅色 sticky + 圆角 CTA | ✅ | 增加 View Pills、领域导航（总览/核算/能力/预警/API） |
| Hero 左文案 + 右产品图 | ✅ | 右侧为 **季度总览 Dashboard Mock**（KPI + 柱图 + 公式） |
| 渐变标题字 | ✅ | 文案改为「战略人效的**基础设施**」 |
| Logo / 信任条带 | ✅ | 改为领域标签：C1–C7、P1–P6、9 岗位族、X10、W1–W11 |
| 大数字统计带 | ✅ | 7 能力 / 9 岗位族 / 70% P6 分摊 / 15min Demo |
| Bento 产品卡片 | ✅ | 向导 1–3、CalcEngine、10x、C1–C7、报告 |
| 预警 / 信号区 | ✅ | W2、W4、W5 卡片（语义色） |
| 开发者 API + 代码块 | ✅ | CalcEngine / `POST /api/*` 示意 |
| 底部渐变 CTA | ✅ | Demo 走通 + 免责声明 |
| 支付/金融插画 | ❌ | 替换为核算图表与领域 Pill |

### 2.3 已探索但未采纳的方向

| 原型 | 路径 | 结论 |
|------|------|------|
| GolfSpace 深色商务 | [stride-home-executive.html](../../mockups/stride-home-executive.html) | 衬线 + 黑金绿、会所叙事；**不作为 MVP 视觉基线**，仅归档供对比 |

---

## 3. Design Tokens

以下 token 与 HTML 原型 `:root` **一一对应**，实现时建议写入 `globals.css` + `tailwind.config.ts`。

### 3.1 色彩

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg` | `#f6f9fc` | 页面背景 |
| `--bg-white` | `#ffffff` | 卡片、顶栏底 |
| `--text` | `#0a2540` | 主文字（Stripe 海军蓝） |
| `--text-secondary` | `#425466` | 正文说明 |
| `--text-muted` | `#697386` | 辅助、标签 |
| `--border` | `#e3e8ee` | 默认边框 |
| `--border-strong` | `#c4ccd8` | 强调分割、Logo 条文字 |
| `--accent` | `#635bff` | 主色（Stripe 紫） |
| `--accent-hover` | `#4f46e5` | 主色 hover |
| `--cyan` | `#00d4ff` | 渐变、图表高亮 |
| `--pink` | `#ff80b5` | 渐变、代码关键字 |
| `--orange` | `#ff7a59` | 预警、负向 |
| `--green` | `#00d924` | 正向、在线 dot |
| `--amber` | `#f5a623` | 预留（假设水印） |
| **正向 KPI** | `#0e6245` | `.mock-kpi .v.up` |
| **代码块背景** | `#0a2540` | API / 公式区 |
| **代码块顶栏** | `#061527` | macOS 风格 header |

**Mesh 背景**（`.page-bg`，固定层）：

```css
radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,91,255,0.18), transparent 50%),
radial-gradient(ellipse 60% 40% at 100% 0%, rgba(0,212,255,0.12), transparent 45%),
radial-gradient(ellipse 50% 30% at 0% 10%, rgba(255,128,181,0.1), transparent 40%),
#f6f9fc
```

**点阵**（`.grid-dots`）：`#c4ccd8` 1px 圆点，24×24px，`opacity: 0.4`，自上而下 `mask` 淡出。

**渐变标题**（`.gradient-text`）：

```css
linear-gradient(90deg, #635bff 0%, #7a73ff 35%, #00d4ff 70%, #ff80b5 100%)
```

**CTA 区块**（`.cta`）：

```css
linear-gradient(135deg, #0a2540 0%, #1a365d 40%, #635bff 100%)
/* + 内部 cyan / pink radial 光斑 */
```

### 3.2 字体

| Token | 栈 | 用途 |
|-------|-----|------|
| `--font` | `"Inter", system-ui, sans-serif` | 全局 UI |
| `--mono` | `"JetBrains Mono", monospace` | URL 栏、公式、API、`metric` 代码 |

| 层级 | 规格 | 场景 |
|------|------|------|
| H1 Hero | `clamp(2.25rem, 5vw, 3.5rem)` / 700 / `-0.03em` | 首屏标题 |
| H2 Section | `clamp(1.5rem, 3vw, 2rem)`～`2.25rem` / 700 | 区块标题 |
| H3 Card | `1.1rem` / 600 | Bento、预警标题 |
| Body | `1rem`～`1.125rem` / 400 | 段落 |
| Section label | `0.8rem` / 600 / uppercase / `letter-spacing: 0.06em` / `--accent` | 「核算引擎」「实时预警」 |
| Caption | `0.65rem`～`0.8rem` / `--text-muted` | KPI 标签、mock 标签 |

Google Fonts 加载：`Inter` 400/500/600/700 + `JetBrains Mono` 400/500。

### 3.3 间距与布局

| 项 | 值 |
|----|-----|
| 页面水平 padding | `clamp(1rem, 4vw, 2.5rem)` |
| Section 垂直 padding | `clamp(2rem, 5vw, 4rem)`～`clamp(3rem, 8vw, 5rem)`（Hero 更大） |
| 内容最大宽度 | Hero `1280px` · Bento `1200px` · Stats `1100px` |
| 顶栏高度 `--nav-h` | `64px` |
| 卡片内边距 | Bento `1.5rem` · Mock body `1.25rem` |
| 网格 gap | Bento `1rem` · Stats `2rem` · Hero grid `3rem` |

### 3.4 圆角与阴影

| Token | 值 |
|-------|-----|
| `--radius` | `12px` |
| `--radius-lg` | `16px` |
| Pill / 按钮 | `999px` |
| Mock URL | `6px` |
| Brand icon | `8px` |

| Token | CSS |
|-------|-----|
| `--shadow-sm` | `0 2px 5px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)` |
| `--shadow-md` | `0 13px 27px -5px rgba(50,50,93,.12), 0 8px 16px -8px rgba(0,0,0,.1)` |
| `--shadow-lg` | `0 30px 60px -12px rgba(50,50,93,.2), 0 18px 36px -18px rgba(0,0,0,.15)` |

### 3.5 动效

| 元素 | 规则 |
|------|------|
| Hero badge dot | `pulse` 2s，透明度 1 ↔ 0.4 |
| 按钮 hover | `translateY(-1px)` + 阴影升级 |
| Bento hover | `border-color` → `rgba(99,91,255,.25)`，`shadow-md` |
| Dashboard mock | `perspective(1200px) rotateY(-4deg) rotateX(2deg)`，hover 减至 `-2deg/1deg` |
| 顶栏滚动 | `scrollY > 8` 时显示底边框 |

---

## 4. 组件库规范

### 4.1 Header（`.header`）

| 属性 | 规格 |
|------|------|
| 行为 | `position: sticky; top: 0; z-index: 100` |
| 背景 | `rgba(246,249,252,0.85)` + `backdrop-filter: blur(12px)` |
| 结构 | Brand \| Nav（≥900px）\| View Pills + 次要按钮 + 主 CTA |

**Brand**：28×28 渐变图标（accent→cyan）+ 字标 `STRIDE` 700。

**Nav 链接**（原型锚点，实现时映射路由）：

| 文案 | 锚点 / 建议路由 |
|------|-----------------|
| 总览 | `#hero` → `/` 或 HR Tab1 |
| 核算引擎 | `#products` → `/strategic` |
| 战略能力 | `#capabilities` → `/strategic#capabilities` |
| 预警 | `#alerts` → `/strategic#alerts` |
| API | `#dev` → 文档或 Settings |

**View Pills**（≥768px 显示）：

- 容器：白底、1px border、`--shadow-sm`、内 padding 3px
- 激活态：背景 `--text`，字色白
- 未激活：`--text-muted`
- `data-view`: `hrbp` \| `cpo` \| `executive`（原型 Demo 同步改 badge 与 mock URL）

**按钮**：

| 类 | 样式 |
|----|------|
| `.btn-primary` | 背景 `--text`，白字，hover `#1a3a52` |
| `.btn-accent` | 背景 `--accent`，白字 |
| `.btn-ghost` | 透明，secondary 色 |

主 CTA 文案：**「开始核算 →」**；次要为「文档」。

### 4.2 Hero（`.hero`）

双栏（≥1024px：`1fr 1.1fr`）。

**左侧**：

1. **Hero Badge** — 紫底浅边框胶囊；绿点 pulse；文案示例：`2025 Q3 · Demo 已就绪 · Executive`
2. **H1** — 两行；第二行关键词用 `.gradient-text`
3. **Lead** — 最大宽度 32rem，secondary 色
4. **Actions** — Primary「加载 Demo 种子」+ Ghost「查看核算文档 →」
5. **Hero Stats** — 横排 3 项：主投能力 ROI、10x 杠杆、活跃预警

**右侧**：见 §4.3 Dashboard Mock。

### 4.3 Dashboard Mock（`.dashboard-mock`）

产品预览组件，用于首屏与作品集截图；实现后替换为 **真实 ECharts + KPI 数据**。

| 子块 | 规格 |
|------|------|
| Chrome | 交通灯三点 + mono URL 栏（示例：`stride.local/quarter/2025-Q3?view=executive`） |
| Toolbar | 标题「季度总览」+ Tag `CalcEngine v0.1` |
| KPI 行 | 3 列 grid；标签 0.65rem；数值 1.1rem/700；`.up` 绿、`.warn` 橙 |
| Chart | 高 120px；底部柱图 7 根；一根 `.highlight` 用 cyan 渐变 |
| Formula | 深色底 mono；关键字粉色、函数青色、数字琥珀 |

### 4.4 Logo Strip（`.logo-strip`）

白底横条；上为说明「双通道指标 · 披露与代理硬隔离」；下为领域标签行（非真实客户 Logo）。

### 4.5 Stats Band（`.stats-band`）

居中 H2 + 2×2（≥768px 为 4 列）大数字。

| 数字 | 说明 |
|------|------|
| 7 | 战略能力维度 |
| 9 | 岗位族 + RF09 10x |
| 70% | 经 P6 二次分摊 |
| 15min | Demo 全流程 |

数字样式：渐变字 `linear-gradient(135deg, --text, --accent)`。

### 4.6 Bento Grid（`.bento`）

| 断点 | 列 |
|------|-----|
| &lt;768px | 1 |
| ≥768px | 2 |
| ≥1024px | 3；`.wide` 跨 2 列 |

**卡片结构**：渐变图标底 40×40 → H3 → 正文 →（可选 mini-bars / pills）→ 链接「xxx →」accent 色。

| 卡片 | 图标色 | 要点 |
|------|--------|------|
| 向导 1–3 | 紫 `#ede9fe→#ddd6fe` | 含 mini-bars 装饰 |
| CalcEngine | 蓝 `#e0f2fe→#bae6fd` | ROI / 人效 / 降敏 |
| 10x Program | 粉 `#fce7f3→#fbcfe8` | 50% P6 + 50% PL |
| C1–C7 | 绿 `#d1fae5→#a7f3d0` | Pills：C2 hot、C6 红框 warn |
| 报告 | 橙 `#fff7ed→#fed7aa` | MD+PDF wide |

### 4.7 Alerts（`.alert-list`）

≥768px 三列；每项：色块图标（W2/W4/W5）+ 标题 + 说明。

| 类 | 图标底 | 语义 |
|----|--------|------|
| `.w2` | `#fff4e6` / orange 字 | 能力 ROI |
| `.w4` | `#fef3f2` / `#e25950` | 模型×产品 |
| `.w5` | `#f0f4ff` / accent | 负向杠杆 |

区块标题可用英文 **「Signals that matter」**；规则说明用中文。

### 4.8 Code Block（`.code-block`）

macOS 三圆点 + `#0a2540` 正文区；语法色：注释灰、关键字粉、字符串青、数字琥珀。用于 API 示意与 Copilot 技术感区域。

### 4.9 CTA（`.cta`）

全宽渐变卡片（margin 水平与页面一致）；白字；主按钮为 **白底深字** `.btn-primary`；文案强调 15 分钟 Demo + 免责一句。

### 4.10 Disclaimer Footer（`.disclaimer`）

居中 0.75rem `--text-muted`；必含：**基于公开信息推演，非官方 HR/财务数据**。

### 4.11 Prototype Tag（`.proto-tag`）

固定右下；仅静态原型期使用，**生产环境移除**。

---

## 5. 页面结构 · 与 PRD IA 对齐

### 5.1 HTML 原型区块顺序（`stride-home-digital.html`）

用于理解组件组合；**不等于** v1.2 默认路由。

| 顺序 | Section | `id` | 说明 |
|------|---------|------|------|
| 1 | Header | — | 全局 |
| 2 | Hero + Dashboard Mock | `#hero` | 营销式首屏 |
| 3 | Logo Strip | — | 领域标签 |
| 4 | Stats Band | — | 大数字 |
| 5 | Bento / 核算引擎 | `#products` | 能力 `#capabilities` 嵌套于 Bento 卡 |
| 6 | Alerts | `#alerts` | W2/W4/W5 |
| 7 | Dev / API | `#dev` | 代码 + 端点列表 |
| 8 | CTA | — | Demo 转化 |
| 9 | Disclaimer | — | 页脚 |

### 5.2 PRD v1.2 路由与本文档关系（实现必读）

| 路由 | 默认？ | 布局建议 |
|------|--------|----------|
| `/` HRBP 四 Tab | **是** | Netlify IA + **本规范 token/组件**；首屏为 TCOW 四 KPI + 走势图 + Copilot 侧栏，**非**原型全屏 Hero |
| `/strategic` | 否 | Bento + Alerts + Stats；ECharts 替换 mock 柱图 |
| `/executive` | 否 | 压缩版 KPI + 1 条决策 + 免责；**禁止**原型级营销 H1 |
| `/wizard/*` | 否 | 表单向导；沿用按钮、卡片、边框 |
| `/report` | 否 | 导出流；沿用 CTA 样式 |

**裁决（PRD C11）**：数字化亮色风 = **全站视觉**；`stride-home-digital.html` = **组件与气质参考**；默认首页内容以 [PRD-v1.3 §3](../02-requirements/PRD-v1.3.md) 为准。

---

## 6. 角色视图可见性

与 [PRD-v1.3 §3](../02-requirements/PRD-v1.3.md) 一致。View Pills 切换时 **隐藏/替换** 下列模块（非仅改文案）。

| 模块 | HRBP（默认） | CPO | Executive |
|------|--------------|-----|-----------|
| Hero 主 KPI | TCOW、编制、组织信号（实现期） | 能力 ROI、stage | 披露杠杆、主投能力摘要 |
| Dashboard Mock / 图表 | 成本/编制趋势、矩阵入口 | 产品线对标、W4 linkage | 能力 ROI 摘要、单条决策 |
| Bento · 向导/矩阵/沙盘 | 全显示 | 隐藏薪酬个案 | 隐藏岗位末位 |
| Bento · 10x | 协作义务入口 | 采纳矩阵 | 10x 杠杆系数（可选大卡） |
| Bento · 报告 | HRBP 详版默认 | — | Executive 一页摘要 |
| Alerts W2 | 可见 | 可见 | 可见（降敏说明） |
| Alerts W4/W5 | 可见 | **强化** | 摘要级 |
| Dev / API 区块 | 可折叠 | 可选 | 隐藏 |
| Stats Band 文案 | HR 口径 | 产品线口径 | 资本效率一句 |

**URL 约定**：`?view=hrbp|cpo|executive`，与 `ViewToggle` 双向绑定；切换时写回 `mock-url` 类路径（实现：`/quarter/[id]` query）。

---

## 7. 响应式断点

| 断点 | 行为 |
|------|------|
| **&lt;768px** | 隐藏 View Pills；Nav 隐藏；Hero 单栏；Stats 2 列；Bento 1 列；Alerts 1 列 |
| **≥768px** | View Pills 显示；Stats 4 列；Bento 2 列；Alerts 3 列 |
| **≥900px** | 顶栏 Nav 显示 |
| **≥1024px** | Hero 双栏；Bento 3 列 + wide 跨列 |

触摸目标：按钮最小高度 **40px**（含 padding）。

---

## 8. 文案规范

| 类型 | 语言 | 示例 |
|------|------|------|
| 导航、按钮、KPI 标签 | 中文 | 「开始核算」「加载 Demo 种子」 |
| 领域代号 | 英文数字 | C1–C7、P6、W4、RF09、X10 |
| 区块副标题 | 中英均可 | 「Signals that matter」+ 下方中文规则说明 |
| 免责声明 | 中文 | 公开信息推演、非官方 HR 数据、假设&gt;30% 水印 |
| 按钮语气 | 行动导向 | 句末箭头 `→` 用于次要链出 |

**避免**：会所/俱乐部隐喻（「第三张表」「会员」）；过度 CFO 资本叙事占 Hero（PRD v1.2 已降级）。

---

## 9. 无障碍（A11y）

| 项 | 要求 |
|----|------|
| 语义 | Header `nav`、预警 `article`、Dashboard `aside` + `aria-label` |
| View Pills | `role="group"` + `aria-label="视图"` |
| 对比度 | 正文 `#425466` on `#f6f9fc` ≥ 4.5:1；主按钮白 on `#0a2540` 达标 |
| 动效 | `prefers-reduced-motion: reduce` 时关闭 pulse / 3D tilt |
| 焦点 | Pills、按钮可见 focus ring（建议 `ring-2 ring-accent`） |
| 图表 | ECharts 需提供表格备选或 `aria-describedby` 摘要 |

---

## 10. Next.js 14 实现指引

### 10.1 技术栈映射

| 层 | 建议 |
|----|------|
| 样式 | Tailwind CSS 3 + CSS 变量（tokens 入 `app/globals.css`） |
| 组件 | `components/ui/*`（shadcn 可选，需覆盖圆角为 12/16px） |
| 字体 | `next/font`：Inter + JetBrains_Mono |
| 图表 | **ECharts**（`echarts-for-react`）；替换 mock 柱图为能力 ROI / TCOW 趋势 |
| 布局 | App Router；`app/(shell)/layout.tsx` 统一 Header + mesh 背景 |

### 10.2 Tailwind 扩展示例

```ts
// tailwind.config.ts — theme.extend
colors: {
  stride: {
    bg: '#f6f9fc',
    ink: '#0a2540',
    muted: '#697386',
    accent: '#635bff',
    border: '#e3e8ee',
  },
},
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
},
borderRadius: {
  stride: '12px',
  'stride-lg': '16px',
},
boxShadow: {
  'stride-sm': '0 2px 5px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)',
  'stride-md': '0 13px 27px -5px rgba(50,50,93,.12), 0 8px 16px -8px rgba(0,0,0,.1)',
  'stride-lg': '0 30px 60px -12px rgba(50,50,93,.2), 0 18px 36px -18px rgba(0,0,0,.15)',
},
```

### 10.3 组件文件建议

```text
components/
  layout/StrideHeader.tsx      # Header + ViewPills
  layout/PageMeshBackground.tsx
  marketing/HeroQuarter.tsx    # 仅 /executive 或 about 复用
  dashboard/KpiStrip.tsx
  dashboard/QuarterPreview.tsx # 替代 dashboard-mock
  strategic/BentoGrid.tsx
  strategic/AlertCards.tsx
  dev/ApiCodeSample.tsx
```

### 10.4 数据绑定（示意）

| UI 字段 | 来源 |
|---------|------|
| 主投能力 ROI | CalcEngine `capability_roi[C2]` |
| 10x 杠杆 | `adopted_count / total_10x_input` |
| 活跃预警 | `warnings.filter(active)` |
| Bento 卡片状态 | `quarter.wizard_progress` |
| 柱图 | `GET /api/quarter/:id/metrics` → ECharts option |

---

## 11. 范围外与 v1.2 Backlog

| 项 | 说明 |
|----|------|
| W6–W11 预警 UI | v1.2；样式沿用 Alert 卡片，增加 10x 专用色 |
| 10x Tab 完整页 | Handoff/采纳登记表；Bento 链出占位 |
| Chat-to-BI 侧栏 | Netlify 布局；气泡用白卡片 + accent 链接 |
| 深色主题 | 非 MVP |
| 真实登录 / RBAC | 无；View Pills 仅前端切换 |
| GolfSpace 深色主题 | 不实现 |

---

## 12. 验收清单（UI）

- [ ] 全站背景为亮色 mesh + 可选点阵，无大面积 `#0c0d0b`
- [ ] 主色 `#635bff`，无金色主 CTA
- [ ] 字体为 Inter + JetBrains Mono，无衬线标题
- [ ] 顶栏含 View Pills，默认 **HRBP**（PRD）
- [ ] 卡片圆角 12/16px，阴影使用 stride-sm/md/lg 三级
- [ ] 页脚含免责声明
- [ ] `/` 首屏符合 HR 四 Tab，非原型营销 Hero
- [ ] `/executive` 无全屏「基础设施」营销标题
- [ ] 图表区使用 ECharts，mock 柱图仅 Storybook 保留

---

## 13. 变更记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-05-16 | v1.0 | 基于 `stride-home-digital.html` 首次固化；用户确认亮色数字化方向 |

---

## 附录 A · 原型截图指引

本地打开 [stride-home-digital.html](../../mockups/stride-home-digital.html) → 浏览器全屏截图 → 存入 `docs/assets/ui-digital-v1/`（可选，仓库暂留空目录）。

## 附录 B · 与 Netlify 北极星分工

| 来源 | 负责 |
|------|------|
| Netlify HRBP 原型 | **信息架构**：四 Tab、Copilot 位置、TCOW KPI 优先级 |
| 本文档 + digital HTML | **视觉与组件**：色、字、卡、图表气质、API 区块 |

二者冲突时：**IA 听 PRD/Netlify；视觉听本文档**。
