# 🤖 HR×AI 公益黑客松 — AI人效产品

> 用 AI 重新定义组织人效：不以岗位为标的，通过任务包/任务域识别高价值任务。

---

## 我们是谁

5 人团队参加 **HR AI 公益黑客松**，探索人力资源与人工智能的交叉创新。

| 姓名 | 角色 | 一句话 |
|------|------|--------|
| 吴隋栖（Yang） | 产品设计负责人 | HIS行业，SAP产品实施背景，开始学习开发 |
| Frank Li（Frank） | 项目管理负责人 | 甲方in-house HR，探索AI原生组织转型 |
| 杨嘉（嘉尔） | 产品设计协助 / 业务组 | 广告行业人效管理经验，准备进入储能制造行业 |
| 李宗达（Michael） | 业务组 | 本科在读，有咨询、VC、字节芯片招聘等实习经历 |
| 宋诗瑶 | 项目管理协助 / 业务组 | 游戏行业HR背景，研究AI工具在HR中的应用 |

## 项目简介

- **主题**: AI人效产品——不以岗位为标的，通过任务包/任务域重新定义组织，聚焦高价值任务识别
- **阶段**: 方向确定，业务场景细化中；**STRIDE 原型文档与代码已入库**（见下）
- **开发周期**: 2026-05-16 正式开启 → 2026-05-23 原型展示

## 产品交付 · STRIDE（结构化文档 + 原型）

**某大模型公司战略人效核算台**（公开信息推演 Demo）— HRBP 人力洞察工作台 + Chat-to-BI + 情景预测。

| 入口 | 路径 |
|------|------|
| **交付物清单（按阶段）** | [`项目/2026-05-黑客松项目/DELIVERABLES.md`](项目/2026-05-黑客松项目/DELIVERABLES.md) |
| **黑客松 5 分钟读文档** | [`项目/2026-05-黑客松项目/STRIDE/docs/HACKATHON.md`](项目/2026-05-黑客松项目/STRIDE/docs/HACKATHON.md) |
| **STRIDE 仓库说明** | [`项目/2026-05-黑客松项目/STRIDE/README.md`](项目/2026-05-黑客松项目/STRIDE/README.md) |
| **HTML 导读（业务+PRD+原型）** | 本地 [`mockups/index.html`](项目/2026-05-黑客松项目/STRIDE/mockups/index.html) · 在线 `https://frankli9986.github.io/HR-hackathon-2026-05/` · [Pages 开启说明](docs/GITHUB-PAGES-开启说明.md) |
| **UX 北极星** | [Netlify HRBP 原型](https://warm-squirrel-e57666.netlify.app/) |

```bash
cd "项目/2026-05-黑客松项目/STRIDE/web"
npm install && npm run dev
```

## 快速链接

| 链接 | 说明 |
|------|------|
| [活动规则](https://hk77iwx9jc.feishu.cn/docx/FmGpd2tvEoVe51x5m2CcyoM6nsh) | 主办方飞书文档 |
| [报名表](https://my.feishu.cn/share/base/form/shrcnaa900m2QFAPazD8VBloVjf) | 每人都要填写，5/16 截止 |
| [黑客松项目总览](项目/2026-05-黑客松项目/README.md) | 场景、分工、时间线 |

## 时间线

```
5/9     开放报名，搭建协作工作区
5/12    首次团队会议：确定方向、分工、时间线
5/15    19:00 线上启动会
5/16    报名截止 → 开发正式开始
5/16-5/22  产品设计 + 技术框架确定 + Coding
5/23    线上线下coding环节 + 产品原型展示（最终截止）
```

## 协作方式

本团队采用 **AI 原生协作模式**：所有知识沉淀在 Markdown 文件中，Git 历史即团队记忆。

- 📋 任务看板 → `上下文/待办.md`
- 📝 决策记录 → `上下文/决策.md`
- 🧠 AI 记忆 → `上下文/会话日志.md`
- 👥 团队信息 → `团队/成员与分工.md`

> 如果你是团队成员，请阅读 [`AGENTS.md`](AGENTS.md) 了解完整协作指南。

## 仓库结构（摘要）

```text
├── README.md                          # 本文件（团队入口）
├── 上下文/ 团队/ 共享知识/              # 团队协作
├── 项目/2026-05-黑客松项目/
│   ├── README.md                      # 赛题与场景
│   └── STRIDE/                        # 产品：文档 + mockups + web
│       ├── docs/                      # PRD、HACKATHON.md、架构…
│       ├── mockups/
│       └── web/
```

---

*本仓库为团队协作使用。STRIDE 指标均为公开信息推演，非任何公司官方 HR/财务数据。*
