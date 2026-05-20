# STRIDE · Turso 云端数据库（Netlify 持久化）

Netlify 函数里 SQLite 只能写在 `/tmp`，**冷启动后数据会丢**。  
用 **Turso**（libSQL 托管 SQLite）后，访客的操作会保存在云端。

---

## 你需要准备

- [ ] Turso 账号（免费档即可）
- [ ] 本机安装 [Turso CLI](https://docs.turso.tech/cli/installation)（可选，用网页也行）
- [ ] Netlify 站点已能成功 `npm run build` 部署

---

## 第一步：创建 Turso 数据库

1. 打开 https://turso.tech 注册 / 登录  
2. 安装 CLI 后登录：

```bash
turso auth login
```

3. 创建数据库（名字自定，例如 `stride-demo`）：

```bash
turso db create stride-demo
```

4. 查看连接地址：

```bash
turso db show stride-demo --url
```

记下输出的 URL，形如 `libsql://stride-demo-xxx.turso.io`

5. 创建访问令牌：

```bash
turso db tokens create stride-demo
```

记下输出的 **token**（只显示一次，勿提交 Git）

---

## 第二步：本地 `.env.local`

在 `STRIDE/web/` 目录复制 `.env.example` 为 `.env.local`，增加：

```env
TURSO_DATABASE_URL=libsql://你的库名-xxx.turso.io
TURSO_AUTH_TOKEN=你的_token
```

保存后可在本地验证（仍保留无 Turso 时用 `data/stride.db` 的能力；**两个变量都填则走 Turso**）。

可选：只初始化表结构（不灌演示数据）：

```bash
npm run db:seed
```

本地起服务后点「加载演示数据」，或：

```bash
npm run dev
# 另开终端
curl -X POST http://localhost:3000/api/demo/seed -H "Content-Type: application/json" -d "{}"
```

---

## 第三步：Netlify 环境变量

Netlify → **Site configuration** → **Environment variables**，新增：

| 变量名 | 值 |
|--------|-----|
| `TURSO_DATABASE_URL` | 上一步的 libsql URL |
| `TURSO_AUTH_TOKEN` | 上一步的 token |

也可在 `env.netlify` 里写好占位后 **Import from .env**（见 `env.netlify.example`）。

**不要**把真实 token 提交到 GitHub。

保存后：**Clear cache and deploy site**。

### 可选：加快 Netlify 构建

已配置 Turso 时，可在 Build command 改为（跳过编译本地 native 模块）：

```bash
npm ci --omit=optional && npm run build
```

未配 Turso 时仍用默认 `npm ci && npm run build`。

---

## 第四步：首次上线灌数

部署成功后任选一种：

1. 打开站点 → **数据** → **加载演示数据** → 工作台 **重新核算**  
2. 命令行：

```bash
curl -X POST https://你的站点.netlify.app/api/demo/seed -H "Content-Type: application/json" -d "{}"
```

之后导入 / 导出 / 核算 / Copilot 读快照都会写入 Turso，**跨访问、跨冷启动保留**。

### 长期 demo 建议

- **线上持久化**：生产环境务必配置 `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`（勿提交 Git）。
- **JSON 备份**：设置页 →「导出当前季度（JSON）」可下载完整季度包；换环境或清库后用「导入 CSV / JSON」恢复。
- **首次上线**：部署后点「加载演示数据」或 `POST /api/demo/seed`，再在工作台「重新核算」。

---

## 免费档够不够？

黑客松演示 **通常够用**：

- 多库、GB 级存储、每月大量读写的免费额度（以 Turso 官网当前政策为准）
- 本应用表少、单行 JSON 快照为主，访客量有限时很难触顶

注意：

- 每次 API 请求走 HTTPS 到 Turso，比本地文件略慢（一般可感知在百毫秒级）
- 极高并发或大批量导入可能触及免费请求上限
- `resetDb()` 仅本地 SQLite；清 Turso 数据请在 Turso 控制台删库或删表

---

## 故障排查

| 现象 | 处理 |
|------|------|
| 部署后仍像没数据 | 是否已点「加载演示数据」；环境变量是否拼错 |
| Build 报 better-sqlite3 | 使用 `npm ci --omit=optional` 并确认已配 Turso 变量 |
| 401 / auth 失败 | 重新 `turso db tokens create`，更新 Netlify 变量后重部署 |
| 本地想用文件库 | 删掉 `.env.local` 里 Turso 两行，用 `data/stride.db` |

---

## 相关文件

- 数据库逻辑：`src/lib/db.ts`
- 表结构：`src/lib/db-schema.ts`
- Netlify 总览：`DEPLOY-NETLIFY.md`
