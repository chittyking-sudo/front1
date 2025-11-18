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
      image_type TEXT DEFAULT 'gallery',
      FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE
    )`,
    
    // Product concepts table
    `CREATE TABLE IF NOT EXISTS product_concepts (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      studio_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      status TEXT DEFAULT '概念设计',
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE
    )`,
    
    // Timeline events table
    `CREATE TABLE IF NOT EXISTS timeline_events (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      studio_id TEXT NOT NULL,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      milestone INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE
    )`,
    
    // Indexes
    `CREATE INDEX IF NOT EXISTS idx_tags_category ON tags(category)`,
    `CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug)`,
    `CREATE INDEX IF NOT EXISTS idx_studios_slug ON studios(slug)`,
    `CREATE INDEX IF NOT EXISTS idx_studios_status ON studios(status)`,
    `CREATE INDEX IF NOT EXISTS idx_studio_tags_studio ON studio_tags(studio_id)`,
    `CREATE INDEX IF NOT EXISTS idx_studio_tags_tag ON studio_tags(tag_id)`,
    `CREATE INDEX IF NOT EXISTS idx_images_studio ON images(studio_id, sort_order)`,
    `CREATE INDEX IF NOT EXISTS idx_product_concepts_studio ON product_concepts(studio_id, sort_order)`,
    `CREATE INDEX IF NOT EXISTS idx_timeline_events_studio ON timeline_events(studio_id, date)`
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
  
  // Insert sample studios
  const studios = [
    {
      name: '极简陶艺工作室',
      slug: 'minimalist-pottery',
      tagline: '用最简单的线条,表达最纯粹的美',
      description: '# 我们的理念\n\n专注于极简主义陶艺创作,追求形式与功能的完美平衡。\n\n## 创作风格\n\n- 简洁的线条\n- 纯净的色彩\n- 实用的设计',
      category: '陶艺',
      city: '景德镇',
      stage: '成熟运营',
      cover: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      tags: ['minimalism']
    },
    {
      name: '侘寂美学木工坊',
      slug: 'wabi-sabi-woodwork',
      tagline: '接受不完美,发现时光之美',
      description: '# 关于我们\n\n侘寂美学不是缺陷,而是自然的痕迹。每一件作品都承载着时光的故事。',
      category: '木工',
      city: '京都',
      stage: '成熟运营',
      cover: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800',
      tags: ['wabi-sabi']
    },
    {
      name: '未来感服装设计',
      slug: 'future-fashion',
      tagline: '科技与时尚的前瞻融合',
      description: '# 设计哲学\n\n探索未来时尚的可能性,将科技面料与前卫设计相结合。',
      category: '服装',
      city: '上海',
      stage: '初创阶段',
      cover: 'https://images.unsplash.com/photo-1558769132-cb1aea94f4fa?w=800',
      tags: ['futurism']
    },
    {
      name: '复古插画工作室',
      slug: 'vintage-illustration',
      tagline: '时光印记,经典重现',
      description: '# 我们的作品\n\n用插画记录那个黄金时代的美好。',
      category: '插画',
      city: '台北',
      stage: '成熟运营',
      cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
      tags: ['vintage']
    },
    {
      name: '手工皮具工坊',
      slug: 'handmade-leather',
      tagline: '手作痕迹,匠人精神',
      description: '# 匠人之心\n\n每一针每一线都是对传统工艺的致敬。',
      category: '皮具',
      city: '佛罗伦萨',
      stage: '成熟运营',
      cover: 'https://images.unsplash.com/photo-1517646287270-fe29a1220c00?w=800',
      tags: ['handmade']
    },
    {
      name: '东方意境茶室',
      slug: 'oriental-tea-house',
      tagline: '中式意境,禅意空间',
      description: '# 茶道美学\n\n在茶香中体验东方哲学。',
      category: '空间设计',
      city: '杭州',
      stage: '成熟运营',
      cover: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
      tags: ['oriental']
    },
    {
      name: '自然主义家居',
      slug: 'natural-home',
      tagline: '天然材料,返璞归真',
      description: '# 回归自然\n\n用最天然的材料,创造最舒适的生活空间。',
      category: '家居',
      city: '波特兰',
      stage: '成长期',
      cover: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
      tags: ['naturalism']
    },
    {
      name: '工业风金属工作室',
      slug: 'industrial-metal',
      tagline: '粗犷质感,机械美学',
      description: '# 工业之美\n\n金属与机械的完美结合。',
      category: '金属工艺',
      city: '柏林',
      stage: '成熟运营',
      cover: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800',
      tags: ['industrial']
    },
    {
      name: '北欧简约家居',
      slug: 'nordic-home',
      tagline: '简约而不简单的生活美学',
      description: '# 北欧生活\n\n简洁、实用、温暖是我们的设计准则。',
      category: '家居',
      city: '哥本哈根',
      stage: '成熟运营',
      cover: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      tags: ['minimalism', 'naturalism']
    },
    {
      name: '现代陶瓷艺术',
      slug: 'modern-pottery',
      tagline: '传统工艺的当代表达',
      description: '# 当代陶艺\n\n在传统与现代之间找到平衡。',
      category: '陶艺',
      city: '苏州',
      stage: '成长期',
      cover: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
      tags: ['minimalism', 'oriental']
    },
    {
      name: '手作布艺工坊',
      slug: 'handmade-fabric',
      tagline: '针线之间的温暖故事',
      description: '# 布艺之美\n\n每一针都是情感的传递。',
      category: '布艺',
      city: '厦门',
      stage: '初创阶段',
      cover: 'https://images.unsplash.com/photo-1487376480913-24046456a727?w=800',
      tags: ['handmade', 'naturalism']
    },
    {
      name: '复古金工饰品',
      slug: 'vintage-jewelry',
      tagline: '时光雕刻的精致美学',
      description: '# 金工艺术\n\n复古不是怀旧，而是经典的延续。',
      category: '首饰',
      city: '巴黎',
      stage: '成熟运营',
      cover: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      tags: ['vintage', 'handmade']
    }
  ]
  
  for (const studio of studios) {
    // Insert studio
    const result = await db.prepare(
      `INSERT OR IGNORE INTO studios (name, slug, tagline, description, category, city, stage, cover_image_url, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published')`
    ).bind(
      studio.name,
      studio.slug,
      studio.tagline,
      studio.description,
      studio.category,
      studio.city,
      studio.stage,
      studio.cover
    ).run()
    
    // Link tags
    if (result.success) {
      const studioRecord = await db.prepare(
        `SELECT id FROM studios WHERE slug = ?`
      ).bind(studio.slug).first()
      
      if (studioRecord) {
        for (const tagSlug of studio.tags) {
          const tagRecord = await db.prepare(
            `SELECT id FROM tags WHERE slug = ?`
          ).bind(tagSlug).first()
          
          if (tagRecord) {
            await db.prepare(
              `INSERT OR IGNORE INTO studio_tags (studio_id, tag_id) VALUES (?, ?)`
            ).bind(studioRecord.id, tagRecord.id).run()
          }
        }
      }
    }
  }
  
  console.log(`✅ Inserted ${studios.length} sample studios`)
  
  // Add sample product concepts for first studio
  const minimalStudio = await db.prepare(
    `SELECT id FROM studios WHERE slug = 'minimalist-pottery' LIMIT 1`
  ).first()
  
  if (minimalStudio) {
    const concepts = [
      {
        title: '极简茶具系列',
        desc: '探索茶道文化与现代设计的结合，用最简单的线条表达最纯粹的美学理念。',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
        status: '概念设计'
      },
      {
        title: '手工拉坯花器',
        desc: '每一件都是独一无二的艺术品，承载着匠人的温度和时间的印记。',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600',
        status: '原型制作'
      },
      {
        title: '侘寂美学餐具',
        desc: '接受不完美，发现残缺之美。每一道裂痕都是时光的馈赠。',
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600',
        status: '测试阶段'
      }
    ]
    
    for (let i = 0; i < concepts.length; i++) {
      await db.prepare(
        `INSERT OR IGNORE INTO product_concepts (studio_id, title, description, image_url, status, sort_order) 
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(minimalStudio.id, concepts[i].title, concepts[i].desc, concepts[i].image, concepts[i].status, i).run()
    }
    
    // Add sample timeline for first studio
    const timeline = [
      {
        date: '2024-01',
        title: '工作室成立',
        desc: '在景德镇古镇创立工作室，开始极简陶艺创作之路。',
        image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=400',
        milestone: true
      },
      {
        date: '2024-03',
        title: '首个系列发布',
        desc: '「纯粹」系列茶具正式发布，获得设计界关注。',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400',
        milestone: false
      },
      {
        date: '2024-06',
        title: '入驻高端买手店',
        desc: '作品进入上海、北京多家高端买手店销售。',
        image: null,
        milestone: true
      },
      {
        date: '2024-09',
        title: '参展米兰设计周',
        desc: '受邀参加米兰设计周，作品获得国际认可。',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
        milestone: true
      },
      {
        date: '2024-11',
        title: '开设线下体验空间',
        desc: '在杭州西湖边开设首家线下体验空间和工作坊。',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
        milestone: false
      }
    ]
    
    for (let i = 0; i < timeline.length; i++) {
      await db.prepare(
        `INSERT OR IGNORE INTO timeline_events (studio_id, date, title, description, image_url, milestone, sort_order) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        minimalStudio.id, 
        timeline[i].date, 
        timeline[i].title, 
        timeline[i].desc, 
        timeline[i].image, 
        timeline[i].milestone ? 1 : 0, 
        i
      ).run()
    }
    
    console.log(`✅ Added product concepts and timeline for sample studio`)
  }
}
