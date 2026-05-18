# STRIDE Web 多角色评审记录

## 自动化测试

| 脚本 | 命令 | 角色 |
|------|------|------|
| API 冒烟 | `npm run test:api` | 测试 / 架构 |
| HRBP 路径 | `npm run test:hrbp` | 业务代表 |

## 架构师（Agent 评审）— 已处理

- [x] 导入保留 `quarters` 元数据 + 事务 — `import-export.ts`
- [x] `foreign_keys = ON` — `db.ts`
- [x] Handoff ID 按季度前缀 — `seed.ts`（避免多季度 UNIQUE 冲突）

## 产品经理（Agent 评审）— 已处理

- [x] 工作台四 Tab + Copilot 侧栏 — `WorkbenchView.tsx`
- [x] 顶栏：向导 / 情景 / 经营摘要 / 10× / 数据
- [x] HRBP / CPO / 经营层 视图切换 — `ViewModeContext.tsx`
- [ ] 独立 `/cost` `/org` 路由（当前为单页 Tab，演示足够）

## HRBP 15 分钟路径

1. 打开 `/` → 四 KPI
2. Copilot 问 TCOW / 人力成本率
3. 组织 Tab → W8 预警
4. `/scenario` 情景
5. `/settings` 导出 MD/HTML
6. `/x10` Handoff 台账

## 已知限制（初版）

- 图表为 CSS 示意条，非真实时序库
- 无登录与权限
- 向导为步骤导航，FTE 矩阵在「数据」页与 JSON 维护
