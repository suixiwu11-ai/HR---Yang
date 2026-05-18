# STRIDE Web 初版交付计划

## 阶段与验收

| 阶段 | 交付物 | 验收标准 | 自测 |
|------|--------|----------|------|
| P0 | 核算口径修复 | TCOW≈2.84亿；人力成本率≈38%；Rev/FTE≈186万 | `npm run test:api` |
| P1 | 视觉对齐原型 | 复用 stride-app.css；顶栏四 Tab + 视图切换 | 目视对比 workbench.html |
| P2 | 工作台四 Tab | 总览/成本/组织/薪酬×绩效 + Copilot 侧栏 | HRBP 走查脚本 |
| P3 | 子路由页 | wizard / scenario / executive / x10 / settings | 路由可访问 |
| P4 | 自动化测试 | scripts/test-api.mjs + scripts/test-hrbp.mjs | CI 全绿 |
| P5 | 多角色评审修复 | 架构/PM/HRBP 问题清单 closure | Review 文档 |

## 评审角色（Agent / 脚本模拟）

- **架构师**：API 边界、SQLite 单写、快照不可变
- **产品经理**：PRD §3.1 四 Tab、15 分钟演示路径
- **HRBP**：季中监控 → 问数 → 预警 → 导出报告
