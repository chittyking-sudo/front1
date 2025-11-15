// Database initialization utilities
// For local development, this ensures tables exist

export async function initDatabase(db: D1Database): Promise<void> {
  try {
    // Check if tables exist by trying to query
    await db.prepare('SELECT 1 FROM tags LIMIT 1').first()
    console.log('✅ Database tables already exist')
    return
  } catch (error) {
    console.log('📦 Initializing database tables...')
    
    // Create all tables
    await createTables(db)
    
    // Insert seed data
    await insertSeedData(db)
    
    console.log('✅ Database initialized successfully')
  }
}

async function createTables(db: D1Database): Promise<void> {
  const statements = [
    // Tags table
    `CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      category TEXT NOT NULL DEFAULT 'concept',
      color TEXT DEFAULT '#6366f1',
      icon TEXT DEFAULT 'tag',
      usage_count INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active'
    )`,
    
    // Studios table
    `CREATE TABLE IF NOT EXISTS studios (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      tagline TEXT,
      description TEXT,
      category TEXT,
      city TEXT,
      stage TEXT,
      cover_image_url TEXT,
      links TEXT DEFAULT '[]',
      status TEXT DEFAULT 'published',
      owner_id TEXT,
      claimed_at DATETIME,
      view_count INTEGER DEFAULT 0,
      favorite_count INTEGER DEFAULT 0,
      like_count INTEGER DEFAULT 0,
      CHECK (length(name) >= 2),
      CHECK (length(tagline) <= 50 OR tagline IS NULL)
    )`,
    
    // Studio_tags table
    `CREATE TABLE IF NOT EXISTS studio_tags (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      studio_id TEXT NOT NULL,
      tag_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
      UNIQUE(studio_id, tag_id)
    )`,
    
    // Images table
    `CREATE TABLE IF NOT EXISTS images (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      studio_id TEXT NOT NULL,
      url TEXT NOT NULL,
      thumbnail_url TEXT,
      alt_text TEXT,
      width INTEGER,
      height INTEGER,
      file_size INTEGER,
      mime_type TEXT,
      sort_order INTEGER DEFAULT 0,
      like_count INTEGER DEFAULT 0,
      status TEXT DEFAULT 'approved',
      FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE
    )`,
    
    // Indexes
    `CREATE INDEX IF NOT EXISTS idx_tags_category ON tags(category)`,
    `CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug)`,
    `CREATE INDEX IF NOT EXISTS idx_studios_slug ON studios(slug)`,
    `CREATE INDEX IF NOT EXISTS idx_studios_status ON studios(status)`,
    `CREATE INDEX IF NOT EXISTS idx_studio_tags_studio ON studio_tags(studio_id)`,
    `CREATE INDEX IF NOT EXISTS idx_studio_tags_tag ON studio_tags(tag_id)`,
    `CREATE INDEX IF NOT EXISTS idx_images_studio ON images(studio_id, sort_order)`
  ]
  
  for (const sql of statements) {
    await db.prepare(sql).run()
  }
}

async function insertSeedData(db: D1Database): Promise<void> {
  // Insert preset tags
  const tags = [
    // Concept tags
    { name: '极简主义', slug: 'minimalism', desc: '少即是多，追求纯粹与简洁', cat: 'concept', color: '#64748b' },
    { name: '侘寂美学', slug: 'wabi-sabi', desc: '不完美之美，时光的痕迹', cat: 'concept', color: '#92400e' },
    { name: '未来感', slug: 'futurism', desc: '科技与设计的前瞻融合', cat: 'concept', color: '#7c3aed' },
    { name: '复古怀旧', slug: 'vintage', desc: '时光印记，经典重现', cat: 'concept', color: '#c2410c' },
    { name: '手工温度', slug: 'handmade', desc: '手作痕迹，匠人精神', cat: 'concept', color: '#ea580c' },
    { name: '东方美学', slug: 'oriental', desc: '中式意境，禅意空间', cat: 'concept', color: '#dc2626' },
    { name: '自然主义', slug: 'naturalism', desc: '天然材料，返璞归真', cat: 'concept', color: '#16a34a' },
    { name: '工业风', slug: 'industrial', desc: '粗犷质感，机械美学', cat: 'concept', color: '#475569' },
    // Material tags
    { name: '陶瓷', slug: 'pottery', desc: '土与火的艺术', cat: 'material', color: '#92400e' },
    { name: '木材', slug: 'wood', desc: '自然纹理，温润触感', cat: 'material', color: '#a16207' },
    { name: '布艺', slug: 'fabric', desc: '柔软舒适，丰富纹理', cat: 'material', color: '#0891b2' },
    { name: '金属', slug: 'metal', desc: '工业质感，坚固耐用', cat: 'material', color: '#78716c' },
  ]
  
  for (const tag of tags) {
    await db.prepare(
      `INSERT OR IGNORE INTO tags (name, slug, description, category, color) 
       VALUES (?, ?, ?, ?, ?)`
    ).bind(tag.name, tag.slug, tag.desc, tag.cat, tag.color).run()
  }
  
  console.log(`✅ Inserted ${tags.length} preset tags`)
}
