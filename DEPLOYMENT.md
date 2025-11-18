# Studio Network 部署指南

## 一、Cloudflare Pages 部署（推荐）

### 准备工作

1. **注册 Cloudflare 账号**
   - 访问 https://dash.cloudflare.com/sign-up
   - 完成邮箱验证

2. **获取 API Token**
   - 访问 https://dash.cloudflare.com/profile/api-tokens
   - 点击 "Create Token"
   - 使用 "Edit Cloudflare Workers" 模板
   - 权限设置：
     - Account > Cloudflare Pages > Edit
     - Account > Account Settings > Read
   - 复制生成的 Token

3. **在本项目中配置 API Token**
   - 打开侧边栏的 **Deploy** 标签
   - 粘贴 Cloudflare API Token
   - 保存配置

### 部署步骤

#### 方法一：使用 Wrangler CLI（推荐）

```bash
# 1. 确保已构建项目
cd /home/user/webapp
npm run build

# 2. 登录 Cloudflare（首次部署）
npx wrangler login
# 或使用 API Token
export CLOUDFLARE_API_TOKEN=your_token_here

# 3. 创建 Pages 项目（首次部署）
npx wrangler pages project create studio-network \
  --production-branch main \
  --compatibility-date 2024-01-01

# 4. 部署到 Cloudflare Pages
npx wrangler pages deploy dist --project-name studio-network

# 5. 查看部署结果
# 会得到类似的 URL：https://studio-network.pages.dev
```

#### 方法二：使用 GitHub + Cloudflare Pages

```bash
# 1. 推送代码到 GitHub
git remote add origin https://github.com/your-username/studio-network.git
git push -u origin main

# 2. 在 Cloudflare Dashboard 中：
# - 进入 Pages 页面
# - 点击 "Create a project"
# - 选择 "Connect to Git"
# - 授权 GitHub 并选择仓库
# - 构建设置：
#   - Build command: npm run build
#   - Build output directory: dist
#   - Root directory: /
# - 点击 "Save and Deploy"
```

### 配置自定义域名

```bash
# 1. 添加域名到 Cloudflare
# 在 Cloudflare Dashboard 中添加您的域名

# 2. 配置 Pages 自定义域名
npx wrangler pages domain add yourdomain.com \
  --project-name studio-network

# 3. 更新 DNS 记录（自动完成）
# Cloudflare 会自动配置 CNAME 记录
```

### 环境变量配置

如果项目需要环境变量（API密钥等）：

```bash
# 添加生产环境变量
npx wrangler pages secret put API_KEY \
  --project-name studio-network

# 添加预览环境变量
npx wrangler pages secret put API_KEY \
  --project-name studio-network \
  --env preview
```

---

## 二、境内服务器部署（备选方案）

### 选项 A：Vercel + 境内 CDN

Vercel 在中国有 CDN 节点，访问速度较好。

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署
vercel

# 4. 设置域名（需要备案域名）
vercel domains add yourdomain.com
```

**注意事项：**
- 需要将项目从 Cloudflare Workers 运行时改为 Node.js
- 需要修改 `vite.config.ts` 和构建配置
- D1 数据库需要替换为其他数据库方案（如 PlanetScale、Supabase）

### 选项 B：腾讯云 Serverless + COS

使用腾讯云云函数部署。

**所需资源：**
- 腾讯云账号（已实名认证）
- 云函数 SCF（Serverless Cloud Function）
- COS（对象存储）- 存储静态资源
- API 网关 - 提供访问入口

**部署步骤：**

1. **准备代码包**
```bash
cd /home/user/webapp
npm run build

# 创建部署包
mkdir -p deploy/static
cp -r dist/* deploy/
cp -r public/* deploy/static/
```

2. **创建云函数**
- 登录腾讯云控制台
- 进入云函数 SCF
- 创建新函数（Node.js 18.x）
- 上传部署包
- 配置 API 网关触发器

3. **配置 COS 存储**
- 创建 COS 存储桶
- 上传静态资源到 COS
- 配置 CDN 加速

### 选项 C：阿里云 FC + OSS

使用阿里云函数计算部署。

**所需资源：**
- 阿里云账号（已实名认证）
- 函数计算 FC
- OSS（对象存储服务）
- API 网关

**部署步骤类似腾讯云方案**

### 选项 D：自建服务器 + Docker

如果您有境内服务器（如阿里云 ECS、腾讯云 CVM）：

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制项目文件
COPY package*.json ./
RUN npm install --production

COPY . .

# 构建项目
RUN npm run build

# 安装 wrangler
RUN npm install -g wrangler

# 暴露端口
EXPOSE 3000

# 启动服务（使用 wrangler pages dev 作为生产服务器）
CMD ["npx", "wrangler", "pages", "dev", "dist", "--port", "3000", "--ip", "0.0.0.0"]
```

**部署命令：**
```bash
# 构建镜像
docker build -t studio-network .

# 运行容器
docker run -d \
  -p 3000:3000 \
  --name studio-network \
  --restart unless-stopped \
  studio-network

# 配置 Nginx 反向代理
# /etc/nginx/sites-available/studio-network
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 三、数据库迁移

### 从本地 D1 迁移到生产环境

```bash
# 1. 导出本地数据
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM studios" > studios_backup.json

# 2. 创建生产数据库
npx wrangler d1 create studio-network-prod

# 3. 更新 wrangler.jsonc 中的 database_id

# 4. 应用迁移
npx wrangler d1 migrations apply studio-network-prod

# 5. 导入数据（如果需要）
npx wrangler d1 execute studio-network-prod \
  --file=./seed.sql
```

### 使用第三方数据库（境内部署推荐）

**Supabase（PostgreSQL）：**
- 免费额度：500MB 数据库
- 支持境内访问
- 提供 REST API

**PlanetScale（MySQL）：**
- 免费额度：5GB 存储
- 全球分布式数据库
- Serverless 架构

---

## 四、性能优化建议

### 境内访问加速

1. **CDN 配置**
   - 使用阿里云 CDN 或腾讯云 CDN
   - 回源配置到 Cloudflare Pages
   - 启用智能压缩和缓存

2. **图片优化**
   - 使用境内图床（阿里云 OSS、腾讯云 COS）
   - 替换 Unsplash 图片链接
   - 启用 WebP 格式

3. **字体优化**
   - 使用境内 CDN 的字体资源
   - 字体子集化，减小文件体积

### 监控和日志

```bash
# Cloudflare Pages 日志
npx wrangler pages deployment tail --project-name studio-network

# 查看访问统计
# 在 Cloudflare Dashboard > Analytics > Web Analytics
```

---

## 五、常见问题

### Q1: Cloudflare Pages 在中国访问速度如何？
A: Cloudflare 在中国有合作 CDN 节点，访问速度较好。使用备案域名可获得更好性能。

### Q2: 如何备案域名？
A: 
1. 购买境内服务器（阿里云/腾讯云）
2. 通过服务商提交 ICP 备案
3. 备案通过后将域名添加到 Cloudflare

### Q3: D1 数据库可以在境内访问吗？
A: D1 数据库通过 Cloudflare Workers 访问，在境内可用但可能有轻微延迟。

### Q4: 如何实现零停机部署？
A: Cloudflare Pages 自动支持零停机部署，每次部署会创建新的预览环境，验证通过后切换到生产。

---

## 六、推荐部署方案

### 最佳方案（境内用户）：

```
Cloudflare Pages（主站）
    ↓
阿里云/腾讯云 CDN（加速层）
    ↓
备案域名（最佳访问速度）
```

### 快速方案（国际用户）：

```
Cloudflare Pages（一键部署）
    ↓
Cloudflare CDN（全球加速）
    ↓
.pages.dev 域名（免费HTTPS）
```

---

## 七、联系支持

如果在部署过程中遇到问题：

- Cloudflare 文档：https://developers.cloudflare.com/pages/
- Wrangler CLI 文档：https://developers.cloudflare.com/workers/wrangler/
- 项目 Issues：（您的 GitHub 仓库）

---

**更新时间**: 2025-11-18
**项目版本**: v1.5
