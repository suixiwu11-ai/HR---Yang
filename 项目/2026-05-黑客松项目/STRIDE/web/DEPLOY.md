# STRIDE 部署指南（阿里云 ECS · 方案 B）

> 推荐：**云服务器 ECS**、**Ubuntu 22.04**、**2核4G**（或试用额度内最高配）、系统盘 **40G+**。  
> 仓库：https://github.com/suixiwu11-ai/HR---Yang

## 一、在阿里云控制台开通 ECS（约 5～10 分钟）

1. 打开 https://free.aliyun.com/ → 选 **云服务器 ECS** 试用（个人约 300 元额度 / 3 个月，以页面为准）
2. **地域**：华东 1（杭州）或华北 2 等内地节点
3. **镜像**：Ubuntu 22.04 64 位
4. **规格**：2 核 4 GiB 或以上（演示够用）
5. **系统盘**：40 GiB+
6. **网络**：分配 **公网 IP**（按流量或固定带宽均可）
7. **安全组**（重要，否则外网打不开）：

| 方向 | 端口 | 用途 |
|------|------|------|
| 入方向 | 22 | SSH 登录 |
| 入方向 | 80 | 网站（Nginx） |
| 入方向 | 443 | HTTPS（可选） |
| 入方向 | 3000 | 未配 Nginx 时直连 Next |

8. 创建后记下：**公网 IP**、**登录密码**（或 SSH 密钥对）

> 轻量应用服务器（方案 A）步骤类似，仅「防火墙」改名为「安全组」，本脚本同样适用。

## 二、SSH 登录后一键部署

```bash
# 登录示例（把 IP 换成你的）
# ssh root@你的公网IP

apt update && apt install -y git curl

git clone https://github.com/suixiwu11-ai/HR---Yang.git
cd HR---Yang/项目/2026-05-黑客松项目/STRIDE/web

chmod +x scripts/deploy/bootstrap.sh
sudo bash scripts/deploy/bootstrap.sh
```

脚本会自动：

- 安装 Node.js 20
- `npm install` + `npm run build`
- **PM2** 常驻运行
- **Nginx** 反代 80 → 3000
- 尝试写入演示数据（2025Q3）

访问：**http://你的公网IP**

## 三、运维

```bash
cd HR---Yang/项目/2026-05-黑客松项目/STRIDE/web
pm2 status
pm2 logs stride
pm2 restart stride
```

- 数据库文件：`data/stride.db`（务必备份 `data/` 目录）
- 更新代码：`git pull` → `npm install` → `npm run build` → `pm2 restart stride`

## 四、Docker 方式（可选）

```bash
cd HR---Yang/项目/2026-05-黑客松项目/STRIDE/web
docker compose up -d --build
```

需先安装 Docker；数据卷 `stride-data` 持久化 SQLite。

## 五、HTTPS + 域名（可选）

备案通过后：

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your.domain.com
```

试用实例可能**不支持备案**，答辩可先用 **IP 访问**。

## 六、常见问题

| 现象 | 处理 |
|------|------|
| 浏览器打不开 | 检查安全组是否放行 80；`pm2 status` 是否在跑 |
| 只能 SSH 不能访问网页 | 安全组缺 80/3000 |
| 构建失败 | `apt install -y python3 make g++` 后重试 `npm install` |
| 导入 CSV 失败 | 检查 `client_max_body_size`（脚本已设 20m） |

---

**方案 A（轻量）**：若已买轻量，本指南除「安全组」在控制台叫「防火墙规则」外，命令完全相同。
