# Studio Network - Cloudflare Pages 部署指南

## 🚀 快速部署

### 前提条件

1. ✅ 已在 Deploy 标签页设置 Cloudflare API Key
2. ✅ 拥有 Cloudflare 账号

### 部署步骤

#### 步骤 1: 设置 Cloudflare API Key

在 Deploy 标签页配置 API Key 后，在终端执行：

```bash
cd /home/user/webapp
setup_cloudflare_api_key
```

#### 步骤 2: 创建生产数据库

```bash
cd /home/user/webapp
npx wrangler d1 create studio-network-production
```

**重要：** 复制返回的 `database_id`，更新到 `wrangler.jsonc` 文件的 `database_id` 字段。

#### 步骤 3: 更新 wrangler.jsonc

将步骤2获取的 database_id 填入：

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "studio-network-production",
      "database_id": "粘贴您的database_id"
    }
  ]
}
```

#### 步骤 4: 应用数据库迁移

```bash
cd /home/user/webapp
npx wrangler d1 migrations apply studio-network-production
```

#### 步骤 5: 构建项目

```bash
cd /home/user/webapp
npm run build
```

#### 步骤 6: 创建 Cloudflare Pages 项目

```bash
cd /home/user/webapp
npx wrangler pages project create studio-network \
  --production-branch main \
  --compatibility-date 2025-11-15
```

#### 步骤 7: 部署到生产环境

```bash
cd /home/user/webapp
npx wrangler pages deploy dist --project-name studio-network
```

部署成功后，您会收到类似以下的 URL：
- **生产环境**: `https://studio-network.pages.dev`
- **预览环境**: `https://main.studio-network.pages.dev`

#### 步骤 8: 绑定 D1 数据库到 Pages 项目

```bash
cd /home/user/webapp
npx wrangler pages deployment tail studio-network
```

或在 Cloudflare Dashboard 中手动绑定：
1. 进入 Pages 项目设置
2. 找到 Functions > D1 数据库绑定
3. 添加绑定：名称 `DB`，选择您创建的数据库

### 验证部署

访问您的部署 URL：
```bash
curl https://studio-network.pages.dev
```

或直接在浏览器中打开查看。

---

## 🔧 常见问题

### 问题 1: Database ID 错误

如果遇到 "Couldn't find a D1 DB" 错误，请确保：
1. `wrangler.jsonc` 中的 `database_id` 已正确填写
2. 数据库已在 Cloudflare 中成功创建

### 问题 2: 认证失败

如果遇到认证错误，请：
1. 重新运行 `setup_cloudflare_api_key`
2. 确认 API Token 有正确的权限

### 问题 3: 构建失败

如果构建失败，请：
1. 检查 `package.json` 中的依赖是否完整
2. 删除 `node_modules` 重新安装：`rm -rf node_modules && npm install`

---

## 📊 部署后配置

### 1. 环境变量（如需要）

```bash
npx wrangler pages secret put API_KEY --project-name studio-network
```

### 2. 自定义域名（可选）

```bash
npx wrangler pages domain add example.com --project-name studio-network
```

### 3. 更新部署

每次更新代码后：
```bash
npm run build
npx wrangler pages deploy dist --project-name studio-network
```

---

## 🎯 快速命令参考

```bash
# 查看部署状态
npx wrangler pages deployment list --project-name studio-network

# 查看日志
npx wrangler pages deployment tail studio-network

# 删除项目（谨慎使用）
npx wrangler pages project delete studio-network

# 查看数据库
npx wrangler d1 execute studio-network-production --command="SELECT * FROM studios LIMIT 5"
```

---

## ✅ 部署检查清单

- [ ] Cloudflare API Key 已设置
- [ ] D1 数据库已创建
- [ ] database_id 已填入 wrangler.jsonc
- [ ] 数据库迁移已应用
- [ ] 项目已构建（dist/ 目录存在）
- [ ] Cloudflare Pages 项目已创建
- [ ] 代码已部署
- [ ] D1 数据库已绑定到 Pages 项目
- [ ] 部署 URL 可访问
- [ ] 数据正常显示

---

**祝部署顺利！** 🎉
