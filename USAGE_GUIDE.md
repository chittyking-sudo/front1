# 使用指南 - Studio Network

## 快速上手

### 1. 访问应用

**Sandbox环境（当前可用）:**
- 🌐 公网访问: https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai

**主要页面:**
- 首页: `/`
- 探索页面: `/explore`
- 管理后台: `/admin`

---

## 添加第一个工作室

### Step 1: 进入管理后台

访问管理后台页面：
```
https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/admin
```

### Step 2: 点击"添加工作室"按钮

在管理后台首页，点击右上角的 **"+ 添加工作室"** 按钮。

### Step 3: 填写表单

#### 基础信息（必填）

1. **工作室名称**
   - 例如：`一器工作室`
   - 要求：2-20个字符，必须唯一

2. **URL标识 (slug)**
   - 例如：`yiqi-pottery`
   - 要求：只能包含小写字母、数字、连字符
   - 用途：生成访问URL `/studio/yiqi-pottery`

#### 补充信息（可选）

3. **一句话介绍**
   - 例如：`探索极简陶艺的纯粹之美`
   - 限制：最多50个字符

4. **品类**
   - 选项：陶艺、服装、插画、木工、金工、皮具、纸艺、首饰、其他
   - 例如：选择 `陶艺`

5. **城市**
   - 例如：`上海`

6. **当前阶段**
   - 选项：
     - 灵感探索（概念阶段）
     - 材料实验（打样中）
     - 小批量生产（可购买）
     - 接受定制（可下单）

#### 理念标签（重要！）

7. **选择标签**（最多5个）
   - 勾选符合工作室理念的标签
   - 例如：✅ 极简主义  ✅ 手工温度  ✅ 陶瓷

#### 详细内容

8. **详细介绍**（支持Markdown格式）
   - 可以使用Markdown语法：
   ```markdown
   # 关于我们
   
   一器，取"一件器物"之意。
   
   ## 设计理念
   
   "少即是多"不仅是一种美学，更是一种生活态度。
   
   ## 工艺特色
   
   - 手工拉坯，保留自然痕迹
   - 哑光釉面，温润触感
   - 简约线条，和谐比例
   ```

9. **封面图片URL**
   - 推荐使用 [Unsplash](https://unsplash.com) 的图片
   - 示例URL:
   ```
   https://images.unsplash.com/photo-1578749556568-bc2c40e17f0c?w=800
   ```
   - 建议比例：16:9

### Step 4: 提交保存

点击 **"创建工作室"** 按钮，系统会自动保存并跳转到管理后台列表。

---

## 示例工作室数据

### 示例1：极简陶艺工作室

```
名称: 一器工作室
Slug: yiqi-pottery
介绍: 探索极简陶艺的纯粹之美
品类: 陶艺
城市: 上海
阶段: 小批量生产
标签: 极简主义, 手工温度, 陶瓷
封面: https://images.unsplash.com/photo-1578749556568-bc2c40e17f0c?w=800

描述:
# 关于我们
一器，取"一件器物"之意。我们专注于极简主义陶艺创作。

## 设计理念
"少即是多"不仅是一种美学，更是一种生活态度。

## 工艺特色
- 手工拉坯，保留自然痕迹
- 哑光釉面，温润触感
```

### 示例2：侘寂美学服装

```
名称: 残月
Slug: canyue-fashion
介绍: 不完美的美学，时光的印记
品类: 服装
城市: 北京
阶段: 接受定制
标签: 侘寂美学, 手工温度, 布艺
封面: https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800

描述:
# 品牌故事
残月，取"残缺之月，别有意境"之意。

## 设计特色
- 天然植物染色
- 手工刺绣装饰
- 宽松舒适版型
```

### 示例3：未来感插画

```
名称: NeonDreams
Slug: neondreams-art
介绍: 赛博朋克与未来主义的视觉实验
品类: 插画
城市: 深圳
阶段: 寻求合作
标签: 未来感, 工业风
封面: https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800

描述:
# 关于我们
探索数字艺术的边界，创造未来感的视觉语言。

## 创作方向
- 赛博朋克城市景观
- 未来科技概念设计
- 霓虹色彩实验
```

---

## 查看和管理工作室

### 查看工作室列表

访问管理后台首页：
```
https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/admin
```

可以看到：
- 工作室列表（带封面图）
- 品类、城市、浏览量
- 状态（published/draft）
- 操作按钮（查看/编辑/删除）

### 编辑工作室

1. 在列表中点击"编辑"按钮
2. 修改表单内容
3. 点击"保存修改"

### 删除工作室

1. 在列表中点击"删除"按钮
2. 确认删除操作
3. 工作室将被软删除（状态改为archived）

---

## 前台浏览体验

### 首页浏览

访问首页查看：
```
https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/
```

**首页功能：**
- 🏷️ 理念标签区（横向滚动）
- 🎯 品类快速筛选
- 🔍 搜索框
- 📦 工作室网格展示

**交互体验：**
- 点击标签 → 筛选相应理念的工作室
- 点击品类 → 筛选该品类工作室
- 点击工作室卡片 → 进入详情页

### 工作室详情页

访问任意工作室详情：
```
https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/studio/yiqi-pottery
```

**详情页包含：**
- 🎨 工作室基本信息
- 🏷️ 理念标签（可点击）
- 🖼️ 作品图片展示
- 📝 详细介绍（Markdown渲染）
- 🔗 外部链接
- 💡 相似工作室推荐

### 探索/筛选页面

访问探索页面：
```
https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/explore
```

**筛选功能：**
- 多标签组合筛选
- 搜索关键词
- 品类/城市/阶段筛选
- 实时显示结果数量
- 一键清除筛选条件

---

## API使用示例

### 获取工作室列表

```bash
curl "https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/api/studios?limit=10"
```

### 按标签筛选

```bash
curl "https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/api/studios?tags=minimalism,handmade"
```

### 搜索工作室

```bash
curl "https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/api/search?q=极简"
```

### 获取所有标签

```bash
curl "https://3000-ilnel7c8p64wyz5cahyk6-3844e1b6.sandbox.novita.ai/api/tags"
```

---

## 推荐图片资源

### Unsplash 主题搜索

**陶艺/陶瓷:**
- https://unsplash.com/s/photos/pottery
- https://unsplash.com/s/photos/ceramic

**服装/时尚:**
- https://unsplash.com/s/photos/fashion
- https://unsplash.com/s/photos/clothing

**插画/艺术:**
- https://unsplash.com/s/photos/illustration
- https://unsplash.com/s/photos/digital-art

**木工/木作:**
- https://unsplash.com/s/photos/woodwork
- https://unsplash.com/s/photos/carpentry

**金工/首饰:**
- https://unsplash.com/s/photos/jewelry
- https://unsplash.com/s/photos/metalwork

### 图片URL格式

选择图片后，在Unsplash页面右键图片 → "复制图片地址"，得到类似：
```
https://images.unsplash.com/photo-xxxxxxxxx?ixlib=rb-4.0.3&...
```

**优化建议：**
在URL后添加 `?w=800` 可以获取适合尺寸的图片：
```
https://images.unsplash.com/photo-1578749556568-bc2c40e17f0c?w=800
```

---

## 常见问题

### Q1: 为什么我的工作室没有显示在首页？

**A:** 检查以下几点：
1. 工作室状态是否为 `published`
2. 是否已添加理念标签
3. 刷新页面或清除缓存

### Q2: 如何修改已有工作室的信息？

**A:** 
1. 访问 `/admin`
2. 找到对应工作室，点击"编辑"
3. 修改后点击"保存修改"

### Q3: 图片显示不出来怎么办？

**A:** 
1. 检查图片URL是否有效
2. 确保URL是直接的图片链接（以.jpg/.png结尾或包含图片参数）
3. 推荐使用Unsplash等稳定图床

### Q4: 如何删除工作室？

**A:** 
1. 在管理后台列表中点击"删除"
2. 确认删除操作
3. 工作室将被软删除（不会真正从数据库删除，只是状态改为archived）

### Q5: 一个工作室最多可以添加多少个标签？

**A:** 建议最多添加5个理念标签，这样能更精准地表达工作室的核心理念。

---

## 下一步计划

当前版本为 **MVP v1**，已完成基础功能。

**版本2规划（+3周）：**
- 用户注册/登录系统
- 工作室认领功能
- 收藏/点赞功能
- 个人数据看板

**版本3规划（+2个月）：**
- 社区贡献值系统
- 去中心化投票治理
- 高级数据统计

---

## 反馈与支持

如有问题或建议，欢迎联系：
- Email: hello@studionetwork.com
- 或在管理后台留言

---

**独立工作室展示网络** - 让理念相似的创作者互相发现 🎨
