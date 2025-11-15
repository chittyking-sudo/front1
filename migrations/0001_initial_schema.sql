-- Initial database schema for Studio Network
-- Created: 2025-11-15

-- ==========================================
-- Tags Table (理念标签表)
-- ==========================================
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- 标签信息
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- 分类 (concept理念/material材料/stage阶段)
  category TEXT NOT NULL DEFAULT 'concept',
  
  -- 视觉
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT 'tag',
  
  -- 统计
  usage_count INTEGER DEFAULT 0,
  
  -- 状态
  status TEXT DEFAULT 'active'
);

CREATE INDEX IF NOT EXISTS idx_tags_category ON tags(category);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_tags_usage ON tags(usage_count DESC);

-- ==========================================
-- Studios Table (工作室表)
-- ==========================================
CREATE TABLE IF NOT EXISTS studios (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- 工作室信息
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  
  -- 分类信息
  category TEXT,
  city TEXT,
  stage TEXT,
  
  -- 封面图
  cover_image_url TEXT,
  
  -- 外链 (JSON格式存储)
  links TEXT DEFAULT '[]',
  
  -- 状态
  status TEXT DEFAULT 'published',
  
  -- 所有者 (版本2才用)
  owner_id TEXT,
  claimed_at DATETIME,
  
  -- 统计数据
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  
  -- 约束
  CHECK (length(name) >= 2),
  CHECK (length(tagline) <= 50 OR tagline IS NULL)
);

CREATE INDEX IF NOT EXISTS idx_studios_slug ON studios(slug);
CREATE INDEX IF NOT EXISTS idx_studios_category ON studios(category);
CREATE INDEX IF NOT EXISTS idx_studios_status ON studios(status);
CREATE INDEX IF NOT EXISTS idx_studios_created ON studios(created_at DESC);

-- ==========================================
-- Studio_Tags Table (工作室标签关联表)
-- ==========================================
CREATE TABLE IF NOT EXISTS studio_tags (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  studio_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  
  UNIQUE(studio_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_studio_tags_studio ON studio_tags(studio_id);
CREATE INDEX IF NOT EXISTS idx_studio_tags_tag ON studio_tags(tag_id);

-- ==========================================
-- Images Table (图片表)
-- ==========================================
CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- 关联工作室
  studio_id TEXT NOT NULL,
  
  -- 图片信息
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  
  -- 元数据
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  mime_type TEXT,
  
  -- 排序
  sort_order INTEGER DEFAULT 0,
  
  -- 统计
  like_count INTEGER DEFAULT 0,
  
  -- 状态
  status TEXT DEFAULT 'approved',
  
  FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_images_studio ON images(studio_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_images_status ON images(status);
