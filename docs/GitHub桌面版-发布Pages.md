# GitHub 桌面版 · 免费发布 STRIDE 文档站

> 仓库：`suixiwu11-ai/HR-hackathon-2026-05`  
> 目标地址：https://suixiwu11-ai.github.io/HR-hackathon-2026-05/

---

## 你截图里那页在说什么？

| 页面上的字 | 含义 | 要不要做 |
|------------|------|----------|
| **Upgrade or make this repository public** | 当前是**私有 fork**，免费账号不能开 Pages | ✅ 改 **Public**，不要付费升级 |
| **Start free for 30 days**（GitHub Enterprise） | 私有仓库也能开 Pages 的**付费方案试用** | ❌ **不要点**（黑客松演示用公开库即可） |
| **This repository is a fork… Contact the owner of the root repository** | fork 有时要等上游或你先公开后才出现配置项 | 先公开，再回到本页 |

**结论：不用付费。** 把仓库改成 **Public（公开）** 即可。

---

## 第 1 步：GitHub 桌面版 · 推送代码

1. 打开 **GitHub Desktop** → 仓库 **HR-hackathon-2026-05**
2. 若有 **Push origin** → 点击推送（本地应有 `docs/` 与 Pages 说明）

---

## 第 2 步：改成公开仓库（在「General」，不是 Pages 页）

1. 打开：https://github.com/suixiwu11-ai/HR-hackathon-2026-05/settings  
2. 滚到最下 **Danger Zone**  
3. **Change repository visibility** → 选 **Make public**  
4. 输入仓库名确认  

> 桌面版改不了公开/私有，必须用浏览器这一步。

---

## 第 3 步：再打开 Pages 配置

1. 打开：https://github.com/suixiwu11-ai/HR-hackathon-2026-05/settings/pages  
2. 此时应出现 **Build and deployment**（不再是整页「Upgrade」）  
3. 设置：  
   - **Source**：**Deploy from a branch**  
   - **Branch**：`main`  
   - **Folder**：**`/docs`**  
4. **Save** → 等 1～3 分钟 → **Visit site**

仍只有「Upgrade」、没有分支选项时：

- 让 Frank 在**主仓** https://github.com/Frankli9986/HR-hackathon-2026-05/settings/pages 也开一次 Pages（`main` + `/docs`），然后再刷新你的 fork；或  
- 用下面 **备选：Netlify**（不依赖 fork / Pages）。

---

## 备选：Netlify（2 分钟，仍免费）

1. 打开 https://app.netlify.com/drop  
2. 把文件夹拖进去：  
   `Desktop\hks\项目\2026-05-黑客松项目\STRIDE\mockups`  
3. 得到 `https://xxxx.netlify.app` 链接，发给评委即可  

---

## 自检

- [ ] 仓库标签为 **Public**  
- [ ] Pages 页有绿色 **Your site is live at …**  
- [ ] 能打开首页 / `business-narrative.html` / `prd.html`
