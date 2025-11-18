# 独立工作室展示网络 - Studio Network

## 项目概述

独立工作室展示网络是一个跨行业独立工作室的理念聚合展示平台，让相似理念但不同品类的创作者互相发现。

### 核心特点

- ✅ **跨行业聚合** - 服装/陶艺/插画/木工等不同领域工作室汇聚一处
- ✅ **按理念分类** - 极简主义/侘寂美学/手工温度等理念标签
- ✅ **无门槛展示** - 免费注册，社区共建
- ✅ **完整展示** - 不只是成品，可展示创作过程和理念
- ✅ **响应式设计** - 完美支持手机和电脑浏览

## 技术架构

### 前端技术栈
- **Hono** - 轻量级 Web 框架
- **Cloudflare Pages** - 边缘部署平台
- **TailwindCSS** - 实用优先的 CSS 框架
- **TypeScript** - 类型安全的 JavaScript

### 后端技术栈
- **Cloudflare D1** - SQLite 边缘数据库
- **Cloudflare Workers** - 无服务器边缘计算

### 数据模型
- **studios** - 工作室表
- **tags** - 理念标签表
- **studio_tags** - 工作室标签关联表
- **images** - 作品图片表

## 功能特性

### 版本1.4 (当前版本) ✅

#### 前台展示
- ✅ **手部背景 Landing Page** - 艺术手部照片作为全屏背景
  - 标签沿手部白色线条精确定位
  - 自定义白色光标，跟随鼠标移动
  - 标签悬停放大效果，带阴影
  - 无菜单栏，纯视觉体验
  - 下方区域展示工作室图片瀑布流
- ✅ 探索页面（**纯图片瀑布流** + 顶部分类标签导航）
  - ✅ **图片可点击导航至工作室详情页** （已修复）
  - 随机图片长宽比，美观布局
  - 悬停放大和阴影效果
- ✅ 工作室详情页（完整信息 + 作品展示 + 相似推荐）
  - 工作室名称、简介、分类、城市、阶段
  - 理念标签展示，可点击筛选
  - Markdown格式详细介绍
  - 作品图片画廊
  - 外部链接（小红书、淘宝等）
  - 相似工作室推荐
- ✅ **中英文语言切换**
- ✅ **登录/注册页面**

#### 设计系统
- ✅ **SimSun（中易宋体）字体** - 所有中文文本统一使用宋体
- ✅ **手部艺术背景** - 使用真实手部照片（https://www.genspark.ai/api/files/s/kH9Pk265）
- ✅ **精确标签定位** - 标签沿白色线条位置布局，带旋转角度
- ✅ **自定义光标** - 白色圆形光标，mix-blend-mode: difference
- ✅ **瀑布流布局** - CSS Column布局，响应式多列
- ✅ **三套配色方案**：
  - 首页：深蓝渐变 (#091041, #1A2975, #2B409B, #8F8ABE)
  - 理念浏览：暖色渐变 (#EEC33B, #E47336, #208DC7, #C3D3DA, #DFE8E7)
  - 材料浏览：冷色渐变 (#F5D5C9, #587194, #B3C4CF, #959DAE, #374B4E)
- ✅ **边框与填充色统一** - 所有UI组件边框颜色与内部颜色保持一致

#### 后台管理
- ✅ 工作室列表（查看所有工作室）
- ✅ 添加工作室（表单提交）
- ✅ 编辑工作室（修改信息）- **编辑按钮可正常点击**
- ✅ 删除工作室（软删除）
- ✅ 统计数据展示（工作室总数、标签总数、总浏览量）
- ✅ SimSun 字体应用到所有后台页面

#### API接口
- ✅ `GET /api/studios` - 获取工作室列表（支持筛选）
- ✅ `GET /api/studios/:slug` - 获取工作室详情
- ✅ `GET /api/tags` - 获取所有标签
- ✅ `GET /api/search` - 全局搜索
- ✅ `POST /api/auth/login` - 用户登录
- ✅ `POST /api/auth/register` - 用户注册

## 快速开始

### 本地开发

1. **安装依赖**
```bash
npm install
```

2. **构建项目**
```bash
npm run build
```

3. **启动开发服务器**
```bash
# 使用 PM2 启动（推荐）
pm2 start ecosystem.config.cjs

# 或直接运行
npm run dev:d1
```

4. **访问应用**
- **Sandbox公网地址**: https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai
- Landing Page: http://localhost:3000
- 主站首页: http://localhost:3000/home

### 目录结构

```
webapp/
├── src/
│   ├── components/         # React组件
│   │   ├── Layout.tsx             # 页面布局
│   │   └── LanguageSwitcher.tsx   # 语言切换组件
│   ├── db/                 # 数据库相关
│   │   ├── init.ts         # 数据库初始化
│   │   └── queries.ts      # 数据库查询函数
│   ├── routes/             # 路由定义
│   │   ├── api.tsx         # API路由
│   │   ├── admin.tsx       # 管理后台路由
│   │   └── frontend.tsx    # 前台路由
│   ├── views/              # 页面视图
│   │   ├── LandingPage.tsx         # 3D交互式欢迎页
│   │   ├── HomePage.tsx            # 首页
│   │   ├── StudioDetailPage.tsx   # 工作室详情页
│   │   ├── SearchPage.tsx          # 筛选页
│   │   ├── LoginPage.tsx           # 登录页
│   │   ├── RegisterPage.tsx        # 注册页
│   │   ├── AdminDashboard.tsx      # 管理后台首页
│   │   └── AdminStudioForm.tsx     # 工作室表单
│   ├── index.tsx           # 主入口
│   ├── renderer.tsx        # HTML渲染器
│   └── types.ts            # TypeScript类型定义
├── public/
│   └── static/
│       └── style.css       # 自定义样式
├── migrations/             # 数据库迁移文件
│   └── 0001_initial_schema.sql
├── seed.sql                # 示例数据
├── ecosystem.config.cjs    # PM2配置
├── wrangler.jsonc          # Cloudflare配置
├── package.json            # 项目配置
└── README.md               # 项目文档
```

## 数据管理

### 预设标签

系统已自动创建以下理念标签：

**理念标签 (Concept)**
- 极简主义 - 少即是多，追求纯粹与简洁
- 侘寂美学 - 不完美之美，时光的痕迹
- 未来感 - 科技与设计的前瞻融合
- 复古怀旧 - 时光印记，经典重现
- 手工温度 - 手作痕迹，匠人精神
- 东方美学 - 中式意境，禅意空间
- 自然主义 - 天然材料，返璞归真
- 工业风 - 粗犷质感，机械美学

**材料标签 (Material)**
- 陶瓷、木材、布艺、金属

### 添加工作室

访问管理后台添加工作室：
1. 访问 `/admin`
2. 点击"添加工作室"按钮
3. 填写表单信息：
   - 工作室名称（必填）
   - URL标识/slug（必填，用于URL）
   - 一句话介绍（最多50字）
   - 品类（陶艺/服装/插画等）
   - 城市
   - 当前阶段
   - 理念标签（最多5个）
   - 详细介绍（支持Markdown）
   - 封面图片URL
4. 提交保存

### 数据库命令

```bash
# 查看本地数据库
npm run db:console:local

# 重置本地数据库
npm run db:reset

# 应用迁移到生产环境
npm run db:migrate:prod
```

## 部署指南

### Cloudflare Pages 部署

1. **准备工作**
   - 注册 Cloudflare 账号
   - 获取 Cloudflare API Token

2. **创建 D1 数据库**
```bash
npx wrangler d1 create webapp-production
# 复制返回的 database_id 到 wrangler.jsonc
```

3. **应用数据库迁移**
```bash
npx wrangler d1 migrations apply webapp-production
```

4. **构建并部署**
```bash
npm run build
npm run deploy:prod
```

5. **配置域名（可选）**
   - 在 Cloudflare Pages Dashboard 中绑定自定义域名

## 访问地址

- **Sandbox环境**: https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai
- **生产环境**: 待部署到 Cloudflare Pages
- **本地开发**: http://localhost:3000

## 主要页面

| 页面 | 路径 | 说明 |
|------|------|------|
| **首页** | `/` | **手部背景艺术页 + 标签定位 + 图片瀑布流** |
| **探索页面** | `/explore` | **纯图片瀑布流 + 标签导航** (图片可点击) |
| **工作室详情** | `/studio/:slug` | **工作室主页** - 完整信息 + 作品展示 |
| **管理后台** | `/admin` | **后台首页** - 工作室列表 + 统计数据 |
| 添加工作室 | `/admin/new` | 工作室创建表单 |
| 编辑工作室 | `/admin/edit/:slug` | 工作室编辑表单 |
| 登录页面 | `/login` | 用户登录表单 |
| 注册页面 | `/register` | 用户注册表单 |

## API文档

### 工作室API

#### 获取工作室列表
```
GET /api/studios?page=1&limit=20&category=pottery&tags=minimalism,handmade&city=上海&search=keyword
```

**参数:**
- `page` - 页码（默认1）
- `limit` - 每页数量（默认20，最大100）
- `category` - 品类筛选
- `tags` - 标签筛选（逗号分隔）
- `city` - 城市筛选
- `stage` - 阶段筛选
- `search` - 搜索关键词

**响应:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "has_more": true
  }
}
```

#### 获取工作室详情
```
GET /api/studios/:slug
```

**响应:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "工作室名称",
    "slug": "studio-slug",
    "tags": [...],
    "images": [...],
    "similar_studios": [...]
  }
}
```

### 标签API

#### 获取所有标签
```
GET /api/tags?category=concept
```

**参数:**
- `category` - 标签分类（concept/material/stage）

### 搜索API

#### 全局搜索
```
GET /api/search?q=极简&type=all&limit=10
```

**参数:**
- `q` - 搜索关键词（必填）
- `type` - 搜索类型（all/studios/tags）
- `limit` - 结果数量（默认10）

## 开发计划

### 版本2（+3周）
- [ ] 用户注册/登录系统
- [ ] 工作室认领/编辑功能
- [ ] 收藏/点赞功能
- [ ] 个人中心页面
- [ ] 工作室数据看板

### 版本3（+2个月）
- [ ] 贡献值系统
- [ ] 社区投票系统
- [ ] 内容审核机制
- [ ] 数据统计完善
- [ ] 去中心化治理

## 常见问题

### 如何重启服务？

```bash
# 清理端口
fuser -k 3000/tcp

# 重启 PM2
pm2 restart webapp

# 查看日志
pm2 logs webapp --nostream
```

### 数据库如何初始化？

数据库会在首次请求时自动初始化，创建所有必要的表和预设标签数据。

### 如何修改端口？

修改 `ecosystem.config.cjs` 文件中的端口配置。

### 如何添加新的理念标签？

1. 方式1：通过数据库直接插入
```bash
npx wrangler d1 execute webapp-production --local --command="INSERT INTO tags (name, slug, description, category, color) VALUES ('新标签', 'new-tag', '描述', 'concept', '#6366f1')"
```

2. 方式2：在 `src/db/init.ts` 中添加，重启服务自动创建

### 如何使用自定义图片？

推荐使用以下免费图床服务：
- [Unsplash](https://unsplash.com) - 高质量免费图片
- [Cloudinary](https://cloudinary.com) - 图片托管服务
- 或使用 Cloudflare R2（版本2将集成）

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 技术支持

遇到问题？请查看：
- [Issues](https://github.com/yourusername/studio-network/issues) - 提交问题
- [Discussions](https://github.com/yourusername/studio-network/discussions) - 讨论功能

## 许可证

MIT License

## 联系方式

- Email: hello@studionetwork.com
- Website: www.studionetwork.com

---

**独立工作室展示网络** - 让相似理念的创作者互相发现 🎨

由 Hono + Cloudflare Pages 强力驱动 ⚡
