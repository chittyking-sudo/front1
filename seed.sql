-- Seed data for Studio Network
-- Preset tags for the platform

-- ==========================================
-- 理念标签 (Concept Tags)
-- ==========================================
INSERT OR IGNORE INTO tags (name, slug, description, category, color, icon) VALUES
('极简主义', 'minimalism', '少即是多，追求纯粹与简洁', 'concept', '#64748b', 'minus'),
('侘寂美学', 'wabi-sabi', '不完美之美，时光的痕迹', 'concept', '#92400e', 'leaf'),
('未来感', 'futurism', '科技与设计的前瞻融合', 'concept', '#7c3aed', 'zap'),
('复古怀旧', 'vintage', '时光印记，经典重现', 'concept', '#c2410c', 'clock'),
('手工温度', 'handmade', '手作痕迹，匠人精神', 'concept', '#ea580c', 'hand'),
('东方美学', 'oriental', '中式意境，禅意空间', 'concept', '#dc2626', 'yin-yang'),
('自然主义', 'naturalism', '天然材料，返璞归真', 'concept', '#16a34a', 'tree-pine'),
('工业风', 'industrial', '粗犷质感，机械美学', 'concept', '#475569', 'cog'),
('解构主义', 'deconstructivism', '打破常规，重组创新', 'concept', '#ec4899', 'shape'),
('可持续', 'sustainable', '环保理念，循环再生', 'concept', '#059669', 'recycle');

-- ==========================================
-- 材料标签 (Material Tags)
-- ==========================================
INSERT OR IGNORE INTO tags (name, slug, description, category, color, icon) VALUES
('陶瓷', 'pottery', '土与火的艺术', 'material', '#92400e', 'circle'),
('金属', 'metal', '工业质感，坚固耐用', 'material', '#78716c', 'hexagon'),
('木材', 'wood', '自然纹理，温润触感', 'material', '#a16207', 'package'),
('布艺', 'fabric', '柔软舒适，丰富纹理', 'material', '#0891b2', 'shirt'),
('皮革', 'leather', '经典材质，越用越美', 'material', '#78350f', 'briefcase'),
('纸艺', 'paper', '轻盈灵动，可塑性强', 'material', '#fbbf24', 'file-text'),
('玻璃', 'glass', '透明晶莹，光影交错', 'material', '#06b6d4', 'diamond'),
('混合材料', 'mixed', '跨界融合，多元表达', 'material', '#8b5cf6', 'layers');

-- ==========================================
-- 阶段标签 (Stage Tags)
-- ==========================================
INSERT OR IGNORE INTO tags (name, slug, description, category, color, icon) VALUES
('灵感探索', 'exploration', '概念阶段，思考实验', 'stage', '#6366f1', 'lightbulb'),
('材料实验', 'experiment', '工艺尝试，打样测试', 'stage', '#f59e0b', 'flask'),
('小批量生产', 'production', '成熟作品，可购买', 'stage', '#10b981', 'package-check'),
('接受定制', 'custom', '个性化服务，按需制作', 'stage', '#ec4899', 'pencil'),
('寻求合作', 'collaboration', '开放联名，跨界合作', 'stage', '#8b5cf6', 'users');

-- ==========================================
-- 示例工作室 (Sample Studios)
-- ==========================================
-- 工作室1：极简陶艺工作室
INSERT OR IGNORE INTO studios (
  name, slug, tagline, description, category, city, stage, 
  cover_image_url, links, status
) VALUES (
  '一器工作室',
  'yiqi-pottery',
  '探索极简陶艺的纯粹之美',
  '# 关于我们

一器，取"一件器物"之意。我们专注于极简主义陶艺创作，追求形式与功能的完美平衡。

## 设计理念

"少即是多"不仅是一种美学，更是一种生活态度。每一件器物都经过反复推敲，去除多余装饰，保留最本质的美感。

## 工艺特色

- 手工拉坯，保留自然痕迹
- 哑光釉面，温润触感
- 简约线条，和谐比例

## 合作案例

曾为多家独立咖啡馆定制茶器，为民宿品牌设计餐具系列。',
  'pottery',
  '上海',
  'production',
  'https://images.unsplash.com/photo-1578749556568-bc2c40e17f0c?w=800',
  '[{"type":"小红书","url":"https://xiaohongshu.com/user/example"},{"type":"淘宝店","url":"https://shop.taobao.com/example"}]',
  'published'
);

-- 为工作室1添加标签
INSERT OR IGNORE INTO studio_tags (studio_id, tag_id)
SELECT 
  (SELECT id FROM studios WHERE slug = 'yiqi-pottery'),
  id
FROM tags 
WHERE slug IN ('minimalism', 'pottery', 'handmade');

-- 工作室1的作品图片
INSERT OR IGNORE INTO images (studio_id, url, alt_text, sort_order) VALUES
((SELECT id FROM studios WHERE slug = 'yiqi-pottery'), 'https://images.unsplash.com/photo-1578749556568-bc2c40e17f0c?w=800', '极简茶杯系列', 1),
((SELECT id FROM studios WHERE slug = 'yiqi-pottery'), 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800', '手工花器', 2),
((SELECT id FROM studios WHERE slug = 'yiqi-pottery'), 'https://images.unsplash.com/photo-1581234247729-a35a5e5b5e42?w=800', '茶壶作品', 3);

-- 工作室2：侘寂美学服装
INSERT OR IGNORE INTO studios (
  name, slug, tagline, description, category, city, stage, 
  cover_image_url, status
) VALUES (
  '残月',
  'canyue-fashion',
  '不完美的美学，时光的印记',
  '# 品牌故事

残月，取"残缺之月，别有意境"之意。我们相信，岁月的痕迹、手工的不完美，恰恰是最真实的美。

## 设计特色

- 天然植物染色
- 手工刺绣装饰
- 宽松舒适版型
- 做旧处理工艺

每一件衣服都是独一无二的艺术品。',
  'fashion',
  '北京',
  'custom',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
  'published'
);

INSERT OR IGNORE INTO studio_tags (studio_id, tag_id)
SELECT 
  (SELECT id FROM studios WHERE slug = 'canyue-fashion'),
  id
FROM tags 
WHERE slug IN ('wabi-sabi', 'handmade', 'fabric', 'sustainable');

INSERT OR IGNORE INTO images (studio_id, url, alt_text, sort_order) VALUES
((SELECT id FROM studios WHERE slug = 'canyue-fashion'), 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800', '亚麻连衣裙', 1),
((SELECT id FROM studios WHERE slug = 'canyue-fashion'), 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800', '手工刺绣细节', 2);

-- 工作室3：未来感插画
INSERT OR IGNORE INTO studios (
  name, slug, tagline, description, category, city, stage, 
  cover_image_url, status
) VALUES (
  'NeonDreams',
  'neondreams-art',
  '赛博朋克与未来主义的视觉实验',
  '# 关于我们

探索数字艺术的边界，创造未来感的视觉语言。

## 创作方向

- 赛博朋克城市景观
- 未来科技概念设计
- 霓虹色彩实验

我们为品牌、游戏、电影提供概念艺术服务。',
  'illustration',
  '深圳',
  'collaboration',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
  'published'
);

INSERT OR IGNORE INTO studio_tags (studio_id, tag_id)
SELECT 
  (SELECT id FROM studios WHERE slug = 'neondreams-art'),
  id
FROM tags 
WHERE slug IN ('futurism', 'deconstructivism');

INSERT OR IGNORE INTO images (studio_id, url, alt_text, sort_order) VALUES
((SELECT id FROM studios WHERE slug = 'neondreams-art'), 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', '赛博城市', 1),
((SELECT id FROM studios WHERE slug = 'neondreams-art'), 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800', '霓虹街景', 2);

-- 更新标签使用次数
UPDATE tags SET usage_count = (
  SELECT COUNT(*) FROM studio_tags WHERE studio_tags.tag_id = tags.id
);
