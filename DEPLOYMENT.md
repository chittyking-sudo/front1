# 🚀 部署说明

## 选项 1: 自动部署脚本（推荐）

### 前提条件
1. ✅ 在 Deploy 标签页设置 Cloudflare API Key
2. ✅ 运行 `setup_cloudflare_api_key` 配置环境

### 一键部署
```bash
cd /home/user/webapp
./deploy.sh
```

脚本会自动完成：
- ✅ 创建 D1 数据库
- ✅ 应用数据库迁移
- ✅ 构建项目
- ✅ 创建 Pages 项目
- ✅ 部署到生产环境

---

## 选项 2: 手动部署

### 步骤 1: 设置认证
```bash
cd /home/user/webapp
# 在 Deploy 标签页设置 API Key 后运行
setup_cloudflare_api_key
```

### 步骤 2: 创建数据库
```bash
npx wrangler d1 create studio-network-production
```
**记录返回的 `database_id`**

### 步骤 3: 更新配置
编辑 `wrangler.jsonc`，填入 database_id：
```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "studio-network-production",
      "database_id": "你的database_id"
    }
  ]
}
```

### 步骤 4: 应用迁移
```bash
npx wrangler d1 migrations apply studio-network-production
```

### 步骤 5: 构建项目
```bash
npm run build
```

### 步骤 6: 创建 Pages 项目
```bash
npx wrangler pages project create studio-network \
  --production-branch main \
  --compatibility-date 2025-11-15
```

### 步骤 7: 部署
```bash
npx wrangler pages deploy dist --project-name studio-network
```

### 步骤 8: 绑定数据库
在 [Cloudflare Dashboard](https://dash.cloudflare.com) 中：
1. 进入 Pages 项目 `studio-network`
2. Settings > Functions > D1 database bindings
3. 添加绑定：
   - Variable name: `DB`
   - D1 database: `studio-network-production`

---

## ✅ 部署验证

访问部署 URL 测试：
```bash
curl https://studio-network.pages.dev
```

或在浏览器中打开查看效果。

---

## 🔄 更新部署

代码更新后重新部署：
```bash
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist --project-name studio-network
```

---

## 📊 常用命令

```bash
# 查看部署列表
npx wrangler pages deployment list --project-name studio-network

# 查看实时日志
npx wrangler pages deployment tail studio-network

# 查询数据库
npx wrangler d1 execute studio-network-production \
  --command="SELECT * FROM studios LIMIT 5"

# 查看项目信息
npx wrangler pages project list
```

---

## ⚠️ 重要提示

1. **数据库初始化**: 生产环境数据库不会自动插入测试数据，需要通过后台管理页面手动添加工作室
2. **API Key**: 确保 API Token 有足够的权限（Pages 和 D1）
3. **域名**: 默认使用 `studio-network.pages.dev`，可以在 Cloudflare Dashboard 中绑定自定义域名

---

**祝部署顺利！** 🎉
