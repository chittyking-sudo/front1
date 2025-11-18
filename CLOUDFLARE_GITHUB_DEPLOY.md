# Cloudflare Pages 通过 GitHub 部署指南

## 📋 部署概述

由于 Wrangler CLI 创建项目遇到 API 限制，我们采用 **GitHub + Cloudflare Dashboard** 集成方式部署。

**优势：**
- ✅ 最稳定可靠的部署方式
- ✅ 自动 CI/CD，推送即部署
- ✅ 无需本地 API Token
- ✅ Cloudflare 官方推荐方法

---

## 🚀 完整部署步骤

### 步骤 1: 代码已推送到 GitHub ✅

**仓库地址**: https://github.com/chittyking-sudo/front1

代码已成功推送到 GitHub，包含：
- ✅ 完整的 Hono 应用代码
- ✅ D1 数据库迁移文件
- ✅ Vite 构建配置
- ✅ wrangler.jsonc 配置文件

---

### 步骤 2: 登录 Cloudflare Dashboard

1. 访问: https://dash.cloudflare.com
2. 使用您的账号登录（chittyking@126.com）
3. 确保您在正确的账户下（Chittyking@126.com's Account）

---

### 步骤 3: 创建 Cloudflare Pages 项目

#### 3.1 进入 Pages 面板

1. 在左侧菜单中，点击 **"Workers & Pages"**
2. 点击右上角的 **"Create application"** 按钮
3. 选择 **"Pages"** 标签页
4. 点击 **"Connect to Git"**

#### 3.2 连接 GitHub

1. 选择 **"GitHub"** 作为 Git 提供商
2. 首次使用会提示授权：
   - 点击 **"Connect GitHub"**
   - 在弹出窗口中登录 GitHub
   - 授权 Cloudflare Pages 访问您的仓库
3. 授权完成后会返回 Cloudflare Dashboard

#### 3.3 选择仓库

1. 在仓库列表中找到 **"chittyking-sudo/front1"**
   - 如果没有看到，点击 **"Add account"** 添加 GitHub 账户
   - 或点击 **"Configure GitHub integration"** 调整权限
2. 点击仓库旁边的 **"Begin setup"** 按钮

#### 3.4 配置构建设置

填写以下信息：

**项目名称 (Project name):**
```
webapp
```

**生产分支 (Production branch):**
```
main
```

**构建设置 (Build settings):**

- **Framework preset**: `None` (或选择 `Hono`)
- **Build command**:
  ```
  npm run build
  ```
- **Build output directory**:
  ```
  dist
  ```

**环境变量 (Environment variables)** - 暂时留空，稍后配置

#### 3.5 保存并部署

1. 点击页面底部的 **"Save and Deploy"** 按钮
2. Cloudflare 会开始首次构建部署：
   - ⏳ 克隆仓库
   - ⏳ 安装依赖（npm install）
   - ⏳ 运行构建（npm run build）
   - ⏳ 部署到全球 CDN
3. 等待 2-5 分钟，首次部署完成

**部署成功后，您会看到：**
- ✅ 生产环境 URL: `https://webapp.pages.dev`
- ✅ 预览环境 URL: `https://main.webapp.pages.dev`

---

### 步骤 4: 创建 D1 数据库

#### 4.1 在 Dashboard 创建数据库

1. 在左侧菜单中，点击 **"Workers & Pages"**
2. 点击 **"D1"** 标签页
3. 点击 **"Create database"** 按钮
4. 输入数据库名称：
   ```
   webapp-production
   ```
5. 点击 **"Create"** 按钮

#### 4.2 获取数据库 ID

创建成功后，您会看到：
```
Database ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**复制这个 Database ID**，稍后需要更新到代码中。

#### 4.3 应用数据库迁移

**方式 1: 使用 Wrangler CLI（推荐）**

在本地终端执行：
```bash
# 设置 API Token
export CLOUDFLARE_API_TOKEN=SQUgmv2fOUcW75q4sDIv3azjoO7NWce-2kmNfWGT

# 应用迁移到生产数据库
npx wrangler d1 migrations apply webapp-production

# 查看数据库内容（可选）
npx wrangler d1 execute webapp-production --command="SELECT * FROM tags LIMIT 5"
```

**方式 2: 使用 Dashboard 控制台**

1. 在 D1 数据库页面，点击刚创建的 `webapp-production`
2. 点击 **"Console"** 标签页
3. 复制 `migrations/0001_initial_schema.sql` 的内容
4. 粘贴到控制台，点击 **"Execute"**
5. 执行成功后，表结构已创建

**初始化数据（可选）:**

如果需要示例数据，执行 `seed.sql`:
```bash
npx wrangler d1 execute webapp-production --file=./seed.sql
```

---

### 步骤 5: 绑定 D1 数据库到 Pages 项目

#### 5.1 进入项目设置

1. 返回 **"Workers & Pages"**
2. 点击您的项目 **"webapp"**
3. 点击 **"Settings"** 标签页

#### 5.2 添加 D1 绑定

1. 在左侧菜单中，找到 **"Functions"** 部分
2. 点击 **"D1 database bindings"**
3. 点击 **"Add binding"** 按钮
4. 填写：
   - **Variable name**: `DB`（必须与代码中一致）
   - **D1 database**: 选择 `webapp-production`
5. 点击 **"Save"** 按钮

#### 5.3 触发重新部署

绑定完成后，需要重新部署：

1. 点击 **"Deployments"** 标签页
2. 点击最新部署旁的 **"Retry deployment"** 按钮
3. 或者推送新的 commit 到 GitHub 触发自动部署

---

### 步骤 6: 更新代码中的 Database ID

#### 6.1 更新 wrangler.jsonc

将步骤 4.2 中复制的 Database ID 填入：

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "webapp",
  "compatibility_date": "2025-11-15",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "webapp-production",
      "database_id": "在这里填入您的 Database ID"
    }
  ]
}
```

#### 6.2 提交并推送

```bash
cd /home/user/webapp
git add wrangler.jsonc
git commit -m "config: Add production D1 database ID"
git push origin main
```

推送后，Cloudflare Pages 会自动触发新的部署。

---

### 步骤 7: 验证部署

#### 7.1 访问应用

打开浏览器，访问：
```
https://webapp.pages.dev
```

或者使用分支预览：
```
https://main.webapp.pages.dev
```

#### 7.2 测试功能

1. **倒计时着陆页**: 访问首页，检查倒计时是否正常
2. **探索页面**: 访问 `/explore`，应该看到 12 个工作室
3. **工作室详情**: 点击任意工作室，查看详情页
4. **API 测试**: 访问 `/api/studios`，检查 JSON 响应

#### 7.3 检查 D1 数据库

如果页面显示 "No studios found" 或数据库错误：

1. 确认 D1 绑定已正确配置（步骤 5）
2. 确认迁移已成功应用（步骤 4.3）
3. 查看 Pages 部署日志：
   - 在 Dashboard 中点击 **"Deployments"** → 最新部署 → **"View details"**
   - 检查 **"Functions logs"** 是否有错误

---

## 🔄 后续更新部署

### 自动部署（推荐）

每次推送到 GitHub 的 `main` 分支，Cloudflare Pages 会自动：
1. 检测到新的 commit
2. 运行 `npm run build`
3. 部署新版本到生产环境

**工作流程：**
```bash
# 本地开发
cd /home/user/webapp
# ... 修改代码 ...

# 提交更改
git add .
git commit -m "feat: 添加新功能"
git push origin main

# 等待 2-3 分钟，自动部署完成
```

### 预览分支部署

创建功能分支进行测试：
```bash
git checkout -b feature/new-feature
# ... 开发新功能 ...
git push origin feature/new-feature
```

Cloudflare Pages 会为这个分支创建独立的预览环境：
```
https://feature-new-feature.webapp.pages.dev
```

---

## 🎯 自定义域名（可选）

### 添加自定义域名

1. 在 Pages 项目中，点击 **"Custom domains"** 标签页
2. 点击 **"Set up a custom domain"**
3. 输入您的域名，例如：`www.studionetwork.com`
4. 按照提示添加 CNAME 记录到您的 DNS
5. 等待 DNS 生效（通常 5-10 分钟）

**DNS 配置示例：**
```
Type: CNAME
Name: www
Value: webapp.pages.dev
Proxy: Yes (橙色云朵)
```

---

## 🐛 常见问题

### 1. 构建失败 "npm ERR! code ELIFECYCLE"

**原因**: 构建脚本错误

**解决方案**:
- 检查 `package.json` 中的 `build` 脚本
- 确保 `vite.config.ts` 配置正确
- 查看 Dashboard 中的构建日志

### 2. 部署成功但页面空白

**原因**: 输出目录配置错误

**解决方案**:
- 确认 `pages_build_output_dir` 设置为 `./dist`
- 确认 `vite build` 输出到 `dist` 目录
- 检查 `dist` 目录中是否有 `_worker.js` 文件

### 3. API 返回 500 错误

**原因**: D1 数据库未绑定或迁移未应用

**解决方案**:
- 检查 D1 绑定配置（步骤 5）
- 重新应用数据库迁移（步骤 4.3）
- 查看 Functions logs 确认具体错误

### 4. 探索页面显示 "No studios found"

**原因**: 数据库初始化失败

**解决方案**:
```bash
# 重新初始化数据库
export CLOUDFLARE_API_TOKEN=your-api-token
npx wrangler d1 execute webapp-production --command="DELETE FROM studios; DELETE FROM tags; DELETE FROM images;"
npx wrangler d1 migrations apply webapp-production --remote
npx wrangler d1 execute webapp-production --file=./seed.sql --remote
```

### 5. GitHub 连接失败

**原因**: 授权权限不足

**解决方案**:
- 访问 GitHub Settings → Applications → Cloudflare Pages
- 确认授权了正确的仓库访问权限
- 在 Cloudflare Dashboard 中重新配置 GitHub 集成

---

## 📊 部署状态监控

### 查看部署历史

1. 进入项目 **"Deployments"** 标签页
2. 查看所有部署记录
3. 点击任意部署查看详细日志

### 查看实时日志

1. 进入项目 **"Functions"** 标签页
2. 点击 **"Real-time Logs"**
3. 实时查看应用运行日志

### 分析性能

1. 进入项目 **"Analytics"** 标签页
2. 查看：
   - 请求数量
   - 带宽使用
   - 错误率
   - 响应时间

---

## 🎉 部署完成检查清单

完成以下所有步骤，确保部署成功：

- [ ] GitHub 仓库已创建并推送代码
- [ ] Cloudflare Pages 项目已创建
- [ ] GitHub 与 Cloudflare Pages 已连接
- [ ] 首次部署已成功完成
- [ ] D1 数据库已创建（webapp-production）
- [ ] 数据库迁移已应用
- [ ] D1 绑定已配置（变量名: DB）
- [ ] wrangler.jsonc 中的 database_id 已更新
- [ ] 重新部署后应用正常运行
- [ ] 倒计时着陆页正常显示
- [ ] 探索页面显示 12 个工作室
- [ ] 工作室详情页正常加载
- [ ] API 端点正常响应

---

## 📞 获取帮助

- **Cloudflare 文档**: https://developers.cloudflare.com/pages
- **Hono 文档**: https://hono.dev
- **GitHub Issues**: https://github.com/chittyking-sudo/front1/issues

---

**祝您部署顺利！** 🚀

如有任何问题，请随时联系。
