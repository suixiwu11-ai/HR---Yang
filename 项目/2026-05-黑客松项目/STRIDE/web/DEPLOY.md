# STRIDE 部署指南（阿里云轻量应用服务器 · 方案 A）

> 推荐：**轻量应用服务器** 2核2G+、**Ubuntu 22.04**、地域选华东/华北。  
> 仓库：https://github.com/suixiwu11-ai/HR---Yang

## 一、在阿里云控制台（约 5 分钟）

1. 打开 https://free.aliyun.com/ → 选 **轻量应用服务器** 试用  
2. **镜像**：Ubuntu 22.04  
3. **地域**：华东 1（杭州）或华北（离观众近即可）  
4. 创建后记下：**公网 IP**、**root 密码**（或 SSH 密钥）  
5. **防火墙 / 安全组**：放行 **22、80、443**（若只用 IP:3000 可先放行 **3000**）

## 二、SSH 登录服务器后一键安装

```bash
# 1. 安装 git（若无）
apt update && apt install -y git curl

# 2. 克隆仓库（路径按实际；若仓库私有需先配置 token）
git clone https://github.com/suixiwu11-ai/HR---Yang.git
cd HR---Yang/项目/2026-05-黑客松项目/STRIDE/web

# 3. 一键部署（安装 Node 20、构建、PM2 常驻、可选 Nginx）
chmod +x scripts/deploy/bootstrap.sh
sudo bash scripts/deploy/bootstrap.sh
```

脚本结束后访问：

- **http://你的公网IP**（若已配 Nginx）
- 或 **http://你的公网IP:3000**

首次打开请进 **数据** → **加载演示数据**。

## 三、常用运维命令

```bash
cd HR---Yang/项目/2026-05-黑客松项目/STRIDE/web
pm2 status          # 查看进程
pm2 logs stride     # 日志
pm2 restart stride  # 重启
```

数据文件：`data/stride.db`（备份请复制整个 `data/` 目录）

## 四、更新版本

```bash
cd HR---Yang
git pull
cd 项目/2026-05-黑客松项目/STRIDE/web
npm install
npm run build
pm2 restart stride
```

## 五、HTTPS（可选）

有域名后：`apt install certbot python3-certbot-nginx` + `certbot --nginx -d 你的域名`

---

**方案 B（ECS）**：步骤相同，仅控制台换成 ECS，安全组放行 22/80/443。
