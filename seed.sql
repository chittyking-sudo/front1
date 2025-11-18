-- Seed data for testing the Studio Network platform

-- Insert test studios with sample images
INSERT OR IGNORE INTO studios (
  name, 
  slug, 
  tagline, 
  description, 
  category, 
  city, 
  stage, 
  cover_image_url,
  status
) VALUES 
(
  '极简陶艺工作室',
  'minimalist-pottery',
  '用最简单的线条,表达最纯粹的美',
  '# 我们的理念\n\n专注于极简主义陶艺创作,追求形式与功能的完美平衡。\n\n## 创作风格\n\n- 简洁的线条\n- 纯净的色彩\n- 实用的设计',
  '陶艺',
  '景德镇',
  '成熟运营',
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
  'published'
),
(
  '侘寂美学木工坊',
  'wabi-sabi-woodwork',
  '接受不完美,发现时光之美',
  '# 关于我们\n\n侘寂美学不是缺陷,而是自然的痕迹。每一件作品都承载着时光的故事。',
  '木工',
  '京都',
  '成熟运营',
  'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800',
  'published'
),
(
  '未来感服装设计',
  'future-fashion',
  '科技与时尚的前瞻融合',
  '# 设计哲学\n\n探索未来时尚的可能性,将科技面料与前卫设计相结合。',
  '服装',
  '上海',
  '初创阶段',
  'https://images.unsplash.com/photo-1558769132-cb1aea94f4fa?w=800',
  'published'
),
(
  '复古插画工作室',
  'vintage-illustration',
  '时光印记,经典重现',
  '# 我们的作品\n\n用插画记录那个黄金时代的美好。',
  '插画',
  '台北',
  '成熟运营',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
  'published'
),
(
  '手工皮具工坊',
  'handmade-leather',
  '手作痕迹,匠人精神',
  '# 匠人之心\n\n每一针每一线都是对传统工艺的致敬。',
  '皮具',
  '佛罗伦萨',
  '成熟运营',
  'https://images.unsplash.com/photo-1517646287270-fe29a1220c00?w=800',
  'published'
),
(
  '东方意境茶室',
  'oriental-tea-house',
  '中式意境,禅意空间',
  '# 茶道美学\n\n在茶香中体验东方哲学。',
  '空间设计',
  '杭州',
  '成熟运营',
  'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
  'published'
),
(
  '自然主义家居',
  'natural-home',
  '天然材料,返璞归真',
  '# 回归自然\n\n用最天然的材料,创造最舒适的生活空间。',
  '家居',
  '波特兰',
  '成长期',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
  'published'
),
(
  '工业风金属工作室',
  'industrial-metal',
  '粗犷质感,机械美学',
  '# 工业之美\n\n金属与机械的完美结合。',
  '金属工艺',
  '柏林',
  '成熟运营',
  'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800',
  'published'
);

-- Link studios with tags
INSERT OR IGNORE INTO studio_tags (studio_id, tag_id)
SELECT 
  s.id,
  t.id
FROM studios s
CROSS JOIN tags t
WHERE 
  (s.slug = 'minimalist-pottery' AND t.slug = 'minimalism') OR
  (s.slug = 'wabi-sabi-woodwork' AND t.slug = 'wabi-sabi') OR
  (s.slug = 'future-fashion' AND t.slug = 'futurism') OR
  (s.slug = 'vintage-illustration' AND t.slug = 'vintage') OR
  (s.slug = 'handmade-leather' AND t.slug = 'handmade') OR
  (s.slug = 'oriental-tea-house' AND t.slug = 'oriental') OR
  (s.slug = 'natural-home' AND t.slug = 'naturalism') OR
  (s.slug = 'industrial-metal' AND t.slug = 'industrial');

-- Add some additional images for galleries
INSERT OR IGNORE INTO images (studio_id, url, alt_text, sort_order, status)
SELECT 
  s.id,
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600',
  '陶艺作品细节',
  1,
  'approved'
FROM studios s WHERE s.slug = 'minimalist-pottery';

INSERT OR IGNORE INTO images (studio_id, url, alt_text, sort_order, status)
SELECT 
  s.id,
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600',
  '简约茶具套装',
  2,
  'approved'
FROM studios s WHERE s.slug = 'minimalist-pottery';

INSERT OR IGNORE INTO images (studio_id, url, alt_text, sort_order, status)
SELECT 
  s.id,
  'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600',
  '木工作品',
  1,
  'approved'
FROM studios s WHERE s.slug = 'wabi-sabi-woodwork';

INSERT OR IGNORE INTO images (studio_id, url, alt_text, sort_order, status)
SELECT 
  s.id,
  'https://images.unsplash.com/photo-1558769132-cb1aea94f4fa?w=600',
  '未来感服装',
  1,
  'approved'
FROM studios s WHERE s.slug = 'future-fashion';
