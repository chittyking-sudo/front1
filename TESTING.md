# 测试数据添加指南

## 当前页面结构

### 1. 首页 (/)
- **手部背景图**: 全屏显示,图片原封不动
- **分类标签**: 沿着手部图片的白线放置10个理念标签
- **图片瀑布流**: 下方展示工作室封面图片,纯视觉化,无文字

### 2. 筛选页面 (/explore?tags=xxx&type=concept)
- **顶部标签导航**: 分类标签横向滚动
- **图片瀑布流**: 仅展示筛选后的工作室封面图片
- **配色方案**: 根据分类(concept/material)使用不同配色

### 3. 工作室详情页 (/studio/:slug)
- **工作室简介**: 名称、标语、分类、城市等信息
- **理念标签**: 展示工作室关联的标签
- **作品展示**: 图片画廊
- **详细描述**: 支持Markdown格式的创意内容
- **外部链接**: 小红书、淘宝店等
- **相似工作室推荐**: 基于相同标签推荐

## 添加测试数据

### 方法1: 通过管理后台 (推荐)

1. 访问管理后台: http://localhost:3000/admin
2. 点击"添加工作室"按钮
3. 填写表单:
   - **工作室名称**: 必填
   - **URL标识(slug)**: 必填,用于URL路径
   - **一句话介绍**: 最多50字
   - **品类**: 陶艺/服装/插画/木工等
   - **城市**: 工作室所在城市
   - **当前阶段**: 初创/成长/成熟
   - **理念标签**: 选择1-5个标签
   - **详细介绍**: 支持Markdown格式
   - **封面图片URL**: 使用外部图床链接

4. 提交保存

### 方法2: 使用图床服务

推荐的免费图床服务:
- **Unsplash**: https://unsplash.com (高质量免费图片)
- **Imgur**: https://imgur.com (免费图片托管)
- **Cloudinary**: https://cloudinary.com (专业图片CDN)

### 方法3: 直接使用Unsplash示例图片

```
陶艺类:
https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800
https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800

木工类:
https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800

服装类:
https://images.unsplash.com/photo-1558769132-cb1aea94f4fa?w=800

插画类:
https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800

皮具类:
https://images.unsplash.com/photo-1517646287270-fe29a1220c00?w=800

茶室类:
https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800

家居类:
https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800

金属类:
https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800
```

## 测试流程

### 1. 测试首页展示
1. 访问 http://localhost:3000
2. 查看手部背景图是否正常显示
3. 查看10个标签是否沿白线正确排列
4. 测试标签hover效果
5. 查看下方图片瀑布流布局

### 2. 测试筛选功能
1. 点击任意标签(如"极简主义")
2. 进入筛选页面
3. 查看图片瀑布流是否正常
4. 测试顶部标签导航

### 3. 测试工作室详情
1. 点击任意工作室封面图
2. 查看工作室详情页面
3. 检查简介、标签、作品展示等
4. 测试相似工作室推荐

## 当前状态

- ✅ 手部背景图Landing Page
- ✅ 标签沿白线排列
- ✅ 图片瀑布流布局
- ✅ 筛选页面纯图片展示
- ✅ 工作室详情页完整
- ✅ 配色方案按分类区分
- ⏳ 需要添加测试数据

## 下一步

1. 通过管理后台添加5-10个工作室
2. 每个工作室使用不同的理念标签
3. 上传或使用示例图片
4. 测试完整的用户浏览流程
5. 验证图片瀑布流布局效果

## 数据库表结构

### studios (工作室表)
- name: 工作室名称
- slug: URL标识
- tagline: 一句话介绍
- description: 详细描述(Markdown)
- category: 品类
- city: 城市
- stage: 阶段
- cover_image_url: 封面图片
- status: 状态(published/draft)

### tags (标签表)
- name: 标签名称
- slug: URL标识
- description: 描述
- category: 分类(concept/material)
- color: 颜色

### studio_tags (关联表)
- studio_id: 工作室ID
- tag_id: 标签ID

### images (图片表)
- studio_id: 工作室ID
- url: 图片URL
- alt_text: 图片描述
- sort_order: 排序
- status: 状态

## 访问地址

- **首页**: https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai
- **管理后台**: https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/admin
- **API接口**: https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/api/studios
